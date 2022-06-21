<template>
  <t-row style="display: flex;justify-content: center;align-items: center;">
    <t-card class="otr" style="margin-bottom: 10px;max-width:100%">
      <t-row>
        <img alt="" class="big"
             src="https://s1.ax1x.com/2022/06/19/Xj2uwj.png" style="max-height:140px;max-width: 300px;margin:10px;">
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
              <span class="t-notification__title">选择报名科目</span>
            </div>
            <div class="t-notification__content">
              <t-form>
                <t-form-item label="考试报名科目" name="subject">
                  <t-checkbox-group v-model="signed">
                    <t-checkbox :disabled="passedTech" value="tech">信息技术</t-checkbox>
                    <t-checkbox :disabled="passedPhy" value="phy">通用技术</t-checkbox>
                  </t-checkbox-group>
                </t-form-item>
              </t-form>
            </div>
            <div class="t-notification__detail">
              <t-button :disabled="signed.length===0" style="margin-right:10px;margin-bottom: -10px;" theme="default"
                        variant="text" @click="last">上一步
              </t-button>
              <t-button :disabled="signed.length===0" style="margin-bottom: -10px;" theme="primary" variant="outline"
                        @click="SignUp(signed)">下一步
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
  name: "SignUpBox",
  props: {
    passedTech: {
      type: Boolean,
    },
    passedPhy: {
      type: Boolean,
    },
    SignUp: {
      type: Function,
      default: () => {
        return Function;
      }
    },
    backward: {
      type: Function,
      default: () => {
        return Function;
      }
    }
  },
  data() {
    return {
      signed: [],
    }
  },
  methods: {
    last: function () {
      let self = this;
      axios.post('step', {
        step: 0,
      }, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(self, res);
        if (data === -1) return;
        this.backward(0);
      }).catch((e) => console.error(e));
    }
  },
  mounted() {
    axios.get('SignUp', {
      headers: {
        Authorization: "Bearer " + this.$store.getters.token,
      }
    }).then((res) => {
      let data = ResponseCodeService.parse(this, res);
      if (data === -1) return;
      this.signed = []
      if (data.tech) this.signed.push('tech');
      if (data.phy) this.signed.push('phy');
    }).catch((e) => console.error(e))
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
