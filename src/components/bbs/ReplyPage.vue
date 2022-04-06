<template>
  <div class="comment-reply">
    <div class="reply-item" v-for="reply in comments" :key="reply.id">
      <div class="d-flex mt-3">
        <div class="reply-user text-body-2 font-weight-bold mr-2">
          <v-avatar size="30" color="grey">
            <v-img :src="reply.issuer.avatar"></v-img>
          </v-avatar>
        </div>
        <div class="reply-con">
          <span class="reply-user text-body-2 font-weight-bold">{{reply.issuer.name}}</span>
          <span class="reply-content text-body-2 ml-2 text-break">
                    {{hasParentReply(reply)? "回复:@" +reply.parent.issuer.name: null}}
                    {{reply.content}}</span>
          <div class="reply-action my-2 text-caption">
            <span class="reply-time mr-2">{{reply.createdAt | moment}}</span>
            <a class="reply-ac" v-if="user && user.id !== reply.issuer.id" @click="handleOpenNewComment(reply.id)">回复</a>
          </div>

        </div>
      </div>
      <comment-new class="my-4" @after="handleReply" :rootId="commentId" :postId="postId" :parentId="reply.id" v-if="showId === reply.id" />
    </div>
    <div class="reply-pagination text-caption" v-if="this.pagination.totalPages > 1">
      <span class="pr-2">共{{ this.pagination.totalPages }}页</span>
      <span class="mx-1" v-if="this.pagination.page > 1" @click="prev">上一页</span>
      <template v-for="p in this.pagination.totalPages">
        <span class="mx-1" :class="p=== pagination.page ? 'page-active' : ''" :key="p" @click="handleClickPage(p)">
        {{ p }}
        </span>
      </template>
      <span class="mx-1" v-if="this.pagination.page < this.pagination.totalPages" @click="next">下一页</span>
    </div>
  </div>
</template>

<script>
import CommentNew from "@/components/bbs/CommentNew";
import commentsApi from "@/services/comments";
import {mapGetters} from "vuex";

export default {
  name: "ReplyPage",
  components:{CommentNew},
  props: {
    commentId: {
      type: String
    },
    postId: {
      type: String
    }
  },
  data() {
    return {
      queryParams: {
        page: 1,
        size: 5,
        commentId: ''
      },
      pagination: {
        page: 1,
        size: 5,
        total: 1,
        totalPages:1,
      },
      comments: [],
      showId: null
    }
  },
  computed: {
    ...mapGetters("account",["user"])
  },
  methods: {
    hasParentReply(reply) {
      if (!reply.parent) {
        return false
      }
      return reply.parent?.id !== this.commentId;
    },
    async handlePageReply() {
      this.queryParams.page = this.pagination.page
      this.queryParams.commentId = this.commentId
      const {data} = await commentsApi.pageReply(this.queryParams)
      this.comments = this.formatReply(data.records)
      this.$forceUpdate()
      this.pagination.total = data.total
      this.pagination.totalPages = data.pages
      this.pagination.size = data.size
      this.pagination.page = data.current
      console.log(data)
    },
    handleReply() {
      this.showId = null
      this.$emit("after")
    },
    formatReply(comments) {
      // todo 每次遍历comments收集comment的parentId 传递到后端获取commentVO的列表
      for (const comment of comments) {
        const {parentId} = comment
        if (parentId === this.commentId) {
          comment.parent = null
          continue
        }

        for (const c of comments) {
          if (c.id === parentId) {
            comment.parent = c
          }
        }
      }
      return comments
    },
    handleOpenNewComment(replyId) {
      this.showId = replyId
    },
    prev() {
      this.pagination.page -= 1
      this.handlePageReply()
    },
    next() {
      this.pagination.page += 1
      this.handlePageReply()
    },
    handleClickPage(p) {
      this.pagination.page = p
      this.handlePageReply()
    }
  },
  watch: {
    commentId: {
      handler: function (v) {
        if (v) {
          this.handlePageReply()
        }
      },
      immediate: true
    },
    comments: {
      handler: function () {
      }
    }
  }
}
</script>

<style lang="scss">
@import "~vuetify/src/styles/styles.sass";

.page-active {
  color: map-deep-get($blue,'darken-2');
}
</style>
