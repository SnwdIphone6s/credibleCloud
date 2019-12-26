<template>
  <div id="pdfDom_me" class="loadcount">
    <el-button type="primary" round @click="getPdf_me('UCloud存储IO能力测试')">下载为PDF</el-button>
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
          <span>磁盘IO能力</span>
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
        <p>
          <span>磁盘类型：</span>
          <span>{{ count_data.product_type }}</span>
        </p>
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
          <td>总分</td>
          <td>100</td>
          <td>{{ total }}</td>
          <tr>
            <td>4K随机</td>
            <td>50</td>
            <td>{{ k4_num * 1 }}</td>
          </tr>
          <tr class="left_td">
            <td>磁盘吞吐量 读</td>
            <td> {{ count_data.randread_4k_mbs_standard }} (MB/s)</td>
            <td> {{ count_data.randread_4k_mbs_result }} (MB/s)</td>
          </tr>
          <tr class="left_td">
            <td>磁盘吞吐量 写</td>
            <td> {{ count_data.randwrite_4k_mbs_standard }} (MB/s)</td>
            <td>{{ count_data.randwrite_4k_mbs_result }} (MB/s)</td>
          </tr>
          <tr class="left_td">
            <td>IOPS 读</td>
            <td> {{ count_data. randread_4k_iops_standard }} (io/s)</td>
            <td>{{ count_data.randread_4k_iops_result }} (io/s)</td>
          </tr>
          <tr class="left_td">
            <td>IOPS 写</td>
            <td> {{ count_data.randwrite_4k_iops_standard }} (io/s)</td>
            <td>{{ count_data.randwrite_4k_iops_result }} (io/s)</td>
          </tr>
          <tr v-if="count_data.randread_4k_avg_res_time_usec_standard || count_data.randread_4k_avg_res_time_usec_result" class="left_td">
            <td>平均响应时间 读 </td>
            <td v-if="count_data.randread_4k_avg_res_time_usec_standard"> {{ count_data.randread_4k_avg_res_time_usec_standard }} (ms)</td>
            <td v-if="count_data.randread_4k_avg_res_time_usec_result">{{ count_data.randread_4k_avg_res_time_usec_result }} (ms)</td>
          </tr>
          <tr v-if="count_data. randwrite_4k_avg_res_time_usec_standard || count_data.randwrite_4k_avg_res_time_usec_result" class="left_td">
            <td>平均响应时间 写</td>
            <td v-if="count_data. randwrite_4k_avg_res_time_usec_standard"> {{ count_data. randwrite_4k_avg_res_time_usec_standard }} (ms)</td>
            <td v-if="count_data.randwrite_4k_avg_res_time_usec_result">{{ count_data.randwrite_4k_avg_res_time_usec_result }} (ms)</td>
          </tr>
          <tr>
            <td>64k随机</td>
            <td>50</td>
            <td>{{ k64_num * 1 }}</td>
          </tr>

          <tr class="left_td">
            <td>磁盘吞吐量 读</td>
            <td> {{ count_data.read_64k_mbs_standard }} (MB/s)</td>
            <td> {{ count_data.read_64k_mbs_result }} (MB/s)</td>
          </tr>
          <tr class="left_td">
            <td>磁盘吞吐量 写</td>
            <td> {{ count_data.write_64k_mbs_standard }} (MB/s)</td>
            <td>{{ count_data.write_64k_mbs_result }} (MB/s)</td>
          </tr>
          <tr class="left_td">
            <td>IOPS 读</td>
            <td> {{ count_data.read_64K_iops_standard }} (io/s)</td>
            <td>{{ count_data.read_64K_iops_result }} (io/s)</td>
          </tr>
          <tr class="left_td">
            <td>IOPS 写</td>
            <td> {{ count_data.write_64_iops_standard }} (io/s)</td>
            <td>{{ count_data.write_64_iops_result }} (io/s)</td>
          </tr>
          <tr v-if="count_data. read_64k_avg_res_time_usec_standard || count_data.read_64k_avg_res_time_usec_result" class="left_td">
            <td>平均响应时间 读 </td>
            <td v-if="count_data. read_64k_avg_res_time_usec_standard"> {{ count_data. read_64k_avg_res_time_usec_standard }} (ms)</td>
            <td v-if="count_data.read_64k_avg_res_time_usec_result">{{ count_data.read_64k_avg_res_time_usec_result }} (ms)</td>
          </tr>
          <tr v-if="count_data. write_64k_avg_res_time_usec_standard || count_data.write_64k_avg_res_time_usec_result" class="left_td">
            <td>平均响应时间 写</td>
            <td v-if="count_data. write_64k_avg_res_time_usec_standard"> {{ count_data. write_64k_avg_res_time_usec_standard }} (ms)</td>
            <td v-if=" count_data.write_64k_avg_res_time_usec_result">{{ count_data.write_64k_avg_res_time_usec_result }} (ms)</td>
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
      k4_num: '',
      k64_num: '',
      name: '',
      cpu_int: [],
      cpu_float: [],
      cpu_s_ram: [],
      BarChartData: {
        a_Data: [],
        b_Data: [],
        name: ['4K随机', '64K顺序']
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
        type: 'block'
      }
      vm_test_coun(param).then(data => {
        const count_data = data.data
        this.count_data = count_data
        this.BarChartData.a_Data = [
          count_data.score_4k.toFixed(2) * 1,
          count_data.total_4k_small_weight
        ]
        this.BarChartData.b_Data = [
          count_data.score_64k.toFixed(2) * 1,
          count_data.total_64k_large_weight
        ]
        this.k4_num = count_data.score_4k.toFixed(2)
        this.k64_num = count_data.score_64k.toFixed(2)
        this.total = (count_data.score_4k + count_data.score_64k).toFixed(2)
      })
    }
  }
}
</script>
<style lang="scss">
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
        width: 150px;
        height: 80px;
      }
      td {
        width: 100px;
        height: 30px;
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
