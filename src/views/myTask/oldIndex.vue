<template>
  <div class="oldComputing">
    <!-- <h4>任务列表</h4> -->
    <div class="mission">
      <el-tabs
        v-model="activeName"
        type="border-card"
      >
        <el-tab-pane
          label="计算能力"
          name="message"
        >
          <count />
        </el-tab-pane>
        <el-tab-pane
          label="存储能力"
          name="memory"
        >
          <memory />
        </el-tab-pane>
        <el-tab-pane label="网络能力" name="net">
          <net />
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="primary"
        size="mini"
        style="position: absolute;right:10px;top:5px;"
        @click="gotoCreat"
      >发起新任务</el-button>
    </div>
  </div>
</template>
<script>
import Count from './count.vue'
import Net from './net.vue'
import Memory from './memory.vue'
export default {
  components: {
    Count,
    Memory,
    Net
  },
  data() {
    return {
      driver: null,
      activeName: 'message',
      modules: [{ moduleName: '添加新任务' }]
    }
  },
  mounted() {},
  methods: {
    // handleClick(tab, event) {
    //  console.log(this.activeName)
    //  console.log(tab)
    // if(this.activeName == 'message'){
    //  this.$emit('activeName_change', true)
    // }else{
    //  this.$emit('activeName_change', false)
    // }
    // },
    gotoCreat() {
      if (this.activeName == 'message') {
        this.$router.push({ name: 'computing' })
      } else if (this.activeName == 'memory') {
        this.$router.push({ name: 'block-test' })
      } else {
        this.$router.push({ name: 'net-test' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.oldComputing {
  margin: 0px 10px;
  h4 {
    display: block;
    font-size: 24px;
    color: #38448e;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 20px;
  }
  > .mission {
    position: relative;
  }
}
@media screen and (max-width: 1240px) and (min-width: 1024px) {
  .oldComputing {
    margin: 0px 10px;
  }
}
@media screen and (max-width: 1024px) and (min-width: 870px) {
  .oldComputing {
    margin: 0px 10px;
  }
}
@media screen and (max-width: 870px) and (min-width: 740px) {
  .oldComputing {
    margin: 0px 10px;
  }
}
@media screen and (max-width: 544px) {
  .oldComputing {
    margin: 0px 5px;
  }
}
</style>
