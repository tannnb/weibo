const {  User,userRelation } = require('../db/model/index')
const { formatUser, formatTime } = require('../utils/index')


/**
 * <获取关注该用户的用户列表，即该用户的粉丝>
 * @param followerId 被关注人的id
 * @returns {Promise<void>}
 */
async function getUserByFollower (followerId) {
  const result = await User.findAndCountAll({
    attributes:['id','userName','nickName','picture'],
    order:[
      ['id','desc']
    ],
    include:[
      {
        model:userRelation,
        where:{
          followerId
        }
      }
    ]
  })
  console.log('result',result)
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)
  return {
    total:result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param userId 用户id
 * @param followerId 被关注用户id
 * @returns {Promise<void>}
 */
async function addFollower(userId,followerId) {
    const result = await userRelation.create({
      userId,
      followerId
    })
    return result.dataValues
}

module.exports = {
  getUserByFollower,
  addFollower
}
