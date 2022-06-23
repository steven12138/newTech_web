<template>
  <t-layout style="min-height:100vh">
    <Header></Header>
    <t-content>
      <t-layout style="height:calc(100vh - 128px);">
        <t-row style="height:100%;">
          <t-menu :collapsed="init||collapsed" :value="side_menu" style="height:100%;" theme="light"
                  @change="menuChange">
            <template #operations>
              <icon class="t-menu__operations-icon" name="view-list" @click.native="collapsed=!collapsed;init=false"/>
            </template>
            <t-menu-item value="dashboard">
              <icon slot="icon" name="dashboard"/>
              主页
            </t-menu-item>
            <t-menu-item value="user_operation">
              <icon slot="icon" name="usergroup"/>
              用户操作
            </t-menu-item>
            <t-menu-item value="setting">
              <icon slot="icon" name="setting"/>
              报名设置
            </t-menu-item>
            <!--            <t-menu-item value="export">-->
            <!--              <icon slot="icon" name="download"/>-->
            <!--              数据导出-->
            <!--            </t-menu-item>-->
            <t-menu-item value="resources">
              <icon slot="icon" name="file-paste"/>
              资源下载
            </t-menu-item>
          </t-menu>
          <t-col class="inner_padding" flex="1 0 100px"
                 style="max-height:100%; overflow-y:auto;">
            <MainDashBoard v-if="side_menu==='dashboard'" style="margin:10px;"/>
            <UserOperation v-else-if="side_menu==='user_operation'"/>
            <SignUpSetting v-else-if="side_menu==='setting'"/>
            <Resources v-else-if="side_menu==='resources'"/>
          </t-col>
        </t-row>
      </t-layout>
    </t-content>
    <t-footer style="z-index:3;background-color:#fdfdfd">
      Copyright @ 2021-{{ new Date().getFullYear() }} StevenKerman.
    </t-footer>
  </t-layout>
</template>

<script>
import Header from "@/components/Header";
import {Icon} from 'tdesign-icons-vue';
import MainDashBoard from "@/components/DashBoardView/MainDashBoard";
import UserOperation from "@/components/DashBoardView/UserOperation";
import SignUpSetting from "@/components/DashBoardView/SignUpSetting";
import Resources from "@/components/DashBoardView/Resources";

export default {
  name: "DashBoardView",
  components: {
    Resources,
    SignUpSetting,
    UserOperation,
    MainDashBoard,
    Header,
    Icon
  },
  data() {
    return {
      collapsed: false,
      init: false,
      side_menu: "dashboard",
    }
  },
  methods: {
    menuChange: function (e) {
      this.side_menu = e;
    },
    col: function (e) {
      this.collapsed = e.matches;
    },
  },
  mounted() {
    window.matchMedia("(max-width: 890px)").addEventListener('change', this.col);
  },
  beforeDestroy() {
    window.matchMedia("(max-width: 890px)").removeEventListener('change', this.col);
  }
}
</script>

<style>
@media screen and (max-width: 460px) {
  .inner_padding {
    padding: 10px 0 0 0 !important;
  }
}

@media screen and (min-width: 460px) {
  .inner_padding {
    padding: 20px 30px 0 30px !important;
  }
}

</style>
