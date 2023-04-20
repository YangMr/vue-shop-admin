<template>
  <div class="tags__list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @edit="handleTabsEdit"
      @tab-change="handleTabChange"
      style="min-width: 100px"
    >
      <el-tab-pane
        :closable="item.path !== '/'"
        v-for="item in tagList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag__btn">
      <el-dropdown @command="handleCommand">
        <span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
// const route = useRoute()
const cookie = useCookies()
const router = useRouter()
const route = useRoute()

const activeTab = ref(route.path)
const tagList = ref([
  {
    title: '后台首页',
    path: '/'
  }
])

interface TabPaneRule {
  title: string
  path: string
}
// 添加tab的方法
const addTab = (route: TabPaneRule) => {
  const index = tagList.value.findIndex((item) => item.path === route.path)
  if (index === -1) {
    tagList.value.push(route)
    cookie.set('tagList', tagList.value)
  }
}

// 解决刷新taglist数据丢失的问题
const initTagList = () => {
  const tag = cookie.get('tagList')

  if (tag) {
    tagList.value = tag
  }
}
initTagList()

// 路由更新的时候就会触发
onBeforeRouteUpdate((to) => {
  activeTab.value = to.path
  addTab({
    title: to.meta.title,
    path: to.path
  })
})

const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: 'remove'
) => {
  if (action === 'remove') {
    let tabs = tagList.value
    let a = activeTab.value

    if (a === targetName) {
      tabs.forEach((item, index) => {
        if (item.path === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }

    activeTab.value = a

    tagList.value = tagList.value.filter((tab) => tab.path !== targetName)
    cookie.set('tagList', tagList.value)
  }
}

// 点击下拉菜单项触发的方法
const handleCommand = (command) => {
  switch (command) {
    case 'closeOther':
      tagList.value = tagList.value.filter(
        (item) => item.path === '/' || item.path === activeTab.value
      )
      cookie.set('tagList', tagList.value)
      break
    case 'closeAll':
      tagList.value = [
        {
          title: '后台首页',
          path: '/'
        }
      ]
      activeTab.value = '/'
      cookie.set('tagList', tagList.value)
      break
  }
}

const handleTabChange = (activeName) => {
  activeTab.value = activeName
  router.push(activeName)
}
</script>
<style scoped>
.tags__list {
  @apply flex fixed items-center right-0 px-2;
  height: 44px;
  z-index: 999;
  top: 64px;
  background-color: rgba(243, 244, 246, 1);
}
.tag__btn {
  @apply ml-auto px-2 bg-white flex items-center justify-center rounded;
  height: 32px;
  margin-top: -10px;
}
.el-icon--right {
  color: #000;
  @apply ml-0;
}
:deep(.el-tabs__header) {
  @apply mb-0 border-0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white rounded mx-1;
}
:deep(.el-tabs__nav-prev),
:deep(.el-tabs__nav-next) {
  line-height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
