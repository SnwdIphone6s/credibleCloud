<template>
  <div
    id="pdfDom"
    class="loadcount"
  >
    <el-button
      type="primary"
      round
      @click="getPdf('UCloud性能测试')"
    >下载为PDF</el-button>
    <div class="chart">
      <p class="duibi til">得分</p>
      <bar-chart :chart-data="BarChartData" />
    </div>

  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { getScore } from '@/api/pdf'
import BarChart from './rankBar'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      BarChartData: {
        dataScore: [],
        name: []
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() { },
  methods: {
    getList() {
      const param = {
        testId: this.testId,
        type: 'host'
      }
      getScore(param).then(data => {

      })
    }
  }
}
</script>
<style lang="scss" >
.loadcount {
  button {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  text-align: center;
  width: 80%;
  margin: auto;
  .header {
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: 30px;
  }
  > .line {
    height: 4px;
    background: #5db5fc;
  }
  .body {
    > div {
      display: flex;
      margin: auto;
      justify-content: center;
      > p {
        margin: 0px;
        margin-top: 30px;
      }
      > p:nth-child(1) {
        margin-right: 20px;
      }
    }
    > .name {
      font-weight: 600;
      font-size: 18px;
    }
  }
  .chart {
    margin-top: 30px;
    > p:nth-child(1) {
      width: 55%;

      font-size: 18px;
      font-weight: 600;
    }
  }
  .detailData {
    table {
      margin: auto;
      text-align: left;
      tbody {
        tr {
          > td:nth-child(1) {
            width: 300px;
          }
        }
      }
      th {
        border-bottom: 2px solid #5db5fc;
        width: 150px;
        height: 80px;
      }
      td {
        width: 100px;
        height: 30px;
      }
      .speal {
        font-size: 12px;
        td:nth-child(1) {
          padding-left: 20px;
          border-left: 2px solid #5db5fc;
        }
      }
    }
  }
  .til {
    font-size: 18px;
    font-weight: 600;
  }
}
@media screen and (max-width: 620px) {
  .loadcount {
    .body {
      > div {
        display: block;
      }
    }
  }
}
</style>
