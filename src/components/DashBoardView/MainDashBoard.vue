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
                            background: var(--td-success-color-5);"></i>
                  开放报名
                </span>
            </t-col>
            <t-col v-else flex="1 0 100px">
                  <span class="inProgress" style="color:var(--td-error-color-6)">
                  <i style="display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: var(--td-error-color-6);"></i>
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
      <template #actions>
        <t-button theme="primary" variant="outline" @click="exportData">
          <Icon name="download" style="margin-top:-3px;"/>
          数据导出
        </t-button>
      </template>
      <t-table
          @page-change="tableChange"
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
            <t-button theme="primary" variant="text" @click="showDetail(slotProps)">详情</t-button>
          </t-row>
        </template>
      </t-table>
    </t-card>
    <t-dialog
        :visible.sync="showDia"
        header="用户详情"
        placement="center"
        style="transition: all .25s ease-in-out"
    >
      <template #body>
        <t-form ref="detailForm" :data="userDetailInfoEdit" :onSubmit="submitChange" colon style="min-width: 270px;">
          <t-row>
            <t-col>
              <t-row>
                <t-form-item :rules="requiredRules" label="用户名" name="username">
                  <span v-if="!edit">{{ userDetailInfo.username }}</span>
                  <t-input v-else v-model="userDetailInfoEdit.username" placeholder="请输入内容"></t-input>
                </t-form-item>
              </t-row>
              <t-row style="margin-top:20px;">
                <t-form-item :rules="requiredRules" label="姓名" name="realName">
                  <span v-if="!edit">{{ userDetailInfo.realName }}</span>
                  <t-input v-else v-model="userDetailInfoEdit.realName" placeholder="请输入内容"></t-input>
                </t-form-item>
              </t-row>
            </t-col>
            <t-col>
              <t-row style="margin-top:20px;">
                <t-form-item :rules="requiredRules" label="学号" name="sid">
                  <span v-if="!edit">{{ userDetailInfo.sid }}</span>
                  <t-input v-else v-model="userDetailInfoEdit.sid" placeholder="请输入内容"></t-input>
                </t-form-item>
              </t-row>
              <t-row style="margin-top:20px;">
                <t-form-item :rules="requiredRules" label="学考号" name="eid">
                  <span v-if="!edit">{{ userDetailInfo.eid }}</span>
                  <t-input v-else v-model="userDetailInfoEdit.eid" placeholder="请输入内容"></t-input>
                </t-form-item>
              </t-row>
            </t-col>
          </t-row>
          <t-row style="margin-top:20px;">
            <t-form-item v-if="!edit" label="角色" name="role">
              <t-radio-group :value="userDetailInfo.isAdmin">
                <t-radio :value="true">管理员</t-radio>
                <t-radio :value="false">学生</t-radio>
              </t-radio-group>
            </t-form-item>
            <t-form-item v-else label="新密码" name="password">
              <t-input v-model="userDetailInfoEdit.password" placeholder="请输入内容"></t-input>
            </t-form-item>
            <t-form-item label="已报名考试" name="role">
              <t-checkbox-group v-if="!edit" :value="userDetailInfo.subject">
                <t-checkbox value="tech">信息技术</t-checkbox>
                <t-checkbox value="phy">通用技术</t-checkbox>
              </t-checkbox-group>
              <t-checkbox-group v-else v-model="userDetailInfoEdit.subject">
                <t-checkbox value="tech">信息技术</t-checkbox>
                <t-checkbox value="phy">通用技术</t-checkbox>
              </t-checkbox-group>
            </t-form-item>
            <t-form-item label="已通过考试" name="role">
              <t-checkbox-group v-if="!edit" :value="userDetailInfo.passed">
                <t-checkbox value="tech">信息技术</t-checkbox>
                <t-checkbox value="phy">通用技术</t-checkbox>
              </t-checkbox-group>
              <t-checkbox-group v-else v-model="userDetailInfoEdit.passed">
                <t-checkbox value="tech">信息技术</t-checkbox>
                <t-checkbox value="phy">通用技术</t-checkbox>
              </t-checkbox-group>
            </t-form-item>
            <t-row>
              <t-form-item label="最高学分" name="maxCredit">
                <span v-if="!edit" style="width:150px;">{{ userDetailInfo.maxCredit }}</span>
                <t-input-number v-else v-model="userDetailInfoEdit.maxCredit"/>
              </t-form-item>
            </t-row>
            <t-row style="flex:1 0 100%;margin-top:20px;">
              <t-form-item label="进度" name="maxCredit">
                <div v-if="!edit">
                <span v-if="userDetailInfo.step===2" class="inProgress" style="color:var(--td-success-color-5)">
                  <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-success-color-5);"/>已完成
                </span>
                  <span v-else-if="userDetailInfo.step===1" class="inProgress"
                        style="color:var(--td-brand-color-7)">
                  <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-brand-color-7);"/>进行中
                </span>
                  <span v-else class="inProgress" style="color:var(--td-error-color-6)">
                  <i style="display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: var(--td-error-color-6);"/>未开始
                </span>
                </div>
                <t-select v-else v-model="userDetailInfoEdit.step">
                  <t-option key="0" :value="0" label="未开始"/>
                  <t-option key="1" :value="1" label="进行中"/>
                  <t-option key="2" :value="2" label="已完成"/>
                </t-select>
              </t-form-item>
            </t-row>
          </t-row>
        </t-form>
      </template>
      <template #footer>
        <t-button v-if="!edit" theme="danger" variant="base" @click="removeUserSingle(userDetailInfo.id)">删除</t-button>
        <t-button v-else variant="outline" @click="edit=false">取消</t-button>
        <t-button v-if="!edit" theme="primary" variant="outline" @click="edit=true">编辑</t-button>
        <t-button v-else theme="primary" variant="base" @click="submitChange">提交</t-button>
      </template>
    </t-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {Icon} from "tdesign-icons-vue";
