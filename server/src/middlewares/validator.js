const { ErrorModel } = require('../utils')
/**
 * 生成json schema验证中间件
 * @returns {validator}
 * @param validateFn
 */
function genValidator (validateFn) {
  async function validator (ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      ctx.body = new ErrorModel(-1, error.message ? error.message : '数据格式校验错误')
      return
    }
    // 验证成功
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}
