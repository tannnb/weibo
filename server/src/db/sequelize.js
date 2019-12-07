/**  @description sequelize */

const sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    "host": host,
    "dialect": "mysql"
}
if (isTest) {
    conf.logging = () => { }
}
if (isProd) {
    // 线上环境，使用连接池
    conf.pool = {
        max: 5, // 连接池最大数量
        min: 0,
        idle: 10000  // 10s之内没有被使用，则释放
    }
}

const Seq = new sequelize(database, user, password, conf)

module.exports = Seq
