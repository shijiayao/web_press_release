<template>
  <section class="user-info-wrap">
    <h3 class="title">用户信息</h3>
    <el-form label-width="100px" :model="formObject" style="max-width: 460px">
      <el-form-item label="昵称:">
        <section class="item-inner">{{ userInfo.nickname }}</section>
      </el-form-item>
      <el-form-item label="用户:">
        <section class="item-inner">{{ userLevel }}</section>
      </el-form-item>
      <el-form-item label="账号:">
        <section class="item-inner">{{ userInfo.username }}</section>
      </el-form-item>
      <el-form-item label="手机号:">
        <section class="item-inner">{{ userInfo.mobile }}</section>
      </el-form-item>
      <el-form-item label="email:">
        <section class="item-inner">{{ userInfo.email }}</section>
      </el-form-item>
      <el-form-item label="姓名:">
        <section class="item-inner">{{ userInfo.fullname }}</section>
      </el-form-item>
      <el-form-item label="性别:">
        <section class="item-inner">{{ userGender }}</section>
      </el-form-item>
      <el-form-item label="创建时间:">
        <section class="item-inner">{{ formatDate(userInfo.create_time) }}</section>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatTargetDate } from '@/tools/tools.js';

export default {
  name: 'user-info',
  components: {},
  props: {},
  data() {
    return { formObject: { username: '', password: '', confirmPassword: '', nickname: '', email: '', mobile: '', fullname: '', gender: -1 } };
  },
  watch: {},
  computed: {
    ...mapGetters(['userInfo']),
    userLevel() {
      let result = '游客';

      if (this.userInfo.level === 1) {
        result = '超级管理员';
      } else if (this.userInfo.level < 1000) {
        result = '管理员';
      } else if (this.userInfo.level < 10000) {
        result = '普通用户';
      } else {
        result = '游客';
      }

      return result;
    },
    userGender() {
      return this.userInfo.gender === 0 ? '女' : '男';
    }
  },
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
    // 序列化时间
    formatDate(date) {
      let targetTimeObject = formatTargetDate(date);
      return `${targetTimeObject.YY}-${targetTimeObject.MM}-${targetTimeObject.DD} ${targetTimeObject.HH}:${targetTimeObject.mm}:${targetTimeObject.ss}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info-wrap {
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

  .el-form {
    :deep {
      .el-form-item__label {
        font-size: 16px;
        color: #222;
      }

      .item-inner {
        font-size: 16px;
        color: #888;
      }
    }
  }
}
</style>
