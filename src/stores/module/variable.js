

export default {
  namespaced: true,
  state: {
    loginFormShow: false,
    registerFormShow: false
  },
  mutations: {
    setLoginShow(state, v) {
      state.loginFormShow = v
    },
    setRegisterShow(state, v) {
      state.registerFormShow = v
    }
  }
}