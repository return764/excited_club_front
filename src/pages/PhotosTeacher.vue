<template>
  <v-container :style="{maxWidth:maxWidth}">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="i in 10" :key="i">
        <v-sheet class="teacher-card" rounded elevation="1">
          <div class="teacher-card-hd">
            <v-img src="https://via.placeholder.com/180x240"
            />
          </div>
          <div class="teacher-card-ft">
            <div class="teacher-name">
              小明
            </div>
            <div class="teacher-info">
              这是一个很优秀，及其优秀，非常优秀，究极究极优秀的好老师。
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PhotosTeacher",
  data(){
    return{

    }
  },
  computed:{
    maxWidth(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '60vw'
        case 'sm': return '75vw'
        case 'md': return '80vw'
        case 'lg': return '85vw'
        case 'xl': return '60vw'
      }
      return '90vw';
    }
  }
}
</script>

<style lang="scss">
.teacher-card{
  padding: 20px;
}
.teacher-card-hd {
  width: 180px;
  height: 240px;
  margin: 0 auto;
}
.teacher-card-ft {
  margin-top: 10px;
}

.teacher-name {
  font-size: 1.125rem;
  text-align: center;
  color: #303133;
}

.teacher-info {
  font-size: 0.9rem;
  color: #606266;
}
</style>