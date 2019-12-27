const crypto = require('crypto')
const { DEFAULT_PICTURE, CRYPTO_SECRET_KEY } = require('../conf/constants')
const dayJS = require('dayjs')

/**
 * 用户默认头像设置
 * @param obj
 * @returns {{picture}|*}
 * @private
 */
function _formatUserPicture (obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息（单个 | 多个）
 * @param list
 */
function formatUser (list) {
  if (list == null) {
    return
  }
  if (list instanceof Array) {
    return list.map(user => _formatUserPicture(user))
  }
  return _formatUserPicture(list)
}

function formatTime (time) {
  return dayJS(time).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 统一返回结构
 */
class BaseModel {
  constructor ({ code, data = null, message = '' }) {
    this.code = code
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}
class SuccessModel extends BaseModel {
  constructor (data = {}, message = '操作成功') {
    if (typeof data === 'string') {
      message = data
      data = {}
    }
    super({ code: 0, data, message })
  }
}
class ErrorModel extends BaseModel {
  constructor (code, message) {
    if (typeof code === 'string') {
      message = code
      code = -1
    }
    super({ code, message })
  }
}

/**
 * md5加密
 * @param content
 * @returns {string}
 * @private
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param content
 * @returns {string}
 */
function doCrypto (content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = {
  _formatUserPicture,
  formatTime,
  formatUser,
  SuccessModel,
  ErrorModel,
  doCrypto
}
