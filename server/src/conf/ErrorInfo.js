/**
 * 错误信息集合
 * @type {{SECRET: string}}
 */
module.exports = {
  registerUserNameExistInfo: '用户名已被注册',
  registerUserNameNotExistInfo: '用户名未存在',
  registerFailInfo: '注册失败',
  jsonSchemaFileInfo: '数据格式校验错误',
  loginFailInfo: '登录失败,用户名或密码错误!',
  tokenExpireInfo: '登录已过期，请重新登录',
  tokenFailInfo: '暂无访问权限',
  uploadFileSizeFailInfo: '文件上传体积过大，图片最大为1M'
}
