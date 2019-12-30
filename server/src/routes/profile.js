const router = require('koa-router')()
const { getToken } = require('../middlewares/loginCheck')
const {follow,getFollowers} = require('../controller/userRelationController')
router.prefix('/api/profile')

/**
 * <获取当前用户下的粉丝>
 */
router.post('/follow',async (ctx,next) => {
  const {id:myUserId} = await getToken(ctx)
  const {userId:currentId} = ctx.request.body
  ctx.body = await follow(myUserId,currentId)
})


/**
 * <获取关注人>
 */
router.get('/followers',async (ctx,next) => {
  const {id} = await getToken(ctx)
  ctx.body = await getFollowers(id)
})

module.exports = router
