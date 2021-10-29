<template>
  <div class="bbs-post">
    <v-row class="py-1">
      <v-col cols="9">
        <v-sheet elevation="2" class="py-2 px-5">
          <div class="d-flex py-5">
            <div class="title text-h4">帖子测试，Post标题，很长。。。</div>
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
                  mdi-eye-outline
                </v-icon>
                1234
              </span>
            </div>
          </div>
          <div class="author-block d-flex">
            <v-avatar class="mx-3 my-2" color="indigo">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <div class="d-flex flex-column justify-center flex-fill">
              <a>作者</a>
              <div class="text-body-2 text--secondary">7天前</div>
            </div>
          </div>
          <div class="content"></div>
        </v-sheet>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PostPage"
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
