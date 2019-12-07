const { DEFAULT_PICTURE } = require('../conf/constants')

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
  constructor (data = {}, message = '') {
    super({ code: 0, data, message })
  }
}
class ErrorModel extends BaseModel {
  constructor (code, message) {
    super({ code, message })
  }
}

module.exports = {
  _formatUserPicture,
  formatUser,
  SuccessModel,
  ErrorModel
}
