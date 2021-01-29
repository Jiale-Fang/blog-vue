import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import prismCss from './assets/lib/prism/prism.css'
import prismjs from './assets/lib/prism/prism'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(prismCss)
Vue.use(prismjs)
// use
Vue.use(mavonEditor)

Vue.use(ElementUI)
Vue.prototype.$http = axios
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:9001/'
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
