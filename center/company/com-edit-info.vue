<template>
<div class="com-edit-info">
  <common-company-info ref="comInfo" @saveInfoFun="saveInfoFun" @tabStatusFun="tabStatusFun"></common-company-info>
  <div style="padding: 20px">
    <Button  type="primary" @click="submit" v-if="" v-show="isRequire">提交关键信息</Button>
    <Button  type="primary" @click="submit" v-if="" v-show="!isRequire">提交一般信息</Button>
  </div>
</div>
</template>

<script>
import CommonCompanyInfo from '~/components/common-company-info.vue'
// import { deepClone } from '~/static/util.js'
export default {
  name: "com-edit-info",
  components: { CommonCompanyInfo },
  data() {
    return {
      isRequire:true,
      importInfo:{},
      generalInfo:{},
    }
  },
  mounted(){
    this.getImportInfo()
    this.getGeneralInfo()
  },
  methods:{
    getImportInfo(){
      this.$axios.get('/corp/manage/corpDetail/crux').then((res) => {
        if (res.data.code == '0') {
          let data= res.data.item
          this.importInfo= data
          this.$refs.comInfo.mergeData(data);
        }
      })
    },
    getGeneralInfo(){
      this.$axios.get('/corp/manage/corpDetail/general').then((res) => {
        if (res.data.code == '0') {
          let data= res.data.item
          this.importInfo= data
          this.$refs.comInfo.mergeOtherData(data);
        }
      })
    },
    saveInfoFun(temData){
      let url= ''
        if(this.isRequire){
          url= '/corp/manage/crux/update/yy'
        }else{
          url= '/corp/manage/general/update/yy'
        }
      this.$axios.post(url, temData).then((res) => {
        if (res.data.code == '0') {
          this.showModal = false
        }
      })
    },
    tabStatusFun(name){
      if(name=='name1'){
        this.isRequire=true;
      }else if(name=='name2'){
        this.isRequire=false;
      }
    },
    submit(){
      if(this.isRequire){
        this.$refs.comInfo.rulesData2();
      }else{
        this.$refs.comInfo.rulesData3();
      }
    }
  }
}
</script>

<style scoped>

</style>
