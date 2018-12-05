<template>
  <common-table v-model="tableData" :columns="columns" :total="total"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :clearSelect="clearTableSelect" :page="page" @onRowClick="rowClick"
                :loading="loading" :showOperate="false">
    <div slot="search">
      <Form :label-width="80" class="common-form">
        <FormItem label="区域:">
          <Select v-model="search.corpArea">
            <Option v-for="item in areaList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="企业名称:">
          <Input type="text" v-model="search.corpName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
  </common-table>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'

  export default {
    name: 'staff-query',
    components: { CommonTable },
    data: function() {
      return {
        areaList:[],
        clearTableSelect: false,
        search: {
          corpArea:'',
          corpName:'',
        },
        total: 0,
        page: 1,
        limit: 10,
        tableData: [],
        showTable: false,
        area: [],
        loading: false,
        columns: [
          {
            title: '序号', minWidth: 80,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          {
            title: '企业名称', key: 'companyName', sortable: true, minWidth: 110
          },
          {
            title: '许可证号', key: 'license', sortable: true, minWidth: 110
          },
          {
            title: '人员数量', key: 'staffNumber', sortable: true, minWidth: 110
          }
        ]
      }
    },
    methods: {
      rowClick(row) {
        this.$router.push({path: "/center/employees-query", query:{id: row.companyId}})
      },
      getName(list, id) {
        let data = ''
        for (let i in list) {
          if (list[i].id == id) {
            data = list[i].name
            break
          }
        }
        return data
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      getArea() {
        this.$axios.post('/area/region/list', {
          areaName: 'shanghai'
        }).then((res) => {
          if (res.data.code == '0') {
            this.areaList = res.data.items
            this.areaList.unshift({ regionCode: '0', shortName: '全部' })
          }
        })
      },
      getList() {
        this.loading = true
        this.$axios.post('/company/repaircompany/getEmployeeList', {
          companyName: this.search.corpName,
          area: this.search.corpArea == 0 ? '' : this.search.corpArea,
          pageNo: this.page,
          pageSize: this.limit
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      }
    },
    computed: {},
    mounted() {
      this.search.corpArea = '0';
      this.getArea();
      this.showTable = Math.random()
      this.getList()
    }
  }
</script>
