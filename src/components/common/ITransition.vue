<template>
<v-scroll-y-transition
  leave-absolute
  hide-on-leave
  v-if="!disabled"
>
  <slot></slot>
</v-scroll-y-transition>
  <div v-else><slot></slot></div>
</template>

<script>
export default {
  name: "ITransition",
  props:{
    disabled:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>