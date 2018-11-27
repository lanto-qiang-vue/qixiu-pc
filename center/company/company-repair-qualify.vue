<!--企业中心-企业合格证使用登记 2018-10-31 -->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
        <FormItem label="维修类别:">
            <Select v-model="searchList.repairType" clearable>
                <Option v-for="item in areaOption" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="车牌号:">
            <Input type="text" v-model="searchList.vehiclePlateNumber" placeholder="请输入车牌号"></Input>
        </FormItem>
        <FormItem label="车型:">
            <Input type="text" v-model="searchList.carType" placeholder="请输入车型"></Input>
        </FormItem>
        
        <FormItem :label-width="0" style="width: 90px;">
            <Button type="primary" v-if="accessBtn('query')" @click="searchFun">搜索</Button>
        </FormItem>

        </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="accessBtn('add')"  @click="showAdd=Math.random();detailData=null;">新增</Button>
        <Button type="info" v-if="accessBtn('detail')" @click="showDetail=Math.random();" :disabled="!detailData">查看</Button>
    </div>
    <detail-company-qualify :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></detail-company-qualify>
    <add-company-qualify :showDetail="showAdd" @closeDetail="closeDetail"></add-company-qualify>
</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import detailCompanyQualify from './detail-company-qualify.vue'
import addCompanyQualify from './add-company-qualify.vue'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "company-repair-qualify",
    components: {
      CommonTable,
      detailCompanyQualify,
      addCompanyQualify
    },
    mixins: [funMixin],
    data(){
		  return{
              loading:false,
              
        columns: [
          {title: '送修单位', key: 'carSource', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '维修类别', key: 'repairType', sortable: true, minWidth: 120},
          {title: '车牌号', key: 'vehiclePlateNumber', sortable: true, minWidth: 120},
          {title: '车型', key: 'carType', sortable: true, minWidth: 120},
          {title: '合格证编号', key: 'certificateCode', sortable: true, minWidth: 135},
          {title: '检测报告编号', key: 'examinationReportCode', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchList:{
            "carType": "",
            "repairType": "",
            "vehiclePlateNumber": "",
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        showOtherDetail:false,
        detailData: null,
        clearTableSelect: null,
        showAdd:false,
        areaOption:[
            {code:'1',name:'小型车'},
            {code:'2',name:'大、中型客车'},
            {code:'3',name:'大、中型货车'},
        ],//区域数据集合----
      }
    },
    mounted () {
      this.getList();
    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/company/repairquality/list', {
                    "carType": this.searchList.carType,
                    "repairType": this.searchList.repairType,
                    "vehiclePlateNumber": this.searchList.vehiclePlateNumber,
                    "pageNo": this.page,
                    "pageSize": this.limit,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
                }
           })
           this.detailData= null;
        },

        changePage(page){
          this.page= page
          this.getList()
        },
        changePageSize(size){
          this.limit= size
          this.getList()
        },
        onRowClick( row, index){
            console.log('row：',row);
          this.detailData=row
        },
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.page=1;
            this.closeDetail();
        },
        //解绑按钮-------
        removeBindFun(){
            this.$Modal.confirm({
                title:"系统提示!",
                content:"确定要解绑吗？",
                onOk:this.removeBind,
            })
        },
        removeBind(){
            this.$axios.post('/vehicle/carfile/remove-bind/'+this.detailData.id,{

            } ).then( (res) => {
                if(res.data.code=='0'){
                    this.closeDetail();
                }
            })
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
</style>



