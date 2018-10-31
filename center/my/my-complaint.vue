<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
            <FormItem label="反馈类型:">
                <Select v-model="model1">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="时间:" style="width: 80px;" :label-width="0">
                <Button type="primary" v-if="" @click="searchFun">查询</Button>
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
		name: "my-complaint",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '反馈企业', key: 'ORDER_TYPE', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '反馈原因', key: 'ORDER_PERSON', sortable: true, minWidth: 120},
          {title: '反馈日期', key: 'TELPHONE', sortable: true, minWidth: 135},
          {title: '车牌号', key: 'PLATE_NUM', sortable: true, minWidth: 120},
          {title: '凭据', key: 'PLATE_NUM', sortable: true, minWidth: 120},
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
        isOrderSuccess:true,//判断是不是预约成功
        cityList: [
            {
                value: 'New York',
                label: 'New York'
            },
        ],
        model1:'',
        
      }
    },
    mounted () {
      this.showTable= Math.random();
    //   this.getList();
    
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
        searchFun(){

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
