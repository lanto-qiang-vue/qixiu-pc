<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="系统类型名:">
            <Input type="text" v-model="search.name" ></Input>
        </FormItem>
        <FormItem label="系统类型代号:">
            <Input type="text" v-model="search.code" ></Input>
        </FormItem>
        <FormItem :label-width="0">
          
            <Button type="primary" @click="page=1;getList()">搜索</Button>
            
          
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="success" v-if=""  @click="selectRow={},showDetail= Math.random()">新增</Button>
      <Button type="primary" v-if=""  @click="showDetail= Math.random()" :disabled="!selectRow.id">修改</Button>
    </div>
  </common-table>
  <system-manage-detail :data="selectRow" :show="showDetail" :total="total"
                      @refresh="selectRow={};getList()"></system-manage-detail>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import SystemManageDetail from './system-type-manage-detail'
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
      SystemManageDetail
    },
    data(){
		  return{
        columns: [
          {title: '系统类型ID', key: 'id',  minWidth: 100},
          {title: '系统类型名', key: 'name',  minWidth: 100,},
          {title: '系统类型代号', key: 'code',  minWidth: 100,},
        ],
        tableData: [],
        search:{
          name: '',
          code: '',
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
          this.$axios.$post('/system/list', {
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
