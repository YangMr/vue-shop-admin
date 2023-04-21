<template>
  <div>
    <BaseTable :tableData="tableData" :columns="columns">
      <template v-slot:action>
        <el-button type="primary" text>修改</el-button>
        <el-button type="primary" text>删除</el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { getLeverList } from '@/api/level'
import { ref } from 'vue'
import BaseTable from '@/components/BaseTable.vue'

const columns = [
  {
    label: '会员等级',
    prop: 'name'
  },
  {
    label: '折扣率',
    prop: 'discount'
  },
  {
    label: '等级序号',
    prop: 'level'
  },
  {
    label: '状态',
    prop: 'status',
    type: 'function',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    callback: (row) => {
      return `<el-switch v-model="row.status" />`
    }
  },
  {
    label: '操作',
    type: 'slot',
    slot_name: 'action'
  }
]

const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const getData = async () => {
  try {
    const res = await getLeverList(currentPage.value)
    tableData.value = res.list
    total.value = res.total
  } catch (error) {
    console.log(error)
  }
}
getData()
</script>

<style lang="sass"></style>
