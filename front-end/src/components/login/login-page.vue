<template>
  <section class="login-wrap">
    <section class="fixed-login-box">
      <section class="tabs-box">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录" name="login">
            <el-form :model="loginForm">
              <el-form-item :size="formElementSize">
                <el-input v-model="loginForm.username" placeholder="请输入用户名/手机/邮箱"></el-input>
              </el-form-item>
              <el-form-item :size="formElementSize">
                <el-input v-model="loginForm.password" placeholder="请输入登录密码" type="password"></el-input>
              </el-form-item>
            </el-form>
            <section class="button-group">
              <el-button type="primary" :size="formElementSize">登 录</el-button>
            </section>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <el-form :model="registerForm" label-width="100px">
              <el-form-item label="账号" :size="formElementSize">
                <el-input v-model="registerForm.username" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" :size="formElementSize">
                <el-input v-model="registerForm.password" placeholder="请输入登录密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" :size="formElementSize">
                <el-input v-model="registerForm.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
              </el-form-item>
              <el-form-item label="昵称" :size="formElementSize">
                <el-input v-model="registerForm.nickname" placeholder="请输入昵称，最多可以输入12个字符" minlength="2" maxlength="12"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :size="formElementSize">
                <el-input v-model="registerForm.email" placeholder="请输入邮箱，例：example@xxx.xx"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :size="formElementSize">
                <el-input v-model="registerForm.mobile" placeholder="请输入手机号，例：13812345678" maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :size="formElementSize">
                <el-input v-model="registerForm.fullname" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="性别" :size="formElementSize">
                <el-select v-model="registerForm.gender">
                  <el-option label="请选择性别" :value="-1"></el-option>
                  <el-option label="女" :value="0"></el-option>
                  <el-option label="男" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <section class="button-group">
              <el-button type="warning" :size="formElementSize">重 置</el-button>
              <el-button type="primary" :size="formElementSize">注 册</el-button>
            </section>
          </el-tab-pane>
        </el-tabs>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'login-page',
  components: {},
  props: {},
  data() {
    return {
      activeName: 'login',
      loginForm: { username: '', password: '' },
      registerForm: { username: '', password: '', confirmPassword: '', nickname: '', email: '', mobile: '', fullname: '', gender: -1 }
    };
  },
  watch: {},
  computed: {
    ...mapGetters(['formElementSize'])
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
  methods: {}
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
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 2px #aaa;

    .tabs-box {
      padding: 20px;

      .el-tabs {
        :deep {
          .el-tabs__header {
            .el-tabs__item {
              font-size: 20px;
            }
          }

          .el-tabs__content {
            .el-form {
              .el-form-item {
                margin-bottom: 8px;

                .el-select {
                  width: 100%;
                }
              }
            }
          }
        }
      }

      .button-group {
        text-align: right;
      }
    }
  }
}
</style>
