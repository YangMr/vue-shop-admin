<template>
  <div>
    <el-result icon="warning" title="404提示" sub-title="你找的页面走丢了">
      <template #extra>
        <el-button type="primary" @click="handleFullBack">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup type="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

// 返回主页
const handleFullBack = ()=> {
  router.push('/')
}
</script>

<style lang="sass"></style>
