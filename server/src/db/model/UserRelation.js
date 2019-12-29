const Seq = require('../sequelize')
const {  INTEGER } = require('../types')

const UserRelation = Seq.define('userrelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的id'
  }
})

module.exports = UserRelation
