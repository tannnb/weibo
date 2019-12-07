import store from '@/store/index.js'

export const getUid = () => {
  let _uid = ''
  if (_uid) {
    return _uid
  }
  if (!_uid) {
    const t = (new Date()).getUTCMilliseconds()
    _uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10
  }
  return _uid
}

export const _formatMoney = (money) => {
  if (money && money !== null) {
    let LocaleStringMoney = Number(money).toLocaleString()
    return LocaleStringMoney
  }
  return null
}


// vue-router 页面转场动画 js 工具
export function initRouter (Router) {
  // 初始化 key
  let historyKey = Number(sessionStorage.getItem('vue_router_history_key')) || 0

  // 设置 key
  function setHistoryKey (value) {
    historyKey = value
    sessionStorage.setItem('vue_router_history_key', historyKey)
  }

  // 监听浏览器 url 变化
  window.addEventListener('popstate', function (event) {
    let newKey = Number(history.state.key)
    if (newKey > historyKey) {
      store.commit('setPageTransition', 'push')
    } else {
      store.commit('setPageTransition', 'pop')
    }
    setHistoryKey(newKey)
  })

  // 代理 router.push
  let oldPush = Router.prototype.push
  Router.prototype.push = function (...args) {
    setHistoryKey(Number(history.state.key))
    store.commit('setPageTransition', 'push')
    oldPush.apply(this, args)
  }

  // 代理 router.replace
  let oldReplace = Router.prototype.replace
  Router.prototype.replace = function (...args) {
    store.commit('setPageTransition', '')
    oldReplace.apply(this, args)
  }

  // 代理 router.back
  let oldBack = Router.prototype.back
  Router.prototype.back = function (...args) {
    oldBack.apply(this, args)
  }
}
