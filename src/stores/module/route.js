import _ from "lodash"
import {filterInvisible, formatFullPath} from "@/utils/routeUtil";


export default {
  namespaced:true,
  state:{
    routes: _.cloneDeep(require("@/routers/config").default.routes)
  },
  mutations:{
    setRoutes(state, routes){
      state.routes = routes
    }
  },
  getters:{
    routes(state){
      return state.routes
    },
    tabRoutes(state){
      const rts = _.cloneDeep(state.routes)
      const rootRoute = _.find(rts,(o)=>{
        return o.path === '/'
      })
      const indexRoute = _.find(rts,(o)=>{
        return o.path === '/index'
      })
      let routes = [indexRoute,...rootRoute.children]
      formatFullPath(routes)
      routes = filterInvisible(routes)
      return routes
    }
  }
}


