<template>
  <div style="margin:10px; ">
    <t-row>
      <t-col :span="12">
        <t-card :title="SettingTitle">
          <t-row>
            <t-col class="full" flex="1 0 200px" style="margin:10px;">
              <t-row>
                <t-col class="title" flex="1 0 100px">系统状态:</t-col>
                <t-col v-if="status==null" class="detail" flex="1 0 100px">
                  <t-skeleton style="width:50px;margin-top:3px;margin-bottom: -3px" theme="text"/>
                </t-col>
                <t-col v-else-if="status" class="detail" flex="1 0 100px">
                <span class="inProgress" style="color:var(--td-success-color-5)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-success-color-5);">
                  </i>
                  开放报名
                </span>
                </t-col>
                <t-col v-else flex="1 0 100px">
                  <span class="inProgress" style="color:var(--td-error-color-6)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-error-color-6);">
                  </i>
                    禁止报名
                </span>
                </t-col>
              </t-row>
            </t-col>
            <t-col class="full" flex="1 0 200px" style="margin:10px;">
              <t-row>
                <t-col class="title" flex="1 0 100px">已报名总数:</t-col>
                <t-col class="detail" flex="1 0 100px">{{ sign_num }}</t-col>
              </t-row>
            </t-col>
          </t-row>
          <t-row>
            <t-col class="full" flex="1 0 200px" style="margin:10px;">
              <t-row>
                <t-col class="title" flex="1 0 100px">开始时间:</t-col>
                <t-col class="detail" flex="1 0 100px">
                  {{ st_time }}
                </t-col>
              </t-row>
            </t-col>
            <t-col class="full" flex="1 0 200px" style="margin:10px;">
              <t-row>
                <t-col class="title" flex="1 0 100px">结束时间:</t-col>
                <t-col class="detail" flex="1 0 100px">
                  {{ ed_time }}
                </t-col>
              </t-row>
            </t-col>
          </t-row>
          <t-row>
            <t-col class="full" flex="1 0 200px" style="margin:10px;">
              <t-row>
                <t-col class="title" flex="1 0 100px">强制开放:</t-col>
                <t-col v-if="this.setting.force_open==null" class="detail" flex="1 0 100px">
                  <t-skeleton style="width:50px;margin-top:3px;margin-bottom: -3px" theme="text"/>
                </t-col>
                <t-col v-else-if="this.setting.force_open" class="detail" flex="1 0 100px">
                <span class="inProgress" style="color:var(--td-warning-color-5)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-warning-color-5);">
                  </i>
                  强制开放
                </span>
                </t-col>
                <t-col v-else flex="1 0 100px">
                  <span class="inProgress" style="color:var(--td-text-color-disabled)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-text-color-disabled);">
                  </i>
                    未强制开放
                </span>
                </t-col>
              </t-row>
            </t-col>
            <t-col class="full" flex="1 0 200px" style="margin:10px;">
              <t-row>
                <t-col class="title" flex="1 0 100px">策略限制:</t-col>
                <t-col v-if="this.setting.strategy==null" class="detail" flex="1 0 100px">
                  <t-skeleton style="width:50px;margin-top:3px;margin-bottom: -3px" theme="text"/>
                </t-col>
                <t-col v-else-if="this.setting.strategy" class="detail" flex="1 0 100px">
                <span class="inProgress" style="color:var(--td-warning-color-5)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-warning-color-5);">
                  </i>
                  启用策略
                </span>
                </t-col>
                <t-col v-else flex="1 0 100px">
                  <span class="inProgress" style="color:var(--td-text-color-disabled)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-text-color-disabled);">
                  </i>
                    未启用策略
                </span>
                </t-col>
              </t-row>
            </t-col>
          </t-row>
        </t-card>
      </t-col>
    </t-row>
    <t-row style="margin-top:20px;">
      <t-col :span="12">
        <t-card :title="PanelTitle">
          <t-form ref="insertForm" :data="panelSetting" :onSubmit="saveSetting" style="min-width: 270px;">
            <t-form-item label="强制开启" name="force_open">
              <t-switch v-model="panelSetting.force_open"/>
            </t-form-item>
            <t-row style="margin-bottom: 20px;">
              <t-col :sm="6" :xs="12" style="margin:10px 0;">
                <t-form-item label="开放时间" name="st_time">
                  <t-input v-model="panelSetting.st_time" placeholder="yyyy-MM-dd HH:mm"></t-input>
                </t-form-item>
              </t-col>
              <t-col :sm="6" :xs="12" style="margin:10px 0;">
                <t-form-item label="结束时间" name="ed_time">
                  <t-input v-model="panelSetting.ed_time" placeholder="yyyy-MM-dd HH:mm"></t-input>
                </t-form-item>
              </t-col>
            </t-row>
            <t-form-item label="启用策略" name="strategy">
              <t-switch v-model="panelSetting.strategy"/>
            </t-form-item>
            <t-form-item label="策略规则" name="rule">
              <t-input v-model="panelSetting.rule" :disabled="!panelSetting.strategy" placeholder="例: 23[0-9]*限制23届"/>
            </t-form-item>
            <t-form-item label="信息错误提示" name="rule">
              <t-textarea v-model="panelSetting.error_msg"/>
            </t-form-item>
            <t-row style="margin-top: 10px;">
              <t-col flex="1 0 10px"></t-col>
              <t-col flex="0 0 80px">
                <t-button theme="primary" type="submit" variant="base">
                  <Icon name="save" style="margin-top:-3px;margin-right:5px;margin-left:-5px;"/>
                  保存
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script>
import axios from "axios";
import ResponseCodeService from "@/service/ResponseCodeService";
import {Icon} from "tdesign-icons-vue";

