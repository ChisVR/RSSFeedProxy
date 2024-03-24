'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _rss = require('rss');

var _rss2 = _interopRequireDefault(_rss);

var _xml = require('xml');

var _xml2 = _interopRequireDefault(_xml);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blurt = require('@blurtfoundation/blurtjs');
var config = require('../config');
var renderHelper = require('@ecency/render-helper');
renderHelper.setProxyBase('https://imgp.blurt.world');

var makeInterfaceUrl = function makeInterfaceUrl(iface) {

    var site = 'https://blurt.blog';
    return site;
};

var makeSiteUrl = function makeSiteUrl(category, tag, iface, refer) {
    var site = makeInterfaceUrl(iface);
    var url = site + '/' + category + '/' + tag;
    if (refer) {
        url += '?ref=' + refer;
    }
    return url;
};

var makeFeedItemUrl = function makeFeedItemUrl(url, iface, refer) {
    var site = makeInterfaceUrl(iface);
    var url = '' + site + url;

    if (refer) {
        url += '?ref=' + refer;
    }
    return url;
};

var makeFeedItemUrlFromVote = function makeFeedItemUrlFromVote(author, permlink, iface, refer) {
    var site = makeInterfaceUrl(iface);
    var url = site + '/@' + author + '/' + permlink;

    if (refer) {
        url += '?ref=' + refer;
    }
    return url;
};

var makeUserProfileURL = function makeUserProfileURL(username, type, iface, refer) {
    var site = makeInterfaceUrl(iface);
    var url = site + '/@' + username + '/' + type;

    if (refer) {
        url += '?ref=' + refer;
    }
    return url;
};

var buildFeedQueryParams = function buildFeedQueryParams(iface, limit) {
    var minVotePct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;


    var paramsList = [];
    if (iface.length > 0) {
        paramsList.push('interface=' + iface);
    }
    if (limit != 10) {
        paramsList.push('limit=' + limit);
    }
    if (minVotePct != 0 && !isNaN(minVotePct)) {
        paramsList.push('minVotePct=' + minVotePct);
    }

    var feedQueryParams = paramsList.join('&');

    if (feedQueryParams.length > 0) {
        feedQueryParams = '?' + feedQueryParams;
    }

    return feedQueryParams;
};

var makeImageUrl = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username) {
        var account_details, profile_image, image_url;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return blurt.api.callAsync('condenser_api.get_accounts', [[username]]);

                    case 3:
                        account_details = _context.sent;
                        profile_image = JSON.parse(account_details[0].posting_json_metadata).profile.profile_image;

                        if (!(typeof profile_image !== 'undefined')) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', profile_image);

                    case 7:
                        _context.next = 14;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](0);

                        console.error('Failed to fetch profile image: ' + _context.t0);
                        image_url = 'http://www.hiverss.com/hive_logo.png';
                        return _context.abrupt('return', image_url);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 9]]);
    }));

    return function makeImageUrl(_x2) {
        return _ref.apply(this, arguments);
    };
}();

var rssGeneratorUser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(username, type, iface, limit, tagFilter, refer) {
        var feedQueryParams, feedOption, apiResponse, filteredPostList, feed, completedFeed;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        feedQueryParams = buildFeedQueryParams(iface, limit);
                        _context2.t0 = 'Posts from @' + username + '\'s ' + type;
                        _context2.t1 = config.FEED_URL + '/@' + username + '/' + type + feedQueryParams;
                        _context2.t2 = makeUserProfileURL(username, type, iface, refer);
                        _context2.next = 6;
                        return makeImageUrl(username);

                    case 6:
                        _context2.t3 = _context2.sent;
                        feedOption = {
                            title: _context2.t0,
                            feed_url: _context2.t1,
                            site_url: _context2.t2,
                            image_url: _context2.t3,
                            docs: 'https://github.com/hiveuprss/hiverss'
                        };
                        _context2.next = 10;
                        return getFeedContent(type, username, limit);

                    case 10:
                        apiResponse = _context2.sent;
                        filteredPostList = apiResponse;


                        if (tagFilter.length > 0) {
                            filteredPostList = apiResponse.filter(function (x) {
                                return JSON.parse(x.json_metadata.toLowerCase()).tags.includes(tagFilter);
                            });
                        }

                        feed = new _rss2.default(feedOption);
                        _context2.next = 16;
                        return feedItem(feed, filteredPostList, iface, refer);

                    case 16:
                        completedFeed = _context2.sent;
                        return _context2.abrupt('return', completedFeed.xml());

                    case 18:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function rssGeneratorUser(_x3, _x4, _x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
    };
}();

