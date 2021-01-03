<template>
  <v-list
      subheader
      color="transparent"
  >
    <v-list-item v-for="n in 6"
                 :key="n"
                 link
                 href="#"
    >
      <v-list-item-title>
        列表内容 {{ n }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-right">
        2020/02/12
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "IList"
}
</script>

<style scoped>

</style>