<template>
<div class="common-table" ref="commonTable">
  <Collapse v-model="collapse" v-show="showSearch"  class="table-search" @on-change="changeCollapse">
    <Panel name="1">查询
      <div slot="content" >
        <slot name="search"></slot>
      </div>
    </Panel>
  </Collapse>
  <div class="operate" v-show="showOperate">
    <slot name="operate"></slot>
  </div>
  <div>
  </div>
  <Table
    @on-selection-change="changeSelect"
    class="main-table"
    ref="tablesMain"
    :data="data"
    :columns="columns"
    stripe
    border
    :highlight-row="true"
    :show-header="showHeader"
    :width="width"
    :height="tableHeight"
    :loading="loading"
    :disabled-hover="disabledHover"
    :row-class-name="rowClassName"
    :size="size"
    :no-data-text="noDataText"
    :no-filtered-data-text="noFilteredDataText"
    @on-row-click="onRowClick"
    @on-row-dblclick="onRowDblclick"
    @on-current-change="onCurrentChange"
  >
  </Table>
  <div class="table-bottom" v-show="showPage">
    <div><slot name="footer"></slot></div>
    <Page :current="page" :page-size="10" show-sizer show-elevator show-total :page-size-opts="[10, 20, 50]"
    placement="top" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
    <Button class="refresh" @click="changePage(page)"><Icon type="md-refresh" size="20"/></Button>
  </div>
  <slot></slot>
</div>
</template>
<script>
	export default {
		name: "common-table",
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      },
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      size: String,
      width: {
        type: [Number, String]
      },
      height: {
        type: [Number, String]
      },
      stripe: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showPage:{
        type:Boolean,
        default: true
      },
      highlightRow: {
        type: Boolean,
        default: false
      },
      rowClassName: {
        type: Function,
        default () {
          return ''
        }
      },
      context: {
        type: Object
      },
      noDataText: {
        type: String
      },
      noFilteredDataText: {
        type: String
      },
      disabledHover: {
        type: Boolean
      },
      loading: {
        type: Boolean,
        default: false
      },
      total: {
        type: [Number, String],
        default: 0
      },
      /**
       * @description 全局设置是否可编辑
       */
      editable: {
        type: Boolean,
        default: false
      },
      /**
       * @description 是否可搜索
       */
      searchable: {
        type: Boolean,
        default: false
      },
      /**
       * @description 搜索控件所在位置，'top' / 'bottom'
       */
      searchPlace: {
        type: String,
        default: 'top'
      },
      clearSelect:{},
      show:{},
      showSearch:{
        type:Boolean,
        default:true
      },
      showOperate:{
        type:Boolean,
        default:true
      },
      page:{
        type: Number,
        default: 1
      }
    },
    data(){
		  return{
        // current: 1,
		    data:[],
        collapse: ['1','2'],
        tableHeight: '',
        timer: null,
        // windowInnerHeight: window.innerHeight
      }
    },
    watch:{
      clearSelect(val){
        this.$refs.tablesMain.clearCurrentRow()
      },
      show(){
        this.resize(500)
      },
      value(data){
        this.data= data
      },
    },
    mounted() {
		  let self= this
      // self.resize(1000)
      window.onresize = function(){
		    if(window.innerHeight!= self.windowInnerHeight)
          self.resize(200)
      }
    },
    methods:{
      resize(time){
        // let self= this
        // let commonTable=this.$refs.commonTable
        // console.log("origin.common-table", commonTable.offsetHeight)
        // if(commonTable.offsetHeight) {
        //   clearTimeout(this.timer);
        //   this.timer = setTimeout(function () {
        //     self.windowInnerHeight= window.innerHeight
        //     self.tableHeight = commonTable.offsetHeight - 20 -
        //       commonTable.querySelector(".table-search").offsetHeight -
        //       commonTable.querySelector(".operate").offsetHeight - 10 -
        //       commonTable.querySelector(".table-bottom").offsetHeight;
        //     commonTable.style.opacity = 1
        //
        //     console.log(".common-table", commonTable.offsetHeight)
        //     console.log(".table-search", commonTable.querySelector(".table-search").offsetHeight)
        //     console.log(".operate", commonTable.querySelector(".operate").offsetHeight)
        //     console.log(".table-bottom", commonTable.querySelector(".table-bottom").offsetHeight)
        //   }, time);
        // }
      },
      changeCollapse(){
        this.resize(500)
      },
      changePage(page){
        this.$emit('changePage', page)
      },
      changePageSize(size){
        this.$emit('changePageSize', size)
      },
      changeSelect(selection){
       this.$emit('changeSelect',selection);
      },
      onRowClick( row, index){
        this.$emit('onRowClick',row, index);
      },
      onRowDblclick( row, index){
        this.$emit('onRowDblclick',row, index);
      },
      onCurrentChange(currentRow, oldCurrentRow){
        this.$emit('onCurrentChange',currentRow, oldCurrentRow);
      }
    },
    activated(){
      this.resize(500)
    }
	}
</script>

<style lang="less" scoped>
.common-table{
  padding: 10px;
  background-color: white;
  height: 100%;
  overflow: auto;
  position: relative;
  /*opacity: 0;*/
  transition: opacity .2s;
  .table-search{
    margin-bottom: 10px;
  }
  .operate{
    margin-bottom: 10px;
    padding: 15px 15px 10px 15px;
    border: 1px solid #dcdee2;
    border-radius: 3px;
  }
  .operate button{
    margin: 0 5px 5px 0;
  }
  .table-bottom{
    /*position: absolute;*/
    /*height: 52px;*/
    padding: 10px;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: white;
    z-index: 4;
  }
}
</style>
<style lang="less">
.common-table{
  .main-table{
    .ivu-table-row{
      cursor: default;
    }
  }
  .table-bottom{
    .ivu-page{
      display: inline-block;
      vertical-align: middle;
      .ivu-page-item-jump-prev, .ivu-page-item-jump-next{
        display: none;
      }
      .ivu-page-options{
        margin-left: 5px;
      }
    }
    .refresh{
      vertical-align: middle;
      margin-left: 10px;
    }
  }
}
</style>
