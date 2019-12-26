<template>
  <div class="computing">
    <h4>内测账号申请</h4>
    <div class="body">
      <div class="content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公司名称：" prop="company_name">
            <el-input v-model="ruleForm.company_name" />
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="职位：" prop="people_job">
            <el-input v-model="ruleForm.people_job" />
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="手机：" prop="tel">
            <el-input v-model="ruleForm.tel" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input v-model="ruleForm.confirm_password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="测试需求：" prop="test_requirement">
            <el-input v-model="ruleForm.test_requirement" type="textarea" />
          </el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">申请测试账号</el-button>
        </el-form>
        <div class="meg">如有问题请发送邮件到 support@kexinyun.org 反馈，感谢您的关注。</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getInfo_1 } from '@/api/user'
import { Base64 } from 'js-base64'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.confirm_password !== '') {
          this.$refs.ruleForm.validateField('confirm_password')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不可为空'))
      } else {
        if (value !== '') {
          var reg = /^1[3456789]\d{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的手机号码'))
          }
        }
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请正确填写邮箱'))
      } else {
        if (value !== '') {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的邮箱'))
          }
          if (value.length > 50) {
            callback(new Error('邮箱长度不能超过50个字符'))
          }
        }
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        company_name: '',
        name: '',
        people_job: '',
        email: '',
        tel: '',
        password: '',
        confirm_password: '',
        test_requirement: ''
      },
      rules: {
        company_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入个人姓名', trigger: 'blur' }
        ],
        people_job: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        tel: [
          { required: true, validator: validateMobilePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/, message: '密码长度为8-20个字符，且至少包含一个字母' }
        ],
        confirm_password: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        test_requirement: [
          { required: true, message: '请填写测试需求', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true,
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.password = Base64.encode(this.ruleForm.password)
          this.ruleForm.confirm_password = Base64.encode(this.ruleForm.confirm_password)
          const params = this.ruleForm
          getInfo_1(params).then(data => {
            if (data.code == 'success') {
              this.loading = false,
              this.$message({
                message: '注册成功，请登录',
                type: 'success'
              })
              this.$router.push('/dashboard')
            }
          }).catch(error => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>
<style lang="scss" scoped>
.computing {
  margin: 50px 160px;

  h4 {
    display: block;
    font-size: 24px;
    color: #38448e;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 46px;
  }

  >.body {
    margin: auto;
    background: #fff;

    >.content {
      width: 40%;
      margin: auto;
      padding: 20px 0px;

      button {
        margin-left: 100px;
        width: 80%;
      }

      .meg {
        font-size: 12px;
        color: #999;
        margin-top: 20px;
        margin-left: 100px
      }
    }
  }
}
@media screen and (max-width: 1330px) and (min-width: 768px) {
  .computing {

  >.body {
    >.content {
    width:66%;
         button {
       width: 100%;
    margin: 0;
      }
      .meg{
        margin-left:0px;
      }
    }
  }
}
}
@media screen and (max-width: 768px) and (min-width: 544px) {
  .computing {
    margin: 50px 45px;
  >.body {
    >.content {
    width:66%;
         button {
       width: 100%;
    margin: 0;
      }
      .meg{
        margin-left:0px;
      }
    }
  }
}
}
@media screen and (max-width: 544px)  {
  .computing {
    margin: 50px 45px;
  >.body {
    >.content {
    width:93%;
      button {
       width: 100%;
    margin: 0;
      }
      .meg{
        margin-left:0px;
      }
    }
  }
}
}
</style>
