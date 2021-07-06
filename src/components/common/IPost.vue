<template>
  <v-container style="height: 100%">
    <v-row justify="center">
      <v-col lg="8" class="ma-2">
        <v-row>
          <v-col>
            <div class="text-h5 text-center mb-4">
              {{ title }}
            </div>
            <v-divider/>
          </v-col>
        </v-row>
        <v-row justify="center" class="my-2">
          <div class="text-caption text--secondary px-2">发布时间:{{ publishTime }}</div>
          <div class="text-caption text--secondary px-2">浏览量:{{ readCount }}次</div>
        </v-row>
        <v-row class="my-2">
          <div class="text-body-1">
            {{content}}
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IPost",
  props:{
    title: {
      type: String,
      default: "这里是卡片的标题"
    },
    publishTime: {
      type: String,
      default: "2020/12/11"
    },
    readCount:{
      type: Number,
      default: 12345
    },
    content:{
      type:String,
      default:"在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
    }
  }
}
</script>

<style scoped>

</style>