<template>
  <div class="pl-4 avatar-menu">
    <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
            icon
            x-large
            v-on="on"
        >
          <v-avatar
              color="brown"
              size="48"
          >
            <v-img :src="user.avatar"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar
                color="brown"
            >
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
            <h3>{{ user.nickname }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn
                text
            >
              修改信息
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn
                text
            >
              登出
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "AvatarMenu",
  props:["user"]
}
</script>

<style scoped>
.avatar-menu{
}
</style>
