const util = require('util')
const jwt = require('jsonwebtoken')
const verify = util.promisify(jwt.verify)
const { ErrorModel } = require('../utils')
const { SECRET } = require('../conf/constants')
const {tokenExpireInfo,tokenFailInfo} = require('../conf/ErrorInfo')

/**
 * token并解析用户数据
 * @param ctx
 * @param next
 * @returns {Promise<any | void>}
 */
async function getToken (ctx, next) {
  const token = ctx.header.authorization

  if (!token) {
    ctx.body = new ErrorModel(tokenFailInfo)
    return
  }
  try {
    let result = await verify(token.split(' ')[1], SECRET)
    return result
  } catch (e) {
    ctx.body = new ErrorModel(401, tokenExpireInfo)
  }
}

module.exports = {
  getToken
}
