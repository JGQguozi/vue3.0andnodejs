import Vue from "vue";
import { toRaw } from "@vue/reactivity";
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    // 单位信息
    unit: {}
  },
  getters: {
    getUserInfo: (state) => {
      return toRaw(state.info);
    },
    getUserRole: (state) => {
      const info = toRaw(state.info);
      const { user_role } = info;
      // 0: 账户锁定无权限(noAccess) 1: 普通用户(common) 2: 管理员(admin) 3: 超级管理员(superadmin)
      let arr = [];
      switch (user_role) {
        case 0:
          arr.push("noAccess");
          break;
        case 1:
          arr.push("common");
          break;
        case 2:
          arr.push("admin");
          break;
        case 3:
          arr.push("superadmin");
          break;
      }
      return arr;
    }
  },
  mutations: {
    setUserInfo(state, items) {
      state.info = items;
      console.log("user==>", toRaw(state.info));
    },
    setLoading(state, isShowLoading) {
      alert(2);
    }
  }
  // actions: {
  //   /**
  //    * @description 设置用户数据
  //    * @param {Object} context
  //    * @param {*} info info
  //    */
  //   async set({ state, dispatch }, info) {
  //     // store 赋值
  //     state.info = info;
  //     // 持久化
  //     await dispatch(
  //       "d2admin/db/set",
  //       {
  //         dbName: "sys",
  //         path: "user.info",
  //         value: info,
  //         user: true
  //       },
  //       { root: true }
  //     );
  //   },
  //   /**
  //    * @description 设置单位数据
  //    * @param {Object} context
  //    * @param {*} info info
  //    */
  //   async setUnit({ state, dispatch }, unit) {
  //     // store 赋值
  //     alert("setUnit");
  //   },
  //   /**
  //    * @description 从数据库取用户数据
  //    * @param {Object} context
  //    */
  //   async load({ state, dispatch }) {
  //     // store 赋值
  //     const states = await dispatch(
  //       "d2admin/db/get",
  //       {
  //         dbName: "sys",
  //         path: "user",
  //         defaultValue: {},
  //         user: true
  //       },
  //       { root: true }
  //     );
  //     state.info = states.info;
  //     state.unit = states.unit;
  //     Vue.prototype.$apiUrl = states.info ? states.info.apiurl : undefined;
  //     Vue.prototype.$imgUrl = states.info ? states.info.imgurl : undefined;
  //   }
  // }
};
