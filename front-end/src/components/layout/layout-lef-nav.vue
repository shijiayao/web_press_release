<template>
  <section class="layout-lef-nav-wrap">
    <el-menu :default-active="menuActive" class="el-menu-vertical-demo" @select="menuSelect" :router="true">
      <template v-for="nav_level_01 in menuList" :key="nav_level_01.name">
        <el-sub-menu :index="nav_level_01.path" v-if="nav_level_01.children.length > 0" :key="nav_level_01.name">
          <template #title>
            <el-icon :size="20" :color="'#fff'">
              <user v-if="nav_level_01.icon === 'user'"></user>
              <coordinate v-else-if="nav_level_01.icon === 'coordinate'"></coordinate>
              <notebook v-else-if="nav_level_01.icon === 'notebook'"></notebook>
              <message v-else-if="nav_level_01.icon === 'message'"></message>
              <document v-else-if="nav_level_01.icon === 'document'"></document>
            </el-icon>
            <span>{{ nav_level_01.title }}</span>
          </template>
          <el-menu-item v-for="nav_level_02 in nav_level_01.children" :key="nav_level_02.name" :index="nav_level_02.path">{{ nav_level_02.title }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="nav_level_01.path" :key="nav_level_01.name">
          <el-icon :size="20" :color="'#fff'">
            <user v-if="nav_level_01.icon === 'user'"></user>
            <coordinate v-else-if="nav_level_01.icon === 'coordinate'"></coordinate>
            <notebook v-else-if="nav_level_01.icon === 'notebook'"></notebook>
            <message v-else-if="nav_level_01.icon === 'message'"></message>
            <document v-else-if="nav_level_01.icon === 'document'"></document>
          </el-icon>
          <span>{{ nav_level_01.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import navList from '@/router/nav-list.js';

export default {
  name: 'layout-lef-nav',
  components: {},
  props: {},
  data() {
    return {
      menuList: []
    };
  },
  watch: {
    userInfo: {
      handler(curVal) {
        this.menuList = navList.filter((element) => element.level >= curVal.level);
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    menuActive() {
      return this.$route.path;
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
    menuSelect() {}
  }
};
</script>

<style lang="scss" scoped>
.layout-lef-nav-wrap {
  height: 100%;

  :deep {
    .el-menu {
      background-color: transparent;
      border: none;

      .el-sub-menu__title {
        &:hover {
          background-color: #414858;
        }
      }

      .el-menu--inline {
        background-color: #363e4f;
      }

      .el-menu-item {
        font-size: 16px;
        color: #fff;

        &:hover {
          background-color: #414858;
        }

        &.is-active {
          color: #ffd04b;
        }
      }

      .el-sub-menu__title {
        font-size: 16px;
        color: #fff;
      }

      .el-icon {
        color: #fff;
      }

      .is-active {
        .el-sub-menu__title {
          .el-icon {
            color: #ffd04b;
          }

          span {
            color: #ffd04b;
          }
        }
      }
    }
  }
}
</style>
