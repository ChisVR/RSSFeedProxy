<title>hiveRSS</title>

![HiveRSS Logo](./hiverss2.png)

# HiveRSS [https://hiverss.com](https://www.hiverss.com)

A simple tool for creating Atom/RSS feeds from Hive accounts and categories.

Go to (almost) any Hive page with a content stream, and replace 'hive.blog' with 'hiverss.com' in the URL. 

https://hive.blog/trending/hive -> https://rss.chisdealhd.co.uk/hive/trending/hive
https://blurt.blog/trending/blurt -> https://rss.chisdealhd.co.uk/blurt/trending/blurt
https://steemit.com/trending/steem -> https://rss.chisdealhd.co.uk/steem/trending/steem


## Usage Examples

### User Feed

Get posts from your feeds or others' as well.

> `rss.chisdealhd.co.uk/hive/@<username>/feed`

* [rss.chisdealhd.co.uk/hive/@chisdealhd/feed](https://rss.chisdealhd.co.uk/hive/@chisdealhd/feed)

> `rss.chisdealhd.co.uk/blurt/@<username>/feed`

* [rss.chisdealhd.co.uk/blurt/@chisdealhd/feed](https://rss.chisdealhd.co.uk/blurt/@chisdealhd/feed)

> `rss.chisdealhd.co.uk/steem/@<username>/feed`

* [rss.chisdealhd.co.uk/steem/@chisdealhd/feed](https://rss.chisdealhd.co.uk/steem/@chisdealhd/feed)

### Posts By Author

Get posts from your favorite hiver.

> `rss.chisdealhd.co.uk/hive/@<username>/blog`

* [rss.chisdealhd.co.uk/hive/@philipkoon/blog](https://rss.chisdealhd.co.uk/hive/@philipkoon/blog)

> `rss.chisdealhd.co.uk/blurt/@<username>/blog`

* [rss.chisdealhd.co.uk/blurt/@chisdealhd/blog](https://rss.chisdealhd.co.uk/blurt/@chisdealhd/blog)

> `rss.chisdealhd.co.uk/steem/@<username>/blog`

* [rss.chisdealhd.co.uk/steem/@chisdealhd/blog](https://rss.chisdealhd.co.uk/steem/@chisdealhd/blog)

Filter posts to show only posts matching a tag

> `rss.chisdealhd.co.uk/hive/@username?tagFilter=tag`

* [rss.chisdealhd.co.uk/hive/@sajannair?tagFilter=travel](https://rss.chisdealhd.co.uk/hive/@sajannair?tagFilter=travel)

> `rss.chisdealhd.co.uk/blurt/@username?tagFilter=tag`

* [rss.chisdealhd.co.uk/blurt/@chisdealhd?tagFilter=travel](https://rss.chisdealhd.co.uk/blurt/@chisdealhd?tagFilter=travel)

> `rss.chisdealhd.co.uk/steem/@username?tagFilter=tag`

* [rss.chisdealhd.co.uk/steem/@chisdealhd?tagFilter=travel](https://rss.chisdealhd.co.uk/steem/@chisdealhd?tagFilter=travel)

### Comments By Author

Get comments from your favorite hiver.

> `rss.chisdealhd.co.uk/hive/@<username>/comments`

* [rss.chisdealhd.co.uk/hive/@ned/comments](https://rss.chisdealhd.co.uk/hive/@ned/comments)

### Posts by Category

Get posts by category, you can get posts by new/hot/trending/promoted

> `https://rss.chisdealhd.co.uk/hive/new/<category>` OR `https://rss.chisdealhd.co.uk/hive/created/<category>`
> `https://rss.chisdealhd.co.uk/hive/hot/<category>`
> `https://rss.chisdealhd.co.uk/hive/trending/<category>`
> `https://rss.chisdealhd.co.uk/hive/promoted/<category>`

* [https://rss.chisdealhd.co.uk/hive/new/ethereum](https://rss.chisdealhd.co.uk/hive/new/ethereum)
* [https://rss.chisdealhd.co.uk/hive/hot/bitcoin](https://rss.chisdealhd.co.uk/hive/hot/bitcoin)
* [https://rss.chisdealhd.co.uk/hive/trending/steem](https://rss.chisdealhd.co.uk/hive/trending/steem)

### Posts Voted by a Specific User

Get a feed of links to posts recently voted by a user

> `https://rss.chisdealhd.co.uk/hive/@<username>/votes`

* [https://rss.chisdealhd.co.uk/hive/@ocdb/votes](https://rss.chisdealhd.co.uk/hive/@ocdb/votes)

Only include votes above a specific percentage weight, and link to non-default interace

> `https://rss.chisdealhd.co.uk/hive/@<username>/votes?minVotePct=<percentage>&interface=<interface-name>`

* [https://rss.chisdealhd.co.uk/hive/@ocdb/votes?minVotePct=100&interface=peakd](https://rss.chisdealhd.co.uk/hive/@ocdb/votes?minVotePct=100&interface=peakd)