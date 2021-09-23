import layoutHeaderAside from "@/layout/index.vue";
const meta = { auth: true };
export default {
  path: "/",
  redirect: { name: "Finance" },
  component: layoutHeaderAside,
  children: [
    {
      path: "/finance/index",
      name: "Finance",
      meta: {
        auth: true,
        cache: true,
        title: "财务首页",
        roles: ["admin", "common"]
      },
      component: () => import("@/views/finance/index.vue")
    },
    {
      path: "/finance/other",
      name: "FinanceOther",
      meta: {
        auth: true,
        cache: true,
        title: "财务other",
        roles: ["common"]
      },
      component: () => import("@/views/finance/other.vue")
    },
    {
      path: "/finance/otherTwo",
      name: "FinanceOtherTwo",
      meta: {
        auth: true,
        cache: true,
        title: "财务otherTwo",
        roles: ["superadmin"]
      },
      component: () => import("@/views//finance/otherTwo.vue")
    }
  ]
};
