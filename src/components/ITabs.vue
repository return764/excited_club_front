<template>
  <v-item-group tag="ul" class="i-tabs">
    <v-item v-for="(route,i) in tabRoutes"
            :key="i">
        <v-menu v-if="route.children"
                offset-y
                :nudge-width="50"
                :nudge-left="25"
                :nudge-bottom="25"
                close-delay="200">
          <template v-slot:activator="{ on: menu, attrs }">
            <v-btn large text
                   v-bind="attrs"
                   v-on="{ ...menu }"
                   :class="{'i-tab-active':isActivated(route.fullPath)}"
                   class="i-tab"
            >
              {{route.meta.name}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group
                color="primary"
            >
              <v-list-item
                  v-for="(it,i) in _.filter(route.children,v=>!v.meta.invisible)"
                  :to="it.fullPath"
                  :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{it.meta.name}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-btn class="i-tab"
               :class="{'i-tab-active':isActivated(route.fullPath)}"
               @click="$router.push(route.fullPath)" v-else large text>{{route.meta.name}}</v-btn>
    </v-item>
  </v-item-group>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ITabs",
  computed:{
    ...mapGetters("route", [
      "tabRoutes"
    ]),
  },
  methods:{
    isActivated(route){
      return this.$route.fullPath.startsWith(route)
    }
  }
}
</script>

<style lang="scss">
.i-tabs{

}
.i-tab-active{


}
.i-tab-active::after{
  content: "";
  position: absolute;
  width: 30px;
  height: 2px;
  background-color: #1890ff;
  bottom: 0;
}
.i-tab{
  min-width: 100px !important;
}
</style>
