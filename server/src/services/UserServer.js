const { User } = require('../db/model/index')
const { formatUser } = require('../utils')
/**
 * 获取用户信息
 * @param userName 用户名
 * @param password 密码
 * @returns {Promise<void>}
 */
async function getUserInfo (userName, password) {
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询用户信息
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    return result
  }
  // 格式化
  let formatRes = formatUser(result.dataValues)
  return formatRes
}

async function createUser ({ userName, password, gender = 3, nickName }) {
  let result = await User.create({
    userName,
    password,
    nickName: nickName || userName,
    gender
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}
