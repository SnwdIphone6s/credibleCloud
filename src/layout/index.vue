<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div class="main-container">

      <div class="header">
        <header class="header fnt-16 cf">
          <div class="wrap cf">
            <div class="logo"><a
              href="http://182.92.161.103:8888/"
              title="可信云"
            ><img
              src="@/assets/img/logo.jpg"
              alt=""
            ></a></div>
            <div
              class="hd-rt"
              :style="{height: getHei}"
            >
              <!--pc 导航部分 Begin-->
              <nav class="nav">
                <ul class="fixed">
                  <!--选中 样式 on，加到li上面-->
                  <li>
                    <p><a href="http://182.92.161.103:8888/">首页</a></p>
                  </li>
                  <li>
                    <p><a href="http://182.92.161.103:8888/services/index">云服务</a><i /></p>

                  </li>
                  <li>
                    <p><a href="http://182.92.161.103:8888/case/index">解决方案</a><i /></p>

                  </li>
                  <li>
                    <p><a href="http://182.92.161.103:8888/development/index">开发运维</a><i /></p>

                  </li>
                  <li>
                    <p><a href="http://182.92.161.103:8888/security/index">安全与风险管理</a><i /></p>

                  </li>
                  <li class="li05 ">
                    <p><a href="http://182.92.161.103:8888/industry/index">行业云</a><i /></p>

                  </li>
                  <li>
                    <p><a href="http://182.92.161.103:8888/performance/usability">性能及监测</a><i /></p>

                  </li>
                  <li class="on">
                    <p><a href="http://182.92.161.103:8888/credit/rating">综合信用评估</a></p>

                  </li>
                  <li>
                    <p><a href="http://182.92.161.103:8888/cloud/insurance">云保险</a></p>
                  </li>
                  <li>
                    <p><a href=" http://182.92.161.103:8888/about/index">关于可信云</a><i /></p>
                  </li>
                </ul>
              </nav>
              <!--pc 导航部分 End-->
            </div>
          </div>
          <div
            class="nav_phone_btn"
            @click="getHeight()"
          ><span>Menu</span></div>
          <div
            class="nav-bg"
            style="display: none;"
          />
        </header>
      </div>

      <!-- <sidebar class="sidebar-container" /> -->
      <!-- <tags-view v-if="needTagsView" /> -->
      <navbar />
      <div class="line" />
      <app-main />
      <!--       <right-panel v-if="showSettings">
        <settings />
      </right-panel>-->
      <el-footer style="padding:0px">
        <div class="foot_1">
          <img
            src="@/assets/img/bg6.png"
            alt
          >
          <div>
            <p>数据中心联盟版权所有 &copy; 2015京ICP备09113703号-1</p>
            <p>
              <a href="#">关于我们</a>
              <b>|</b>
              <a href="#">联系我们</a>
              <b>|</b>
              <a href="#">云服务库</a>
              <b>|</b>
              <a href="#">测评工具</a>
              <b>|</b>
              <a href="#">云保险</a>
              <b>|</b>
              <a href="#">可信云评估</a>
              <b>|</b>
              <a href="#">意见反馈</a>
            </p>
          </div>
        </div>
      </el-footer>
    </div>
  </div>
