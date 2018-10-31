<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="角色代号:">
            <Input type="text" v-model="search.code" ></Input>
        </FormItem>
        <FormItem label="角色名:">
            <Input type="text" v-model="search.name" ></Input>
        </FormItem>
        <FormItem label="启用状态:">
          <Select v-model="search.state">
            <Option value="" selected>全部</Option>
            <Option value="true">启用</Option>
            <Option value="false">禁用</Option>
          </Select>
        </FormItem>
        <FormItem >
          <ButtonGroup size="small">
            <Button type="primary" @click="page=1;getList()"><Icon type="ios-search" size="24"/></Button>
            <Button type="primary" @click="clear()"><Icon type="ios-undo" size="24"/></Button>
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="success" v-if=""  @click="selectRow={},showDetail= Math.random()">新增</Button>
      <Button type="primary" v-if=""  @click="showDetail= Math.random()" :disabled="!selectRow.id">修改</Button>
      <Button type="info" :disabled="!selectRow.id" @click="showAssign= Math.random()">授权</Button>
      <Button type="error" v-show="selectRow.id&& selectRow.state" @click="setState">禁用</Button>
      <Button type="success" v-show="selectRow.id&& !selectRow.state" @click="setState">启用</Button>
    </div>
  </common-table>
  <role-manage-detail :data="selectRow" :show="showDetail" :total="total"
                      @refresh="selectRow={};getList()"></role-manage-detail>
  <role-assign :show="showAssign" :selectRow="selectRow" :columns="columns"></role-assign>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import RoleManageDetail from './role-manage-detail.vue'
  import RoleAssign from './role-assign.vue'
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
      RoleManageDetail,
      RoleAssign
    },
    data(){
		  return{
        columns: [
          {title: '角色ID', key: 'id',  minWidth: 100,},
          {title: '角色名', key: 'name',  minWidth: 100,},
          {title: '角色代号', key: 'code',  minWidth: 100},
          {title: '角色系统类型', key: 'system',  minWidth: 100,
            render: (h, params) => h('span', params.row.system.name)
          },
          {title: '角色状态', key: 'state',  minWidth: 100,
            render: (h, params) => h('span', params.row.state?'启用' :'禁用')
          },
        ],
        tableData: [],
        search:{
          code: '',
          name: '',
          state: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        showAssign: false,
        selectRow: {},
        clearTableSelect: null,


      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();

    },
    methods:{
      getList(){
        this.$axios.$post('/role/list', {
          "pageNo": this.page,
          "pageSize": this.limit,
          ...this.search
        }).then( (res) => {
          // console.log(res)
          this.tableData= res.items
          this.total= res.total
        })
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
        this.selectRow= row
      },
      onRowDblclick( row, index){
        this.selectRow=row
      },
      closeDetail(){
        this.detailData= null
        this.isOrderSuccess=true;
        this.clearTableSelect= Math.random()
      },
      //只有保存数据和提交数据的时候更新界面列表，
      closeGetList(){
        this.getList();
      },
      setState(){
        let showText= this.detailData.CHECK_STATUS== '10351004'? '恢复': '停用'
        this.$Modal.confirm({
          title: '确定要'+ showText+ '该门店吗？',
          onOk: ()=> {
            this.$axios({
              url: '/manage/info/tenantinfo/updateCheckStatus',
              method: 'post',
              data: {
                tenantId: this.detailData.TENANT_ID,
                checkStatus: this.detailData.CHECK_STATUS,
                access_token: this.query.access_token
              }
            }).then(res => {
              if (res.success === true) {
                this.$Message.success('门店'+showText+'成功')
                this.getList()
              }
            })
          }
        })
      }
    },
	}
</script>

<style scoped lang="less">
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
</style>
