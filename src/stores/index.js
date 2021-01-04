import Vue from 'vue'
import Vuex from 'vuex'
import route from "@/stores/module/route";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        route: route
    }
})