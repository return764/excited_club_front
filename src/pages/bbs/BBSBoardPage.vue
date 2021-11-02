<template>
  <div>
    <v-row class="pt-3 pb-1">
      <v-sheet elevation="1" min-width="100%">
        <v-chip-group class="px-2" active-class="primary" color="blue">
          <v-chip
              label
              :to="{name:'所有板块',params:{rn:'home'}}"
          >
            所有板块
          </v-chip>
          <v-chip
              label
              v-for="board in boards"
              :key="board.id"
              :to="{name:board.name,params:{rn:board.routerName}}"
          >
            {{board.name}}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-row>
    <v-row class="py-1">
      <v-col cols="9" class="pl-0">
        <router-view/>
      </v-col>
      <v-col cols="3" class="pr-0">
        <v-sheet elevation="2">
          <div class="d-flex pt-4 pb-2 pl-4">
            <v-avatar class="mr-2" color="primary" size="40">12</v-avatar>
            <div class="d-flex align-center">
              <div>RETURN小明</div>
            </div>
          </div>
          <div>
            <v-list dense>
              <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-post</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>我的话题</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-reply</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>我的回复</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-message-reply-text</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>回复我的</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-sheet>
        <v-sheet elevation="2" class="mt-4 pa-2 text-center">
          <v-btn color="primary" @click="toggleNewPost = !toggleNewPost">发布帖子<v-icon>mdi-note-edit-outline</v-icon></v-btn>
        </v-sheet>
      </v-col>
    </v-row>
    <PostNew :show.sync="toggleNewPost"/>
  </div>
</template>

<script>
import boardsApi from "@/services/boards";
import PostNew from "@/pages/bbs/PostNew";

export default {
  name: "BBSBoardPage",
  components: {PostNew},
  data() {
    return {
      boards: [],
      selectedItem:null,
      toggleNewPost: false
    }
  },
  mounted() {
    this.handleListBoard()
  },
  methods:{
    handleListBoard(){
      boardsApi.list().then(({data})=>{
        this.boards = data
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>

</style>
