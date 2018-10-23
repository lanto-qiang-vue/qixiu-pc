<template>
  <div class="menu-manage">

    <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                  @changePage="changePage" @changePageSize="changePageSize"
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
            <Button type="primary" v-if="" @click="searchFun">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </common-table>
  </div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'

  export default {
    name: 'repored',
    components: {
      CommonTable
    },
    data() {
      return {
        loading: false,
        columns: [
          {
            title: '结算日期', key: 'repairdate', sortable: true, minWidth: 120
          },
          { title: '维修单号', key: 'costlistcode', sortable: true, minWidth: 120 },
          { title: '维修内容', key: 'faultdescription', sortable: true, minWidth: 135 },
          { title: '维修车牌', key: 'vehicleplatenumber', sortable: true, minWidth: 120 }
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
        this.$axios.post('/vehicle/carfile/query', {
          costlistcode: this.search.costlistcode,
          vehicleplatenumber: this.search.vehicleplatenumber,
          pageNo:this.page,
          pageSize:this.limit,
        }).then((res) => {
          if (res.data.code == '0') {
            this.tableData = res.data.items
            this.total = res.data.total
            this.loading = false
          }
        })
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
        this.getList()
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
