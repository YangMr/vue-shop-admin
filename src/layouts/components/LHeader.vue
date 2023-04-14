<template>
  <div class="l__header">
    <div class="l__logo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      <span>九月编程</span>
    </div>

    <el-icon class="icon__button" @click="$store.commit('setAsideWidth')">
      <Fold v-if="$store.state.asideWidth === '250px'" />
      <Expand v-else />
    </el-icon>

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

    <!-- title size confirmText -->
    <FormDrawer
      @close="handleClose"
      @submit="submitForm"
      title="修改密码"
      ref="formDrawerRef"
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
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import FormDrawer from '@/components/FormDrawer.vue'
import { useFullscreen } from '@vueuse/core'
import { useRepassword, useLogout } from '../../composables/useHeader'
const { isFullscreen, toggle } = useFullscreen()

const {
  ruleFormRef,
  formDrawerRef,
  handleOpenDrawer,
  passForm,
  rules,
  submitForm,
  handleClose
} = useRepassword()

const { handleLogout } = useLogout()

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
