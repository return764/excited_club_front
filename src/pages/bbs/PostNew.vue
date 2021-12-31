<template>
<div class="post-new text-center">
  <v-bottom-sheet content-class="sheet-bottom"
                  :no-click-animation="true"
                  transition="slide-y-reverse-transition" inset width="1000px" persistent hide-overlay v-model="show">
    <v-sheet
        class="text-center"
        ref="bs"
        height="280px"
        rounded
    >
      <div class="d-flex justify-space-between header">
        <div class="flex-grow-1">
          <v-text-field
              label="标题"
              class="post-title"
              flat
              v-model="insertParams.name"
              solo
          ></v-text-field>

        </div>
        <div class="opt d-flex flex-grow-0">
          <v-select
              style="width: 12rem"
              v-model="selectedTagIds"
              :items="tags"
              item-text="name"
              item-value="id"
              label="标签" flat
              chips multiple small-chips
              dense solo single-line
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
              <span
                  v-if="index === 1"
                  class="grey--text text-caption"
              >
          (+{{ tags.length - 1 }} others)
        </span>
            </template>
          </v-select>
          <v-btn text color="primary"
                 :loading="publishing"
                 :disabled="publishing"
                 @click="publish"
                  >发布</v-btn>
          <v-icon color="error"
                  @click="windowMinus">mdi-minus</v-icon>
          <v-icon color="error"
                  @click="windowMaximize">mdi-window-maximize</v-icon>
          <v-icon color="error"
                  @click="windowClose">mdi-close</v-icon>
        </div>
      </div>
      <div id="editor" class="my-3">
        <mavon-editor v-model="md"
                      ref="editor"
                      :toolbars="toolbars"
                      @change="inputMd"
                      @imgAdd="imageUpload"
                      :externalLink="false"
                      style="height: 100%"></mavon-editor>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import postsApi from "@/services/posts";
import {mapGetters} from "vuex";
import tagsApi from "@/services/tags";

export default {
  name: "PostNew",
  model:{
    prop:"show"
  },
  props:{
    show:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      insertParams:{
        name: "",
        content: "",
        issuerId: "",
        boardName: "",
        tags: ""
      },
      publishing: false,
      md: "",
      selectedTagIds: [],
      tags: ['置顶','TC','SCM'],
      animatedTimeout: -1,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        help: true, // 帮助
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        preview: true, // 预览
      }
    }
  },
  mounted() {
    this.handleTags()
  },
  methods:{
    windowMinus(){
      const bs = this.$refs.bs.$el.parentNode
      const height = bs.getBoundingClientRect().height - 62
      bs.style.setProperty("--transy",`${height}px`)
    },
    windowMaximize(){
      const bs = this.$refs.bs.$el.parentNode
      bs.style.setProperty("--transy","-500px")
    },
    windowClose(){
      const bs = this.$refs.bs.$el.parentNode
      this.$emit('update:show',false)
      window.clearTimeout(this.animatedTimeout)
      this.animatedTimeout = setTimeout(()=> {
        bs.style.setProperty("--transy","0")
      },500)
    },
    inputMd(value, render){
      // render 为 markdown 解析后的结果
      this.insertParams.content = render;
    },
    async handleTags() {
      let {data} = await tagsApi.list()
      this.tags = data
    },
    async imageUpload(filename, file) {
      let formData = new FormData()

      formData.append('image', file)
      const {data} = await postsApi.uploadImage(formData)
      this.$refs.editor.$img2Url(filename, process.env.VUE_APP_API_BASE_URL+"/"+encodeURI(data))
    },
    async publish() {
      this.insertParams.issuerId = this.user.id
      this.insertParams.boardName = this.user.departmentName
      this.insertParams.tags = this.selectedTagIds.join(",")
      if (this.insertParams.name === "") {
        this.$message.warning("标题不能为空")
        return
      }
      this.publishing = true
      const {data} = await postsApi.insert(this.insertParams)
      if (data.result === "ok"){
        this.publishing = false
        this.$message.success("发布成功!")
        this.windowClose()
      }
    }
  },
  computed:{
    ...mapGetters("account",["user"])
  },
  watch:{
    show(v){
      if (v){
        window.addEventListener("wheel",(event)=>event.stopPropagation(), true)
      }
    },
    selectedTagIds() {
      console.log(this.selectedTagIds.join(","))
    }
  }
}
</script>

<style lang="scss" scoped>
#editor {
  margin: auto;
  height: 580px;
}
::v-deep .v-dialog{
  transform: translateY(var(--transy));
}
.header{
  padding: 15px 10px 0;
}
.opt > button + button{
  padding-left: 5px;
}
::v-deep .v-input__control,::v-deep .v-input__slot{
  min-height: 20px !important;
  height: 32px;
}
::v-deep .v-input__slot{
  margin-bottom: 0;
}
</style>
