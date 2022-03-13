import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    forgetFlag: false,
    blogInfo: {},
    loginUrl: "",
  },
  mutations: {
    saveLoginUrl (state, url) {
      state.loginUrl = url;
    }
  },
  actions: {},
  modules: {},
  plugins: [
  ]
});
