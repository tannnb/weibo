const router = require('koa-router')()
const { isExist, register, login } = require('../controller/UserController')
const { useValidator } = require('../utils/validator')
const { genValidator } = require('../middlewares/validator')
const { loginCheck } = require('../middlewares/loginCheck')
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

router.get('/getUerInfo', loginCheck(), async (ctx, next) => {
  ctx.body = { code: 200 }
})

module.exports = router
