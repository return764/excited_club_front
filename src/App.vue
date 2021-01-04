<template>
  <v-app>
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
        />
      </div>
      <v-spacer/>
      <v-tabs
          right
      >
        <v-tab v-for="(route,i) in routesLevel1"
               :key="i"
               :to="route.path"
        >{{ route.meta.name }}
        </v-tab>
      </v-tabs>
      <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
      >
        <span>登录</span>
      </v-btn>
    </v-app-bar>
    <v-main class="grey lighten-5 background pa-0">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {},
  data: () => ({
    isScrolling: false,
  }),
  methods: {
    onScroll() {
      this.isScrolling = (window.pageYOffset ||
          document.documentElement.scrollTop || 0) > 20

      console.log(this.$route)
    }
  },
  computed: {
    ...mapGetters("route", [
      "routes",
      "routesLevel1"
    ])
  }
};
</script>

<style>
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
