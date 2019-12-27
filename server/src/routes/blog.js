const router = require('koa-router')()
router.prefix('/api/blog')
const { getToken } = require('../middlewares/loginCheck')
const { create, getProfileBlogList } = require('../controller/blogController')
const { genValidator } = require('../middlewares/validator')
const { blogValidator } = require('../utils/validator')

/**
 * <创建微博>
 */
router.post('/create', genValidator(blogValidator), async (ctx, next) => {
  ctx.body = await create(ctx, ctx.request.body)
})

/**
 * <获取个人主页信息>
 */
router.get('/profile', genValidator(blogValidator), async (ctx, next) => {
  const { userName } = await getToken(ctx)
  const { pageIndex, pageSize } = ctx.request.query
  ctx.body = await getProfileBlogList(userName, Number(pageIndex), Number(pageSize))
})



module.exports = router
