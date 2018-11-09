<template>
<div class="menu-manage" style="padding-top: 30px;">
  <div style="margin:0 10px;">
      <Tabs type="card" value="name1" >
          <TabPane label="根据车牌号评价" name="name1">
                
          </TabPane>
          <TabPane label="根据维修记录评价" name="name2">
                
          </TabPane>
          
      </Tabs>
  </div>

  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                          :show="showTable" :page="page" :showSearch=false :showOperate=false>
              <!--<div slot="operate">
                <Button type="primary" v-if="" @click="detailData=null,showDetail=Math.random()">根据车牌号评价</Button>
                <Button type="primary" v-if="" @click="showDetail=Math.random()">根据维修记录评价</Button>
              </div>-->
            </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "my-review",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '点评日期', key: 'ORDER_TYPE', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '评分', key: 'ORDER_PERSON', sortable: true, minWidth: 120},
          {title: '评分详情', key: 'TELPHONE', sortable: true, minWidth: 135},
          {title: '门店名称', key: 'PLATE_NUM', sortable: true, minWidth: 120},
          {title: '门店地址', key: 'PLATE_NUM', sortable: true, minWidth: 120},
          {title: '维修车牌', key: 'PLATE_NUM', sortable: true, minWidth: 120},
          
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
      this.getList();
      // this.getRepairList();
    },

    methods:{
        getList(){
            this.$axios.get('/comment/maintain/query/userId', {
                  
                }).then( (res) => {
					console.log(res)
					
				})
        },
        getRepairList(){
          this.$axios.post('/comment/list', {
                    "pageNo": this.page,
                    "pageSize": this.limit,

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
