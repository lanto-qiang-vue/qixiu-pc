
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" >
    <div  slot="search"  >
        <Form :label-width="100" class="common-form z-common-form">
              <FormItem label="申领日期区间:">
                  <DatePicker  type="daterange"  placeholder="请选择" @on-change="changeTime"></DatePicker>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <p><label>已申领总数：</label><span>{{applyCount||0}}</span></p>
    </div>
  </common-table>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "certificate-apply-company",
    components: {
      CommonTable
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          {title: '序号',  width: 80,render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1)},
          {title: '合格证起讫号开始', key: 'codeStart',  minWidth: 140},
          {title: '合格证起讫号结束', key: 'codeEnd',  minWidth: 140},
          {title: '申领日期', key: 'applyDate',  minWidth: 120},
          {title: '申领数', key: 'applyNum',  minWidth: 120}
        ],
        tableData: [],
        search:{
          "applyDateEnd": "",
          "applyDateStart": "",
          "area": "",
          "code": "",
          "corpName": ""
        },
        typeList:[],
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        detailData: null,
        clearTableSelect: null,
        applyCount:0
      }
    },
    mounted () {
      this.getList();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/certificate/apply/list', {
              "applyDateEnd": this.search.applyDateEnd,
              "applyDateStart": this.search.applyDateStart,
              "area": this.search.area,
              "code": this.search.code,
              "corpName": this.search.corpName,
              "pageNo": this.page,
              "pageSize": this.limit,
          }).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.applyCount=res.data.applyCount;
              this.loading=false;
            }
          })
          this.detailData= null;
        },
        changeTime(val){
          this.search.applyDateStart=val[0];
          this.search.applyDateEnd=val[1];
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
</style>
