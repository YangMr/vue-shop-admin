<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-sm">{{ title }}</span>
          <el-tag type="success" effect="plain">{{ tip }} </el-tag>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in data"
          :key="index"
        >
          <el-card shadow="hover" style="background: rgba(246, 246, 246, 1)">
            <div class="flex flex-col justify-center items-center">
              <span class="text-xl mb-2">{{ item.value }}</span>
              <span class="text-xs text-gray-500">{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// eslint-disable-next-line no-undef
defineProps({
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss"></style>
