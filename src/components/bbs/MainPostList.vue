<template>
  <BBSList :posts="posts" :loading="loading" @pageChange="handlePaginationChange" :pagination="pagination"/>
</template>

<script>
import BBSList from "@/components/bbs/BBSList";
import postsApi from "@/services/posts";

export default {
  name: "MainPostList",
  components: {BBSList},
  data () {
    return {
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
  methods: {
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
      console.log(v)
      if (v !== ov){
        this.routerName = v
        this.handleListPosts()
      }
    }
  }
}
</script>

<style scoped>

</style>