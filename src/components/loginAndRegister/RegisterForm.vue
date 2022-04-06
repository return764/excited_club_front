<template>
  <v-dialog persistent v-model="value" max-width="600px">
    <v-card class="register-form">
      <v-card-title>
        <span></span>
        <span>注册</span>
        <v-btn text icon @click="handleCloseDialog"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-stepper
            flat
            v-model="step">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form ref="form1" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          label="邮箱*"
                          :rules="rules.email"
                          v-model="form.email"
                          validate-on-blur
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                          label="密码*"
                          :rules="rules.password"
                          v-model="form.password"
                          type="password"
                          validate-on-blur
                          required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="form.password">
                      <v-text-field
                          label="第二次密码*"
                          :rules="handlePasswordCheck()"
                          v-model="password1"
                          type="password"
                          required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <small>*表示必填字段</small>
                  <v-row>
                    <v-col>
                      <v-btn block text @click="handleCloseDialog">取消</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn block color="primary" @click="handleToStep2">下一步</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-form ref="form2">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                          label="手机号码"
                          v-model="form.phNum"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                          label="学号"
                          v-model="form.stuNum"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          label="昵称"
                          v-model="form.nickname"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <small>*表示必填字段</small>
                  <v-row>
                    <v-col>
                      <v-btn block color="primary" @click="step = 1">上一步</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn block color="primary" @click="handleRegisterAndLogin">完成并登录</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import usersApi from "@/services/user";
import {setAuthorization} from "@/utils/request";
import {mapMutations} from "vuex";

export default {
  name: "RegisterForm",
  props:["value"],
  data(){
    return {
      step:1,
      rules:{
        email:[
            val => (val || '').length > 0 || '邮箱不能为空',
            val => (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g.test(val) || '邮箱格式错误')
        ],
        password:[val=>(val || '').length > 0 || '密码不能为空'],
      },
      form:{
        email: null,
        password: null,
        stuNum: null,
        nickname: null,
        phNum: null,
      },
      password1: null,
    }
  },
  methods:{
    ...mapMutations("account",["setUser"]),
    handleCloseDialog(){
      this.$emit('input',false)
      this.$refs.form1.reset()
    },
    handlePasswordCheck(){
      return [val=> val === this.form.password || '两次密码不致']
    },
    handleToStep2(){
      let formValidate = this.$refs.form1.validate()
      if (formValidate){
        this.step = 2
      }
    },
    handleRegisterAndLogin(){
      usersApi.register(this.form).then(resp=>{
        const {data,msg} = resp.data
        this.setUser(this._.omit(data,"token"))
        setAuthorization(data.token)
        this.$emit("submit")
        this.formReset()
        this.$message.info(msg)
      })
    },
    formReset(){
      this.$refs.form1.reset()
      this.$refs.form2.reset()
      this.step = 1
    }
  },
}
</script>

<style scoped lang="scss">
.register-form ::v-deep .v-card__title{
  justify-content: space-between;
}
.register-form ::v-deep .v-stepper__content{
  padding: 0;
}
</style>
