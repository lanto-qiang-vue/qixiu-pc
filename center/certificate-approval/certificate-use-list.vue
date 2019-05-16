
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="100" class="common-form z-common-form">
              <FormItem label="管理区域:">
                  <Input type="text" v-model="search.name" placeholder="请输入编号"></Input>
              </FormItem>
              <FormItem label="维修企业:">
                  <DatePicker v-model="search.professor" type="daterange" placement="bottom-end" placeholder="Select date"></DatePicker>
              </FormItem>
              <FormItem label="统计年月:">
                  <DatePicker v-model="search.professor" type="daterange" placement="bottom-end" placeholder="Select date"></DatePicker>
              </FormItem>
              <FormItem label="维修类型:">
                  <DatePicker v-model="search.professor" type="daterange" placement="bottom-end" placeholder="Select date"></DatePicker>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
    </div>
  </common-table>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "certificate-use-list",
    components: {
      CommonTable
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          {title: '管理区域', key: 'name', sortable: true, minWidth: 120,},
          {title: '企业名称', key: 'professor', sortable: true, minWidth: 120},
          {title: '申领次数', key: 'empUnit', sortable: true, minWidth: 135},
          {title: '申领合格证数', key: 'goodAt', sortable: true, minWidth: 120,},
          {title: '使用合格证数', key: 'honor', sortable: true, minWidth: 120,}
        ],
        tableData: [],
        rescueArea:[],//救援区域----
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
        auditModal: false,
        auditInfo:{
          status:'',
          auditInfo:'',
        },

      }
    },
    mounted () {
    //   this.getList();
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
.z-common-form .ivu-form-item {
    width: 280px;
}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
</style>
