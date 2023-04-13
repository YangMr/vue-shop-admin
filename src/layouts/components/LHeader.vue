<template>
  <div class="l__header">
    <div class="l__logo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      <span>九月编程</span>
    </div>

    <el-icon class="icon__button"><Fold /></el-icon>

    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon__button" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon__button" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>

      <el-dropdown @command="handleCommand" class="px-5">
        <span class="el-dropdown-link">
          <el-avatar
            class="mr-2"
            :size="25"
            :src="$store.getters.getUser.avatar || ''"
          />
          {{ $store.getters.getUser.username || '' }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="updatePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-drawer
      v-model="drawer"
      title="修改密码"
      size="45%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="ruleFormRef"
        :model="passForm"
        status-icon
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="旧密码" prop="oldpassword">
          <el-input
            v-model.trim="passForm.oldpassword"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model.trim="passForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model.trim="passForm.repassword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loadingStatus" @click="submitForm"
            >确认</el-button
          >
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { updatepassword } from '@/api/user'
import type { FormInstance, FormRules } from 'element-plus'
const { isFullscreen, toggle } = useFullscreen()

const router = useRouter()
const store = useStore()

// 定义抽屉的状态 false 关闭 true 打开
const drawer = ref(false)

// 定义按钮loading的状态
const loadingStatus = ref(false)

// 退出登录
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

// 打开修改密码弹窗方法
const handleOpenDrawer = () => {
  drawer.value = true
}

// 点击下拉菜单选项触发的方法
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'updatePassword':
      // 调用打开修改密码弹窗方法
      handleOpenDrawer()
      break
    case 'logout':
      // 退出登录方法
      handleLogout()
      break
  }
}

// 刷新页面方法
const handleRefresh = () => {
  window.location.reload()
  // router.go(0)
}

const ruleFormRef = ref<FormInstance>()

// 确认密码验证函数
const validatorRepassword = (rule: any, value: any, callback: any) => {
  console.log('value=>', value)
  if (value !== passForm.password) {
    return callback(new Error('密码不一致,请重新输入'))
  }
  callback()
}

// 修改密码表单数据
const passForm = reactive({
  oldpassword: '',
  password: '',
  repassword: ''
})

// 表单验证规则
const rules = reactive<FormRules>({
  oldpassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  repassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { validator: validatorRepassword, trigger: 'blur' }
  ]
})

// 修改密码方法
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loadingStatus.value = true
        await updatepassword(passForm)
      } catch (error) {
        console.log('error', error)
      } finally {
        loadingStatus.value = false
      }
      await store.dispatch('handleLogout')
      router.push('/login')
    }
  })
}
</script>

<style>
.l__header {
  @apply flex items-center bg-indigo-700 fixed left-0 right-0;
  height: 64px;
}
.l__logo {
  @apply flex justify-center items-center text-light-50 font-thin text-xl;
  width: 250px;
}
.icon__button {
  @apply flex justify-center items-center text-light-50;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon__button:hover {
  @apply bg-indigo-600;
}
.el-dropdown-link {
  @apply flex justify-center items-center text-light-50;
  height: 64px;
  cursor: pointer;
}
</style>
