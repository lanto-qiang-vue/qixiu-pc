<!--指定维修企业弹出层 2018-11-16-->

<template>
  <Modal
    v-model="showModal"
    :mask-closable="false"
    title="指定维修企业"
    width="60"
    :scrollable="true"
    :transfer="false"
    :footer-hide="true"
    class="table-modal-detail"
    :transition-names="['', '']">
    <common-table v-model="tableData" :columns="columns" :total="total"
                  @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                  :show="showTable" :page="page" :loading="loading" :showOperate="false">
      <div slot="search">
        <Form :label-width="80" class="common-form">
          <FormItem label="企业名称:">
            <Input type="text" v-model="search.corp_num" placeholder="请输入企业名称"></Input>
          </FormItem>
          <FormItem label="许可证号:" prop="corp_name">
            <Input type="text" v-model="search.corp_name" :readonly="true" placeholder="请输入许可证号"></Input>
          </FormItem>
          <FormItem label="经营地址:" prop="corp_area">
            <Input type="text" v-model="search.corp_name" :readonly="true" placeholder="请输入经营地址"></Input>
          </FormItem>
          <FormItem label="联系方式:" prop="corp_area">
            <Input type="text" v-model="search.corp_name" :readonly="true" placeholder="请输入联系方式"></Input>
          </FormItem>
          <FormItem :label-width="80" style="width: 100px;">
            <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </common-table>
  </Modal>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  export default{
    name:"select-repair-company",
    components:{CommonTable},
    props:['showType','detailData'],
    watch:{
      showType(){
        this.showModal = true;
      }
    },
    data(){
      return {
        search:{},
        total:0,
        page:1,
        limit:10,
        showModal:false,
        tableData:[],
        showTable:false,
        area:[],
        loading:false,
        columns: [
            {title: '企业名称', key: 'companyName', sortable: true, minWidth: 110},
            { title: '许可证号', key: 'license', sortable: true, minWidth: 150 },
            { title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 120 ,},
            { title: '法定代表人', key: 'corporate', sortable: true, minWidth: 120,},
            { title: '联系方式', key: 'companyLinkMantel', sortable: true, minWidth: 120,},
        ],
      }
    },
    methods:{
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      onRowClick( row, index){
            console.log('row：',row);
            
          this.setRepairCompany(row)
        },
      getName(data, code) {
        let name = ''
        for (let i in data) {
          if (data[i].regionCode == code) {
            name = data[i].shortName
            break
          }
        }
        return name
      },
      getList() {
        this.loading = true
        this.$axios.post('company/list', {
            businessAddress:"",
            companyLinkMantel:"",
            companyName:"",
            license:"",
            'pageNo': this.page,
            'pageSize': this.limit
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      },
      setRepairCompany(row) {
        this.$axios.post('/service/setRepairCompany', {
            "companyId": row.companyId,
            "id": this.detailData.id
        }).then((res) => {
          if (res.data.code == '0') {
            
          }
        })
      }
    },
    mounted(){
      this.search.corp_area = "0";
      this.getList();
    }
  }
</script>
