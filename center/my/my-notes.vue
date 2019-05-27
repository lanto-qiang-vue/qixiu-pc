<!--车主中心 通知管理 -->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading='loading'>
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
            <FormItem label="通知标题:">
                <Input type="text" v-model="search.input" placeholder="请输入通知标题"></Input>
            </FormItem>
            <FormItem label="时间:">
                <DatePicker type="daterange" v-model="search.select" placement="bottom-end" placeholder="请选择时间"></DatePicker>
            </FormItem>
            <FormItem label="" style="width: 140px;" :label-width="0">
                <Button type="primary" v-if="accessBtn('query')" @click="page=1,getList()">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('view')" @click="showDetail=Math.random();" :disabled="!detailData">查看</Button>

    </div>
    <my-notes-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail" style="height: 100%;overflow: auto;"></my-notes-detail>
  </common-table>



</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  import { formatDate } from '@/static/tools.js'
  import myNotesDetail from '~/components/common-notes-detail.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "my-notes",
    components: {
      CommonTable,
      myNotesDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          {title: '通知标题', key: 'title', sortable: true, minWidth: 120},
          {title: '通知发送人', key: 'nickname', sortable: true, minWidth: 120},
          {title: '通知日期', key: 'sendTime', sortable: true, minWidth: 120},
          {title: '是否已读', key: 'read', sortable: true, minWidth: 120,},
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
    methods:{
        getList(){
            let startTime=formatDate(this.search.select[0]);
            let endTime=formatDate(this.search.select[1]);
            this.loading=true;
            this.$axios.post('/message/notify/getReceiveNotify', {
                    "endDate": endTime,
                    "startDate": startTime,
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    "title": this.search.input,
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
                  }else{
                    this.$Message.error(res.data.status);
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
          this.detailData= null
          this.clearTableSelect= Math.random();
          this.getList();
        },
        
    },
	}
</script>

<style scoped lang="less">
</style>
