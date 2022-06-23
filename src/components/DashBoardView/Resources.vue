<template>
  <t-row :gutter="[16, 16]">
    <t-col flex="0 0 300px" style="width:300px;margin:10px;">
      <t-card theme="poster2">
        <template #avatar>
          <t-avatar size="56px">
            <template #icon>
              <Icon name="usergroup-add"/>
            </template>
          </t-avatar>
        </template>
        <template #status>
          <t-button theme="primary" variant="outline" @click="download('/ImportModule')">下载</t-button>
        </template>
        <template #content>
          <p class="list-card-item_detail--name">批量导入模板</p>
          <p style="height:100px;overflow:hidden;">
            <span class="list-card-item_detail--desc">模板用于对学生进行批量导入</span><br/>
            <span class="list-card-item_detail--desc">1. 用户名作为唯一标识符，不可重复</span><br/>
            <span class="list-card-item_detail--desc">2. 学号作为删除索引，不可重复</span><br/>
            <span class="list-card-item_detail--desc">3. 相同学生会选取最高技术学分储存</span><br/>
          </p>
        </template>
      </t-card>
    </t-col>
    <t-col flex="0 0 300px" style="width:300px;margin:10px;">
      <t-card theme="poster2">
        <template #avatar>
          <t-avatar size="56px" style="background:var(--td-error-color-focus);color:var(--td-error-color-6)">
            <template #icon>
              <Icon name="usergroup-clear"/>
            </template>
          </t-avatar>
        </template>
        <template #status>
          <t-button theme="danger" variant="outline" @click="download('/RemoveModule')">下载</t-button>
        </template>
        <template #content>
          <p class="list-card-item_detail--name">批量删除模板</p>
          <p style="height:100px;overflow:hidden;">
            <span class="list-card-item_detail--desc">模板用于对学生进行批量删除</span><br/>
            <span class="list-card-item_detail--desc">1. 删除使用学号作为索引</span><br/>
            <span class="list-card-item_detail--desc">2. 请确保删除学生账户数据存在</span><br/>
          </p>
        </template>
      </t-card>
    </t-col>
    <t-col flex="0 0 300px" style="width:300px;margin:10px;">
      <t-card theme="poster2">
        <template #avatar>
          <t-avatar size="56px" style="background:var(--td-warning-color-focus);color:var(--td-warning-color-6)">
            <template #icon>
              <Icon name="history"/>
            </template>
          </t-avatar>
        </template>
        <template #status>
          <t-button theme="warning" variant="outline" @click="download('/forbiddenModule')">下载</t-button>
        </template>
        <template #content>
          <p class="list-card-item_detail--name">禁止报名导入模板</p>
          <p style="height:100px;overflow:hidden;">
            <span class="list-card-item_detail--desc">此模板用于导入学生考试历史</span><br/>
            <span class="list-card-item_detail--desc">1. 使用学号作为索引，请勿重复</span><br/>
            <span class="list-card-item_detail--desc">2. 已通过请填 1，未通过请填 0</span><br/>
          </p>
        </template>
      </t-card>
    </t-col>
  </t-row>
</template>

<script>
import {Icon} from "tdesign-icons-vue";
import axios from "axios";

export default {
  name: "Resources",
  components: {Icon},
  methods: {
    download: function (path) {
      path = axios.defaults.baseURL + "/file" + path;
      window.open(path, "__blank");
    }
  }
}
</script>

<style lang="less" scoped>
.list-card-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &_detail {
    min-height: 140px;

    &--name {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 400;
      color: var(--td-text-color-primary);
    }

    &--desc {
      color: var(--td-text-color-secondary);
      font-size: 12px;
      line-height: 25px;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
