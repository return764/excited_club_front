<template >
  <v-container>
    <v-row justify="center" :style="{width: width}" class="mx-auto">
      <v-sheet
          rounded
          elevation="2"
          height="90vh"
      >
        <v-col>
          <v-row class="mb-4 my-4" justify="center">
            <div class="text-h5">
              Oracle Club 介绍
            </div>
          </v-row>
          <v-divider/>
          <v-row class="my-6 mx-3 mx-md-6">
            <div class="text-caption text-sm-body-2 text-md-body-1">
              在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。
            </div>
          </v-row>
        </v-col>
      </v-sheet>

    </v-row>
  </v-container>
</template>

<script>
import mixins from "@/mixins";

export default {
  name: "MainIntroduce",
  mixins:[mixins],
  data(){
    return{

    }
  },
}
</script>

<style scoped lang="scss">
</style>
