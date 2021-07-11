import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Alert from '@/components/alert/alert.js'

Vue.config.productionTip = false

// 引入alert组件
Vue.prototype.$alert = Alert

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
