import allRoutes from "@/router/routes.ts";
import router from "@/router";
import store from "@/store/index.js";
import { userInfo } from "@/api/index.js";
import localforage from "localforage";

/**
 * 判断当前角色是否有访问权限
 * @param  {[Array]} roles [需要筛选的对应角色权限]
 * @param {[Object]} route [当前路由循环内容]
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      const own = route.meta.roles.includes(role);
      return own;
    });
  } else {
    return true;
  }
}
/**
 * 递归过滤异步路由表，筛选角色权限路由
 * @param  {[Array]} routes [受权限管理的路由内容]
 * @param {[Array]} roles [需要筛选的对应角色权限]
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}
/**
 * 获取当前登陆用户所拥有的所有路由数据
 * @param  {[Array]} routes [受权限管理的路由内容]
 */
export function getAsyncTree(routes) {
  let res = [];
  routes.map((route) => {
    if (route.children) {
      res = getAsyncTree(route.children);
    } else {
      res.push(route.path);
    }
  });

  return res;
}
/**
 * 公共设置路由权限数据
 *
 */
export function setJurisdictionRouter() {
  const userRole = store.getters["d2admin/user/getUserRole"];
  const asyncRoutesData = filterAsyncRoutes(allRoutes, userRole);

  console.log("权限路由完成", store);

  // const getRouterMenus = store.getters["d2admin/menus/getRouterMenus"];
  // const getChild = store.getters["d2admin/menus/getChild"];
  // 触发对应所有权限路由事件
  store.dispatch("d2admin/menus/routerTransformCommit", asyncRoutesData);
  const getAllRouterMenus = store.getters["d2admin/menus/getAllRouterMenus"];
  return getAllRouterMenus;
}

/**
 * 获取到对应角色路由数据后，回抛告诉用户路由克最新跳转
 * @param  {[Array]} routes [受权限管理的路由内容]
 * @param {[Array]} roles [需要筛选的对应角色权限]
 * @return {[promise]} [告诉用户准备完成]
 */
export function asyncRoutesAlready() {
  const userInfoStore = store.getters["d2admin/user/getUserInfo"];
  if (!userInfoStore.user_id) {
    userInfo({}).then((result) => {
      if (result) {
        localforage.setItem("myuniquekey", result.user_token);
        store.commit("d2admin/user/setUserInfo", result);
        return Promise.resolve(setJurisdictionRouter());
      }
    });
  }

  return Promise.resolve(setJurisdictionRouter());
}
