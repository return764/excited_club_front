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
            <h1 class="text-center">杰出展示</h1>
          </v-col>
          <v-breadcrumbs :items="items">

          </v-breadcrumbs>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "OutstandingPage",
  data(){
    return{
      items:[
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>