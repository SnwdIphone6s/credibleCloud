<template>
  <div class="computing">
    <h4>计算能力测试</h4>
    <div class="body">
      <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="云主机信息" prop="name">
            <Tab  @setComputing_change="setComputing_change" @activeName_change="activeName_change"></Tab>
          </el-form-item>
          <el-form-item>
     <el-button @click="resetForm('ruleForm')">取消</el-button>
     <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading" :disabled="disabled">开始测试</el-button>
     </el-form-item>
           <p class="meg">任务名称将出现在任务列表</p>
           <p class="meg til_1">支持centos7、centos6、ubuntu14、ubuntu16系统</p>
           <p class="meg til_2">请提供root权限账号，否则测试可能无法正常进行</p>
           <p class="meg til_3">密码将被明文保存，请使用后更换密码</p>
        </el-form>

      </div>
      <p class="test">测试时间大约为<span>1小时</span>，请保持邮箱畅通，完成后将发送邮件提醒</p>
    </div>
  </div>
</template>
<script>
import { getArrow, facilitatorList,setComputing } from '@/api/arrow'
import {check_current} from '@/api/user'
import Tab from './tab.vue'
export default {
  components: {
    Tab,
  },
  data() {
    return {
      loading:false,
      disabled:false,
      ruleForm: {
        name: '',
     
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 位字母/数字/汉字', trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    
  },
  created(){
  },
  methods: {
      setComputing_change(id) {
        this.host_info_id = id
    },
    activeName_change(show){
  this.disabled = show
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        let param = {
          host_info_id:this.host_info_id,
          task_name :this.ruleForm.name
        }
        this.loading = true
        setComputing(param).then(data=>{
             if(data.code == "success"){
              this.$message({
              message: '添加成功',
              type: 'success'
             })
              this.loading = false
              this.resetForm(formName)
              this.$router.push({name:'Guide'})

            }
        })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

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
    width: 100%;
    background: #fff;

    >.content {
      width: 45%;
      margin-left: 20%;
      padding: 10px;
            .demo-ruleForm{
        position: relative;
        .meg{
            position: absolute;
            top: 0px;
            left: 101%;
            margin: 10px;
            min-width: 313px;
            color:#38448e;
            font-size:14px;
            word-wrap: break-word;
            word-break: break-all;
        }
        .til_1{
          top:200px;
          }
          .til_2{
          top:280px;
        }
        .til_3{
           top:350px;
        }
      }
    }
  }
  .test{
        text-align: center;
    padding-bottom: 50px;
    margin-top: -15px;
    span{
      color: red;
    }
  }
}

</style>
