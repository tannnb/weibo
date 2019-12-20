const router = require('koa-router')()
const { isExist, register, login, getUerInfo,  changeInfo, changePassword } = require('../controller/UserController')
const { useValidator } = require('../utils/validator')
const { genValidator } = require('../middlewares/validator')
router.prefix('/api/user')


/**
 * <判断用户是否被注册>
 * @param userName 用户名
 */
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

/**
 * <用户注册>
 * @param userName 用户名
 * @param password 密码
 */
router.post('/register', genValidator(useValidator), async (ctx, next) => {
  const params = ctx.request.body
  ctx.body = await register(params)
})

/**
 * <用户登录>
 * @param userName 用户名
 * @param password 密码
 */
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})
/**
 * <获取用户信息>
 * @param authorization
 */
router.get('/getUerInfo', async (ctx, next) => {
  ctx.body = await getUerInfo(ctx, ctx.request.body)
})

/**
 * <更新用户信息>
 */
router.patch('/changeInfo', genValidator(useValidator), async (ctx, next) => {
  ctx.body = await changeInfo(ctx, ctx.request.body)
})

/**
 * <修改密码>
 */
router.patch('/changePassword', genValidator(useValidator), async (ctx, next) => {
  ctx.body = await changePassword(ctx, ctx.request.body)
})


module.exports = router
