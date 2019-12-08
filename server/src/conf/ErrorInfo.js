/**
 * 错误信息集合
 * @type {{SECRET: string}}
 */
module.exports = {
  registerUserNameExistInfo: { code: 10001, message: '用户名已存在' },
  registerFailInfo: { code: 10002, message: '注册失败' },
  registerUserNameNotExistInfo: { code: 10003, message: '用户名未存在' },
  jsonSchemaFileInfo: { code: 10009, message: '数据格式校验错误' },
  loginFailInfo: '登录失败,用户名或密码错误!',
  customFileMessage (message) {
    return { code: -1, message }
  }
}
