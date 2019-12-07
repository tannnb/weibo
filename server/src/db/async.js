/**  @description 数据库同步 */

const Seq = require('./sequelize')
const User = require('../model')

// 测试连接
Seq.authenticate().then(res => {
    console.log('ok')
}).catch(() => {
    console.log('no')
})

Seq.sync({ force: true }).then(() => {
    process.exit()
})