<template>
  <i-transition>
    <router-view/>
  </i-transition>
</template>

<script>
import ITransition from "@/components/common/ITransition";
export default {
  name: "BlankLayout",
  components: {ITransition}
}
</script>

<style scoped>

</style>