const Ajv = require('ajv')
const ajv = new Ajv({
  allErrors: true, // 输出所有错误
  jsonPointers: true
})
require('ajv-errors')(ajv /*, {singleError: true} */)

/**
 *
 * @description 数据格式校验规则
 */
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
      errorMessage: {
        minLength: '密码不少于3个字符'
      }
    }
  }
}

/**
 * json schema校验
 * @param schema json schema规则
 * @param data 带校验的数据
 * @returns {ajv.ErrorObject}
 * 验证不通过valid为false
 */
function validator (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

/**
 * 校验用户注册
 * @param dara
 * @returns {ajv.ErrorObject}
 */
function useValidator (data = {}) {
  return validator(SCHEMA, data)
}

module.exports = {
  useValidator
}
