<!--维修数据监控 维修记录上传情况    2019-01-16-->

<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" @changeSelect="onSelectionChange">
    <div  slot="search"  >
        <Form :label-width="110" class="common-form">
              <FormItem label="企业名称:">
                  <Input type="text" v-model="search.companyName" placeholder="请输入企业名称"></Input>
              </FormItem>
              <FormItem label="许可证号:">
                  <Input type="text" v-model="search.license" placeholder="请输入许可证号"></Input>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="showDetail=Math.random();detailData=null;">导出全部</Button>
      <Button type="error" v-if="" :disabled="deleteArray.length==0"  @click="delFun">提醒全部</Button>
    </div>

  </common-table>

</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'

export default {
    name: "repair-order-info",
    components: {
    CommonTable
    
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [

          {title: '企业名称', key: 'honor', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.honor||'')
          },
          {title: '期间上传数', key: 'honor', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.honor||'')
          },
          {title: '错误记录数', key: 'honor', sortable: true, minWidth: 135,
            render: (h, params) => h('span', params.row.honor||'')
          },
          {title: '错误率', key: 'honor', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.honor||'')
          },
          {title: '已提醒数/已读数', key: 'honor', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.honor||'')
          },
          {title: '操作', key: 'honor', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.honor||'')
          },
        ],
        tableData: [{"honor":'上海蓝途共享测试'}],

        search:{
          companyName:'',
          license: '',
          type:'WHITELIST',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        deleteArray:[],
      }
    },
    mounted () {
      this.tableData=[{"honor":'上海蓝途共享测试'}];
    //   this.getList();
    },
    methods:{
        getList(){
          let page=this.page-1;
          let urlStr='';
          for(let i in this.search){
            urlStr+='&'+i+'='+this.search[i];
          }

          this.loading=true;
          this.$axios.get('/core/company-group/query?size='+this.limit+'&page='+page+urlStr, {
              
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
          this.detailData= null;
        },
        onSelectionChange(selection){

            console.log('onSelectionChange',selection);
            this.deleteArray=selection;
        },
        //删除页面数据-------------
        delFun(){
          this.$Modal.confirm({
              title:"系统提示!",
              content:"确定要删除吗？",
              onOk:this.delList,
          })
        },
        delList(){
            let deleteId='';
            for(let i in this.deleteArray){
              deleteId+=this.deleteArray[i]['id']+',';

            }
            deleteId=deleteId.slice(0,deleteId.length-1);
            
            this.$axios.delete('/core/company-group/'+deleteId,{
                        
                }).then( (res) => {
                    if(res.status===200){
                        this.closeDetail();
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
            console.log('row：',row);
            this.detailData=row
        },
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          
          this.getList();
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











































