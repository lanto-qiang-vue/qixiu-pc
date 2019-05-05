<template>
  <div class="img-group-upload">
      <div class="demo-upload-list" v-for="(item, index ) in uploadList" :key="index">
        <img :src="imgData['img-'+item] ||item" v-img :ref="'img'+index">
        <div class="demo-upload-list-cover" v-show="!disabled">
          <Icon type="ios-eye-outline" @click.native="handleView('img'+index)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
        </div>
      </div>

    <img-compress ref="file" @done="done" v-show="false"></img-compress>
    <Button icon="ios-cloud-upload-outline" :disabled="disabled" @click="click">{{this.description}}</Button>

        <!--<Upload-->
        <!--multiple-->
        <!--:headers="{token:this.$store.state.user.token}"-->

        <!--:show-upload-list="false"-->
        <!--:on-format-error="handleFormatError"-->
        <!--:max-size="3072"-->
        <!--:on-exceeded-size="handleMaxSize"-->
        <!--:before-upload="handleBeforeUpload"-->
        <!--:format="['PNG','JPG','JPEG','BMP']"-->
        <!--accept=".PNG, .JPG, .JPEG,.BMP"-->
        <!--:on-success="handleSuccess"-->
        <!--action="/proxy/file/image/add"-->
        <!--style="display: inline-block;width:60px;height:35px;" >-->
        <!--&lt;!&ndash;<div style="width: 80px;height:35px;margin-top:20px; border: 1px solid #ccc;">-->
            <!--<p>{{this.description}}</p>-->
        <!--</div>&ndash;&gt;-->

        <!--</Upload>-->

  </div>
</template>
<script>
import { getType} from '~/static/util.js'
import ImgCompress  from '~/components/img-compress-upload.vue'
export default {
    name: 'img-group-upload',
    components: { ImgCompress},
    props:{
      description:{
        default: '上传图片'
      },
      data:{},
      disabled:{
        type: Boolean,
        default: false
      },
      num: {
        default: 1
      }
    },
    data() {
      return {
        imgData:{}
      }
    },
    computed:{
      uploadList(){
        let data= this.data, list= []
        switch (getType(data)){
          case 'string':{
            list=data? [data]: []
            break
          }
          case 'array':{
            list= data
            break
          }
        }
        return list
      },
    },
    // watch:{
    //   data(val){
    //     this.pushList(val)
    //   }
    // },
    // mounted() {
    //   this.pushList(this.data)
    // },
    methods: {
      click(){
        if(this.num==1 || this.num> this.uploadList.length){
          this.$refs.file.$el.click()
        }else{
          this.$Message.error(`图片最多上传${this.num}张`);
        }
      },
      handleView(name) {
        this.$refs[name][0].click()
      },
      handleRemove(url, index) {
        this.$emit('remove', {url, index});
      },
      done({data, url, base64}) {
        if(url) this.imgData['img-'+url]= base64;
        this.$emit('done', {data, url, base64});
      },
    },

  }
</script>
<style lang="less" scoped>
.img-group-upload{
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    vertical-align: bottom;
    line-height: 60px;
    /*border: 1px solid transparent;*/
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
}
</style>
