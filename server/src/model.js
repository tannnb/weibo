const Sequelize = require('sequelize')
const Seq = require('./sequelize')

const { STRING, INTEGER, TEXT } = Sequelize

// 创建user模型,数据表的名称是users
const User = Seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    nickName: {
        type: STRING,
        comment: '昵称'
    }
})

// 创建bolg
const Blog = Seq.define('blog', {
    title: {
        type: STRING,
        allowNull: false
    },
    content: {
        type: TEXT,
        allowNull: false
    },
    userId: {
        type: INTEGER
    }
})

// 关联外键 (belongsTo属于)
// 创建外键  Blog.userId => User.id
Blog.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Blog, { foreignKey: 'userId' })

module.exports = {
    User,
    Blog
}