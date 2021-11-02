<template>
  <div class="bbs-list">
      <v-sheet elevation="2" style="position: relative">
      <div class="posts-wrap px-5">
        <v-fade-transition hide-on-leave>
          <span v-if="!loading">
            <div class="post-item" v-for="item in posts" :key="item.id">
              <div class="post-user">
                <v-avatar color="brown">
                  <v-img :src="item.issuer.avatar"/>
                </v-avatar>
              </div>
              <div class="post-item-content">
                <div class="post-item-title"><a :href="`/bbs/p/${item.id}`">{{item.name}}</a></div>
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
<!--      <v-overlay :absolute="true" :opacity="0.1" :value="loading">-->
<!--        <v-progress-circular-->
<!--            indeterminate-->
<!--            color="primary"-->
<!--            size="64"-->
<!--        ></v-progress-circular>-->
<!--      </v-overlay>-->
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
  name: "BBSList",
  components: {IPagination},
  data(){
    return{
      posts: [],
      loading: false,
      routerName: 'home',
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
  methods:{
    handleListPosts(){
      this.queryParams.size = this.pagination.size
      this.queryParams.page = this.pagination.page
      this.loading = true
      postsApi.list(this.routerName, this.queryParams).then(({data})=>{
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
  },
  mounted() {
    const splitRoute = this.$route.path.split("/")
    this.routerName = this.$route.params.rn || splitRoute[splitRoute.length - 1]
    this.handleListPosts()
  },
  watch:{
    "$route.params.rn"(v, ov){
        if (v !== ov){
          this.routerName = v
          this.handleListPosts()
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.bbs-list{
  .posts-wrap{
    .post-item{
      position: relative;
      min-height: 76px;
      padding: 14px 0 14px 60px;
      .post-user{
        position: absolute;
        left: 0;
        top: 14px;
      }

      .post-item-desc{
        line-height: 24px;
      }
    }

    a {
      text-decoration: none;
    }
  }

  .posts-wrap span > div + div, .posts-wrap > div + div {
    border-top: 1px solid #f5f5f5;
  }

  ::v-deep .v-skeleton-loader__list-item-avatar-two-line{
    min-height: 76px;
    padding: 0;
  }
  ::v-deep .v-skeleton-loader__list-item-avatar-two-line .v-skeleton-loader__avatar{
    width: 48px;
    height: 48px;
  }
}

</style>
