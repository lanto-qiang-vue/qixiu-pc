
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="90" class="common-form">
              <FormItem label="维修企业:">
                  <Input type="text" v-model="search.corpInfo" placeholder="请输入维修企业名称"></Input>
              </FormItem>
              <FormItem label="检查年度:">
                <DatePicker type="year" placeholder="请选择" @on-change="changeTime"></DatePicker>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="accessBtn('query')" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('detail')" :disabled="!detailData" @click="showDetail=Math.random();">查看详情</Button>
    </div>
    <company-safe-detail :showDetail="showDetail" :detailData="detailData" :roleType="'yunying'"></company-safe-detail>
  </common-table>

</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
import companySafeDetail from './company-safe-detail.vue'
export default {
	name: "safeList-operate",
    components: {
      CommonTable,
      companySafeDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          {title: '序号',  minwidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '维修企业', key: 'corpName',  minWidth: 120,
          },
          {title: '检查年度', key: 'year',  minWidth: 120}
        ],
        tableData: [],
        search:{
          "corpInfo": "",
          "year": "",
          "pageNo": 0,
          "pageSize": 0,
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
          this.search['pageNo']=this.page;
          this.search['pageSize']=this.limit;
          this.$axios.post('/security/check/list/yy', this.search).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
            }
            this.loading=false;
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
        changeTime(val){
          this.search.year=val;
        }


    },
	}
</script>

<style scoped lang="less">
</style>
