<template>
  <div>{{ d.num.toFixed(0) }}</div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { reactive, watch } from 'vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  count: {
    type: [Number, String],
    default: ''
  }
})
const d = reactive({
  num: 0
})
const animateToValue = () => {
  gsap.to(d, {
    duration: 1,
    num: props.count
  })
}
animateToValue()
watch(
  () => props.count,
  () => {
    animateToValue()
  }
)
</script>

<style lang="scss"></style>
