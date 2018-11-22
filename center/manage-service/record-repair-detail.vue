<!--车辆档案详情  2018-10-30 -->
<template>
<Modal
    v-model="showModal"
    title="车辆档案详情"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
    <Collapse v-model="collapse">
        <Panel name="1">维修记录
        <Form slot="content" :label-width="120" class="common-form">
            <FormItem label="维修企业名称:">
                <Input type="text" disabled v-model="listSearch.companyName" placeholder=""> </Input>
            </FormItem>
            <FormItem label="车牌号码:">
                <Input type="text" disabled v-model="listSearch.plateNumber" placeholder=""> </Input>
            </FormItem>
            <FormItem label="车辆识别号VIN:">
                <Input type="text" disabled v-model="listSearch.vin" placeholder=""> </Input>
            </FormItem>
            <FormItem label="送修里程:" >
                <Input type="text" disabled v-model="listSearch.repairMileage" placeholder=""> </Input>

            </FormItem>
            <FormItem label="送修日期:" prop="ORDER_TIME">
                <Input type="text" disabled v-model="listSearch.repairDate" placeholder=""> </Input>
            </FormItem>
            <FormItem label="结算日期:">
                <Input type="text" disabled v-model="listSearch.settleDate" placeholder=""> </Input>
            </FormItem>
            <FormItem label="结算编号:">
                <Input type="text" disabled v-model="listSearch.costlistcode" placeholder=""> </Input>
            </FormItem>
            <FormItem label="故障描述:" prop="TELPHONE">
                <Input type="text" disabled v-model="listSearch.faultDescription" placeholder=""> </Input>
            </FormItem>
            
        </Form>
        </Panel>
      </Collapse>
      <div class="r-list-search">
            <h4>维修项目</h4>
          </div>
          <Table
            class="main-table"
            ref="tablesMain"
            :columns="columns"
            :data="tableData"
            stripe
            border
          ></Table>

          <div class="r-list-search">
            <h4>维修配件</h4>
          </div>
          <Table
            class="main-table"
            ref="tablesMain"
            :columns="columns1"
            :data="tableData1"
            stripe
            border
          ></Table>
    </div>
    <div slot="footer">
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
export default {
	name: "record-repair-detail",
    props:['showDetail', 'detailData'],
    data(){
		return{
            showModal:false,
            collapse: '1',
            listSearch:{
                companyName:"",
                costlistcode:"",
                faultDescription:"",
                repairDate:"",
                repairMileage:"",
                settleDate:"",
                plateNumber:"",
                vin:"",
            },
            columns: [
                {title: '项目名称', key: 'repairproject', sortable: true, minWidth: 180,
                },
                {title: '工时', key: 'workinghours', sortable: true, minWidth: 120},
            ],
            tableData:[],
            columns1: [
                {title: '配件名称', key: 'partsname', sortable: true, minWidth: 180,
                },
                {title: '编号', key: 'partscode', sortable: true, minWidth: 120},
                {title: '数量', key: 'partsquantity', sortable: true, minWidth: 120},
            ],
            tableData1:[],
            listButton:{
                audit:true,
                out:true,
            }
        
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            console.log('x    xxxxxxxxxxxxxx');
            this.getDetail();
        },
    },
    methods:{
        getDetail(){
            this.$axios.post('/vehicle/carfile/queryDetail',{
                "repairbasicinfoId":this.detailData.id,
            }).then( (res) => {
                if(res.data.code=='0'){
                    console.log(res.data);
                    for(let i in res.data.item['repairBasicinfo']){
                        this.listSearch[i]=res.data.item['repairBasicinfo'][i];
                    }
                    // this.listSearch=res.data.item['repairBasicinfo'];
                    this.tableData=res.data.item['repairprojectlist'];
                    this.tableData1=res.data.item['vehiclepartslist'];
                    console.log('fsdsd',this.listSearch);
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
