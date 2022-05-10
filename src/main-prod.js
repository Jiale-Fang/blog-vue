import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router, { resetRouter } from './router'
import axios from 'axios'
import config from "./assets/js/config";
// 导入后台管理全局样式表
import './assets/css/global.css'
import './assets/css/me.css'
import './assets/css/iconfont.css'
import './assets/css/index.css'
// vue-baberrage的bug导致这里element ui只能npm引入
import './plugins/element.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import prismCss from './assets/lib/prism/prism.css'
import prismjs from './assets/lib/prism/prism'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import JsEncrypt from 'jsencrypt'
import "./assets/css/vue-social-share/client.css";
import Share from "vue-social-share";
Vue.prototype.config = config;
Vue.config.productionTip = false;
Vue.use(Share);
Vue.use(prismCss)
Vue.use(prismjs)
Vue.use(mavonEditor)
Vue.prototype.$http = axios
axios.withCredentials = true
Vue.prototype.$encrypTion = function (obj) {
  const encrypt = new JsEncrypt()
  encrypt.setPublicKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSJK+Pc1IdFWz83FWvKH' +
    'kTLmHq87J+5ndEdlH86c9AcSlaj4hyTWyaQOP8WPuvDfxL93TbYUEQ8bidHwyVAI' +
    'THoDABDQqBr0mDTfTqogHxWaqjEUh+g+y96KfshmD312lZD3cMxSrgA1NUlTBMpT' +
    'JQ+GQ1Rn0qVaVAi6OziAct9HEeFupJiw09sLzQTt5zY5s/KOgjQ7wPck4pGxO3tl' +
    'p/Iwws7WyabOjPm1z7XxcHWsetO9H6nKeJ8WaZ6P6baFasiNuhiBOvnGslRJ0Dgd' +
    'xsz7+feK3JbIwHr6vVfhJ9Bn2rnSYqpydg3odMyU54/lV0kdWup7SbJILAtaS8kv' +
    'EwIDAQAB')
  return encrypt.encrypt(obj)
}
// 在request拦截器中展示进度条
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

// 切换页面时，回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.config.productionTip = false
Vue.config.devtools = true
const vueInstance = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.response.use(
  function (response) {
    switch (response.data.code) {
      case 51001:
        Vue.prototype.$message.error("token已经过期，请重新登录")
        // 清空用户菜单
        resetRouter();
        window.sessionStorage.clear()
        vueInstance.$store.commit('logout')
        vueInstance.$router.push("/login")
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
)
