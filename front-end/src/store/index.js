import { createStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { userInfo } from '../api/api.js';

const Store = createStore({
  state() {
    return {
      formElementSize: 'large',
      isLogin: false,
      token: '',
      userInfo: { level: 1 }
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
    getUserInfo({ commit }) {
      userInfo().then((result) => {
        const { code, message } = result.data;

        if (code === 200) {
          commit('SET_USERINFO', result.data.data);
        } else {
          ElMessage.error(message);
        }

        commit('SET_USERINFO', result.data.data);
      });
    }
  },
  getters: {
    formElementSize: (state) => state.formElementSize,
    isLogin: (state) => state.isLogin,
    userInfo: (state) => state.userInfo
  }
});

export default Store;
