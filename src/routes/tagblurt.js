import Router from 'koa-router'
import {rssGeneratorTopic} from '../rssUtilsBlurt'
import {getInterface,getLimit,getTagFilter,getRefer} from '../rssUtilsBlurt/params'

const router = new Router({ prefix: '/blurt' })



router.get('/:category', async (ctx, next) => {
    ctx.type = 'text/xml'
    ctx.body = await rssGeneratorTopic(ctx.params.category,
                                       '',
                                       getInterface(ctx.query),
                                       getLimit(ctx.query),
                                       getTagFilter(ctx.query),
                                       getRefer(ctx.query))
})



router.get('/:category/:tag', async (ctx, next) => {
    ctx.type = 'text/xml'
    ctx.body = await rssGeneratorTopic(ctx.params.category,
                                       ctx.params.tag,
                                       getInterface(ctx.query),
                                       getLimit(ctx.query),
                                       getTagFilter(ctx.query),
                                       getRefer(ctx.query))
})

export default router
