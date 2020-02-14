<template>
  <div class="navbar">
    <!-- <span>
      <img src="@/assets/img/logo_xiao.png" alt>
    </span> -->
    <div class="nav_bar">
      <logo
        v-if="showLogo"
        :collapse="isCollapse"
      />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="horizontal"
        >
          <sidebar-item
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="right-menu">
      <div v-if="userName">
        <p class="welCom welName">欢迎回来，{{ name }}</p> &nbsp;
        <b>|</b>&nbsp;
        <p class="welCom" @click="setLogout">退出</p>
      </div>
      <div v-if="!userName">
        <p class="welCom" @click="toRegister">注册</p>&nbsp;
        <b>|</b>&nbsp;
        <p class="welCom" @click="toLogin">登录</p>
      </div>
    </div>
    <Login
      :show="msg"
      style="position:absolute;"
      @changeShow="changeShow"
      @setName="setName"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './Sidebar/SidebarItem'
import { getLogin, setEmail_api } from '@/api/user'
import variables from '@/styles/variables.scss'
import Cookies from 'js-cookie'
import Login from '../../views/login.vue'
export default {
  components: {
    SidebarItem,
    Login
  },
  data() {
    return {
      msg: false,
      userName: '',
      name: ''
    }
  },
  created() {
    const validate = this.GetRequest()
    if (validate.validate_link) {
      const param = {
        validate_link: validate.validate_link
      }
      this.setEmail(param)
    }
    // getLogin().then(data => {
    //   if (Object.keys(data.data).length) {
    //       // store.dispatch('user/setShow', false)
    //       Cookies.set('noLogin',true)
    //     } else {
    //       Cookies.set('noLogin',false)

    //     }
    // })
  },
  mounted() {
    this.getLogin_1()
  },
  computed: {
    isFollow() {
      // console.log()
      const par = {
        username: this.$store.state.user.username,
        show: this.$store.state.user.show
      }
      return par // 需要监听的数据
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
    getLogin_1() {
      getLogin().then(data => {
        if (Object.keys(data.data).length) {
          const name = data.data.username
          this.name = name
          this.userName = 'true'
        } else {
          this.userName = ''
        }
      })
    },

    changeShow(s) {
      this.msg = false
    },
    setName(n) {
      this.name = n
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
      await this.$store.dispatch('user/logout').then(data => {
        // this.$router.push('/dashboard')
        // this.$router.go(0)
      })
    },
    GetRequest() {
      var url = window.location.search // 获取url中"?"符后的字串
      var theRequest = new Object()
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        const strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    },
    setEmail(param) {
      setEmail_api(param).then(data => {
        if (data.code == 'success') {
          this.getLogin_1()
        }
      })
    }
  }
  // updated() {
  //   console.log(Cookies.get('USERNAME'))
  //   this.userName = Cookies.get('USERNAME')
  // }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 544px) {
  .navbar {

    margin-top: 84px;
    display: flex;
    align-items: center;
    background-image: linear-gradient(
      to right,
      rgba(132, 146, 253, 1),
      rgba(93, 181, 252, 1)
    );

    height: 50px;
    overflow: hidden;
    position: relative;
    justify-content: space-around;
    img {
      width: 100%;
    }
    .nav_bar {
      flex: 0 1 49%;
    }
    .right-menu {
      background-color: rgba(255, 255, 255, 0.2);
      text-align: center;
      color: #fff;
      cursor: pointer;
      height: 35px;
      max-width: 260px;
      line-height: 35px;
      border-radius: 25px;
         >div{
        padding:0 15px;
        display:flex;
      }
    }
  }
}

@media screen and (max-width: 544px) {
  .navbar {

    font-size: 12px;
    display: flex;
    align-items: center;
    height: 40px;
    background-image: linear-gradient(
      to right,
      rgba(132, 146, 253, 1),
      rgba(93, 181, 252, 1)
    );
    height: 50px;
    overflow: hidden;
    position: relative;
    justify-content: flex-start;
    img {
      width: 134%;
      height: 25px;
      margin-left: 10px;
    }
    > span {
      flex: 0 1 20%;
    }
    > div:nth-child(2) {
      margin-left: 35px;
    }
    .nav_bar {
      flex: 0 1 49%;
    }
    .right-menu {
background-color: rgba(255,255,255,0.2);
      text-align: center;
      color: #fff;
      cursor: pointer;
      height: 35px;
      max-width: 260px;
      line-height: 35px;
      border-radius: 25px;
      >div{
        padding:0 15px;
        display:flex;
      }
    }
  }
}
@media screen and (max-width: 787px) {
  .navbar {
    margin-top: 50px;
  }
}
.welCom{
  margin:0px;
  display:inline-block;
}

@media screen and (max-width: 400px) {
   .welName{
  width: 66px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
}
</style>
