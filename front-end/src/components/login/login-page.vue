<template>
  <section class="login-wrap">
    <section class="fixed-login-box"></section>
  </section>
</template>

<script>
export default {
  name: 'login-page'
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: skyblue;

  .fixed-login-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 2px #aaa;
  }
}
</style>
