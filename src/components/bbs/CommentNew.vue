<template>
  <div class="comment-new">
    <div class="comment-middle d-flex">
      <v-avatar class="mr-2">
        <v-img :src="user.avatar"/>
      </v-avatar>
      <v-textarea
          :counter="max"
          :maxLength="max"
          ref="tt"
          outlined
          :rows="inputRows"
          @blur="handleBlur"
          @focus="handleFocus"
          placeholder="在此处评论..."
          v-model="comment.content"
          no-resize
          dense
      >
        <template slot-scope="{props}" slot="counter">
          {{props.value}}/{{props.max}}字
        </template>
      </v-textarea>
    </div>
    <div v-show="showAction" class="comment-action text-right">
      <v-btn small color="primary" @click="handlePublish">回复</v-btn>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commentsApi from "@/services/comments";

export default {
  name: "CommentNew",
  props: {
    postId: {
      type: String
    },
    parentId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      max: 500,
      inputRows: 1,
      showAction: false,
      comment: {
        parentId: null,
        content: "",
        postId: null,
        issuerId: null
      }
    }
  },
  computed:{
    ...mapGetters("account",["user"]),
  },
  methods:{
    async handlePublish() {
      this.comment.postId = this.postId
      this.comment.issuerId = this.user.id
      this.comment.parentId = this.parentId
      const {data} = await commentsApi.publish(this.comment)
      if (data && data.result === "ok") {
        this.$message.success("评论成功~")
        this.comment.content = ""
        this.$emit("after")
        //TODO 异步刷新组件 并新增分页
      }
    },
    handleBlur(){
      if (!this.comment.content){
        this.inputRows = 1
        this.showAction = false
      }
    },
    handleFocus(){
      this.inputRows = 5
      this.showAction = true
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-new{
  .comment-middle ::v-deep .v-counter{
    font-size: 16px;
    min-height: 16px;
    line-height: 16px;
  }
}
</style>
