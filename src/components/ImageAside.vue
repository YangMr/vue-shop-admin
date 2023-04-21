<template>
  <el-aside width="220px" class="image__aside" v-loading="loading">
    <div class="top">
      <AsideList
        v-for="(item, index) in imageCategoryList"
        :key="index"
        :active="item.id == activeId"
        @edit="handleEdit"
        @close="handleClose"
        @click="handleToggle(item.id)"
        >{{ item.name }}</AsideList
      >
    </div>
    <div class="bottom">
      <el-pagination
        v-model:current-page="currentPage"
        background
        layout=" prev,next"
        :total="400"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import AsideList from '@/components/AsideList.vue'
import { getImageCategoryList } from '@/api/image'
import { ref } from 'vue'

// loading加载
const loading = ref(false)
// 页码
const currentPage = ref(1)
// 总条数
const total = ref(0)
// 默认要选中的列表的id
const activeId = ref()
// 分页按钮禁用
const disabled = ref(false)

// 图片分类列表数据
const imageCategoryList = ref([])

// 初始化数据
const getImageCategoryData = async () => {
  try {
    loading.value = true
    const res = await getImageCategoryList(currentPage.value)
    imageCategoryList.value = res.list
    total.value = res.totalCount
    if (res.list[0].id) {
      activeId.value = res.list[0].id
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
getImageCategoryData()

// 编辑
const handleEdit = () => {
  alert('edit')
}

// 删除
const handleClose = () => {
  alert('close')
}

// 图片分类列表分页工功能
const handleCurrentChange = (page) => {
  console.log(currentPage.value)
  if (currentPage.value > total.value / 10) {
    disabled.value = true
    currentPage.value = 2
    return
  }
  currentPage.value = page
  getImageCategoryData()
}

// 列表切换
const handleToggle = (id) => {
  if (id) activeId.value = id
}
</script>

<style>
.image__aside {
  position: relative;
  border-right: 1px solid #eeeeee;
}
.image__aside .top {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 50px;
  right: 0;
  overflow-y: auto;
}
.image__aside .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  @apply flex justify-center items-center;
}
</style>
