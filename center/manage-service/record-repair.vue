<!--根据维修记录查找  -->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">

        <FormItem label="车牌号:">
            <Input type="text" v-model="searchList.vehicleplatenumber" placeholder="请输入车牌号"></Input>
        </FormItem>
        <FormItem label="VIN:">
            <Input type="text" v-model="searchList.vin" placeholder="请输入车架号"></Input>
        </FormItem>
        <FormItem label="维修企业:">
            <Input type="text" v-model="searchList.companyName" placeholder="请输入维修企业"></Input>
        </FormItem>

        <FormItem label="车牌正确:">
            <Select v-model="searchList.byVehicleNumberStandard" clearable @on-change="onChangeVehicle">
                <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="VIN正确:">
            <Select v-model="searchList.byVinStandard" clearable @on-change="onChangeVIN">
                <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="维修记录存在错误:">
            <Select v-model="searchList.fault" clearable @on-change="onChangeFault">
                <Option v-for="item in typeList1" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="上传时间:">

            <DatePicker type="daterange" v-model="searchList.receiveTime" placeholder="请选择" :options="options" ></DatePicker>

        </FormItem>

            <FormItem :label-width="0" style="width: 90px;">
                <Button type="primary" v-if="accessBtn('query')" @click="searchFun">搜索</Button>

            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('view')" @click="showDetail=Math.random();" :disabled="!detailData">查看</Button>
    </div>
    <record-repair-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></record-repair-detail>
</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import recordRepairDetail from '~/components/record-repair-detail.vue'
import funMixin from '~/components/fun-auth-mixim.js'
import { deepClone } from '@/static/util.js'
import { formatDate } from '@/static/tools'

var searchList= {
  byVehicleNumberStandard:"all",
  byVinStandard:"all",
  companyName:"",
  vehicleplatenumber:"",
  vin:'',
  fault:'',
  receiveTimeBegin:'',
  receiveTimeEnd:'',
  receiveTime:[],
}

function markChange(newArr,field){
  let arr= field.split(','),flag=false
  for(let i in arr){
    if(newArr.indexOf(arr[i])>=0){
      flag= true
      break
    }
  }

  return flag
}

