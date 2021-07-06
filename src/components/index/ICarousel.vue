<template>
  <v-carousel
      height="100%"
      show-arrows-on-hover
      hide-delimiter-background
      delimiter-icon="mdi-minus"
  >
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
    >
        <v-img
            src="@/assets/oracle main.jpg"
            height="90vh"
            gradient="to top, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)"
        />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "ICarousel",
  data: () => {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  }
}
</script>

<style scoped>

</style>