<template>
  <div class="login">
    <el-dialog :title="name_login" :visible="show" :show-close="false">
      <div class="login">
        <el-form ref="form" :model="form" :rules="rules" class="form" v-if="hasPassword">
          <el-form-item prop="username" label="用户名">
            <el-input class="log-input" v-model="form.username" placeholder="请输入注册邮箱" prefix-icon="icon-login_user">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input class="log-input" v-model="form.password" placeholder="密码" type="password" prefix-icon="icon-login_pwd">
            </el-input>
          </el-form-item>
          <el-form-item prop="seccode" class="inputbar" label="验证码">
            <el-input class="log-input" v-model="form.seccode" placeholder="验证码" prefix-icon="icon-login_auth" @keydown.enter.native="login('form')">
            </el-input>
            <span class="checkCode" @click="createCode" style="max-height: 36px">{{ checkCode}}</span>
          </el-form-item>
          <el-form-item class='btn'>
            <el-button @click="dialogVisible">取 消</el-button>
            <el-button type="primary" class="btn" @click="login('form')" :loading="loading">登录</el-button>
          </el-form-item>
          <div class='setPass'> 
             <span @click="forgetPassword">忘记密码</span>
          </div>
        </el-form>
        <el-form v-else="hasPassword" ref="form_1" :model="form_1" :rules="rules_1" class="form form_2">
          <el-form-item prop="username" label="用户名">
            <el-input class="log-input" v-model="form_1.username" placeholder="请输入注册邮箱" prefix-icon="icon-login_user">
            </el-input>
          </el-form-item>
           <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form_1.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input type="password" v-model="form_1.confirm_password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="seccode" class="inputbar" label="验证码">
            <el-input class="log-input" v-model="form_1.seccode" placeholder="验证码" prefix-icon="icon-login_auth" @keydown.enter.native="login('form')">
            </el-input>
            <span class="checkCode" @click="createCode" style="max-height: 36px">{{ checkCode}}</span>
          </el-form-item>
          <el-form-item class='btn'>
            <el-button @click="dialogVisible">取 消</el-button>
            <el-button type="primary" class="btn" @click="setPassword('form')" :loading="loading">确定</el-button>
          </el-form-item>
          <div>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { login_1,setPassword_api } from '@/api/user'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
import store from '@/store'
export default {
  data() {
        var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form_1.confirm_password !== '') {
          this.$refs.form_1.validateField('confirm_password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form_1.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请正确填写邮箱'));
      } else {
        if (value !== '') {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error('请输入有效的邮箱'));
          }
          if (value.length > 50) {
            callback(new Error('邮箱长度不能超过50个字符'));
          }
        }
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      hasPassword:true,
      form: {
        username: "",
        password: "",
        seccode: ""
      },
            form_1: {
        username: "",
        password: "",
        confirm_password:"",
        seccode: ""
      },
      name_login:'用户登录',
      checkCode: '',
      rules: {
        username: [{ required: true, validator: validateEmail, trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        seccode: [{ required: true, message: "请输验证码", trigger: "blur" }]
      },
      rules_1: {
        username: [{ required: true, validator: validateEmail, trigger: 'blur' }],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/, message: '密码长度为8-20个字符，且至少包含一个字母' }
        ],
        confirm_password: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        seccode: [{ required: true, message: "请输验证码", trigger: "blur" }]
      },
      formLabelWidth: '120px',
      loading: false,
    }
  },
  mounted() {
    this.createCode();
  },
  methods: {
    forgetPassword(){
   this.hasPassword = false
   this.name_login = '重置密码'
    },
    dialogVisible() {
      try {
        this.$refs['form'].resetFields();
      } catch (e) {

      }
      this.loading = false
      this.hasPassword = true
      this.$emit('changeShow', false)
      this.name_login = '用户登录'
      store.dispatch('user/setShow', false)
      this.$router.push('/dashboard')

    },
    createCode() {
      let code = "";
      let codeLength = 4; //验证码的长度  
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
      for (let i = 0; i < codeLength; i++) { //循环操作  
        let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
        code += random[index]; //根据索引取得随机数加到code上  
      }
      this.checkCode = code; //把code值赋给验证码  
    },
    async login() {
      if (this.form.seccode != this.checkCode) {
        this.$message({
          message: "验证码错误，注意大写字母",
          type: "warning"
        });
        this.createCode();
        return false;
      };
      this.loading = true
      let password = Base64.encode(this.form.password)
      let params = {
        username: this.form.username,
        password,
        code: this.form.seccode
      }
      await this.$store.dispatch('user/login_1', params).then(data => {
        let name = data.username
        this.$emit('setName', name)
        this.dialogVisible()
        this.$router.push('/dashboard')
      }).catch(() => {
        this.loading = false
      })
    },
    setPassword(){
            if (this.form_1.seccode != this.checkCode) {
        this.$message({
          message: "验证码错误，注意大写字母",
          type: "warning"
        });
        this.createCode();
        return false;
      };
            this.loading = true
      let password = Base64.encode(this.form_1.password)
      let confirm_password = Base64.encode(this.form_1.confirm_password)
      let params = {
        username: this.form_1.username,
        password,
        confirm_password,
        code: this.form_1.seccode
      }
      setPassword_api(params).then(data=>{
               this.$message({
          message: "重置成功，请登录",
          type: "success"
        });
          this.hasPassword=true
      })
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
}

</script>
<style lang="scss" scoped>
form{
  position:relative;
  .setPass{
    position: absolute;
    top: 35%;
    left:65%;
    cursor: pointer;
    color:#8492fd,
  }
}
</style>
