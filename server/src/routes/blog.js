const router = require('koa-router')()
router.prefix('/api/blog')
const { create } = require('../controller/blogController')
const { genValidator } = require('../middlewares/validator')
const { blogValidator } = require('../utils/validator')

/**
 * <创建微博>
 */
router.post('/create', genValidator(blogValidator), async (ctx, next) => {
  ctx.body = await create(ctx, ctx.request.body)
})

module.exports = router
