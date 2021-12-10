import layoutHeaderAside from "@/layout/index.vue";
const meta = { auth: true };
export default {
  path: "/",
  redirect: { name: "Index" },
  component: layoutHeaderAside,
  title: "主要管理",
  children: [
    // 首页
    {
      path: "/index",
      name: "Index",
      meta: {
        auth: true,
        cache: true,
        title: "首页"
      },
      component: () => import("@/views/Index.vue")
    },
    // about
    {
      path: "/about",
      name: "About",
      meta: {
        auth: true,
        cache: true,
        title: "About内容"
      },
      component: () => import("@/views/About.vue")
    }
  ]
};
