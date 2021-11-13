<template>
  <div class="comments">
    <v-sheet elevation="2" class="py-2 px-5">
      <div class="comment d-flex" v-for="comment in comments" :key="comment.id">
        <div class="comment-avatar py-3 pr-5">
          <v-avatar color="grey">
            12
            <!--        <v-img :src=""></v-img>-->
          </v-avatar>
        </div>
        <div class="comment-con py-3 flex-grow-1">
          <div class="comment-user text-body-2 font-weight-bold">
            {{comment.issuer.name}}
          </div>
          <div class="comment-content text-body-2 py-2">
            {{comment.content}}
          </div>
          <div class="comment-action text-caption">
            <span class="comment-time mr-2">{{comment.createdAt | moment}}</span>
            <a class="reply-ac">回复</a>
          </div>
          <div class="comment-reply" v-if="comment.children">
            <div class="reply-item" v-for="reply in comment.children" :key="reply.id">
              <div class="d-flex mt-3">
                <div class="reply-user text-body-2 font-weight-bold mr-2">
                  <v-avatar size="30" color="grey">
                    12
                    <!--        <v-img :src=""></v-img>-->
                  </v-avatar>
                </div>
                <div class="reply-con">
                  <span class="reply-user text-body-2 font-weight-bold">{{reply.issuer.name}}</span>
                  <span class="reply-content text-body-2 ml-2 text-break">
                    {{hasParentReply(reply, comment)? "回复:@" +reply.parent.issuer.name: null}}
                    {{reply.content}}</span>
                  <div class="reply-action my-2 text-caption">
                    <span class="reply-time mr-2">{{reply.createdAt | moment}}</span>
                    <a class="reply-ac">回复</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>

export default {
  name: "Comment",
  props: {
    postId: {
      type: String
    },
    comments: {
      type: Array
    },
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    hasParentReply(reply, comment) {
      return reply?.parent.id !== comment.id;
    },
    // getParentReplyName(reply) {
    //   const commentId = this.comment.id
    //   const replyParentId = reply.parentId
    //   if (replyParentId === commentId){
    //     return null
    //   }
    //
    //   for (const reply of this.comment.children) {
    //     if (reply.id === replyParentId){
    //       return reply.issuer.name
    //     }
    //   }
    //   return null
    // }
  },
}
</script>

<style lang="scss" scoped>
.comment{
  .comment-con {
    border-top: 1px solid #f5f5f5;
  }
  &:first-child .comment-con {
    border-top: 0;
  }
}
</style>
