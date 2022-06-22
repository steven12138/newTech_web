<template>
  <t-header style="z-index: 5">
    <t-head-menu style="padding:0 50px;" theme="light">
      <template v-slot:logo>
        <img alt="logo" src="https://s1.ax1x.com/2022/06/18/XLIqfI.png" width="136">
        <h1 class="small">技术学考报名</h1>
        <span class="small" style="margin-top:18px;font-weight: 600;">&nbsp;{{ new Date().getFullYear() }}</span>
      </template>
      <template #operations style="margin-right: 10px;">
        <Icon name="user" style="margin-right:10px;font-size: 25px;"></Icon>
        <t-dropdown :disabled="!$store.getters.isLoginStatic" :maxColumnHeight="10" :options="options">
          <h3 style="display:inline-flex;line-height: 25px;padding-left:35px;margin-left:-35px;">
            {{ name === "" ? "请登录" : name }}</h3>
        </t-dropdown>
      </template>
    </t-head-menu>
    <div>
      <t-dialog
          :onConfirm="changePassword"
          :visible.sync="showDia"
          header="重置密码"
      >
        <template #body>
          <t-form ref="changePasswordForm" :data="password_reset">
            <t-form-item :rules="requiredRules" label="旧密码" name="oldPassword">
              <t-input v-model="password_reset.oldPassword" type="password"></t-input>
            </t-form-item>
            <t-form-item :rules="sameOld" label="新密码" name="newPassword">
              <t-input v-model="password_reset.newPassword" type="password"></t-input>
            </t-form-item>
            <t-form-item :rules="sameNew" label="重复新密码" name="newPasswordRepeat">
              <t-input v-model="password_reset.newPasswordRepeat" type="password"></t-input>
            </t-form-item>
          </t-form>
        </template>
      </t-dialog>
    </div>
  </t-header>
</template>

<script>
import {Icon} from "tdesign-icons-vue";
import axios from "axios";
import ResponseCodeService from "@/service/ResponseCodeService";
import router from "@/router";

export default {
  name: "Header",
  components: {Icon},
  data() {
    return {
      requiredRules: [{required: true, message: '必填'}],
      sameNew: [{required: true, message: '必填'}, {
        validator: (val) => {
          return val === this.password_reset.newPassword;
        },
        message: "两次输入的密码不一致"
      }],
      sameOld: [{required: true, message: '必填'}, {
        validator: (val) => {
          return val !== this.password_reset.oldPassword;
        },
        message: "旧密码不能与原密码相同"
      }],
      password_reset: {
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      },
      showDia: false,
      options: [
        {
          content: () => <span style="color:#0052d9">重置密码</span>,
          value: 1,
          divider: true,
          onClick: () => {
            this.$refs.changePasswordForm.reset();
            this.showDia = true;
            this.password_reset = {
              oldPassword: "",
              newPassword: "",
              newPasswordRepeat: "",
            };
          }
        },
        {
          content: () => <span style="color:red">退出登录</span>,
          value: 2,
          onClick: () => {
            //Logout OnClick
            let self = this;
            axios.post("/user/logout", {}, {
              headers: {
                Authorization: "Bearer " + this.$store.getters.token,
              }
            }).then((res) => {
              console.log(res);
              let data = ResponseCodeService.parse(self, res)
              if (data === -1) return;
              this.$message.success("注销成功");
              this.$store.commit("logout");
              router.push('/');
            }).catch((e) => {
              if (e.request.status === 403) {
                this.$message.error("未登录");
                router.push('/')
                return;
              }
              this.$notify.error({
                title: "未知错误",
                content: e,
                closeBtn: true,
              })
            })
          }
        },
      ],
    }
  },
  methods: {
    changePassword: async function () {
      if (await this.$refs.changePasswordForm.validate() !== true) {
        return;
      }
      axios.post("/user/modifyPassword", {
        oldPassword: this.password_reset.oldPassword,
        newPassword: this.password_reset.newPassword,
      }, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === -1) return;
        this.$notify.success({
          title: "修改成功",
          content: "修改成功，请重新登录"
        });
        this.$refs.changePasswordForm.reset();
        this.showDia = false;
        this.$store.commit("logout");
        router.push('/');
      }).catch((e) => console.error(e));
    }
  },
  computed: {
    name: function () {
      if (!this.$store.getters.isLoginStatic)
        return "";
      return this.$store.getters.realName;
    }
  }
}
</script>

<style scoped>

@media screen and (max-width: 585px) {
  .small {
    display: none;
  }
}
</style>
