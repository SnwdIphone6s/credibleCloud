<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ a_Data, b_Data, v_Data, name } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          x: 'right', // 可设定图例在左、右、居中
          y: 'top', // 可设定图例在上、下、居中
          padding: [60, 100, 0, 0], // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
          data: name
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['我的测试', '基准值']
        },
        series: [
          {
            name: name[0],
            type: 'bar',
            stack: '总量',
            barWidth: 30, // 柱图宽度
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: a_Data
          },
          {
            name: name[1],
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: b_Data
          },
          {
            name: name[2],
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: v_Data
          }
        ]
      })
    }
  }
}
</script>
