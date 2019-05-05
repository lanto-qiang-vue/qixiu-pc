<template>
		<input ref="file"  @change="getImg" type="file" accept="image/*">
</template>

<script>
import {imgToBase64, base64ToBlob,} from '~/static/util.js'

export default {
  name: "compress-upload",
  props: {
    'type': {
      type: String,
      default: 'upload'
    },
  },
	data(){
		return{

		}
	},
	computed:{
	},
  methods:{
    getImg(){
      let file= this.$refs.file.files[0]
      // console.log(file)
      imgToBase64(file, (base64, name ) => {
        // console.log(base64, name )
        if(this.type=='base64'){
          this.$emit('done', {base64});
          this.$refs.file.value=null;
        }else{
          let formdata = new FormData();
          formdata.append('file' , base64ToBlob(base64), name);
          // console.log(base64ToBlob(base64))
          this.$axios.$post('/file/image/add', formdata, {
            headers: {'Content-Type': 'multipart/form-data'},
          }).then( (res) => {
            if(res.code == '0'){
              this.$emit('done', {data:res.item, url:res.item.path, base64});
              this.$refs.file.value=null;
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
