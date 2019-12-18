<template>
  <div class="computing">
    <h4>网络IO能力测试</h4>
    <div class="body">
      <div class="content">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="云主机信息" prop="name">
            <Tab @setComputing_change="setComputing_change" @activeName_change="activeName_change" />
          </el-form-item>
          <!--           <el-form-item label="产品类型" prop="block_product_type">
  <el-select v-model="ruleForm.block_product_type" placeholder="产品类型">
    <el-option label="普通盘" value="hdd"></el-option>
    <el-option label="SSD盘" value="ssd"></el-option>
  </el-select>
</el-form-item>
<el-form-item label="块存储路径" prop="block_dev_path">
  <el-input v-model="ruleForm.block_dev_path"></el-input>
</el-form-item> -->
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button
              type="primary"
              :loading="loading"
              :disabled="disabled"
              @click="submitForm('ruleForm')"
            >开始测试</el-button>
          </el-form-item>
          <p class="meg">任务名称将出现在任务列表</p>
          <p class="meg til_1">支持centos7、centos6、ubuntu14、ubuntu16系统</p>
          <p class="meg til_2">请提供root权限账号，否则测试可能无法正常进行</p>
          <p class="meg til_3">密码将被明文保存，请使用后更换密码</p>
        </el-form>
      </div>
      <p class="test">测试时间大约为<span>20分钟</span>，请保持邮箱畅通，完成后将发送邮件提醒</p>
    </div>
  </div>
</template>
<script>
import Tab from '../computing/tab.vue'
import { setNet } from '@/api/arrow'
export default {
  components: {
    Tab
  },
  data() {
    return {
      loading: false,
      disabled: false,
      host_info_id: '',
      ruleForm: {
        name: '',
        block_product_type: '',
        block_dev_path: '/'
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          {
            min: 4,
            max: 12,
            message: '长度在 4 到 12 位字母/数字/汉字',
            trigger: 'blur'
          }
        ],
        block_product_type: [
          { required: true, message: '产品类型', trigger: 'change' }
        ],
        block_dev_path: [
          { required: true, message: '请输入块存储路径', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            host_info_id: this.host_info_id,
            block_product_type: this.ruleForm.block_product_type,
            block_dev_path: this.ruleForm.block_dev_path,
            task_name: this.ruleForm.name
          }
          this.loading = true
          setNet(param).then(data => {
            if (data.code == 'success') {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.loading = false
              this.resetForm(formName)
              this.$router.push({ name: 'Guide' })
            }
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
    },
    setComputing_change(id) {
      this.host_info_id = id
    },
    activeName_change(show) {
      this.disabled = show
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

  > .body {
    margin: auto;
    width: 100%;
    background: #fff;
  @media screen and (max-width: 1224px) and (min-width: 982px) {
     >.content {
      width: 68%;
      margin-left: 0px;
      padding: 10px;
            .demo-ruleForm{
        position: relative;
        .meg{
            position: absolute;
            top: 0px;
            left: 101%;
            margin: 10px;
            width:45%;
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
    @media screen and (min-width: 1224px) {
      > .content {
        width: 50%;
        margin-left: 20%;
        padding: 10px;
        .demo-ruleForm {
          position: relative;
          .meg {
            position: absolute;
            top: 0px;
            left: 101%;
            margin: 10px;
            width: 45%;
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
        }
      }
    }
        @media screen and (max-width: 982px) and (min-width: 730px) {
      > .content {
        width: 65%;
        margin-left: 3%;
        padding: 10px;
        .demo-ruleForm {
          position: relative;
          .meg {
            position: absolute;
            top: 0px;
            left: 101%;
            margin: 10px;
            width: 45%;
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
        }
      }
    }
        @media screen and (max-width: 730px) and (min-width: 544px) {
      > .content {
        width: 65%;
        margin-left: 3%;
        padding: 10px;
        .demo-ruleForm {
          position: relative;
          .meg {
            position: absolute;
            top: 0px;
            left: 101%;
            margin: 10px;
            width: 45%;
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
        }
      }
    }
    @media screen and (max-width: 544px) {
      > .content {
        width: 75%;
        margin-left: 3%;
        padding: 10px;
        .demo-ruleForm {
          position: relative;
          .meg {
            position: absolute;
            top: 0px;
            left: 101%;
            margin: 10px;
            width: 28%;
            color: #38448e;
            font-size: 12px;
            word-wrap: break-word;
            word-break: break-all;
          }
          .til_1 {
            top: 260px;
          }
          .til_2 {
            top: 475px;
          }
          .til_3 {
            top: 600px;
          }
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
@media screen and (max-width: 982px) and (min-width: 730px) {
  .computing {
    margin: 50px;
  }
}
@media screen and (max-width: 730px) and (min-width: 544px) {
  .computing {
    margin: 50px;
    .el-form-item__content {
      margin-left: 10px !important;
    }
  }
}
@media screen and (max-width: 544px) {
  .computing {
    margin: 20px;
  }
}
</style>
