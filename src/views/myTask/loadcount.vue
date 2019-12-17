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
          <span>计算能力测试</span>
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
          <span>配置参数：</span>
          <span>
            CUP:{{ count_data.cpu_core_num }}核 &nbsp;内存:{{
            count_data.ram_num
            }}M
          </span>
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
            <td>CUP浮点</td>
            <td>30</td>
            <td>{{ (count_data.scpuFloat * 0.3).toFixed(2) }}</td>
          </tr>
          <tr class="speal" v-for="(item, index) in cpu_float">
            <td>{{ item.tool }}</td>
            <td>{{ item.standard }}</td>
            <td>{{ item.result }}</td>
          </tr>
          <tr>
            <td>CPU整形</td>
            <td>30</td>
            <td>{{ (count_data.scpuInt * 0.3).toFixed(2) }}</td>
          </tr>
          <tr class="speal" v-for="(item, index) in cpu_int">
            <td>{{ item.tool }}</td>
            <td>{{ item.standard }}</td>
            <td>{{ item.result }}</td>
          </tr>

          <tr>
            <td>内存</td>
            <td>40</td>
            <td>{{ (count_data.s_ram * 0.3).toFixed(2) }}</td>
          </tr>
          <tr class="speal" v-for="(item, index) in cpu_s_ram">
            <td>{{ item.tool }}</td>
            <td>{{ item.standard }}</td>
            <td>{{ item.result }}</td>
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
      count_data: {},
      total: "",
      name: "",
      cpu_int: [],
      cpu_float: [],
      cpu_s_ram: [],
      BarChartData: {
        a_Data: [],
        b_Data: [],
        v_Data: [],
        name: ["CPU浮点", "CPU整形", "浮点"]
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
        type: "host"
      };
      vm_test_coun(param).then(data => {
        let count_data = data.data.test_vm;
        this.count_data = count_data;
        this.BarChartData.a_Data = [
          (count_data.scpuFloat * 0.3).toFixed(4) * 1,
          30
        ];
        this.BarChartData.b_Data = [
          (count_data.scpuInt * 0.3).toFixed(4) * 1,
          30
        ];
        this.BarChartData.v_Data = [
          (count_data.s_ram * 0.4).toFixed(4) * 1,
          40
        ];
        this.total =
          count_data.scpuFloat * 0.3 +
          count_data.scpuInt * 0.3 +
          count_data.s_ram * 0.4;
        this.cpu_int = data.data.test_result_list.filter(
          v => v.metric == "cpu_int"
        );
        this.cpu_float = data.data.test_result_list.filter(
          v => v.metric == "cpu_float"
        );
        this.cpu_s_ram = data.data.test_result_list.filter(
          v => v.metric == "cpu_s_ram"
        );
      });
    }
  }
};
</script>
<style lang="scss" >
.loadcount {
  button {
    position: absolute;
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
</style>
