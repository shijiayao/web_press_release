import { createStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { login, userInfo, logout } from '../api/api.js';

const Store = createStore({
  state() {
    return {
      isLogin: false,
      token: '',
      userInfo: { level: 20000, nickname: '游客' }
    };
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data;
      state.isLogin = !!state.token;
    },
    SET_USERINFO(state, data) {
      state.userInfo = data;
    }
  },
  actions: {
    userLogin(context, loginParam) {
      return new Promise((resolve, reject) => {
        login(loginParam).then((response) => {
          const { code, message, data } = response.data;

          if (code === 200) {
            ElMessage.success(message);
            sessionStorage.setItem('user_token', data.token);
            context.commit('SET_TOKEN', data.token);
            context.dispatch('getUserInfo');
            resolve();
          } else {
            ElMessage.error(message);
            reject();
          }
        });
      });
    },
    getUserInfo(context) {
      return new Promise((resolve, reject) => {
        if (context.state.isLogin) {
          userInfo().then((result) => {
            const { code, message, data } = result.data;

            if (code === 200) {
              context.commit('SET_USERINFO', data);
              resolve();
            } else {
              ElMessage.error(message);
              reject();
            }
          });
        } else {
          reject('用户未登录；未获取到用户 token 缓存');
        }
      });
    },
    userLogout(context, flag) {
      return new Promise((resolve, reject) => {
        if (flag) {
          logout().then((response) => {
            const { code, message } = response.data;

            if (code === 200) {
              ElMessage.success(message);
              sessionStorage.removeItem('user_token');
              context.commit('SET_TOKEN', null);
              context.commit('SET_USERINFO', { level: 20000, nickname: '游客' });
              resolve();
            } else {
              ElMessage.error(message);
              reject();
            }
          });
        } else {
          sessionStorage.removeItem('user_token');
          context.commit('SET_TOKEN', null);
          context.commit('SET_USERINFO', { level: 20000, nickname: '游客' });
          resolve();
        }
      });
    }
  },
  getters: {
    token: (state) => state.token,
    isLogin: (state) => state.isLogin,
    userInfo: (state) => state.userInfo
  }
});

export default Store;
