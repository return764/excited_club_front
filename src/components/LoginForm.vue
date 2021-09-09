<template>
  <v-dialog persistent v-model="value" max-width="600px">
    <v-card class="login-form">
      <v-card-title>
        <span></span>
        <span>登录</span>
        <v-btn text icon @click="handleCloseDialog"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col
                  cols="12">
                <v-text-field
                    label="邮箱"
                    :rules="rules.email"
                    v-model="form.email"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="密码"
                    v-model="form.password"
                    :rules="rules.password"
                    type="password"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn block text @click="$emit('toRegister')">注册</v-btn>
              </v-col>
              <v-col>
                <v-btn block color="primary" @click="handleLogin">登录</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import usersApi from "@/services/user";
import {setAuthorization} from "@/utils/request";
import {mapMutations} from "vuex";

export default {
  name: "LoginForm",
  props:["value"],
  data(){
    return {
      rules:{
        email:[val => (val || '').length > 0 || '账号不能为空',
        ],
        password:[val=>(val || '').length > 0 || '密码不能为空']
      },
      form:{
        email:null,
        password:null,
      }
    }
  },
  methods:{
    ...mapMutations("account",["setUser"]),
    handleCloseDialog(){
      this.$emit('input',false)
      this.$refs.form.reset()
    },
    handleLogin(){
      usersApi.loginEmail(this.form.email,this.form.password).then(resp=>{
        const {data,msg} = resp.data
        this.setUser(this._.omit(data,"token"))
        setAuthorization(data.token)
        this.$refs.form.reset()
        this.$emit("submit")
        this.$message.info(msg)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-form ::v-deep .v-card__title{
  justify-content: space-between;
}
</style>
