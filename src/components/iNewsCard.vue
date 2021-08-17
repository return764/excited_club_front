<template>
    <v-card
        :max-width="$vuetify.breakpoint.xs?'25rem':'100%'"
        :max-height="$vuetify.breakpoint.xs?'8rem':'200px'"
        width="100%"
        ref="newsCard"
        :to="to"
        style="overflow: hidden"
    >
      <div class="d-flex flex-nowrap justify-space-between"
           :class="random?'flex-row-reverse':'flex-row'"
      >
        <v-img :aspect-ratio="1"
               v-if="headSrc"
               :max-width="$vuetify.breakpoint.xs?108:200"
               :width="$vuetify.breakpoint.xs?108:200"
               :max-height="$vuetify.breakpoint.xs?108:200"
               :class="$vuetify.breakpoint.xs?'my-auto':''"
               :src="headSrc" />
        <div class="flex d-flex flex-nowrap flex-column">
          <v-card-title v-ellipsis="1" class="text-left text-subtitle-2 text-md-h5 text-sm-h6">
            {{ title }}
          </v-card-title>
          <v-card-text v-ellipsis="$vuetify.breakpoint.mdAndUp?4:3"
                       class="align-start pb-0 text-caption text-sm-body-2 text-md-body-1 text-lg-body-1 overflow-hidden">
              {{ description }}
          </v-card-text>
          <v-card-actions class="mt-auto d-flex px-4 justify-end">
            <v-chip :x-small="$vuetify.breakpoint.xs" class="mr-2">
              <v-icon :x-small="$vuetify.breakpoint.xs" left>
                mdi-clock-outline
              </v-icon>
              {{publishTime}}
            </v-chip>
            <v-chip :x-small="$vuetify.breakpoint.xs" >
              <v-icon :x-small="$vuetify.breakpoint.xs" left>
                mdi-eye-outline
              </v-icon>
              {{readCount}}次
            </v-chip>
          </v-card-actions>
        </div>
      </div>
    </v-card>
</template>

<script>
export default {
  name: "iNewsCard",
  data(){
    return{
      baseURL: process.env.VUE_APP_API_BASE_URL
    }
  },
  props: {
    to: {
      type: String,
      default: "/news/123"
    },
    title: {
      type: String,
      default: "这里是卡片的标题"
    },
    description: {
      type: String,
      default:"在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
    },
    publishTime: {
      type: String,
      default: "2020/12/11"
    },
    readCount:{
      type: Number,
      default: 12345
    },
    headSrc:{
      type:String,
      default:require("../assets/oracle main.jpg")
    },
  },
  methods:{
  },
  computed:{
    random(){
      return this._.random(2)
    }
  },
  mounted() {
  },
  watch:{
    "$vuetify.breakpoint.name":{
      handler(){
        console.log(this.$vuetify.breakpoint)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-card__text{
  overflow: hidden;
}
</style>
