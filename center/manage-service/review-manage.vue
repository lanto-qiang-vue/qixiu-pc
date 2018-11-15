<!--管理中心-反馈管理 2018-11-14  -->


<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
      @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">

    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
                <FormItem label="企业名称:">
                    <Input type="text" v-model="searchList.companyName" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="车牌号:">
                    <Input type="text" v-model="searchList.vehicleNum" placeholder="请输入许可证号"></Input>
                </FormItem>
                <FormItem label="反馈日期:">
                    <Input type="text" v-model="searchList.createDate" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="有无凭证:">
                    <Select v-model="searchList.hasEvidence" clearable>
                        <Option v-for="item in evidenceList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="反馈类型:">
                    <Select v-model="searchList.type" clearable>
                        <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                
                <FormItem :label-width="0" style="width: 60px;">
                    <Button type="primary" v-if="" @click="closeDetail()">搜索</Button>
                </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <!--<Button type="primary" v-if="" @click="showDetail=Math.random();detailData=null;">新增</Button>
        <Button type="info" v-if="" @click="showDetail=Math.random();" :disabled="!detailData">查看|编辑</Button>
        <Button type="error" v-if="" @click="delFun" :disabled="!detailData">删除</Button>-->
    </div>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "review-manage",
    components: {
      CommonTable,
    },
    data(){
		  return{
        loading:false,
        columns: [
          {title: '反馈日期', key: 'createDate', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '企业名称', key: 'avgScore', sortable: true, minWidth: 85},
          {title: '企业联系人电话', key: 'TELPHONE', sortable: true, minWidth: 150,
            render: (h, params) => {
                let scoreDetail='履约'+params.row.keepAppointment+' 态度'+params.row.attitude+' 质量'+params.row.quality+' 速度'+params.row.speed+' 价格'+params.row.price
                
                  return h('div', [
                      h('span', scoreDetail)
                  ]);
                
                
            }
          },
          {title: '车牌号', key: 'companyName', sortable: true, minWidth: 150},
          {title: '反馈类型', key: 'companyAddress', sortable: true, minWidth: 180},
          {title: '事件发生日期', key: 'vehicleNum', sortable: true, minWidth: 120},
          {title: '凭证', key: 'companyAddress', sortable: true, minWidth: 180},
          {title: '企业是否已读', key: 'vehicleNum', sortable: true, minWidth: 120},
          
        ],
        tableData: [],
        searchList:{
            companyName:'',
            createDate:'',
            hasEvidence:'',
            type:'',
            vehicleNum:'',
            status:"",
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        typeList:[
            {code:0,name:"维修记录未上传"},
            {code:1,name:"维修记录不正确"},
        ],
        evidenceList:[
            {code:"0",name:"有"},
            {code:"1",name:"无"},
        ],
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();
      // this.getRepairList();
      this.getDetail();
    },

    methods:{
        getList(){
            this.loading=true;
            let page=this.page-1;

            this.$axios.get('/comment/maintain/query/userId?size='+this.limit+'&page='+page, {
            }).then( (res) => {
              console.log(res);
              if(res.status===200){
                  this.tableData=res.data.content;
                  this.total=res.data.totalElements;
                  this.loading=false;
              }else{
                this.loading=false;
                this.$Message.error(res.statusText);
              }
              
            })
        },
        getDetail(){
            // this.loading=true;
            let page=this.page-1;

            this.$axios.get('/comment/complaint/maintain/query?size='+this.limit+'&page='+page+'&hasEvidence=true&type=0', {
            }).then( (res) => {
              
              console.log(res);
              if(res.status===200){
                  // this.tableData=res.data.content;
                  // this.total=res.data.totalElements;
                  // this.loading=false;
              }else{
                // this.loading=false;
                // this.$Message.error(res.statusText);
              }
              
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
















































