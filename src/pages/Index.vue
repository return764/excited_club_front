<template>
  <div>
    <v-img
        src="../assets/oracle main.jpg"
        height="60vh"
        width="100vw"
        gradient="to top, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)"
    />
    <v-container>
      <v-row
          dense
      >
        <v-col>
          <v-row no-gutters class="mb-3">
            <v-sheet
                rounded="lg"
                elevation="2"
                width="100%"
            >
              <i-carousel/>
            </v-sheet>
          </v-row>
          <v-row no-gutters class="mb-3">
            <v-sheet
                rounded="lg"
                elevation="2"
                min-height="30vh"
                width="100%">
              <i-photos-list/>
            </v-sheet>
          </v-row>
          <v-row no-gutters>
            <v-sheet
                rounded="lg"
                elevation="2"
                min-height="30vh"
                width="100%">

            </v-sheet>
          </v-row>
        </v-col>

        <v-col
            cols="3"
        >
          <v-row
              no-gutters
              class="mb-3"
          >
            <v-card
                rounded="lg"
                elevation="2"
                min-height="268"
                min-width="100%"
                flat
            >
              <v-card-title class="d-flex justify-space-between">
              <span>
                最新消息
              </span>
                <v-btn
                    text
                    color="primary accent-4"
                >
                  更多>
                </v-btn>
              </v-card-title>
              <v-divider/>
              <i-list/>
            </v-card>
          </v-row>
          <v-row no-gutters>
            <v-card
                rounded="lg"
                min-height="268"
                min-width="100%"
                elevation="2"
                flat
            >
              <v-card-title class="d-flex justify-space-between">
              <span>
                最新消息
              </span>
                <v-btn
                    text
                    color="primary accent-4"
                >
                  更多>
                </v-btn>
              </v-card-title>
              <v-divider/>
              <i-list/>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ICarousel from "@/components/ICarousel";
import IList from "@/components/common/IList";
import IPhotosList from "@/components/IPhotosList";

export default {
  name: "Index",
  components: {
    ICarousel,
    IList,
    IPhotosList
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.v-card__title {
  padding: 8px 16px !important;
}
</style>