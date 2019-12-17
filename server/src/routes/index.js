const router = require('koa-router')()
const axios = require('axios')

router.get('/', async (ctx, next) => {
  ctx.body = {
    title: 'Hello Koa 2!'
  }
})

router.get('/getLn', async (ctx, next) => {
  let result = await axios({
    url: 'https://restapi.amap.com/v3/direction/driving',
    method: 'get',
    headers: {
      'Referer': 'https://lbs.amap.com'
    },
    params: {
      'origin': '103.110569,29.974046',
      'destination': '102.010358,30.065138',
      'extensions': '',
      's': 'rsv3',
      'strategy': 0,
      'ferry': 0,
      'key': '608d75903d29ad471362f8c58c550daf',
      'platform': 'JS',
      'logversion': '2.0',
      'appname': 'https://lbs.amap.com/api/javascript-api/example/callapp/drivingonapp',
      'csid': 'A128FB37-03E2-44BD-8126-524A4B5488DE',
      'sdkversion': '1.4.15'
    }
  })
  const { route } = result.data
  let paths = route.paths[0].steps

  let resultArr = []
  paths.map(path => {
    let item = path.polyline.split(';')
    for (let i = 0; i < item.length; i++) {
      let iValue = item[i].split(',')
      resultArr.push([Number(iValue[1]), Number(iValue[0])])
    }
  })

  ctx.body = {
    code: 0,
    msg: 'ok',
    data: resultArr
  }
})

module.exports = router
