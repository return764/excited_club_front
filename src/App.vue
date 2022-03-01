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
      <i-tabs/>
      <v-spacer v-show="!$vuetify.breakpoint.smAndUp"/>
      <v-btn text
             v-if="!isAuth"
             @click.stop="setLoginShow(true)"
             color="primary">登录/注册</v-btn>
      <avatar-menu v-else
        :user="user"
      >
      </avatar-menu>
    </v-app-bar>
    <v-main app class="grey lighten-5 background pa-0 pb-5">
      <router-view v-if="isRouterAlive"/>
    </v-main>
    <v-footer class="footer" padless>
      <v-container>
        <p><v-icon size="14">mdi-copyright</v-icon>{{ new Date().getFullYear() }} Oracle Club</p>
        <p>蜀ICP备20014393号-1</p>
      </v-container>
    </v-footer>
    <login-and-register/>
  </v-app>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import AvatarMenu from "@/components/AvatarMenu";
import ITabs from "@/components/ITabs";
import LoginAndRegister from "@/components/loginAndRegister/LoginAndRegister";

export default {
  name: 'App',
  components: {LoginAndRegister, ITabs, AvatarMenu},
  provide() {
    return {
      reload: this.reload
    }
  },
  data: () => ({
    isScrolling: false,
    isRouterAlive: true
  }),
  created() {
    this.setTitle()
  },
  methods: {
    ...mapMutations("variable",["setLoginShow"]),
    onScroll() {
      this.isScrolling = (window.pageYOffset ||
          document.documentElement.scrollTop || 0) > 20
    },
    setTitle(){
      const route = this.$route
      const key = route.path === '/index' || route.path === '/' ? '首页' : route.matched[route.matched.length - 1].name
      // todo k
      document.title = process.env.VUE_APP_NAME + ' | ' + key
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  computed: {
    ...mapGetters("account",["isAuth","user"]),
  },
  watch:{
    $route(){
      this.setTitle()
    }
  },
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
