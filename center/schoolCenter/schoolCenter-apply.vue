<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" :showOperate="false">
    <div slot="search">
      <Form class="common-form">
        <FormItem :label-width="80" label="报名人姓名:">
          <Input type="text" v-model="search.A" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem :label-width="90" label="报名人手机号:">
          <Input type="text" v-model="search.B" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem :label-width="90" label="驾照类型:">
          <Select v-model="search.C">
            <Option v-for="item in Blist" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="90" label="是否联系:">
          <Select v-model="search.D">
            <Option v-for="item in Dlist" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary"  @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  export default {
    name: 'schoolCenter-apply',
    data(){
      return {
        tableData:[
        ],
        Blist:[
          {id:0,name:'请选择'},
          {id:1,name:'已联系'},
          {id:2,name:'未联系'},
        ],
        Dlist:[
          {id:0,name:'请选择'},
          {id:1,name:'已联系'},
          {id:2,name:'未联系'},
        ],
        total:0,
        clearTableSelect:false,
        showTable:false,
        loading:false,
        search:{
          C:'',
        },
        page:1,
        limit:25,
        columns:[
          {
            title: '序号', key: '$A', sortable: true, minWidth: 110,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          { title: '报名人', key: 'name', sortable: true, minWidth: 150 },
          { title: '报名人手机号', key: 'phoneNo', sortable: true, minWidth: 160 },
          { title: '选择驾照类型', key: 'category', sortable: true, minWidth: 130 },
          { title: '报名时间', key: 'createDate', sortable: true, minWidth: 130},
          { title: '操作', key: 'cz',
            render: (h, params) => h('Button',{ props: {
                type:params.row.type == 1 ? 'primary' : 'default',
              },on: {
                click: (index) => {
                  alert(1);
                }
              }},params.row.type == 1 ? '已联系' : '未联系')
          },
        ],
      }
    },
    components:{CommonTable},
    mounted(){
      this.showTable = Math.random();
      this.tableData.push(          {
        name:'陈某',
        phoneNo:'手机号',
        category:'A',
        createDate:'2018-03-18',
      });
    },
    methods:{
      changePageSize(size){
        this.limit = size;
        if(this.page == 1) this.getList();
      },
      changePage(page){
        this.page = page;
        this.getList();
      }
    }
  }
</script>

<style scoped>

</style>
