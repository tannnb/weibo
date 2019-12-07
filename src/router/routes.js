const Main = Loader('layout')
function Loader (router) {
  return () => import(`@/views/${router}`)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: Main,
    redirect: { path: '/home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Loader('layout/home'),
        meta: {
          title: '首页',
          requireAuth: false
        }
      },
      {
        path: '/message',
        name: 'message',
        component: Loader('layout/message'),
        meta: {
          title: '消息',
          requireAuth: false
        }
      },

      {
        path: '/find',
        name: 'find',
        component: Loader('layout/find'),
        meta: {
          title: '发现',
          requireAuth: false
        }
      },
      {
        path: '/user',
        name: 'user',
        component: Loader('layout/user'),
        meta: {
          title: '我的',
          requireAuth: false
        }
      }
    ]
  },
  {
    path: '*',
    component: Main,
    redirect: { path: '/home' }
  }
]
export default routes
