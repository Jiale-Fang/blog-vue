import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
Vue.config.devtools = true
export default new Vuex.Store({
  state: {
    count: 0,
    token: '', // 用户token
    uid: null,
    avatar: null,
    username: null,
    nickname: null,
    loginType: null,
    email: null,
    forgetFlag: false,
    blogInfo: {},
    blogId: '',
    searchFlag: false,
    messageFlag: null,
    queryString: null,
    loginUrl: "",
    music: false,
    songId: null,
    parentCommentId: null,
    typeId: null,
    tagId: null,
    activePath: null,
    userMenuList: [],
    asyncRoutes: [],
    adminBlogId: null,
    activeIndex: null,
    isCollapse: false // 个人后台侧边栏展开状态
  },
  mutations: {
    saveLoginUrl (state, url) {
      state.loginUrl = url;
    },
    saveUserMenuList (state, userMenuList) {
      state.userMenuList = userMenuList;
    },
    saveAsyncRoutes (state, asyncRoutes) {
      state.asyncRoutes = asyncRoutes;
    },
    login (state, user) {
      state.uid = user.uid;
      state.avatar = user.avatar;
      state.username = user.username
      state.nickname = user.nickname;
      state.email = user.email;
      state.loginType = user.loginType;
    },
    logout (state) {
      state.uid = null
      state.avatar = null
      state.username = null
      state.nickname = null
      state.email = null
      state.loginType = null
      state.token = ''
    },
  },
  actions: {},
  modules: {}
});