export default {
  name: "SignUpSetting",
  components: {Icon},
  data() {
    return {
      SettingTitle: () => <span style="font-size:20px;font-weight:500">报名设置</span>,
      PanelTitle: () => <span style="font-size:20px;font-weight:500">控制面板</span>,
      status: null,
      sign_num: "",
      setting: {
        ed_time: 0,
        error_msg: "",
        force_open: null,
        id: 1,
        st_time: 0,
        strategy: null,
      },
      panelSetting: {
        ed_time: 0,
        error_msg: "",
        force_open: null,
        id: 1,
        st_time: 0,
        strategy: null,
        rule: "",
      }
    };
  },
  computed: {
    st_time: function () {
      return new Date(this.setting.st_time).toLocaleString();
    },
    ed_time: function () {
      return new Date(this.setting.ed_time).toLocaleString();
    }
  },
  methods: {
    saveSetting: function () {
      let settingDTO = JSON.parse(JSON.stringify(this.panelSetting));
      settingDTO.st_time = new Date(settingDTO.st_time).getTime();
      settingDTO.ed_time = new Date(settingDTO.ed_time).getTime();
      if (settingDTO.st_time > settingDTO.ed_time) {
        this.$notify.error({
          title: "错误",
          content: "开始时间不能晚于截止时间",
          closeBtn: true,
        })
        return;
      }
      if (!settingDTO.strategy) settingDTO.rule = "";
      axios.post('/modifySetting', settingDTO, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === -1) return;
        this.$message.success("更新成功");
        this.flush_setting();
      }).catch((e) => console.error(e))
    },
    flush_setting: function () {
      axios.get('/setting').then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === -1) return;
        this.setting = JSON.parse(JSON.stringify(data));
        data.st_time = new Date(data.st_time).toLocaleString();
        data.ed_time = new Date(data.ed_time).toLocaleString();
        if (!data.strategy) data.rule = "";
        this.panelSetting = JSON.parse(JSON.stringify(data));
        console.log(data);
      })
      axios.get('/info/status').then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === -1) return;
        this.status = data;
      }).catch((e) => console.error(e))
    }
  },
  mounted() {
    this.flush_setting();
    axios.get('/info/num', {
      headers: {
        Authorization: "Bearer " + this.$store.getters.token,
      }
    }).then((res) => {
      let data = ResponseCodeService.parse(this, res);
      if (data === -1) return;
      this.sign_num = data;
    }).catch((e) => console.error(e))
  }
}
</script>

<style lang="less">
.t-form__item {
  margin-bottom: 20px;
}
</style>
