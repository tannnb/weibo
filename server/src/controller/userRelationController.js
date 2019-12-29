const { SuccessModel, ErrorModel } = require('../utils')
const {  getUserByFollower,addFollower } = require('../services/userRelationServer')

/**
 * <根据userID获取用户列表>
 * @param userId
 * @returns {Promise<SuccessModel|*>}
 */
async function getFans (userId) {
  let result = await getUserByFollower( userId )
  let userList = result.userList
  return new SuccessModel({
    userList,
    total: result.total
  })
}

/**
 * <关注用户>
 * @param myUserId 当前用户id
 * @param currentId 要关注用户id
 * @returns {Promise<void>}
 */
async function follow(myUserId,currentId) {
  try {
    await addFollower(myUserId,currentId)
    return new SuccessModel()
  }catch (e) {
    console.log(e.stack)
    return new ErrorModel('添加关注失败')
  }
}

module.exports = {
  getFans,
  follow
}
