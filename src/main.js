import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/js/jquery.min'
// import 'semantic-ui-css/semantic.min.css'
// import SuiVue from 'semantic-ui-vue'
// import '../semantic/dist/semantic.min.css'

// Vue.use(SuiVue)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
