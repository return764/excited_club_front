<template>
  <div class="bbs-post">
    <v-row class="py-1">
      <v-col cols="9">
        <v-sheet elevation="2" class="py-2 px-5">
          <div class="d-flex py-5">
            <div class="title text-h4">{{post.name}}</div>
          </div>
          <div class="d-flex justify-space-between">
            <div>
              <v-chip small label>置顶</v-chip>
            </div>
            <div>
              <span class="stat-item">
                <v-icon small>
                  mdi-message-reply-outline
                </v-icon>
                1234
              </span>

              <span class="stat-item">
                <v-icon small>
                  mdi-thumb-up-outline
                </v-icon>
                {{post.likeCount}}
              </span>
            </div>
          </div>
          <div class="author-block d-flex">
            <v-avatar class="mx-3 my-2" color="indigo">
              <v-img :src="post.issuer.avatar"></v-img>
            </v-avatar>
            <div class="d-flex flex-column justify-center flex-fill">
              <a>{{post.issuer.name}}</a>
              <div class="text-body-2 text--secondary">{{post.createdAt | moment}}</div>
            </div>
          </div>
          <div class="content">{{post.content}}</div>
        </v-sheet>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>

<script>
import postsApi from "@/services/posts";

export default {
  name: "PostPage",
  data() {
    return {
      loading: false,
      post: {}
    }
  },
  computed:{
    postId(){
      return this.$route.params.post_id
    }
  },
  mounted() {
    this.handlePost()
  },
  methods:{
    handlePost(){
      this.loading = true
      postsApi.get(this.postId).then(({data})=>{
        this.post = data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
.bbs-post{
  .title{

  }
  .author-block{
    margin-top: 1.1rem;
    background-color: #F8F8F8;
  }
  .content{

  }
}
</style>
