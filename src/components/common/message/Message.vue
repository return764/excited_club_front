<template>
  <div class="i-message">
    <transition-group name="fade" tag="span">
      <v-snackbar
        top
        absolute
        v-for="it in instances"
        :key="it._name"
        :color="it.color"
        v-model="it.visible"
        timeout="-1">
        {{it.message}}
      </v-snackbar>
    </transition-group>
  </div>
</template>

<script>
let mid = 0
let defaultOption = {
  visible:true,
  timeout:3000
}
export default {
  name: "Message",
  mounted() {
  },
  data(){
    return{
      visible:this.show,
      instances: [],
    }
  },
  methods:{
    msg(message,option = {}){
      let _name = this.getName()
      option = Object.assign({
        _name,
        message
      },defaultOption,option)
      console.log(option)
      this.instances.push(option)

      setTimeout(()=>{
        console.log(1)
        this.remove(_name)
      },option.timeout || this.timeout)
    },
    getName(){
      return 'msg_'+ (mid ++)
    },
    remove(_name){
      let index = this.instances.findIndex(item => item._name === _name)
      this.instances.splice(index, 1)
    }
  },
  watch:{
    show(v){
      this.visible = v
      this.$emit("visible",v)
    }
  }
}
</script>

<style lang="scss">
.i-message{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  position: fixed;
  top: 16px;
  left: 0;
  z-index: 1010;
  width: 100%;
  pointer-events: none;
  & .v-snack--absolute{
    position: relative;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
