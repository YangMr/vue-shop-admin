<template>
  <div>
    <el-button
      type="primary"
      style="margin-left: 10px"
      icon="el-icon-plus"
      @click="handleLogout"
      >退出登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()

const handleLogout = () => {
  ElMessageBox.confirm('是否要退出登录？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await store.dispatch('handleLogout')
      router.push('/login')
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style lang="sass"></style>
