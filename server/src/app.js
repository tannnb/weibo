const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const DayJS = require('dayjs')
const { REDIS_CONF } = require('./conf/db')
const { SECRET, SESSION_KEY } = require('./conf/constants')
const { tokenExpireInfo, tokenFailInfo } = require('./conf/ErrorInfo')
const index = require('./routes/index')
const userApiRouter = require('./routes/user')
const { ErrorModel } = require('./utils')

// error handler
onerror(app)

// 接口白名单
const PathWrite = [
  /^\/api\/user\/isExist/,
  /^\/api\/user\/register/,
  /^\/api\/user\/login/
]

// 校验token以及是否过期
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      let nowTime = new Date().getTime()
      let expiredAt = DayJS(err.originalError.expiredAt).valueOf()
      let message = tokenFailInfo
      if ((nowTime - expiredAt) > 0) {
        message = tokenExpireInfo
      }
      ctx.body = new ErrorModel(401, message)
    }
  })
})
app.use(jwt({ secret: SECRET }).unless({ path: PathWrite }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session配置
app.keys = [SESSION_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name
  prefix: 'weibo.sess:', // redis key前缀
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 过期时间1天
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('错误信息', err)
})

module.exports = app
