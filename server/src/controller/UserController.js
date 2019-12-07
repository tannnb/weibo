const { getUserInfo } = require('../services/UserServer')
const { SuccessModel, ErrorModel } = require('../utils')
const { registerUserNameNotExistInfo } = require('../conf/ErrorInfo')

async function isExist (userName) {
  const userInfo = await getUserInfo(userName)
  console.log('userInfo',userInfo)
  if (userInfo) {
    // 用户已存在
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}
