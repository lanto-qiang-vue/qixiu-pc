<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="120" class="common-form">
            <FormItem label="车牌号:">
                <Input type="text" v-model="search.input" placeholder="请输入车牌号"></Input>
            </FormItem>
            <FormItem label="车架号:">
                <Input type="text" v-model="search.select" placeholder="请输入车架号"></Input>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="detailData=null,showDetail=Math.random()">搜索</Button>
      <Button type="info" v-if="" @click="showDetail=Math.random()" :disabled="!detailData">查看</Button>
      <Button type="error" v-if=""  @click="" :disabled="isOrderSuccess">解绑</Button>
      <Button type="error" v-if=""  @click="" :disabled="isOrderSuccess">绑定本人车辆</Button>
      <Button type="error" v-if=""  @click="" :disabled="isOrderSuccess">绑定他人车辆</Button>
      
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "my-visit",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '车牌号码', key: 'ORDER_TYPE', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '车牌品牌', key: 'ORDER_PERSON', sortable: true, minWidth: 120},
          {title: '车架号', key: 'TELPHONE', sortable: true, minWidth: 135},
          {title: '发动机', key: 'PLATE_NUM', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchSelectOption:[],
        searchSelectOption1:[],//重新赋值--
        search:{
          input: '',
          select: '',
        },
        page: 0,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        isOrderSuccess:true,//判断是不是预约成功
        
      }
    },
    mounted () {
      this.showTable= Math.random();
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
                    "status": 0,
                    "vehicleplatenumber": "",
                    "vin": ""

                }).then( (res) => {
					console.log(res)
					
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
            if(row.STATUS=="10421003"){
                this.isOrderSuccess=true;
            }else{
                this.isOrderSuccess=false;
            }
          this.detailData=row
        },
        onRowDblclick( row, index){
          this.detailData=row
          console.log('row：',row);
          this.showDetail=Math.random()
        },
        closeDetail(){
          this.detailData= null
          this.isOrderSuccess=true;
          this.clearTableSelect= Math.random()
        },
        //只有保存数据和提交数据的时候更新界面列表，
        closeGetList(){
          this.getList();
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
