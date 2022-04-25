<template>
  <section class="edit-password-wrap">
    <h3 class="title">修改密码</h3>
    <el-form :label-position="labelPosition" label-width="120px" :model="formObject" style="max-width: 460px" :size="formElementSize">
      <el-form-item label="现在使用的密码">
        <el-input v-model="formObject.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="formObject.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="formObject.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editPasswordButton">修改密码</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElMessage } from 'element-plus';
import { editPassword } from '@/api/api.js';

export default {
  name: 'edit-password',
  components: {},
  props: {},
  data() {
    return {
      formObject: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      }
    };
  },
  watch: {},
  computed: { ...mapGetters(['formElementSize', 'userInfo']) },
  beforeCreate() {
    // 在实例初始化之后，进行数据侦听和事件/侦听器的配置之前同步调用。
  },
  created() {
    // 在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 el property 目前尚不可用。
  },
  beforeMount() {
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  },
  mounted() {
    // 实例被挂载后调用，这时 el 被新创建的 vm.el 替换了。如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.el 也在文档内。
  },
  beforeUpdate() {
    // 在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。
  },
  updated() {
    // 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
  },
  beforeUnmount() {
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
  },
  unmounted() {
    // 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
  },
  methods: {
    editPasswordButton() {
      const _this = this;

      let formObject = _this.formObject;

      if (!formObject.password) {
        ElMessage.error('请输入现在使用密码');

        return;
      }

      if (!formObject.newPassword) {
        ElMessage.error('请输入新密码');

        return;
      }

      if (formObject.newPassword !== formObject.confirmPassword) {
        ElMessage.error('两次输入的新密码不同');

        return;
      }

      editPassword({
        user_id: _this.userInfo.user_id,
        password: formObject.password,
        newPassword: formObject.newPassword
      }).then((response) => {
        const { code, message } = response.data;

        if (code === 200) {
          ElMessage.success(message);
          _this;
        } else {
          ElMessage.error(message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-password-wrap {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;

  .title {
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    color: #222;
    border-bottom: 2px solid #e4e7ed;
  }
}
</style>
