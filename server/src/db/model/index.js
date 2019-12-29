/**
 * @description 数据模型入口
 */
const User = require('./User')
const Chat = require('./Chat')
const Blog = require('./Blog')
const userRelation = require('./UserRelation')

// 关联外键 (belongsTo属于)
// 创建外键  Chat.userId => User.id
Chat.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Chat, { foreignKey: 'userId' })

Blog.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Blog, { foreignKey: 'userId' })


userRelation.belongsTo(User, { foreignKey: 'followerId' })
User.hasMany(userRelation, { foreignKey: 'userId' })


module.exports = {
  User,
  Chat,
  Blog,
  userRelation
}
