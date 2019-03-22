<template>
  <div style="width: 90%;">


      <div class="demo-upload-list" v-for="(item, index ) in uploadList" :key="index">
        <img :src="item" v-img :ref="'img'+index">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView('img'+index)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </div>


        <Upload
        multiple
        :headers="{token:this.$store.state.user.token}"

        :show-upload-list="false"
        :on-format-error="handleFormatError"
        :max-size="3072"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :format="['PNG','JPG','JPEG','BMP']"
        accept=".PNG, .JPG, .JPEG,.BMP"
        :on-success="handleSuccess"
        action="/proxy/file/image/add"
        style="display: inline-block;width:60px;height:35px;" >
        <!--<div style="width: 80px;height:35px;margin-top:20px; border: 1px solid #ccc;">
            <p>{{this.description}}</p>
        </div>-->
        <Button icon="ios-cloud-upload-outline" :disabled="isDisable">{{this.description}}</Button>
        </Upload>

  </div>
</template>
<script>
  import { getType} from '~/static/util.js'
  export default {
    name: 'common-info-upload',
    props:{'description':{},'callback':{},'data':{},'index':{},'isDisable':false,
      num: {
        default: 1
      }
    },
    data() {
      return {
        uploadList: [

        ]
      }
    },
    watch:{
      data(val){
        this.pushList(val)
      }
    },
    mounted() {
      this.pushList(this.data)
    },
    methods: {
      pushList(data){
        switch (getType(data)){
          case 'string':{
            this.uploadList=data? [data]: []
            break
          }
          case 'array':{
            this.uploadList= data
            break
          }
          default:{
            this.uploadList= []
          }
        }
      },
      handleView(name) {
        this.$refs[name][0].click()
      },
      handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file),1);
        this.$emit(this.callback,this.uploadList,this.index);
      },
      handleSuccess(res, file) {
        if(res.code == 0){
          this.$emit(this.callback,[res.item.path],this.index);
        }
      },
      handleFormatError(file) {
        this.$Message.error('只允许上传PNG,JPG,JPEG,BMP图片');
      },
      handleMaxSize(file) {
        this.$Message.error('图片不能超过3M');
      },
      handleBeforeUpload() {
        // if(this.num ==1){
        //
        // }else{
        //   if (this.uploadList.length >= this.num) {
        //     this.$Message.error('最多只能上传'+ this.num +'张图片');
        //   }
        // }

        return true
      }
    },

  }
</script>
<style lang="less" scoped>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    vertical-align: bottom;
    line-height: 60px;
    border: 1px solid transparent;
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
</style>
