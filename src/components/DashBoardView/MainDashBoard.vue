<template>
  <div>
    <t-card :title="hello_title" style="max-height:100%">
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
    </t-card>
    <t-card :title="user_title" style="margin:20px 0;overflow-x:auto">
      <t-table
          :columns="user_column"
          :data="users" :filter-value="filterValue" :pagination="page_settings" :sort="sort"
          filter="multiple" rowKey="id"
          style="min-width:550px;" @filter-change="onFilterChange" @sort-change="sortChange">
        <template #_admin="{ row }">
          <t-tag v-if="row._admin" theme="warning">管理员</t-tag>
          <t-tag v-else theme="success">学生</t-tag>
        </template>
        <template #is_tech="{ row }">
          <span v-if="row.is_tech" class="inProgress" style="color:var(--td-success-color-5)">
              <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-success-color-5);"/>
                已报名
          </span>
          <span v-else class="inProgress" style="color:var(--td-error-color-6)">
            <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-error-color-6);"/>
              未报名
          </span>
        </template>
        <template #is_phy="{ row }">
          <span v-if="row.is_phy" class="inProgress" style="color:var(--td-success-color-5)">
              <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-success-color-5);"/>
                已报名
          </span>
          <span v-else class="inProgress" style="color:var(--td-error-color-6)">
            <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-error-color-6);"/>
              未报名
          </span>
        </template>
        <template #step="{ row }">
          <span v-if="row.step===2" class="inProgress" style="color:var(--td-success-color-5)">
              <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-success-color-5);"/>
                已完成
          </span>
          <span v-else-if="row.step===1" class="inProgress" style="color:var(--td-brand-color-7)">
            <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-brand-color-7);"/>
              进行中
          </span>
          <span v-else class="inProgress" style="color:var(--td-error-color-6)">
            <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-error-color-6);"/>
              未开始
          </span>
        </template>
        <template #operation="slotProps">
          <t-row>
            <t-button theme="primary" variant="text">详情</t-button>
          </t-row>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script>
import axios from "axios";
import ResponseCodeService from "@/service/ResponseCodeService";

export default {
  name: "MainDashBoard",
  data() {
    return {
      hello_title: () => <span style="font-size:20px;font-weight:500">欢迎您 {this.$store.getters.username}</span>,
      user_title: () => <span style="font-size:20px;font-weight:500">用户列表</span>,
      status: null,
      sign_num: 0,
      sort: [],
      users: [],
      user_column: [
        {colKey: 'id', title: "ID", width: 90, sorter: (a, b) => a.id - b.id,},
        {colKey: 'username', title: "用户名", width: 110},
        {colKey: 'realName', title: "姓名", width: 90},
        {colKey: '_admin', title: "角色", width: 90,},
        {colKey: 'is_tech', title: "信息技术", width: 110},
        {colKey: 'is_phy', title: "通用技术", width: 110},
        {
          colKey: 'sid',
          title: "学号",
          width: 110,
          filter: {
            type: "input",
            confirmEvents: ['onEnter'],
            props: {placeholder: '输入关键词过滤', clearable: true,},
            showConfirmAndReset: true,
          }
        },
        {
          colKey: 'eid', title: "学考号", width: 140, filter: {
            type: "input",
            confirmEvents: ['onEnter'],
            props: {placeholder: '输入关键词过滤', clearable: true,},
            showConfirmAndReset: true,
          }
        },
        {colKey: 'maxCredit', title: "最高学分", width: 110},
        {
          colKey: 'step', title: "进度", width: 130, sorter: (a, b) => a.step - b.step,
          filter: {
            type: 'multiple',
            showConfirmAndReset: true,
            list: [
              {label: '已完成', value: 2},
              {label: '进行中', value: 1},
              {label: '未开始', value: 0},
            ],
          },
        },
        {colKey: 'operation', title: '操作', width: 80, cell: 'operation', fixed: 'right'},
      ],
      page_settings: {
        defaultCurrent: 1,
        defaultPageSize: 5,

        showJumper: true,
      },
      filterValue: {},
    }
  },
  methods: {
    onFilterChange(filters) {
      this.filterValue = filters;
      this.request(this.filterValue);
    },
    sortChange(sort, option) {
      this.sort = sort;
      this.users = option.currentDataSource;
    },
    request(filters) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.users = this.users.filter((item) => {
          let result = true;
          if (filters.sid) {
            result = item.sid.indexOf(filters.sid) !== -1;
          }
          if (result && filters.eid) {
            result = item.eid.indexOf(filters.eid) !== -1;
          }
          if (result && filters.step && filters.step.length) {
            result = filters.step.includes(item.step);
          }
          return result;
        });
        this.page_settings.total = this.users.length;
      }, 100);
    },
  },
  async mounted() {
    axios.get('/info/status').then((res) => {
      let data = ResponseCodeService.parse(this, res);
      if (data === -1) return;
      this.status = data;
    }).catch((e) => console.error(e))
    axios.get('/info/num', {
      headers: {
        Authorization: "Bearer " + this.$store.getters.token,
      }
    }).then((res) => {
      let data = ResponseCodeService.parse(this, res);
      if (data === -1) return;
      this.sign_num = data;
    }).catch((e) => console.error(e))
    axios.get('/getAllUser', {
      headers: {
        Authorization: "Bearer " + this.$store.getters.token,
      }
    }).then((res) => {
      let data = ResponseCodeService.parse(this, res);
      if (data === -1) return;
      this.users = data;
      this.page_settings.total = data.length;
    }).catch((e) => console.error(e))
  }
}
</script>

<style scoped>

</style>
