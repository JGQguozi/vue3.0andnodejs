import layoutHeaderAside from "@/layout/index.vue";
const meta = { auth: true };
export default {
  path: "/",
  redirect: { name: "Server" },
  component: layoutHeaderAside,
  title: "服务管理",
  children: [
    {
      path: "/server/index",
      name: "Server",
      meta: {
        auth: true,
        cache: true,
        title: "服务首页",
        roles: ["admin", "common"]
      },
      component: () => import("@/views/server/index.vue")
    },
    {
      path: "/server/other",
      name: "ServerOther",
      meta: {
        auth: true,
        cache: true,
        title: "服务其他",
        roles: ["common"]
      },
      component: () => import("@/views/server/other.vue")
    }
  ]
};