var rssGeneratorTopic = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(category, tag, iface, limit, tagFilter, refer) {
        var feedQueryParams, feedOption, apiResponse, filteredPostList, feed, completedFeed;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        feedQueryParams = buildFeedQueryParams(iface, limit);
                        feedOption = {
                            title: category + ' ' + tag + ' posts',
                            feed_url: config.FEED_URL + '/' + category + '/' + tag + feedQueryParams,
                            site_url: makeSiteUrl(category, tag, iface, refer),
                            image_url: 'http://www.hiverss.com/hive_logo.png',
                            docs: 'https://github.com/hiveuprss/hiverss'
                        };
                        _context3.next = 4;
                        return getFeedContent(category, tag, limit);

                    case 4:
                        apiResponse = _context3.sent;
                        filteredPostList = apiResponse;


                        if (tagFilter.length > 0) {
                            filteredPostList = apiResponse.filter(function (x) {
                                return JSON.parse(x.json_metadata.toLowerCase()).tags.includes(tagFilter);
                            });
                        }
                        feed = new _rss2.default(feedOption);
                        _context3.next = 10;
                        return feedItem(feed, filteredPostList, iface, refer);

                    case 10:
                        completedFeed = _context3.sent;
                        return _context3.abrupt('return', completedFeed.xml());

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function rssGeneratorTopic(_x9, _x10, _x11, _x12, _x13, _x14) {
        return _ref3.apply(this, arguments);
    };
}();

var rssGeneratorVoter = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(voter, iface, limit, minVotePct, tagFilter, refer) {
        var feedQueryParams, feedOption, apiResponse, votes, filteredVoteList, feed, completedFeed;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        feedQueryParams = buildFeedQueryParams(iface, limit, minVotePct);
                        feedOption = {
                            title: 'Hive posts voted by @' + voter,
                            feed_url: config.FEED_URL + '/@' + voter + '/votes' + feedQueryParams,
                            site_url: makeUserProfileURL(voter, 'feed', iface, refer),
                            image_url: 'http://www.hiverss.com/hive_logo.png',
                            docs: 'https://github.com/hiveuprss/hiverss'
                        };
                        _context4.next = 4;
                        return blurt.api.callAsync('condenser_api.get_account_history', [voter, -1, 1000]);

                    case 4:
                        apiResponse = _context4.sent;


                        // remove other ops
                        votes = apiResponse.filter(function (x) {
                            return x[1].op[0] == "vote";
                        });


                        votes = votes.map(function (x) {
                            var v = x[1].op[1];
                            v.date = x[1].timestamp;
                            v.vote_percent = v.weight;

                            return v;
                        });

                        // remove other voters
                        filteredVoteList = votes.filter(function (x) {
                            return x.voter == voter;
                        });

                        // remove votes below minVotePct

                        filteredVoteList = filteredVoteList.filter(function (x) {
                            return x.vote_percent >= minVotePct * 100;
                        });

                        // put latest vote first

                        filteredVoteList = filteredVoteList.reverse();

                        // trim to limit

                        limit = Math.min(limit, filteredVoteList.length);

                        filteredVoteList = filteredVoteList.slice(0, limit);

                        feed = new _rss2.default(feedOption);
                        _context4.next = 15;
                        return feedItemVoted(feed, filteredVoteList, iface, refer);

                    case 15:
                        completedFeed = _context4.sent;
                        return _context4.abrupt('return', completedFeed.xml());

                    case 17:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function rssGeneratorVoter(_x15, _x16, _x17, _x18, _x19, _x20) {
        return _ref4.apply(this, arguments);
    };
}();

