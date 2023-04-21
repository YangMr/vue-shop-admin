<template>
  <el-container class="h-[100%]">
    <el-header>
      <LHeader></LHeader>
    </el-header>
    <el-container class="h-[100%]">
      <el-aside class="h-[100%]" :style="{ width: $store.state.asideWidth }">
        <LMenu></LMenu>
      </el-aside>
      <el-main>
        <!-- <div style="height: 64px"></div> -->
        <!-- 标签导航栏 -->
        <LTagsList></LTagsList>
        <!-- 展示菜单模块对应的内容 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LHeader from './components/LHeader.vue'
import LMenu from './components/LMenu.vue'
import LTagsList from './components/LTagsList.vue'
</script>

<style lang="scss">
.el-header {
  padding: 0;
  // position: fixed;
  // height: 64px;
  // z-index: 1000;
}
.el-aside {
  transition: all 0.2s;
}
.el-main {
  // padding: 0;
  box-sizing: border-box;
}
</style>
