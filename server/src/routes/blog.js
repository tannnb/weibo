const router = require('koa-router')()
router.prefix('/api/blog')
const { getToken } = require('../middlewares/loginCheck')
const { create } = require('../controller/blogController')
const { genValidator } = require('../middlewares/validator')
const { blogValidator } = require('../utils/validator')
const { SuccessModel } = require('../utils')

/**
 * <创建微博>
 */
router.post('/create', genValidator(blogValidator), async (ctx, next) => {
  ctx.body = await create(ctx, ctx.request.body)
})

/**
 * <获取个人主页信息>
 */
router.get('/profile', async (ctx, next) => {
  const result = await getToken(ctx)
  ctx.body = new SuccessModel(result)
})

module.exports = router
