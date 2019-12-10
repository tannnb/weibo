/**
 * @description 连接redis
 * @author tannnb
  */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('err', err => {
  console.error('redisClient', err)
})

/**
 * redis set
 * @param {String} key 键
 * @param {String} val 值
 * @param {number} [timeout=60 * 60]
 */
function set (key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}
/**
 *
 *
 * @param {String} key
 */
function get (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        return reject(err)
      }
      if (val == null) {
        return resolve(null)
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}
