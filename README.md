<title>RSSFeedProxy</title>

![RSSFeedProxy Logo](./rss2.png)

# RSSFeedProxy [https://rss.chisdealhd.co.uk](https://rss.chisdealhd.co.uk)

A simple tool for creating Atom/RSS feeds from Hive accounts and categories.

Go to (almost) any Hive/Blurt/Steem page with a content stream, and replace 'hive.blog' with 'hiverss.com' in the URL. 

https://hive.blog/trending/hive -> https://rss.chisdealhd.co.uk/hive/trending/hive
https://blurt.blog/trending/blurt -> https://rss.chisdealhd.co.uk/blurt/trending/blurt
https://steemit.com/trending/steem -> https://rss.chisdealhd.co.uk/steem/trending/steem


`<PLATFORM> = Selected Platforms` - Only supported Blurt, Hive, Steem at this time

## Usage Examples

### User Feed

Get posts from your feeds or others' as well.

> `rss.chisdealhd.co.uk/<PLATFORM>/@<username>/feed`

* [rss.chisdealhd.co.uk/hive/@philipkoon/feed](https://rss.chisdealhd.co.uk/hive/@philipkoon/feed)

### Posts By Author

Get posts from your favorite hiver.

> `rss.chisdealhd.co.uk/<PLATFORM>/@<username>/blog`

* [rss.chisdealhd.co.uk/hive/@philipkoon/blog](https://rss.chisdealhd.co.uk/hive/@philipkoon/blog)

Filter posts to show only posts matching a tag

> `rss.chisdealhd.co.uk/<PLATFORM>/@username?tagFilter=tag`

* [rss.chisdealhd.co.uk/hive/@sajannair?tagFilter=travel](https://rss.chisdealhd.co.uk/hive/@sajannair?tagFilter=travel)

### Comments By Author

Get comments from your favorite hiver.

> `rss.chisdealhd.co.uk/<PLATFORM>/@<username>/comments`

* [rss.chisdealhd.co.uk/hive/@ned/comments](https://rss.chisdealhd.co.uk/hive/@ned/comments)

### Posts by Category

Get posts by category, you can get posts by new/hot/trending/promoted

> `https://rss.chisdealhd.co.uk/<PLATFORM>/new/<category>` OR `https://rss.chisdealhd.co.uk/<PLATFORM>/created/<category>`
> `https://rss.chisdealhd.co.uk/<PLATFORM>/hot/<category>`
> `https://rss.chisdealhd.co.uk/<PLATFORM>/trending/<category>`
> `https://rss.chisdealhd.co.uk/<PLATFORM>/promoted/<category>`

* [https://rss.chisdealhd.co.uk/hive/new/ethereum](https://rss.chisdealhd.co.uk/hive/new/ethereum)
* [https://rss.chisdealhd.co.uk/hive/hot/bitcoin](https://rss.chisdealhd.co.uk/hive/hot/bitcoin)
* [https://rss.chisdealhd.co.uk/hive/trending/steem](https://rss.chisdealhd.co.uk/hive/trending/steem)

### Posts Voted by a Specific User

Get a feed of links to posts recently voted by a user

> `https://rss.chisdealhd.co.uk/<PLATFORM>/@<username>/votes`

* [https://rss.chisdealhd.co.uk/hive/@ocdb/votes](https://rss.chisdealhd.co.uk/hive/@ocdb/votes)

Only include votes above a specific percentage weight, and link to non-default interace

> `https://hiverss.com/<PLATFORM>/@<username>/votes?minVotePct=<percentage>&interface=<interface-name>`

* [https://rss.chisdealhd.co.uk/hive/@ocdb/votes?minVotePct=100&interface=peakd](https://rss.chisdealhd.co.uk/hive/@ocdb/votes?minVotePct=100&interface=peakd)
