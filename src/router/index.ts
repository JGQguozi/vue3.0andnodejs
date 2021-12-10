import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { asyncRoutesAlready } from "@/utils/asyncRouter.js";
import 'nprogress/nprogress.css' // 注意要引入css样式文件
// 路由数据
import routes from './routes'
import store from "@/store/index.js";
import localforage from "localforage";
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
router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start();
  console.log("路由to", to)
  console.log('store===>',store.state.d2admin.menus)
  // console.log("路由from", from)
  const myuniquekey = await localforage.getItem("myuniquekey")
  console.log("myuniquekey", myuniquekey)
  // if (!myuniquekey) {
  //   next("/login")
  // } else {
  // asyncRoutesAlready().then((result: any) => {
    // if (to.matched.length) next()
    // next("/nofind")
    // console.log("quanxuan", result,to)
    // router.push(to.path)
  // });
  // }
  // next()
  // if()

  const { whiteList, routerMenus, menus } = store.state.d2admin.menus
  if (menus.length === 0) { 
    // 说明数据产库数据被清理
    asyncRoutesAlready().then((routesData: any) => { 
      next()
    })
    // asyncRoutesAlready().then((routesData: any) => {
    //   console.log('routesData',routesData)
    //   if (whiteList.indexOf(to.path) !== -1) {
    //     // 白名单(内容直接前往)
    //     next()
    //   } else { 
    //     // 非白名单内容
    //     if (routerMenus.indexOf(to.path) === -1) {
    //       // 不在路由权限
    //       next("/nofind")
    //     } else { 
          
    //     }

    //   }
    // });
    // return
  }
  if (whiteList.indexOf(to.path) !== -1) {
    // 白名单(内容直接前往)
    next()
  } else { 
    // 非白名单内容
    if (routerMenus.indexOf(to.path) === -1) {
      // 不在路由权限
      next("/nofind")
    } else { 
      next()
    }

  }
    

  
  
  
})

router.afterEach(() => {
  NProgress.done()
})

export default router
