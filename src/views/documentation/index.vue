<template>
  <div class="documentation-container">
    <h4>性能测试</h4>
    <div>
      <el-steps :active="4" align-center class="line_1">
        <el-step title="填写参数" />
        <el-step title="提交测试" />
        <el-step title="等待处理" />
        <el-step title="查看报告" />
      </el-steps>
      <div class="body">
        <div @click="toCom"><img src="@/assets/img/1.svg" alt="">
          <div>计算能力</div>
        </div>
        <div @click="toCc"><img src="@/assets/img/2.svg" alt="">
          <div>存储IO能力</div>
        </div>
        <div @click="tonNet"><img src="@/assets/img/3.svg" alt="">
          <div>网络IO能力</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { getLogin } from '@/api/user'
export default {
  name: 'Documentation',
  data() {
    return {
      canotClick: true
    }
  },
  mounted() {
    getLogin().then(data => {
      if (Object.keys(data.data).length) {
        this.canotClick = false
      } else {
        // store.dispatch('user/setShow', true)
        this.canotClick = true
      }
    })
  },

  methods: {
    toCom() {
      if (this.canotClick) {
        store.dispatch('user/setShow', true)

        return false
      }
      this.$router.push({ name: 'computing' })
    },

    toCc() {
      if (this.canotClick) {
        store.dispatch('user/setShow', true)

        return false
      }
      this.$router.push({ name: 'block-test' })
    },
    tonNet() {
      if (this.canotClick) {
        store.dispatch('user/setShow', true)

        return false
      }
      this.$router.push({ name: 'net-test' })
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
      background: #fff;
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
  .line_1{
    margin-top: 50px;
    margin-bottom: 50px;
  }
}

@media screen and (max-width: 544px) {
  .documentation-container {
      margin:50px 20px;
      .body {
      >div {
      margin: 0 14px;
          min-height: 0px;
      >img{
        height: 25%;
        margin-top: 25px;
        width: 75%;
      }
      >div{
        font-size: 14px;
        margin-top: 25px;
        margin-bottom: 25px;
      }
    }
  }
}
}
@media screen and (max-width: 768px) and (min-width: 544px) {
   .documentation-container {
      margin:50px 20px;
      margin-top:40px;
      .body {
      >div {
      margin: 0 14px;
          min-height: 0px;
      >img{
        height: 25%;
        margin-top: 45px;
        width: 75%;
      }
      >div{
        font-size: 14px;
        margin-top: 45px;
        margin-bottom: 45px;
      }
    }
  }
}
}
@media screen and (max-width: 985px) and (min-width: 768px) {
    .documentation-container {
      margin:50px 20px;
      margin-top:40px;
      .body {
      >div {
      margin: 0 14px;
          min-height: 0px;
      >img{
        height: 25%;
        margin-top: 45px;
        width: 75%;
      }
      >div{
        font-size: 14px;
        margin-top: 45px;
        margin-bottom: 45px;
      }
    }
  }
}
}
@media screen and (max-width: 1300px) and (min-width: 985px) {
     .documentation-container {
      margin:50px 20px;
      margin-top:40px;
      .body {
      >div {
      margin: 0 20px;
          min-height: 0px;
      >img{
        height: 25%;
        margin-top: 60px;
        width: 75%;
      }
      >div{
        font-size: 18px;
        margin-top: 60px;
        margin-bottom: 45px;
      }
    }
  }
}
}
</style>
