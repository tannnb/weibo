const Seq = require('../sequelize')
const { STRING, DECIMAL } = require('../types')

const User = Seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别(1男性, 2女性, 3保密)'
  },
  picture: {
    type: STRING,
    comment: '头像'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User
