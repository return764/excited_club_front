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
            <h1 class="text-center">{{ this.$route.meta.name }}</h1>
          </v-col>
          <v-breadcrumbs :items="items"/>
        </v-row>
      </v-container>
    </v-sheet>
    <i-tab-with-content
        :tabs="tabs"
        centered
        fixed-tabs
    >
      <v-container
          :slot="tabs[0]"
      >
        <v-row justify="center">
          <v-col lg="8">
            <v-row>
              <v-col>
                <div class="text-h5 text-center mb-4">
                  Oracle Club 介绍
                </div>
                <v-divider/>
              </v-col>
            </v-row>
            <v-row justify="center" class="my-2">
              <div class="text-caption text--secondary px-2">发布时间:2020/01/22</div>
              <div class="text-caption text--secondary px-2">浏览量:1234次</div>
            </v-row>
            <v-row class="my-2">
              <div class="text-body-1">
                在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-container
          :slot="tabs[1]">
        <v-row justify="center">
          <v-expansion-panels popout>
            <v-expansion-panel
                v-for="(item,i) in departments"
                :key="i"
            >
              <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                {{item.introduction}}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-container>

    </i-tab-with-content>
  </div>
</template>

<script>
import {getBreadcrumbs} from "@/utils/routeUtil";
import ITabWithContent from "@/components/ITabWithContent";

export default {
  name: "AboutMePage",
  components: {
    ITabWithContent
  },
  data() {
    return {
      items: getBreadcrumbs(this.$route),
      tabs: ["Oracle Club", "方向介绍"],
      //todo 请求OC介绍信息
      //todo 请求方向信息
      departments: [
        {
          name: "TC",
          introduction: "在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
        }, {
          name: "DMD",
          introduction: "在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
        }, {
          name: "FIN",
          introduction: "在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
        }, {
          name: "SCM",
          introduction: "在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
        }, {
          name: "ML",
          introduction: "在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
        }, {
          name: "PS",
          introduction: "在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
        }, {
          name: "BI",
          introduction: "在互联网迅速发展的今天，浏览器的作用也从幕后走到台前，网站开发也从PC端走向移动端，越来越多的人认识到了浏览器作为客户端的作用，不管是绚丽的页面还是网页游戏，浏览器也完成了从当初的文档浏览器到无数个应用的集合的蜕变。所以，你所写的每一行代码能以最大限度进行呈现，快速的呈现在浏览器中，展示给使用者，使用者的一举一动又会导致不同的效果，最终实现一个请求响应的闭环。"
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>