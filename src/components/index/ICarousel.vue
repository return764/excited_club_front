<template>
  <v-carousel
      height="100%"
      :cycle="autoPlay"
      :interval="timeout"
      show-arrows-on-hover
      hide-delimiter-background
      delimiter-icon="mdi-minus"
  >
    <v-carousel-item
        v-for="picture in pictures"
        :key="picture.id"
    >
        <v-img
            :src="picture.path"
            height="90vh"
            gradient="to top, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)"
        />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "ICarousel",
  data(){
    return{
    }
  },
  props:{
    pictures:{
      type: Array,
      required:true,
    },
    autoPlay:{
      type: Boolean,
      default: true,
    },
    timeout:{
      type:[Number,String],
      default: 6000,
    }
  }
}
</script>

<style scoped>

</style>
