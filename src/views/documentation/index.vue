<template>
  <div class="documentation-container">
    <h4>性能测试</h4>
    <div>
      <div class="top">
        <ol class="steps">
          <li class="step-active">
            <div class="step-line l_1"></div>
            <div class="step-content">
              <span class="step-num">1</span>
              <div class='msg'>填写参数</div>
            </div>
          </li>
          <li class="step-active l_2">
            <div class="step-line"></div>
            <div class="step-content">
              <span class="step-num">2</span>
              <div class='msg'>提交测试</div>
            </div>
          </li>
          <li class="step-active l_3">
            <div class="step-line"></div>
            <div class="step-content">
              <span class="step-num">3</span>
              <div class="step-text msg">等待处理</div>
            </div>
          </li>
          <li class="step-active">
            <div class="step-line  l_4"></div>
            <div class="step-content">
              <span class="step-num">4</span>
              <div class="step-text msg">查看报告</div>
            </div>
          </li>
        </ol>
      </div>
      <div class="body">
        <div @click='toCom'><img src="@/assets/img/1.svg" alt="">
          <div>计算能力</div>
        </div>
        <div  @click='toCc'><img src="@/assets/img/2.svg" alt="">
          <div>存储IO能力</div>
        </div>
        <div><img src="@/assets/img/3.svg" alt="">
          <div>网络IO能力</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Documentation',
  data() {
    return {

    }
  },
  methods: {
    toCom() {
      this.$router.push({ name: 'computing' })
    },

    toCc(){
      this.$router.push({name:'block-test'})
    }
  }
}

</script>
<style lang="scss" scoped>
.documentation-container {
      margin: 50px 160px;
  >h4 {
    display: block;
    font-size: 24px;
    color: #38448e;
    font-weight: bold;
    margin: 0px;
  }
  .document-btn {
    margin-left: 50px;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    margin-bottom: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }

  .top {
    display: flex;
    margin-top: 30px;
    justify-content: center;
  }

  ol.steps::-webkit-scrollbar {
    /* chrome 隐藏滚动条*/
    display: none;
  }

  ol.steps {
    list-style: none;
    display: flex;

  }

  ol.steps:after,
  ol.steps li:after {
    content: '';
    display: block;
    clear: both;
  }

  ol.steps li {
    float: left;
    flex: 1;
    position: relative;
    min-width: 240px;
  }
  ol.steps li .step-line {
    height: 2px;
    background-image: linear-gradient(to right, #8492fd, #5db5fc);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .2);
    margin-top: 15px;
  }
  ol.steps li.step-active .step-line {
    background-image: linear-gradient(to right, #8492fd, #5db5fc);
    box-shadow: inset 0 1px 1px #00a854;
     position: relative;
     top: 23%;
  }
   .l_1{
    left: 60%;
   }
   .l_4{
    width: 40%;
   }
  ol.steps .step-content {
   
    top: 0;
    left: -20px;
    text-align: center;
  }

  ol.steps li .step-content .step-num {
    display: inline-block;
    height: 44px;
    width: 44px;
    color: #fff;
    background-image: #b9b9b9;
    line-height: 44px;
    font-size: 24px;
    border-radius: 50%;
    text-align: center;
    border: 2px solid rgba(224, 224, 224, 1);
    margin-bottom: 14px;
  }

  ol.steps li .step-content .msg {
    font-size: 18px;
    color: #38448e;
  }

  ol.steps li.step-active .step-content .step-num {
    background-image: linear-gradient(to right, #8492fd, #5db5fc);
  }

  ol.steps li.step-end {
    width: 120px !important;
    flex: inherit;
  }

  ol.steps li.step-end .step-line {
    display: none;
  }

  .body {
    margin-top: 30px;
    display: flex;
    justify-content: center;

    >div {
      text-align: center;
      min-height: 400px;
      border-radius: 4px;
      flex: 0 1 25%;
      margin: 0 55px;

      >img {
        width: 47%;
        height: 46%;
        margin-top: 70px;
      }

      >div {
        margin-top: 50px;
        margin-bottom: 64px;
        font-size: 24px;
        color: #38448e;
        font-weight: bold;
      }
    }

    >div:hover {
      box-shadow: 0 0 10px #8492fd;
    }
  }
}

</style>
