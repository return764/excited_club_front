<template>
  <v-tabs
      background-color="transparent"
      :vertical="vertical"
      :center-active="centerActive"
      :fixed-tabs="fixedTabs"
      :centered="centered"
  >
    <v-tab v-for="(it,i) in tabs" :to="it" :key="i">{{ it }}</v-tab>
    <v-tab-item v-for="(it,i) in tabs" :key="i" style="padding: 12px">
      <slot :name="it"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: "ITabWithContent",
  props: {
    tabs: {
      type: Array
    },
    vertical: {
      type: Boolean,
      default: false
    },
    centerActive: {
      type: Boolean,
      default: false
    },
    fixedTabs: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.v-tabs-items {
  background-color: transparent !important;
}
</style>