const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../utils')
const { getToken } = require('../middlewares/loginCheck')
const { PAGE_SIZE } = require('../conf/constants')
const { createBlog, getBlogListByUser } = require('../services/BlogServer')
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

/**
 * <获取个人主页微博列表>
 * @param userName
 * @param pageIndex
 * @param pageSize
 * @returns {Promise<void>}
 */
async function getProfileBlogList (userName, pageIndex = 0, pageSize = PAGE_SIZE) {
  let result = await getBlogListByUser({ userName, pageIndex, pageSize })
  let blogList = result.blogList
  return new SuccessModel({
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    total: result.total
  })
}

/**
 * <获取广场话题>
 * @param pageIndex
 * @param pageSize
 * @returns {Promise<void>}
 */
async function getSquareList (pageIndex, pageSize) {
  let result = await getBlogListByUser( {pageIndex, pageSize} )
  let blogList = result.blogList
  return new SuccessModel({
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    total: result.total
  })
}

module.exports = {
  create,
  getBlogListByUser,
  getProfileBlogList,
  getSquareList
}
