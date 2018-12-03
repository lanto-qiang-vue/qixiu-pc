<!--管理中心-反馈管理 2018-11-14  -->


<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
      @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" :showOperate=false>

    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
                <FormItem label="企业名称:">
                    <Input type="text" v-model="searchList.companyName" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="车牌号:">
                    <Input type="text" v-model="searchList.vehicleNum" placeholder="请输入许可证号"></Input>
                </FormItem>
                <FormItem label="反馈日期:">
                    
                    <DatePicker type="date" placeholder="请选择" v-model="searchList.createDate" clearable></DatePicker>
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
                    <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
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
  import { formatDate } from '@/static/tools.js'
  import { getName } from '@/static/util.js'
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
            render: (h, params) => h('span', formatDate(params.row.createDate)||'')
          },
          {title: '企业名称', key: 'companyName', sortable: true, minWidth: 120},
          {title: '企业联系人电话', key: 'companyPhone', sortable: true, minWidth: 150,
          },
          {title: '车牌号', key: 'vehicleNum', sortable: true, minWidth: 120},
          {title: '反馈类型', key: 'type', sortable: true, minWidth: 120,
                render: (h, params) => h('span', getName(this.typeList,params.row.type)||'')
            },
          {title: '事件发生日期', key: 'billCreateDate', sortable: true, minWidth: 150,
            // render: (h, params) => h('span', formatDate(params.row.cmCreateDate)||'')
            },
          {title: '凭证', key: 'photoUrl', sortable: true, minWidth: 130,
                render: (h, params) => {
                  if(params.row.photoUrl){
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.showImg(params.row.photoUrl);
                                }
                            }
                        }, '查看凭证')
                    ]);
                  }else{
                    return h('div', [
                        h('span', '暂无凭证')
                    ]);
                  }

              }
            
            },
          {title: '企业是否已读', key: 'hasRead', sortable: true, minWidth: 140,
                render: (h, params) => {
                  if(params.row.hasRead){
                    return h('div', [
                        h('span', '已读')
                    ]);
                  }else{
                    return h('div', [
                        h('span', '未读')
                    ]);
                  }

              }
            },
          
        ],
        tableData: [],
        searchList:{
            companyName:'',
            createDate:'',
            hasEvidence:'',
            type:'',
            vehicleNum:'',
            
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        typeList:[
            {code:"0",name:"维修记录未上传"},
            {code:"1",name:"维修记录不正确"},
        ],
        evidenceList:[
            {code:"0",name:"有"},
            {code:"1",name:"无"},
        ],
      }
    },
    mounted () {
      this.showTable= Math.random();
    //   var queryData=this.$route;
    //   console.log("取到的路由",queryData);
    //   if(queryData.){

    //   }
    //   this.getList();
    this.getRouterData();

    },
activated(){
    this.getRouterData();
},
    methods:{
        getRouterData(){
            
        var queryData=this.$route.query;
        if(queryData.name=="clp"){
            
            this.searchList.companyName=queryData.companyName;
            this.searchList.type=queryData.type+'';
            this.getList();
        }else{
            this.getList();
        }
        
      },
        getList(){
            this.loading=true;
            let page=this.page-1;
            
            let strUrl="";
            this.searchList.createDate=formatDate(this.searchList.createDate);
            for(let i in this.searchList){
                if(i=="hasEvidence"){
                    if(this.searchList[i]=="0"){
                        strUrl+='&'+i+'=true';
                    }else if(this.searchList[i]=="1"){
                        strUrl+='&'+i+'=false';
                    }
                }else if(i=="type"){
                    if(this.searchList[i]=="0"){
                        strUrl+='&'+i+'=0';
                    }else if(this.searchList[i]=="1"){
                        strUrl+='&'+i+'=1';
                    }
                }else if(this.searchList[i]){
                    strUrl+='&'+i+'='+this.searchList[i];
                }
            }

            
            this.$axios.get('/comment/complaint/maintain/query?size='+this.limit+'&page='+page+strUrl, {
            }).then( (res) => {
              console.log(res);
              if(res.status===200){
                  this.tableData=res.data.content;
                  this.total=res.data.totalElements;
                  this.loading=false;
              }else{
                this.loading=false;
                // this.$Message.error(res.statusText);
              }
              
            })
        },
        getOperate(){
            this.loading=true;
            let page=this.page-1;
            
            let strUrl="";
            for(let i in this.searchList){
                if(i=="hasEvidence"){
                    if(this.searchList[i]=="0"){
                        strUrl+='&'+i+'=true';
                    }else if(this.searchList[i]=="1"){
                        strUrl+='&'+i+'=false';
                    }
                }else if(this.searchList[i]){
                    strUrl+='&'+i+'='+this.searchList[i];
                }
            }

            this.$axios.get('/comment/complaint/maintain/query/operator?size='+this.limit+'&page='+page+strUrl, {
            }).then( (res) => {
              console.log(res);
              if(res.status===200){
                  this.tableData=res.data.content;
                  this.total=res.data.totalElements;
                  this.loading=false;
              }else{
                this.loading=false;
                // this.$Message.error(res.statusText);
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
          
          this.getList();
        },
        searchFun(){

        },
        showImg(img){
            this.$Modal.info({
            width: 50,
            title: '凭证',
            closable: true,
            content: '<img src="'+img+'" style="width: 100%"/>'
            })
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
















































