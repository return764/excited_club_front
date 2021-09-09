export default {
  computed:{
    width(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '90vw'
        case 'sm': return '590px'
        case 'md': return '854px'
      }
      return '1160px';
    }
  }
}
