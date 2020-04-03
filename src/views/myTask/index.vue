<template>
  <div class="computing">
    <div class="mission">

      <el-tabs
        :tab-position="tabPosition"
        class="myTask"
        @tab-click="handleClick"
      >
        <el-tab-pane
          id="qwqw"
          label="我的虚机"
          class="myTask_item"
          style="height:120"
        >
          <myCloud ref="child1" />
        </el-tab-pane>
        <el-tab-pane
          label="虚机任务"
          class="myTask_item"
          style="height:120"
        >
          <oldIndex />
        </el-tab-pane>
        <el-tab-pane
          label="虚机排名"
          class="myTask_item"
          style="height:120"
        >
          <cloudRank />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

import oldIndex from './oldIndex'
import cloudRank from './cloudRank'
import myCloud from './myCloud'
export default {
  components: {
    myCloud,
    oldIndex,
    cloudRank
  },
  data() {
    return {
      tabPosition: 'left'
    }
  },
  mounted() { },
  methods: {
    handleClick(tab, event) {
      if (tab.label === '我的虚机') {
        this.$refs.child1.handleParentClick()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.computing {
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
  }
}
  @media screen and (max-width: 1224px) and (min-width: 982px) {
    .computing {
      margin: 50px 60px;
    form{
      padding: 50px;
      width: 70%;
    }
   }
 }
  @media screen and (min-width: 1224px) {
    .computing {
      margin: 50px 160px;
    form{
      padding: 50px;
      width: 50%;
      margin: auto;
    }
   }
  }
  @media screen and (max-width: 982px) and (min-width: 730px) {
    .computing {
      margin: 50px 30px;
    form{
      padding: 50px;
      width: 70%;
    }
   }
  }
  @media screen and (max-width: 730px) and (min-width: 544px) {
    .computing {
      margin: 50px 20px;
    form{
      padding: 50px;
      width: 70%;
    }
   }
  }
  @media screen and (max-width: 544px) {
    .computing {
      margin: 50px 10px;
    form{
      padding: 20px;
      width: 70%;
    }
   }
  }
</style>
