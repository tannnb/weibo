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
      await verify(token.split(' ')[1], SECRET)
      await next()
    } catch (e) {
      ctx.body = new ErrorModel(-1, '登录已过期,请重新登录!')
    }
  }
  return validator
}

async function getToken (ctx, next) {
  const token = ctx.header.authorization
  if (!token) {
    ctx.body = new ErrorModel(-1, '权限验证失败')
    return
  }
  try {
    let result = await verify(token.split(' ')[1], SECRET)
    return result
  } catch (e) {
    ctx.body = new ErrorModel(-1, '登录已过期,请重新登录!')
  }
}

module.exports = {
  loginCheck,
  getToken
}
