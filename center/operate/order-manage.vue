<!--运营中心 预约服务管理 2018-11-16-->
<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
        <Form :label-width="90" class="common-form">
            <FormItem label="预约联系人:">
                <Input type="text" v-model="search.input" placeholder="请输入预约联系人"></Input>
            </FormItem>
            <FormItem label="联系方式:">
                <Input type="text" v-model="search.select" placeholder="请输入联系方式"></Input>
            </FormItem>
            
            <FormItem :label-width="0" style="width: 80px;">
                <Button type="primary" v-if="accessBtn('list')" @click="page=1,closeDetail()">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="accessBtn('update')" :disabled="!detailData"  @click="showType=Math.random()">指派维修企业</Button>
        <Button type="primary" v-if="accessBtn('handle')" :disabled="showStatus"  @click="updateOrderFun(true)">接受</Button>
        <Button type="error" v-if="accessBtn('handle')" :disabled="showStatus"  @click="showModal=true;">拒绝</Button>
      <Button type="error" v-if="accessBtn('delete')" :disabled="!detailData"  @click="deleteFun">删除</Button>
    </div>
    <select-repair-company :showType="showType" :detailData="detailData" @closeDetail="closeDetail" :typeFlag="typeFlag"></select-repair-company>
    <Modal
      v-model="showModal"
      title="填写拒绝原因"
      width="450"
      :styles="{height:'300px'}"
      @on-visible-change="visibleChange"
      :scrollable="true"
      :transfer= "true"
      :footer-hide="false"
      :mask-closable="false"
      class="table-modal-detail"
      :transition-names="['', '']">
          <Form :label-width="120" class="common-form" ref="searchList" :rules="ruleCard"  :model="searchList">
              <FormItem label="拒绝原因:" style="width: 80%;" prop="reason">
                  <Input type="text" v-model="searchList.reason" placeholder="请填写原因(必填)"></Input>
              </FormItem>
          </Form>
      <div slot="footer">
          <Button  size="large" type="primary" style="margin-right: 10px;" @click="refuseFun('searchList')">确定</Button>
      </div>
    </Modal>
  </common-table>
</div>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import selectRepairCompany from '~/components/select-repair-company.vue'
import funMixin from '~/components/fun-auth-mixim.js'

export default {
	name: "order-manage",
    components: {
      CommonTable,
      selectRepairCompany
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
        {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1)
          },
          {title: '预约联系人', key: 'ownerName', sortable: true, minWidth: 130,
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
        showStatus:true,
        searchList:{
          reason:'',
        },
        ruleCard:{
            reason:[
                { required: true, message: '请填写信息', },
            ],
        },
        showModal:false,
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

  "contactMobile": this.search.select,
  "ownerName": this.search.input,
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
          console.log(row);

          this.detailData=row;
          this.typeFlag="order";
          if(row.handleStatus.code=='1'){
            this.showStatus=false;
          }else{
            this.showStatus=true;
          }
        },
        
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          
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
        },
        //更新状态值-----
        // updateOrderFun(status){
        //   this.$Modal.confirm({
        //       title:"系统提示!",
        //       content:"确定要提交吗？",
        //       onOk:this.updateOrder(status),
        //   })
        // },
        updateOrderFun(falg){
            this.$axios.post('/service/onSiteOrderHandle', {
                    "accept": falg,
                    "onSiteOrderId": this.detailData.id,
                    "reason": ""

            }).then( (res) => {
              this.loading=false;
              if(res.data.code=='0'){
                this.showStatus=true;
                this.closeDetail();
              }
            })
      },
      refuseFun(name){
          this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/service/onSiteOrderHandle', {
                        "accept": false,
                        "onSiteOrderId": this.detailData.id,
                        "reason": this.searchList.reason
                    }).then( (res) => {
                      this.loading=false;
                      if(res.data.code=='0'){
                        this.showModal=false;
                        this.showStatus=true;
                        this.closeDetail();
                      }
                    })
                }
            });
          
      },

      visibleChange(status){
        if(status === false){
          this.$refs['searchList'].resetFields();
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
