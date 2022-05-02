<template>
  <section class="user-manage-wrap">
    <section class="head-box">
      <el-input v-model="headForm.name" placeholder="账号/昵称/邮箱/手机号/姓名" clearable></el-input>
      <p class="label-text">用户组</p>
      <el-select v-model="headForm.userGroup">
        <el-option v-for="item in userGroup" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <p class="label-text">用户状态</p>
      <el-select v-model="headForm.userStatus">
        <el-option v-for="item in userStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="headSearchButton">搜索</el-button>
      <el-button type="warning" @click="headResetButton">重置搜索条件</el-button>
      <el-button type="success" @click="headAddButton">新增用户</el-button>
    </section>

    <section class="table-box">
      <el-table size="default" :data="tableData" border style="width: 100%" empty-text="没有数据">
        <el-table-column header-align="center" align="center" label="#" width="60">
          <template #default="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="level" label="用户组" width="100">
          <template #default="scope">{{ userLevel(scope.row) }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="username" label="账号" width="180"></el-table-column>
        <el-table-column header-align="center" align="left" prop="nickname" label="昵称" width="180"></el-table-column>
        <el-table-column header-align="center" align="right" prop="email" label="邮箱" width="280"></el-table-column>
        <el-table-column header-align="center" align="center" prop="mobile" label="手机号码" width="120"></el-table-column>
        <el-table-column header-align="center" align="left" prop="fullname" label="姓名" width="180"></el-table-column>
        <el-table-column header-align="center" align="center" prop="gender" label="性别" width="60">
          <template #default="scope">{{ userGender(scope.row) }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="status" label="状态" width="60">
          <template #default="scope">
            <span v-if="scope.row.status === 1" class="success">正常</span>
            <span v-if="scope.row.status === 2" class="warning">禁用</span>
            <span v-if="scope.row.status === 3" class="danger">删除</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template #default="scope">
            <section v-if="scope.row.user_id !== 1">
              <el-button type="primary" @click="rowEditButton(scope)">编辑用户</el-button>
              <el-button type="success" @click="rowResumeButton(scope.row)" v-if="scope.row.status !== 1">恢复用户</el-button>
              <el-button type="warning" @click="rowDisableButton(scope.row)" v-if="scope.row.status === 1">禁用用户</el-button>
              <el-button type="danger" @click="rowDeleteButton(scope.row)" v-if="scope.row.status === 1">删除用户</el-button>
            </section>
            <section v-else>超级管理员账户不能被操作</section>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <el-dialog v-model="editDialogVisible" :close-on-click-modal="false" :destroy-on-close="true" custom-class="edit-dialog">
      <el-form label-width="80px" :model="tableRowData">
        <el-form-item label="用户组:">
          <el-select v-model="tableRowData.level">
            <el-option label="管理员" :value="10"></el-option>
            <el-option label="普通用户" :value="1000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="tableRowData.username" placeholder="请输入账号" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="tableRowData.password" type="password" placeholder="请输入登录密码" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input v-model="tableRowData.nickname" placeholder="请输入昵称，最多可以输入20个字符" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="email:">
          <el-input v-model="tableRowData.email" placeholder="请输入邮箱，例：example@xxx.xx" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="tableRowData.mobile" placeholder="请输入手机号，例：13812345678" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="tableRowData.fullname" placeholder="请输入姓名" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="tableRowData.gender">
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addDialogButton" v-if="dialogMode === 'add'">新增</el-button>
          <el-button type="primary" @click="editDialogButton" v-else>修改</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElMessage } from 'element-plus';
import { addUser as addTableRowApi, userList as getTableDataApi, editUser as editTableRowApi } from '@/api/api.js';

