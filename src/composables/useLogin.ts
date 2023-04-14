import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import type { FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '@/composables/utils'
export function useLogin() {
  const store = useStore()
  const router = useRouter()
  const ruleLoginFormRef = ref()
  const loadingInstance = ref(false)

  const form = reactive({
    username: ''
  })

  const rules = reactive<FormRules>({
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
  })

  const onKeyUp = (e: any) => {
    if (e.key == 'Enter') {
      onSubmit()
    }
  }

  onMounted(() => {
    window.addEventListener('keyup', onKeyUp)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', onKeyUp)
  })

  const onSubmit = () => {
    // 第一种 推荐
    ruleLoginFormRef.value.validate(async (valid: any) => {
      if (!valid) return
      loadingInstance.value = true

      try {
        const res = await store.dispatch('handleLogin', form)
        if (!res) return

        toast('登录成功')

        router.push('/')
      } catch (error) {
        console.log('error', error)
      } finally {
        loadingInstance.value = false
      }
    })
  }
  return {
    ruleLoginFormRef,
    loadingInstance,
    form,
    rules,
    onSubmit
  }
}
