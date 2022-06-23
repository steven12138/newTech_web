import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import TDesign from "tdesign-vue";
import "tdesign-vue/es/style/index.css";
import axios from "axios";

Vue.config.productionTip = false

Vue.use(TDesign);

const vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "/api";
} else {
    axios.defaults.baseURL = "/api";
}

let isLoading = false;

function error_alert() {
    if (isLoading) {
        // 终止后续代码的执行，终止请求
        return
    }
    isLoading = true
    vue.$message.error("登陆过期，请重新登录");
    vue.$store.commit("logout");
    router.push('/');
    setTimeout(() => {
        isLoading = false
    }, 2000)
}

axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        if (error.request.status === 403) {
            error_alert();
        }
        return Promise.reject(error);
    }
)
