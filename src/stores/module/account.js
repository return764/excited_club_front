import {removeAuthorization} from "@/utils/request"

export default {
  namespaced:true,
  state:{
    user:undefined
  },
  mutations:{
    setUser(state, user){
      state.user = user
      localStorage.setItem("user",JSON.stringify(user))
    },
    removeAccount(state){
      state.user = null
      localStorage.removeItem("user")
      removeAuthorization()
    }
  },
  getters: {
    user: state=>{
      if (!state.user){
        try {
          const user = localStorage.getItem("user")
          return JSON.parse(user)
        }catch (e) {
          console.error(e)
        }
      }
      return state.user
    },
    isAuth: state=>{
      if (!state.user){
        return !!localStorage.getItem("user");
      }
      return true
    }
  }
}
