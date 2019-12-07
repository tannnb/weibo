const { Blog, User } = require('./model')

!(async (ctx, next) => {
    const zhangsan = await User.findOne({
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('zhangsan', zhangsan.dataValues)

    const zhangsanName = await User.findOne({
        attributes: ['userName', 'nickName'],
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('查询特定列', zhangsanName.dataValues)

    const zhangsanBlogList = await Blog.findAll({
        where: {
            userId: 1
        },
        order: [
            ['id', 'desc']
        ]
    })
    console.log('查询特定用户记录列表', zhangsanBlogList.map(blog => blog.dataValues))


    // 分页
    const blogPageList = await Blog.findAll({
        limit: 2,
        offset: 0,
        order: [
            ['id', 'desc']
        ]
    })

    // 查询总数
    const blogListAndCount = await Blog.findAndCountAll({
        limit: 2,
        offset: 0,
        order: [
            ['id', 'desc']
        ]
    })

    //  console.log('总数', blogListAndCount.count, '条数', blogListAndCount.rows)


    // 连表查询
    const blogListWithUser = await Blog.findAndCountAll({
        order: [
            ['id', 'desc'],
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName'],
                where: {
                    userName: 'zhangsan'
                }
            }
        ]
    })
    console.log('blogListWithUser',
        blogListWithUser.count,
        blogListWithUser.rows.map(blog => {
            const blogValue = blog.dataValues
            blogValue.user = blogValue.user.dataValues
            return blogValue
        })
    )


})()