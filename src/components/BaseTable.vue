<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <template v-for="(item, index) in columns" :key="index">
      <el-table-column
        v-if="item.sequence"
        :type="item.type"
        :width="item.width"
        :label="item.label"
      ></el-table-column>
      <el-table-column
        v-else-if="!item.type"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter"
      />
      <el-table-column
        v-else-if="item.type == 'function'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template #default="scope">
          <span v-html="item.callback && item.callback(scope.row)"></span>
        </template>
      </el-table-column>

      <el-table-column v-else-if="item.type === 'slot'" :label="item.label">
        <template #default="scope">
          <slot :row="scope.row" :name="item.slot_name"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss"></style>
