<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="手机号:">
            <Input type="text" v-model="search.mobileNo" ></Input>
        </FormItem>
        <FormItem label="昵称:">
            <Input type="text" v-model="search.nickname" ></Input>
        </FormItem>
        <FormItem label="通过审核:">
          <Select v-model="search.disabled" clearable>
            <Option value="" selected>全部</Option>
            <Option value="true">是</Option>
            <Option value="false">否</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="0">
          
            <Button type="primary" @click="page=1;getList()">搜索</Button>
            
          
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <!--<Button type="success" v-if=""  @click="selectRow={},showDetail= Math.random()">新增</Button>-->
      <!--<Button type="primary" v-if=""  @click="showDetail= Math.random()" :disabled="!selectRow.id">修改</Button>-->
      <Button type="info" :disabled="!selectRow.id" @click="showDetail= Math.random()">分配角色</Button>
    </div>
  </common-table>
  <user-role :show="showDetail"  :selectRow="selectRow" :columns="columns"
                      @refresh="selectRow={};getList()"></user-role>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import UserRole from './user-manage-role.vue'
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
      UserRole
    },
    data(){
		  return{
        columns: [
          {title: '用户ID', key: 'id',  minWidth: 100,},
          {title: '手机号', key: 'mobile',  minWidth: 100,},
          {title: '昵称', key: 'nickName',  minWidth: 100},
          {title: '通过审核', key: 'disabled',  minWidth: 100,
            render: (h, params) => h('span', params.row.disabled? '否': '是')
          },
          {title: '用户类型', key: 'type',  minWidth: 100,
            render: (h, params) => h('span', params.row.type?params.row.type.name: '')
          },
          {title: '上次登录时间', key: 'lastLogin',  minWidth: 100},
        ],
        tableData: [],
        search:{
          mobileNo: '18700000001',
          nickname: '',
          disabled: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
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
        this.selectRow={}
        this.$axios.$post('/user/useraccount/list', {
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
