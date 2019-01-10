<template>
<div class="tinymce-editor" >
  <textarea ref="editor" id="textarea"></textarea>
  <Spin v-show="showSpin" fix></Spin>
</div>
</template>

<script>
export default {
  name: "simple-editor",
  props: {
    content:{
      type: String,
      default: ''
    },
    toolbar:{
      default: ' undo redo | bold italic underline | alignleft aligncenter alignright | outdent indent | formatselect | fontselect | fontsizeselect | forecolor backcolor | preview  code |'
    },
    plugins:{
      default: 'textcolor, preview, fullscreen, code '
    },
    menubar:{
      default: false
    }
  },
  data(){
    return{
      showSpin: true,
      editor: null
    }
  },
  watch:{
    content(val){
      if(this.editor){
        this.editor.setContent(val)
      }
    }
  },
  mounted(){
    $.getScript('/tinymce/tinymce.min.js',()=>{
      this.init()
    });
  },
  methods:{
    init(){
      tinymce.init({
        // selector: this.multiple?'#tinymce-editor':'.tinymce-editor',
        target: this.$refs.editor,
        skin_url: '/tinymce/skins/lightgray/',
        language: 'zh_CN',
        language_url : '/tinymce/langs/zh_CN.js',
        menubar: this.menubar,
        toolbar:  this.toolbar,
        plugins:  this.plugins,
        fontsize_formats: '12px 14px 16px 18px 20px 22px 24px',
        font_formats: '宋体=SimSun,STSong;黑体=SimHei,STHeiti;微软雅黑=Microsoft Yahei,STXinwei;楷体=KaiTi,STKaiti;新宋体=NSimSun,STZhongsong;仿宋=FangSong,STFangsong'
      }).then((editor)=>{
        this.showSpin= false
        console.log('editor', editor[0])
        this.editor= editor[0]
        if(this.content){
          this.editor.setContent(this.content)
        }
      });
    },
    getContent(){
      let content= ''
      if(this.editor){
        content= this.editor.getContent()
      }
      return content
    }
  }
}
</script>

<style scoped>
.tinymce-editor{
  position: relative;
  overflow: hidden;
}
</style>
