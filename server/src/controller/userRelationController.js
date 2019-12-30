const { SuccessModel, ErrorModel } = require('../utils')
const {  getUserByFollower,addFollower,getFollowerByUser } = require('../services/userRelationServer')

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
 * <获取当前用户下的粉丝>
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


/**
 * <获取关注用户>
 * @param userId
 * @returns {Promise<ErrorModel|*|SuccessModel>}
 */
async function getFollowers(userId) {
  const result = await getFollowerByUser(userId)
  if(result) {
    return new SuccessModel(result)
  }else {
    return new ErrorModel('获取失败')
  }
}

module.exports = {
  getFans,
  follow,
  getFollowers
}
