<!--企业救援  2019-01-17-->

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
                  <Input type="text" v-model="search.license" placeholder="请输入许可证号"></Input>
              </FormItem>
              <FormItem label="救援区域:">
                  
                <Select v-model="search.rescueAreas" clearable multiple>
                    <Option v-for="item in rescueArea" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="状态:">
                  <Select v-model="search.status" clearable>
                    <Option v-for="item in statusType" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
        <rescue-company-info :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></rescue-company-info>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="showDetail=Math.random();detailData=null;">新增</Button>
      <Button type="info" v-if="" :disabled="!detailData"  @click="showDetail=Math.random();">查看|编辑</Button>
    </div>
    
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
  import rescueCompanyInfo from './rescue-company-info.vue'

	export default {
		name: "rescue-company",
    components: {
      CommonTable,
      rescueCompanyInfo
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          {title: '序号',  width: 70,align:'center', type:'index'},
          {title: '清障施救牵引企业名称', key: 'name',  minWidth: 180},
          {title: '许可证号', key: 'license',  minWidth: 120},
          {title: '状态', key: 'status',  minWidth: 135},
          {title: '救援区域', key: 'rescueAreas',  minWidth: 120},
          {title: '服务周期', key: 'serviceCycles',  minWidth: 120},
          {title: '服务时间', key: 'serviceTime',  minWidth: 120},
          {title: '服务电话', key: 'serviceHotLine',  minWidth: 120},
          
        ],
        tableData: [],
        statusType:[
          {code:1,name:'有效'},
          {code:0,name:'无效'},
        ],
        rescueArea:[],//救援区域----
        search:{
          "license": "",
          "name": "",
          "rescueAreas": [],
          "status": ''
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
      this.getAreaList();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/corp/rt/list', {
                "license": this.search.license,
                "name": this.search.name,
                "pageNo": this.page,
                "pageSize": this.limit,
                "rescueAreas": this.search.rescueAreas,
                "status": this.search.status,
          }).then( (res) => {
            if(res.data.code==0){
                  this.tableData=res.data.items;
                  this.total=res.data.total;
             }
            this.loading=false;
          })
          
        },
        getAreaList(){

            this.$axios.get('/area/query', {
            }).then( (res) => {
              if(res.data.code==0){
                    this.rescueArea=res.data.items;
                    
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





















