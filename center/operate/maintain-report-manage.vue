<!--维修数据上报管理 2018-12-12-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="110" class="common-form">
              <FormItem label="企业名称:">
                  <Input type="text" v-model="search.name" placeholder="请输入企业名称"></Input>
              </FormItem>
              <FormItem label="许可证号:">
                  <Input type="text" v-model="search.professor" placeholder="请输入许可证号"></Input>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="showDetail=Math.random();detailData=null;">新增</Button>
      <Button type="error" v-if="" :disabled="!detailData"  @click="delFun">删除</Button>
    </div>
    <!--<company-white-detail :showDetail="showDetail" :detailData="detailData"></company-white-detail>-->
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
//   import companyWhiteDetail from './company-white-detail.vue'
	export default {
		name: "maintain-report-manage",
    components: {
      CommonTable,
    //   companyWhiteDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          
          {title: '企业名称', key: 'honor', sortable: true, minWidth: 120,},
          {title: '许可证号', key: 'honor', sortable: true, minWidth: 120},
          {title: '经营地址', key: 'honor', sortable: true, minWidth: 135},
          {title: '经营范围', key: 'honor', sortable: true, minWidth: 120,tooltip:true,},
          {title: '联系电话', key: 'honor', sortable: true, minWidth: 120,tooltip:true,},
          {title: '主修品牌', key: 'honor', sortable: true, minWidth: 120,tooltip:true,},
          {title: '信誉等级', key: 'honor', sortable: true, minWidth: 120,tooltip:true,},
          {title: '收费标准', key: 'honor', sortable: true, minWidth: 120,tooltip:true,},
        ],
        tableData: [{"honor":'上海蓝途共享测试'}],

        search:{
          name:'',
          professor: '',
          empUnit: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,

      }
    },
    mounted () {
      this.tableData=[{"honor":'上海蓝途共享测试'}];
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/expert/list', {
              "professor": this.search.professor||'',
              "empUnit": this.search.empUnit||'',
              "name": this.search.name||'',
              "pageNo": this.page,
              "pageSize": this.limit,
          }).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }else{
              this.$Message.info(res.data.status);
            }
            
          })
          this.detailData= null;
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
            this.$axios.delete('/expert/delete/'+this.detailData.id,{
                        
                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.closeDetail();
                    }else{
                        this.$Message.error(res.data.status);
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
