import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { useStore } from "vuex";
import 'nprogress/nprogress.css' // 注意要引入css样式文件
// 路由数据
import routes from './routes'
import localforage from "localforage";
import { asyncRoutesAlready } from "@/utils/asyncRouter.js";
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})
const $store = useStore();
router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start();
  // console.log("路由to", to)
  console.log("路由from", from)
  const myuniquekey = await localforage.getItem("myuniquekey")
  console.log("myuniquekey", myuniquekey)
  // if (!myuniquekey) {
  //   next("/login")
  // } else {
  // asyncRoutesAlready().then((result: any) => {
    // if (to.matched.length) next()
    // next("/nofind")
    // console.log("quanxuan", result,to)
    next()
    // router.push(to.path)
  // });
  // }
  // next()

  
  
  
})

router.afterEach(() => {
  NProgress.done()
})

export default router
