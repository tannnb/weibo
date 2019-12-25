const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../utils')
const { getToken } = require('../middlewares/loginCheck')
const { createBlog } = require('../services/BlogServer')
const { createBlogFailInfo } = require('../conf/ErrorInfo')

/**
 * <创建微博>
 * @returns {Promise<void>}
 */
async function create (ctx, params) {
  let { id } = await getToken(ctx)
  const { content, image } = params
  try {
    let result = await createBlog({ id, content: xss(content), image })
    return new SuccessModel(result)
  } catch (e) {
    console.log(e.message, e.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}
