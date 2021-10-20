<template>
  <v-container class="user-info">
    <v-row justify="center">
      <v-sheet
          elevation="2"
          :width="width"
          min-height="90vh"
          class="pt-10 px-5 d-flex"
      >
        <v-container>
          <v-row justify="center">
            <v-col cols="1" align-self="right">
              <v-subheader class="user-info-label">姓名:</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field solo label="姓名" v-model="params.name"/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="1" align-self="right">
              <v-subheader class="user-info-label">邮箱:</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field solo label="邮箱" v-model="params.email" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="1" align-self="right">
              <v-subheader class="user-info-label">昵称:</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field solo label="昵称" v-model="params.nickname"/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="1" align-self="right">
              <v-subheader class="user-info-label">学号:</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-text-field solo label="学号" v-model="params.stuNum"/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="1" align-self="right">
              <v-subheader class="user-info-label">自我介绍:</v-subheader>
            </v-col>
            <v-col cols="6">
              <v-textarea solo label="自我介绍" v-model="params.info"/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="7">
              <v-btn style="float: right" color="primary" @click="handleSubmit">保存</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import mixins from "@/mixins"
import {mapGetters, mapMutations} from "vuex"
import usersApi from "@/services/user";

export default {
  name: "UserInfoPage",
  mixins:[mixins],
  data(){
    return{
      params: {}
    }
  },
  mounted() {
    this.params = this.user
  },
  computed:{
    ...mapGetters("account",["user"])
  },
  methods:{
    ...mapMutations("account",["setUser"]),
    handleSubmit(){
      usersApi.update(this.params).then(({data})=>{
        if (data.result === "ok"){
          this.$message.success(data.msg);
          this.setUser(data.data)
        }
      })
    }
  },
  watch:{
    user(value){
      this.params = value
    }
  }
}
</script>

<style scoped lang="scss">
.user-info{
  .user-info-label{
    float: right;
  }
  ::v-deep .col{
    padding: 0;
  }
}

</style>
