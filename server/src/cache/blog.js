const {get,set} = require('./_redis')
const {getSquareList} = require('../controller/blogController')
const KEY_PREFIX = 'weibo:square'
/**
 * <获取广场列表缓存>
 * @param pageIndex
 * @param pageSize
 * @returns {Promise<void>}
 */
async function getSquareCacheList(pageIndex,pageSize) {
  const key = `${KEY_PREFIX}_${pageIndex}_${pageSize}`

  // 读取缓存
  const cacheResult = await get(key)
  if(cacheResult !== null) {
    return cacheResult
  }
  // 缓存过期，读取数据库
  const result = await getSquareList(pageIndex,pageSize)

  // 设置缓存
  set(key,result,60)
  return result

}
module.exports = {
  getSquareCacheList
}
