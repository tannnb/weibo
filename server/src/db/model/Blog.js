const Seq = require('../sequelize')
const { STRING, INTEGER, TEXT } = require('../types')

const Blog = Seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog
