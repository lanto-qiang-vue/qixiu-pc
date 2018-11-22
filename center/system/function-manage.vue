<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="菜单名" prop="parentId">
          <Select v-model="search.menuId">
            <Option v-for="(item, index) in menuList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="功能名:">
            <Input type="text" v-model="search.name" ></Input>
        </FormItem>
        <FormItem label="功能key:">
            <Input type="text" v-model="search.btnId" ></Input>
        </FormItem>
        <FormItem label="接口地址:">
          <Input type="text" v-model="search.uri" ></Input>
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
    </div>
  </common-table>
  <function-manage-detail :data="selectRow" :menuList="menuList" :show="showDetail" :total="total"
                          @refresh="selectRow={};getList()" ></function-manage-detail>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import FunctionManageDetail from './function-manage-detail.vue'
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
      FunctionManageDetail
    },
    data(){
		  return{
        columns: [
          {title: '功能ID', key: 'id',  minWidth: 100},
          {title: '功能名', key: 'name',  minWidth: 100,},
          {title: '功能key', key: 'btnId',  minWidth: 100},
          {title: '菜单名', key: 'menu',  minWidth: 100,
            render: (h, params) => h('span', params.row.menu.name)
          },
          {title: '接口地址', key: 'uri',  minWidth: 100},
        ],
        tableData: [],
        search:{
          menuId: '',
          name: '',
          btnId: '',
          uri: '',
        },
        menuList:[],
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
      this.getMenuList()
      this.getList();
    },
    methods:{
      getMenuList(pageSize){
        let size= pageSize|| 100
        this.$axios.$post('/menu/list', {
          "pageNo": 1,
          "pageSize": size,
        }).then( (res) => {
          if(res.total> size){
            this.getMenuList(res.total)
          }else{
            for (let i in res.items){
              if(res.items[i].leaf){
                this.menuList.push(res.items[i])
              }
            }
          }
        })
      },
      getList(){
        this.$axios.$post('/function/list', {
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
