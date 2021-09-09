import {routes} from "@/routers";
import _ from "lodash"
import {formatFullPath} from "@/utils/routeUtil";

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
            let routes = [indexRoute,...rootRoute.children]
            formatFullPath(routes)
            return routes
        }
    }
}
