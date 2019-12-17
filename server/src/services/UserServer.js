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
    attributes: ['id', 'userName', 'nickName', 'picture', 'city', 'description'],
    where: whereOpt
  })
  if (result == null) {
    return result
  }
  // 格式化
  let formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * 创建用户，
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别
 * @param nickName 真实姓名
 * @returns {Promise<*>}
 */
async function createUser ({ userName, password, gender = 3, nickName }) {
  let result = await User.create({
    userName,
    password,
    nickName: nickName || userName,
    gender
  })
  return result.dataValues
}

/**
 * 更新用户信息
 * @param {Object} 要修改的内容
 * @param {Object} 查询条件  userName, password
 */
async function updateUser (params, { userName, password }) {
  // 拼接修改内容
  const updateDate = {}
  for (let attr in params) {
    if (attr && attr.length !== 0) {
      updateDate[attr] = params[attr]
    }
  }
  // 拼接查询条件
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }

  // 修改用户信息
  const result = await User.update(updateDate, {
    where: whereData
  })
  return result[0] > 0
}

async function updatePassword (params, { userName }) {

}

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  updatePassword
}
