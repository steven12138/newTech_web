import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import TDesign from "tdesign-vue";
import "tdesign-vue/es/style/index.css";
import axios from "axios";

Vue.config.productionTip = false

Vue.use(TDesign);

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "/api";
} else {
    axios.defaults.baseURL = "";
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
