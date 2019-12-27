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
    },
    nickName: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
      errorMessage: {
        type: '昵称为字符'
      }
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
      errorMessage: {
        type: '城市名称格式有误'
      }
    },
    description: {
      type: 'string',
      maxLength: 255,
      minLength: 1,
      errorMessage: {
        maxLength: '简介最多可输入250个字符'
      }
    },
    gender: {
      type: ['number', 'string'],
      maxLength: 1,
      errorMessage: {
        maxLength: '请选择正确性别'
      }
    },
    realName: {
      type: 'string',
      maxLength: 30,
      minLength: 2,
      errorMessage: {
        type: '请输入真实姓名'
      }
    },
    BornIn: {
      type: 'string',
      maxLength: 30,
      minLength: 2,
      errorMessage: {
        type: '请输入正确出生日期'
      }
    },
    phone: {
      type: ['number', 'string'],
      maxLength: 11,
      errorMessage: {
        maxLength: '手机号格式有误'
      }
    },
    email: {
      type: 'string',
      errorMessage: {
        type: '请输入邮箱'
      }
    }
  }
}

const BLOG_SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: ['string', 'number']
    },
    image: {
      type: 'string',
      maxLength: 255,
      errorMessage: {
        maxLength: '长度不超过255个字符'
      }
    },
    pageIndex: {
      type: 'number'
    },
    pageSize: {
      type: 'number'
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

/**
 * 创建博客
 * @param data
 * @returns {ajv.ErrorObject}
 */
function blogValidator (data = {}) {
  return validator(BLOG_SCHEMA, data)
}

module.exports = {
  useValidator,
  blogValidator
}
