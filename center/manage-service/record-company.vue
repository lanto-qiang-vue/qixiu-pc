<!--根据维修企业查找-->

<template>

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading" @onSortChange="onSortChange">
    <div  slot="search"  >
      <Form :label-width="100" class="common-form" :model="searchList" ref="searchForm">
          <FormItem label="区域:">
            <Select v-model="searchList.area.key" clearable>
                <Option v-for="item in areaOption" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="企业名称:">
            <Input type="text" v-model="searchList.companyName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem label="许可证号:">
            <Input type="text" v-model="searchList.license" placeholder="请输入许可证号"></Input>
        </FormItem>
        <FormItem label="维修品牌:">
            <Input type="text" v-model="searchList.repairBrand" placeholder="请输入维修品牌"></Input>
        </FormItem>
        <FormItem label="企业品牌:">
          <!--<Input type="text" v-model="searchList.chainBrand" placeholder="请输入连锁品牌"></Input>-->
          <Select v-model="searchList.chainBrand" filterable remote clearable placeholder="请输入企业品牌"
                  @on-open-change="resetsetChainBrand" ref="chainBrand" :remote-method="getChainBrand" >
            <Option v-for="(option, index) in chainBrand" :value="option.name" :key="index">{{option.name}}</Option>
          </Select>
        </FormItem>
         <FormItem label="企业类型:">
            <Select v-model="searchList.companyCategory" clearable>
                <Option v-for="item in companyType" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否对接:">
            <Select v-model="searchList.buttJoin" clearable>
                <Option v-for="item in isFlagType" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="未上传天数:">
            <Select v-model="searchList.inDays" clearable>
                <Option v-for="item in idaysType" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否总对总:">
            <Select v-model="searchList.minister" clearable>
                <Option v-for="item in isFlagType" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否特约维修:" >
            <Select v-model="searchList.special" clearable>
                <Option v-for="item in isFlagType" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="经营状态:">
            <Select v-model="searchList.businessStatus" clearable>
                <Option v-for="item in businessType" :value="item.key" :key="item.key">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否前台显示:">
            <Select v-model="searchList.show" clearable>
                <Option v-for="item in isFlagType" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="管理部门:">
            <Cascader :data="manageType" change-on-select v-model="manageArr"></Cascader>
        </FormItem>
        <FormItem label="按月查询:">
            <DatePicker v-model="searchList.uploadMonth" type="month" placeholder="请选择" :options="dateOptions" @on-change="clear('year')"></DatePicker>
        </FormItem>
        <FormItem label="按年查询:">
          <DatePicker v-model="searchList.year" type="year" placeholder="请选择" :options="yearOptions" @on-change="clear('uploadMonth')"></DatePicker>
        </FormItem>
        <FormItem :label-width="0" style="width: 120px;">
            <Button type="primary" v-if="accessBtn('query')" @click="searchFun">搜索</Button>
        </FormItem>
    </Form>
    </div>
    <div slot="operate">
      <Button type="info" @click="backCompany" :disabled="!detailData">查看</Button>
      <Button type="primary" v-if="accessBtn('export')" @click="exportList">导出</Button>
    </div>

</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import { formatDate } from '@/static/tools.js'
import funMixin from '~/components/fun-auth-mixim.js'
import { getName, deepClone } from '@/static/util.js'

