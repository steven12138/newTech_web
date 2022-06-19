<template>
  <t-layout style="height:100vh">
    <div class="bkg"></div>
    <Header/>
    <t-content style="display: flex;justify-content: center;align-items: center">
      <LoginBox style="z-index: 3"/>
    </t-content>
    <t-footer style="z-index:3;background-color:#fdfdfd">
      Copyright @ 2021-{{ new Date().getFullYear() }} SubIT StevenKerman. All Rights Reserved
    </t-footer>
  </t-layout>
</template>

<script>
import LoginBox from "@/components/LoginBox";
import Header from "@/components/Header";
import router from "@/router";

export default {
  name: 'HomeView',
  components: {
    LoginBox,
    Header
  },
  data() {
    return {
      login_confirm: null,
    }
  },
  async mounted() {
    if (await this.$store.getters.isLogin) {
      if (this.login_confirm) {
        this.login_confirm.show();
        return;
      }
      this.login_confirm = this.$dialog({
        header: "检测到未完成的会话",
        body: "您已经登陆，是否继续上次进程?",
        confirmBtn: "确认",
        cancelBtn: "取消",
        onConfirm: ({e}) => {
          this.login_confirm.hide();
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
        }
      })
    }
  }
}
</script>

<style>
.bkg {
  margin-bottom: -100vh;
  width: 100vw;
  height: 100vh;
  margin-right: -100vw;
  background-image: url("https://s1.ax1x.com/2020/10/03/03juVK.jpg");
  background-position: center center;
  background-size: cover;
  filter: blur(10px) opacity(40%);
  z-index: 2;
}
</style>
