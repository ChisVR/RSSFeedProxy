import RSS from 'rss'
import xml from 'xml'
import { promisify } from 'util'
const steem = require('steem');
const config = require('../config');
const renderHelper = require('@ecency/render-helper');
renderHelper.setProxyBase('https://steemitimages.com')

const makeInterfaceUrl = (iface) => {

  var site = 'https://steemit.com'
  return site;
}


const makeSiteUrl = (category, tag, iface, refer) => {
    var site = makeInterfaceUrl(iface);
    var url = `${site}/${category}/${tag}`
    if (refer) {
        url += `?ref=${refer}`
    }
    return url
}


const makeFeedItemUrl = (url, iface, refer) => {
    var site = makeInterfaceUrl(iface);
    var url = `${site}${url}`

    if (refer) {
        url += `?ref=${refer}`
    }
    return url
}


const makeFeedItemUrlFromVote = (author, permlink, iface, refer) => {
    var site = makeInterfaceUrl(iface);
    var url = `${site}/@${author}/${permlink}`

    if (refer) {
        url += `?ref=${refer}`
    }
    return url
}


const makeUserProfileURL = (username, type, iface, refer) => {
    var site = makeInterfaceUrl(iface);
    var url = `${site}/@${username}/${type}`

    if (refer) {
        url += `?ref=${refer}`
    }
    return url
}


const buildFeedQueryParams = (iface, limit, minVotePct = NaN) => {

    var paramsList = []
    if (iface.length > 0) {
        paramsList.push(`interface=${iface}`)
    }
    if (limit != 10) {
        paramsList.push(`limit=${limit}`)
    }
    if (minVotePct != 0 && !isNaN(minVotePct)) {
        paramsList.push(`minVotePct=${minVotePct}`)
    }

    var feedQueryParams = paramsList.join('&')

    if (feedQueryParams.length > 0) {
        feedQueryParams = `?${feedQueryParams}`
    }

    return feedQueryParams
}


const makeImageUrl = async (username) => {
    // helper function to query Hive profile photo URL
    try {
        const account_details = await steem.api.callAsync('condenser_api.get_accounts', [[username]])
        const profile_image = JSON.parse(account_details[0].posting_json_metadata).profile.profile_image

        if (typeof profile_image !== 'undefined') {
            return profile_image
        }
    } catch (error) {
        console.error('Failed to fetch profile image: ' + error)
        const image_url = 'http://www.hiverss.com/hive_logo.png'
        return image_url
    }
}


const rssGeneratorUser = async (username, type, iface, limit, tagFilter, refer) => {
    
    var feedQueryParams = buildFeedQueryParams(iface, limit)

    const feedOption = {
        title: `Posts from @${username}'s ${type}`,
        feed_url: `${config.FEED_URL}/@${username}/${type}${feedQueryParams}`,
        site_url: makeUserProfileURL(username,type,iface,refer),
        image_url: await makeImageUrl(username),
        docs: 'https://github.com/hiveuprss/hiverss'
    } 

    const apiResponse = await getFeedContent(type, username, limit)

    var filteredPostList = apiResponse

    if (tagFilter.length > 0) {
        var filteredPostList = apiResponse.filter((x) => {
            return JSON.parse(x.json_metadata.toLowerCase()).tags.includes(tagFilter)
        })
    }

    const feed = new RSS(feedOption)
    const completedFeed = await feedItem(feed, filteredPostList, iface, refer)
    return completedFeed.xml()
}


const rssGeneratorTopic = async (category, tag, iface, limit, tagFilter, refer) => {
    
    var feedQueryParams = buildFeedQueryParams(iface, limit)

    const feedOption = {
        title: `${category} ${tag} posts`,
        feed_url: `${config.FEED_URL}/${category}/${tag}${feedQueryParams}`,
        site_url: makeSiteUrl(category,tag,iface,refer),
        image_url: 'http://www.hiverss.com/hive_logo.png',
        docs: 'https://github.com/hiveuprss/hiverss'
    } 

        const apiResponse = await getFeedContent(category, tag, limit)

        var filteredPostList = apiResponse

        if (tagFilter.length > 0) {
            var filteredPostList = apiResponse.filter((x) => {
                return JSON.parse(x.json_metadata.toLowerCase()).tags.includes(tagFilter)
            })            
        }
        const feed = new RSS(feedOption)
        const completedFeed = await feedItem(feed, filteredPostList, iface, refer)
        return completedFeed.xml()
}


