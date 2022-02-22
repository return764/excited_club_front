<template>
<div>
  <v-sheet elevation="2" style="position: relative">
    <div class="posts-wrap px-5">
      <v-fade-transition hide-on-leave>
          <span v-if="!loading">
            <div class="post-item" v-for="item in posts" :key="item.id">
              <div class="post-item-content">
                <div class="post-item-title">
                  <a class="text-subtitle-1" :href="`/bbs/p/${item.id}`">{{item.name}}</a>
                  <div class="px-2 post-chips">
                    <v-chip small label class="py-1 mr-1"
                            text-color="white"
                            :color="tag.color"
                            v-for="tag in item.tags"
                            :key="tag.id">{{tag.name}}</v-chip>
                  </div>
                </div>
                <div class="post-item-desc text--secondary text-body-2">{{item.createdAt | moment}}</div>
              </div>
            </div>
          </span>
        <span v-else>
            <v-skeleton-loader
                v-for="item in 10" :key="item"
                type="list-item-avatar-two-line"
            ></v-skeleton-loader>
          </span>
      </v-fade-transition>
    </div>
  </v-sheet>
  <i-pagination
      v-model="pagination.page"
      @change="handlePaginationChange"
      :length="pagination.totalPages"
  />
</div>
</template>

<script>
import IPagination from "@/components/common/IPagination";
import postsApi from "@/services/posts";

export default {
  name: "MyTopic",
  components: {IPagination},
  data(){
    return {
      loading: false,
      posts: [],
      pagination:{
        page: 1,
        size: 10,
        total: 0,
        totalPages: 1
      },
      queryParams: {
        size: 10,
        page: 0,
      }
    }
  },
  mounted(){
    this.handleListPost()
  },
  methods: {
    handleListPost() {
      this.queryParams.size = this.pagination.size
      this.queryParams.page = this.pagination.page
      this.loading = true
      postsApi.getMyTopic(this.queryParams).then(({data})=>{
        if (data){
          const {records,total,pages} = data
          this.posts = records
          this.pagination.total = total
          this.pagination.totalPages = pages
        }
        this.loading = false
      })
    },
    handlePaginationChange(page){
      this.pagination.page = page
      this.handleListPosts()
    },
  }
}
</script>

<style scoped>

</style>
