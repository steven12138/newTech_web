<template>
  <t-card :bordered="false" :style="{ width: '400px' }" header-bordered shadow>
    <template #avatar>
      <span>登录</span>
    </template>
    <template #actions>
      <t-button theme="primary" variant="text" @click="$router.push('/about')">关于</t-button>
    </template>
    <t-form ref="loginBox" :colon="true" :data="loginForm" :labelWidth="0" @submit="submit">
      <t-form-item name="account">
        <t-input v-model="loginForm.username" clearable placeholder="请输入账户名">
          <template #prefix-icon>
            <Icon name="user"></Icon>
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input v-model="loginForm.password" clearable placeholder="请输入密码" type="password">
          <template #prefix-icon>
            <Icon name="lock-on"></Icon>
          </template>
        </t-input>
      </t-form-item>
      <t-form-item style="margin-top:30px;">
        <t-button block theme="primary" type="submit">登录</t-button>
      </t-form-item>
    </t-form>
  </t-card>
</template>

<script>
import {Icon} from "tdesign-icons-vue";
import axios from 'axios';
import responseCodeService from "@/service/ResponseCodeService";
import router from "@/router";

export default {
  name: "LoginBox",
  components: {Icon},
  data: () => {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    }
  },
  methods: {
    submit: function () {
      let self = this;
      axios.post("/user/login", {
        username: this.loginForm.username,
        password: this.loginForm.password,
      }).then(res => {
        let data = responseCodeService.parse(self, res);
        if (data === -1) return;
        this.$store.commit("setLogin", data.token);
        let role = this.$store.getters.role;

        if (role === "admin") {
          this.$notify.success({
            title: "登陆成功",
            content: "管理员: " + this.$store.getters.username + ", 欢迎回来",
            closeBtn: true,
          })
          router.push("/dashboard");
        } else {
          this.$notify.success({
            title: "登陆成功",
            content: "欢迎您 " + this.$store.getters.realName,
            closeBtn: true,
          })
          router.push("/student");
        }
      }).catch(e => {
        console.error(e);
        this.$notify.error({
          title: "发生错误，请重试",
          content: e.response.request.status + " " + e.response.request.statusText + "\n"
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
