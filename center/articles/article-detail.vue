<template>
<div style="padding: 10px 20px" class="article-detail">
  <Form ref="form" :rules="ruleValidate"  :model="detail" :label-width="80" >
    <FormItem label="文章标题" prop="title">
      <Input type="text" v-model="detail.title" ></Input>
    </FormItem>
    <FormItem label="文章类型" prop="infoType" style="width: 300px">
      <!--<Input type="text" v-model="detail.infoType" ></Input>-->
      <Select v-model="detail.infoType">
        <Option v-for="(item, index) in typeList" :key="index" :value="item.id">{{item.codeDesc}}</Option>
      </Select>
    </FormItem>
    <FormItem label="文章来源" prop="dataFrom">
      <Input type="text" v-model="detail.dataFrom" ></Input>
    </FormItem>
    <FormItem label="文章标识" prop="customFlag">
      <Input type="text" v-model="detail.customFlag" ></Input>
    </FormItem>
    <FormItem label="文章内容" prop="content">
      <div id="articlecontainer"></div>
    </FormItem>
    <FormItem label="封面图片" prop="code">
      <div class="pic-block">
        <!--<Button type="primary" @click="">上传图片</Button>-->
        <compress-upload-button @done="upPic"></compress-upload-button>
        <Input type="text" v-model="detail.photo" placeholder="图片地址"></Input>
      </div>
      <div class="pic"><img v-img v-show="detail.photo" :src="detail.photo"/></div>
    </FormItem>
    <FormItem>
      <Button @click="$router.go(-1)">返回</Button>
      <Button type="info"  @click="preview">预览</Button>
      <Button type="primary" @click="save">提交</Button>
    </FormItem>
  </Form>

  <Modal
    v-model="showPreview"
    title="预览"
    width="80"
    class="table-modal-detail"
    :transition-names="['', '']">
    <public-article-detail :title="detail.title" :detail="detail.content"></public-article-detail>
  </Modal>
</div>
</template>

<script>
  import CompressUploadButton from '~/components/compress-upload-button.vue'
  import PublicArticleDetail from '~/components/public-article-detail.vue'
	export default {
		name: "article-detail",
    components: {
      CompressUploadButton,
      PublicArticleDetail
    },
    // head () {
    //   return {
    //     script: [
    //       { type: 'text/javascript', src: '/ueditor/ueditor.config.js'},
    //       { type: 'text/javascript', src: '/ueditor/ueditor.all.js' },
    //       { type: 'text/javascript', src: '/ueditor/lang/zh-cn/zh-cn.js'},
    //       { type: 'text/javascript', src: '/ueditor/addCustomizeDialog.js'},
    //     ],
    //   }
    // },
    data(){
      let rule= [{ required: true, message:'必填项不能为空'}]
      return{
        ue: null,
        detail:{
          title: '',
          infoType: '',
          dataFrom: '',
          content: '',
          photo: '',
          customFlag: ''
        },
        ruleValidate : {
          title: rule,
          infoType: rule,
        },
        typeList:[],
        showPreview: false
      }
    },
    mounted(){
      $.getScript('/ueditor/ueditor.config.js',()=>{
        $.getScript('/ueditor/ueditor.all.js',()=>{
          $.getScript('/ueditor/lang/zh-cn/zh-cn.js',()=>{
            $.getScript('/ueditor/addCustomizeDialog.js',()=>{
              this.init()
            })
          })
        })
      })

      console.log('route', this.$route)

    },
    methods:{
		  init(){
        let width= document.querySelector("#articlecontainer").offsetWidth
        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function(action) {
          if (action == 'uploadimage' ) {
            return '/proxy/file/image/add'
          } else if(action == 'uploadfile'){
            return '/proxy/file/add'
          }else{
            return this._bkGetActionUrl.call(this, action);
          }
        };
        UE.Editor.prototype.token= this.$store.state.user.token
        this.ue = UE.getEditor('articlecontainer',{
          initialFrameWidth: width,
          scaleEnabled: false,
          zIndex: 1,
          catchRemoteImageEnable:false
        });

        let id= this.$route.query.id
        if(id) this.getDetail(id)
        this.getType()
      },
		  getType(){
        this.$axios.$get('/infopublic/public/info/category').then( (res) => {
          this.typeList= res.items
        })
      },
      upPic(res){
        if(res.code=='0'){
          this.detail.photo= res.item.path
        }
      },
      getDetail(id){
        this.$axios.$post('/infopublic/detail/'+ id, {}).then( (res) => {
          if(res.code== '0'){
            this.detail={
              infoId: res.item.id,
              title: res.item.title,
              infoType: res.item.typeId,
              dataFrom: res.item.dataFrom,
              content: res.item.content,
              photo: res.item.photo,
              customFlag: res.item.customFlag
            }
            this.ue.ready( ()=> {
              this.ue.setContent(res.item.content)
            });

          }
        })
      },
      preview(){
        this.detail.content= this.ue.getContent()
        this.showPreview= true
      },
      save(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            let url= ''
            if(this.$route.query.id){
              url= '/infopublic/update'
            }else{
              url= '/infopublic/add'
            }
            this.detail.content= this.ue.getContent()
            this.$axios.$post(url, this.detail).then( (res) => {
              if(res.code== '0'){
                this.$Message.success({
                  content: '编辑成功',
                  duration: 2,
                  onClose(){
                    history.go(-1)
                  }
                })
              }
            })
          } else {
            this.$Message.error('请输入必填项!');
          }
        })
      },
    },
    // beforeRouteLeave(to, from, next){
    //   this.ue.destroy()
    //   this.ue= null
    //   next();
    // }
	}
</script>

<style scoped lang="less">
#articlecontainer{
  min-height: 500px;
  overflow: hidden;
  line-height: normal;
}
  .pic-block{
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    button{
      margin-right: 10px;
    }
  }
  .pic{
    width: 300px;
    img{
      max-width: 100%;
      height: auto;
    }
  }
</style>
