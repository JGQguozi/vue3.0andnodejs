<template>
  <router-view />
</template>
<script lang="ts">
import { onMounted } from "vue";
import { filterAsyncRoutes } from "@/utils/asyncRouter.js";
import permissionRoutes from "@/router/permission.ts";
import router from "@/router";
export default {
  name: "FinanceOtherTwo",
  components: {},
  setup() {
    // onMounted(() => {
    //   alert("重新执行");
    //   const asyncRoutesData: any = filterAsyncRoutes(permissionRoutes, [
    //     "admin",
    //     "superadmin"
    //   ]);
    //   asyncRoutesData.map((mapItem: any) => {
    //     router.addRoute(mapItem);
    //   });
    // });

    return {};
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
