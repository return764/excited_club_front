<template>
  <v-container>
    <v-row justify="center">
      <div :style="{width: width}">
        <v-expansion-panels popout>
          <v-expansion-panel
              v-for="(item,i) in departments"
              :key="i"
          >
            <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              {{item.content}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import departmentApi from "@/services/departments";

export default {
  name: "OtherIntroduce",
  props:{

  },
  data(){
    return{
      departments: []
    }
  },
  mounted() {
    this.list()
  },
  methods:{
    list(){
      departmentApi.list().then(({data})=>{
          this.departments = data
      }).catch((err)=>{
        console.error(err)
      })
    }
  },
  computed:{
    width(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '90vw'
        case 'sm': return '75vw'
        case 'md': return '80vw'
        case 'lg': return '65vw'
        case 'xl': return '60vw'
      }
      return '90vw';
    }
  }
}
</script>

<style scoped>

</style>