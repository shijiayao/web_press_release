<template>
  <section class="layout-header-wrap">
    <section class="header-bar">
      <el-avatar src="/image/other/20220429204256584.png" v-if="userInfo.level < 20000"></el-avatar>
      <span class="tips-text" v-if="userInfo.level < 20000">{{ userLevel }}：</span>
      <span class="tips-text tips-user">{{ userInfo.nickname }}</span>
      <span class="tips-text">{{ tipsText }}</span>
      <section class="logout-button">
        <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="red" title="确定要退出登录吗?" @confirm="logoutButton" v-if="isLogin">
          <template #reference>
            <el-button type="warning">退出登录</el-button>
          </template>
        </el-popconfirm>
        <el-button v-else @click="$router.push('/login')">登录/注册</el-button>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'layout-header',
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters(['isLogin', 'userInfo']),
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
    tipsText() {
      return this.userInfo.level < 20000 ? '欢迎登录！' : '欢迎光临！';
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
    logoutButton() {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-header-wrap {
  height: 100%;

  .header-bar {
    position: relative;
    padding: 8px;
    font-size: 0;

    .el-avatar {
      width: 44px;
      height: 44px;
      vertical-align: top;

      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }

    .tips-text {
      margin-left: 5px;
      line-height: 44px;
      font-size: 16px;

      &.tips-user {
        margin-left: 0;
        color: #b88230;
      }
    }

    .logout-button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
