<template>
  <v-container>
    <v-row justify="center">
      <v-sheet
          elevation="2"
          height="90vh"
          :width="width"
      >
        <v-col>
          <v-row class="mb-4 my-4" justify="center">
            <div class="text-h5">
              {{ article.title }}
            </div>
          </v-row>
          <v-divider/>
          <v-row justify="center" class="my-4">
            <div class="text-caption text--secondary px-2">发布时间:{{ article.createdAt | moment }}</div>
            <div class="text-caption text--secondary px-2">浏览量:{{ article.viewCount }}次</div>
          </v-row>
          <v-row class="my-2 mx-3 mx-md-6">
            <div class="text-caption text-sm-body-2 text-md-body-1" v-html="article.content">
            </div>
          </v-row>
        </v-col>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import articlesApi from "@/services/articles";

export default {
  name: "ArticlePage",
  data(){
    return{
      article:{}
    }
  },
  props:{
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
    content:{
      type:String,
      default:"在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
    }
  },
  mounted() {
    if (this.isLatest){
      this.latest()
    }else {
      const {id} = this.$route.params
      if (id){
        this.showById(id)
      }
    }
  },
  methods:{
    latest(){
      articlesApi.latest().then(({data})=>{
        this.article = data
      }).catch((err)=>{
        console.error(err)
      })
    },
    showById(id){
      articlesApi.get(id).then(({data})=>{
        if (data.result){
          // 异常
        }else {
          this.article = data
        }
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
    },
    isLatest(){
      return this.$route.path.endsWith("latest")
    }
  }
}
</script>

<style scoped>

</style>
