<!--质量信誉考核管理 2018-10-30  -->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
        <FormItem label="标题:">
            <Input type="text" v-model="searchList.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="状态:">
            <Select v-model="searchList.status" clearable>
                <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem :label-width="0" style="width: 90px;">
            <Button type="primary" v-if="accessBtn('list')" @click="searchFun">搜索</Button>
        </FormItem>

    </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="accessBtn('add')" @click="showAdd=Math.random();">新增</Button>
        <Button type="primary" v-if="accessBtn('updateStatus')" @click="updateFun" :disabled="showStatus">修改状态</Button>
        <Button type="info" v-if="accessBtn('detail')" @click="showDetail=Math.random();" :disabled="!detailData">查看详情</Button>
    </div>
<quality-manage-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></quality-manage-detail>
<quality-manage-add :showDetail="showAdd" @closeDetail="closeDetail"></quality-manage-add>

<Modal
    v-model="showModal"
    title="状态修改"
    width="400"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :styles="{height:'300px'}"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
        <Form :label-width="120" class="common-form">
            <FormItem label="状态:" style="width: 80%;">
                <Select v-model="searchStatus" clearable>
                    <Option v-for="item in statusList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Form>
    </div>
    <div slot="footer">
        <Button type="primary" v-if="accessBtn('add')" @click="updateStatus">确定</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import qualityManageDetail from './quality-manage-detail.vue'
import qualityManageAdd from './quality-manage-add.vue'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "quality-manage",
    components: {
      CommonTable,
      qualityManageDetail,
      qualityManageAdd
    },
    mixins: [funMixin],
    data(){
		  return{
              loading:false,
        columns: [
          {title: '标题', key: 'title', sortable: true, minWidth: 120,},
          {title: '描述', key: 'description', sortable: true, minWidth: 120},
          {title: '状态', key: 'status', sortable: true, minWidth: 135,
            render: (h, params) => h('span', params.row.status.name)
            },
        ],
        tableData: [],

        searchList:{
            status:"",
            title:"",
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        showOtherDetail:false,
        detailData: null,
        clearTableSelect: null,
        typeList:[
            
            {code:'1',name:'待发布'},
            {code:'2',name:'已发布'},
            {code:'3',name:'已撤销'},
        ],
        showAdd:false,//显示新增界面
        showStatus:true,
        showModal:false,
        statusList:[],
        searchStatus:'',
      }
    },
    mounted () {
      this.getList();
    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/reputation-assessmant/list', {
                    "status": this.searchList.status,
                    "title": this.searchList.title,
                    "pageNo": this.page,
                    "pageSize": this.limit,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
                }
           })
           this.detailData= null;
        },
        getType(){
            this.$axios.get('/dict/getValuesByTypeId/1', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    
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
            console.log('row：',row);
          this.detailData=row;
          if(row.status.id==3){
              this.showStatus=true;
          }else{
              this.showStatus=false;
          }
        },
        closeDetail(){
          this.detailData= null
          
          this.clearTableSelect= Math.random();
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.page= 1;
            this.closeDetail();
        },
        //解绑按钮-------
        removeBindFun(){
            this.$Modal.confirm({
                title:"系统提示!",
                content:"确定要解绑吗？",
                onOk:this.removeBind,
            })
        },
        removeBind(){
            this.$axios.post('/vehicle/carfile/remove-bind/'+this.detailData.id,{

            } ).then( (res) => {
                if(res.data.code=='0'){
                    this.closeDetail();
                }
            })
        },
        updateFun(){
            this.searchStatus='';
            this.showModal=true;
            if(this.detailData.status.id=='1'){
                this.statusList=[
                        {code:'2',name:'已发布'},
                        {code:'3',name:'已撤销'},
                    ]
            }else if(this.detailData.status.id=='2'){
                this.statusList=[
                        {code:'3',name:'已撤销'},
                    ]
            }
        },
        updateStatus(){
            this.$axios.post('/reputation-assessmant/update-status/'+this.detailData.id+'/'+this.searchStatus,{
            } ).then( (res) => {
                if(res.data.code=='0'){
                    this.showModal=false;
                }
            })
        },
        visibleChange(status){
          if(status === false){
            this.closeDetail();
            this.showStatus=true;
          }
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
