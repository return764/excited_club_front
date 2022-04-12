<template>
  <div style="height: 100%">
    <v-sheet
        height="30vh"
        width="100vw"
        class="grey lighten-4"
    >
      <v-container class="fill-height">
        <v-row class="fill-height justify-center align-content-center">
          <v-col cols="12">
            <div class="title text-h4 font-weight-bold text-center">{{ this.$route.meta.name }}</div>
          </v-col>
          <v-breadcrumbs large :items="breadcrumbItems"/>
        </v-row>
      </v-container>
    </v-sheet>
    <v-tabs
        ref="tabs"
        background-color="transparent"
        :fixed-tabs="true"
        :centered="true"
        class="mb-4"
        v-if="tabs.length > 0"
    >
      <v-tab v-for="(it,i) in tabs" :to="it.path" :key="i">{{ it.name }}</v-tab>
    </v-tabs>
    <div class="background"
         :style="{'--bg-img': background}"
      >
      <router-view/>
    </div>
  </div>
</template>

<script>
import {getBaseChildrenRoute, getBreadcrumbs} from "@/utils/routeUtil";

export default {
  name: "MainLayout",
  data(){
    return{
      breadcrumbItems:[],
      tabs:[],
      background: "url("+require('../assets/background.jpeg')+")"
    }
  },
  methods: {
    setBackground(url) {
      this.background = "url("+require('../assets/'+url)+")"
    },
  },
  watch:{
    $route:{
      handler:function(o){
        this.breadcrumbItems = getBreadcrumbs(o)
        this.tabs = getBaseChildrenRoute(o)

        if (this.$route.path.startsWith("/bbs")) {
          this.setBackground("background.jpeg")
        } else {
          this.setBackground("background.svg")
        }
      },
      immediate:true
    }
  }
}
</script>

<style lang="scss">
.title{

}
.background {
  //background-image: url(./assets/background.svg);
  //background-repeat: repeat;
  min-height: 70vh;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: var(--bg-img);
  background-size:cover;
}

</style>
