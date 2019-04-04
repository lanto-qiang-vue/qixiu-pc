<template>
  <div class="menu-manage">

    <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                  @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick" :rowClassName="rowClassName"
                  :show="showTable" :page="page" :loading="loading">
      <div slot="search">
        <Form :label-width="80" class="common-form">
          <FormItem label="维修单号:">
            <Input type="text" v-model="search.costlistcode" placeholder="请输入维修单号"></Input>
          </FormItem>
          <FormItem label="维修车牌:">
            <Input type="text" v-model="search.vehicleplatenumber" placeholder="请输入维修车牌"></Input>
          </FormItem>
          <FormItem :label-width="0" style="width: 100px;">
            <Button type="primary" v-if="accessBtn('query')" @click="searchFun">搜索</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="operate">
        <Button type="primary" v-if="" @click="showDetail=Math.random();" :disabled="!detailData">查看详情</Button>
        
      </div>
    </common-table>
    <record-repair-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></record-repair-detail>
  </div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
  import recordRepairDetail from '~/components/record-repair-detail.vue'
  export default {
    name: 'repored',
    components: {
      CommonTable,
      recordRepairDetail
    },
    mixins: [funMixin],
    data() {
      return {
        loading: false,
        showDetail:null,
        detailData:null,
        columns: [
          {
            title: '结算日期', key: 'settleDate', sortable: true, minWidth: 120
          },
          { title: '维修单号', key: 'code', sortable: true, minWidth: 120 },
          { title: '维修内容', key: 'description', sortable: true, minWidth: 135 },
          { title: '维修车牌', key: 'plateNumber', sortable: true, minWidth: 120 }
        ],
        tableData: [],
        clearTableSelect: false,
        search: {
          costlistcode: '',
          vehicleplatenumber: ''
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable: false
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        this.$axios.post('/company/carfile/query', {
          code: this.search.costlistcode,
          plateNumber: this.search.vehicleplatenumber,
          pageNo:this.page,
          pageSize:this.limit,
        }).then((res) => {
          if (res.data.code == '0') {
            this.tableData = res.data.items
            this.total = res.data.total
            this.loading = false
          }
        })
        this.detailData= null
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      //搜索按钮----
      searchFun() {
        this.loading = true
        this.page=1;
        this.getList()
      },
      onRowClick( row, index){
        this.detailData=row
      },
      closeDetail(){
        this.detailData= null
        this.clearTableSelect= Math.random();
        
        this.getList();
      },
      rowClassName (row, index) {
        if (row.fields.length>0) {
            return 'demo-table-error-row';
        }
        return '';
      }
    }
  }
</script>

<style scoped lang="less">
  .menu-manage {

  }

  .search-block {
    display: inline-block;
    width: 200px;
    margin-right: 10px;
  }


</style>

<style  lang="less">

    .ivu-table .ivu-table-body .ivu-table-tbody .demo-table-error-row td{
        background-color: #FB9606;
        
    }
    


</style>