<template>
  <section class="layout-main-wrap">
    <el-container class="layout-main-container">
      <el-header><layoutHeader></layoutHeader></el-header>
      <el-container>
        <el-aside width="240px"><layoutLefNav></layoutLefNav></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import layoutHeader from './layout-header.vue';
import layoutLefNav from './layout-lef-nav.vue';

export default {
  name: 'layout-main',
  components: { layoutHeader, layoutLefNav },
  props: {},
  data() {
    return {};
  },
  watch: {
    isLogin: {
      handler(val) {
        if (val) {
          this.$store.dispatch('getUserInfo');
        }
      },
      immediate: true
    }
  },
  computed: { ...mapGetters(['isLogin']) },
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
  methods: {}
};
</script>

<style lang="scss" scoped>
.layout-main-wrap {
  width: 100%;
  height: 100%;

  .layout-main-container {
    width: 100%;
    height: 100%;

    .el-header {
      padding: 0;
      background-color: #c6e2ff;
    }

    .el-aside {
      background-color: #515a6e;
    }

    .el-main {
      padding: 10px;
      background-color: #d1edc4;
    }
  }
}
</style>
