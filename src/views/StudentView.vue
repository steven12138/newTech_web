<template>
  <t-layout style="min-height:100vh">
    <Header/>
    <t-content style="padding:20px;">
      <t-card :title="card_title" class="advanced-card" style="margin:10px;">
        <template #actions>
          <t-button :disabled="step!==0" :theme="step===0?'warning':'primary'" shape="round" variant="outline">
            <Icon name="edit" style="margin-top:-2px;"/>
            {{ step === 0 ? "信息有误" : "已确认" }}
          </t-button>
        </template>
        <t-row>
          <t-col class="full" flex="1 0 300px" style="margin:10px;">
            <t-row>
              <t-col class="title" flex="1 0 100px">
                <span>用户名</span>
              </t-col>
              <t-col class="detail" flex="1 0 100px">{{ baseInfoData.username }}</t-col>
            </t-row>
          </t-col>
          <t-col class="full" flex="1 0 300px" style="margin:10px;">
            <t-row>
              <t-col class="title" flex="1 0 100px">姓名</t-col>
              <t-col class="detail" flex="1 0 100px">{{ baseInfoData["real_name"] }}</t-col>
            </t-row>
          </t-col>
        </t-row>
        <t-row>
          <t-col class="full" flex="1 0 300px" style="margin:10px;">
            <t-row>
              <t-col class="title" flex="1 0 100px">学号</t-col>
              <t-col class="detail" flex="1 0 100px">{{ baseInfoData.sid }}</t-col>
            </t-row>
          </t-col>
          <t-col class="full" flex="1 0 300px" style="margin:10px;">
            <t-row>
              <t-col class="title" flex="1 0 100px">
                学考号
                <t-popup :content="eid_desc" :showArrow="true" placement="bottom-left">
                  <Icon name="help-circle" style="margin-bottom: 3px;cursor: pointer"/>
                </t-popup>
              </t-col>
              <t-col class="detail" flex="1 0 100px">{{ baseInfoData.eid }}</t-col>
            </t-row>
          </t-col>
        </t-row>
        <t-row>
          <t-col class="full" flex="1 0 300px" style="margin:10px;">
            <t-row>
              <t-col class="title" flex="1 0 100px">信息技术学考</t-col>
              <t-col v-if="isTech==null" class="detail" flex="1 0 100px">
                <t-skeleton style="width:50px;margin-top:3px;margin-bottom: -3px" theme="text"/>
              </t-col>
              <t-col v-else-if="isTech" class="detail" flex="1 0 100px">
                <span class="inProgress" style="color:var(--td-success-color-5)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-success-color-5);">
                  </i>
                  已通过
                </span>
              </t-col>
              <t-col v-else flex="1 0 100px">
                  <span class="inProgress" style="color:var(--td-error-color-5)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-error-color-5);">
                  </i>
                    未通过
                </span>
              </t-col>
            </t-row>
          </t-col>
          <t-col class="full" flex="1 0 300px" style="margin:10px;">
            <t-row>
              <t-col class="title" flex="1 0 100px">通用技术学考</t-col>
              <t-col v-if="isPhy==null" class="detail" flex="1 0 100px">
                <t-skeleton style="width:50px;margin-top:3px;margin-bottom: -3px" theme="text"/>
              </t-col>
              <t-col v-else-if="isPhy" class="detail" flex="1 0 100px">
                <span class="inProgress" style="color:var(--td-success-color-5)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-success-color-5);">
                  </i>
                  已通过
                </span>
              </t-col>
              <t-col v-else flex="1 0 100px">
                  <span class="inProgress" style="color:var(--td-error-color-5)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-error-color-5);">
                  </i>
                    未通过
                </span>
              </t-col>
            </t-row>
          </t-col>
        </t-row>
      </t-card>
      <t-card :title="signup_title" layout="vertical" style="margin:10px;">
        <t-row style="display: flex;align-items: center;">
          <!--          <t-col xs="1" flex="0 3 130px" class="smp">-->
          <!--            <t-steps layout="vertical" theme="dot" :current="1" readonly>-->
          <!--              <t-step-item title="个人信息确认"></t-step-item>-->
          <!--              <t-step-item title="选择报名项目"></t-step-item>-->
          <!--              <t-step-item title="报名成功"></t-step-item>-->
          <!--            </t-steps>-->
          <!--          </t-col>-->
          <t-col v-if="step===0" flex="1 0 200px">
            <ConfirmInfo :confirmInfo="confirm_info"/>
          </t-col>
          <t-col class="bgp" flex="0 3 130px">
            <t-steps :current="step" layout="vertical" readonly theme="dot">
              <t-step-item title="个人信息确认"></t-step-item>
              <t-step-item title="选择报名项目"></t-step-item>
              <t-step-item title="报名成功"></t-step-item>
            </t-steps>
          </t-col>
        </t-row>
      </t-card>
    </t-content>
    <t-footer style="z-index:3;background-color:#fdfdfd">
      Copyright @ 2021-{{ new Date().getFullYear() }} SubIT StevenKerman. All Rights Reserved
    </t-footer>
  </t-layout>
