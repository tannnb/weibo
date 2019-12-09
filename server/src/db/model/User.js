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
  description: {
    type: STRING,
    defaultValue: '这个人很懒，什么都没留下...',
    comment: '简介'
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
  },
  realName: {
    type: STRING,
    comment: '真实姓名'
  },
  BornIn: {
    type: STRING,
    comment: '出生年月'
  },
  phone: {
    type: STRING,
    comment: '手机号'
  },
  email: {
    type: STRING,
    comment: '邮箱'
  }
})

module.exports = User
