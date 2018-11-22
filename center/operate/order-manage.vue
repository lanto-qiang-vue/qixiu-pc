<!--运营中心 预约服务管理 2018-11-16-->
<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
            <FormItem label="预约联系人:">
                <Input type="text" v-model="search.input" placeholder="请输入预约联系人"></Input>
            </FormItem>
            <FormItem label="联系方式:">
                <Input type="text" v-model="search.select" placeholder="请输入联系方式"></Input>
            </FormItem>
            
            <FormItem :label-width="0" style="width: 80px;">
                <Button type="primary" v-if="" @click="closeDetail">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="" :disabled="!detailData"  @click="showType=Math.random()">指派维修企业</Button>
        <Button type="primary" v-if="" :disabled="!detailData"  @click="showType=Math.random()">接受</Button>
        <Button type="error" v-if="" :disabled="!detailData"  @click="showType=Math.random()">拒绝</Button>
      <Button type="error" v-if="" :disabled="!detailData"  @click="deleteFun">删除</Button>
    </div>
    <select-repair-company :showType="showType" :detailData="detailData" @closeDetail="closeDetail" :typeFlag="typeFlag"></select-repair-company>
  </common-table>
</div>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import selectRepairCompany from '~/components/select-repair-company.vue'
export default {
	name: "order-manage",
    components: {
      CommonTable,
      selectRepairCompany
    },
    data(){
		  return{
        loading:false,
        columns: [
        {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1)
          },
          {title: '预约联系人', key: 'ownerName', sortable: true, minWidth: 120,
          },
          {title: '预约状态', key: 'handleStatus', sortable: true, minWidth: 120,
            render: (h, params) => h('span',  (params.row.handleStatus&&params.row.handleStatus.name)||'')
          },
          {title: '联系方式', key: 'contactMobile', sortable: true, minWidth: 120},
          {title: '预约内容', key: 'serviceContent', sortable: true, minWidth: 135},
          {title: '预约时间', key: 'arrivalTime', sortable: true, minWidth: 120},
          {title: '公司名称', key: 'company', sortable: true, minWidth: 120,
            render: (h, params) => h('span',  (params.row.company&&params.row.company.name)||'')
          },
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
        showType:null,
        typeFlag:null,
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();
    
    },
    methods:{
        getList(){
          this.loading=true;
            this.$axios.post('/service/order/list', {
                    "pageNo": this.page,
                    "pageSize": this.limit,

            }).then( (res) => {
              this.loading=false;
              if(res.data.code=='0'){
                this.tableData=res.data.items;
                this.total=res.data.total;
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
          this.detailData=row;
          this.typeFlag="order";
        },
        
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          this.page=1;
          this.getList();
        },
        //删除按钮----------
        deleteFun(){
            this.$Modal.confirm({
                title:"系统提示!",
                content:"确定要删除吗？",
                onOk:this.deleteFuncion,
            })
            
        },
        deleteFuncion(){
            this.$axios.post('/service/order/delete/'+this.detailData.id,
            
            ).then( 
            (res) => {
					      if(res.data.code=='0'){
                  
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
