<template>
  <div class="rankComputing">
    <div class="mission">
      <div class="blockTime">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :editable="false"
          format="yyyy-MM-dd"
          :default-value="timeDefaultShow"
          value-format="yyyy-MM-dd"
          :clearable="false"
          @change="changeTime"
        />
        <el-button type="primary" @click="searchRank">搜索</el-button>
        <el-button
          type="primary"
          @click="getPdf_rank('虚机排名')"
        >下载为PDF
        </el-button>
      </div>
      <div class="cloud">
        <el-transfer
          v-model="value"
          :titles="['全部虚机', '选中虚机']"
          :props="{
            key: 'value',
            label: 'desc'
          }"
          :data="data"
          @change="changeCloud"
        />
      </div>
      <div
        id="pdfDom_rank"
        class="loadcount"
      >
        <div class="chart">
          <p class="duibi til">得分</p>
          <bar-chart :chart-data="BarChartData" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMyCloud } from '@/api/myCloud'
import BarChart from './rankBar'
import { getScore } from '@/api/pdf'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      value1: '',
      vmId: [],
      timeDefaultShow: '',
      start_time: '',
      end_time: '',
      BarChartData: {
        dataScore: [],
        name: []

      },
      data: [],
      value: []
    }
  },
  created() {
    this.timeDefaultShow = new Date()
  },
  mounted() {
    const d = new Date()
    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    // const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
    // const start_time = resDate.slice(0, 7) + '-1 00:00:00'
    // const end_time = resDate.slice(0, 7) + '-31 27:00:00'
    const start_time = resDate.slice(0, 7) + '-1'
    const end_time = resDate.slice(0, 7) + '-31'
    this.start_time = resDate.slice(0, 7) + '-1'
    this.end_time = resDate.slice(0, 7) + '-31'
    const param = {
      start_time,
      end_time,
      vm_id: this.vmId
    }
    this.value1 = [start_time, end_time]
    const params = {
      page: 1,
      limit: 30
    }
    getMyCloud(params).then(cloud => {
      if (cloud.data.length) {
        this.generateData(cloud.data)
        getScore(param).then(data => {
          const rank = data.data
          if (rank.length) {
            rank.map(v => {
              this.BarChartData.dataScore.push(v.vm_score)
              this.BarChartData.name.push(v.service_provider_name)
            })
          } else {
            this.BarChartData.dataScore = []
            this.BarChartData.name = []
          }
        })
      }
    })
  },
  methods: {

    p(s) {
      return s < 10 ? '0' + s : s
    },
    getList() {
      const param = {
        start_time: this.start_time,
        end_time: this.end_time,
        vm_id: this.vmId
      }
      getScore(param).then(data => {
        const rank = data.data
        //     let rank = [
        // {service_provider_name:"阿里巴巴",vm_score:62,},
        // {
        // service_provider_name:"中国联通",
        // vm_score:60,
        // }]
        if (rank.length) {
          rank.map(v => {
            this.BarChartData.dataScore.push(v.vm_score)
            this.BarChartData.name.push(v.service_provider_name)
          })
        } else {
          this.BarChartData.dataScore = []
          this.BarChartData.name = []
        }
      })
    },
    changeTime(e) {
      if (e) {
        this.start_time = e[0]
        this.end_time = e[1]
      }
    },
    generateData(clo) {
      const data = []
      for (let i = 0; i < clo.length; i++) {
        data.push({
          value: clo[i].id,
          desc: clo[i].service_provider_name
        })
      }
      this.data = data
    },
    changeCloud(e) {
      this.vmId = e
    },
    searchRank() {
      this.BarChartData.dataScore.length = 0
      this.BarChartData.name.length = 0
      this.getList()
    }
  }
}
</script>
<style lang="scss">
.rankComputing {
  margin: 0px 10px;
  h4 {
    display: block;
    font-size: 24px;
    color: #38448e;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 46px;
  }
  > .mission {
    position: relative;
    margin: auto;
    width: 100%;
    background: #fff;
  }
  form {
    padding: 50px;
    width: 50%;
    margin: auto;
  }
  .el-select {
    width: 100%;
  }
  .blockTime {
    display: flex;
    padding: 15px 20px 0px;
    button{
      margin-left:.5%;
    }
  }
  .cloud{
    padding: 20px;
  }
  .loadcount{
    button {
      position:absolute;
      right:0px;
    }
  }
  .chart {
    width: 100%;
    .duibi {
      margin-left: 20px;
      display: flex;
    justify-content: space-between;
    }
  }
}
@media screen and (max-width: 1240px) and (min-width: 1024px) {
  .rankComputing {
    margin: 0px 10px;
  }
}
@media screen and (max-width: 1024px) and (min-width: 870px) {
  .rankComputing {
    margin: 0px 10px;
  }
}
@media screen and (max-width: 870px) and (min-width: 740px) {
  .rankComputing {
    margin: 0px 10px;
  }
}
@media screen and (max-width: 544px) {
  .rankComputing {
    margin: 0px 1px;
  }
}
</style>
