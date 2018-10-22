<template>
 <div>
   <Collapse v-model="value1">
     <Panel name="1">
       企业基本信息
       <div slot="content">
<Table :columns="columns" :data="companyInfo"></Table>
       </div>
     </Panel>
   </Collapse>
 </div>
</template>

<script>
  export default {
    name: 'company-index',
    data(){
      return {
        value1:'1',
        companyInfo:[],
        columns: [
          {title: '业户名称',key:'companyname',minWidth: 150},
          {title: '许可证', key: 'companyroadtransportationlicense', sortable: true, minWidth: 150},
          {title: '注册地址', key: 'companyaddress', sortable: true, minWidth: 150},
          {title: '经营范围', key: 'companybusinessscope', sortable: true, minWidth: 150
          }
        ]
      }
    },
    methods:{
      getInfo(){
        this.$axios.post('/company/repaircompany/detailInfo', {
        }).then( (res) => {
          console.log(res)
          if(res.data.code==='0'){
          this.companyInfo.push(res.data.item);
          }
        })
      }
    },
    mounted(){
      this.getInfo();
    }
  }
</script>

<style scoped>

</style>
