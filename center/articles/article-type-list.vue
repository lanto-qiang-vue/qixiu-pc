<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="文章类型名:">
            <Input type="text" v-model="search.codeDesc" ></Input>
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
      <Button type="success" v-if=""  @click="create">新增</Button>
      <Button type="primary" v-if=""  @click="showDetail=true" :disabled="!selectRow.codeId">修改</Button>
      <Button type="error" v-if=""  @click="del" :disabled="!selectRow.codeId">删除</Button>
    </div>
  </common-table>
  <Modal
    v-model="showDetail"
    title="编辑文章类型"
    width="50"
    @on-visible-change=""
    :footer-hide="false"
    class=""
    :mask-closable="false"
    :transition-names="['', '']"
  >
    <Form ref="form" :model="detail" :label-width="110"  class="common-form">
      <FormItem label="文章类型名" prop="name">
        <Input type="text" v-model="selectRow.codeDesc" ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="showDetail=false">取消</Button>
      <Button type="primary" @click="save">保存</Button>
    </div>
  </Modal>
</div>
</template>

<script>
  import { deepClone } from '~/static/util.js'
  import CommonTable from '~/components/common-table.vue'
  const initData= {
    codeDesc: '',
    type: '1028',
  }
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '文章类型ID', key: 'codeId',  minWidth: 100},
          {title: '文章类型名', key: 'codeDesc',  minWidth: 100},
          {title: 'num', key: 'num',  minWidth: 100},
        ],
        tableData: [],
        search:{
          codeDesc: '',
          type: '1028',
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
        this.selectRow=deepClone(initData)
        this.$axios.$post('/article/category/list', {
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
        this.selectRow= deepClone(row)
      },
      onRowDblclick( row, index){
        this.selectRow= deepClone(row)
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
      del(){
        this.$Modal.confirm({
          title: '确定删除“'+this.selectRow.codeDesc+'”吗？',
          onOk: () => {
            this.$axios.post('/article/category/delete/'+this.selectRow.codeId ,this.formData).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('删除成功')
                this.getList();
              }
            })
          }
        })
      },
      create(){
        this.selectRow=deepClone(initData)
        this.showDetail= true
      },
      save(){
        this.$axios.$post('/article/category/add', this.selectRow).then( (res) => {
          if(res.code=='0'){
            this.showDetail=false
            this.getList();
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