</template>
<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import bg6 from '@/assets/img/bg6.png'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,

    Sidebar
  },
  mixins: [ResizeMixin],
  data() {
    return {
      img_5: bg6,
      getHei: 0
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    getHeight() {
      if (this.getHei) {
        this.getHei = 0
      } else {
        this.getHei = '100%'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.mobile .fixed-header {
  width: 100%;
}

.foot_1 {
  background-image: linear-gradient(
    to right,
    rgba(132, 146, 253, 0.2),
    rgba(93, 181, 252, 0.2)
  );
  font-size: 14px;

  > img {
    width: 100%;
  }

  > div {
    color: #fff;
    text-align: center;
    p {
      margin-top: -60px;
    }
  }

  a {
    padding: 0 5px;
    cursor: pointer;
  }
}
@media screen and (max-width: 768px) {
  .foot_1 {
    > img {
      width: 100%;
      height: 130px;
    }
    > div {
      p:nth-child(1) {
        margin-top: -28px;
        font-size: 12px;
      }
      p:nth-child(2) {
        margin-top: -50px;
        font-size: 10px;
      }
    }
    a {
      padding: 0 3px;
      cursor: pointer;
    }
  }
}
@media screen and (min-width: 1165px) {
  .header {
    header {
      position: fixed;
      left: 0px;
      top: 0px;
      right: 0px;
      width: 100%;
      z-index: 999;
      background: #fff;
      .wrap {
        max-width: 1280px;
        margin: 0px auto;
      }
      img {
        width: 124px;
      }
      .logo {
        float: left;
        margin: 10px 0px 10px 25px;
      }

      .hd-rt:after {
        content: '';
        display: table;
        clear: both;
      }
      .nav {
        float: right;
      }
      ul {
        margin: 0px;
        align-items: center;
        height: 84px;
        display: flex;
      }
      ul:after {
        content: '';
        display: table;
        clear: both;
      }
      p {
        margin: 0px;
      }
      li {
        display: inline-block;
        padding: 10px 0px;
        list-style: none;
      }
      li:hover > p > a {
        background: #fff;
        box-shadow: 0px 3px 8px rgba(0, 147, 251, 0.25);
      }
    }
    a {
      font-size: 15px;
      display: block;
      padding: 5px 15px;
      color: #333;
      border-radius: 25px;
    }
  }
  .nav_phone_btn {
    display: none;
  }
}

@media screen and (max-width: 1165px) and (min-width: 1050px) {
  .header {
    header {
      position: fixed;
      left: 0px;
      top: 0px;
      right: 0px;
      width: 100%;
      z-index: 999;
      background: #fff;
      .wrap {
        max-width: 1280px;
        margin: 0px auto;
      }
      img {
        width: 124px;
      }
      .logo {
        float: left;
        margin: 10px 0px 10px 25px;
      }

      .hd-rt:after {
        content: '';
        display: table;
        clear: both;
      }
      .nav {
        float: right;
      }
      ul {
        margin: 0px;
        align-items: center;
        height: 84px;
        display: flex;
      }
      ul:after {
        content: '';
        display: table;
        clear: both;
      }
      p {
        margin: 0px;
      }
      li {
        display: inline-block;
        padding: 10px 0px;
        list-style: none;
      }
      li:hover > p > a {
        background: #fff;
        box-shadow: 0px 3px 8px rgba(0, 147, 251, 0.25);
      }
    }
    a {
      font-size: 15px;
      display: block;
      padding: 5px 9px;
      color: #333;
      border-radius: 25px;
    }
  }
  .nav_phone_btn {
    display: none;
  }
}

@media screen and (max-width: 1050px) and (min-width: 980px) {
  .header {
    header {
      position: fixed;
      left: 0px;
      top: 0px;
      right: 0px;
      width: 100%;
      z-index: 999;
      background: #fff;
      .wrap {
        max-width: 1280px;
        margin: 0px auto;
      }
      img {
        width: 124px;
      }
      .logo {
        float: left;
        margin: 10px 0px 10px 25px;
      }

      .hd-rt:after {
        content: '';
        display: table;
        clear: both;
      }
      .nav {
        float: right;
      }
      ul {
        margin: 0px;
        padding: 0px;
        align-items: center;
        height: 84px;
        display: flex;
      }
      ul:after {
        content: '';
        display: table;
        clear: both;
      }
      p {
        margin: 0px;
      }
      li {
        display: inline-block;
        padding: 10px 0px;
        list-style: none;
      }
      li:hover > p > a {
        background: #fff;
        box-shadow: 0px 3px 8px rgba(0, 147, 251, 0.25);
      }
    }
    a {
      font-size: 13px;
      display: block;
      padding: 5px 11px;
      color: #333;
      border-radius: 25px;
    }
  }
  .nav_phone_btn {
    display: none;
  }
}
@media screen and (max-width: 980px) and (min-width: 850px) {
  .header {
    header {
      position: fixed;
      left: 0px;
      top: 0px;
      right: 0px;
      width: 100%;
      z-index: 666;
      background: #fff;
      .wrap {
        max-width: 1280px;
        margin: 0px auto;
      }
      img {
        width: 124px;
      }
      .logo {
        float: left;
        margin: 10px 0px 10px 25px;
      }

      .hd-rt:after {
        content: '';
        display: table;
        clear: both;
      }
      .nav {
        float: right;
      }
      ul {
        margin: 0px;
        padding: 0px;
        align-items: center;
        height: 84px;
        display: flex;
      }
      ul:after {
        content: '';
        display: table;
        clear: both;
      }
      p {
        margin: 0px;
      }
      li {
        display: inline-block;
        padding: 10px 0px;
        list-style: none;
      }
      li:hover > p > a {
        background: #fff;
        box-shadow: 0px 3px 8px rgba(0, 147, 251, 0.25);
      }
    }
    a {
      font-size: 13px;
      display: block;
      padding: 5px 6px;
      color: #333;
      border-radius: 25px;
    }
  }
  .nav_phone_btn {
    display: none;
  }
}
@media screen and (max-width: 850px) and (min-width: 787px) {
  .header {
    header {
      position: fixed;
      left: 0px;
      top: 0px;
      right: 0px;
      width: 100%;
      z-index: 666;
      background: #fff;
      .wrap {
        max-width: 1280px;
        margin: 0px auto;
      }
      img {
        width: 124px;
      }
      .logo {
        float: left;
        margin: 10px 0px 10px 25px;
      }

      .hd-rt:after {
        content: '';
        display: table;
        clear: both;
      }
      .nav {
        float: right;
      }
      ul {
        margin: 0px;
        padding: 0px;
        align-items: center;
        height: 84px;
        display: flex;
      }
      ul:after {
        content: '';
        display: table;
        clear: both;
      }
      p {
        margin: 0px;
      }
      li {
        display: inline-block;
        padding: 10px 0px;
        list-style: none;
      }
      li:hover > p > a {
        background: #fff;
        box-shadow: 0px 3px 8px rgba(0, 147, 251, 0.25);
      }
    }
    a {
      font-size: 13px;
      display: block;
      padding: 5px 3px;
      color: #333;
      border-radius: 25px;
    }
  }
  .nav_phone_btn {
    display: none;
  }
}
@media screen and (max-width: 787px) {
  .header {
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    width: 100%;
    z-index: 999;
    background: #fff;
    .wrap {
      max-width: 1280px;
      margin: 0px auto;
    }
    .nav {
      display: block;
      padding: 10px 3em 60px;
      width: 100%;
      float: left;
      font-size: 15px;
    }
    li {
      border-bottom: 1px solid #484240;
      width: 100%;
      float: left;
      padding: 0px;
      list-style: none;
    }
    .wrap {
      margin: 0px 20px;
    }
    .logo {
      height: 30px;
      margin: 10px 0px 10px 0px;
    }
    .nav_phone_btn {
      display: block;
      cursor: pointer;
      height: 35px;
      margin-top: 7px;
      position: absolute;
      top: 0px;
      right: 20px;
      span {
        position: relative;
        font-size: 0;
        width: 26px;
        height: 3px;
        background-color: #5195ff;
        display: inline-block;
        transition: all 250ms ease-out;
        -webkit-transition: all 250ms ease-out;
      }
      span:before,
      span:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #5195ff;
        left: 0px;
        transition: all 250ms ease-out;
        -webkit-transition: all 250ms ease-out;
      }
      span:before {
        top: -7px;
      }
      span:after {
        top: 7px;
      }
    }
  }
  .hd-rt {
    position: fixed;
    left: 0px;
    padding-top: 0px;
    overflow-y: auto;
    right: 0px;
    top: 50px;
    height: 0px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    transition: all 250ms ease-out;
    -webkit-transition: all 250ms ease-out;
  }
}
.logo img {
  height: 100%;
}
.line {
    height: 3px;
    width: 100%;
    position: absolute;
    top: 46px;
    background-color: rgba(255,255,255,0.2);
}
</style>
