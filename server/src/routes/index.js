const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = {
    title: 'Hello Koa 2!'
  }
})



module.exports = router
