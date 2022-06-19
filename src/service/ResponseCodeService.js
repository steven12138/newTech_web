export default {
    parse: function (self, res) {
        let data = res.data;
        let internalCode = data.code;
        switch (internalCode) {
            case 10000:
                return data.data;
            case 10001:
                self.$notify.error({
                    title: "请求被拒绝",
                    content: "403您的请求被拒绝了",
                    closeBtn: true,
                })
                break;
            case 10002:
                self.$notify.error({
                    title: "未知错误",
                    content: data.data,
                    closeBtn: true,
                })
                break;
            case 10003:
                self.$notify.error({
                    title: "用户名或密码错误",
                    content: "用户名或密码错误，请重试",
                    closeBtn: true,
                })
                break;
            case 10004:
                self.$notify.error({
                    title: "密码错误",
                    content: "密码错误，请重试",
                    closeBtn: true,
                })
                break;
            case 10005:
                self.$notify.warning({
                    title: "已通过的考试",
                    content: "信息技术考试已通过，请勿重复报名",
                    closeBtn: true,
                })
                break;
            case 10006:
                self.$notify.warning({
                    title: "已通过的考试",
                    content: "通用技术考试已通过，请勿重复报名",
                    closeBtn: true,
                })
                break;
            case 10007:
                self.$notify.warning({
                    title: "无需报名",
                    content: "您已通过信息技术与通用及数学考，无需报名",
                    closeBtn: true,
                })
                break;
            case 10008:
                self.$notify.error({
                    title: "错误的参数",
                    content: "传入参数错误\n" +
                        "args" + res.config.data,
                    closeBtn: true,
                })
                break;
            case 10009:
                self.$notify.error({
                    title: "无权限",
                    content: "Token凭证过期或为伪造，请重新登录",
                    closeBtn: true,
                })
                break;
            case 10010:
                self.$notify.error({
                    title: "错误的请求方法",
                    content: "请求方法错误，" + res.config.method + "方法不受支持",
                    closeBtn: true,
                })
                break;
            case 10011:
                self.$notify.error({
                    title: "原密码不匹配",
                    content: "原密码错误，请重试",
                    closeBtn: true,
                })
                break;
            case 10012:
                self.$notify.error({
                    title: "文件错误",
                    content: "上传的文件出错",
                    closeBtn: true,
                })
                break;
            case 10013:
                self.$notify.warning({
                    title: "不支持的扩展名",
                    content: "文件扩展名不受支持，请重试",
                    closeBtn: true,
                })
                break;
            case 10014:
                self.$notify.error({
                    title: "无记录",
                    content: "找不到记录，请重试",
                    closeBtn: true,
                })
                break;
            case 10015:
                self.$notify.error({
                    title: "事务出错",
                    content: "数据不可用，请检查重复的学号",
                    closeBtn: true,
                })
                break;
            case 10016:
                self.$notify.warning({
                    title: "系统未开放",
                    content: "暂时未到开放时间，请稍后再试",
                    closeBtn: true,
                })
                break;
            case 90000:
                self.$notify.info({
                    title: "API TEST",
                    content: data.data,
                    closeBtn: true,
                })
                break;
        }
        return -1;
    }
}
