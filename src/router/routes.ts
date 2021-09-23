import { RouteRecordRaw } from 'vue-router'
import main from './modules/main.js'
import finance from './modules/finance.js'


const frameInt = [
  main,
  finance
]

const frameOut = [
  // login
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登陆',
      auth: true,
      cache: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/nofind',
    name: '404',
    component: () => import('@/views/system/404/index.vue')
  }
]
const routes: Array<RouteRecordRaw> = [
  ...frameInt,
  ...frameOut
]
export default routes