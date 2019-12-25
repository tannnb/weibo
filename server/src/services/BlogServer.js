const { Blog } = require('../db/model/index')

async function createBlog ({ id, content, image }) {
  let result = await Blog.create({
    userId: id,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}
