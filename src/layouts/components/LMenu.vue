import component from '../../shims-vue';
<template>
  <div class="l__menu" :style="{ width: $store.state.asideWidth }">
    <!--  :default-active="$route.path"-->
    <el-menu
      :collapse-transition="false"
      :collapse="isCollpase"
      :default-active="$route.path"
      router
      unique-opened
    >
      <template v-for="(item, index) in menus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(itemChild, indexChild) in item.child"
            :key="indexChild"
            :index="itemChild.frontpath"
          >
            <el-icon>
              <component :is="itemChild.icon"></component>
            </el-icon>
            {{ itemChild.name }}
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon><setting /></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isCollpase = computed(() => {
  return !(store.state.asideWidth === '250px')
})

const menus = computed(() => store.state.menus)
</script>

<style lang="scss">
.l__menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  overflow-y: auto;
  @apply shadow-md bg-light-50 fixed;
}
.el-menu {
  border-right: none;
}
</style>
