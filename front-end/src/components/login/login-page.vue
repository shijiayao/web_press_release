<template>
    <section class="login-wrap">
        <section class="login-title">
            <h3>新闻发布管理系统</h3>
        </section>
        <section class="fixed-login-box">
            <section class="tabs-box">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="登录" name="login">
                        <el-form :model="loginForm">
                            <el-form-item>
                                <el-input v-model="loginForm.username" placeholder="请输入用户名/手机/邮箱"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="loginForm.password" placeholder="请输入登录密码" type="password"></el-input>
                            </el-form-item>
                        </el-form>
                        <section class="button-group">
                            <el-button type="primary" @click="loginButton">登 录</el-button>
                        </section>
                        <section class="tourist-user">
                            <router-link to="/news-info">===以游客的身份观看新闻===</router-link>
                        </section>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="register">
                        <el-form :model="registerForm" label-width="100px">
                            <el-form-item label="账号">
                                <el-input v-model="registerForm.username" placeholder="请输入账号" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="登录密码">
                                <el-input v-model="registerForm.password" placeholder="请输入登录密码" type="password" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input v-model="registerForm.confirmPassword" placeholder="请输入确认密码" type="password" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称">
                                <el-input v-model="registerForm.nickname" placeholder="请输入昵称，最多可以输入20个字符" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="registerForm.email" placeholder="请输入邮箱，例：example@xxx.xx" maxlength="50"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="registerForm.mobile" placeholder="请输入手机号，例：13812345678" maxlength="11"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="registerForm.fullname" placeholder="请输入姓名" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="registerForm.gender">
                                    <el-option label="请选择性别" :value="-1"></el-option>
                                    <el-option label="女" :value="0"></el-option>
                                    <el-option label="男" :value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <section class="button-group">
                            <el-button type="warning" @click="resetRegisterButton">重 置</el-button>
                            <el-button type="primary" @click="registerButton">注 册</el-button>
                        </section>
                    </el-tab-pane>
                </el-tabs>
            </section>
        </section>
    </section>
</template>

<script>
import { ElMessage } from 'element-plus';
import { register } from '@/api/api.js';

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
    computed: {},
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
        // 登录按钮
        loginButton() {
            const _this = this;

            const loginForm = _this.loginForm;

            if (!loginForm.username) {
                ElMessage.error('请输入用户名');

                return;
            }

            if (!loginForm.password) {
                ElMessage.error('请输入密码');

                return;
            }

            _this.$store.dispatch('userLogin', loginForm).then(() => {
                _this.$router.push('/news-info');
            });
        },
        // 重置注册按钮
        resetRegisterButton() {
            const _this = this;

            _this.registerForm = { username: '', password: '', confirmPassword: '', nickname: '', email: '', mobile: '', fullname: '', gender: -1 };
        },
        // 注册按钮
        registerButton() {
            const _this = this;

            const registerForm = _this.registerForm;

            if (!registerForm.username) {
                ElMessage.error('请输入账号');

                return;
            }

            if (!registerForm.password) {
                ElMessage.error('请输入密码');

                return;
            }

            if (registerForm.password !== registerForm.confirmPassword) {
                ElMessage.error('两次输入的密码不一致');

                return;
            }

            if (!registerForm.nickname) {
                ElMessage.error('请输入昵称');

                return;
            }

            if (!registerForm.email) {
                ElMessage.error('请输入邮箱');

                return;
            }

            if (!registerForm.mobile) {
                ElMessage.error('请输入手机号码');

                return;
            }

            if (!registerForm.fullname) {
                ElMessage.error('请输入姓名');

                return;
            }

            if (registerForm.gender === -1) {
                ElMessage.error('请选择性别');

                return;
            }

            register(registerForm).then((response) => {
                const { code, message } = response.data;

                if (code === 200) {
                    ElMessage.success(message);
                    _this.activeName = 'login';
                    _this.resetRegisterButton();
                } else {
                    ElMessage.error(message);
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: skyblue;

    .login-title {
        padding-top: 30px;

        h3 {
            margin: 0 auto;
            width: 400px;
            line-height: 80px;
            font-size: 24px;
            color: #555;
            text-align: center;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 1px 1px 10px 2px #aaa;
        }
    }

    .fixed-login-box {
        position: fixed;
        top: 150px;
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

            .tourist-user {
                margin: 5px 0;

                a {
                    display: block;
                    padding: 5px 0;
                    text-align: center;
                    color: #409eff;
                    text-shadow: 2px 2px 10px #aaa;
                }
            }
        }
    }
}
</style>
