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
          <div class="author-block d-flex mb-5">
            <v-avatar class="mx-3 my-2" color="indigo">
              <v-img :src="post.issuer.avatar"></v-img>
            </v-avatar>
            <div class="d-flex flex-column justify-center flex-fill">
              <a>{{post.issuer.name}}</a>
              <div class="text-body-2 text--secondary">{{post.createdAt | moment}}</div>
            </div>
          </div>
          <div class="content" ref="content" v-resize="initialImgWidth" v-html="post.content"></div>
        </v-sheet>
        <div class="pt-5 pb-1">
          <v-sheet elevation="2" class="py-2 px-5">
            <div class="comment-head text-h6 mb-2">
              {{commentCount}}条评论
            </div>
            <comment-new :postId="post.id"/>
          </v-sheet>
        </div>

        <comment :comments="comments"/>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>

<script>
import postsApi from "@/services/posts";
import CommentNew from "@/components/bbs/CommentNew";
import Comment from "@/components/bbs/Comment";
import commentsApi from "@/services/comments";

export default {
  name: "PostPage",
  components: {CommentNew, Comment},
  data() {
    return {
      loading: {
        post: false,
        comments: false
      },
      post: {
        issuer: {}
      },
      comments: [],
      commentCount: 0,
    }
  },
  computed:{
    postId(){
      return this.$route.params.post_id
    }
  },
  mounted() {
    this.handlePost()
    this.handleComments()
    this.handleCountComment()
  },
  updated() {
    this.initialImgWidth()
  },
  methods:{
    async handlePost(){
      this.loading.post = true
      const {data} = await postsApi.get(this.postId)
      if (data)
        this.post = data
      this.loading.post = false
    },
    async handleComments(){
      this.loading.comments = true
      const {data} = await commentsApi.list(this.postId)
      if (data)
        this.comments = data
      this.loading.comments = false
    },
    async handleCountComment() {
      const {data} = await commentsApi.count(this.postId)
      if (data) {
        this.commentCount = data
      }
    },
    treeToList (tree, parent, result = [], level = 0) {
      tree.forEach(node => {
        result.push(node)
        node.level = level + 1
        node.parent = this._.omit(parent, "children")
        node.children && this.treeToList(node.children, node, result, level + 1)
        delete node.children
      })
      return result
    },
    checkComment() {
      for (let comment of this.comments) {
        if (comment.children){
          comment.children = this.treeToList(comment.children, comment)
          comment.children = this._.orderBy(comment.children, ["createdAt"], ["asc"])
        }
      }
    },
    initialImgWidth(){
      //get the width of content(select by className)
      const contentWidth = this.$refs.content.clientWidth
      //set up image width with acquired value
      const imgAll = this.$refs.content.querySelectorAll("img")
      imgAll.forEach((img)=>{
        img.style.setProperty("max-width",`${contentWidth}px`)
      })
    }
  },
  watch:{
    "loading.comments"(v, ov){
      if (ov && !v){
        this.checkComment()
      }
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
