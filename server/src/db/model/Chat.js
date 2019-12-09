const Seq = require('../sequelize')
const { STRING, BOOLEAN, INTEGER } = require('../types')

const Chat = Seq.define('chat', {
  chatId: {
    type: STRING,
    allowNull: false,
    comment: '聊天用户id'
  },
  fromId: {
    type: INTEGER,
    allowNull: false,
    comment: '发送者id(当前用户)'
  },
  toId: {
    type: INTEGER,
    allowNull: false,
    comment: '接收者id(对方用户)'
  },
  read: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: 1,
    comment: '是否已读 (1已读 未读)'
  },
  unReadCount: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '未读信息'
  },
  content: {
    type: STRING,
    allowNull: false,
    comment: '聊天信息'
  },
  userId: {
    type: INTEGER
  }
})

module.exports = Chat
