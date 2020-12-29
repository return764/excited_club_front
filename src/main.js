import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import _ from "lodash"
import store from '@/stores/index'
import router from '@/routers/index'

Vue.config.productionTip = false
Vue.prototype._ = _

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
