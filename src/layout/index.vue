<template>
  <div :class="classObj" class="app-wrapper">
    <div  class="main-container">
      <div >
        <navbar />
        <!-- <sidebar class="sidebar-container" /> -->
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <app-main />
      <!--       <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
      <el-footer style="padding:0px">
        <div class="foot_1">
          <img src="@/assets/img/bg6.png" alt="">
          <div>
            <p>数据中心联盟版权所有 &copy; 2015京ICP备09113703号-1</p>
            <p>
              <a href="#">关于我们</a><b>|</b>
              <a href="#">联系我们</a><b>|</b>
              <a href="#">云服务库</a><b>|</b>
              <a href="#">测评工具</a><b>|</b>
              <a href="#">云保险</a><b>|</b>
              <a href="#">可信云评估</a><b>|</b>
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
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import bg6 from '@/assets/img/bg6.png'

export default {
  name: 'Layout',
  data() {
    return {
      img_5: bg6
    }
  },
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
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
    }
  }
}

</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

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
  background-image: linear-gradient(to right, rgba(132, 146, 253, 0.2), rgba(93, 181, 252, 0.2));
  font-size: 14px;

  >img {
    width: 100%;
  }

  >div {
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

</style>
