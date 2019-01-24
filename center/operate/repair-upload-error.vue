<template>
  <div>
    <div style="line-height:40px;font-size:18px;padding-left:10px;"><span style="color:orange;">从2018-12-23至2018-12-28,闵行区维修记录上传存在错误的企业总数为:{{total}}家</span></div>
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
      <Button type="primary" v-if="">导出全部</Button>
      <Button type="error" v-if="">提醒全部</Button>
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
        columns: [

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
            render: (h, params) => h('span', params.row.honor||'')
          },
        ],
        tableData: [],

        search:{
          companyName:'',
          license: '',
          deptCode:310100,
          startDate:'2018-01-01',
          endDate:'2019-01-01',
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
    this.getList();
    },
    methods:{
        getList(){
          let page=this.page-1;
          let urlStr='';
          for(let i in this.search){
            urlStr+='&'+i+'='+this.search[i];
          }
          this.loading=true;
          this.$axios.get('/monitoring/display/company/upload-fault/query?size='+this.limit+'&page='+page+urlStr, {
              
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











































