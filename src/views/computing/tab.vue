<template>
  <div>
    <el-tabs type="border-card" class="right" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="从历史信息中选择" name="message">
        <div class="arrow_header">
          <div v-for="(data, index) in host_info_list" :key="index" class="arrow">
            <div class="arrow_1">
              <el-radio-group v-model="radio" @change="changeCompu">
                <el-radio :label="data.id">
                  <span style="display: none">{}</span>
                </el-radio>
              </el-radio-group>
            </div>
            <div class="arrow_2">
              <p>
                <span>供应商：{{ data.service_provider_name }}</span>
                <span style="margin-left:20px">IP地址：{{ data.ip_address }}</span>
              </p>
              <p>
                <span>密码：{{ data.password }}</span>
                <span style="margin-left:20px">用户名：{{ data.username }}</span>
              </p>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增云主机信息" name="createArrow">
        <div class="header">
          <div>服务商将影响测试对比结果, 请如实填写</div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="供应商" prop="provider">
              <el-select v-model="ruleForm.provider" placeholder="请选择">
                <el-option
                  v-for="(item,index) in allData"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="IP地址" prop="ip">
              <el-input v-model="ruleForm.ip"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="login_username">
              <el-input v-model="ruleForm.login_username"></el-input>
            </el-form-item>
            <el-form-item label="认证信息" prop="login_password">
              <el-radio v-model="radio_1" label="0101_1">密码</el-radio>
              <el-input v-model="ruleForm.login_password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="定时任务" prop="radio">
              <el-radio v-model="ruleForm.radio_2" label="true">开启</el-radio>
              <el-radio v-model="ruleForm.radio_2" label="false">关闭</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
              <el-button size="small" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { facilitatorList, setArrow, setComputing } from "@/api/arrow";
export default {
  data() {
    return {
      radio: "1",
      radio_1: "0101_1",
      activeName: "message",
      ruleForm: {
        provider: "",
        login_username: "",
        ip: "",
        login_password: "",
        radio_2: "true"
      },
      allData: [],
      host_info_list: [],
      rules: {
        login_username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        provider: [
          { required: true, message: "请选择供应商", trigger: "change" }
        ],
        login_password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        ip: [{ required: true, message: "请输入ip地址", trigger: "blur" }]
      }
    };
  },
  watch: {
    "ruleForm.ip": function(curVal, oldVal) {
      if (!curVal) {
        this.ruleForm.ip = "";
        return false;
      }
      // 实时把非数字的输入过滤掉
      this.ruleForm.ip = curVal.match(/\d/gi)
        ? curVal.match(/\d/gi).join("")
        : "";
    }
  },
  created() {
    this.getList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.ruleForm;
          setArrow(data).then(data => {
            if (data.code == "success") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.activeName = "message";
              this.getList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeCompu(v) {
      this.$emit("setComputing_change", v);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getList() {
      facilitatorList().then(data => {
        let allData = data.data.providers;
        this.allData = allData;
        let host_info_list = data.data.host_info_list;
        if (host_info_list) {
          allData.forEach(data_1 => {
            host_info_list.forEach(v => {
              if (v.service_provider == data_1.id) {
                v.service_provider_name = data_1.name;
                return v;
              }
            });
          });
          this.host_info_list = host_info_list;
          this.radio = host_info_list[0].id;
          this.$emit("setComputing_change", host_info_list[0].id);
        }
      });
    },
    handleClick(tab, event) {
      if (this.activeName == "createArrow") {
        this.$emit("activeName_change", true);
      } else {
        this.$emit("activeName_change", false);
      }
    }
  }
};
</script>
<style>
.arrow {
  display: flex;
  align-items: center;
}
.demo-ruleForm {
  position: relative;
  .meg {
    position: absolute;
    top: 0px;
    left: 101%;
    margin: 10px;
    width: 200px;
    color: #38448e;
    font-size: 14px;
  }
}
.arrow_1 {
  margin-right: 15px;
}
.arrow_header {
  width: 100%;
  height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
}
/*兼容IE*/
.arrow_header {
  scrollbar-face-color: #20a774; /*移动滑块颜色*/
  scrollbar-shadow-color: #20a774; /*移动滑块边框颜色*/
  scrollbar-track-color: #ccc; /*背景颜色*/
  scrollbar-arrow-color: #ddd; /*箭头颜色*/
}
.arrow_header::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc;
} /* 滚动条的滑轨背景颜色 */
.arrow_header::-webkit-scrollbar {
  width: 6px;
  background-color: #ccc;
}
.arrow_header::-webkit-scrollbar-thumb {
  background-color: #5db5fc;
} /* 滑块颜色 */
</style>
