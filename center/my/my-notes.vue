<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
            <FormItem label="通知标题:">
                <Input type="text" v-model="search.input" placeholder="请输入通知标题"></Input>
            </FormItem>
            <FormItem label="时间:">
                <DatePicker type="daterange" v-model="search.select" placement="bottom-end" placeholder="Select date"></DatePicker>
            </FormItem>
            <FormItem label="时间:" style="width: 80px;" :label-width="0">
                <Button type="primary" v-if="" @click="searchFun">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="" :disabled="!detailData">查看</Button>

    </div>
    
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import { formatDate } from '@/static/tools.js'
	export default {
		name: "my-notes",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '通知标题', key: 'ORDER_TYPE', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '通知发送人', key: 'ORDER_PERSON', sortable: true, minWidth: 120},
          {title: '通知日期', key: 'TELPHONE', sortable: true, minWidth: 120},
          {title: '是否已读', key: 'PLATE_NUM', sortable: true, minWidth: 120},
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
            let startTime=formatDate(this.search.select[0]);
            let endTime=formatDate(this.search.select[1]);
            this.$axios.post('/message/notify/getReceiveNotify', {
                    
                    
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    
                    "title": ""

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
            
          this.detailData=row
        },
        
        closeDetail(){
          this.detailData= null
          this.isOrderSuccess=true;
          this.clearTableSelect= Math.random()
        },
        //搜索按钮----------
        searchFun(){
          console.log(this.search.select);
          console.log(formatDate(this.search.select[0]));
          console.log(formatDate(this.search.select[1]));
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
