const router = require('koa-router')()
router.prefix('/api/blog')
const { getToken } = require('../middlewares/loginCheck')
const { create, getProfileBlogList } = require('../controller/blogController')
const {getFans} = require('../controller/userRelationController')
const { genValidator } = require('../middlewares/validator')
const { blogValidator } = require('../utils/validator')
const {getSquareCacheList} = require('../cache/blog')


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

/**
 * <获取话题广场列表>
 */
router.get('/square', async (ctx, next) => {
  const { pageIndex, pageSize } = ctx.request.query
  ctx.body = await getSquareCacheList(Number(pageIndex), Number(pageSize))
})

/**
 * <获取用户粉丝数>
 */
router.get('/getFans',async (ctx,next) => {
  const { id } = await getToken(ctx)
  ctx.body = await getFans(id)
})



module.exports = router
