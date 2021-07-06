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
      <v-spacer/>
      <v-tabs
          right
          center-active
          show-arrows
      >
        <v-tab v-for="(route,i) in tabRoutes"
               :key="i"
               :to="route.path"
        >{{ route.meta.name }}
        </v-tab>
      </v-tabs>

    </v-app-bar>
    <v-main app class="grey lighten-5 background pa-0">
      <router-view/>
    </v-main>
    <v-footer padless>
      <v-col
          class="text-center"
          cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
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
    }
  },
  computed: {
    ...mapGetters("route", [
      "routes",
      "tabRoutes"
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
