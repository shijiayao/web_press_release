<template>
  <section class="remark-manage-wrap">
    <section class="head-box">
      <el-input v-model="headForm.nickname" placeholder="用户昵称关键词" clearable></el-input>
      <el-input v-model="headForm.keyword" placeholder="评论中内容关键词" clearable></el-input>
      <el-button type="primary" @click="headSearchButton">搜索</el-button>
      <el-button type="warning" @click="headResetButton">重置搜索条件</el-button>
    </section>

    <section class="table-box">
      <el-table size="default" :data="tableData" border style="width: 100%" empty-text="没有数据" @cell-click="tableCellClick">
        <el-table-column header-align="center" align="center" label="#" width="60">
          <template #default="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="user_name" label="发表评论用户昵称" width="180"></el-table-column>
        <el-table-column header-align="center" align="center" prop="reply_user_name" label="被回复的用户昵称" width="180"></el-table-column>
        <el-table-column header-align="center" align="left" prop="content" label="内容"></el-table-column>
        <el-table-column header-align="center" align="center" prop="edit_time" label="上次修改时间" width="170">
          <template #default="scope">{{ formatDate(scope.row.edit_time) }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="create_time" label="评论时间" width="170">
          <template #default="scope">{{ formatDate(scope.row.create_time) }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" @click="rowEditButton(scope)">编辑</el-button>
            <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="red" :title="'确定要删除【' + scope.row.user_name + '】发布的评论吗?'" @confirm="rowDeleteButton(scope.row)">
              <template #reference>
                <el-button type="warning">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <el-dialog v-model="editDialogVisible" :close-on-click-modal="false" :destroy-on-close="true" custom-class="edit-dialog">
      <el-form label-width="80px" :model="tableRowData">
        <section class="title">
          <span class="name">{{ tableRowData.user_name }}</span>
          <span class="text" v-if="tableRowData.reply_user_name" style="margin-right: 5px">回复</span>
          <span class="name" v-if="tableRowData.reply_user_name">{{ tableRowData.reply_user_name }}</span>
          <span class="text" v-if="!tableRowData.reply_user_name">发布</span>
          <span class="text">的评论</span>
        </section>

        <el-form-item label="内容:">
          <el-input v-model="tableRowData.content" :rows="10" type="textarea" placeholder="请输入公告信息内容"></el-input>
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
import { ElMessage } from 'element-plus';
import { formatTargetDate } from '@/tools/tools.js';
import { remarkList as getTableDataApi, editRemark as editTableRowApi } from '@/api/api.js';

export default {
  name: 'remark-manage',
  components: {},
  props: {},
  data() {
    return {
      headForm: { nickname: '', keyword: '' },
      tableData: [],
      tableRowData: {},
      dialogMode: '',
      editDialogVisible: false
    };
  },
  watch: {},
  computed: {},
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
    // 用户组
    userLevel(row) {
      let result = '所有用户';

      if (row.level < 1000) {
        result = '管理员';
      }

      return result;
    },
    // 序列化时间
    formatDate(date) {
      let targetTimeObject = formatTargetDate(date);
      return `${targetTimeObject.YY}-${targetTimeObject.MM}-${targetTimeObject.DD} ${targetTimeObject.HH}:${targetTimeObject.mm}:${targetTimeObject.ss}`;
    },
    // 头部搜索按钮
    headSearchButton() {
      this.getTableData();
    },
    // 头部重置按钮
    headResetButton() {
      this.headForm = { nickname: '', keyword: '' };
    },
    // 表格-单元格点击
    tableCellClick(row, column) {
      if (column.property === 'title' || column.property === 'content') {
        this.tableRowDetailData = { title: row.title, content: row.content };
        this.detailDialogVisible = true;
      }
    },
    // 表格-行-操作-编辑
    rowEditButton(scope) {
      this.tableRowData = { index: scope.$index, ...scope.row };
      this.dialogMode = 'edit';
      this.editDialogVisible = true;
    },
    // 表格-行-操作-删除
    rowDeleteButton(row) {
      const _this = this;

      editTableRowApi({ op_type: 0, id: row.id }).then((response) => {
        const { code, message } = response.data;

        if (code === 200) {
          ElMessage.success(message);
          _this.getTableData();
        } else {
          ElMessage.error(message);
        }
      });
    },
    // Dialog-编辑
    editDialogButton() {
      const _this = this;
      const { index, id, content } = _this.tableRowData;
      let postData = {
        op_type: 1,
        id: id
      };

      if (!content) {
        ElMessage.error('评论内容不能为空');

        return;
      } else if (content !== _this.tableData[index].content) {
        postData.content = content;
      }

      if (Object.keys(postData).length > 2) {
        editTableRowApi(postData).then((response) => {
          const { code, message } = response.data;

          if (code === 200) {
            ElMessage.success(message);
            _this.getTableData();
            _this.editDialogVisible = false;
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
.remark-manage-wrap {
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
  }

  :deep {
    .edit-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
      width: 1200px;

      .el-dialog__body {
        .el-form {
          .el-form-item:last-of-type {
            margin-bottom: 0;
          }

          .title {
            margin-bottom: 20px;
            padding-left: 80px;
            font-size: 20px;

            .name {
              margin-right: 5px;
              color: #222;
              font-weight: bold;
            }

            .text {
              color: #999;
            }
          }
        }
      }
    }

    .show-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
      width: 1200px;

      .el-dialog__body {
        .title {
          padding: 5px 0 10px;
          font-size: 20px;
          text-align: center;
        }

        .detail-wrap {
          max-height: 500px;
          overflow-y: auto;

          .detail-content {
            font-size: 0;

            p {
              margin-bottom: 10px;
              font-size: 16px;
              line-height: 1.5;
              text-indent: 2em;

              &:last-of-type {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
