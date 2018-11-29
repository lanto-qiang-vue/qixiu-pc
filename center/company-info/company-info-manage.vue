<!--维修企业信息管理 2018-10-30  -->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading" :showOperate=false>
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
            <Input type="text" v-model="searchList.companyroadtransportationlicense" placeholder="请输入许可证号"></Input>
        </FormItem>
        <FormItem label="经营地址:">
            <Input type="text" v-model="searchList.businessaddress" placeholder="请输入经营地址"></Input>
        </FormItem>
        <FormItem label="联系方式:">
            <Input type="text" v-model="searchList.companysuperintendentphone" placeholder="请输入联系方式"></Input>
        </FormItem>
        <FormItem :label-width="0" style="width: 90px;">
            <Button type="primary" v-if="" @click="searchFun">搜索</Button>
        </FormItem>

        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="showDetail=Math.random();" :disabled="!detailData">查看</Button>
    </div>

</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "company-info-manage",
    components: {
      CommonTable,

    },
    mixins: [funMixin],
    data(){
		  return{
              loading:false,

        columns: [
          {title: '企业名称', key: 'companyName', sortable: true, minWidth: 150,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '许可证号', key: 'license', sortable: true, minWidth: 120},
          {title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 140},
          {title: '经营范围', key: 'businessScope', sortable: true, minWidth: 180},
          {title: '联系电话', key: 'phone', sortable: true, minWidth: 120},
          {title: '主修品牌', key: 'brand', sortable: true, minWidth: 110,},
          {title: '信誉等级', key: 'creditLevel', sortable: true, minWidth: 110,
            render: (h, params) => h('span', params.row.creditLevel.name|| '')},
          {title: '收费标准', key: 'hourPrice', sortable: true, minWidth: 110},
        ],
        tableData: [],
        searchList:{
            "area": "",
            "businessaddress": "",
            "companyName": "",
            "companyroadtransportationlicense": "",
            "companysuperintendentphone": "",
        },
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
            this.$axios.post('/company/list', {
                    "area": this.searchList.area,
                    "businessAddress": this.searchList.businessaddress,
                    "companyName": this.searchList.companyName,
                    "license": this.searchList.companyroadtransportationlicense,
                    "phone": this.searchList.companysuperintendentphone,
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
