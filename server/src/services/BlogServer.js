const { Blog, User } = require('../db/model/index')
const { formatUser, formatTime } = require('../utils/index')

async function createBlog ({ id, content, image }) {
  let result = await Blog.create({
    userId: id,
    content,
    image
  })
  return result.dataValues
}

/**
 * <根据用户查询博客列表>
 * @param userName 用户名
 * @param pageIndex 页数
 * @param pageSize 数量
 * @returns {Promise<void>}
 */
async function getBlogListByUser ({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: {
      model: User,
      attributes: ['userName', 'nickName', 'picture'],
      where: userWhereOpts
    }
  })
  let blogList = result.rows.map(row => row.dataValues)
  blogList = blogList.map(blogItem => {
    blogItem.createdAt = formatTime(blogItem.createdAt)
    blogItem.updatedAt = formatTime(blogItem.updatedAt)
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    total: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
