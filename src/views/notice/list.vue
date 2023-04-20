<template>
  <div>
    <el-card shadow="never" style="border: 0">
      <!-- 新增|刷新 -->
      <div class="flex items-center justify-between mb-4">
        <el-button type="primary" size="small" @click="handleOpenDrawer"
          >新增</el-button
        >
        <el-tooltip effect="dark" content="刷新数据" placement="top">
          <el-icon class="cursor-pointer" @click="handleRefresh"
            ><Refresh
          /></el-icon>
        </el-tooltip>
      </div>
      <!-- 公告列表 -->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="title" label="公告标题" />
        <el-table-column prop="content" label="发布时间" width="380" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              text
              @click="handleOpenDrawer(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              title="是否要删除该公告"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDelte(scope.row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="flex item-center justify-center mt-5">
        <el-pagination
          v-model:current-page="currentPage"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
        />
      </div>
    </el-card>

    <!-- 抽屉弹窗 -->
    <FormDrawer ref="formDrawerRef" :title="title" @submit="handleSubmit">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="公告标题" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="ruleForm.content"
            type="textarea"
            placeholder="公告内容"
            :rows="5"
          />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import {
  getNoticeList,
  addNotice,
  deleteNotice,
  updateNotice
} from '@/api/notice'
import FormDrawer from '@/components/FormDrawer.vue'
import { ref, reactive } from 'vue'

// 表格数据
const tableData = ref([])

// loading加载
const loading = ref(false)

// 页码参数
const currentPage = ref(1)
const total = ref(0)

// 抽屉弹窗标题
const title = ref('新增')

// 打开抽屉弹窗
const formDrawerRef = ref()
const handleOpenDrawer = (row) => {
  typeof row.id === 'number' ? (editId.value = row.id) : (editId.value = 0)
  formDrawerRef.value.open()
  console.log('row=>', row)
  if (row) {
    for (var key in ruleForm) {
      ruleForm[key] = row[key]
    }
  }
  handleChangeTitle()
}

// 修改抽屉弹窗标题
const handleChangeTitle = () => {
  editId.value === 0 ? (title.value = '新增') : (title.value = '编辑')
}

// 关闭抽屉弹窗
const handleCloseDrawer = () => {
  formDrawerRef.value.close()
}

// 删除公告列表
const handleDelte = async (id) => {
  try {
    await deleteNotice(id)
    getData()
  } catch (error) {
    console.log(error)
  }
}

// 刷新数据
const handleRefresh = () => {
  getData()
}

// 初始化公告列表
const getData = async () => {
  try {
    loading.value = true
    const res = await getNoticeList(currentPage.value)
    tableData.value = res.list
    total.value = res.totalCount
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
getData()

// 分页页码发生变化触发的方法
const handleCurrentChange = (page) => {
  currentPage.value = page
  getData()
}

// 表单数据
const ruleForm = reactive({
  title: '',
  content: ''
})

const editId = ref(0)

const rules = reactive({
  title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' }],
  content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' }]
})

const ruleFormRef = ref()
const handleSubmit = () => {
  ruleFormRef.value.validate((valid) => {
    if (!valid) return

    editId.value === 0 ? addNoticeData() : updateNoticeData()
  })
}

// 新增
const addNoticeData = async () => {
  try {
    formDrawerRef.value.showLoading()
    await addNotice(ruleForm)
    handleCloseDrawer()
    currentPage.value = 1
    getData()
  } catch (error) {
    console.log(error)
  } finally {
    formDrawerRef.value.hideLoading()
  }
}

// 修改
const updateNoticeData = async () => {
  try {
    formDrawerRef.value.showLoading()
    await updateNotice(editId.value, ruleForm)
    handleCloseDrawer()
    currentPage.value = 1
    getData()
  } catch (error) {
    console.log(error)
  } finally {
    formDrawerRef.value.hideLoading()
  }
}
</script>

<style lang="sass"></style>
