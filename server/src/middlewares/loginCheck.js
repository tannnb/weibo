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
async function loginCheck (ctx, next) {
  if (ctx.session) {
    console.log('111', ctx.session.token)
  }
  await next()
  /* return function validator (ctx, next) {
    console.log('111111')
    next()
    /!*const token = ctx.header.authorization
    if (!token) {
      ctx.body = new ErrorModel(-1, '权限验证失败')
      return
    }
    try {
      await verify(token.split(' ')[1], SECRET)
      await next()
    } catch (e) {
      ctx.body = new ErrorModel(-1, '登录已过期,请重新登录!')
    }*!/
  } */
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
