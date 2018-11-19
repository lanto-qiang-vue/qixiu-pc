<!--企业中心 维修数据上报查询 2018-11-16-->
<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
      @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" :showOperate=false>

    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
                <FormItem label="维修单号:">
                    <Input type="text" v-model="searchList.costlistcode" placeholder="请输入维修单号"></Input>
                </FormItem>
                <FormItem label="维修车牌:">
                    <Input type="text" v-model="searchList.vehicleplatenumber" placeholder="请输入维修车牌"></Input>
                </FormItem>
                <FormItem :label-width="0" style="width: 60px;">
                    <Button type="primary" v-if="" @click="closeDetail()">搜索</Button>
                </FormItem>
        </Form>
    </div>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import { formatDate } from '@/static/tools.js'
  import { getName } from '@/static/util.js'
	export default {
		name: "company-repair-data",
    components: {
      CommonTable,
    },
    data(){
		  return{
        loading:false,
        columns: [
          {title: '结算日期', key: 'repairDate', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', formatDate(params.row.createDate)||'')
          },
          {title: '维修单号', key: 'costlistcode', sortable: true, minWidth: 120},
          {title: '维修内容', key: 'faultDescription', sortable: true, minWidth: 120,
                // render: (h, params) => h('span', getName(this.typeList,params.row.type)||'')
            },
          {title: '维修车牌', key: 'cmCreateDate', sortable: true, minWidth: 150,
            render: (h, params) => h('span', formatDate(params.row.cmCreateDate)||'')
            },
        ],
        tableData: [],
        searchList:{
            costlistcode:'',
            vehicleplatenumber:'',
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
      this.showTable= Math.random();
      this.getList();

    },

    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/vehicle/carfile/query', {
                "costlistcode":'',
                "vehicleplatenumber":'',
                "pageNo": this.page,
                "pageSize": this.limit,
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
            console.log('row:',row);
            if(row.STATUS=="10421003"){
                this.isOrderSuccess=true;
            }else{
                this.isOrderSuccess=false;
            }
          this.detailData=row
        },
        onRowDblclick( row, index){
          this.detailData=row
          console.log('row:',row);
          this.showDetail=Math.random()
        },
        closeDetail(){
          this.detailData= null
          this.isOrderSuccess=true;
          this.clearTableSelect= Math.random()
          this.page=1;
          this.getList();
        },
        searchFun(){

        },
        showImg(img){
                this.$Modal.info({
                width: 50,
                title: '查看',
                closable: true,
                content: '<img src="'+img+'" style="width: 100%"/>'
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
















































