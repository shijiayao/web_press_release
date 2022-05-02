<template>
  <section class="friend-links-wrap">
    <section class="head-box">
      <el-input v-model="headForm.name" placeholder="名称" clearable></el-input>
      <el-button type="primary" @click="headSearchButton">搜索</el-button>
      <el-button type="success" @click="headAddButton">新增友情链接</el-button>
    </section>

    <section class="table-box">
      <el-table size="default" :data="tableData" border style="width: 100%" empty-text="没有数据">
        <el-table-column header-align="center" align="center" label="#" width="60">
          <template #default="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="name" label="名称"></el-table-column>
        <el-table-column header-align="center" align="left" prop="link" label="链接"></el-table-column>
        <el-table-column header-align="center" align="center" prop="image" label="图片" width="200">
          <template #default="scope">
            <img :src="scope.row.image" alt="" class="row-image" />
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" @click="rowEditButton(scope)">编辑</el-button>
            <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="red" :title="'确定要删除【' + scope.row.name + '】吗?'" @confirm="rowDeleteButton(scope.row)">
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
        <el-form-item label="名称:">
          <el-input v-model="tableRowData.name" placeholder="请输入友情链接名称"></el-input>
        </el-form-item>
        <el-form-item label="网址:">
          <el-input v-model="tableRowData.link" placeholder="请输入友情链接网址"></el-input>
        </el-form-item>
        <el-form-item label="图片:" class="upload-image">
          <el-upload class="avatar-uploader" :action="uploadImageUrl" :headers="uploadImageHeaders" name="friend-links" :show-file-list="false" list-type="picture" :on-success="imageUploadSuccess" :before-upload="imageUploadBefore">
            <img v-if="tableRowData.image" :src="tableRowData.image" class="image" />
            <el-icon v-else class="avatar-uploader-icon"><Plus></Plus></el-icon>
          </el-upload>
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
import MD5 from 'js-md5';
import { mapGetters } from 'vuex';
import { ElMessage } from 'element-plus';
import { addFriendLinks as addTableRowApi, friendLinksList as getTableDataApi, editFriendLinks as editTableRowApi } from '@/api/api.js';

export default {
  name: 'friend-links',
  components: {},
  props: {},
  data() {
    return {
      headForm: { name: '' },
      tableData: [],
      tableRowData: {},
      dialogMode: '',
      editDialogVisible: false
    };
  },
  watch: {},
  computed: {
    ...mapGetters(['token']),
    uploadImageHeaders: function () {
      return {
        Authorization: this.token, // 给请求头中添加 Authorization 请求头
        ['X-Void-Risk']: 1 // 开发、测试环境
      };
    },
    uploadImageUrl: function () {
      let nonce = String(Math.random()).substring(2); // 随机数
      let ts = new Date().getTime(); // 时间戳
      let s = MD5(`/api/upload/image~${nonce}${ts}`); // 签名

      return `//127.0.0.1:12580/api/upload/image?nonce=${nonce}&ts=${ts}&s=${s}`;
    }
  },
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
    // 头部搜索按钮
    headSearchButton() {
      this.getTableData();
    },
    // 头部新增按钮
    headAddButton() {
      this.tableRowData = { name: '', link: '', image: '' };
      this.dialogMode = 'add';
      this.editDialogVisible = true;
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
    // Dialog-新增
    addDialogButton() {
      const _this = this;
      const { name, link, image } = _this.tableRowData;

      if (!name) {
        ElMessage.error('名称不能为空');

        return;
      }

      if (!link) {
        ElMessage.error('链接不能为空');

        return;
      }

      if (!image) {
        ElMessage.error('请上传图片');

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
      const { index, id, name, link, image } = _this.tableRowData;
      let postData = {
        op_type: 1,
        id: id
      };

      if (!name) {
        ElMessage.error('名称不能为空');

        return;
      } else if (name !== _this.tableData[index].name) {
        postData.name = name;
      }

      if (!link) {
        ElMessage.error('链接不能为空');

        return;
      } else if (link !== _this.tableData[index].link) {
        postData.link = link;
      }

      if (!image) {
        ElMessage.error('请上传图片');

        return;
      } else if (image !== _this.tableData[index].image) {
        postData.image = image;
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
    },
    // 图片上传之前
    imageUploadBefore(file) {
      let result = true;

      if (!/image\//.test(file.type)) {
        result = false;
        ElMessage.error('请上传图片类型的文件！');
      }

      return result;
    },
    // 图片上传成功
    imageUploadSuccess(response) {
      const { code, data, message } = response;

      if (code === 10004) {
        ElMessage.error(message);
        this.$router.push('/');
      } else if (code === 200) {
        this.tableRowData.image = data.url;
        ElMessage.success(message);
      } else {
        ElMessage.error(message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.friend-links-wrap {
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

    .el-button:last-of-type {
      float: right;
    }
  }

  .table-box {
    .row-image {
      display: block;
      margin: 0 auto;
      height: 40px;
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

          .upload-image {
            .el-form-item__label {
              line-height: 40px;
            }

            .image {
              height: 40px;
              vertical-align: top;
            }

            .avatar-uploader {
              min-width: 40px;
              height: 40px;
              border: 1px dashed rgb(205, 208, 214);

              &:hover {
                border-color: #79bbff;
              }

              .el-upload {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
