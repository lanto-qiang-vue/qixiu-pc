<template>
  <div class="compress-upload-button">
    <Button  :type="buttonType" >{{buttonText}}</Button>
    <input ref="file" @change="getImg()" type="file" :accept="accept">
  </div>

</template>

<script>
  import {imgToBase64, base64ToBlob} from '~/static/util.js'
	export default {
		name: "compress-upload-button",
    props: {
      'buttonType': {
        type: String,
        default: 'primary'
      },
      'buttonText': {
        type: String,
        default: '上传图片'
      },
      'accept': {
        type: String,
        default: 'image/jpg,image/png,image/bmp'
      }
    },
    methods:{
      getImg(){
        let file= this.$refs.file.files[0]
        console.log(file)
        imgToBase64(file, (base64, name ) => {
          // console.log(base64, name )
          let formdata = new FormData();
          formdata.append('file' , base64ToBlob(base64), name);
          this.$axios({
            method: 'post',
            url: '/file/image/add',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formdata
          }).then( (res) => {
            // console.log(res.data)
            this.$emit('done', res.data);
          })
        })
      }
    }
	}
</script>

<style scoped lang="less">
.compress-upload-button{
  position: relative;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    font-size: 0;
  }
  *{
    cursor: pointer;
  }
}
</style>
