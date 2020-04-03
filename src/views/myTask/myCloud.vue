<template>
  <div class="head">
    <div id="myCloud" class="myCloud">
      <el-table :data="tableData" style="width: 100%">
        <template slot="empty">
          <div class="addCloud" />
          暂无虚机，请
          <el-button
            type="text"
            @click="gotoDetail(1)"
          >新增虚机</el-button>
        </template>
        <el-table-column prop="service_provider_name" label="提供商" />
        <el-table-column prop="ip_address" label="IP地址" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="password" label="密码" />
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="gotoDetail(scope.row)"
            >新增</el-button>
            <el-button type="text" size="small" @click="setCloud(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="delCloud(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-sizes="[5, 10, 20, 40]"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import { getMyCloud, delMyCloud } from '@/api/myCloud'
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      total: 1,
      dialogVisible: false,
      id: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleParentClick() {
      this.getList()
    },
    getList() {
      const param = {
        page: this.currentPage,
        limit: this.pagesize
      }
      getMyCloud(param).then(data => {
        this.tableData = data.data
        this.total = data.page.total_count
      })
    },
    gotoDetail(v) {
      this.$router.push({ path: '/setCloud' })
    },
    setCloud(v) {
      this.$router.push({ name: 'setMyCloud', params: v })
    },
    delCloud(v) {
      this.dialogVisible = true
      this.id = v.id
    },
    del() {
      const param = {
        id: this.id
      }
      delMyCloud(param).then(data => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.getList()
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          console.log(1)
        })
        .catch(_ => {})
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      this.getList()
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      this.getList()
    }
  }
}
</script>
<style>
.head{
	background: #fff;
}
.myCloud{
	padding: 15px
}
</style>