if(!thisData) {
  

  var thisData= {
    loading:false,
    allFields:[],
    typeList: [
      {code:'yes',name:'正确'},
      {code:'no',name:'错误'},
    ],//问题分类--------
    typeList1: [
      {code:'true',name:'是'},
      {code:'false',name:'否'},
    ],//问题分类--------
    columns: [

      {title: '序号', width:80, type: 'index'},
      {title: '车牌号码', key: 'plateNumber', sortable: true, minWidth: 110,
        render: (h, params) => {
            let colorStr=markChange(params.row.fields,"plateNumber")?"#ed4014":"#515a6e";
              return h('div', [
                  h('span',{
                      style:{
                        color:colorStr
                      },
                  }, params.row.plateNumber)
              ]);
        }

      },
      {title: '车牌正确', key: 'checkVn', sortable: true, minWidth: 120,
        render: (h, params) => {
            let colorStr=markChange(params.row.fields,"checkVn")?"#ed4014":"#515a6e";
              return h('div', [
                  h('span',{
                      style:{
                        color:colorStr
                      },
                  }, params.row.checkVn)
              ]);
        }
      },
      {title: '车辆识别号VIN', key: 'vin', sortable: true, minWidth: 150,
        render: (h, params) => {
            let colorStr=markChange(params.row.fields,"vin")?"#ed4014":"#515a6e";
              return h('div', [
                  h('span',{
                      style:{
                        color:colorStr
                      },
                  }, params.row.vin)
              ]);
        }
      },
      {title: 'VIN正确', key: 'checkVin', sortable: true, minWidth: 120,
        render: (h, params) => {
            let colorStr=markChange(params.row.fields,"checkVin")?"#ed4014":"#515a6e";
              return h('div', [
                  h('span',{
                      style:{
                        color:colorStr
                      },
                  }, params.row.checkVin)
              ]);
        }
      },
      {title: '结算日期', key: 'settleDate', sortable: true, minWidth: 110 ,
        render: (h, params) => {
            let colorStr=markChange(params.row.fields,"settleDate")?"#ed4014":"#515a6e";
              return h('div', [
                  h('span',{
                      style:{
                        color:colorStr
                      },
                  }, params.row.settleDate)
              ]);
        }
      },
      {title: '结算编号', key: 'costlistcode', sortable: true, minWidth: 150,
        render: (h, params) => {
            let colorStr=markChange(params.row.fields,"costlistcode")?"#ed4014":"#515a6e";
              return h('div', [
                  h('span',{
                      style:{
                        color:colorStr
                      },
                  }, params.row.costlistcode)
              ]);
        }
      },
      {title: '维修企业', key: 'companyName', sortable: true, minWidth: 150,
        render: (h, params) => {
            let colorStr=markChange(params.row.fields,"companyName")?"#ed4014":"#515a6e";
              return h('div', [
                  h('span',{
                      style:{
                        color:colorStr
                      },
                  }, params.row.companyName)
              ]);
        }
      },
    ],
    tableData: [],
    searchList:{
      byVehicleNumberStandard:"all",
      byVinStandard:"all",
      companyName:"",
      vehicleplatenumber:"",
      vin:'',
      fault:'',
      receiveTimeBegin:'',
      receiveTimeEnd:'',
      receiveTime:[],
    },
    page: 1,
    limit: 10,
    total: 0,
    showTable:false,
    showDetail: false,
    showOtherDetail:false,
    detailData: null,
    clearTableSelect: null,
    options: {
      disabledDate (date) {
        let now = new Date();
        let d1 = new Date(now.getFullYear(),now.getMonth(),now.getDate()-1);
        return date > d1;
      }
    },

  }
}
export default {
	name: "record-repair",
    components: {
      CommonTable,
      recordRepairDetail
    },
    mixins: [funMixin],
    data(){
      thisData.searchList= this.getRouterData()

		  return thisData
    },

    mounted () {

      // this.getRouterData();
    //   this.getType();
    },
  activated(){
    // console.log('activated()')
    // this.getRouterData();
    if(!this.queryed || Object.keys(this.$route.query)){
      this.getList()
    }
  },

    methods:{
      getRouterData(){
        let queryData=this.$route.query;
        console.log('this.$route.query',this.$route);
        let search= thisData.searchList
        search= deepClone(searchList)
        if(Object.keys(queryData).length){
                if(queryData.name){
                  search.companyName= queryData.name
                }
                if(queryData.start){
                  search.receiveTime.push(queryData.start)
                }
                if(queryData.end){
                  search.receiveTime.push(queryData.end)
                }
                if(queryData.fault){
                  search.fault=queryData.fault;
                }
        }
        return search
      },
      getList(){
          this.loading=true;
          this.$axios.post('/vehicle/carfile/query4manager', {
                  "byVehicleNumberStandard":this.searchList.byVehicleNumberStandard,
                  "byVinStandard":this.searchList.byVinStandard,

                  "companyName":this.searchList.companyName,
                  "receiveTimeBegin":formatDate(this.searchList.receiveTime[0]),
                  "receiveTimeEnd":formatDate(this.searchList.receiveTime[1]),
                  "pageNo": this.page,
                  "pageSize": this.limit,
                  "fault":this.searchList.fault,
                  "vehicleplatenumber":this.searchList.vehicleplatenumber,
                  "vin":this.searchList.vin,
          }).then( (res) => {
              if(res.data.code=='0'){
                  this.tableData=res.data.items;
                  this.total=res.data.total;
                  this.loading=false;
                this.queryed= true
              }
          })
          this.detailData= null;
      },
      //判断是否错误
      markChange(field){
        let arr= field.split(','),flag=false
        for(let i in arr){
          if(this.allFields.indexOf(arr[i])!=0){
            flag= true
            break
          }
        }

        return flag
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
          this.detailData=row
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
        onChangeVehicle(val){
          // console.log('数据1：',val);
          if(val){
            this.searchList.fault='';
          }

        },
        onChangeVIN(val){
          // console.log('数据2：',val);

          if(val){
            this.searchList.fault='';
          }
        },
        onChangeFault(val){
          // console.log('数据3：',val);
          if(val){
            this.searchList.byVehicleNumberStandard='';
            this.searchList.byVinStandard='';
          }

        }

    },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    thisData= this.$data
    // console.log('beforeRouteLeave:', thisData)
    next()
  }
}
</script>

<style scoped lang="less">


  .mark-change{
    color: #ed4014;
  }
</style>
