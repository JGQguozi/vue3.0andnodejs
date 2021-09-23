<template>
  <a-layout>
    <!-- 顶部区域 -->
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys2"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <!-- 左侧区域 -->
    <a-layout :style="{ height: '92vh' }">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu
          id="dddddd"
          :style="{ lineHeight: '64px' }"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          theme="dark"
          @click="handleClick"
        >
          <a-sub-menu v-for="subitem in leftMenuData" :key="subitem.path">
            <template #title>
              <Icon-font :type="subitem.icon" />
              <span>{{ subitem.name }}</span>
            </template>
            <a-menu-item v-for="item in subitem.children" :key="item.path">{{
              item.name
            }}</a-menu-item>
          </a-sub-menu>
          <!-- <a-sub-menu key="sub1" @titleClick="titleClick">
            <template #icon>
              <MailOutlined />
            </template>
            <template #title>Navigation One</template>
            <a-menu-item-group key="g1">
              <template #icon>
                <QqOutlined />
              </template>
              <template #title>Item 1</template>
              <a-menu-item key="1">Option 1</a-menu-item>
              <a-menu-item key="2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group key="g2" title="Item 2">
              <a-menu-item key="3">Option 3</a-menu-item>
              <a-menu-item key="4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <template #icon>
              <AppstoreOutlined />
            </template>
            <template #title>Navigation Two</template>
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="7">Option 7</a-menu-item>
              <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title>Navigation Three</template>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu> -->
        </a-menu>
      </a-layout-sider>

      <a-layout style="padding: 0 24px 24px">
        <!-- 右侧区域 -->
        <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
        <!-- 右侧内容路由 -->
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item
            ><a href="">Application Center</a></a-breadcrumb-item
          >
          <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>
        <!-- 右侧内容区域 -->
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            <router-view />
          </div>
        </a-layout-content>
        <!-- 右侧底部区域 -->
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
// import {
//   MailOutlined,
//   QqOutlined,
//   AppstoreOutlined,
//   SettingOutlined
// } from "@ant-design/icons-vue";
import { defineComponent, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "layoutIndex",
  components: {
    // MailOutlined,
    // QqOutlined,
    // AppstoreOutlined,
    // SettingOutlined
  },
  setup() {
    const { proxy, ctx }: any = getCurrentInstance();
    const route = useRoute();
    const leftMenuData = proxy.$router.options.routes;
    console.log("路由数据", route);
    return {
      leftMenuData
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
