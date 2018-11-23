<!--维修企业信息管理 2018-11-05-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
              <FormItem label="企业名称:">
                  <Input type="text" v-model="search.corpName" placeholder="请输入企业名称"></Input>
              </FormItem>
              <FormItem label="许可证号:">
                  <Input type="text" v-model="search.licence" placeholder="请输入许可证号"></Input>
              </FormItem>
              
              <FormItem :label-width="0" style="width: 60px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="accessBtn('add')" @click="showDetail=Math.random();detailData=null;">新增</Button>
      <Button type="info" v-if="accessBtn('edit')" @click="showDetail=Math.random();" :disabled="!detailData">查看|编辑</Button>
      <Button type="error" v-if="accessBtn('delete')" @click="delFun" :disabled="!detailData">删除</Button>
    </div>
    <repair-company-info :showDetail='showDetail' :detailData="detailData" @closeDetail="closeDetail"></repair-company-info>
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import repairCompanyInfo from './repair-company-info.vue'
import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "repair-company-manage",
    components: {
      CommonTable,
      repairCompanyInfo
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:true,
        columns: [
          
          {title: '企业名称', key: 'corpName', sortable: true, minWidth: 120,
          },
          {title: '许可证号', key: 'licence', sortable: true, minWidth: 120},
          {title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 135},
          {title: '经营范围', key: 'scopes', sortable: true, minWidth: 120},
          {title: '联系电话', key: 'operatorTel', sortable: true, minWidth: 120,
            // render: (h, params) => h('span',  params.row.status.name)
          },
          {title: '主要业务', key: 'spheres', sortable: true, minWidth: 120,
            // render: (h, params) => h('span',  params.row.status.name)
          },
          {title: '信誉等级', key: 'qualityReputationAssessmentLevelDesc', sortable: true, minWidth: 120,
            // render: (h, params) => h('span',  params.row.status.name)
          },
          {title: '收费标准', key: 'workingHoursPrice', sortable: true, minWidth: 120,
            // render: (h, params) => h('span',  params.row.status.name)
          },
        ],
        tableData: [],

        search:{
            "corpName": "",
            "licence": "",
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
      this.getList();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/corp/list', {
              "corpName": this.search.corpName,
                "licence": this.search.licence,
              "pageNo": this.page,
              "pageSize": this.limit,
          }).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }else{
              this.$Message.info(res.data.status);
              this.loading=false;
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
            console.log('row：',row);
            this.detailData=row
        },
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          
          this.getList();
        },
        //删除按钮数据--------
        delFun(){
            this.$Modal.confirm({
              title:"系统提示!",
              content:"确定要删除吗？",
              onOk:this.delList,
          })
        },
        delList(){
            this.$axios.post('/corp/del/'+this.detailData.corpId, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.closeDetail();
                }else{
                    this.$Message.error(res.data.status);
                }
                
            })
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
