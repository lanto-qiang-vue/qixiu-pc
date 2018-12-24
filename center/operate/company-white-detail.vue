<!--企业白名单新增  2018-12-12  -->
<template>
<Modal
    v-model="showModal"
    title="新增白名单"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="true"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" :showOperate=false>
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
              <FormItem label="企业名称:">
                  <Input type="text" v-model="search.name" placeholder="请输入企业名称"></Input>
              </FormItem>
              
              <FormItem :label-width="0" style="width: 60px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
  </common-table>

  </Modal>
</template>

<script>
import funMixin from '~/components/fun-auth-mixim.js'
import CommonTable from '~/components/common-table.vue'
export default {
	name: "company-white-detail",
    props:['showDetail'],
    mixins: [funMixin],
    components: {
      CommonTable
    },
    data(){
		return{
            spinShow:false,
            showModal:false,
            collapse: '1',
            listSearch:{
                questionPhoto:"",
                content:"",
                categoryName:"",
                createTime:"",
                answerTime:"",
                status:{name:''},
            },
            listButton:{
                edit:true,
                out:true,
            },
            columns: [
          
                {title: '企业名称', key: 'companyName', sortable: true, minWidth: 120,
                },
                {title: '许可证号', key: 'license', sortable: true, minWidth: 120},
                {title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 135},
                {title: '经营范围', key: 'businessScope', sortable: true, minWidth: 120},
                {title: '联系电话', key: 'operatorMobile', sortable: true, minWidth: 120,
                    // render: (h, params) => h('span',  params.row.status.name)
                },
                // {title: '主要业务', key: 'spheres', sortable: true, minWidth: 120,
                //     // render: (h, params) => h('span',  params.row.status.name)
                // },
                {title: '信誉等级', key: 'lastYearLevel', sortable: true, minWidth: 120,
                    // render: (h, params) => h('span',  params.row.status.name)
                },
                // {title: '收费标准', key: 'workingHoursPrice', sortable: true, minWidth: 120,
                //     // render: (h, params) => h('span',  params.row.status.name)
                // },
            ],
            tableData: [],
            search:{
                name: "",
            },
            page: 1,
            limit: 10,
            total: 0,
            showTable:false,
            clearTableSelect: null,
            loading:false,
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.tableData=[];
            this.total=0;
            for(let i in this.search){
                this.search[i]='';
            }
        },
    },
    methods:{
        getDetail(){
            
            let page=this.page-1;
            let urlStr='';
            for(let i in this.search){
                urlStr+='&'+i+'='+this.search[i];
            }

            this.loading=true;

            this.$axios.get('/core/company/query/name?size='+this.limit+'&page='+page+urlStr,{
            }).then( (res) => {
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
        //新增白名单------
        addCompanyList(companyData){
            this.$axios.post('/core/company-group',{
                "companyCode": companyData.companyCode,
                "type": "WHITELIST"
            }).then( (res) => {
                if(res.status===200){
                  
                }
            })

            this.showModal=false;
        },
        changePage(page){
          this.page= page
          this.getDetail()
        },
        changePageSize(size){
          this.limit= size
          this.getDetail()
        },
        onRowClick( row, index){
            this.addCompanyList(row);
            
        },
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          
          this.getDetail();
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
.content-list{
    width: 100%;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    img{
        width:40px;
        height:40px;
        border:1px solid #ccc;
        float: left;
    }
    h3{
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 10px;
    }
    span{
        float: right;
    }
    
}
.content-p{
    padding-left: 55px;
}
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
  .r-list-search{
    width: 100%;
    padding: 10px 0;
    

  }

  .pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 200px;
      min-width: 200px;
      
      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 150px;
        /*border: 1px solid #dcdee2;*/
        position: relative;
        .no-pic{
          width: 250px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
        }
        .pic{
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
          cursor: pointer;
        }
        .button{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          text-align: center;
          > *{
            margin: 0 5px;
            vertical-align: top;
          }
          .up-img{
            display: inline-block;
            overflow: hidden;
            position: relative;
            .input{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              font-size: 0;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
