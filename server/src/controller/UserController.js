const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')
const { getUserInfo, createUser } = require('../services/UserServer')
const { SuccessModel, ErrorModel, doCrypto } = require('../utils')
const {
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo,
  registerUserNameExistInfo
} = require('../conf/ErrorInfo')

/**
 * <检查用户是否被注册>
 * @param userName 用户名
 * @returns {Promise<ErrorModel|*|SuccessModel>}
 */
async function isExist (userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户已存在
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * <用户注册>
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别(1男 2女 3保密)
 * @returns {Promise<void>}
 */
async function register ({ userName, password, gender = 3, nickName = '' }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({ userName, password: doCrypto(password), gender, nickName })
    return new SuccessModel()
  } catch (ex) {
    console.log(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 用户登录
 * @param ctx 上下文
 * @param userName 用户名
 * @param password 密码
 * @returns {Promise<ErrorModel|*|SuccessModel>}
 */
async function login (ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }
  return new SuccessModel(token, '登录成功')
}

module.exports = {
  isExist,
  register,
  login
}
