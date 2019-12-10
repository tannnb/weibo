const { Blog, User } = require('./model')

!(async (ctx, next) => {
    const delBlogRes = await Blog.destroy({
        where: {
            id: 4
        }
    })
    console.log('delBlogRes', delBlogRes)

    // 删除一个用户
    const delUserRes = await User.destroy({
        where: {
            id: 1
        }
    })
    console.log('delUserRes', delUserRes)
})()