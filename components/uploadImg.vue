<template>
  <div style="width:250px;">
    <Upload
      multiple
      :headers="{token:this.$store.state.user.token}"
      type="drag"
      :show-upload-list="false"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :format="['jpg','jpeg','png']"
      accept="image/png,image/jpeg"
      :on-success="handleSuccess"
      action="/proxy/file/image/add">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>{{this.description}}</p>
      </div>
    </Upload>
    <div>
      <div class="demo-upload-list" v-for="item in uploadList">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </div>
    </div>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'uploadImg',
    data() {
      return {
        defaultList: [

        ],
        imgName: '',
        visible: false,
        uploadList: [

        ]
      }
    },
    props:['description','callback','data'],
    watch:{
      data(data){
        this.uploadList = data;
      }
    },
    methods: {
      handleView(name) {
        this.imgName = name
        this.visible = true
      },
      handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file),1);
        this.$emit(this.callback,this.uploadList);
      },
      handleSuccess(res, file) {
        if(res.code == 0){
          this.uploadList.push({
            'url': res.item.path,
          });
          this.$emit(this.callback,this.uploadList);
        }
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '错误提示',
          desc: '只允许上传jpg,png图片'
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '错误提示',
          desc: '图片超过2M'
        })
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 4
        if (!check) {
          this.$Notice.warning({
            title:'最多只能上传'+ this.uploadList.length+'张图片',
          })
        }
        return check
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  .demo-upload-list {
    display: inline-block;
    width: 250px;
    height: 200px;
    text-align: center;
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
    font-size: 40px;
    cursor: pointer;
    margin: 80px 2px;
  }
</style>
