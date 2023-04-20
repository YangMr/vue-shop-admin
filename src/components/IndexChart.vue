<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="flex justify-between items-center">
          <span>订单统计</span>
          <div>
            <el-check-tag
              @click="handleCheckTag(item)"
              v-for="(item, index) in options"
              :key="index"
              :checked="item.type === type"
              style="margin-right: 8px"
              >{{ item.name }}</el-check-tag
            >
          </div>
        </div>
      </template>
      <!-- card body -->
      <div ref="el" id="chart"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { getStatistics3 } from '@/api/index'
// import { useResizeObserver } from '@vueuse/core'

const type = ref('week')

const options = [
  { name: '近1个月', type: 'month' },
  { name: '近1周', type: 'week' },
  { name: '近24小时', type: 'hour' }
]

const handleCheckTag = (item) => {
  type.value = item.type
  getData()
}
var myChart = null
onMounted(() => {
  var chartDom = document.getElementById('chart')
  if (chartDom) {
    myChart = echarts.init(chartDom)
    getData(chartDom, myChart)
  }
})

onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart)
})

const getData = async () => {
  var option

  option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }

  try {
    const res = await getStatistics3(type.value)
    option.xAxis.data = res.x
    option.series[0].data = res.y
  } catch (error) {
    console.log(error)
  }

  option && myChart.setOption(option)
}
const el = ref(null)
// useResizeObserver(el, () => {
//   console.log('!23')
//   myChart.resize()
// })

window.addEventListener('resize', () => {
  myChart.resize()
})
</script>

<style lang="scss">
#chart {
  width: 100%;
  height: 300px;
}
</style>
