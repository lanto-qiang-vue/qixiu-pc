<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" @onRowClick="rowClick">
    <div slot="search">
      <Form class="common-form">
        <FormItem :label-width="80" label="报名人姓名:">
          <Input type="text" v-model="search.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem :label-width="90" label="报名人手机号:">
          <Input type="text" v-model="search.phoneNo" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" v-if="accessBtn('query')"  @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="primary"  @click="toImport" v-if="accessBtn('export')">导出</Button>
    </div>
  </common-table>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  import { deepClone } from '../../static/util'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "school-apply-list",
    components: { CommonTable },
    mixins: [funMixin],
    data() {
      return {
        tableData: [],
        search:{
          name:'',
          phoneNo:'',
        },
        columns: [{
          title: '序号', key: '$A', sortable: true, minWidth: 110,
          render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
        },
          { title: '报名人', key: 'name', sortable: true, minWidth: 150 },
          { title: '报名人手机号', key: 'phoneNo', sortable: true, minWidth: 160 },
          { title: '所选驾校', key: 'schoolName', sortable: true, minWidth: 130 },
          { title: '选择驾照类型', key: 'category', sortable: true, minWidth: 130 },
          { title: '报名时间', key: 'createDate', sortable: true, minWidth: 130,
            render: (h, params) => h('span',params.row.createDate.substr(0,10)+ " "+params.row.createDate.substr(11,8))
          },
        ],
        rules:{},
        total: 0,
        clearTableSelect: false,
        showTable: false,
        page: 1,
        loading: false,
        limit: 10,
        showModal:false,
      }
    },
    mounted(){
		  this.getList();
    },
    methods: {
      changePageSize(size) {
        this.limit = size;
        this.getList();
      },
      changePage(page) {
        this.page = page;
        this.getList();
      },
      toImport(){
        this.$axios({method: 'get',url:'/training/driving/register/download?name='+this.search.name+"&phoneNo="+this.search.phoneNo}).then((res) => {
          let data = "\ufeff"+res.data;
          let blob = new Blob([data], {type: 'text/csv,charset=UTF-8'});
          let headerData=res.headers["content-disposition"].split(';')[1].split('=');
          let headerName=headerData[1].substring(1,(headerData[1].length)-1)
          let a = document.createElement('a');
          a.download = headerName;
          a.href = window.URL.createObjectURL(blob);
          $("body").append(a);
          a.click();
          $(a).remove();
        })
      },
      rowClick() {

      },
      update(){
        this.showModal = true;
      },
      getList(){
        this.$axios.get('/training/driving/register/query?page='+(this.page - 1)+"&size="+this.limit+"&name="+this.search.name+"&phoneNo="+this.search.phoneNo).then((res) => {
           this.tableData = res.data.content;
          this.total = res.data.totalElements;
        })
  }
    }
	}
</script>

<style scoped>

</style>
