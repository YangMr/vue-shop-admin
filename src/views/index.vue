<template>
  <div>
    <h2 @click="test">后台首页</h2>
    {{ count }}
    {{ obj.name }}
    <Test></Test>
  </div>
</template>

<script setup lang="ts">
import Test from '@/components/Test.vue'
import { ref, reactive } from 'vue'

// 基本数据类型 string number booelan null undefined
let count = ref(1)

// 引用数据类型 array object
let obj = reactive({
  id: 1,
  name: 'jack',
  array: ['jack', ' rose']
})

let test = () => {
  count.value += 10
  console.log(count)
  obj.name = 'rose'
  console.log(obj)
}
</script>

<style lang="sass"></style>
