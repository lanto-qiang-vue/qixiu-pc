<!--通知审核 2018-10-25 -->
<template>

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
        @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
            :show="showTable" :page="page" :loading="loading">
    <div  slot="search">
    <Form :label-width="80" class="common-form">
            <FormItem label="通知标题:">
                <Input type="text" v-model="searchList.title" placeholder="请输入关键字"></Input>
            </FormItem>
            <FormItem label="时间:">
                <DatePicker type="daterange" v-model="searchList.startDate" placement="bottom-start" placeholder="请选择时间"></DatePicker>
            </FormItem>
            <FormItem :label-width="0" style="width: 70px;">
                <Button type="primary" v-if="" @click="searchFun">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="" @click="showDetail=Math.random();" :disabled="!detailData">查看</Button>
        <!--<Button type="info" v-if="" @click="showList=Math.random();" :disabled="!detailData">查看收件人</Button>-->
    </div>
<note-audit-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></note-audit-detail>
<note-recipient-list :showList="showList" :detailListData="detailData" @closeDetail="closeDetail"></note-recipient-list>
</common-table>

</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  import noteAuditDetail from './note-audit-detail.vue'
import noteRecipientList from './note-recipient-list.vue'
	export default {
		name: "note-audit",
    components: {
      CommonTable,
      noteAuditDetail,
      noteRecipientList
    },
    data(){
		return{
           
            loading:false,
            columns: [
                {title: '通知标题', key: 'title', sortable: true, minWidth: 120,
                },
                {title: '通知发送人', key: 'nickname', sortable: true, minWidth: 120,
                    // render: (h, params) => h('span', params.row.status.name)
                },
                {title: '通知日期', key: 'sendTime', sortable: true, minWidth: 135},
                
            ],
            tableData: [],
            page: 1,
            limit: 10,
            total: 0,

            searchList:{
                title:'',
                startDate:"",
            },
            showTable:false,
            showDetail: false,
            showOtherDetail:false,
            detailData: null,
            clearTableSelect: null,
            showList:null,//是否显示收件人

            }
    },
    mounted () {
      this.getList();
    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/message/notify/noAuditList', {
                    endDate:this.searchList.startDate[1]||'',
                    pageSize:this.limit,
                    pageNo:this.page,
                    startDate:this.searchList.startDate[0]||'',
                    title:this.searchList.title,

            }).then( (res) => {
                if(res.data.code=='0'){

                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;

                }else{
                    this.$Message.error(res.data.status);
                }
           })
           this.detailData= null
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
        

        
    },
	}
</script>

<style scoped lang="less">
</style>
























