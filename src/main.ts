import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
// 引入ant框架
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// // 进度条的配置项已经路由守卫
// import './utils/nprogress'
const app = createApp(App)
const win: any = window // 
if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
    // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
}
app
  .use(router)
  .use(store)
  .use(Antd)
  .mount("#app");
