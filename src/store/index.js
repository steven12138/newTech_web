import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import ResponseCodeService from "@/service/ResponseCodeService";
import {Buffer} from "buffer";

Vue.use(Vuex)


function parsePayload(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], 'base64').toString('utf-8'));
}

function token(state) {
    if (state.token !== "") return state.token;
    let token = localStorage.getItem("token");
    if (token != null) {
        state.token = token;
        // console.log(state,token);
        return token;
    }
    return "";
}

export default new Vuex.Store({
    state: {
        token: "",
    },
    getters: {
        token: function (state) {
            if (state.token !== "") return state.token;
            let token = localStorage.getItem("token");
            if (token != null) {
                state.token = token;
                // console.log(state,token);
                return token;
            }
            return "";
        },
        parsePayload: function (state) {
            return JSON.parse(Buffer.from(token(state).split(".")[1], 'base64').toString('utf-8'));
        },
        isLoginStatic: function (state) {
            return token(state) !== "";
        },
        isLogin: async function (state) {
            let self = this;
            // console.log("check login")
            if (token(state) === "") return false;
            let login_status = false;
            await axios.get("/user/checkLogin", {
                headers: {
                    Authorization: "Bearer " + token(state)
                }
            }).then(res => {
                let data = ResponseCodeService.parse(self, res);
                // console.log(data);
                if (data === -1) return;
                login_status = true;
            }).catch(e => {
            })
            if (!login_status) {
                state.token = "";
                localStorage.setItem("token", "");
            }
            return login_status;
        },
        username: function (state) {
            return parsePayload(token(state)).username;
        },
        role: function (state) {
            return parsePayload(token(state))["is_admin"] ? "admin" : "student";
        },
        realName: function (state) {
            return parsePayload(token(state))["real_name"];
        }
    }
    ,
    mutations: {
        setLogin: function (state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        logout: function (state) {
            state.token = "";
            localStorage.setItem("token", "");
        }
    },
    actions: {},
    modules: {}
})
