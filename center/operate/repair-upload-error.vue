<template>
  <div>
    <div style="line-height:40px;font-size:18px;padding-left:10px;"><span style="color:orange;">从2018-12-23至2018-12-28,{{areaName}}维修记录上传存在错误的企业总数为:{{total}}家</span></div>
      <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                    @changePage="changePage" @changePageSize="changePageSize"
                    :show="showTable" :page="page"  :loading="loading">
        <div  slot="search"  >
            <Form :label-width="110" class="common-form">
                  <FormItem label="企业名称:">
                      <Input type="text" v-model="search.companyName" placeholder="请输入企业名称"></Input>
                  </FormItem>
                  <FormItem label="许可证号:">
                      <Input type="text" v-model="search.license" placeholder="请输入许可证号"></Input>
                  </FormItem>
                  <FormItem :label-width="0" style="width: 80px;">
                      <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
                  </FormItem>
            </Form>
        </div>
        <div slot="operate">
          <!--<Button type="primary" v-if="">导出全部</Button>-->
          <Button type="primary" v-if="" @click="sendAllCountFun">提醒全部</Button>
        </div>

      </common-table>
  </div>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'

export default {
    name: "repair-upload-error",
    components: {
    CommonTable
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [],
        tableData: [],

        search:{
          companyName:'',
          license: '',
          deptCode:"",
          startDate:'',
          endDate:'',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        deleteArray:[],
        temObjectData:'',//临时存储提醒字段数据------------
        uploadUrl:'',//通用链接-----
        areaName:'',
      }
    },
    mounted () {
      let routerData=this.$route;
      let queryData=this.$route.query;
      this.search.deptCode=queryData.deptCode;
      this.search.startDate=queryData.startDate;
      this.search.endDate=queryData.endDate;
      this.areaName=queryData.deptName;
      console.log("queryData",queryData);
      if(routerData.path=="/center/repair-upload-error"){
        this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
          },
          {title: '期间上传数', key: 'recordTotalCount', sortable: true, minWidth: 120,
          },
          {title: '错误记录数', key: 'recordFaultCount', sortable: true, minWidth: 135,
          },
          {title: '错误率', key: 'probability', sortable: true, minWidth: 120,
          },
          {title: '已提醒数/已读数', key: 'honor', minWidth: 120,
            render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
          },
          {title: '操作', key: 'honor', sortable: true, minWidth: 120,
            render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'warning',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.temObjectData=params.row;
                                  this.$Modal.confirm({
                                      title:"提醒通知!",
                                      content:"确定要发送提醒吗？",
                                      onOk:this.sendCountFun,
                                  })
                              }
                          }
                      }, '发送提醒')
                  ]);
            }
          },
        ];
        this.uploadUrl="/monitoring/display/company/upload-fault/query";

        this.getList();
      }else if(routerData.path=="/center/repair-upload"){
        this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
          },
          {title: '最后一次上传记录时间', key: 'lastTime', sortable: true, minWidth: 120,
          },
          {title: '联系方式', key: 'telephone', sortable: true, minWidth: 135,
          },
          
          {title: '已提醒数/已读数', key: 'honor', minWidth: 120,
            render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
          },
          {title: '操作', key: 'honor', sortable: true, minWidth: 120,
            render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'warning',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.temObjectData=params.row;
                                  this.$Modal.confirm({
                                      title:"提醒通知!",
                                      content:"确定要发送提醒吗？",
                                      onOk:this.sendCountFun,
                                  })
                              }
                          }
                      }, '发送提醒')
                  ]);
            }
          },
        ];
        this.uploadUrl="/monitoring/display/company/upload-not/query";
        this.getList();

      }
          
    },
    methods:{
        getList(){
          let page=this.page-1;
          let urlStr='';
          for(let i in this.search){
            urlStr+='&'+i+'='+this.search[i];
          }
          this.loading=true;
          this.$axios.get(this.uploadUrl+'?size='+this.limit+'&page='+page+urlStr, {
              
          }).then( (res) => {
            if(res.status == 200){
              this.total = res.data.totalElements;
              let data = res.data.content;
              for(let i in data){
                 data[i]["probability"] = (data[i].recordFaultCount/data[i].recordTotalCount * 100).toFixed(2)+ "%";
              }
              this.tableData = data;
              this.loading = false;
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
        //提醒通知--------------------
        sendCountFun(){
            
            if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-not', {
                      "companyCode": this.temObjectData.companyCode,
                      "startDate ": this.search.startDate,
                      "endDate" :this.search.endDate,
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-fault', {
                      "companyCode": this.temObjectData.companyCode,
                      "startDate ": this.search.startDate,
                      "endDate" :this.search.endDate,
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                  }
                })
            }
            
        },
        //提醒全部通知----------------------------
        sendAllCountFun(){
            
            this.$Modal.confirm({
                title:"提醒通知!",
                content:"确定要給全部发送提醒吗？",
                onOk:this.sendAll,
            })

            
        },
        sendAll(){
            
            if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-not', {
                      "companyName": this.search.companyName||null,
                      "license": this.search.license||null,
                      "startDate ": this.search.startDate,
                      "endDate" :this.search.endDate,
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-fault', {
                      "companyName": this.search.companyName||null,
                      "license": this.search.license||null,
                      "startDate ": this.search.startDate,
                      "endDate" :this.search.endDate,
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                  }
                })
            }

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











































