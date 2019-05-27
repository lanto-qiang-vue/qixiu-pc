
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" :showOperate=false>
    <div  slot="search"  >
        <Form :label-width="100" class="common-form z-common-form">
              <FormItem label="管理区域:">
                  <!--<Cascader :data="areaList" @on-change="handleChange" :change-on-select=true></Cascader>-->
                  <area-select :change-on-select="true"
                             @changeSelect="search.area= $event"
                              :rules="{shanghai: { useSelect: false, mode: 'login-areas'}}"
                ></area-select>
              </FormItem>
              <FormItem label="起讫号:">
                  <Input type="text" v-model="search.code" placeholder="请输入起讫号"></Input>
              </FormItem>
              <FormItem label="申领日期区间:">
                  <DatePicker  type="daterange"  placeholder="请选择" @on-change="changeTime"></DatePicker>
              </FormItem>
              <FormItem label="维修企业:">
                  <Input type="text" v-model="search.corpName" placeholder="请输入维修企业名称"></Input>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
  </common-table>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
import AreaSelect from '~/components/area-select.vue'
export default {
	name: "certificate-apply-list",
    components: {
      CommonTable,
      AreaSelect
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          {title: '序号',  width: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '管理区域', key: 'areaName',  minWidth: 120},
          {title: '企业名称', key: 'corpName',  minWidth: 135},
          {title: '起讫号开始', key: 'codeStart',  minWidth: 120},
          {title: '起讫号结束', key: 'codeEnd',  minWidth: 120},
          {title: '申领数量', key: 'applyNum',  minWidth: 120},
          {title: '申领日期', key: 'applyDate',  minWidth: 120}
        ],
        tableData: [],
        search:{
          "applyDateEnd": "",
          "applyDateStart": "",
          "code": "",
          "corpName": "",
          "dept": "",
          "org": "",
          "pageNo": 0,
          "pageSize": 0,
          area:''
        },
        typeList:[],
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        detailData: null,
        clearTableSelect: null,
        areaList:[]
      }
    },
    mounted () {
      this.getList();
      this.getArea();
    },
    methods:{
        getList(){
          this.loading=true;
          this.search['pageNo']=this.page;
          this.search['pageSize']=this.limit;
          this.$axios.post('/certificate/apply/manager/list', this.search).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }
          })
          this.detailData= null;
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
          this.search.applyDateStart=val[0];
          this.search.applyDateEnd=val[1];
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
