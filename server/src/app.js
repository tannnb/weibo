const Koa = require('koa')
const app = new Koa()
const path = require('path')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const jwt = require('koa-jwt')
const DayJS = require('dayjs')
const { REDIS_CONF } = require('./conf/db')
const { SECRET, SESSION_KEY } = require('./conf/constants')
const { tokenExpireInfo, tokenFailInfo } = require('./conf/ErrorInfo')
const index = require('./routes/index')
const userApiRouter = require('./routes/user')
const utilsApiRouter = require('./routes/utils')
const blogApiRouter = require('./routes/blog')
const followApiRouter = require('./routes/profile')
const { ErrorModel } = require('./utils')
const { connectSocket } = require('./io')

// error handler
onerror(app)

// 接口白名单
const PathWrite = [
  /^\/api\/user\/isExist/,
  /^\/api\/user\/register/,
  /^\/api\/user\/login/,
  /^\//
]

// 校验token以及是否过期
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      let nowTime = new Date().getTime()
      console.log(err)
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
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFolders')))

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
  key: 'weibo:', // cookie name
  prefix: 'weibo:', // redis key前缀
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000  // 过期时间7天
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(blogApiRouter.routes(), blogApiRouter.allowedMethods())
app.use(followApiRouter.routes(), followApiRouter.allowedMethods())

// 连接socket
connectSocket(io)
server.listen(3001)

// error-handling
app.on('error', (err, ctx) => {
  console.error('错误信息', err)
})

module.exports = app
