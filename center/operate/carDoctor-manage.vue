<!--车大夫管理 2018-11-02-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="50" class="common-form">
              <FormItem label="姓名:">
                  <Input type="text" v-model="search.name" placeholder="请输入姓名"></Input>
              </FormItem>
              <FormItem label="职称:">
                  <Input type="text" v-model="search.professor" placeholder="请输入职称"></Input>
              </FormItem>
              <FormItem label="就职企业:" :label-width="80">
                  <Input type="text" v-model="search.empUnit" placeholder="请输入就职企业"></Input>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="showDetail=Math.random();detailData=null;">新增</Button>
      <Button type="info" v-if="" :disabled="!detailData" @click="showDetail=Math.random();">查看|编辑</Button>
      <Button type="error" v-if="" :disabled="!detailData"  @click="delFun">删除</Button>
    </div>
    <carDoctor-manage-add :showDetail='showDetail' :detailData="detailData" @closeDetail="closeDetail"></carDoctor-manage-add>
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import carDoctorManageAdd from './carDoctor-manage-add'
	export default {
		name: "carDoctor-manage",
    components: {
      CommonTable,
      carDoctorManageAdd
    },
    data(){
		  return{
        loading:true,
        columns: [
          {title: '序号',  width: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '姓名', key: 'name', sortable: true, minWidth: 120,
          },
          {title: '职称', key: 'professor', sortable: true, minWidth: 120},
          {title: '就职企业', key: 'empUnit', sortable: true, minWidth: 135},
          {title: '专业擅长', key: 'goodAt', sortable: true, minWidth: 120},
          {title: '主要荣誉', key: 'honor', sortable: true, minWidth: 120,
            // render: (h, params) => h('span',  params.row.status.name)
          },
        ],
        tableData: [],

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
      this.getList();
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
            this.$axios.post('/expert/detele/'+this.detailData.id,{
                        
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
          this.page=1;
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
