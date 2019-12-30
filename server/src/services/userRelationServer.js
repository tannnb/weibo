const {  User,userRelation } = require('../db/model/index')
const { formatUser, formatTime } = require('../utils/index')
const {Op} = require('sequelize')

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
          followerId,
          userId: {
              [Op.ne]: followerId,  // userId != followerId
             // [Op.notIn]: followerId
          }
        }
      }
    ]
  })
  let userList = result.rows.map(row => row.dataValues)
  userList.forEach(user => {
    delete user.userrelations
    return user
  })
  userList = formatUser(userList)
  return {
    total:result.count,
    userList
  }
}

/**
 * <获取关注人列表,用户关注了那些人>
 * @param userId
 * @returns {Promise<void>}
 */
async function getFollowerByUser(userId) {
  const result = await userRelation.findAndCountAll({
    order:[
      ['id','desc']
    ],
    include:[
      {
        model:User,
        attributes:['id','userName','nickName','picture']
      }
    ],
    where:{
      userId,
      followerId: {
        [Op.ne]: userId,  // userId != followerId
      }
    }
  })
  let userList = result.rows.map(row => row.dataValues)
  userList.map(item => {
    let user = item.user
    user = user.dataValues
    user = formatUser(user)
    return user
  })
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
  addFollower,
  getFollowerByUser
}
