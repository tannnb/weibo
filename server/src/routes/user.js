const router = require('koa-router')()
const util = require('util')
const jwt = require('jsonwebtoken')
const verify = util.promisify(jwt.verify)
const { isExist, register, login, changeInfo ,changePassword } = require('../controller/UserController')
const { useValidator } = require('../utils/validator')
const { genValidator } = require('../middlewares/validator')
const { tokenFailInfo } = require('../conf/ErrorInfo')
const { SECRET } = require('../conf/constants')
const { ErrorModel, SuccessModel } = require('../utils')
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
  const token = ctx.header.authorization
  if (!token) {
    ctx.body = new ErrorModel(-1, tokenFailInfo)
    return
  }
  try {
    let payload = await verify(token.split(' ')[1], SECRET)
    let { iat, exp, ...data } = payload
    ctx.body = new SuccessModel(data)
  } catch (e) {
    ctx.body = new ErrorModel(401, tokenFailInfo)
  }
})

/**
 * <更新用户信息>
 */
router.patch('/changeInfo', genValidator(useValidator), async (ctx, next) => {
  ctx.body = await changeInfo(ctx, ctx.request.body)
})

router.patch('/changePassword', genValidator(useValidator), async (ctx, next) => {
  ctx.body = await changePassword(ctx, ctx.request.body)
})

module.exports = router
