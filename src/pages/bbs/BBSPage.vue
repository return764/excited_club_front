<template>
<div class="bbs-home">
  <v-container>
    <v-row class="mx-auto" :style="{width:width}" justify="center">
      <v-col cols="12">
        <router-view/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import mixins from "@/mixins"

export default {
  name: "BBSPage",
  mixins: [mixins],
  data(){
    return{
      boards:[],
    }
  }
}
</script>

<style lang="scss">
.bbs-home{

}
</style>
