<template>
  <div class="reply-me">
    <v-sheet elevation="2" style="position: relative">
      <div class="comments-wrap px-5">
        <v-fade-transition hide-on-leave group>
          <template v-if="!loading">
            <div class="py-3" v-for="item in replyMeList" :key="item.rmr.id">
              <div class="comment-item d-flex">
                <div class="comment-user mr-3">
                  <v-avatar color="brown" size="46">
                    <v-img :src="item.rmr.issuer.avatar"/>
                  </v-avatar>
                </div>
                <div class="comment-item-content flex">
                  <div class="comment-item-title text-body-2 mb-2">
                  <span class="mr-2">
                    <a class="text-decoration-none" href="#">{{item.rmr.issuer.name}}</a>
                  </span>
                    <span class="d-inline-block text--secondary">回复了我的评论</span>
                  </div>
                  <div class="text--primary text-body-2 mb-2">
                    {{item.rmr.content}}
                  </div>
                  <div class="d-flex text--secondary text-caption">
                    <span class="mr-2">{{item.rmr.createdAt | moment}}</span>
                    <div class="comment-action">
                      <v-btn text x-small @click="openReplyArea(item.rmr.id)">
                        <v-icon left>mdi-reply</v-icon>
                        回复
                      </v-btn>
                    </div>
                  </div>
                </div>
                <div class="comment-source text-body-2 text--disabled font-weight-medium">
                  {{item.sourceContent}}
                </div>
              </div>
              <comment-new v-if="newReplyShowId === item.rmr.id" class="mt-2" :hidden-avatar="true" @after="handleReply" :rootId="item.rmr.rootId" :postId="item.rmr.postId" :parentId="item.rmr.id" />
            </div>
          </template>
        </v-fade-transition>
      </div>
    </v-sheet>

    <i-pagination
        :value="pagination.page"
        @change="handlePaginationChange"
        :length="pagination.totalPages"
    />
  </div>
</template>

<script>
import IPagination from "@/components/common/IPagination";
import usersApi from "@/services/user";
import CommentNew from "@/components/bbs/CommentNew";

export default {
  name: "ReplayMe",
  components: {CommentNew, IPagination},
  data() {
    return {
      replyMeList: [],
      loading: false,
      pagination: {
        page: 1,
        size: 10,
        totalPages: 1
      },
      queryParams: {
        size: 10,
        page: 1,
      },
      newReplyShowId: null
    }
  },
  mounted() {
    this.handleList();
  },
  methods: {
    handleList() {
      this.queryParams.page = this.pagination.page
      this.queryParams.size = this.pagination.size
      usersApi.getReplayMe(this.queryParams).then(({data}) => {
        if (data){
          const {records,total,pages} = data
          this.replyMeList = records
          this.pagination.total = total
          this.pagination.totalPages = pages
        }
      })
    },
    handlePaginationChange(page) {
      this.pagination.page = page
      this.handleList();
    },
    handleReply() {
      this.newReplyShowId = null
    },
    openReplyArea(id) {
      this.newReplyShowId = id
    }
  }
}
</script>

<style lang="scss">
.comment-source{
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.comments-wrap span > div + div {
  border-top: 1px solid #f5f5f5;
}
</style>
