<template>
</template>

<script>
import router from "@/router";

export default {
  name: "Error",
  beforeCreate() {
    let code = this.$route.params.code;
    console.log(code);
    switch (code) {
      case 404:
        this.$notify.error({
          title: "404 找不到页面",
          content: "找不到当前页面，自动回到主页"
        })
        break;
      case 401:
        this.$notify.error({
          title: "401 未登录",
          content: "您没有登陆，请先登录"
        })
        break;
      case 403:
        this.$notify.error({
          title: "403 访问被拒绝",
          content: "您没有权限"
        })
        break;
    }
    router.push('/');
  }
}
</script>

<style scoped>

</style>