export default {
  name: 'user-manage',
  components: {},
  props: {},
  data() {
    return {
      headForm: { name: '', userGroup: 0, userStatus: 0 },
      tableData: [],
      tableRowData: {},
      dialogMode: '',
      editDialogVisible: false,
      userGroup: [
        { label: '全部', value: 0 },
        { label: '管理员', value: 10 },
        { label: '普通用户', value: 1000 }
      ],
      userStatus: [
        { label: '全部', value: 0 },
        { label: '正常', value: 1 },
        { label: '禁用', value: 2 },
        { label: '删除', value: 3 }
      ]
    };
  },
  watch: {},
  computed: { ...mapGetters(['isLogin', 'userInfo']) },
  beforeCreate() {
    /**
     * 在实例初始化之后，进行数据侦听和事件/侦听器的配置之前同步调用。
     */
  },
  created() {
    /**
     * 在实例创建完成后被立即同步调用。
     * 在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。
     * 然而，挂载阶段还没开始，且 el property 目前尚不可用。
     */
    this.getTableData();
  },
  beforeMount() {
    /**
     * 在挂载开始之前被调用：相关的 render 函数首次被调用。
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  mounted() {
    /**
     * 在实例挂载完成后被调用，这时候传递给 app.mount 的元素已经被新创建的 vm.el 替换了。
     * 如果根实例被挂载到了一个文档内的元素上，当 mounted 被调用时， vm.el 也会在文档内。
     * 注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等待整个视图都渲染完毕，可以在 mounted 内部使用 vm.nextTick
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  beforeUpdate() {
    /**
     * 在数据发生改变后，DOM 被更新之前被调用。
     * 这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。
     * 该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。
     */
  },
  updated() {
    /**
     * 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
     * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或侦听器取而代之。
     * 注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等待整个视图都渲染完毕，可以在 updated 内部使用 vm.nextTick
     */
  },
  beforeUnmount() {
    /**
     * 实例销毁之前调用。在这一步，实例仍然完全可用。
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  unmounted() {
    /**
     * 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
     * 该钩子在服务器端渲染期间不被调用。
     */
  },
  methods: {
    // 获取表格数据
    getTableData() {
      const _this = this;

      getTableDataApi(_this.headForm).then((response) => {
        const { code, data, message } = response.data;

        if (code === 200) {
          _this.tableData = data;
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 编辑用户 api
    editUserPost(data) {
      const _this = this;

      editTableRowApi(data).then((response) => {
        const { code, message } = response.data;

        if (code === 200) {
          ElMessage.success(message);
          _this.editDialogVisible = false;
          _this.getTableData();
        } else {
          ElMessage.error(message);
        }
      });
    },
    // 用户组
    userLevel(row) {
      let result = '游客';

      if (row.level === 1) {
        result = '超级管理员';
      } else if (row.level < 1000) {
        result = '管理员';
      } else if (row.level < 10000) {
        result = '普通用户';
      } else {
        result = '游客';
      }

      return result;
    },
    // 用户性别
    userGender(row) {
      return row.gender === 1 ? '男' : '女';
    },
    // 头部搜索按钮
    headSearchButton() {
      this.getTableData();
    },
    // 头部重置按钮
    headResetButton() {
      this.headForm = { name: '', userGroup: 0, userStatus: 0 };
    },
    // 头部新增按钮
    headAddButton() {
      this.tableRowData = { level: 1000, username: '', nickname: '', email: '', mobile: '', fullname: '', gender: 1 };
      this.dialogMode = 'add';
      this.editDialogVisible = true;
    },
    // 表格-行-操作-编辑
    rowEditButton(scope) {
      this.tableRowData = { index: scope.$index, ...scope.row };
      this.dialogMode = 'edit';
      this.editDialogVisible = true;
    },
    // 表格-行-操作-恢复
    rowResumeButton(row) {
      this.editUserPost({ op_type: 1, user_id: row.user_id });
    },
    // 表格-行-操作-禁用
    rowDisableButton(row) {
      this.editUserPost({ op_type: 2, user_id: row.user_id });
    },
    // 表格-行-操作-删除
    rowDeleteButton(row) {
      this.editUserPost({ op_type: 3, user_id: row.user_id });
    },
    // Dialog-新增
    addDialogButton() {
      const _this = this;
      const { username, password, nickname, email, mobile, fullname, level, gender } = _this.tableRowData;

      if (!level) {
        ElMessage.error('请选择用户组');

        return;
      }

      if (!username) {
        ElMessage.error('账号不能为空');

        return;
      }

      if (!password) {
        ElMessage.error('密码不能为空');
      }

      if (!nickname) {
        ElMessage.error('昵称不能为空');

        return;
      }

      if (!email) {
        ElMessage.error('邮箱不能为空');

        return;
      }

      if (!mobile) {
        ElMessage.error('手机不能为空号码');

        return;
      }

      if (!fullname) {
        ElMessage.error('姓名不能为空');

        return;
      }

      if (Number(gender) !== 0 && Number(gender) !== 1) {
        ElMessage.error('请选择用户性别');

        return;
      }

      addTableRowApi(_this.tableRowData).then((response) => {
        const { code, message } = response.data;

        if (code === 200) {
          ElMessage.success(message);
          _this.getTableData();
          _this.editDialogVisible = false;
        } else {
          ElMessage.error(message);
        }
      });
    },
    // Dialog-编辑
    editDialogButton() {
      const _this = this;
      const { index, user_id, username, nickname, email, mobile, fullname, level, gender } = _this.tableRowData;
      let postData = {
        op_type: 0,
        user_id: user_id
      };

      if (!username) {
        ElMessage.error('账号不能为空');

        return;
      } else if (username !== _this.tableData[index].username) {
        postData.username = username;
      }

      if (!nickname) {
        ElMessage.error('昵称不能为空');

        return;
      } else if (nickname !== _this.tableData[index].nickname) {
        postData.nickname = nickname;
      }

      if (!email) {
        ElMessage.error('邮箱不能为空');

        return;
      } else if (email !== _this.tableData[index].email) {
        postData.email = email;
      }

      if (!mobile) {
        ElMessage.error('手机不能为空号码');

        return;
      } else if (mobile !== _this.tableData[index].mobile) {
        postData.mobile = mobile;
      }

      if (!fullname) {
        ElMessage.error('姓名不能为空');

        return;
      } else if (fullname !== _this.tableData[index].fullname) {
        postData.fullname = fullname;
      }

      // 用户组
      if (level !== _this.tableData[index].level) {
        postData.level = level;
      }

      // 性别
      if (gender !== _this.tableData[index].gender) {
        postData.gender = gender;
      }

      // 密码
      if (_this.tableRowData.password) {
        postData.password = _this.tableRowData.password;
      }

      if (Object.keys(postData).length > 2) {
        this.editUserPost(postData).then((response) => {
          const { code, message } = response.data;

          if (code === 200) {
            ElMessage.success(message);
            _this.getTableData();
          } else {
            ElMessage.error(message);
          }
        });
      } else {
        ElMessage.warning('什么都没有更改！');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-manage-wrap {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;

  .head-box {
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 2px solid #e4e7ed;

    .el-input,
    .el-select {
      margin-right: 12px;
      width: 200px;
    }

    .label-text {
      display: inline-block;
      margin-right: 10px;
      font-size: 14px;
      line-height: 40px;
      color: #606266;
    }

    .el-button:last-of-type {
      float: right;
    }
  }

  .table-box {
    .danger {
      color: #f56c6c;
    }

    .success {
      color: #67c23a;
    }

    .warning {
      color: #e6a23c;
    }
  }

  :deep {
    .edit-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
      width: 500px;

      .el-dialog__body {
        .el-form {
          .el-form-item:last-of-type {
            margin-bottom: 0;
          }

          .el-select {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
