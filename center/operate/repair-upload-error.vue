<template>
  <div>
    <div style="line-height:40px;font-size:14px;padding-left:10px;"><span style="color:black;">从{{search.startDate}}至{{search.endDate}},{{areaName}}{{topContent}}的企业总数为:<span style="color:red;">{{staticTotal}}</span>家</span></div>
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
                  <FormItem label="经营范围:" v-show="isNoUpload">
                      <!--<Input type="text" v-model="search.license" placeholder="请输入许可证号"></Input>-->
                      <Select v-model="search.category" :transfer="true" clearable>
                        <Option v-for="item in repairType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="企业品牌:" v-show="isNoUpload">
                      <!--<Input type="text" v-model="search.chainBrand" placeholder="请输入许可证号"></Input>-->
                      <unit-search-input  :searchTableData="search.chainBrand" :showChange="showChange" :tableData="tableData2" :name="'请输入企业品牌'" :flagData=4 @closeSelect='closeSelect' @onRowSelect="onRowSelect2"></unit-search-input>
                  </FormItem>
                  <FormItem :label-width="0" style="width: 80px;">
                      <Button type="primary" v-if="accessBtn('query')" @click="page=1,getList()">搜索</Button>
                  </FormItem>
            </Form>
        </div>
        <div slot="operate" style="overflow: hidden;">
          <Button type="primary" v-if="accessBtn('export')" @click="exportAllData">导出全部</Button>
          <Button type="primary" v-if="accessBtn('message')" @click="sendAllCountFun">提醒全部</Button>
          <Button type="default"  @click="$router.go(-1)" style="float: right;right: 5px;">返回</Button>

          
          <!--<div class="publice-button" style="position:absolute;top:3px;margin-left:3px;cursor:pointer;" @click="enter"><Icon class="publice-button-i" type="md-help" /></div>-->
          <Tooltip placement="right" class="myTotilp" theme="light" v-if="isShanghai">
            <div class="publice-button" style="top:3px;margin-left:3px;cursor:pointer;" @click="enter"><Icon class="publice-button-i" type="md-help" /></div>
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
import unitSearchInput from '~/components/unit-search-input.vue'
import { formatDate } from '@/static/tools.js'
export default {
    name: "repair-upload-error",
    components: {
    CommonTable,
    unitSearchInput
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [],
        tableData: [],
        showChange:null,
        tableData2:[
            {title: '品牌', key: 'name', minWidth: 140},
        ],
        search:{
          companyName:'',
          license: '',
          // deptCode:"",
          startDate:'',
          endDate:'',
          category:'',
          chainBrand:''
        },
        page: 1,
        limit: 10,
        role:true,
        staticTotal:0,
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
        exportUrl:"",
        isNoUpload:false,
        repairType:[],


      }
    },
    computed:{
      isShanghai(){
        return process.env.config.areaName=='shanghai'
      },
    },
    mounted () {
      let routerData=this.$route;
      let queryData=this.$route.query;
      this.search.deptCode=queryData.deptCode;
      this.search.startDate=queryData.startDate;

      this.search.endDate=queryData.endDate;
      this.areaName=queryData.deptName;
      this.isNoUpload=false;

      if(routerData.path=="/center/repair-upload-error"){
        this.isNoUpload=true;
        this.getValuesByTypeFun();
        
        if(this.isShanghai){
          this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
            render: (h, params) => {

              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                    // marginLeft:"100px"
                  },
                  on: {
                    click: () => {
                      this.getCompanyId(params.row.companyCode);
                    }
                  }
                }, params.row.companyName)
              ]);
            }
          },
          {title: '期间上传数', key: 'recordTotalCount',  minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                  },
                  on: {
                    click: () => {
                      let routeData = this.$router.resolve({
                        path: "/center/record-repair",
                        query: {name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                      });
                      window.open(routeData.href, '_blank');

                    }
                  }
                }, params.row.recordTotalCount)
              ]);
            }
          },
          {title: '错误记录数', key: 'recordFaultCount',  minWidth: 135,
              render: (h, params) => {
                return h('div', [
                  h('a', {
                    style:{
                      // color:'#515a6e'
                      textDecoration:"underline"
                    },
                    on: {
                      click: () => {
                        let routeData = this.$router.resolve({
                          path: "/center/record-repair",
                          query: {fault:"true",name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                        });
                        window.open(routeData.href, '_blank');
                      }
                    }
                  }, params.row.recordFaultCount)
                ]);
              }
          },
          {title: '错误率', key: 'probability',  minWidth: 120,
          },
          {title: '已提醒数/已读数', key: '', minWidth: 120,
            render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
          },
          {title: '操作', key: '',  minWidth: 120,
            render: (h, params) => {
               if(this.accessBtn('message')){
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
            }
          },
        ];
        }else{
          this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
            render: (h, params) => {

              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                    // marginLeft:"100px"
                  },
                  on: {
                    click: () => {
                      this.getCompanyId(params.row.companyCode);
                    }
                  }
                }, params.row.companyName)
              ]);
            }
          },
          {title: '期间上传数', key: 'recordTotalCount',  minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                  },
                  on: {
                    click: () => {
                      let routeData = this.$router.resolve({
                        path: "/center/record-repair",
                        query: {name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                      });
                      window.open(routeData.href, '_blank');

                    }
                  }
                }, params.row.recordTotalCount)
              ]);
            }
          },
          {title: '错误记录数', key: 'recordFaultCount',  minWidth: 135,
              render: (h, params) => {
                return h('div', [
                  h('a', {
                    style:{
                      // color:'#515a6e'
                      textDecoration:"underline"
                    },
                    on: {
                      click: () => {
                        let routeData = this.$router.resolve({
                          path: "/center/record-repair",
                          query: {fault:"true",name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                        });
                        window.open(routeData.href, '_blank');
                      }
                    }
                  }, params.row.recordFaultCount)
                ]);
              }
          },
          {title: '错误率', key: 'probability',  minWidth: 120,
          },
          {title: '操作', key: '',  minWidth: 120,
            render: (h, params) => {
               if(this.accessBtn('message')){
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
            }
          },
        ];
        }
        this.uploadUrl="/monitoring/display/company/upload-fault/query";
        this.topContent="维修记录上传存在错误"
        this.exportUrl="/monitoring/display/company/upload-fault/download";
        this.getList();
      }else if(routerData.path=="/center/repair-upload"){
        this.isNoUpload=true;
        this.getValuesByTypeFun();

        if(this.isShanghai){
                  this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                  },
                  on: {
                    click: () => {
                      this.getCompanyId(params.row.companyCode);

                    }
                  }
                }, params.row.companyName)
              ]);
            }
          },
          {title: '最后一次上传记录时间', key: 'lastTime',  minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                  },
                  on: {
                    click: () => {


                      let routeData = this.$router.resolve({
                        path: "/center/record-repair",
                        query: {name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                      });
                      window.open(routeData.href, '_blank');
                    }
                  }
                }, params.row.lastTime)
              ]);
            }
          },
          {title: '联系方式', key: 'contactMobile',  minWidth: 135,
          },

          {title: '已提醒数/已读数', key: '', minWidth: 120,
            render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
          },
          {title: '操作', key: '',  minWidth: 120,
            render: (h, params) => {
              if(this.accessBtn('message')){
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
            }
          },
        ];
        }else{
        this.columns=[
          {title: '企业名称', key: 'companyName', minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                  },
                  on: {
                    click: () => {
                      this.getCompanyId(params.row.companyCode);

                    }
                  }
                }, params.row.companyName)
              ]);
            }
          },
          {title: '最后一次上传记录时间', key: 'lastTime',  minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                  },
                  on: {
                    click: () => {


                      let routeData = this.$router.resolve({
                        path: "/center/record-repair",
                        query: {name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                      });
                      window.open(routeData.href, '_blank');
                    }
                  }
                }, params.row.lastTime)
              ]);
            }
          },
          {title: '联系方式', key: 'contactMobile',  minWidth: 135,
          },
          {title: '操作', key: '',  minWidth: 120,
            render: (h, params) => {
              if(this.accessBtn('message')){
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
            }
          },
        ];
        }
        this.topContent="未上传维修记录"
        this.uploadUrl="/monitoring/display/company/upload-not/query";
        this.exportUrl="/monitoring/display/company/upload-not/download";
        this.getList();
        this.enter();

      }else if(routerData.path=="/center/repair-upload-noread"){
          this.typeName=queryData.type;
          this.columns=[
            {title: '企业名称', key: 'companyName', minWidth: 120,

              render: (h, params) => {


              return h('div', [
                h('a', {
                  style:{
                    // color:'#515a6e'
                    textDecoration:"underline"
                  },
                  on: {
                    click: () => {
                      this.getCompanyId(params.row.companyCode);


                    }
                  }
                }, params.row.companyName)
              ]);
            }

              },
              {title: '最后一次上传记录时间', key: 'lastTime',  minWidth: 120,
                render: (h, params) => {
                  return h('div', [
                    h('a', {
                      style:{
                        // color:'#515a6e'
                        textDecoration:"underline"
                      },
                      on: {
                        click: () => {

                          let routeData = this.$router.resolve({
                            path: "/center/record-repair",
                            query: {name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                          });
                          window.open(routeData.href, '_blank');
                        }
                      }
                    }, params.row.lastTime)
                  ]);
                }
              },
              {title: '联系方式', key: 'contactMobile',  minWidth: 135,
              },

              {title: '已提醒数/已读数', key: '', minWidth: 120,
                render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
              },
              {title: '操作', key: '',  minWidth: 120,
                render: (h, params) => {
                  if(this.accessBtn('message')){
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
                }
              },
          ];
          this.topContent="提醒（未上传维修记录）未读"
          this.uploadUrl="/monitoring/display/company/docking-unread/query";
          this.exportUrl="/monitoring/display/company/docking-unread/download";
          this.getReadInfo();
      }else if(routerData.path=="/center/repair-error-noread"){
          this.typeName=queryData.type;
          this.columns=[
            {title: '企业名称', key: 'companyName', minWidth: 120,

                render: (h, params) => {



                  return h('div', [
                    h('a', {
                      style:{
                        // color:'#515a6e'
                        textDecoration:"underline"
                      },
                      on: {
                        click: () => {
                          this.getCompanyId(params.row.companyCode);

                        }
                      }
                    }, params.row.companyName)
                  ]);
                }
            },
            {title: '期间上传数', key: 'recordTotalCount',  minWidth: 120,
              render: (h, params) => {
                return h('div', [
                  h('a', {
                    style:{
                      // color:'#515a6e'
                      textDecoration:"underline"
                    },
                    on: {
                      click: () => {
                        // this.$router.push({path: '/center/record-repair',})

                        let routeData = this.$router.resolve({
                          path: "/center/record-repair",
                          query: {name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                        });
                        window.open(routeData.href, '_blank');
                      }
                    }
                  }, params.row.recordTotalCount)
                ]);
              }
            },
            {title: '错误记录数', key: 'recordFaultCount',  minWidth: 135,
                render: (h, params) => {
                return h('div', [
                  h('a', {
                    style:{
                      // color:'#515a6e'
                      textDecoration:"underline"
                    },
                    on: {
                      click: () => {

                        let routeData = this.$router.resolve({
                          path: "/center/record-repair",
                          query: {fault:"true",name:params.row.companyName,start:this.search.startDate,end:this.search.endDate}
                        });
                        window.open(routeData.href, '_blank');
                      }
                    }
                  }, params.row.recordFaultCount)
                ]);
              }
            },
            {title: '错误率', key: 'probability',  minWidth: 120,
            },
            {title: '已提醒数/已读数', key: '', minWidth: 120,
              render: (h, params) => h('span', params.row.msgSendCount + "/" + params.row.msgReadCount)
            },
            {title: '操作', key: '',  minWidth: 120,
              render: (h, params) => {
                if(this.accessBtn('message')){
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
              }
            },
          ];
          this.topContent="提醒（维修记录上传存在错误）"
          this.uploadUrl="/monitoring/display/company/docking-unread/query";
          this.exportUrl="/monitoring/display/company/docking-unread/download";
          this.getReadInfo();
      }
          this.enter();
    },
    methods:{
        getList(){
          let page=this.page-1;
          let urlStr='';
          for(let i in this.search){
            if(i=='endDate'){
                urlStr+='&'+i+'='+(this.add1(this.search[i])||'');
            }else{
                urlStr+='&'+i+'='+(this.search[i]||'');
            }

          }
          if(this.typeName != ''){
            urlStr += '&type='+this.typeName;
          }
          this.loading=true;
          this.$axios.get(this.uploadUrl+'?size='+this.limit+'&page='+page+urlStr, {

          }).then( (res) => {
            if(res.status == 200){
              if(this.role){
                this.staticTotal = res.data.totalElements;
                this.role = false;
              }
              this.total = res.data.totalElements;
              let data = res.data.content;
              for(let i in data){
                if(data[i].recordFaultCount&&data[i].recordTotalCount){
                  console.log(data[i].recordFaultCount,data[i].recordTotalCount);
                  data[i]["probability"] = ((data[i].recordFaultCount/data[i].recordTotalCount) * 100).toFixed(2)+ "%";
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
        getReadInfo(){
          let page=this.page-1;
          let urlStr='';
          for(let i in this.search){
           if(i=='endDate'){
                urlStr+='&'+i+'='+(this.add1(this.search[i])||'');
            }else{
                urlStr+='&'+i+'='+(this.search[i]||'');
            }

          }
          urlStr+='&type='+this.typeName;
          this.loading=true;
          this.$axios.get(this.uploadUrl+'?size='+this.limit+'&page='+page+urlStr, {

          }).then( (res) => {
            if(res.status == 200){
              if(this.role){
                this.staticTotal = res.data.totalElements;
                this.role = false;
              }
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
            urlData+="&endDate="+this.add1(this.search.endDate);

            if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-not?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();

                    this.titleTop="（未上传维修记录）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"存在没有上传维修记录的情况，请按规定及时上传";

                    // this.modal3=true;
                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-fault?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();

                    this.titleTop="（上传维修记录存在错误）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"所上传维修记录中存在错误信息，请按规定上传正确无误的维修记录";
                    // this.modal3=true;

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
                    // this.modal3=true;

                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="UPLOAD_FAULT"){
              urlData+="&type="+this.typeName;
                this.$axios.post('/monitoring/message/company-docking/unread?'+urlData, {

                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getReadInfo();

                    this.titleTop="（维修记录存在错误）";
                    this.contentTop=this.temObjectData.companyName+"，您门店在"+this.search.startDate+"至"+this.search.endDate+"所上传维修记录中存在错误信息且未读平台通知，请按规定上传正确无误的维修记录并多关注平台通知";
                    // this.modal3=true;

                  }
                })
            }

        },
        //提醒全部通知----------------------------
        sendAllCountFun(){
            this.$Modal.confirm({
                title:"提醒通知!",
                content:"确定要给全部发送提醒吗？",
                onOk:this.sendAll,
            })
        },
        sendAll(){
            let urlData="";
            urlData+="companyName="+(this.search.companyName|| "");
            urlData+="&license="+(this.search.license||"");
            urlData+="&startDate="+this.search.startDate;
            urlData+="&endDate="+this.add1(this.search.endDate);
            urlData+="&deptCode="+this.search.deptCode;
            if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-not?'+urlData, {

                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                    this.titleTop="（未上传维修记录）";
                    this.contentTop="【维修企业名称】，您门店在【所选时间区间】存在没有上传维修记录的情况，请按规定及时上传";
                    // this.modal3=true;
                  }
                })
            }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
                this.$axios.post('/monitoring/message/company-docking/upload-fault?'+urlData, {
                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.getList();
                    this.titleTop="（上传维修记录存在错误）";
                    this.contentTop="【维修企业名称】，您门店在【所选时间区间】所上传维修记录中存在错误信息，请按规定上传正确无误的维修记录";
                    // this.modal3=true;
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
                    // this.modal3=true;

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
                    // this.modal3=true;

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
        },
        exportAllData(){
            this.$Modal.confirm({
                title:"提醒通知!",
                content:"确定要导出全部吗？",
                onOk:this.exportAllFun,
            })
        },
        exportAllFun(){
            let urlData="";
            urlData+="companyName="+(this.search.companyName|| "");
            urlData+="&license="+(this.search.license||"");
            urlData+="&startDate="+this.search.startDate;
            urlData+="&endDate="+this.add1(this.search.endDate);
            urlData+="&deptCode="+this.search.deptCode;

            if(this.uploadUrl=="/monitoring/display/company/upload-not/query"){
            }else if(this.uploadUrl=="/monitoring/display/company/upload-fault/query"){
            }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="NOT_UPLOAD"){
              urlData+="&type="+this.typeName;
            }else if(this.uploadUrl=="/monitoring/display/company/docking-unread/query"&&this.typeName=="UPLOAD_FAULT"){
              urlData+="&type="+this.typeName;
            }
            this.$axios({method: 'get',url:this.exportUrl+'?'+urlData}).then((res) => {
              let data = "\ufeff"+res.data;
              let blob = new Blob([data], {type: 'text/csv,charset=UTF-8'});
              let headerData=res.headers["content-disposition"].split(';')[1].split('=');
              let headerName=headerData[1].substring(1,(headerData[1].length)-1)
              let a = document.createElement('a');
              a.download = headerName;
              a.href = window.URL.createObjectURL(blob);
              $("body").append(a);
              a.click();
              $(a).remove();
            })
        },
        getValuesByTypeFun() {
          this.$axios.get('/dict/getValuesByTypeId/1', {}).then((res) => {
            if (res.data.code == '0') {
                this.repairType = res.data.items;
            }
          })
        },
        onRowSelect2(val){

              this.search.chainBrand=val.name;
        },
        closeSelect(){
            this.search.chainBrand='';
        },
        //根据code查找id--------
        getCompanyId(code){
          let self =this;
          this.$axios.get('/company/get/corpId/'+code, {}).then((res) => {
            if (res.data.code == '0') {
                let routeData = self.$router.resolve({
                        path: "/center/company-info-manage",
                        query: {conpanyId:res.data.item}
                });
                window.open(routeData.href, '_blank');
            }
          })
        },
        add1(date){
          let now = new Date(date);

          return formatDate(new Date(now.getFullYear(),now.getMonth(),now.getDate()));
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











































