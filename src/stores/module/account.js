
export default {
  namespaced:true,
  state:{
    user:undefined
  },
  mutations:{
    setUser(state, user){
      state.user = user
      localStorage.setItem("user",JSON.stringify(user))
    }
  },
  getters: {
    user: state=>{
      if (!state.user){
        try {
          const user = localStorage.getItem("user")
          state.user = JSON.parse(user)
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
