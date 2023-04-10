<template>
  <el-row class="login__container">
    <!-- 左侧 -->
    <el-col :lg="16" :md="12" class="left">
      <div>欢迎光临</div>
    </el-col>
    <!-- 右侧 -->
    <el-col :lg="8" :md="12" class="right">
      <h2 class="right__title">欢迎回来</h2>

      <div class="right__sub__title">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>

      <el-form
        ref="ruleLoginFormRef"
        :rules="rules"
        :model="form"
        class="w-[250px]"
      >
        <el-form-item prop="username">
          <el-input v-model.trim="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            color="#626aef"
            type="password"
            v-model.trim="form.password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round class="w-[250px]" type="primary" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleLoginFormRef = ref<FormInstance>(null)

const form = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})

const onSubmit = () => {
  ruleLoginFormRef.value.validate((valid) => {
    console.log('valid=>', valid)
  })
}
</script>

<style lang="postcss">
.login__container {
  @apply bg-indigo-500 min-h-screen;
}
.left {
  @apply flex justify-center items-center;
}
.left > div {
  @apply font-bold text-sm text-light-50 mb-4;
}
.right {
  @apply bg-light-50 flex justify-center items-center flex-col;
}
.right .right__title {
  @apply font-bold text-3xl text-gray-800;
}
.right .right__sub__title {
  @apply text-gray-300 my-5 flex items-center justify-center space-x-2;
}
.right .line {
  @apply h-[1px] bg-gray-200 w-16;
}

@media only screen and (min-width: 1200px) {
  .el-col-lg-16 {
    display: flex !important;
  }
  .el-col-lg-8 {
    display: flex !important;
  }
}
@media only screen and (min-width: 992px) {
  .el-col-lg-16 {
    display: flex !important;
  }
  .el-col-lg-8 {
    display: flex !important;
  }
}
</style>
