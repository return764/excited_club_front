<template>
  <v-list
      subheader
      color="transparent"
  >
    <v-list-item v-for="item in items"
                 :key="item.id"
                 link
                 :href="item.to"
    >
      <v-list-item-title>
        {{item.title}}
      </v-list-item-title>
      <v-list-item-subtitle class="text-right">
        {{item.date | moment("yyyy-MM-DD")}}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "IList",
  props:{
    items:{
      type: Array,
      default:()=>[{
        id:1,
        title: "title",
        date: "2018-10-20",
        to: "#"
      }]
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .v-list-item__title{
  flex: 6;
}

::v-deep .v-list-item__subtitle{
  flex: 1;
}
</style>
