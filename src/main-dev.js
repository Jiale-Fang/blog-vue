import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 导入后台管理全局样式表
import './assets/css/global.css'
import './assets/css/iconfont.css'
import './assets/css/index.css'
import './assets/css/me.css'
import './plugins/element.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import prismCss from './assets/lib/prism/prism.css'
import prismjs from './assets/lib/prism/prism'
import JsEncrypt from 'jsencrypt'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})
Vue.use(prismCss)
Vue.use(prismjs)
// use
Vue.use(mavonEditor)
Vue.prototype.$http = axios
axios.withCredentials = true
/**
 * 配置全局接口加密方法
 * @param obj
 * @returns {PromiseLike<ArrayBuffer>}
 */
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
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
