<template>
<div class="tinymce-editor" >
  <textarea ref="editor" id="textarea"></textarea>
  <Spin v-show="showSpin" fix></Spin>
</div>
</template>

<script>
export default {
  name: "tiny-editor",
  props: {
    content:{
      type: String,
      default: ''
    },
    toolbar:{
      default: ' undo redo | bold italic underline | alignleft aligncenter alignright | outdent indent | formatselect | fontselect | fontsizeselect | forecolor backcolor | removeformat preview code |'
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
      let external_plugins= {}, plugins= this.plugins.replace(/ /g, '').split(',')
      // console.log(plugins)
      for(let i in plugins){
        external_plugins[plugins[i]]= '/tinymce/plugins/'+ plugins[i]+ '/plugin.min.js'
      }
      tinymce.init({
        target: this.$refs.editor,
        skin_url: '/tinymce/skins/lightgray/',
        language: 'zh_CN',
        language_url : '/tinymce/langs/zh_CN.js',
        theme_url: '/tinymce/themes/modern/theme.min.js',
        menubar: this.menubar,
        toolbar:  this.toolbar,
        plugins:  this.plugins,
        indentation : '2em',
        fontsize_formats: '12px 14px 16px 18px 20px 22px 24px',
        font_formats: '宋体=SimSun,STSong;黑体=SimHei,STHeiti;微软雅黑=Microsoft Yahei,STXinwei;楷体=KaiTi,STKaiti;新宋体=NSimSun,STZhongsong;仿宋=FangSong,STFangsong',
        content_style: '*{word-break: break-all;}',
        external_plugins: external_plugins
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

<style scoped lang="less">
.tinymce-editor{
  position: relative;
  overflow: hidden;
}
</style>
