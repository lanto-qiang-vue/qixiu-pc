
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" :showOperate=false>
    <div  slot="search"  >
        <Form :label-width="100" class="common-form z-common-form">
              <FormItem label="管理区域:">
                  <Cascader :data="areaList" @on-change="handleChange" :change-on-select=true></Cascader>
              </FormItem>
              <FormItem label="维修企业:">
                  <Input type="text" v-model="search.corpName" placeholder="请输入维修企业"></Input>
              </FormItem>
              <FormItem label="统计日期:">
                  <DatePicker type="daterange" placeholder="请选择" @on-change="changeTime"></DatePicker>
              </FormItem>
              <FormItem label="维修类型:">
                  <Select v-model="search.repairType" clearable>
                    <Option v-for="item in typeList" :value="item.key" :key="item.key">{{ item.name }}</Option>
                  </Select>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
    </div>
  </common-table>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "certificate-use-list",
    components: {
      CommonTable
    },
    mixins: [funMixin],
    data(){
		return{
        loading:false,
        columns: [
          {title: '管理区域', key: 'areaName',  minWidth: 120,},
          {title: '企业名称', key: 'corpName',  minWidth: 120},
          {title: '申领次数', key: 'applyCount',  minWidth: 120},
          {title: '申领合格证数', key: 'applyNum',  minWidth: 120,},
          {title: '使用合格证数', key: 'useNum',  minWidth: 120,}
        ],
        tableData: [],
        search:{
          "corpName": "",
          "dateEnd": "",
          "dateStart": "",
          "dept": "",
          "org": "",
          "pageNo": 0,
          "pageSize": 0,
          "repairType": ""
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        typeList:[],
        areaList:[]

      }
    },
    mounted () {
      this.getList();
        this.getType();
        this.getArea();
    },
    methods:{
        getList(){
          this.loading=true;
          this.search['pageNo']=this.page;
          this.search['pageSize']=this.limit;
          this.$axios.post('/certificate/apply/statistics', this.search).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }
          })
          this.detailData= null;
        },
        getType(){
          this.$axios.get('/company/repair/quality/type', {
          }).then( (res) => {
            if(res.data.code=='0'){
                this.typeList=res.data.items
            }
          })

        },
         //获取区域信息
        getArea() {
          this.$axios.get('/area/dept/list/all/'+process.env.config.areaName, ).then((res) => {
            if (res.data.code == '0'){
              this.areaList = res.data.items;
            }
          })
        },
        changeTime(val){
          this.search.dateStart=val[0];
          this.search.dateEnd=val[1];
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
            this.detailData=row
        },
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          this.getList();
        },
        handleChange(val){
          switch(val.length){
            case 0:{
              this.search.org='';
              this.search.dept='';
              break;
            }
            case 1:{
              this.search.org=val[0];
              this.search.dept='';
              break;
            }
            case 2:{
              this.search.org=val[0];
              this.search.dept=val[1];
              break;
            }
          }
        }


    },
	}
</script>

<style scoped lang="less">
.z-common-form .ivu-form-item {
    width: 280px;
}
</style>
