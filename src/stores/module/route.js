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
        routesLevel1(state){
            return _.filter(state.routes,(o)=>{
                return _.has(o,'component')
            })
        }
    }
}