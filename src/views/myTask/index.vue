<template>
  <div class="computing">
    <h4>任务列表</h4>
    <div class="mission">
      <el-tabs type="border-card"  v-model="activeName">
        <el-tab-pane label="计算能力" name="message"><count> </count></el-tab-pane>
        <el-tab-pane label="存储IQ能力" name="memory"><memory></memory></el-tab-pane>
        <el-tab-pane label="网络IQ能力"><net></net></el-tab-pane>
      </el-tabs>
    <el-button type="primary" size='mini' style='position: absolute;right:10px;top:5px;' @click="gotoCreat">发起新任务</el-button>
    </div>
  </div>
</template>
<script>
import Count from './count.vue'
import Net from './net.vue'
import Memory from './memory.vue'
export default {
  data() {
    return {
      driver: null,
      activeName: 'message',
      modules:[{moduleName:'添加新任务'}]
    }
  },
  components:{
Count,
Memory,
Net,
  },
  mounted() {},
  methods: {
     //    handleClick(tab, event) {
     // if(this.activeName == 'message'){
     //  this.$emit('activeName_change', true)
     // }else{
     //  this.$emit('activeName_change', false)
     // }
     //  },
      gotoCreat(){
        if(this.activeName == 'message'){
          this.$router.push({ name: 'computing' })
        } else if(this.activeName == 'memory'){
this.$router.push({name:'block-test'})
        }else{
          console.log(1)
        }
        
      }
  }
}

</script>
<style lang="scss" scoped>
.computing {
      margin: 50px 160px;

  h4 {
    display: block;
    font-size: 24px;
    color: #38448e;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 46px;
  }
>.mission{
  position:relative;
}
}

</style>
