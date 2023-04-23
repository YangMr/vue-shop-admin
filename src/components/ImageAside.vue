<template>
  <el-aside width="220px" class="image__aside" v-loading="loading">
    <div class="top">
      <AsideList
        v-for="(item, index) in imageCategoryList"
        :key="index"
        :active="item.id == activeId"
        @edit="handleEdit(item)"
        @close="handleClose(item)"
        @click="handleToggle(item.id)"
        >{{ item.name }}</AsideList
      >
    </div>
    <div class="bottom">
      <el-pagination
        v-model:current-page="currentPage"
        background
        layout=" prev,next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-aside>

  <FormDrawer ref="FormDrawerRef" :title="title" @submit="handleSubmit">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      status-icon
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="ruleForm.order" :min="1" :max="100000" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup lang="ts">
import AsideList from '@/components/AsideList.vue'
import {
  getImageCategoryList,
  addImageCategory,
  updateImageCategory,
  deleteImageCategory
} from '@/api/image'
import { ref, reactive } from 'vue'
import FormDrawer from '@/components/FormDrawer.vue'

// loading加载
const loading = ref(false)
// 页码
const currentPage = ref(1)
// 总条数
const total = ref(0)
// 默认要选中的列表的id
const activeId = ref()

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

// 删除
const handleClose = async (row) => {
  try {
    loading.value = true
    await deleteImageCategory(row.id)
    getImageCategoryData()
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// 图片分类列表分页工功能
const handleCurrentChange = (page) => {
  currentPage.value = page
  getImageCategoryData()
}

// 列表切换
const handleToggle = (id) => {
  if (id) activeId.value = id
}

// 抽屉数据
const title = ref('新增')
const FormDrawerRef = ref()
const ruleFormRef = ref()
const editId = ref()

// 打开抽屉弹窗方法
const handleOpenDrawer = () => {
  editId.value = 0
  title.value = '新增'
  ruleForm.name = ''
  ruleForm.order = 50
  FormDrawerRef.value.open()
}

// 编辑
const handleEdit = (row) => {
  console.log('row=>', row)
  editId.value = row.id
  title.value = '修改'
  ruleForm.name = row.name
  ruleForm.order = row.order
  FormDrawerRef.value.open()
}

// 关闭抽屉弹窗方法
const handleCloseDrawer = () => {
  FormDrawerRef.value.close()
}

// 导出
// eslint-disable-next-line no-undef
defineExpose({
  handleOpenDrawer,
  handleCloseDrawer
})

// 表单数据

const ruleForm = reactive({
  name: '',
  order: 50
})
// 校验规则
const rules = reactive({
  name: [{ required: true, message: '图库分类名称不能为空', trigger: 'blur' }]
})

// 提交数据
const handleSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      editId.value === 0 ? addImageCategoryData() : updateImageCategoryData()
    } catch (error) {
      console.log(error)
    }
  })
}

// 新增分类数据
const addImageCategoryData = async () => {
  try {
    console.log('editId', editId.value)
    FormDrawerRef.value.showLoading()
    await addImageCategory(ruleForm)
    handleCloseDrawer()
    getImageCategoryData()
  } catch (error) {
    console.log(error)
  } finally {
    FormDrawerRef.value.hideLoading()
  }
}
// 编辑分类技术

const updateImageCategoryData = async () => {
  try {
    FormDrawerRef.value.showLoading()
    await updateImageCategory(editId.value, ruleForm)
    handleCloseDrawer()
    getImageCategoryData()
  } catch (error) {
    console.log(error)
  } finally {
    FormDrawerRef.value.hideLoading()
  }
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
