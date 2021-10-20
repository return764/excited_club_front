<template>
  <v-container class="waterfall-list"
               fluid
  >
      <waterfall :watch="list" :line-gap="lineGap" line="v" align="center">
        <waterfall-slot v-for="(item, index) in list"
                        :width="item.width"
                        :height="item.height"
                        :order="index"
                        move-class="item-move"
                        :key="index">
            <v-hover v-slot="{hover}">
              <v-sheet :elevation="hover ? 5 : 1" :rounded="true"
                       class="waterfall-list-item"
              >
                <v-img
                    :src="`/${item.path}`"
                    contain
                    :style="{display:`block`}"
                />
              </v-sheet>
            </v-hover>
        </waterfall-slot>
      </waterfall>
  </v-container>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll"
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import {throttle} from 'lodash'
import picturesApi from "@/services/pictures";

export default {
  name: "IWaterfallList",
  components:{
    Waterfall,
    WaterfallSlot
  },
  directives: { infiniteScroll },
  data(){
    return{
      list: [],
      pagination: {
        page: 1,
        size: 10,
        sort: null,
        total: 1,
        current: 1,
      },
      queryParams: {
        size: 10,
        page: 1,
        type: "waterfall"
      }
    }
  },
  mounted() {
    this.$vuetify.goTo(290,{})
    window.addEventListener('scroll',this.handleScroll,true)
    this.load()
  },
  computed:{
    lineGap(){
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200
        case "sm":
          return 300
        case "md":
          return 300
        case "lg":
          return 400
        case "xl":
          return 400
        default:
          return 400
      }
    },
  },
  methods: {
    load(){
      console.log("加载更多")
      this.queryParams.size = this.pagination.size
      this.queryParams.page = this.pagination.page
      picturesApi.list(this.queryParams).then(({data}) =>{
        if (data){
          this.pagination.total = data.total
          this.pagination.current = data.current
          this.list = this.list.concat(data.records)
        }
      })

    },
    isEnd(){
      let pages = this.pagination.total / this.pagination.size
      console.log(pages+"---"+this.pagination.current)
      return this.pagination.current > pages
    },
    handleScroll: throttle(function (){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop+window.innerHeight >= document.documentElement.scrollHeight){
        if (this.isEnd()){
          this.$message.info("已经到底啦~")
        } else {
          this.pagination.page = this.pagination.page + 1;
          this.load()
        }

      }
    },1000),

  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll,true)
  }
}
</script>

<style lang="scss">
.waterfall-list{
  min-height: 80vh;
  .waterfall-list-item{
    margin: .2rem .4rem;
    overflow: hidden;
  }
}
.item-move{
  transition: transform .5s cubic-bezier(.55,0,.1,1);
}
.vue-waterfall-slot{
  transition: 1s;
}
</style>