const rssGeneratorVoter = async (voter, iface, limit, minVotePct, tagFilter, refer) => {

    var feedQueryParams = buildFeedQueryParams(iface, limit, minVotePct)

    const feedOption = {
        title: `Hive posts voted by @${voter}`,
        feed_url: `${config.FEED_URL}/@${voter}/votes${feedQueryParams}`,
        site_url: makeUserProfileURL(voter, 'feed', iface, refer),
        image_url: 'http://www.hiverss.com/hive_logo.png',
        docs: 'https://github.com/hiveuprss/hiverss'
    } 
    
    const apiResponse = await steem.api.callAsync('condenser_api.get_account_history', [voter, -1, 1000])

    // remove other ops
    let votes = apiResponse.filter((x) => {return x[1].op[0] == "vote"})
    
    votes = votes.map((x) => {
        let v = x[1].op[1]
        v.date = x[1].timestamp
        v.vote_percent = v.weight
        
        return v
    })

    // remove other voters
    var filteredVoteList = votes.filter((x) => {return x.voter == voter})

    // remove votes below minVotePct
    var filteredVoteList = filteredVoteList.filter((x) => {return x.vote_percent >= (minVotePct * 100)})

    // put latest vote first
    var filteredVoteList = filteredVoteList.reverse()

    // trim to limit
    var limit = Math.min(limit, filteredVoteList.length)
    filteredVoteList = filteredVoteList.slice(0,limit)

    const feed = new RSS(feedOption)
    const completedFeed = await feedItemVoted(feed, filteredVoteList, iface, refer)
    return completedFeed.xml()
}


const getDiscussionsByCreated = promisify(steem.api.getDiscussionsByCreated);
const getDiscussionsByFeed = promisify(steem.api.getDiscussionsByFeed);
const getDiscussionsByBlog = promisify(steem.api.getDiscussionsByBlog);
const getDiscussionsByHot = promisify(steem.api.getDiscussionsByHot);
const getDiscussionsByTrending = promisify(steem.api.getDiscussionsByTrending);
const getDiscussionsByPromoted = promisify(steem.api.getDiscussionsByPromoted);
const getDiscussionsByComments = promisify(steem.api.getDiscussionsByComments);
const getDiscussionsByAuthorBeforeDate = promisify(steem.api.getDiscussionsByAuthorBeforeDate);


const methodMap = {
    'feed': (query) => getDiscussionsByFeed(query),
    'blog': (query) => getDiscussionsByBlog(query),
    // TODO: fix "blog without reblogs" aka "posts"
    //'posts': (query) => getDiscussionsByAuthorBeforeDate({author: query.tag,
    //                                                      startPermlink: '',
    //                                                      beforeDate: new Date().toISOString().split('.')[0],
    //                                                      limit: 1}),
    'new': (query) => getDiscussionsByCreated(query),
    'created': (query) => getDiscussionsByCreated(query),
    'hot': (query) => getDiscussionsByHot(query),
    'trending': (query) => getDiscussionsByTrending(query),
    'promoted': (query) => getDiscussionsByPromoted(query),
    'comments': (query) => getDiscussionsByComments({limit: query.limit, start_author: query.tag})
}


const getFeedContent = async (category, tag, limit) => methodMap.hasOwnProperty(category) ?
                                            await methodMap[category]({tag: tag, limit: limit}) :
                                            Promise.reject({status: 400, message: "Unknown Category"})


const feedItem = async (feed, response, iface, refer) => {
    response.forEach(({title, url, author, category, created: date, body}) => {
        feed.item({
            title,
            url: makeFeedItemUrl(url,iface,refer),
            categories: [category],
            author,
            date,
            description: renderHelper.renderPostBody(body)
        })
    });

    return feed
}


const feedItemVoted = async (feed, response, iface, refer) => {
    response.forEach(({permlink, author, date, vote_percent}) => {
        feed.item({
            url: makeFeedItemUrlFromVote(author,permlink,iface,refer),
            author,
            date,
            description: `Vote weight: ${vote_percent / 100}%`
        })
    });

    return feed
}


module.exports = {
    rssGeneratorTopic: rssGeneratorTopic,
    rssGeneratorUser: rssGeneratorUser,
    rssGeneratorVoter: rssGeneratorVoter
}