/**  @description 数据库同步 */

const Seq = require('./sequelize')
require('./model/index.js')

// 测试连接
Seq.authenticate().then(res => {
  console.log('ok')
}).catch(() => {
  console.log('no')
})

// { force: true }
Seq.sync().then(() => {
  process.exit()
})
