<template>
  <div class="computing">
    <h4>网络IO能力测试</h4>
    <div class="body">
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="云主机信息" prop="name">
            <Tab @setComputing_change="setComputing_change" @activeName_change="activeName_change"></Tab>
          </el-form-item>
          <el-form-item label="活动区域" prop="block_product_type">
            <el-select v-model="ruleForm.block_product_type" placeholder="产品类型">
              <el-option label="普通盘" value="hdd"></el-option>
              <el-option label="SSD盘" value="ssd"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称" prop="block_dev_path">
            <el-input v-model="ruleForm.block_dev_path"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              :loading="loading"
              :disabled="disabled"
            >开始测试</el-button>
          </el-form-item>
          <p class="meg">任务名称将出现在任务列表</p>
          <p class="meg til_1">仅支持Ubuntu 14.04,CentOS 6.5 系统</p>
          <p class="meg til_2">请提供Root权限账号，否则测试可能无法正常进行</p>
          <p class="meg til_3">密码将被明文保存，请使用后更换密码</p>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Tab from "../computing/tab.vue";
import { setNet } from "@/api/arrow";
export default {
  components: {
    Tab
  },
  data() {
    return {
      loading: false,
      disabled: false,
      host_info_id: "",
      ruleForm: {
        name: "",
        block_product_type: "",
        block_dev_path: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 位字母/数字/汉字",
            trigger: "blur"
          }
        ],
        block_product_type: [
          { required: true, message: "产品类型", trigger: "change" }
        ],
        block_dev_path: [
          { required: true, message: "请输入块存储路径", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = {
            host_info_id: this.host_info_id,
            block_product_type: this.ruleForm.block_product_type,
            block_dev_path: this.ruleForm.block_dev_path,
            task_name: this.ruleForm.name
          };
          this.loading = true;
          setNet(param).then(data => {
            if (data.code == "success") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.loading = false;
              this.resetForm(formName);
            }
          });
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    setComputing_change(id) {
      this.host_info_id = id;
    },
    activeName_change(show) {
      this.disabled = show;
    }
  }
};
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

    > .content {
      width: 45%;
      margin: auto;
      padding: 10px;
      .demo-ruleForm {
        position: relative;
        .meg {
          position: absolute;
          top: 0px;
          left: 101%;
          margin: 10px;
          width: 313px;
          color: #38448e;
          font-size: 14px;
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
}
</style>
