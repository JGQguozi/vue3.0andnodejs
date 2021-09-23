<template>
  <a-layout> 哈哈哈哈 </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { getCompanyDetail, userInfo } from "@/api/index.js";
export default defineComponent({
  name: "Index",
  setup() {
    const funGather = {
      getFun: async () => {
        let res: any = await getCompanyDetail();
      },
      getUser: async () => {
        let res: any = await userInfo();
      },
      handleClick: (e: Event) => {
        console.log("click", e);
      },
      titleClick: (e: Event) => {
        console.log("titleClick", e);
      }
    };
    watch(
      () => openKeys,
      (val) => {
        console.log("openKeys", val);
      }
    );
    onMounted(() => {
      funGather.getFun;
    });
    const openKeys = ref<string[]>(["sub1"]);

    return {
      ...funGather,
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
      selectedKeys2: ref<string[]>(["1"]),
      openKeys
    };
  }
});
</script>
<style lang="scss">
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.ant-layout-header .logo {
  float: left;
  width: 122px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
