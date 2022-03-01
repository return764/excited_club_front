<template>
<fragment>
  <login-form v-if="!isAuth" v-model="loginDialog" @submit="handleLogin" @toRegister="registerDialog = true"/>
  <register-form v-if="!isAuth" v-model="registerDialog" @submit="handleLogin"/>
</fragment>
</template>

<script>
import LoginForm from "@/components/loginAndRegister/LoginForm";
import RegisterForm from "@/components/loginAndRegister/RegisterForm";
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "LoginAndRegister",
  components: {
    LoginForm,
    RegisterForm
  },
  computed: {
    ...mapGetters("account",["isAuth"]),
    ...mapState("variable",["loginFormShow", "registerFormShow"]),
    loginDialog: {
      get() {
        return this.loginFormShow
      },
      set(v) {
        this.setLoginShow(v)
      }
    },
    registerDialog: {
      get() {
        return this.registerFormShow
      },
      set(v) {
        this.setRegisterShow(v)
      }
    }
  },
  methods: {
    ...mapMutations("variable",["setLoginShow", "setRegisterShow"]),
    handleLogin() {
      this.setLoginShow(false)
      this.setRegisterShow(false)
    }
  },
}
</script>

<style scoped>

</style>