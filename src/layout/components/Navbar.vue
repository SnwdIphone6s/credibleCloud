<template>
  <div class="navbar">
    <span><img src="@/assets/img/logo_xiao.png" alt=""></span>
    <div>
      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :default-active="activeMenu" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="horizontal">
          <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="right-menu">
      <div v-if='userName'><span>欢迎回来，可信云 </span> &nbsp;<b>|</b>&nbsp; <span @click='setLogout'> 退出</span></div>
      <div v-if='!userName'><span @click="toRegister">注册 </span>&nbsp; <b>|</b>&nbsp; <span @click="toLogin"> 登录</span></div>
    </div>
    <Login :show="msg" style="position:absolute;" @changeShow="changeShow"></Login>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './Sidebar/SidebarItem'
import{getLogin} from '@/api/user'
import variables from '@/styles/variables.scss'
import Cookies from 'js-cookie'
import Login from '../../views/login.vue'
export default {
  data() {
    return {
      msg: false,
      userName: '',
    }
  },
  mounted(){
getLogin().then(data=>{
  if(Object.keys(data.data).length){
    this.userName = 'true'
  }else{
    this.userName = ''
  }
})
    },
  components: {
    SidebarItem,
    Login
  },
  computed: {
    isFollow() {
      // console.log()
      let par = {
        username:this.$store.state.user.username,
        show:this.$store.state.user.show
      }
      return par //需要监听的数据
    },

    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    isFollow(newVal, oldVal) {
      this.userName = newVal.username
      this.msg = newVal.show
    }
  },
  methods: {
    changeShow(s) {
      this.msg = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    toRegister() {
      this.$router.push({ name: 'register' })
    },
    toLogin(msg) {
      this.msg = true

    },
 
    async setLogout() {
      await this.$store.dispatch('user/logout')
    }
    

  },
  // updated() {
  //   console.log(Cookies.get('USERNAME'))
  //   this.userName = Cookies.get('USERNAME')
  // }
}

</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  background-image: linear-gradient(to right, rgba(132, 146, 253, 1), rgba(93, 181, 252, 1));
  height: 50px;
  overflow: hidden;
  position: relative;
  justify-content: space-around;

  .right-menu {
    color: #fff;
    cursor: pointer
  }
}

</style>
