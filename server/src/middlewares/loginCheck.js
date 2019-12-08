const util = require('util')
const jwt = require('jsonwebtoken')
const verify = util.promisify(jwt.verify)
const { SECRET } = require('../conf/constants')
const { ErrorModel } = require('../utils')

/**
 * 验证token
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
function loginCheck (ctx, next) {
  async function validator (ctx, next) {
    const token = ctx.header.authorization
    if (!token) {
      ctx.body = new ErrorModel(-1, '权限验证失败')
      return
    }
    try {
      let payload = await verify(token.split(' ')[1], SECRET)
      await next()
    } catch (e) {
      ctx.body = new ErrorModel(-1, '权限验证失败')
      return
    }
  }
  return validator
}
module.exports = {
  loginCheck
}

/* const error = validateFn(data)
   if (error) {
     ctx.body = new ErrorModel(-1, error.message ? error.message : '数据格式校验错误')
     return
   }
   // 验证成功
   await next()
 }
 let token = ctx.header.authorization
 let payload = await verify(token.split(' ')[1], SECRET)
 console.log(payload)
 await next() */
