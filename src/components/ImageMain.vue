<template>
  <el-main class="image-main">
    <div class="top">
      <p v-for="(item, index) in 100" :key="index">{{ index }}</p>
    </div>
    <div class="bottom">底部分页</div>
  </el-main>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.image-main {
  position: relative;
}
.image-main .top {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 50px;
  right: 0;
  overflow-y: auto;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  @apply flex justify-center items-center;
}
</style>
