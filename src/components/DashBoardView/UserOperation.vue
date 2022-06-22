<template>
  <div>
    <t-row>
      <t-col :span="12">
        <t-card :title="insertUserTitle" style="margin:10px;overflow-y:auto;">
          <t-form ref="insertForm" :data="insertUser" :onSubmit="insertUserSubmit" style="min-width: 270px;">
            <t-row>
              <t-col>
                <t-row style="margin-bottom: 20px;">
                  <t-form-item :rules="requiredRules" label="用户名" name="username">
                    <t-input v-model="insertUser.username" placeholder="请输入内容"></t-input>
                  </t-form-item>
                  <t-form-item :rules="requiredRules" label="密码" name="password">
                    <t-input v-model="insertUser.password" placeholder="请输入内容"></t-input>
                  </t-form-item>
                </t-row>
              </t-col>
              <t-col class="show-margin">
                <t-row style="margin-bottom: 20px;">
                  <t-form-item :rules="requiredRules" label="姓名" name="realName">
                    <t-input v-model="insertUser.realName" placeholder="请输入内容"></t-input>
                  </t-form-item>
                  <t-form-item :rules="requiredRules" label="学号" name="sid">
                    <t-input v-model="insertUser.sid" placeholder="请输入内容"></t-input>
                  </t-form-item>
                  <t-form-item :rules="requiredRules" label="学考号" name="eid">
                    <t-input v-model="insertUser.eid" placeholder="请输入内容"></t-input>
                  </t-form-item>
                </t-row>
              </t-col>
            </t-row>
            <t-row>
              <t-form-item label="角色" name="role">
                <t-radio-group v-model="insertUser.isAdmin">
                  <t-radio :value="true">管理员</t-radio>
                  <t-radio :value="false">学生</t-radio>
                </t-radio-group>
              </t-form-item>
              <t-form-item label="报名" name="role">
                <t-checkbox-group v-model="insertUser.subject">
                  <t-checkbox value="tech">信息技术</t-checkbox>
                  <t-checkbox value="phy">通用技术</t-checkbox>
                </t-checkbox-group>
              </t-form-item>
              <t-form-item label="最高学分" name="maxCredit">
                <t-input-number v-model="insertUser.maxCredit"/>
              </t-form-item>
            </t-row>
            <t-row class="show-wide-margin">
              <t-form-item style="margin-left: 100px">
                <t-button style="margin-right: 10px" theme="primary" type="submit">提交</t-button>
              </t-form-item>
            </t-row>
          </t-form>
        </t-card>
      </t-col>
    </t-row>
    <t-row>
      <t-col :lg="4" :md="4" :sm="12" :xl="4" style="padding:10px;">
        <t-card :title="importUserTitle" style="height:252px;">
          <t-upload v-model="importFile" :action="uploadBase+'/importUser'" :autoUpload="false"
                    :beforeUpload="checkExtension" :draggable="true"
                    :formatResponse="importUserHandler" :headers="authorization_header" accept=".xlsx"
                    class="small_upload" theme="file"/>
        </t-card>
      </t-col>
      <t-col :lg="4" :md="4" :sm="12" :xl="4" style="padding:10px;">
        <t-card :title="removeUserTitle" style="height:252px;">
          <t-upload v-model="removeFile" :action="uploadBase+'/removeUser'" :autoUpload="false"
                    :beforeUpload="checkExtension" :draggable="true"
                    :formatResponse="removeUserHandler" :headers="authorization_header" accept=".xlsx"
                    class="small_upload" theme="file"/>
        </t-card>
      </t-col>
      <t-col :lg="4" :md="4" :sm="12" :xl="4" style="padding:10px;">
        <t-card :title="importForbiddenTitle" style="height:252px;">
          <t-upload v-model="importForbiddenFile" :action="uploadBase+'/importForbidden'" :autoUpload="false"
                    :beforeUpload="checkExtension" :draggable="true"
                    :formatResponse="importForbiddenHandler" :headers="authorization_header" accept=".xlsx"
                    class="small_upload" theme="file"/>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script>
import axios from "axios";
import ResponseCodeService from "@/service/ResponseCodeService";

export default {
  name: "UserOperation",
  data() {
    return {
      importFile: null,
      removeFile: null,
      importForbiddenFile: null,
      importUserTitle: () => <span style="font-size:20px;font-weight:500">批量导入用户</span>,
      removeUserTitle: () => <span style="font-size:20px;font-weight:500">批量删除用户</span>,
      importForbiddenTitle: () => <span style="font-size:20px;font-weight:500">导入已考察列表</span>,
      insertUserTitle: () => <span style="font-size:20px;font-weight:500">插入用户</span>,
      requiredRules: [{required: true, message: '必填'}],
      insertUser: {
        username: "",
        realName: "",
        subject: [],
        isAdmin: false,
        sid: "",
        eid: "",
        maxCredit: 0,
        password: "",
      }
    }
  },
  computed: {
    uploadBase: function () {
      return axios.defaults.baseURL;
    },
    authorization_header: function () {
      return {
        Authorization: "Bearer " + this.$store.getters.token,
      }
    }
  },
  methods: {
    handler_core: function (res, url) {
      if (res.code === 10000) {
        console.log("?")
        return {
          url: this.uploadBase + url,
        }
      }
      return {
        url: this.uploadBase + url,
        error: res.message + " " + (res.data == null ? "" : res.data),
      }
    },
    importUserHandler: function (res) {
      return this.handler_core(res, '/importUser');
    },
    removeUserHandler: function (res) {
      return this.handler_core(res, '/removeUser');
    },
    importForbiddenHandler: function (res) {
      return this.handler_core(res, 'importForbidden');
    },
    checkExtension: function (file) {
      console.log(file);
      return file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    },
    insertUserSubmit: function (context) {
      console.log(context)
      if (context.validateResult !== true) {
        this.$message.warning("数据不符合要求");
        return;
      }
      axios.post('/insertUser', {
        realName: this.insertUser.realName,
        username: this.insertUser.username,
        password: this.insertUser.password,
        sid: this.insertUser.sid,
        eid: this.insertUser.eid,
        maxCredit: this.insertUser.maxCredit,
        _admin: this.insertUser.isAdmin,
        _tech: this.insertUser.subject.includes("tech"),
        _phy: this.insertUser.subject.includes("phy"),
      }, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === 1) return;
        this.$notify.success({
          title: "插入成功",
          content: "用户插入成功",
          closeBtn: true
        })
        this.insertUser = {
          username: "",
          realName: "",
          subject: [],
          isAdmin: false,
          sid: "",
          eid: "",
          maxCredit: 0,
          password: "",
        }
        this.$refs.insertForm.reset();
      }).catch((e) => console.error(e));
    }
  }
}
</script>

<style lang="less">
.small_upload > .t-upload__dragger {
  width: 100% !important;
}

@media screen and(max-width: 1147px) {
  .show-wide-margin {
    margin-top: 10px !important;
  }
}
</style>
