<!--企业中心  通知管理  2018-11-21-->
<template>
<div style="padding-top: 30px;">
        <common-table v-model="tableData1" :columns="columns1" :total="total1" :clearSelect="clearTableSelect1"
                        @changePage="changePage1" @changePageSize="changePageSize1" @onRowClick="onRowClick1"
                         :page="page1" :loading="loading1">
            <div  slot="search">
            <Form :label-width="80" class="common-form">
                    <FormItem label="通知标题:">
                                <Input type="text" v-model="receiveList.title" placeholder="请输入通知标题"></Input>
                            </FormItem>
                            <FormItem label="时间:">
                                
                                <DatePicker type="daterange" v-model="receiveList.startDate" placement="bottom-start" placeholder="请选择时间"></DatePicker>
                            </FormItem>
                            <FormItem :label-width="0" style="width: 70px;">
                                <Button type="primary" v-if="accessBtn('query')" @click="page=1,closeDetail1()">搜索</Button>
                            </FormItem>
                </Form>
            </div>
            <div slot="operate">
            <Button type="info" v-if="accessBtn('view')" @click="showDetail1=Math.random();" :disabled="!detailData1">查看</Button>
            </div>
            <common-notes-detail :showDetail="showDetail1" :detailData="detailData1" @closeDetail="closeDetail1" ></common-notes-detail>

        </common-table>
</div>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
import CommonNotesDetail from '~/components/common-notes-detail.vue'
import funMixin from '~/components/fun-auth-mixim.js'

	export default {
		name: "company-note-manage",
    components: {
      CommonTable,
      CommonNotesDetail,
    },
    mixins: [funMixin],
    data(){
		  return{
              typeList: [
                  {code:'yes',name:'已签到'},
                  {code:'no',name:'未签到'},
              ],//问题分类--------
              loading:false,
            columns: [
                    {title: '通知标题', key: 'title', sortable: true, minWidth: 120,
                    },
                    {title: '通知状态', key: 'status', sortable: true, minWidth: 120,
                        render: (h, params) => h('span', params.row.status.name)
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
                showList:null,
                columns1: [
                    {title: '通知标题', key: 'title', sortable: true, minWidth: 120,
                    },
                    {title: '通知发送人', key: 'nickname', sortable: true, minWidth: 120
                    },
                    {title: '通知日期', key: 'sendTime', sortable: true, minWidth: 135},
                    {title: '是否已读', key: 'read', sortable: true, minWidth: 135,
                        // render: (h, params) => h('span', params.row.status.name)
                    
                    },
                   
                    
                ],
                receiveList:{
                    title:'',
                    startDate:"",
                },
                tableData1: [],
                total1:0,
                page1:1,
                limit1:10,
                detailData1:null,
                showDetail1:false,
                clearTableSelect1:null,
                loading1:false,

                //通知发布------
                showNote:null,
                editButton:true,//是否可以编辑或者删除
            }
    },
    mounted () {
      this.getReceiveNotify();
      this.getRouterData();
    },
    methods:{
        getSendNotify(){
            this.loading=true;
            this.$axios.post('/message/notify/getSendNotify', {
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
           
        },
        getReceiveNotify(){
            this.loading1=true;
            this.$axios.post('/message/notify/getReceiveNotify', {
                    endDate:this.receiveList.startDate[1]||'',
                    pageSize:this.limit1,
                    pageNo:this.page1,
                    startDate:this.receiveList.startDate[0]||'',
                    title:this.receiveList.title,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData1=res.data.items;
                    this.total1=res.data.total;
                    this.loading1=false;
                }else{
                    this.$Message.error(res.data.status);
                }
           })
           
        },
        changePage(page){
          this.page= page
          this.getSendNotify()
        },
        changePageSize(size){
          this.limit= size
          this.getSendNotify()
        },
        onRowClick( row, index){
            console.log('row：',row);
            if(row.status.code=="3"){
                this.editButton=false;
            }else{
                
                this.editButton=true;
            }
          this.detailData=row
        },
        closeDetail(){
          this.detailData= null
          this.editButton=true;
          this.clearTableSelect= Math.random();
          this.getSendNotify();
        },
        //搜索按钮----
        searchFun(){
            this.closeDetail();
        },
        //删除数据-------
        removeListFun(){
            this.$Modal.confirm({
                title:"系统提示!",
                content:"确定要删除吗？",
                onOk:this.removeList,
            })
        },
        removeList(){
            this.$axios.delete('/message/notify/delete/'+this.detailData.id,{

            } ).then( (res) => {
                if(res.data.code=='0'){
                    this.closeDetail();
                }
            })
        },
        tabFun(name){
            if(name=="name1"){
                this.getSendNotify();

            }else if(name=="name2"){
                this.getReceiveNotify();
            }

        },
        //我收到通知列表区域--------
        changePage1(page){
          this.page1= page
          this.getReceiveNotify()
        },
        changePageSize1(size){
          this.limit1= size
          this.getReceiveNotify()
        },
        onRowClick1( row, index){
            console.log('row：',row);
          this.detailData1=row
        },
        closeDetail1(){
            this.detailData1= null
            this.clearTableSelect1= Math.random();
            this.getReceiveNotify();
        },
        //监听传过来的数据值-----------，
        getRouterData(){
            var queryData=this.$route.query;
            if(queryData.flag){
                
                let detailData1={id:queryData.listSearch};
                this.detailData1=detailData1;
                
                this.showDetail1=Math.random();
                
            }else{
                console.log("没有值");
            }
            
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
























