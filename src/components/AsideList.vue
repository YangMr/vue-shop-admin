<template>
  <div class="aside-list" :class="{ selected: active }">
    <span><slot></slot></span>
    <el-button
      class="ml-auto px-1"
      text
      size="small"
      type="primary"
      @click="$emit('edit')"
    >
      <el-icon :size="12">
        <Edit />
      </el-icon>
    </el-button>
    <el-popconfirm
      width="160"
      confirm-button-text="确定"
      cancel-button-text="取消"
      title="是否要删除该分类？"
      @confirm="$emit('close')"
    >
      <template #reference>
        <el-button class="px-1" text size="small" type="primary">
          <el-icon :size="12">
            <Close />
          </el-icon>
        </el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line no-undef
defineEmits(['edit', 'close'])
</script>

<style>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center  p-3 text-sm text-gray-600;
}
.el-button {
  padding: 5px 0 !important;
}
.aside-list:hover {
  @apply bg-blue-50;
}
.selected {
  @apply bg-blue-50;
}
</style>
