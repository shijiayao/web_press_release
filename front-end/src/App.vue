<template>
  <section class="app-wrap">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'App',
  components: {},
  created() {
    // 在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 el property 目前尚不可用。
    this.$store.commit('SET_TOKEN', sessionStorage.getItem('user_token'));
  }
};
</script>

<style lang="scss" scoped>
.app-wrap {
  width: 100%;
  height: 100%;
}
</style>
