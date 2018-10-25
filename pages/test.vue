<template>
<div style="padding: 10px 20px" id="erss">
  <Form ref="form" :rules="ruleValidate"  :model="detail" :label-width="80" >
    <FormItem label="文章标题" prop="name">
      <Input type="text" v-model="detail.name" ></Input>
    </FormItem>
    <FormItem label="文章类型" prop="code">
      <Input type="text" v-model="detail.code" ></Input>
    </FormItem>
    <FormItem label="文章来源" prop="code">
      <Input type="text" v-model="detail.code" ></Input>
    </FormItem>
    <FormItem label="文章内容" prop="code">
      <div id="articlecontainer"></div>
    </FormItem>
    <FormItem label="封面图片" prop="code">
      <div class="pic-block">
        <!--<Button type="primary" @click="">上传图片</Button>-->
        <compress-upload-button></compress-upload-button>
        <Input type="text" v-model="detail.code" placeholder="图片地址"></Input>
      </div>
      <div class="pic"><img v-show="detail.code" :src="detail.code"/></div>
    </FormItem>
    <FormItem>
      <Button @click="$router.go(-1)">返回</Button>
      <Button type="info"  @click="">预览</Button>
      <Button type="primary" @click="">提交</Button>
    </FormItem>
  </Form>

</div>
</template>

<script>
  import CompressUploadButton from '~/components/compress-upload-button.vue'
	export default {
		name: "article-detail",
    layout: 'common',
    components: {
      CompressUploadButton,
    },
    head () {
		  console.log('head!!!')
      return {
        script: [
          { type: 'text/javascript', src: '/ueditor/ueditor.config.js'},
          { type: 'text/javascript', src: '/ueditor/ueditor.all.js' },
          { type: 'text/javascript', src: '/ueditor/lang/zh-cn/zh-cn.js'},
          { type: 'text/javascript', src: '/ueditor/addCustomizeDialog.js'},
        ]
      }
    },
    data(){
      return{
        ue: null,
        detail:{

        }
      }
    },
    mounted(){
		  // console.log($('#erss'))
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
    },
    beforeRouteLeave(to, from, next){
      this.ue.destroy()
      this.ue= null
      next();
    }
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
