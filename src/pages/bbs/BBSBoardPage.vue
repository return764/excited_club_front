<template>
  <div>
    <v-row class="pt-3 pb-1">
      <v-sheet elevation="1" min-width="100%">
        <v-chip-group class="px-2" mandatory active-class="primary" color="blue">
          <v-chip
              label
              to="home"
          >
            所有板块
          </v-chip>
          <v-chip
              label
              to="TC"
          >
            技术方向
          </v-chip>
          <v-chip
              label
              to="SCM"
          >
            供应链方向
          </v-chip>
          <v-chip
              label
              to="ML"
          >
            机器学习方向
          </v-chip>
          <v-chip
              label
              to="BI"
          >
            商务智能方向
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-row>
    <v-row class="py-1">
      <v-col cols="9" class="pl-0">
        <v-scale-transition>
          <router-view/>
        </v-scale-transition>
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "BBSBoardPage",
  data() {
    return {
      selectedItem:null,
    }
  }
}
</script>

<style scoped>

</style>
