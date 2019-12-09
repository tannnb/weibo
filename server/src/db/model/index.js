/**
 * @description 数据模型入口
 */
const User = require('./User')
const Chat = require('./Chat')

// 关联外键 (belongsTo属于)
// 创建外键  Chat.userId => User.id
Chat.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Chat, { foreignKey: 'userId' })

module.exports = {
  User,
  Chat
}