var searchList={
  "area": {
    key: ''
  },//区域
  "businessStatus": "",//企业状态
  "buttJoin": "",//是否对接
  "companyCategory": '',//维修企业类型
  "companyName": "",//企业名称
  "dept": '',//管理部门
  "inDays": "",//未上传天数
  "license": "",//许可证号
  "minister": "",//是否总对总
  "org": '',//管理部门
  "show": "",//是否前台显示
  "special": "",//是否特约
  "uploadMonth": "",//按月查询
  order:0,//排序查询
  index:13,
  repairBrand: '',
  year: '',
  chainBrand: '',
}
if(!thisData) {
  var thisData= {
    loading:false,
    typeList: [
      {code:'yes',name:'有登录'},
      {code:'no',name:'未登录'},
    ],//问题分类--------
    columns: [
      {title: '区域', key: 'shortName', sortable: 'custom', minWidth: 80,
        // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
      },
      {title: '企业类型', key: 'category', sortable: 'custom', minWidth: 120},
      {title: '企业名称', key: 'companyName', sortable: 'custom', minWidth: 135},
      {title: '经营地址', key: 'businessAddress', sortable: 'custom', minWidth: 150},
      {title: '是否对接', key: 'buttJoin', sortable: 'custom', minWidth: 110},
      {title: '上传数量', key: 'count', sortable: 'custom', minWidth: 110},
      {title: '许可证', key: 'license', sortable: 'custom', minWidth: 120},
      {title: '经营范围', key: 'businessScope', sortable: 'custom', minWidth: 150},
      {title: '未上传天数', key: 'noUpdateDays', sortable: 'custom', minWidth: 120},
      {title: '总对总', key: 'minister', sortable: 'custom', minWidth: 100},
      {title: '特约维修', key: 'special', sortable: 'custom', minWidth: 110},
      {title: '经营状态', key: 'businessStatus', sortable: 'custom', minWidth: 110,
        // render: (h, params) => h('span', params.row.businessStatus.name)
      },
      {title: '前台显示', key: 'show', sortable: 'custom', minWidth: 110},
      {title: '对接时间', key: 'firstUploadTime', sortable: 'custom', minWidth: 110},
      {title: '维修品牌', key: 'repairBrand', sortable: 'custom', minWidth: 110},
      {title: '连锁品牌', key: 'chainBrand', sortable: 'custom', minWidth: 110},
      // {title: '备注', key: 'remark，', sortable: 'custom', minWidth: 200},
    ],
    tableData: [],
    searchList: deepClone( searchList),
    manageArr:[],
    page: 1,
    limit: 10,
    total: 0,
    showTable:false,
    showDetail: false,
    showOtherDetail:false,
    detailData: null,
    clearTableSelect: null,
    areaOption:[],//区域数据集合----
    companyType:[],//企业类型集合----
    businessType:[],//经营状态类型集合------
    manageType:[],//管理部门数据集合--------
    isFlagType:[
      {code:"是",name:'是'},
      {code:"否",name:'否'},
    ],
    idaysType:[

      {code:"7",name:'大于7天'},
      {code:"15",name:'大于15天'},
      {code:"30",name:'大于30天'},
    ],
    typeArr:[
      {code:"shortName",name:0},
      {code:"category",name:1},
      {code:"companyName",name:2},
      {code:"businessAddress",name:3},
      {code:"buttJoin",name:4},
      {code:"count",name:5},
      {code:"license",name:6},
      {code:"businessScope",name:7},
      {code:"noUpdateDays",name:8},

      {code:"minister",name:9},
      {code:"special",name:10},
      {code:"businessStatus",name:11},
      {code:"show",name:12},
      {code:"firstUploadTime",name:13},
    ],
    dateOptions: {
        disabledDate (date) {
            let oDate=new Date();
            oDate.setMonth(oDate.getMonth());
            oDate.setDate(0);
            oDate.setHours(0);
            oDate.setMinutes(0);
            oDate.setMilliseconds(0);

            return date && date.valueOf() >= oDate.getTime();
        }
    },
    yearOptions: {
      disabledDate (date) {
        let oDate=new Date(),nDate=new Date();
        oDate.setFullYear(2018)
        nDate.setFullYear(oDate.getFullYear()+1)
        oDate.setMonth(0);
        oDate.setDate(0);
        oDate.setHours(0);
        oDate.setMinutes(0);
        oDate.setMilliseconds(0);
        nDate.setMonth(0);
        nDate.setDate(0);
        nDate.setHours(0);
        nDate.setMinutes(0);
        nDate.setMilliseconds(0);
        return date && (date.valueOf()< oDate.getTime() || date.valueOf() > nDate.getTime() );
      }
    },
    chainBrand: []
  }
}
export default {
	name: "record-company",
    components: {
      CommonTable,
    },
    mixins: [funMixin],
    data(){
	  console.log('data()')
      // this.testFun()
      thisData.searchList= this.getRouterData()
	    return thisData
    },
  // watch:{
  //   total(n, o, b){
  //     console.log('watch.total: ',o, n, b)
  //   }
  // },
  // activated(){
	//   console.log('activated')
  // },
  // beforeRouteEnter(to, from, next){
  //   console.log('beforeRouteEnter')
  //   next()
  // },
  // beforeRouteUpdate(to, from, next){
  //   console.log('beforeRouteUpdate')
  //   next()
  // },
  mounted () {
	    console.log('record-company: mounted', this.$route.query)
        this.getAreaInfo();
        this.getType('1');
        this.getBusinessType();
        this.getCompanyArea();


},
activated(){
  console.log('activated()')
    // this.getRouterData();
  if(!this.queryed || Object.keys(this.$route.query).length){
    this.getList()
  }

  // console.log('queryData.category', queryData.category)
  // console.log('this.searchList.companyCategory', this.searchList.companyCategory)
  // console.log('this.$data.searchList.companyCategory', this.$data.searchList.companyCategory)
  // console.log('thisData.searchList.companyCategory', thisData.searchList.companyCategory)
  // console.log('this.$data', this.$data)
},
    methods:{
        getRouterData(){
            let queryData= this.$route.query
            let search= thisData.searchList
            console.log(JSON.stringify(queryData))
                    // for(let key in queryData){
                    //   if(key) flag= true
                    // }
                    // console.log('getRouterData.this.$route.query', Object.keys(this.$route.query).length)
                    //  let arr= Object.keys(this.$route.query)
            if(Object.keys(queryData).length){
                    // this.$data.searchList= null
                search= deepClone(searchList)

                if(queryData.area){
                search.area= {
                    key: queryData.area
                }
                }
                if(queryData.category){
                search.companyCategory= parseInt(queryData.category);
                }
                if(queryData.name=="zdz"){
                if(queryData.minister==1){
                    search.minister="是";
                    search.buttJoin="是";

                }else{
                    search.minister="否";
                    search.buttJoin="是";
                }
                }

                // this.getList();

            }
            console.log('search', search)
            return search



        },
        getList(){
            this.loading=true;
            let upData={};
            console.log(',,,,,,,,',this.searchList);
            for(let i in this.searchList){
                if(this.searchList[i]=="是"){
                    upData[i]=true;
                }else if(this.searchList[i]=="否"){
                    upData[i]=false;
                }else if(i=='area'){
                  if(i=='area' &&!this.searchList[i].key) upData[i]= null
                  else upData[i]=this.searchList[i];
                }else if(this.searchList[i]!=null){
                    upData[i]=this.searchList[i];
                }else{
                    upData[i]=null;
                }
            }
            console.log(upData["uploadMonth"],this.manageArr);
            if(this.manageArr.length>0){
                upData["org"]=this.manageArr[0]||'';
                upData["dept"]=this.manageArr[1]||'';
            }
            upData["uploadMonth"]=formatDate(upData["uploadMonth"],'yyyy-MM');
            upData["year"]=formatDate(upData["year"],'yyyy');
            upData.pageNo= this.page
            upData.pageSize= this.limit
            this.$axios.post('/vehicle/repair/query',upData).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
                    this.queryed= true
                }
           })
           this.detailData= null;
        },
        exportList(){
            let upData={};
            for(let i in this.searchList){
                if(this.searchList[i]=="是"){
                    upData[i]=true;
                }else if(this.searchList[i]=="否"){
                    upData[i]=false;
                }else if(i=='area'){
                  if(i=='area' &&!this.searchList[i].key) upData[i]= null
                  else upData[i]=this.searchList[i];
                }else if(this.searchList[i]){
                    upData[i]=this.searchList[i];
                }else{
                    upData[i]=null;
                }
            }
            console.log(upData["uploadMonth"],this.manageArr);
            if(this.manageArr.length>0){
                upData["org"]=this.manageArr[0]||'';
                upData["dept"]=this.manageArr[1]||'';
            }
            upData["uploadMonth"]=formatDate(upData["uploadMonth"],'yyyy-MM');



            this.$axios({
              method: 'post',
              url: '/vehicle/repair/export',
              data: upData,
              responseType: 'arraybuffer'
            }).then( (res) => {
                console.log('res',res)

                let headerData=res.headers["content-disposition"].split(';')[1].split('=');
                let headerName=headerData[1].substring(1,(headerData[1].length)-1)
                console.log(headerData,headerName);


                let blob = new Blob([res.data], {type: 'application/octet-stream'});

                // console.log(blob);
                let a = document.createElement('a');
                a.download = headerName;

                a.href = window.URL.createObjectURL(blob);
                $("body").append(a);
                a.click();
                $(a).remove();

           })
           this.detailData= null;
        },
        //获取区域数据-------
        getAreaInfo(){
            this.$axios.post('/area/region/list', {
                   "areaName": "shanghai"
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.areaOption=res.data.items;
                }else{
                    // this.$Message.error(res.data.status);
                }
           })

        },
        getBusinessType(){
            this.$axios.get('/company/category/business/list', {
            }).then( (res) => {
                if(res.data.code=='0'){

                    this.businessType=res.data.items;

                }
           })
        },
        getType(id){
            this.$axios.get('/dict/getValuesByTypeId/'+id, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    if(id=="1"){
                        this.companyType=res.data.items;
                    }else if(id=='24'){
                        // this.businessType=res.data.items;
                    }
                }else{
                    // this.$Message.error(res.data.status);
                }
           })
        },
        getCompanyArea(){
            this.$axios.get('/area/dept/list/all/shanghai', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.manageType=res.data.items;
                }else{
                    // this.$Message.error(res.data.status);
                }
           })
        },
      clear(item){
          this.searchList[item]= null
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
        onSortChange(type,value){
            if(type=="normal"){
                this.searchList.order='';
                this.searchList.index='';
                this.getList();
            }else{

                if(type=="desc"){
                    this.searchList.order=0;
                }else if(type=="asc"){
                    this.searchList.order=1;
                }

                this.searchList.index=getName(this.typeArr,value);
                this.getList();
            }

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
        //跳转链接------
        backCompany(){
            var query={flag:true,name:this.detailData.companyName};
            this.$router.push({path:'/center/record-repair',query:query});
        },
      getChainBrand(name){
        this.$axios.post('/corp/brand/name', {
          "name":name
        }).then( (res) => {
          if(res.data.code==='0'){
            this.chainBrand=res.data.items;
          }
        })
      },
      resetsetChainBrand(isShow){
          if(!isShow && !this.searchList.chainBrand){
            this.$refs.chainBrand.clearSingleSelect()
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
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
</style>
