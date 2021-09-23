import router from '@/router' // 必须引入router
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 注意要引入css样式文件


router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start() // 进度条开始
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

// // 进度条的配置项：ease可以设置css3动画，如ease，linear；speed是进度条从开始到结束的耗时
// NProgress.configure({ease:'linear',speed: 500});




// NProgress.configure({     
//   easing: 'ease',  // 动画方式    
//   speed: 500,  // 递增进度条的速度    
//   showSpinner: false, // 是否显示加载ico    
//   trickleSpeed: 200, // 自动递增间隔    
//   minimum: 0.3 // 初始化时的最小百分比
// })