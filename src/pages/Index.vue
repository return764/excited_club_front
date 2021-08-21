<template>
  <div>
    <v-responsive :aspect-ratio="16/7"
                  :height="carouselHeight"
    >
      <v-sheet
          rounded="lg"
          elevation="2"
          width="100%"
          height="100%"
      >
        <i-carousel :pictures="pictures"/>
      </v-sheet>
    </v-responsive>
    <v-container>
      <v-row
          dense
      >
        <v-col>
          <v-row :style="{width:rowWidth}" class="mb-3 mx-auto" justify="center">
            <v-col cols="12" sm="6">
              <v-card
                  elevation="2"
                  min-height="268"
                  min-width="100%"
                  flat
              >
                <v-card-title class="d-flex justify-space-between">
              <span>
                通知公告
              </span>
                  <v-btn
                      text
                      color="primary accent-4"
                      to="/news/inform"
                  >
                    更多>
                  </v-btn>
                </v-card-title>
                <v-divider/>
                <i-list :items="newsItems"/>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card
                  elevation="2"
                  min-height="268"
                  min-width="100%"
                  flat
              >
                <v-card-title class="d-flex justify-space-between">
              <span>
                最新消息
              </span>
                  <v-btn
                      text
                      color="primary accent-4"
                  >
                    更多>
                  </v-btn>
                </v-card-title>
                <v-divider/>
                <i-list/>
              </v-card>
            </v-col>
          </v-row>
          <!-- todo 构建自定义multipart 轮播组件 基于v-window或者 v-item-group -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ICarousel from "@/components/index/ICarousel";
import IList from "@/components/common/IList";
import pictureApi from "@/services/pictures";
import articlesApi from "@/services/articles";

export default {
  name: "Index",
  components: {
    ICarousel,
    IList,
  },
  data() {
    return {
      show: false,
      pictures:[],
      newsItems:[]
    }
  },
  mounted() {
    this.handleListCarousel()
    this.handleListInfo()
  },
  methods: {
    handleListCarousel(){
      pictureApi.list({
        type: 'index'
      }).then(({data}) =>{
        console.log(data)
        if (data){
          this.pictures = data.content
        }
        //todo 处理异常
      })
    },
    handleListInfo(){
      articlesApi.top(5).then(resp=>{
        //筛选data 将所需部分href构建出来
        for(const i of resp.data){
          this.newsItems.push({
            id: i.id,
            title: i.title,
            date: i.createdAt,
            to: "/news/"+i.id
          })
        }
      }).catch(err=>{
        console.error(err)
      })
    }
  },
  computed:{
    carouselHeight(){
      switch (this.$vuetify.breakpoint.name){
        case "xs":return '50vh'
        case "sm":return '60vh'
        case "md":return '70vh'
        case "lg":return '80vh'
        case "xl":return '90vh'
        default:return '70vh'
      }
    },
    rowWidth(){
      switch (this.$vuetify.breakpoint.name){
        case "xs":return '100%'
        case "sm":return '90%'
        case "md":return '78%'
        case "lg":return '80%'
        case "xl":return '68%'
        default:return '70%'
      }
    }
  }
}
</script>

<style lang="scss">
.v-card__title {
  padding: 8px 16px !important;
}
</style>
