const router = require('koa-router')()
const { getToken } = require('../middlewares/loginCheck')
const {follow} = require('../controller/userRelationController')
router.prefix('/api/profile')

/**
 * <关注用户>
 */
router.post('/follow',async (ctx,next) => {
  const {id:myUserId} = await getToken(ctx)
  const {userId:currentId} = ctx.request.body
  ctx.body = await follow(myUserId,currentId)
})


module.exports = router
