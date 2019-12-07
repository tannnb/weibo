const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const { REDIS_CONF } = require('./conf/db')
const { SECRET } = require('./conf/constants')
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

/*
* path: [
        /^\/api\/login/,
        /^\/api\/register/,
        /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
* */

app.use(
  jwt({ secret: SECRET }).unless({
    path: [/^\/users\/login/]
  }) // 自定义那些目录忽略
)
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
app.keys = ['_tannnb_']
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
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