import ResponseCodeService from "@/service/ResponseCodeService";

export default {
  name: "MainDashBoard",
  components: {Icon},
  data() {
    return {
      hello_title: () => <span style="font-size:20px;font-weight:500">欢迎您 {this.$store.getters.username}</span>,
      user_title: () => <span style="font-size:20px;font-weight:500">用户列表</span>,
      status: null,
      sign_num: 0,
      sort: [],
      users: [],
      userDetailInfo: {
        id: -1,
        username: "123",
        realName: "13",
        subject: ["tech"],
        isAdmin: false,
        sid: "131",
        eid: "31",
        maxCredit: 0,
        passed: [],
        step: null,
      },
      userDetailInfoEdit: {
        id: -1,
        username: "123",
        realName: "13",
        subject: ["tech"],
        isAdmin: false,
        sid: "131",
        eid: "31",
        maxCredit: 0,
        passed: [],
        password: "",
        step: null,
      },
      edit: false,
      showDia: false,
      requiredRules: [{required: true, message: '必填'}],
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
        current: 1,
        pageSize: 5,
        showJumper: true,
      },
      filterValue: {},
    }
  },
  methods: {
    exportData: async function () {
      await axios.get('/SignUpExport', {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token
        },
        responseType: 'blob'
      }).then((res) => {
        console.log(res);
        let filename = res.headers['content-disposition'].split("=")[1];
        filename = filename.substring(1, filename.length - 1);
        let fileReader = new FileReader();
        fileReader.readAsDataURL(res.data);
        fileReader.onload = (e) => {
          let a = document.createElement('a');
          a.download = filename;
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }).catch((e) => console.error(e));
    },
    submitChange: async function () {
      if (await this.$refs.detailForm.validate() !== true) return;
      let accountDTO = {
        eid: this.userDetailInfoEdit.eid,
        id: this.userDetailInfoEdit.id,
        is_phy: this.userDetailInfoEdit.subject.includes("phy"),
        is_tech: this.userDetailInfoEdit.subject.includes("tech"),
        maxCredit: this.userDetailInfoEdit.maxCredit,
        password: this.userDetailInfoEdit.password,
        realName: this.userDetailInfoEdit.realName,
        sid: this.userDetailInfoEdit.sid,
        step: this.userDetailInfoEdit.step,
        userForbidden: this.userDetailInfoEdit.passed.length !== 0 ? {
          id: 0,
          tech: this.userDetailInfoEdit.passed.includes('tech'),
          phy: this.userDetailInfoEdit.passed.includes('phy'),
        } : null,
        username: this.userDetailInfoEdit.username,
      }
      await axios.post('/modifyUser', accountDTO, {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === -1) return;
        this.$message.success("修改完成");
        this.showDia = false;
        this.edit = false;
      }).catch((e) => console.error(e));
      this.flush_data();
    },
    tableChange: function (pageInfo) {
      this.page_settings.current = pageInfo.current;
      this.page_settings.pageSize = pageInfo.pageSize;
    },
    showDetail: function ({row}) {
      this.edit = false;
      let subject = [];
      if (row.is_tech) subject.push('tech');
      if (row.is_phy) subject.push('phy');
      let passed = [];
      if (row.userForbidden != null) {
        if (row.userForbidden.tech) passed.push('tech');
        if (row.userForbidden.phy) passed.push('phy');
      }
      const data = {
        id: row.id,
        username: row.username,
        realName: row.realName,
        subject: subject,
        isAdmin: row._admin,
        sid: row.sid,
        eid: row.eid,
        maxCredit: row.maxCredit,
        passed: passed,
        password: "",
        step: row.step,
      };
      this.userDetailInfo = JSON.parse(JSON.stringify(data));
      this.userDetailInfoEdit = JSON.parse(JSON.stringify(data));
      this.showDia = true;
    },
    removeUserSingle: async function (id) {
      const confirmDia = this.$dialog.confirm({
        header: '确认',
        body: '你确定要删除该项么？',
        confirmBtn: '确定',
        cancelBtn: '取消',
        onConfirm: async () => {
          await axios.post('/removeSingleUser', {
            id: id,
          }, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.token,
            }
          }).then((res) => {
            let data = ResponseCodeService.parse(this, res);
            if (data === -1) return;
            this.$message.success("删除成功")
            this.page_settings.current = 1;
            this.showDia = false;
          }).catch((e) => {
            this.$message.error("删除失败");
            console.error(e)
          });
          this.flush_data();
          confirmDia.destroy();
        },
        onClose: ({e, trigger}) => {
          console.log('e: ', e);
          console.log('trigger: ', trigger);
          confirmDia.hide();
        },
      });
    },
    flush_data: function () {
      axios.get('/info/num', {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === -1) return;
        this.sign_num = data;
      }).catch((e) => console.error(e));
      axios.get('/getAllUser', {
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        }
      }).then((res) => {
        let data = ResponseCodeService.parse(this, res);
        if (data === -1) return;
        this.users = data;
        this.page_settings.total = data.length;
        this.page_settings.current = 1;
      }).catch((e) => console.error(e));
    },
    onFilterChange: function (filters) {
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
    this.flush_data();
  }
}
</script>

<style lang="less">
</style>
