<!--企业白名单新增  2018-12-12  -->
<template>
  <Modal
    v-model="showModal"
    title="新增白名单"
    width="90"
    :scrollable="true"
    :transfer="true"
    :footer-hide="true"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                  @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                  :show="showTable" :page="page" :loading="loading" :showOperate=false>
      <div slot="search">
        <Form :label-width="80" class="common-form">
          <FormItem label="企业名称:">
            <Input type="text" v-model="search.name" placeholder="请输入企业名称"></Input>
          </FormItem>
          <FormItem :label-width="0" style="width: 60px;">
            <Button type="primary" v-if="accessBtn('query')" @click="page=1,getDetail()">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </common-table>

  </Modal>
</template>

<script>
  import funMixin from '~/components/fun-auth-mixim.js'
  import CommonTable from '~/components/common-table.vue'

  export default {
    name: 'company-white-detail',
    props: ['showDetail'],
    mixins: [funMixin],
    components: {
      CommonTable
    },
    data() {
      return {
        levelList: ['未考核', 'AAA', 'AA', 'A', 'B'],
        spinShow: false,
        showModal: false,
        columns: [

          {
            title: '企业名称', key: 'companyName', sortable: true, minWidth: 120
          },
          { title: '许可证号', key: 'license', sortable: true, minWidth: 120 },
          { title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 135 },
          { title: '经营范围', key: 'businessScope', sortable: true, minWidth: 120 },
          {
            title: '联系电话', key: 'operatorMobile', sortable: true, minWidth: 120
          },
          {
            title: '信誉等级', key: 'lastYearLevel', sortable: true, minWidth: 120,
            render: (h, params) => h('span', this.levelList[params.row.lastYearLevel] || '')
          },
          {
            title: '操作', key: 'lastYearLevel', sortable: true, minWidth: 120,
            render: (h, params) => {
              let buttonContent = '添加'
              let buttonStatus = 'primary'
              return h('div', [
                h('Button', {
                  props: {
                    type: buttonStatus,
                    size: 'small'
                  },
                  style: {
                    width: '60px',
                    textAlign: 'center',
                    marginRight: '10px'
                  },
                  on: {
                    click: (index) => {
                      this.addCompanyList(params.row.companyCode)
                      this.showModal = false
                    }
                  }
                }, buttonContent)
              ])
            }
          }
        ],
        tableData: [],
        search: {
          name: ''
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable: false,
        clearTableSelect: null,
        loading: false
      }
    },
    watch: {
      showDetail() {
        this.showModal = Math.random()
        this.tableData = []
        this.total = 0
        for (let i in this.search) {
          this.search[i] = ''
        }
        this.getDetail()
      }
    },
    methods: {
      getDetail() {
        this.loading = true
        this.$axios.get('/monitoring/config/company/query/name?size=' + this.limit + '&page=' + (this.page - 1) + '&name=' + this.search.name, {}).then((res) => {
          if (res.status === 200) {
            this.tableData = res.data.content
            this.total = res.data.totalElements
            this.loading = false
          } else {
            this.loading = false
            // this.$Message.error(res.statusText);
          }
        })
      },
      //新增白名单------
      addCompanyList(companyCode) {
        this.$axios.post('/monitoring/config/company-group', {
          'companyCode': companyCode,
          'type': 'WHITELIST'
        }).then((res) => {
          if (res.data.code == 0) {
            this.$Message.success('添加成功')
            this.$emit('refresh')
          }
        })

        this.showModal = false
      },
      changePage(page) {
        this.page = page
        this.getDetail()
      },
      changePageSize(size) {
        this.limit = size
        this.getDetail()
      },
      onRowClick(row) {
        // this.addCompanyList(row);
      }
    }
  }
</script>

<style scoped lang="less">
  .content-list {
    width: 100%;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      float: left;
    }
    h3 {
      float: left;
      height: 45px;
      line-height: 45px;
      margin-left: 10px;
    }
    span {
      float: right;
    }

  }

  .content-p {
    padding-left: 55px;
  }

  .menu-manage {

  }

  .search-block {
    display: inline-block;
    width: 200px;
    margin-right: 10px;
  }

  .r-list-search {
    width: 100%;
    padding: 10px 0;

  }

  .pic-card {
    display: inline-block;
    margin: 0 10px 10px 0;
    width: 200px;
    min-width: 200px;

    .red {
      color: red;
    }
    .pic-body {
      width: 100%;
      height: 150px;
      /*border: 1px solid #dcdee2;*/
      position: relative;
      .no-pic {
        width: 250px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .pic {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .button {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        > * {
          margin: 0 5px;
          vertical-align: top;
        }
        .up-img {
          display: inline-block;
          overflow: hidden;
          position: relative;
          .input {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            font-size: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
