import {routes} from "@/routers";
import _ from "lodash"

export default {
    namespaced:true,
    state:()=>({
        routes:routes
    }),
    mutations:{

    },
    getters:{
        routes(state){
            return state.routes
        },
        tabRoutes(state){
            const rootRoute = _.find(state.routes,(o)=>{
                return o.path === '/'
            })
            const indexRoute = _.find(state.routes,(o)=>{
                return o.path === '/index'
            })
            return [indexRoute,...rootRoute.children]
        }
    }
}