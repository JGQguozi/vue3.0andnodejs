<template>
  <div class="home">
    server other
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getCompanyDetail } from "@/api/index.js";

export default {
  name: "ServerOther",
  components: {},
  setup() {
    let state = reactive({
      list: []
    });
    const getFun = async () => {
      let res: any = await getCompanyDetail();
      const { data } = res;
      if (data) {
        state.list = data;
      }
    };
    onMounted(() => {
      getFun;
    });

    return {
      getFun,
      ...toRefs(state)
    };
  }
};
</script>
