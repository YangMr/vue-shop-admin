<template>
  <div>
    <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
      <el-header class="image-header">Header</el-header>
      <el-container>
        <ImageAside></ImageAside>
        <ImageMain></ImageMain>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'

const windowHeight = window.innerHeight || document.body.clientHeight

const h = windowHeight - 64 - 44 - 40
</script>

<style>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>
