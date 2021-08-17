<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="8">
        <transition-group
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
            :css="false"
            name="list">
          <v-row v-for="(item,index) in list" :key="item.id" :data-index="index" no-gutters class="justify-center mb-3">
            <i-news-card
              :to="`/news/${item.id}`"
              :title="item.title"
              :description="item.description"
              :head-src="item.coverImage | urlImage"
              :publish-time="item.createdAt | moment"
              :read-count="item.viewCount"
            />
            <!-- todo 列表文章省略异常  -->
          </v-row>
        </transition-group>

        <div class="text-center">
          <i-pagination
              v-model="pagination.page"
              @change="handlePaginationChange"
              :length="pagination.totalPages"
          >
          </i-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import INewsCard from "@/components/iNewsCard";
import IPagination from "@/components/common/IPagination";
import articlesApi from "@/services/articles";
import Velocity from 'velocity-animate';

export default {
  name: "NewsInform",
  components:{
    INewsCard,IPagination
  },
  data(){
    return{
      list:[],
      pagination: {
        page: 1,
        size: 10,
        sort: null,
        total: 1,
        totalPages:1,
      },
      queryParams: {
        size: 10,
        page: 0,
      }
    }
  },
  mounted() {
    // const inter = setInterval(()=>{
    //   this.count ++
    //   if (this.count >= 10){
    //     clearInterval(inter)
    //   }
    // },140)
    this.handleListArticle()
  },
  methods:{
    handleListArticle(){
      this.queryParams.size = this.pagination.size
      this.queryParams.page = this.pagination.page - 1
      console.log(this.queryParams)
      articlesApi.list(this.queryParams).then(({data})=>{
        console.log(data)
        const {content,totalElements,totalPages} = data
        this.list = content
        this.pagination.total = totalElements
        this.pagination.totalPages = totalPages
      }).catch(err=>{
        console.error(err)
      })
    },
    handlePaginationChange(page){
      this.pagination.page = page

      this.handleListArticle()
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      const delay = el.dataset.index * 300
      setTimeout(()=>{
        Velocity(
            el,
            { opacity: 1},
            { complete: done }
        )
      },delay)
    },
    leave: function (el, done){
        Velocity(
          el,
          { opacity: 1},
          { complete: done }
        )
    }
  }
}
</script>

<style lang="scss">
.list-item {
  display: inline-block;
  margin-right: 10px;
}
//.list-enter-active, .list-leave-active {
//  transition: all 1s;
//}
//.list-enter, .list-leave-to{
//  opacity: 0;
//  transform: translateY(30px);
//}
</style>
