<template>
  <t-row style="display: flex;justify-content: center;align-items: center;">
    <t-card class="otr" style="margin-bottom: 10px;max-width:100%;">
      <t-row>
        <img alt="" class="big"
             src="https://s1.ax1x.com/2022/06/19/Xj5nmT.png" style="max-height:140px;max-width: 300px;margin:10px;">
        <div class="t-notification" style="box-shadow: none;">
          <div class="t-notification__icon">
            <svg class="t-icon t-icon-check-circle-filled t-is-success" fill="none" height="1em" viewBox="0 0 16 16"
                 width="1em">
              <path d="M8 15A7 7 0 108 1a7 7 0 000 14zM4.5 8.2l.7-.7L7 9.3l3.8-3.8.7.7L7 10.7 4.5 8.2z"
                    fill="currentColor"
                    fill-opacity="0.9"></path>
            </svg>
          </div>
          <div class="t-notification__main">
            <div class="t-notification__title__wrap">
              <span class="t-notification__title">报名成功</span>
            </div>
            <div class="t-notification__content">
              <span>报名成功，建议截图此页面存档</span>
              <br/>
              <span>请关注希悦通知以获取后续安排</span>
              <br/>
              <span>当前时间：{{ dateString }}</span>
            </div>
            <div class="t-notification__detail">
              <t-button style="margin-bottom: -10px;" theme="primary" variant="text" @click="last">返回修改
              </t-button>
            </div>
          </div>
        </div>
      </t-row>
    </t-card>
  </t-row>
</template>

<script>
import axios from "axios";
import ResponseCodeService from "@/service/ResponseCodeService";

export default {
  name: "SuccessBox",
  props: {
    backward: {
      type: Function,
      default: () => {
        return Function;
      }
    }
  },
  data() {
    return {
      dateString: ""
    }
  }, methods: {
    last: function () {
      let self = this;
      axios.post('step', {
        step: 1,
      }, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(self, res);
        if (data === -1) return;
        this.backward(1);
      }).catch((e) => console.error(e));
    }
  },
  mounted() {
    let self = this;
    this.timer = setInterval(() => {
      self.dateString = new Date().toLocaleString();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
</script>

<style lang="css">
@media screen and (max-width: 980px) {
  .big {
    display: none;
  }
}

.otr > .t-card__body {
  padding: 0 !important;
}
</style>

