<template>
  <v-tabs
      background-color="transparent"
      fixed-tabs
      centered
      center-active
  >
    <v-tab v-for="(it,i) in tabs" :key="i">{{it}}</v-tab>
    <v-tab-item v-for="(it,i) in tabs" :key="i" style="padding: 12px">
      <v-container>
          <slot :name="it"/>
      </v-container>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: "ITabWithContent",
  props:{
    tabs:{
      type:Array
    }
  }
}
</script>

<style>
.v-tabs-items {
  background-color: transparent !important;
}
</style>