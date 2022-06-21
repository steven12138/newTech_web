<template>
  <t-row style="display: flex;justify-content: center;align-items: center;">
    <t-card class="otr" style="margin-bottom: 10px;max-width:100%;">
      <t-row>
        <img alt="" class="big"
             src="https://s1.ax1x.com/2022/06/19/Xjt4fA.png" style="max-height:140px;max-width: 300px;margin:10px;">
        <div class="t-notification" style="box-shadow: none;">
          <div class="t-notification__icon">
            <svg class="t-icon t-icon-info-circle-filled t-is-info" fill="none" height="1em" viewBox="0 0 16 16"
                 width="1em">
              <path d="M8 15A7 7 0 108 1a7 7 0 000 14zM7.4 4h1.2v1.2H7.4V4zm.1 2.5h1V12h-1V6.5z"
                    fill="currentColor"
                    fill-opacity="0.9"></path>
            </svg>
          </div>
          <div class="t-notification__main">
            <div class="t-notification__title__wrap">
              <span class="t-notification__title">核查个人信息</span>
            </div>
            <div class="t-notification__content">
              <span>请确认个人信息准确无误</span>
              <br/>
              <span>如后续发现问题，由考生自行负责</span>
            </div>
            <div class="t-notification__detail">
              <t-button style="margin-bottom: -10px;" theme="primary" variant="outline" @click="confirmInfo">下一步
              </t-button>
            </div>
          </div>
        </div>
      </t-row>
    </t-card>
  </t-row>
</template>

<script>
export default {
  name: "ConfirmInfo",
  props: {
    confirmInfo: {
      type: Function,
      default: () => {
        return Function;
      }
    }
  },
  data() {
    return {
      type: 'outline'
    }
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
