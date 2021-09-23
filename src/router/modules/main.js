import layoutHeaderAside from "@/layout/index.vue";
const meta = { auth: true };
export default {
  path: "/",
  redirect: { name: "Index" },
  component: layoutHeaderAside,
  children: [
    // 首页
    {
      path: "index",
      name: "Index",
      meta: {
        auth: true,
        cache: true
      },
      component: () => import("@/views/Index.vue")
    },
    // about
    {
      path: "about",
      name: "About",
      meta: {
        auth: true,
        cache: true
      },
      component: () => import("@/views/About.vue")
    }
  ]
};
