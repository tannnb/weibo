const router = require('koa-router')()
router.prefix('/api/blog')
const { create } = require('../controller/blogController')

/**
 * <创建微博>
 */
router.post('/create', async (ctx, next) => {
  ctx.body = await create(ctx, ctx.request.body)
})

module.exports = router
