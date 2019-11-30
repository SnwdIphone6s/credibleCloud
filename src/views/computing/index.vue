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
        </el-form>
      </div>
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
      margin: auto;
      padding: 10px
    }
  }
}

</style>
