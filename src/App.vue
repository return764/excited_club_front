<template>
  <v-app ref="app">
    <v-app-bar
        app
        elevate-on-scroll
        v-scroll="onScroll"
        :color="!isScrolling ? 'transparent' : 'grey lighten-3'"
    >
      <div class="d-flex align-center top-img">
        <v-img
            alt="Logo"
            class="shrink mr-2"
            contain
            src="./assets/ORACLE CLUB.png"
            transition="scale-transition"
            width="400"
            v-show="$vuetify.breakpoint.smAndUp"
        />
      </div>
      <v-spacer v-show="$vuetify.breakpoint.smAndUp"/>
<!--      <tab-menu/>-->
      <i-tabs/>
      <v-spacer v-show="!$vuetify.breakpoint.smAndUp"/>
      <v-btn text
             v-if="!isAuth"
             @click.stop="loginDialog = true"
             color="primary">登录/注册</v-btn>
      <avatar-menu v-else
        :user="user"
      >
      </avatar-menu>
    </v-app-bar>
    <v-main app class="grey lighten-5 background pa-0 pb-5">
      <router-view/>
    </v-main>
    <v-footer class="footer" padless>
      <v-container>
        <p><v-icon size="14">mdi-copyright</v-icon>{{ new Date().getFullYear() }} Oracle Club</p>
        <p>蜀ICP备20014393号-1</p>
      </v-container>
    </v-footer>
    <login-form v-if="isAuth" v-model="loginDialog" @submit="handleLogin" @toRegister="registerDialog = true"/>
    <register-form v-if="isAuth" v-model="registerDialog" @submit="handleLogin"/>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import AvatarMenu from "@/components/AvatarMenu";
import ITabs from "@/components/ITabs";

export default {
  name: 'App',
  components: {ITabs, AvatarMenu, RegisterForm, LoginForm},
  data: () => ({
    isScrolling: false,
    loginDialog: false,
    registerDialog: false
  }),
  methods: {
    onScroll() {
      this.isScrolling = (window.pageYOffset ||
          document.documentElement.scrollTop || 0) > 20
    },
    handleLogin(){
      this.registerDialog = false
      this.loginDialog = false
    }
  },
  computed: {
    ...mapGetters("account",["isAuth","user"]),

  }
};
</script>

<style lang="scss">
.v-application .v-breadcrumbs{
  padding-left: 12px;
}
.background {
  background-image: url(./assets/background.svg);
  background-repeat: repeat;
}

.top-img {
  position: absolute;
}
.footer{
  font-size: 14px;
  line-height: 1.5;
  background-color: rgba(0,0,0,1);
  p{
    display: flex;
    justify-content: inherit;
    align-items: center;
    flex: 1 0 auto;
    margin-bottom: .1rem !important;
    color: rgba(0,0,0,0.45);
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #eee;
}

::-webkit-scrollbar-track {
  background-color: #eee;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  background-color: #1890ff;
  cursor: pointer;
}
</style>
