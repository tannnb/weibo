const { Blog, User } = require('./model')

!(async (ctx, next) => {
    const zhangsan = await User.update({ nickName: '张三2' }, {
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('zhangsan', zhangsan[0] > 0)

})()