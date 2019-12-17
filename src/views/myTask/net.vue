<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time_start" label="测试时间" width="180"></el-table-column>
      <!--       <el-table-column
        prop="test_name"
        label="任务名称"
        width="180">
      </el-table-column>-->
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          <p>{{scope.row.test_name}}</p>
          <p>任务ID：{{scope.row.id}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="provider" label="提供商"></el-table-column>
      <el-table-column prop="ip" label="IP地址"></el-table-column>
      <el-table-column prop="status" label="测试进度"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 100"
            @click="gotoDetail(scope.row)"
            type="text"
            size="small"
          >查看详情</el-button>
          <el-button v-else="scope.row.status == 100" disabled type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-sizes="[5, 10, 20, 40]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { testInstance } from "@/api/myTask";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 1
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let param = {
        type: "network",
        page: this.currentPage,
        limit: this.pagesize
      };
      testInstance(param).then(data => {
        if (data.data.length) {
          this.tableData = data.data;
          this.total = data.page.total_count;
        }
      });
    },
    gotoDetail(v) {
      let count = v;
      this.$router.push({ path: "/download_net", query: { testId: v.id } });
      // Cookies.set('count',count)
      // this.$router.push({ name: 'downloadComputingPower' })
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.getList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getList();
    }
  }
};
</script>
<style>
</style>