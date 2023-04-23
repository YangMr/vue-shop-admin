<template>
  <div>
    <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate"
          >新增图片分类</el-button
        >
        <el-button type="danger" size="small">上传图片</el-button>
      </el-header>
      <el-container>
        <ImageAside ref="ImgageAsideRef"></ImageAside>
        <ImageMain></ImageMain>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ImageAside from '@/components/ImageAside.vue'
import ImageMain from '@/components/ImageMain.vue'
import { ref } from 'vue'

const windowHeight = window.innerHeight || document.body.clientHeight

const h = windowHeight - 64 - 44 - 40

const ImgageAsideRef = ref()
const handleOpenCreate = () => {
  ImgageAsideRef.value.handleOpenDrawer()
}
</script>

<style>
.image-header {
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
.el-button {
  padding: 0 10px !important;
}
</style>
