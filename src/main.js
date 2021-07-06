import Vue from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'
import _ from "lodash"
import store from '@/stores/index'
import router from '@/routers/index'
import bootstrap from "@/bootstrap"
import '@/utils/filter'
import {ellipsisDirective} from '@hyjiacan/vue-ellipsis'
import Message from "@/components/common/message";


Vue.use(Message)
Vue.directive(ellipsisDirective.name, ellipsisDirective)
Vue.config.productionTip = false
Vue.prototype._ = _

bootstrap({router, store})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
