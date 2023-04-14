<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    @close="handleClose"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" :loading="loadingStatus" @click="submit">{{
          confirmText
        }}</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showDrawer = ref(false)

// 定义按钮loading的状态
const loadingStatus = ref(false)

// 开启loading
const showLoading = () => {
  loadingStatus.value = true
}

// 关闭loading
const hideLoading = () => {
  loadingStatus.value = false
}

// 打开
const open = () => {
  showDrawer.value = true
}

// 关闭
const close = () => {
  showDrawer.value = false
}

// 子传父
// eslint-disable-next-line no-undef
const emit = defineEmits(['submit', 'close'])
const submit = () => {
  emit('submit')
}

// 关闭弹窗之后会触发的方法
const handleClose = () => {
  emit('close')
}

// 接收父组件传递的参数
// eslint-disable-next-line no-undef
defineProps({
  title: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: '提交'
  },
  size: {
    type: [String, Number],
    default: '45%'
  }
})

// 向父组件暴露以下方法
// eslint-disable-next-line no-undef
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
})
</script>

<style lang="scss">
.formDrawer {
  width: 100%;
  height: 100%;
  @apply flex flex-col relative;
}
.body {
  flex: 1;
  overflow-y: auto;
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 50px;
}
.actions {
  height: 50px;
  @apply flex items-center mt-auto;
}
</style>
