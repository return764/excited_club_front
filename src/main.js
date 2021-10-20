import Vue from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify'
import _ from "lodash"
import store from '@/stores/index'
import bootstrap from "@/bootstrap"
import '@/utils/filter'
import {ellipsisDirective} from '@hyjiacan/vue-ellipsis'
import Message from "@/components/common/message";
import {initRouter} from "@/routers";


Vue.use(Message)
Vue.directive(ellipsisDirective.name, ellipsisDirective)
Vue.config.productionTip = false
Vue.prototype._ = _

const router = initRouter();

bootstrap({router, store, message:Vue.prototype.$message})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
