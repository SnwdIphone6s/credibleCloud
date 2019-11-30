<template>
  <div class="loadcount" id="pdfDom">
    <el-button type="primary" round @click="getPdf('UCloud性能测试')">下载为PDF</el-button>
    <div class="header">{{name}}: 云主机众测报告</div>
    <div class="line"></div>
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
          <span>{{count_data.product_type}}</span>
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
      <bar-chart :chartData="BarChartData" />
    </div>
    <div class="detailData">
      <p class="til">详细数值</p>
      <table>
        <thead>
          <tr>
            <th>测试项</th>
            <th>宽带</th>
            <th>IOPS</th>
            <th>反应时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">4K随机</td>
            <td>读 {{count_data.bandwidth_small_read_ran}}</td>
            <td>读 {{count_data.iops_small_read_ran}}</td>
            <td>读 {{count_data.latency_small_read_ran}}</td>
          </tr>
          <tr>
            <td>写 {{count_data.bandwidth_small_write_ran}}</td>
            <td>写 {{count_data.iops_small_write_ran}}</td>
            <td>写 {{count_data.latency_small_write_ran}}</td>
          </tr>
          <tr>
            <td rowspan="2">64K顺序</td>
            <td>读 {{count_data.bandwidth_large_read_seq}}</td>
            <td>读 {{count_data.iops_large_read_seq}}</td>
            <td>读 {{count_data.latency_large_read_seq}}</td>
          </tr>
          <tr>
            <td>写 {{count_data.bandwidth_large_write_seq}}</td>
            <td>写 {{count_data.iops_large_write_seq}}</td>
            <td>写 {{count_data.latency_large_write_seq}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { vm_test_coun } from "@/api/pdf";
import BarChart from "./BarChart";
export default {
  components: {
    BarChart
  },
  data() {
    return {
      product_type: {
        hhd: "普通盘",
        ssd: "SSD盘"
      },
      count_data: {},
      total: "",
      name: "",
      cpu_int: [],
      cpu_float: [],
      cpu_s_ram: [],
      BarChartData: {
        a_Data: [],
        b_Data: [],
        name: ["4K随机", "64K顺序"]
      }
    };
  },
  created() {
    // let count_data_1 = Cookies.get('count')
    let name = Cookies.get("username");
    // this.count_data = JSON.parse(count_data_1)
    this.name = name;
    this.testId = this.$route.query.testId;
    // console.log(this.count_data)
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      let param = {
        testId: this.testId,
        type: "block"
      };
      vm_test_coun(param).then(data => {
        let count_data = data.data;
        this.count_data = count_data;
        this.BarChartData.a_Data = [
          count_data.score_4k.toFixed(4) * 1,
          count_data.total_4k_small_weight
        ];
        // this.count_data = count_data;
        // this.BarChartData.a_Data = [
        //   (count_data.scpuFloat ).toFixed(4) * 1,
        //   30
        // ];
        this.BarChartData.b_Data = [
          count_data.score_64k.toFixed(4) * 1,
          count_data.total_64k_large_weight
        ];
        // this.BarChartData.v_Data = [
        //   (count_data.s_ram ).toFixed(4) * 1,
        //   40
        // ];
        this.total = count_data.score_4k + count_data.score_64k;
        // this.cpu_int = data.data.test_result_list.filter(
        //   v => v.metric == "cpu_int"
        // );
        // this.cpu_float = data.data.test_result_list.filter(
        //   v => v.metric == "cpu_float"
        // );
        // this.cpu_s_ram = data.data.test_result_list.filter(
        //   v => v.metric == "cpu_s_ram"
        // );
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.loadcount {
  button {
    position: fixed;
    right: 20px;
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
</style>
