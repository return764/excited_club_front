<template>
  <v-list
      subheader
      color="transparent"
  >
    <v-list-item v-for="item in items"
                 :key="item.id"
                 link
                 :href="item.to"
    >
      <v-list-item-title>
        <div class="list-tags">
          <v-chip small label v-for="tag in item.tags" :key="tag.name" :color="tag.color">{{tag.name}}</v-chip>
        </div>
        {{item.title}}
      </v-list-item-title>
      <v-list-item-subtitle class="text-right">
        {{item.date | moment("yyyy-MM-DD")}}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "IList",
  props:{
    items:{
      type: Array,
      default:()=>{
        const df = []
        for (let i = 0; i < 10; i++){
          df.push({
            id: i,
            title: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, repudiandae.",
            date: "2018-10-20",
            to: "#",
            tags:[
              {
                name:"置顶",
                color: "#C3D6E8"
              }
            ]
          })
        }
        return df
      }
    },
  }
}
</script>

<style scoped lang="scss">
::v-deep .v-list-item__title{
  flex: 6;
}

::v-deep .v-list-item__subtitle{
  flex: 1;
}
.list-tags{
  display: inline-block;
}
</style>
