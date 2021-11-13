<template>
<div class="comment-new">
  <v-sheet elevation="2" class="py-2 px-5">
    <div>
      <div class="comment-head text-h6 mb-2">
        0条评论
      </div>
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
            :value="value"
            no-resize
            dense
        >
          <template slot-scope="{props}" slot="counter">
            {{props.value}}/{{props.max}}字
          </template>
        </v-textarea>
      </div>
      <div v-show="showAction" class="comment-action text-right">
        <v-btn small color="primary">回复</v-btn>
      </div>
    </div>
  </v-sheet>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CommentNew",
  data() {
    return {
      max: 500,
      value: "",
      inputRows: 1,
      showAction: false
    }
  },
  computed:{
    ...mapGetters("account",["user"]),
  },
  methods:{
    handleBlur(){
      this.inputRows = 1
      this.showAction = false
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
