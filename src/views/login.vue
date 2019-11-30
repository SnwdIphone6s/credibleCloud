<template>
  <div class="login">
    <el-dialog title="用户登录" :visible="show" :show-close="false">
      <div class="login">
        <el-form ref="form" :model="form" :rules="rules" class="form">
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
            <span class="checkCode" @click="createCode">{{ checkCode}}</span>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible">取 消</el-button>
            <el-button type="primary" class="btn" @click="login('form')" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { login_1 } from '@/api/user'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64';
export default {
  data() {
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
      form: {
        username: "",
        password: "",
        seccode: ""
      },
      checkCode: '',
      rules: {
        username: [{ required: true, validator: validateEmail, trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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
    dialogVisible() {
      try {
        this.$refs['form'].resetFields();
      } catch (e) {

      }
      this.loading = false
      this.$emit('changeShow', false)
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
        this.dialogVisible()
      }).catch(() => {
        this.loading = false
      })
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
}

</script>
<style>
</style>
