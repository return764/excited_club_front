<template>
  <div>
    <v-sheet
        height="30vh"
        width="100vw"
        class="grey lighten-3"
    >
      <v-container class="fill-height">
        <v-row class="fill-height justify-center align-content-center">
          <v-col cols="12">
            <h1 class="text-center">{{ this.$route.meta.name }}</h1>
          </v-col>
          <v-breadcrumbs :items="items">

          </v-breadcrumbs>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import {getBreadcrumbs} from "@/utils/routeUtil";

export default {
  name: "PhotosPage",
  data(){
    return{
      items:getBreadcrumbs(this.$route)
    }
  }
}
</script>

<style scoped>

</style>