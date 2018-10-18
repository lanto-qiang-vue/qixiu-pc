<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
            <FormItem label="车牌号:">
                <Input type="text" v-model="search.input" placeholder="请输入车牌号"></Input>
            </FormItem>
            <FormItem label="车架号:">
                <Input type="text" v-model="search.select" placeholder="请输入车架号"></Input>
            </FormItem>
            <FormItem :label-width="0" style="width: 100px;">
                <Button type="primary" v-if="" @click="searchFun">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="" :disabled="!detailData">查看</Button>
      <Button type="error" v-if=""  @click="removeBindFun" :disabled="!detailData">解绑</Button>
      <Button type="error" v-if=""  @click="" disabled>绑定本人车辆</Button>
      <Button type="error" v-if=""  @click="" disabled>绑定他人车辆</Button>
      
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "repair-info",
    components: {
      CommonTable,
    },
    data(){
		  return{
              loading:true,
        columns: [
          {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '车牌号码', key: 'vehicleplatenumber', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '车牌品牌', key: 'brand', sortable: true, minWidth: 120},
          {title: '车架号', key: 'vin', sortable: true, minWidth: 135},
          {title: '发动机', key: 'engineno', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchSelectOption:[],
        searchSelectOption1:[],//重新赋值--
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
        
        
      }
    },
    mounted () {
      this.getList();
    },
    // beforeMount(){
    //   this.$axios.post('/menu/list', {
    //     "pageNo": 1,
    //     "pageSize": 10,
    //   })
    // },
    methods:{
        getList(){
            this.$axios.post('/vehicle/owner/queryVehicelist', {
                    "cartype": "",
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    // "status": 0,
                    "vehicleplatenumber": this.search.input,
                    "vin": this.search.select,
                }).then( (res) => {
					if(res.data.code=='0'){
                        this.tableData=res.data.items;
                        this.total=res.data.total;
                        this.loading=false;
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
          this.clearTableSelect= Math.random()
        },
        //搜索按钮----
        searchFun(){
            this.loading=true;
            this.getList();
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
                    this.getList();
                    this.closeDetail();
                }
            })
        }
        
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
