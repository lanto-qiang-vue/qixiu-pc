<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="菜单名:">
            <Input type="text" v-model="search.name" ></Input>
        </FormItem>
        <FormItem label="父菜单ID:">
            <Input type="text" v-model="search.parentId" ></Input>
        </FormItem>
        <FormItem label="链接地址:">
          <Input type="text" v-model="search.uri" ></Input>
        </FormItem>
        <FormItem :label-width="0">

            <Button type="primary" @click="page=1;getList()">搜索</Button>


        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="success" v-if="accessBtn('add')"  @click="selectRow={},showDetail= Math.random()">新增</Button>
      <Button type="primary" v-if=""  @click="showDetail= Math.random()" :disabled="!selectRow.id">修改</Button>
      <Button type="error" v-if=""  @click="deleteMenu" :disabled="!selectRow.id">删除</Button>
    </div>
  </common-table>
  <menu-manage-detail :data="selectRow" :show="showDetail" :total="total"
                      @refresh="selectRow={};getList()"></menu-manage-detail>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import MenuManageDetail from './menu-manage-detail.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
      MenuManageDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        columns: [
          {title: '菜单名', key: 'name',  minWidth: 100,},
          {title: '菜单ID', key: 'id',  minWidth: 100},
          {title: '父菜单名', key: 'parentName',  minWidth: 100,
            render: (h, params) => h('span', params.row.parent.name)
          },
          {title: '父菜单ID', key: 'parentId',  minWidth: 100,
            render: (h, params) => h('span', params.row.parent.id)
          },
          {title: '链接地址', key: 'uri',  minWidth: 100},
          {title: '是否叶子菜单', key: 'leaf',  minWidth: 120},
          {title: '扩展属性', key: 'extInfo',  minWidth: 100},
          {title: '排序值', key: 'sortValue',  minWidth: 100},
        ],
        tableData: [],
        search:{
          name: '',
          parentId: '',
          uri: '',
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
          this.$axios.$post('/menu/list', {
            "pageNo": this.page,
            "pageSize": this.limit,
            ...this.search
          }).then( (res) => {
            // console.log(res)
            this.tableData= res.items
            this.total= res.total
				  })
        },
        deleteMenu(){
          this.$Modal.confirm({
            title: '确定删除“'+ this.selectRow.name+'”？',
            onOk: ()=> {
              this.$axios.$post('/menu/delete/'+ this.selectRow.id, {}).then( (res) => {
                if(res.code== '0'){
                  this.$Message.success('删除成功')
                  this.getList()
                }
              })
            }
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
