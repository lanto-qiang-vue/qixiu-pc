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
        style="display: inline-block;width:60px;height:35px;">
        <!--<div style="width: 80px;height:35px;margin-top:20px; border: 1px solid #ccc;">
            <p>{{this.description}}</p>
        </div>-->
        <Button icon="ios-cloud-upload-outline">{{this.description}}</Button>
        </Upload>

  </div>
</template>
<script>
  export default {
    name: 'common-info-upload',
    data() {
      return {
        uploadList: [

        ]
      }
    },
    props:['description','callback','data','index'],
    watch:{
      data(data){
          console.log("进来前图片的数据：",data);
          this.uploadList=[];
          if(data){
              console.log('进来图片的数据：',data);
              this.uploadList.push(data);
          }
      }
    },
    methods: {
      handleView(name) {
        this.$refs[name][0].click()
      },
      handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file),1);
        this.$emit(this.callback,this.uploadList,this.index);
      },
      handleSuccess(res, file) {
        if(res.code == 0){
          this.uploadList.push(
            res.item.path
          );
          this.$emit(this.callback,this.uploadList,this.index);
        }
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '错误提示',
          desc: '只允许上传PNG,JPG,JPEG,BMP图片'
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '错误提示',
          desc: '图片超过3M'
        })
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 1
        if (!check) {
          this.$Notice.warning({
            title:'最多只能上传'+ this.uploadList.length+'张图片',
          })
        }
        return check
      }
    },
    mounted() {
      if(this.data) this.uploadList=[this.data];
    }
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
