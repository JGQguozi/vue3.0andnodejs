// import Vue from "vue";
import { toRaw } from "@vue/reactivity";
export default {
  namespaced: true,
  state: {
    menus: [],
    whiteList: ["/login", "/nofind"]
  },
  getters: {
    getTreeMenus: (state) => {
      const calldatas = state.menus.filter((filterItem) => {
        return state.whiteList.indexOf(filterItem.path) === -1;
      });
      return toRaw(calldatas);
    },
    getChild: (state, getters) => {
      let res = [];
      // console.log("getters.getChild", getters.getChild);
      state.menus.map((route) => {
        if (route.children) {
          console.log("aaaaaaa");
          res = getters.getChild(route.children);
        } else {
          res.push(route.path);
        }
      });

      return res;
    }
  },
  mutations: {
    setMenus(state, datas) {
      state.menus = datas;
      console.log("menus==>", toRaw(state.menus));
    },
    setLoading(state, isShowLoading) {
      alert(2);
    }
  }
};
