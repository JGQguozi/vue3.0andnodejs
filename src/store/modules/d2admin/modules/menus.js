// import Vue from "vue";
import { toRaw } from "@vue/reactivity";
export default {
  namespaced: true,
  state: {
    menus: [],
    routerMenus: [],
    navigationTreeMenus: [],
    whiteList: ["/login", "/nofind", "/index"]
  },
  getters: {
    getRouterMenus: (state) => {
      return toRaw(state.routerMenus);
    },
    getNavigationMenus: (state) => {
      return toRaw(state.navigationTreeMenus);
    },
    getMenus: (state) => {
      return toRaw(state.menus);
    },
    getAllRouterMenus: (state) => {
      return state;
    }
  },
  mutations: {
    setMenus(state, datas) {
      state.menus = datas;
    },
    setRouterMenus: (state) => {
      const whiteList = state.whiteList;
      let arr = [];
      state.menus.map((mapItem) => {
        if (mapItem.children) {
          mapItem.children.filter((mapItemChildItem) => {
            if (whiteList.indexOf(mapItemChildItem.path) === -1) {
              arr.push(mapItemChildItem.path);
            }
          });
        } else {
          if (whiteList.indexOf(mapItem.path) === -1) {
            arr.push(mapItem.path);
          }
        }
      });
      state.routerMenus = [...arr];
    },
    setNavigationMenus: (state) => {
      const whiteList = state.whiteList;
      const menus = [...state.menus];
      const newMenus = menus.filter((filterItem) => {
        if (filterItem.children) {
          filterItem.children = filterItem.children.filter(
            (filterChildrenItem) => {
              return whiteList.indexOf(filterChildrenItem.path) === -1;
            }
          );
        }
        return whiteList.indexOf(filterItem.path) === -1;
      });

      state.navigationTreeMenus = newMenus;
    }
  },
  actions: {
    setMenusActions({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("setMenus", data);
        resolve();
      });
    },
    // 设置路由对应数据
    routerSetActin({ commit }) {
      commit("setRouterMenus");
      commit("setNavigationMenus");
    },
    // 路由数据转变操作
    async routerTransformCommit({ dispatch, state }, data) {
      await dispatch("setMenusActions", data);
      dispatch("routerSetActin");
      console.log("执行routerTransformCommit最后完成", state);
    }
  }
};
