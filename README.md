<title>RSSFeedProxy</title>

![RSSFeedProxy Logo](./rss2.png)

# RSSFeedProxy [https://rss.nekosunevr.co.uk](https://rss.nekosunevr.co.uk)

A simple tool for creating Atom/RSS feeds from Hive accounts and categories.

Go to (almost) any Hive/Blurt/Steem page with a content stream, and replace

'hive.blog' with 'rss.nekosunevr.co.uk/hive/'

'blurt.blog' with 'rss.nekosunevr.co.uk/blurt/'

'steemit.com' with 'rss.nekosunevr.co.uk/steem/'

in the URL Part. 

https://hive.blog/trending/hive -> https://rss.nekosunevr.co.uk/hive/trending/hive

https://blurt.blog/trending/blurt -> https://rss.nekosunevr.co.uk/blurt/trending/blurt

https://steemit.com/trending/steem -> https://rss.nekosunevr.co.uk/steem/trending/steem


`<PLATFORM> = Selected Platforms` - Only supported Blurt, Hive, Steem at this time

## Usage Examples Hive/Steem/Blurt

### User Feed

Get posts from your feeds or others' as well.

> `rss.nekosunevr.co.uk/<PLATFORM>/@<username>/feed`

* [rss.nekosunevr.co.uk/hive/@philipkoon/feed](https://rss.nekosunevr.co.uk/hive/@philipkoon/feed)

### Posts By Author

Get posts from your favorite hiver.

> `rss.nekosunevr.co.uk/<PLATFORM>/@<username>/blog`

* [rss.nekosunevr.co.uk/hive/@philipkoon/blog](https://rss.nekosunevr.co.uk/hive/@philipkoon/blog)

Filter posts to show only posts matching a tag

> `rss.nekosunevr.co.uk/<PLATFORM>/@username?tagFilter=tag`

* [rss.nekosunevr.co.uk/hive/@sajannair?tagFilter=travel](https://rss.nekosunevr.co.uk/hive/@sajannair?tagFilter=travel)

### Comments By Author

Get comments from your favorite hiver.

> `rss.nekosunevr.co.uk/<PLATFORM>/@<username>/comments`

* [rss.nekosunevr.co.uk/hive/@ned/comments](https://rss.nekosunevr.co.uk/hive/@ned/comments)

### Posts by Category

Get posts by category, you can get posts by new/hot/trending/promoted

> `https://rss.nekosunevr.co.uk/<PLATFORM>/new/<category>` OR `https://rss.nekosunevr.co.uk/<PLATFORM>/created/<category>`
> `https://rss.nekosunevr.co.uk/<PLATFORM>/hot/<category>`
> `https://rss.nekosunevr.co.uk/<PLATFORM>/trending/<category>`
> `https://rss.nekosunevr.co.uk/<PLATFORM>/promoted/<category>`

* [https://rss.nekosunevr.co.uk/hive/new/ethereum](https://rss.nekosunevr.co.uk/hive/new/ethereum)
* [https://rss.nekosunevr.co.uk/hive/hot/bitcoin](https://rss.nekosunevr.co.uk/hive/hot/bitcoin)
* [https://rss.nekosunevr.co.uk/hive/trending/steem](https://rss.nekosunevr.co.uk/hive/trending/steem)

### Posts Voted by a Specific User

Get a feed of links to posts recently voted by a user

> `https://rss.nekosunevr.co.uk/<PLATFORM>/@<username>/votes`

* [https://rss.nekosunevr.co.uk/hive/@ocdb/votes](https://rss.nekosunevr.co.uk/hive/@ocdb/votes)

Only include votes above a specific percentage weight, and link to non-default interace

> `https://hiverss.com/<PLATFORM>/@<username>/votes?minVotePct=<percentage>&interface=<interface-name>`

* [https://rss.nekosunevr.co.uk/hive/@ocdb/votes?minVotePct=100&interface=peakd](https://rss.nekosunevr.co.uk/hive/@ocdb/votes?minVotePct=100&interface=peakd)
