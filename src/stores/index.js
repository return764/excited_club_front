import Vue from 'vue'
import Vuex from 'vuex'
import route from "@/stores/module/route";
import account from "@/stores/module/account";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        route: route,
        account: account
    },
    // strict: process.env.NODE_ENV !== 'production'
})
