<template>
  <div id="pdfDom_net" class="loadcount">
    <el-button type="primary" round @click="getPdf_net('网络IO能力测试')">下载为PDF</el-button>
    <div class="header">{{ name }}: 云主机众测报告</div>
    <div class="line" />
    <div class="body">
      <div class="name">
        <p>
          <span>任务名称：</span>
          <span>{{ count_data.test_name }}</span>
        </p>
        <p>
          <span>任务类型：</span>
          <span>网络IO能力</span>
        </p>
      </div>
      <div>
        <p>
          <span>测试时间：</span>
          <span>{{ count_data.time_start }}</span>
        </p>
        <p>
          <span>测试者：</span>
          <span>{{ name }}</span>
        </p>
      </div>
      <div>
        <!--        <p>
          <span>磁盘类型：</span>
          <span>{{count_data.product_type}}</span>
        </p>-->
        <p>
          <span>报告来源：</span>
          <span>可信云 ( http://www.kexinyun.org) www.kexinyun.org )</span>
        </p>
      </div>
    </div>
    <div class="chart">
      <p>测试总分: {{ total }}</p>
      <p class="duibi til">测试对比</p>
      <bar-chart :chart-data="BarChartData" />
    </div>
    <div class="detailData">
      <p class="til">详细数值</p>
      <table>
        <thead>
          <tr>
            <th>测试项</th>
            <th>基准值</th>
            <th>我的测试</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>总分</td>
            <td>100</td>
            <td>{{ total }}</td>
          </tr>
          <tr>
            <td>网络吞吐量得分</td>
            <td>50</td>
            <td>{{ bandwith }}</td>
          </tr>
          <tr class="left_td">
            <td>网络吞吐量</td>
            <td>{{ count_data.network_bandwith_standard }} (Mbit/s)</td>
            <td>{{ count_data.network_bandwith_result }} (Mbit/s)</td>
          </tr>
          <tr>
            <td>延时得分</td>
            <td>50</td>
            <td>{{ network }}</td>
          </tr>
          <tr class="left_td">
            <td>延时</td>
            <td>{{ count_data.network_latency_standard }}  (ms)</td>
            <td>{{ count_data.network_latency_result }} (ms)</td>
          </tr>
          <tr>
            <td>测试工具</td>
            <td>{{ count_data.tool }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { vm_test_coun } from '@/api/pdf'
import BarChart from './BarChart'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      product_type: {
        hhd: '普通盘',
        ssd: 'SSD盘'
      },
      count_data: {},
      total: '',
      bandwith: '',
      network: '',
      name: '',
      cpu_int: [],
      cpu_float: [],
      cpu_s_ram: [],
      BarChartData: {
        a_Data: [],
        b_Data: [],
        name: ['网络吞吐量', '延时']
      }
    }
  },
  created() {
    // let count_data_1 = Cookies.get('count')
    const name = Cookies.get('username')
    // this.count_data = JSON.parse(count_data_1)
    this.name = name
    this.testId = this.$route.query.testId
    // console.log(this.count_data)
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      const param = {
        testId: this.testId,
        type: 'network'
      }
      vm_test_coun(param).then(data => {
        const count_data = data.data
        this.count_data = count_data
        const nb_r = count_data.network_bandwith_result
        const nb_s = count_data.network_bandwith_standard
        const nl_r = count_data.network_latency_result
        const nl_s = count_data.network_latency_standard
        this.BarChartData.a_Data = [((nb_r) / (nb_s) * 100 * 0.5).toFixed(2) * 1, 50]

        this.BarChartData.b_Data = [((nl_s) / (nl_r) * 100 * 0.5).toFixed(2) * 1, 50]

        this.total = (((nb_r) / (nb_s) * 100 * 0.5) + ((nl_s) / (nl_r) * 100 * 0.5)).toFixed(2)
        this.bandwith = ((nb_r) / (nb_s) * 100 * 0.5).toFixed(2) * 1
        this.network = ((nl_s) / (nl_r) * 100 * 0.5).toFixed(2) * 1
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
    top:10px;
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
            width: 200px;
          }
        }
         >.left_td{
          >td:nth-child(1){
            padding-left: 20px;
            border-left: 2px solid #5db5fc;
            font-size:12px;
          }
          >td{
            font-size:12px;
          }
        }
      }
      th {
        border-bottom: 2px solid #5db5fc;
        width: 190px;
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
}@media screen and (max-width: 620px) {
.loadcount {
  .body {
    > div {
      display: block;
    }
  }
}
}

</style>
