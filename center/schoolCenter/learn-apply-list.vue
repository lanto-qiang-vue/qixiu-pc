<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" :showOperate="false">
    <div slot="search">
      <Form class="common-form" :label-width="90">
        <FormItem label="报名人姓名:">
          <Input type="text" v-model="search.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="报名人手机号:">
          <Input type="text" v-model="search.phoneNo" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="驾照类型:">
          <Select v-model="search.category">
            <Option v-for="item in checkList" :value="item.name" :key="item.name">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否联系:">
          <Select v-model="search.contact">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import { deepClone } from '../../static/util'
  export default {
    name: 'learn-apply-list',
    data() {
      return {
        tableData: [],
        checkList:[
          {'name':'请选择'},
          {'name':'A1'},
          {'name':'A2'},
          {'name':'B1'},
          {'name':'B2'},
          {'name':'C1'},
          {'name':'C2'},
          {'name':'D'},
          {'name':'E'},
          {'name':'F'},
        ],
        typeList: [
          { id: 0, name: '请选择' },
          { id: 1, name: '已联系' },
          { id: 2, name: '未联系' }
        ],
        total: 0,
        clearTableSelect: false,
        showTable: false,
        loading: false,
        search: {
          name: '',
          contact: 0,
          phoneNo:'',
          category:'请选择',
        },
        page: 1,
        limit: 10,
        columns: [
          {
            title: '序号', key: '$A', sortable: true, minWidth: 110,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          { title: '报名人', key: 'name', sortable: true, minWidth: 150 },
          { title: '报名人手机号', key: 'phoneNo', sortable: true, minWidth: 160 },
          { title: '选择驾照类型', key: 'category', sortable: true, minWidth: 130 },
          { title: '报名时间', key: 'createDate', sortable: true, minWidth: 130 },
          {
            title: '操作', key: 'cz',width: 100,align:'center',
            render: (h, params) => h('Button', {
              props: {
                type: params.row.contact ? 'primary' : 'default'
              }, on: {
                click: (index) => {
                  this.$axios.post('/training/center/driving/contact_status',params.row).then( (res) => {
                          params.row.contact = res.data.contact;
                  })
                }
              }
            }, params.row.contact ? '已联系' : '未联系')
          }
        ]
      }
    },
    components: { CommonTable },
    mounted() {
      this.showTable = Math.random();
      this.getList();
    },
    methods: {
      getList(){
        let search = deepClone(this.search);
         switch(search.contact){
           case 0:
             search.contact = '';
             break;
           case 1:
             search.contact = true;
             break;
           case 2:
             search.contact = false;
             break;
         }
        if(search.category == '请选择') search.category = '';
        this.$axios.get('/training/driving/register/query?size='+this.limit+'&page='+(this.page-1),{
          params:search
        }).then( (res) => {
          // this.
               this.total = res.data.totalElements;
               this.tableData = res.data.content;
        })
      },
      changePageSize(size) {
        this.limit = size
        if (this.page == 1) this.getList()
      },
      changePage(page) {
        this.page = page
        this.getList()
      }
    }
  }
</script>

<style scoped>

</style>
