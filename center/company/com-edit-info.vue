<template>
<div class="com-edit-info">
  <common-company-info ref="comInfo" roleType="weixiuqiye" @saveInfoFun="saveInfoFun" @tabStatusFun="tabStatusFun"></common-company-info>
  <div style="padding: 20px">
    <Button  type="primary" @click="submit" v-if="accessBtn('masterEdit')"
             :disabled="importInfo.status==1" v-show="isRequire">提交关键信息</Button>
    <Button  type="primary" @click="submit" v-if="accessBtn('generalEdit')"
             :disabled="generalInfo.generalStatus==1" v-show="!isRequire">提交一般信息</Button>
  </div>
</div>
</template>

<script>
import CommonCompanyInfo from '~/components/common-company-info.vue'
import funMixin from '~/components/fun-auth-mixim.js'
// import { deepClone } from '~/static/util.js'
export default {
  name: "com-edit-info",
  components: { CommonCompanyInfo },
  mixins: [funMixin],
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
          this.generalInfo= data
          this.$refs.comInfo.mergeOtherData(data);
        }
      })
    },
    saveInfoFun(temData){
      let url= ''
        if(this.isRequire){
          url= '/corp/manage/update/crux'
        }else{
          url= '/corp/manage/update/general'
        }
      this.$Modal.confirm({
        title: '确认保存吗？',
        content: '修改的信息需要审核通过才会展示',
        onOk: () => {
          this.$axios.post(url, temData).then((res) => {
            if (res.data.code == '0') {
              this.getImportInfo()
              this.getGeneralInfo()
              this.$Message.success('保存成功')
            }
          })
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