var getDiscussionsByCreated = (0, _util.promisify)(blurt.api.getDiscussionsByCreated);
var getDiscussionsByFeed = (0, _util.promisify)(blurt.api.getDiscussionsByFeed);
var getDiscussionsByBlog = (0, _util.promisify)(blurt.api.getDiscussionsByBlog);
var getDiscussionsByHot = (0, _util.promisify)(blurt.api.getDiscussionsByHot);
var getDiscussionsByTrending = (0, _util.promisify)(blurt.api.getDiscussionsByTrending);
var getDiscussionsByPromoted = (0, _util.promisify)(blurt.api.getDiscussionsByPromoted);
var getDiscussionsByComments = (0, _util.promisify)(blurt.api.getDiscussionsByComments);
var getDiscussionsByAuthorBeforeDate = (0, _util.promisify)(blurt.api.getDiscussionsByAuthorBeforeDate);

var methodMap = {
    'feed': function feed(query) {
        return getDiscussionsByFeed(query);
    },
    'blog': function blog(query) {
        return getDiscussionsByBlog(query);
    },
    // TODO: fix "blog without reblogs" aka "posts"
    //'posts': (query) => getDiscussionsByAuthorBeforeDate({author: query.tag,
    //                                                      startPermlink: '',
    //                                                      beforeDate: new Date().toISOString().split('.')[0],
    //                                                      limit: 1}),
    'new': function _new(query) {
        return getDiscussionsByCreated(query);
    },
    'created': function created(query) {
        return getDiscussionsByCreated(query);
    },
    'hot': function hot(query) {
        return getDiscussionsByHot(query);
    },
    'trending': function trending(query) {
        return getDiscussionsByTrending(query);
    },
    'promoted': function promoted(query) {
        return getDiscussionsByPromoted(query);
    },
    'comments': function comments(query) {
        return getDiscussionsByComments({ limit: query.limit, start_author: query.tag });
    }
};

var getFeedContent = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(category, tag, limit) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        if (!methodMap.hasOwnProperty(category)) {
                            _context5.next = 6;
                            break;
                        }

                        _context5.next = 3;
                        return methodMap[category]({ tag: tag, limit: limit });

                    case 3:
                        _context5.t0 = _context5.sent;
                        _context5.next = 7;
                        break;

                    case 6:
                        _context5.t0 = _promise2.default.reject({ status: 400, message: "Unknown Category" });

                    case 7:
                        return _context5.abrupt('return', _context5.t0);

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function getFeedContent(_x21, _x22, _x23) {
        return _ref5.apply(this, arguments);
    };
}();

var feedItem = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(feed, response, iface, refer) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        response.forEach(function (_ref7) {
                            var title = _ref7.title,
                                url = _ref7.url,
                                author = _ref7.author,
                                category = _ref7.category,
                                date = _ref7.created,
                                body = _ref7.body;

                            feed.item({
                                title: title,
                                url: makeFeedItemUrl(url, iface, refer),
                                categories: [category],
                                author: author,
                                date: date,
                                description: renderHelper.renderPostBody(body)
                            });
                        });

                        return _context6.abrupt('return', feed);

                    case 2:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function feedItem(_x24, _x25, _x26, _x27) {
        return _ref6.apply(this, arguments);
    };
}();

var feedItemVoted = function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(feed, response, iface, refer) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        response.forEach(function (_ref9) {
                            var permlink = _ref9.permlink,
                                author = _ref9.author,
                                date = _ref9.date,
                                vote_percent = _ref9.vote_percent;

                            feed.item({
                                url: makeFeedItemUrlFromVote(author, permlink, iface, refer),
                                author: author,
                                date: date,
                                description: 'Vote weight: ' + vote_percent / 100 + '%'
                            });
                        });

                        return _context7.abrupt('return', feed);

                    case 2:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function feedItemVoted(_x28, _x29, _x30, _x31) {
        return _ref8.apply(this, arguments);
    };
}();

module.exports = {
    rssGeneratorTopic: rssGeneratorTopic,
    rssGeneratorUser: rssGeneratorUser,
    rssGeneratorVoter: rssGeneratorVoter
};