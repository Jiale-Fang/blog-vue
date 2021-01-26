import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import prismCss from './assets/lib/prism/prism.css'
import prismjs from './assets/lib/prism/prism'
Vue.use(prismCss)
Vue.use(prismjs)
// use
Vue.use(mavonEditor)

Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
