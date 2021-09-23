<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/image/logo.png" />
    <a-button type="primary" @click="getFun"> click me </a-button>
    <div v-for="(item, index) in list" :key="index">
      <span>{{ item.name }} : {{ item.age }}</span>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getCompanyDetail } from "@/api/index.js";
// @Options({
//   components: {
//     HelloWorld,
//   },
// })

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
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
