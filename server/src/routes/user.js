const router = require('koa-router')()
router.prefix('/api/user')
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const { SECRET } = require('../conf/constants')
const { isExist, register } = require('../controller/UserController')

/**
 * 用户注册
 * @param userName 用户名
 * @param password 密码
 */
router.post('/register', async (ctx, next) => {
  const params = ctx.request.body
  console.log(params)
  ctx.body = await register(params)
})

/**
 * 判断用户是否被注册
 * @param userName 用户名
 */
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  let userInfo

  if (username === 'zhangsan' && password === 'abc') {
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1
    }
  }
  // 加密userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }

  if (userInfo == null) {
    ctx.body = {
      code: -1,
      data: null,
      msg: '登录失败'
    }
    return
  }
  ctx.body = {
    code: 0,
    data: token,
    msg: '登录成功'
  }
})

router.get('/getUerInfo', async (ctx, next) => {
  let token = ctx.header.authorization
  try {
    let payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      code: 0,
      msg: '',
      data: payload
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: '解析失败',
      data: null
    }
  }
})

module.exports = router
