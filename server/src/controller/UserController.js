const jwt = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')
const { getUserInfo, createUser, updateUser } = require('../services/UserServer')
const { SuccessModel, ErrorModel, doCrypto } = require('../utils')
const util = require('util')
const verify = util.promisify(jwt.verify)
const {
  registerFailInfo,
  loginFailInfo,
  registerUserNameNotExistInfo,
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
    return new SuccessModel(registerUserNameExistInfo)
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

/**
 * 修改个人信息
 * @param ctx 上下文
 * @param nickName 名称
 * @param city 城市
 * @param picture 头像
 * @returns {Promise<void>}
 */
async function changeInfo (ctx, { nickName, city, picture }) {
  const token = ctx.header.authorization
  let payload = await verify(token.split(' ')[1], SECRET)
  const result = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture
  }, { userName })
  if (result) {
    return new SuccessModel('修改成功')
  } else {
    return new ErrorModel('修改失败')
  }
  console.log('payload', payload)
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo
}
