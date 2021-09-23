<template>
  <div class="about">
    <h1>{{ name }}:{{ age }}岁</h1>
    <div>age * 2 = {{ doubleAge }}</div>
    <a-button type="primary" @click="addFun"> 本地调取数据 </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
export default defineComponent({
  name: "about",
  components: {},
  setup() {
    const name = ref("小李");
    let age = ref(20);
    const addFun = () => {
      age.value++;
    };
    watch(
      () => age.value,
      (val) => {
        console.log(`age is ${val}`);
      }
    );
    const doubleAge = computed(() => age.value * 2);
    return {
      name,
      age,
      doubleAge,
      addFun,
    };
  },
});
</script>