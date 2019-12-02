<template>
  <el-row class="panel-group">
    <div class="card-panel" :style="{backgroundImage:'url('+img+')'}">
      <div class="til">
        <div><span>全面</span> <span class="marker"></span><span>分秒必争</span></div>
        <div><div>全面了解云服务性能</div><div>让您的选择分秒必争</div></div>
      </div>
    </div>
    <div class="card-panel_1">
      <div class="left">
        <p class="top">01</p>
        <p class="body">
          我们提供公正公平的统一云评测平台,为您的事业起航助力加油！
        </p>
        <p class="foot">
          In order to set sail your business or career, we helphere to provide fair and equitable platform for your cloud services evaluation.
        </p>
      </div>
      <div class="right" :style="{backgroundImage:'url('+img_1+')'}"></div>
    </div>
    <div class="card-panel_2">
      <div class="right" :style="{backgroundImage:'url('+img_2+')'}"></div>
      <div class="left">
        <p class="top">02</p>
        <p class="body">
          来自世界各地的超大样本量众测结果，为您提供最为专业的指导和最为准确的参考。
        </p>
        <p class="foot">
          <p class="foot">
            To provide you with the most professional guidance and the most accurate reference， we acure large sample measurement results from all over the world.
          </p>
        </p>
      </div>
    </div>
    <div class="left_1" :style="{backgroundImage:'url('+img_4+')'}"> </div>
    <div class="card-panel_3">
      <div class="left">
        <p class="top">03</p>
        <p class="body">
          针对云服务的各类超细分多项诊断评测，为您最实用的比对选择保驾护航。
        </p>
        <p class="foot">
          For your most practical choice than escort, we provide super subdivided several diagnostic evaluation focused on cloud services.
        </p>
      </div>
      <div class="right" :style="{backgroundImage:'url('+img_3+')'}"></div>
    </div>
    <!--     <div class="foot_1" :style="{backgroundImage:'url('+img_5+')'}">
      <div><p>
        <a href="#">关于我们</a><b>|</b>
        <a href="#">联系我们</a><b>|</b>
        <a href="#">云服务库</a><b>|</b>
        <a href="#">测评工具</a><b>|</b>
        <a href="#">云保险</a><b>|</b>
        <a href="#">可信云评估</a><b>|</b>
        <a href="#">意见反馈</a>
      </p>
      <p>数据中心联盟版权所有 &copy; 2015京ICP备09113703号-1</p></div>
      
    </div> -->
  </el-row>
</template>
<script>
import bg2 from '@/assets/img/banner.svg'
import bg1 from '@/assets/img/right_1.svg'
import bg3 from '@/assets/img/bg3.svg'
import bg4 from '@/assets/img/bg4.svg'
import bg5 from '@/assets/img/bg5.svg'
import bg6 from '@/assets/img/bg6.png'

export default {
  data() {
    return {
      img: bg2,
      img_1: bg1,
      img_2: bg3,
      img_3: bg4,
      img_4: bg5,
      img_5: bg6
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}

</script>
<style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    background-repeat: no-repeat;
    background-size: cover;
  }

  .card-panel {
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 800px;
    .marker {      
      width: 25px;      
      height: 25px;      
      border: 1px solid #fff;      
      border-radius: 100px;      
      background: #fff;      
      display:inline-block;
     }
  }

  .top {
    font-size: 34px;
    color: #d96a8b;
    font-weight: 400;
  }

  .body {
    font-size: 20px;
    color: #333;
    font-weight: blod
  }

  .foot {
    font-size: 18px;
    color: #666;
  }

  .left_1 {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-width: 815px;
    height: 646px;
    position: absolute;
    margin-top: -183px;
  }

  .card-panel_1,
  .card-panel_2,
  .card-panel_3 {

    display: flex;
    justify-content: space-around;
    align-items: center;

    >.right {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      min-width: 290px;
      height: 200px;
    }

    >.left {
      flex: 0 1 23%;
    }
  }

  .foot_1 {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-height: 360px;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    >div {
      text-align: center;
    }

    a {
      padding: 0 5px;
      cursor: pointer;
    }
  }
  .til{
    display: inline-block;
    position: absolute;
    right: 200px;
    top: 200px;
    >div:nth-child(1){
      font-size: 50px;
      color: #fff;
      font-weight: bold;
      >span:nth-child(3){
         margin-left: 20px;
      }
    }
    >div:nth-child(2){
      margin-top:46px;
      font-size: 34px;
      color: #fff;
      >div:nth-child(2){
        margin-top:16px;
      }
    }
  }
}

</style>
