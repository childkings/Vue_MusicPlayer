import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/element-ui'
import Header from './components/Header.vue'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.component('my-header', Header)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
