<template>
  <div class="bbs-list">
    <v-sheet elevation="2" style="position: relative">
      <div class="posts-wrap px-5">
        <v-fade-transition group hide-on-leave>
          <template v-if="!loading">
            <div class="post-item"
                 @mouseenter="itemHover = item.id"
                 @mouseleave="itemHover = null"
                 v-for="item in posts" :key="item.id">
              <div class="post-user">
                <v-avatar color="brown">
                  <v-img :src="item.issuer.avatar"/>
                </v-avatar>
              </div>
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
              <div class="post-item-action" v-show="itemHover === item.id && isAuth && item.issuer.id === user.id">
                <v-menu bottom left nudge-bottom="30">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon small>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="handleDeletePost(item)">
                      <v-list-item-title>删除</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </template>
          <template v-else>
            <v-skeleton-loader
                v-for="item in 10" :key="item"
                type="list-item-avatar-two-line"
            ></v-skeleton-loader>
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
import {mapGetters} from "vuex";
import postsApi from "@/services/posts";

export default {
  name: "BBSList",
  components: {IPagination},
  inject: ["reload"],
  props: {
    posts: {
      type: Array,
      default: () => []

    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: () => (
          {
            page: 1,
            size: 10,
            total: 0,
            totalPages: 1
          }
      ),
    }
  },
  data(){
    return{
      itemHover: null
    }
  },
  methods: {
    handlePaginationChange(page) {
      this.$emit("pageChange", page)
    },
    async handleDeletePost({id, issuer}) {
      if (issuer.id !== this.user.id) {
        this.$message.error("只允许删除自己的帖子")
        return
      }
      const {data} = await postsApi.delete(id)
      if (data && data.result === 'ok') {
        this.reload()
      }
    }
  },
  computed: {
    ...mapGetters("account",["user", "isAuth"])
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
      .post-chips{
        display: inline-block;
      }

      .post-item-desc{
        line-height: 24px;
      }

      .post-item-action{
        position: absolute;
        right: 0;
        top: 0;
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
