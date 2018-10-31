<!--根据维修企业查找-->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
          <FormItem label="区域:">
            <Select v-model="searchList.area" clearable>
                <Option v-for="item in areaOption" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
            </Select>
        </FormItem>
        <FormItem label="企业名称:">
            <Input type="text" v-model="searchList.companyName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem label="许可证号:">
            <Input type="text" v-model="searchList.license" placeholder="请输入许可证号"></Input>
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
                <Option v-for="item in businessType" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
            <DatePicker v-model="searchList.uploadMonth" type="month" placeholder="请选择"></DatePicker>
        </FormItem>
        <FormItem :label-width="0" style="width: 120px;">
            <Button type="primary" v-if="" @click="searchFun">搜索</Button>
            <Button type="primary" v-if="" @click="exportList">导出</Button>
        </FormItem>
    </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="backCompany" :disabled="!detailData">查看</Button>
    </div>
    
</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import { formatDate } from '@/static/tools.js'
export default {
	name: "record-company",
    components: {
      CommonTable,
    },
    data(){
	return{
              loading:false,
              typeList: [
                  {code:'yes',name:'有登录'},
                  {code:'no',name:'未登录'},
              ],//问题分类--------
        columns: [
          {title: '区域', key: 'shortName', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '企业类型', key: 'category', sortable: true, minWidth: 120},
          {title: '企业名称', key: 'companyName', sortable: true, minWidth: 135},
          {title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 120},
          {title: '是否对接', key: 'buttJoin', sortable: true, minWidth: 120},
          {title: '上传数量', key: 'count', sortable: true, minWidth: 135},
          {title: '许可证', key: 'license', sortable: true, minWidth: 120},
          {title: '经营范围', key: 'businessScope', sortable: true, minWidth: 120},
          {title: '未上传天数', key: 'noUpdateDays', sortable: true, minWidth: 135},
          {title: '总对总', key: 'minister', sortable: true, minWidth: 120},
          {title: '特约维修', key: 'special', sortable: true, minWidth: 120},
          {title: '经营状态', key: 'businessStatus', sortable: true, minWidth: 135,
            render: (h, params) => h('span', params.row.businessStatus.name)
            },
          {title: '前台显示', key: 'show', sortable: true, minWidth: 120},
          {title: '对接时间', key: 'firstUploadTime', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchList:{
            "area": "",//区域
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
            "uploadMonth": ""//按月查询
        },
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
      }
    },
    mounted () {
      this.getList();
        this.getAreaInfo();
      this.getType('1');
      this.getType('24');
      this.getCompanyArea();

    },
    methods:{
        getList(){
            this.loading=true;
            let upData={};
            for(let i in this.searchList){
                if(this.searchList[i]=="是"){
                    upData[i]=true;
                }else if(this.searchList[i]=="否"){
                    upData[i]=false;
                }else{
                    upData[i]=this.searchList[i];
                }
            }
            console.log(upData["uploadMonth"],this.manageArr);
            if(this.manageArr.length>0){
                upData["org"]=this.manageArr[0]||'';
                upData["dept"]=this.manageArr[1]||'';
            }
            upData["uploadMonth"]=formatDate(upData["uploadMonth"],'yyyy-MM');
            this.$axios.post('/vehicle/repair/query', {
                    "area": upData["area"],
                    "businessStatus": upData["businessStatus"],
                    "buttJoin": upData["buttJoin"],
                    "companyCategory": upData["companyCategory"],
                    "companyName": upData["companyName"],
                    "dept": upData["dept"],
                    "inDays": upData["inDays"],
                    "license": upData["license"],
                    "minister": upData["minister"],
                    "org": upData["org"],
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    "show": upData["show"],
                    "special": upData["special"],
                    "uploadMonth": upData["uploadMonth"],

            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
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
                }else{
                    upData[i]=this.searchList[i];
                }
            }
            console.log(upData["uploadMonth"],this.manageArr);
            if(this.manageArr.length>0){
                upData["org"]=this.manageArr[0]||'';
                upData["dept"]=this.manageArr[1]||'';
            }
            upData["uploadMonth"]=formatDate(upData["uploadMonth"],'yyyy-MM');
            this.$axios.post('/vehicle/repair/export', {
                    "area": upData["area"],
                    "businessStatus": upData["businessStatus"],
                    "buttJoin": upData["buttJoin"],
                    "companyCategory": upData["companyCategory"],
                    "companyName": upData["companyName"],
                    "dept": upData["dept"],
                    "inDays": upData["inDays"],
                    "license": upData["license"],
                    "minister": upData["minister"],
                    "org": upData["org"],
                    "show": upData["show"],
                    "special": upData["special"],
                    "uploadMonth": upData["uploadMonth"],

            }).then( (res) => {
                
                    var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
                    console.log(blob)

                    var a = document.createElement('a');
                        a.download = '对接密码.xlsx';

                        a.href = window.URL.createObjectURL(blob);
                        $("body").append(a);
                        a.click();
                        $(a).remove();
                    

                    // var reader = new FileReader();
                    // reader.readAsDataURL(blob);
                    // reader.onload = function (e) {
                    //     var a = document.createElement('a');
                    //     a.download = '对接密码.xlsx';

                    //     a.href = e.target.result;
                    //     $("body").append(a);
                    //     a.click();
                    //     $(a).remove();
                    // }

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
                    this.$Message.error(res.data.status);
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
                        this.businessType=res.data.items;
                    }
                }else{
                    this.$Message.error(res.data.status);
                }
           })
        },
        getCompanyArea(){
            this.$axios.get('/area/dept/list/all/shanghai', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.manageType=res.data.items;
                }else{
                    this.$Message.error(res.data.status);
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
