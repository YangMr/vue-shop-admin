<template>
  <div>
    <el-row :gutter="20" v-if="panels.length === 0">
      <el-col :span="6" :offset="0" v-for="(item, index) in 4" :key="index">
        <el-skeleton style="width: 100%">
          <template #template>
            <el-card shadow="hover">
              <template #header>
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </template>
              <el-skeleton-item variant="h3" style="width: 80%" />
              <el-divider />
              <div class="flex justify-between text-sm text-gray-500">
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 10%" />
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>

    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in panels"
        :key="index"
      >
        <el-card shadow="hover">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain"> 年 </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <CountTo :count="item.value" />
          </span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <IndexNav />

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexChart v-permission="['getStatistics2,GET']" />
      </el-col>
      <el-col :span="12" :offset="0" v-permission="['getStatistics3,GET']">
        <IndexCard
          title="店铺及商品提示"
          tip="店铺及商品提示"
          class="mb-5"
          :data="goods"
        />
        <IndexCard
          title="交易提示"
          tip="需要立即处理的交易订单"
          :data="order"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CountTo from '@/components/CountTo.vue'
import IndexNav from '@/components/IndexNav.vue'
import IndexChart from '@/components/IndexChart.vue'
import IndexCard from '@/components/IndexCard.vue'
import { getStatistics1, getStatistics2 } from '@/api/index'
import { ref } from 'vue'

const panels = ref([])
const goods = ref([])
const order = ref([])

const getPanelCount = async () => {
  try {
    const res = await getStatistics1()
    panels.value = res.panels
  } catch (error) {
    console.log(error)
  }
}

getPanelCount()

const getShopCount = async () => {
  try {
    const res = await getStatistics2()
    console.log(res)
    goods.value = res.goods
    order.value = res.order
  } catch (error) {
    console.log(error)
  }
}
getShopCount()
</script>

<style lang="scss">
.el-card {
  border: 0 !important;
}
.el-card__header {
  --tw-bg-opacity: 1;
  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  padding: 0.5rem !important;
}
</style>
