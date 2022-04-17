import { createStore } from 'vuex';

const Store = createStore({
  state() {
    return {
      formElementSize: 'large'
    };
  },
  getters: {
    formElementSize: (state) => state.formElementSize
  }
});

export default Store;
