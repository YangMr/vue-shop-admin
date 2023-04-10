<template>
  <div>
    <button class="btn1 bg-green-900 text-light-50 p-4 mx-4 rounded-md">
      按钮
    </button>
    <button class="btn2 bg-green-900 text-light-50 p-4 mx-4 rounded-md">
      按钮2
    </button>
    <button class="btn">按钮3</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Login'
})
</script>
<style lang="scss">
.btn1 {
  @apply bg-green-900 text-light-50 p-4 mx-4 rounded-md;
}
.btn {
  @apply bg-green-900 duration-150 focus:ring-8 ring-yellow-500 text-light-50 p-4 mx-4 transition-all rounded-md hover:text-dark-50 hover:bg-light-200;
}
</style>
