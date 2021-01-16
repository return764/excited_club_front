<template>
  <div>
    <v-card
        width="100%"
        :to=to
        ref="newsCard"
        @click="handleClick"
    >
      <div class="d-flex flex-nowrap justify-space-between">
        <div>
          <v-img :aspect-ratio="1"
                 width="200"
                 :src=headSrc />
        </div>
        <div class="flex d-flex flex-nowrap flex-column card-right">
          <v-card-title class="text-left">
            {{ title }}
          </v-card-title>
          <v-card-text class="flex pb-0">
            {{ description }}
          </v-card-text>
          <v-card-actions class="px-4 d-flex justify-end">
            <v-chip small>
              <v-icon left>
                mdi-clock-outline
              </v-icon>
              {{publishTime}}
            </v-chip>
            <v-chip small>
              <v-icon left>
                mdi-eye-outline
              </v-icon>
              {{readCount}}次
            </v-chip>
          </v-card-actions>
        </div>
      </div>
    </v-card>
    <v-overlay
        :dark="false"
        :value="overlay">
      <v-sheet
          rounded
          elevation="2"
          height="90vh"
          v-click-outside="handleClickOutside"
      >
        <v-container style="height: 100%;overflow-y: scroll">
          <v-row justify="center">
            <v-col class="ma-2">
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
                  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda eius, non. Ad cum illum ipsa
                    natus officiis praesentium vero vitae. Aliquid, asperiores dignissimos dolor maxime obcaecati
                    placeat quae soluta velit.
                  </div>
                  {{content}}
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-overlay>

  </div>
</template>

<script>
export default {
  name: "iNewsCard",
  data(){
    return{
      overlay:false
    }
  },
  props: {
    to: {
      type: String,
      default: "#"
    },
    title: {
      type: String,
      default: "这里是卡片的标题"
    },
    description: {
      type: String,
      default: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A blanditiis consectetur consequatur debitis dicta dignissimos, dolore dolorem eligendi eos esse et ex hic ipsa iste itaque magni modi nemo non quibusdam quo reiciendis repellat sed voluptate? Aliquid earum explicabo labore molestias nemo quis unde voluptatibus. Error laboriosam neque provident quo."
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
  methods:{
    handleClick(){
      this.overlay = true
    },
    handleClickOutside(){
      this.overlay = false
    }
  }
}
</script>

<style scoped lang="scss">
.v-card__text{
  overflow: hidden;
}
.card-right{
  height: 200px;
}
</style>