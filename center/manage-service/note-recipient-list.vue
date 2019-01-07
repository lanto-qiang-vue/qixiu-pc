<!--通知审核收件人列表 2018-10-26 -->
<template>
<Modal
    v-model="showModal"
    title="收件人列表"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div style="height: 100%;overflow: auto;">
        <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" 
                    :show="showTable" :page="page" :loading="loading" :showOperate=false :showSearch=false>
        </common-table>
    </div>
    <div slot="footer">
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>


</template>
<script>
  import CommonTable from '~/components/common-table.vue'

	export default {
		name: "note-recipient-list",
    props:['showList', 'detailListData'],
    components: {
      CommonTable,

    },
    data(){
		return{
           
            loading:false,
            columns: [
                {title: '收件人', key: 'nickname', sortable: true, minWidth: 120,
                },
                {title: '联系方式', key: 'mobileNo', sortable: true, minWidth: 120,
                    // render: (h, params) => h('span', params.row.status.name)
                },
                {title: '企业名称', key: 'companyName', sortable: true, minWidth: 135},
                {title: '是否已读', key: 'read', sortable: true, minWidth: 135},
                {title: '接收时间', key: 'sendTime', sortable: true, minWidth: 135},
                
            ],
            tableData: [],
            page: 1,
            limit: 10,
            total: 0,
            showModal:false,
            showTable:false,
            clearTableSelect: null,


            }
    },
    watch:{
        showList(){
            this.showModal=true;
            this.page=1;
            this.getList();
            
        },
    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/message/notify/getReceiveList', {
                    id:this.detailListData.id,
                    pageSize:this.limit,
                    pageNo:this.page,
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
        
        changePage(page){
          this.page= page
          this.getList()
        },
        changePageSize(size){
          this.limit= size
          this.getList()
        },
        closeDetail(){
          this.detailData= null
          this.clearTableSelect= Math.random();
          this.getList();
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            
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
























