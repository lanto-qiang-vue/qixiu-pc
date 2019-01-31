<template>
  <div>
    <div style="line-height:40px;font-size:14px;padding-left:10px;"><span style="color:black;">从{{search.startDate}}至{{search.endDate}},{{areaName}}{{topContent}}的企业总数为:<span style="color:red;">{{total}}</span>家</span></div>
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
        <div slot="operate" style="position:relative;">
          <!--<Button type="primary" v-if="">导出全部</Button>-->
          <Button type="primary" v-if="" @click="sendAllCountFun">提醒全部</Button>
          <Button type="default"  @click="$router.go(-1)" style="position: absolute;right: 5px;">返回</Button>
          <!--<div class="publice-button" style="position:absolute;top:3px;margin-left:3px;cursor:pointer;" @click="enter"><Icon class="publice-button-i" type="md-help" /></div>-->
          <Tooltip placement="right" class="myTotilp" theme="light">
            <div class="publice-button" style=";top:3px;margin-left:3px;cursor:pointer;" @click="enter"><Icon class="publice-button-i" type="md-help" /></div>
            <div slot="content">
              <p class="publice-info">提醒模板说明{{title}}</p>
              <div style="width:400px;height:100px;white-space:normal;word-break:break-all;word-wrap:break-word">
                <p class="publice-info" style="padding-bottom: 10px;color:rgba(0,0,0,0.34);">{{title}}</p>
                <p>{{description}}</p>
              </div>
            </div>
          </Tooltip>
        </div>
      </common-table>

      
    <Modal v-model="modal3" 
      :footer-hide="true"
           width="400"
      :mask-closable="false">
        <p class="publice-info">提醒模板说明</p>
        <p class="publice-info" style="padding-bottom: 10px;color:rgba(0,0,0,0.34);">{{titleTop}}</p>
        <p style="margin-bottom:30px;">{{contentTop}}</p>
    </Modal>

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
          // deptCode:"",
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
        areaName:'',//区域名称------
        typeName:'',//类型名称------
        topContent:'',//头部内容---
        modal3: false,

        titleTop:'',
        title:'',
        description:'',
        contentTop:'',

      }
    },
    mounted () {
      // console.log(this.accessBtn('view'));
      let routerData=this.$route;
      let queryData=this.$route.query;
      this.search.deptCode=queryData.deptCode;
      this.search.startDate=queryData.startDate;
      
      this.search.endDate=queryData.endDate;
      this.areaName=queryData.deptName;

      // console.log("queryData",queryData);
      if(routerData.path=="/center/repair-upload-error"){
        this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
          },
          {title: '期间上传数', key: 'recordTotalCount',  minWidth: 120,
          },
          {title: '错误记录数', key: 'recordFaultCount',  minWidth: 135,
          },
          {title: '错误率', key: 'probability',  minWidth: 120,
          },
          {title: '已提醒数/已读数', key: 'honor', minWidth: 120,
            render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
          },
          {title: '操作', key: 'honor',  minWidth: 120,
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
        this.topContent="维修记录上传存在错误"

        this.getList();
      }else if(routerData.path=="/center/repair-upload"){
        this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
          },
          {title: '最后一次上传记录时间', key: 'lastTime',  minWidth: 120,
          },
          {title: '联系方式', key: 'telephone',  minWidth: 135,
          },
          
          {title: '已提醒数/已读数', key: 'honor', minWidth: 120,
            render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
          },
          {title: '操作', key: 'honor',  minWidth: 120,
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
        this.topContent="未上传维修记录"
        this.uploadUrl="/monitoring/display/company/upload-not/query";
        this.getList();
        this.enter();

      }else if(routerData.path=="/center/repair-upload-noread"){
          this.typeName=queryData.type;
          this.columns=[
            {title: '企业名称', key: 'companyName', minWidth: 120,
              },
              {title: '最后一次上传记录时间', key: 'lastTime',  minWidth: 120,
              },
              {title: '联系方式', key: 'telephone',  minWidth: 135,
              },
              
              {title: '已提醒数/已读数', key: 'honor', minWidth: 120,
                render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
              },
              {title: '操作', key: 'honor',  minWidth: 120,
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
          this.topContent="提醒（未上传维修记录）未读"
          this.uploadUrl="/monitoring/display/company/docking-unread/query";
          this.getReadInfo();
      }else if(routerData.path=="/center/repair-error-noread"){
          this.typeName=queryData.type;
          this.columns=[
            {title: '企业名称', key: 'companyName', minWidth: 120,
            },
            {title: '期间上传数', key: 'recordTotalCount',  minWidth: 120,
            },
            {title: '错误记录数', key: 'recordFaultCount',  minWidth: 135,
            },
            {title: '错误率', key: 'probability',  minWidth: 120,
            },
            {title: '已提醒数/已读数', key: 'honor', minWidth: 120,
              render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
            },
            {title: '操作', key: 'honor',  minWidth: 120,
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
          this.topContent="提醒（维修记录上传存在错误）"
          this.uploadUrl="/monitoring/display/company/docking-unread/query";
          this.getReadInfo();
      }
          this.enter();
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
        getReadInfo(){
          let page=this.page-1;
          let urlStr='';
          for(let i in this.search){
            urlStr+='&'+i+'='+this.search[i];
          }
          urlStr+='&type='+this.typeName;
          this.loading=true;
          this.$axios.get(this.uploadUrl+'?size='+this.limit+'&page='+page+urlStr, {
              
          }).then( (res) => {
            if(res.status == 200){
              this.total = res.data.totalElements;
              let data = res.data.content;
              for(let i in data){
                  if(data[i].recordFaultCount&&data[i].recordTotalCount){
                    data[i]["probability"] = (data[i].recordFaultCount/data[i].recordTotalCount * 100).toFixed(2)+ "%";
                  }else{
                    data[i]["probability"] = '0';
                  } 
                 
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
            let urlData="";
            urlData+="companyCode="+this.temObjectData.companyCode;
            urlData+="&startDate="+this.search.startDate;
            urlData+="&endDate="+this.search.endDate;

            if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-not?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();

                    this.titleTop="（未上传维修记录）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"存在没有上传维修记录的情况，请按规定及时上传";

                    this.modal3=true;
                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-fault?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();

                    this.titleTop="（上传维修记录存在错误）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"所上传维修记录中存在错误信息，请按规定上传正确无误的维修记录";
                    this.modal3=true;

                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="NOT_UPLOAD"){
                urlData+="&type="+this.typeName;
                this.$axios.post('/monitoring/message/company-docking/unread?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getReadInfo();

                    this.titleTop="（未上传维修记录）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"存在没有上传维修记录的情况且未读站内通知，请按规定及时上传并多关注平台通知";
                    this.modal3=true;

                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="UPLOAD_FAULT"){
              urlData+="&type="+this.typeName;
                this.$axios.post('/monitoring/message/company-docking/unread?'+urlData, {
                      
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getReadInfo();

                    this.titleTop="（未上传维修记录）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"所上传维修记录中存在错误信息且未读平台通知，请按规定上传正确无误的维修记录并多关注平台通知";
                    this.modal3=true;

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
            let urlData="";
            urlData+="companyName="+(this.search.companyName|| "");
            urlData+="&license="+(this.search.license||"");
            urlData+="&startDate="+this.search.startDate;
            urlData+="&endDate="+this.search.endDate;
            if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-not?'+urlData, {
                      
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                    this.titleTop="（未上传维修记录）";
                    this.contentTop="【维修企业名称】，您门店在【所选时间区间】存在没有上传维修记录的情况，请按规定及时上传";
                    this.modal3=true;
                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-fault?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                    this.titleTop="（上传维修记录存在错误）";
                    this.contentTop="【维修企业名称】，您门店在【所选时间区间】所上传维修记录中存在错误信息，请按规定上传正确无误的维修记录";
                    this.modal3=true;
                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="NOT_UPLOAD"){
              urlData+="&type="+this.typeName;
                this.$axios.post('/monitoring/message/company-docking/unread?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getReadInfo();

                    this.titleTop="（未上传维修记录）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"存在没有上传维修记录的情况且未读站内通知，请按规定及时上传并多关注平台通知";
                    this.modal3=true;

                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="UPLOAD_FAULT"){
              urlData+="&type="+this.typeName;
                this.$axios.post('/monitoring/message/company-docking/unread?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getReadInfo();

                    this.titleTop="（未上传维修记录）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"所上传维修记录中存在错误信息且未读平台通知，请按规定上传正确无误的维修记录并多关注平台通知";
                    this.modal3=true;

                  }
                })
            }

        },
        //上传模板类--------
        enter(){
          if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
              this.title="（未上传维修记录）";
              this.description="【维修企业名称】，您门店在【所选时间区间】存在没有上传维修记录的情况，请按规定及时上传";
              
          }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
              this.title="（上传维修记录存在错误）";
              this.description="【维修企业名称】，您门店在【所选时间区间】所上传维修记录中存在错误信息，请按规定上传正确无误的维修记录";
              
          }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="NOT_UPLOAD"){
              this.title="（未上传维修记录）";
              this.description="【维修企业名称】，您门店在【所选时间区间】，存在没有上传维修记录的情况且未读站内通知，请按规定及时上传并多关注平台通知";
              
          }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="UPLOAD_FAULT"){
              this.title="（上传维修记录存在错误）";
              this.description="【维修企业名称】，您门店在【所选时间区间】，所上传维修记录中存在错误信息且未读平台通知，请按规定上传正确无误的维修记录并多关注平台通知";
              
          }
          // alert(this.title);
          // this.modal3=true;
        },
        leave(){
          console.log('2')
          this.modal3=false;
        }

    },
	}
</script>
<style lang="less">
  .myTotilp .ivu-tooltip-light .ivu-tooltip-inner{
    max-width:500px;
  }
</style>
<style scoped lang="less">
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
.publice-button{
  width: 25px;
  height: 25px;
  background-color:#D6D6D6;
  color:white;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: inline-block;
  font-size: 20px;
  text-align: center;
  line-height:20px;
}
.publice-info{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
</style>











































