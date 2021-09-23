import axios from "axios"; // 引用axios
import config from "@/api/config";
import { message } from "ant-design-vue";
import router from "@/router";
import localforage from "localforage";

axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL: "http://localhost:9999",
  timeout: 60000
});
// request拦截器z`
service.interceptors.request.use(
  async (config) => {
    // if (store.getters.token) {
    // config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }

    await localforage.getItem("myuniquekey").then((res) => {
      // 添加token
      config.headers.authorization = res;
    });
    return config;
  },
  (error) => {
    // Do something with request error
    console.log("请求拦截报错:", error);
    Promise.reject(error);
  }
);
// response 拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非200是抛错
     */
    const res = response.data;
    if (res.code === -1) {
      message.error(res.message || "接口有误");
      return null;
    } else if (res.code === 200) {
      return res.data;
    } else if (res.code === 401 || res.code === 402) {
      let text;
      switch (res.code) {
        case 401:
          text = `未登陆,前往登录`;
          break;
        case 402:
          text = `token过期,重新登录`;
          break;
      }
      message.error(text);
      router.push("/login");
      return null;
    }
  },
  (error) => {
    console.log("err===>", error["response"]); // for debug
    // const keys = Object.keys(error)
    const { status } = error["response"];
    let msg = "";
    switch (status) {
      case 500:
        msg = "接口异常,请联系管理员";
        break;
    }
    message.error(msg != "" ? msg : "接口报错，前往查看");
    return Promise.reject(error);
  }
);
// get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
