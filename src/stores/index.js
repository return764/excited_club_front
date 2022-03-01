import Vue from 'vue'
import Vuex from 'vuex'
import route from "@/stores/module/route";
import account from "@/stores/module/account";
import variable from "@/stores/module/variable";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        route: route,
        account: account,
        variable: variable
    },
    // strict: process.env.NODE_ENV !== 'production'
})
