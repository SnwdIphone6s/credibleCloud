<template>
  <div class="computingCloud">
    <div class="mission">
      <div class="goback" @click="goBack">&lt;&lt;返回</div>
      <div class="name">{{ name }}</div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供应商" prop="provider">
          <el-select v-model="ruleForm.provider" placeholder="请选择">
            <el-option
              v-for="item in allData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="ruleForm.ip" />
        </el-form-item>
        <el-form-item label="用户名" prop="login_username">
          <el-input v-model="ruleForm.login_username" />
        </el-form-item>
        <el-form-item label="认证信息" prop="login_password">
          <el-radio v-model="radio_1" label="0101_1">密码</el-radio>
          <el-input v-model="ruleForm.login_password" type="password" />
        </el-form-item>
        <el-form-item label="定时任务" prop="radio">
          <el-radio
            v-model="ruleForm.timed_task"
            :label="true"
          >开启</el-radio>
          <el-radio
            v-model="ruleForm.timed_task"
            :label="false"
          >关闭</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            @click="resetForm('ruleForm')"
          >取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="submitForm('ruleForm')"
          >{{ butName }}</el-button>
        </el-form-item>
      </el-form>
      <p class="meg til_1">支持centos7、centos6、ubuntu14、ubuntu16系统</p>
      <p class="meg til_2">请提供root权限账号，否则测试可能无法正常进行</p>
      <p class="meg til_3">密码将被明文保存，请使用后更换密码</p>
      <p class="meg til_4">当虚机定时任务开启,虚机会自动进行计算能力、磁盘能力、网卡能力测试.</p>
    </div>
  </div>
</template>
<script>
import { facilitatorList, setArrow, updateArrow } from '@/api/arrow'

export default {
  components: {

  },
  data() {
    return {
      radio: '1',
      butName: '保存',
      name: '新增虚机',
      radio_1: '0101_1',
      activeName: 'message',
      ruleForm: {
        provider: '',
        login_username: 'root',
        ip: '',
        login_password: '',
        timed_task: false
      },
      allData: [],
      host_info_list: [],
      rules: {
        login_username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        provider: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        login_password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        ip: [{ required: true, message: '请输入ip地址', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    const params = this.$route.params
    if (params.id) {
    	this.ruleForm.provider = params.service_provider
    	this.ruleForm.ip = params.ip_address
    	this.ruleForm.login_username = params.username
    	this.ruleForm.login_password = params.password
    	this.ruleForm.timed_task = !!params.is_sync
    	this.butName = '修改'
      this.name = '修改虚机'
    }
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  	    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.ruleForm
          if (this.$route.params.id) {
          	data.id = this.$route.params.id
          	 updateArrow(data).then(data => {
              if (data.code === 'success') {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$router.push({ path: '/my-tasks' })
              }
            })
          } else {
          	          setArrow(data).then(data => {
              if (data.code === 'success') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.push({ path: '/my-tasks' })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  	 getList() {
      facilitatorList().then(data => {
        const allData = data.data.providers
        this.allData = allData
        const host_info_list = data.data.host_info_list
        if (host_info_list) {
          allData.forEach(data_1 => {
            host_info_list.forEach(v => {
              if (v.service_provider === data_1.id) {
                v.service_provider_name = data_1.name
                return v
              }
            })
          })
          this.host_info_list = host_info_list
          this.radio = host_info_list[0].id
          this.$emit('setComputingCloud_change', host_info_list[0].id)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.computingCloud {
  h4 {
    display: block;
    font-size: 24px;
    color: #38448e;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 46px;
  }
  .goback{
    padding:20px;
    color:#5db5fc;
    cursor: pointer;
  }
  .name{
    text-align: center;
    color:#8492fd;
    font-size:18px;
  }
  > .mission {
    position: relative;
    margin: auto;
    width: 100%;
    background: #fff;
  }
  .el-select{
  	width:100%
  }
}
  @media screen and (max-width: 1224px) and (min-width: 982px) {
    .computingCloud {
      margin: 50px 160px;
    form{
      padding: 50px;
      width: 70%;
    }
    .meg {
      position: absolute;
      top: 0px;
      left: 72%;
      margin: 10px;
      width: 24%;
      color: #38448e;
      font-size: 14px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .til_1 {
      top: 200px;
    }
    .til_2 {
      top: 280px;
    }
    .til_3 {
      top: 350px;
    }
    .til_4{
      top: 400px;
    }
   }
 }
  @media screen and (min-width: 1224px) {
    .computingCloud {
      margin: 50px 160px;
    form{
      padding: 50px;
      width: 50%;
      margin: auto;
    }
    .meg {
      position: absolute;
      top: 0px;
      left: 72%;
      margin: 10px;
      width: 24%;
      color: #38448e;
      font-size: 14px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .til_1 {
      top: 200px;
    }
    .til_2 {
      top: 280px;
    }
    .til_3 {
      top: 350px;
    }
    .til_4{
      top: 400px;
    }
   }
  }
  @media screen and (max-width: 982px) and (min-width: 730px) {
    .computingCloud {
      margin: 50px 60px;
    form{
      padding: 50px;
      width: 70%;
    }
    .meg {
      position: absolute;
      top: 0px;
      left: 72%;
      margin: 10px;
      width: 24%;
      color: #38448e;
      font-size: 14px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .til_1 {
      top: 200px;
    }
    .til_2 {
      top: 280px;
    }
    .til_3 {
      top: 350px;
    }
    .til_4{
      top: 400px;
    }
   }
  }
  @media screen and (max-width: 730px) and (min-width: 544px) {
    .computingCloud {
      margin: 50px 30px;
    form{
      padding: 50px;
      width: 70%;
    }
    .meg {
      position: absolute;
      top: 0px;
      left: 72%;
      margin: 10px;
      width: 24%;
      color: #38448e;
      font-size: 14px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .til_1 {
      top: 200px;
    }
    .til_2 {
      top: 280px;
    }
    .til_3 {
      top: 350px;
    }
    .til_4{
      top: 400px;
    }
   }
  }
  @media screen and (max-width: 544px) {
    .computingCloud {
      margin: 50px 20px;
    form{
      padding: 20px;
      width: 70%;
    }
    .meg {
      position: absolute;
      top: 0px;
      left: 72%;
      margin: 10px;
      width: 24%;
      color: #38448e;
      font-size: 14px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .til_1 {
      top: 200px;
    }
    .til_2 {
      top: 280px;
    }
    .til_3 {
      top: 350px;
    }
    .til_4{
      top: 400px;
    }
   }
  }
</style>
