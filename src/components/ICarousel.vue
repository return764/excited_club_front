<template>
  <v-carousel
      height="400"
      show-arrows-on-hover
      hide-delimiter-background
      delimiter-icon="mdi-minus"
  >
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
    >
      <v-sheet
          :color="colors[i]"
          height="100%"
          rounded="lg"
      >
        <v-img/>
      </v-sheet>
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