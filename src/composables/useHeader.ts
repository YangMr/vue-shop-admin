import { reactive, ref } from 'vue'
import { updatepassword } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
// 修改密码
export function useRepassword() {
  const router = useRouter()
  const store = useStore()

  // 定义抽屉的状态 false 关闭 true 打开
  const formDrawerRef = ref()

  // 打开修改密码弹窗方法
  const handleOpenDrawer = () => {
    formDrawerRef.value.open()
  }

  const ruleFormRef = ref()

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
    oldpassword: [
      { required: true, message: '旧密码不能为空', trigger: 'blur' }
    ],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    repassword: [
      { required: true, message: '确认密码不能为空', trigger: 'blur' },
      { validator: validatorRepassword, trigger: 'blur' }
    ]
  })

  // 修改密码方法
  const submitForm = () => {
    ruleFormRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          formDrawerRef.value.showLoading()
          await updatepassword(passForm)
        } catch (error) {
          console.log('error', error)
        } finally {
          formDrawerRef.value.hideLoading()
        }
        await store.dispatch('handleLogout')
        router.push('/login')
      }
    })
  }

  // 关闭弹窗之后重置表单
  const handleClose = () => {
    ruleFormRef.value.resetFields()
  }

  return {
    ruleFormRef,
    formDrawerRef,
    handleOpenDrawer,
    passForm,
    rules,
    submitForm,
    handleClose
  }
}

// 退出登录
export function useLogout() {
  const router = useRouter()
  const store = useStore()

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

  return {
    handleLogout
  }
}
