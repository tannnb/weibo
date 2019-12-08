const { getUserInfo, createUser } = require('../services/UserServer')
const { SuccessModel, ErrorModel, doCrypto } = require('../utils')
const {
  registerUserNameNotExistInfo,
  registerFailInfo,
  registerUserNameExistInfo
} = require('../conf/ErrorInfo')

/**
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

module.exports = {
  isExist,
  register
}
