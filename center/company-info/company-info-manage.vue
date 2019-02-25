<!--维修企业信息管理 2018-10-30  -->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
        <FormItem label="区域:">
            <Select v-model="searchList.area" clearable>
                <Option v-for="item in areaOption" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="企业名称:">
            <Input type="text" v-model="searchList.companyName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem label="许可证号:">
            <Input type="text" v-model="searchList.license" placeholder="请输入许可证号"></Input>
        </FormItem>
        <FormItem label="经营地址:">
            <Input type="text" v-model="searchList.businessAddress" placeholder="请输入经营地址"></Input>
        </FormItem>
        <FormItem label="审核状态:">
          <Select v-model="searchList.status" clearable>
            <Option v-for="item in statusArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="0" style="width: 90px;">
            <Button type="primary" v-if="" @click="searchFun">搜索</Button>
        </FormItem>

        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('query-list')" @click="showDetail=Math.random();" :disabled="!detailData">查看|审核</Button>
    </div>
  <repair-company-info :showDetail='showDetail' :detailData="detailData" roleType="guanlibumen" @closeDetail="closeDetail"></repair-company-info>
</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
import repairCompanyInfo from '~/center/operate/repair-company-info.vue'
import { getName } from '~/static/util.js'
export default {
	name: "company-info-manage",
    components: {
      CommonTable,
      repairCompanyInfo
    },
    mixins: [funMixin],
    data(){
	  let self= this
		  return{
        loading:false,
        columnsOld: [
          {title: '企业名称', key: 'companyName', sortable: true, minWidth: 150,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '许可证号', key: 'license', sortable: true, minWidth: 120},
          {title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 140},
          {title: '经营范围', key: 'businessScope', sortable: true, minWidth: 180},
          {title: '联系电话', key: 'phone', sortable: true, minWidth: 120},
          {title: '主修品牌', key: 'brand', sortable: true, minWidth: 110},
          {title: '信誉等级', key: 'creditLevel', sortable: true, minWidth: 110,
            render: (h, params) => h('span', params.row.creditLevel.name|| '')},
          {title: '收费标准', key: 'hourPrice', sortable: true, minWidth: 110},
        ],
        columns: [
          {title: '序号', type:'index',minWidth: 70,},
          {title: '状态', key: 'status', sortable: true, minWidth: 100,
            render: (h, params) => h('span', getName( self.statusArr,params.row.status|| ''))},
          {title: '企业名称', key: 'companyName', sortable: true, minWidth: 150,},
          {title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 150,},
          {title: '联系电话', key: 'linkmanTel', sortable: true, minWidth: 120,},
          {title: '许可证号', key: 'license', sortable: true, minWidth: 130},
          {title: '许可证有效期',  sortable: true, minWidth: 200,
            render: (h, params) => h('span', params.row.licenceBeginDate+' ~ '+params.row.licenceEndDate)},
          {title: '注册日期', key: 'registerDate', sortable: true, minWidth: 120},
          {title: '主修品牌', key: 'majorBrand', sortable: true, minWidth: 110},
          {title: '信誉考核等级', key: 'qualityReputationAssessmentLevel', sortable: true, minWidth: 130},
          {title: '收费标准', key: 'workingHoursPrice', sortable: true, minWidth: 110},
        ],
        tableData: [],
        searchList:{
            "area": "",
            "businessAddress": "",
            "companyName": "",
            "license": "",
            "status": "",
        },
        statusArr:[
          {name:"全部",code:""},
          {name:"待审核",code:1},
          {name:"审核成功",code:2},
          {name:"审核不成功",code:3},
        ],
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        showOtherDetail:false,
        detailData: null,
        clearTableSelect: null,
        areaOption:[],//区域数据集合----
      }
    },
    mounted () {
        this.getAreaInfo();
      this.getList();

    },
    methods:{
        //获取区域数据-------
        getAreaInfo(){
            this.$axios.post('/area/region/list', {
                   "areaName": "shanghai"
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.areaOption=res.data.items;
                }else{
                    this.$Message.error(res.data.status);
                }
           })

        },
        getList(){
            this.loading=true;
            // this.$axios.post('/company/list', {
            this.$axios.post('/corp/manage/manageList', {
              ...this.searchList,
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
        getType(){
            this.$axios.get('/dict/getValuesByTypeId/1', {
            }).then( (res) => {
                if(res.data.code=='0'){

                }
           })
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
          row.id= row.companyId
          this.detailData=row
        },
        closeDetail(){
          this.detailData= null

          this.clearTableSelect= Math.random();
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.page= 1;
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
