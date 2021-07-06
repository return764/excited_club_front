<template>
  <v-container class="waterfall-list"
               fluid
  >
      <waterfall :watch="list" :line-gap="200" line="v" fixed-height align="center">
        <waterfall-slot v-for="(item, index) in list"
                        :width="item.width"
                        :height="item.height"
                        :order="index"
                        move-class="item-move"
                        :key="item.id">
            <v-sheet elevation="1" :rounded="true" style="overflow: hidden"
                     :style="{margin:'0 .2rem .4rem'}"
            >
              <v-img
                  :src="item.src"
                  contain
                  :style="{display:`block`}"
              />
            </v-sheet>
        </waterfall-slot>
      </waterfall>
  </v-container>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll"
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import {throttle} from 'lodash'

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
      images:[
        {
          src: require("@/assets/image/1.jpg"),
          height: 412,
          width: 874
        },{
          src: require("@/assets/image/2.jpg"),
          height: 423,
          width: 308
        },{
          src: require("@/assets/image/3.jpg"),
          height: 427,
          width: 688
        },{
          src: require("@/assets/image/4.jpg"),
          height: 437,
          width: 593
        },{
          src: require("@/assets/image/5.jpg"),
          height: 461,
          width: 288
        },{
          src: require("@/assets/image/6.jpg"),
          height: 479,
          width: 570
        },{
          src: require("@/assets/image/7.jpg"),
          height: 484,
          width: 229
        },{
          src: require("@/assets/image/8.jpg"),
          height: 493,
          width: 749
        }
      ]
    }
  },
  created() {
    this.list = this.images.concat(this.images)

  },
  mounted() {
    this.$vuetify.goTo(290,{})
    window.addEventListener('scroll',this.handleScroll,true)
    this.load()
  },
  computed:{
    col(){
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 2
        case "sm":
          return 3
        case "md":
          return 4
        case "lg":
          return 6
        case "xl":
          return 8
        default:
          return 8
      }
    }
  },
  methods: {
    loadMore: function (){
      console.log("加载更多")
      this.list = this.list.concat(this.images,this.images)
    },
    load(){
      this.loadMore()
    },
    handleScroll: throttle(function (){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop+window.innerHeight >= document.documentElement.scrollHeight){
        this.load()
      }
    },1000)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll,true)
  }
}
</script>

<style lang="scss">
.waterfall-list{
  min-height: 80vh;
  height: 90vh;
}
.item-move{
  transition: transform .5s cubic-bezier(.55,0,.1,1);
}
.vue-waterfall-slot{
  transition: 2s;
}
</style>