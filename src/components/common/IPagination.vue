<template>
  <div class="i-pagination">
    <v-pagination
        class="pagination"
        :value="value"
        @input="handlePaginationChange"
        :length="length"
        :total-visible="7"
    ></v-pagination>
    <div class="field">
      <v-text-field
          label="跳转到"
          hide-details
          suffix="页"
          filled
          type="number"
          :value="toPage"
          @change="v=>{this.toPage = Number(v)}"
          solo
      >
        <v-btn color="primary"
               @click="handleGoTo"
               slot="append-outer">
          Go
        </v-btn>
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "IPagination",
  props: {
    value:{
      type: Number
    },
    length:{
      type: Number
    }
  },
  data(){
    return{
      toPage: 1
    }
  },
  methods:{
    handlePaginationChange(page){
      if (page === this.value)
        return
      this.$emit("change",page)
    },
    handleGoTo(){
      this.handlePaginationChange(this.toPage)
    }
  }
}
</script>

<style scoped lang="scss">
.i-pagination{
  .pagination{
    display: inline-block;
  }
  .field{
    display: inline-block;
    vertical-align: top;
  }
}
.i-pagination ::v-deep .v-input {
  height: 34px;
  width: 15rem;
  margin: .3rem;
  .v-input__control{
    min-height: 20px !important;
  }
  .v-input__slot{
    min-height: inherit !important;
    height: 32px;
  }
  .v-input__append-outer{
    margin-top: 0 !important;
  }
  .v-btn{
    height: 32px;
  }

}

</style>
