<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="time_start"
        label="测试时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="test_name"
        label="任务名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="provider"
        label="提供商">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP地址">
      </el-table-column>
      <el-table-column
        prop="status"
        label="测试进度">
      </el-table-column>
<!--       <el-table-column
  prop="result"
  label="结果">
</el-table-column> -->
      <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
         v-if='scope.row.status == 100'
          @click="gotoDetail(scope.row)"
          type="text"
          size="small">
          查看详情
        </el-button>
        <el-button
        v-else='scope.row.status == 100'
           disabled
          type="text"
          size="small">
          查看详情
        </el-button>
      </template>
    </el-table-column>
    </el-table> 
  </div>
</template>
<script>
  import { testInstance } from '@/api/myTask'
  import Cookies from 'js-cookie'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      let param ={
        type:'block',
      }
testInstance(param).then(data=>{
  if(data.data.length){
  this.tableData = data.data  
  }
  
})
    },
    gotoDetail(v){
      let count  = v
      this.$router.push({ path: '/download_momory', query: { testId: v.id }})
      // Cookies.set('count',count)
      // this.$router.push({ name: 'downloadComputingPower' })
    }
  }
}
</script>
<style>
  
</style>