<template>
  <div class="bbs-list">
    <v-sheet elevation="2">
      <i-list :items="posts"/>
    </v-sheet>
    <i-pagination/>
  </div>
</template>

<script>
import IList from "@/components/common/IList";
import IPagination from "@/components/common/IPagination";

const df = []
for (let i = 0; i < 10; i++){
  df.push({
    id: i,
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, repudiandae.",
    date: "2018-10-20",
    to: "/bbs/p/12345",
    tags:[
      {
        name:"置顶",
        color: "#C3D6E8"
      }
    ]
  })
}

export default {
  name: "BBSList",
  components: {IPagination, IList},
  data(){
    return{
      posts: df,
      pagination:{
        page: 1,
        size: 10,
        sort: null,
        total: 0
      }
    }
  },
  computed:{
    routeName(){
      const paths = this.$route.fullPath.split("/")
      return paths[paths.length - 1]
    }
  },
  mounted() {
  },
  watch:{
    routeName(v){
      console.log(v)
    }
  }
}
</script>

<style lang="scss">
.bbs-list{

}
</style>
