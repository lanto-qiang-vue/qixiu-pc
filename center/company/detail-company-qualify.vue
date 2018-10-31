<!--企业中心-企业合格证使用登记详情  2018-10-31 -->
<template>
<Modal
    v-model="showModal"
    title="企业合格证使用登记详情"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

        <Form  :label-width="120" class="common-form">
            <FormItem label="送修单位:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.carSource" placeholder=""> </Input>
            </FormItem>
            <FormItem label="维修类别:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.repairType" placeholder=""> </Input>
            </FormItem>
            <FormItem label="车牌号:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.vehiclePlateNumber" placeholder=""> </Input>
            </FormItem>
            <FormItem label="车型:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.carType" placeholder=""> </Input>
            </FormItem>
            <FormItem label="合格证编号:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.certificateCode" placeholder=""> </Input>
            </FormItem>
            <FormItem label="检测报告编号:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.examinationReportCode" placeholder=""> </Input>
            </FormItem>
            <FormItem label="进厂日:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.inPlantDate" placeholder=""> </Input>
            </FormItem>
            <FormItem label="竣工日:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.repairEndDate" placeholder=""> </Input>
            </FormItem>
            <FormItem label="出厂日:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.exFactoryDate" placeholder=""> </Input>
            </FormItem>
            <FormItem label="发证日:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.issueDate" placeholder=""> </Input>
            </FormItem>
        </Form>
    

        <div slot="footer">
        

        <Button  size="large" type="default"  @click="showModal=false;">返回</Button>
      </div>
  </Modal>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
export default {
	name: "detail-company-qualify",
    props:['showDetail', 'detailData'],
    components: {
      CommonTable,

    },
    data(){
		return{

            showModal:false,
            listSearch:{
                carSource:"",
                carType:"",
                certificateCode:"",
                companyId:'',
                exFactoryDate:'',
                examinationReportCode:"",
                id:'',
                inPlantDate:'',
                issueDate:'',
                repairEndDate:'',
                repairType:"",
                vehiclePlateNumber:"",
            },
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            for(let i in this.listSearch){
                this.listSearch[i]='';
            }
            this.getDetail();
        },
    },
    methods:{
        getDetail(){
            this.$axios.post('/company/repairquality/detail',{
                        "id": this.detailData.id,
                }).then( (res) => {
                    if(res.data.code=='0'){
                        for(let i in res.data.item){
                            this.listSearch[i]=res.data.item[i];
                        }

                    }else{
                        this.$Message.error(res.data.status);
                    }
            })
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            
          }
        },
    },
}
</script>

<style scoped lang="less">
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
  .r-list-search{
    width: 100%;
    padding: 10px 0;
    

  }
</style>
