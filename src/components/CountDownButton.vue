<template>
  <v-btn :disabled="counting" @click="handleClick" v-bind="$props">
    <template v-if="counting">{{this.time}}秒</template>
    <slot v-else></slot>
  </v-btn>
</template>
<script>
import {VBtn} from 'vuetify/lib'

export default {
  name: "CountDownButton",
  props:{
    ...VBtn.options.props,
    timed:{
      type: Number,
      default: 30
    }
  },
  data(){
    return{
      time : this.timed,
      counting : false,
    }
  },
  mounted() {
    console.log(this.$listeners)
  },
  methods:{
    handleClick(){
      this.countDown()
      console.log(3)
      this.$listeners.click()
    },
    countDown(){
      this.counting = true
      const timeout = setInterval(()=>{
        if (this.time <=0){
          this.counting = false
          this.time = this.timed
          clearInterval(timeout)
        }
        this.time --
      },1000)
    }
  }
}
</script>

<style scoped>

</style>
