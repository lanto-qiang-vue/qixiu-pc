<!--车主中心 爱车档案 2018-11-22-->
<template>
<div class="menu-manage">
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search">
      <Form :label-width="80" class="common-form">
            <FormItem label="车牌号:">
                <Input type="text" v-model="search.input" placeholder="请输入车牌号"></Input>
            </FormItem>
            <FormItem label="车架号:">
                <Input type="text" v-model="search.select" placeholder="请输入车架号"></Input>
            </FormItem>
            <FormItem :label-width="0" style="width: 100px;">
                <Button type="primary"  @click="page=1,closeDetail()">搜索</Button>
            </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="info"  @click="searchFun" :disabled="!showRepair">查看维修记录</Button>
      <Button type="info"  @click="showDetail=Math.random()" :disabled="!detailData">查看证件信息</Button>

      <Button type="error" v-if="accessBtn('removeBind')"  @click="removeBindFun" :disabled="!detailData">解绑</Button>
      <Button type="primary" v-if="accessBtn('bind')"  @click="showDetail=Math.random(),detailData=null" >绑定本人车辆</Button>

    </div>

</common-table>
<bind-my-car :showDetail='showDetail' :detailData="detailData" @closeDetail="closeDetail"></bind-my-car>

</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import bindMyCar from './bind-my-car.vue'

  import funMixin from '~/components/fun-auth-mixim.js'

	export default {
		name: "repair-info",
    components: {
      CommonTable,bindMyCar
    },
    mixins: [funMixin],
    data(){
		  return{
              loading:false,
        columns: [
          {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '车牌号码', key: 'vehicleplatenumber', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '审核状态', key: 'status', sortable: true, minWidth: 120,
            render: (h, params) => h('span', this.statusText( params.row.status))
          },
          {title: '车牌品牌', key: 'brand', sortable: true, minWidth: 120},
          {title: '车架号', key: 'vin', sortable: true, minWidth: 135},
          {title: '发动机', key: 'engineno', sortable: true, minWidth: 120},
        ],
        tableData: [],
        search:{
          input: '',
          select: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,

        detailData: null,
        clearTableSelect: null,
        showRepair:false,

      }
    },
    mounted () {
      this.getList();
    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/vehicle/owner/queryVehicelist', {
                    "cartype": "",
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    // "status": 0,
                    "vehiclePlateNumber": this.search.input,
                    "vin": this.search.select,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
                }
           })
           this.detailData= null;
           this.showRepair=false;
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

          if(this.detailData.status==2){
            this.showRepair=true;
            
          }else{
            this.showRepair=false;
            
          }
        },
        closeDetail(){
          this.detailData= null
          this.clearTableSelect= Math.random();

          this.getList();

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
        searchFun(){
          if(this.detailData.status==2){
              var query={vehicleplatenumber:this.detailData.vehicleplatenumber,vin:this.detailData.vin};
              this.$router.push({path:'/center/repair-info-detail',query:query});
          }else{
              this.$Modal.confirm({
                title:"系统提示!",
                content:"绑定车辆信息正在审核中，请审核通过后再查看",
            })
          }

        },
      statusText(status){
        let text= '', sta= status? status.toString(): ''
        switch (sta){
          case '1':{
            text= '待审核';break
          }
          case '2':{
            text= '审核成功';break
          }
          case '3':{
            text= '审核不通过';break
          }
          default :{
            text= '新增';break
          }
        }
        return text
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