</template>

<script>
import Header from "@/components/Header";
import {Icon} from 'tdesign-icons-vue';
import axios from "axios";
import ResponseCodeService from "@/service/ResponseCodeService";
import ConfirmInfo from "@/components/ConfirmInfo";

export default {
  name: "StudentView",
  components: {
    Header,
    Icon,
    ConfirmInfo
  },
  data() {
    return {
      signup_title: () => <span style="font-size:20px;font-weight:500">报名进度</span>,
      card_title: () => <span style="font-size:20px;font-weight:500">基本信息</span>,
      eid_desc: () => <div>
        <Icon style="color:var(--td-brand-color-8);margin-top:-3px;margin-right:5px;" name="info-circle-filled"/>
        <span>您可以在希悦上核对此项信息</span>
        <a href="https://bdfz.seiue.com" target="_blank"
           style="text-decoration:none;margin-left:5px;color:var(--td-brand-color-7)">打开希悦</a>
      </div>,
      isTech: null,
      isPhy: null,
      step: 0,
    }
  },
  computed: {
    baseInfoData: function () {
      return this.$store.getters.parsePayload;
    }
  },
  methods: {
    confirm_info: function () {
      let self = this;
      axios.post('/step', {
        step: 1,
      }, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        }
      }).then((res) => {
        console.log(res);
        let data = ResponseCodeService.parse(self, res);
        if (data === -1) return;
        self.step = 1;
      }).catch((e) => {
        console.error(e)
      });
    }
  },
  mounted() {
    let self = this;
    axios.get('/examHistory', {
      headers: {
        Authorization: "Bearer " + this.$store.getters.token,
      }
    }).then((res) => {
      let data = ResponseCodeService.parse(self, res);
      console.log(data);
      if (data === -1) return;
      console.log(data);
      this.isTech = data["tech"];
      this.isPhy = data["phy"];
    }).catch((e) => {
    })
  }
}
</script>

<style>
.title {
  font-size: 14px;
  font-weight: 500;
  color: var(--td-text-color-secondary);
}

.detail {
  font-size: 14px;
  font-weight: 500;
  color: var(--td-text-color-primary)
}

@media screen and (max-width: 768px) {
  .bgp {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .smp {
    display: none;
  }
}

</style>

<style lang="less">
/deep/ [class*='t-table-expandable-icon-cell'] .t-icon {
  background-color: transparent;
}

.demo-container {
  .title {
    font-size: 14px;
    line-height: 28px;
    display: block;
    margin: 10px 0;

    i {
      font-style: normal;
    }
  }

  .status {
    position: relative;
    color: #00a870;
    margin-left: 10px;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: '';
      background-color: #00a870;
      width: 6px;
      height: 6px;
      margin-left: -10px;
      border-radius: 50%;
    }
  }

  .status.unhealth {
    color: #e34d59;

    &::before {
      background-color: #e34d59;
    }
  }

  .status.warning {
    color: #ed7b2f;

    &::before {
      background-color: #ed7b2f;
    }
  }
}
</style>
