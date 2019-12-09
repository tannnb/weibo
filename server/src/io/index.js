/**
 * 连接socket
 * @param io
 * @returns {Promise<void>}
 */
async function connectSocket (io) {
  let times = null
  // 监听connect事件
  io.of('/chat').on('connection', socket => {
    socket.emit('open', `chat服务端连接成功,连接id: ${socket.id}`)
    console.log('chat客户端连接成功')

    socket.on('updateUserInfo', userInfo => {
      console.log('接到客户端发来信息:', userInfo)
    })

    // 客户端断开连接
    socket.on('disconnect', () => {
      console.log('连接已断开')
    })

    times && clearInterval(times)
    // 广播向所有socket连接
    times = setInterval(() => {
      socket.broadcast.emit('hotNews', '今日有雨，气温12℃ 请注意保暖!')
    }, 5000)
  })

  io.of('/news').on('connection', socket => {
    socket.emit('open', 'news服务端连接成功')
    console.log('news客户端连接成功')
  })
}

module.exports = {
  connectSocket
}
