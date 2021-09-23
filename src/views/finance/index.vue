<template>
  <div class="home">
    财务页面
    <a-button type="primary" @click="getFun"> click me </a-button>
    <div v-for="(item, index) in list" :key="index">
      <span>{{ item.name }} : {{ item.age }}</span>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getCompanyDetail } from "@/api/index.js";

export default {
  name: "Finance",
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
