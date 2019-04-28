<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search">
      <Form :label-width="80" class="common-form">
            <FormItem label="日期范围:">
                <DatePicker type="daterange" v-model="searchList.startDate" placement="bottom-start" placeholder="请选择时间" :options="options"></DatePicker>
            </FormItem>
            <FormItem label="是否登录:">

                  <Select v-model="searchList.isLogin" >
                      <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
              </FormItem>

              <FormItem label="所属辖区:">
                  <!--<Select v-model="searchList.areaKey" clearable>-->
                      <!--<Option v-for="item in searchSelectOption" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>-->
                  <!--</Select>-->
                <area-select :change-on-select="true"
                             @changeSelect="searchList.areaKey= $event"
                              :rules="{other: { useSelect: false, mode: 'login-areas'}}"
                ></area-select>
              </FormItem>
            <FormItem :label-width="0" style="width: 70px;">
                <Button type="primary" v-if="" @click="searchFun">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="showModal=Math.random()" :disabled="!detailData.id">查看</Button>
    </div>

</common-table>
  <sign-in-calendar :data="detailData" :show="showModal" type="manager"></sign-in-calendar>
</div>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import SignInCalendar from '~/components/sign-in-calendar.vue'
import AreaSelect from '~/components/area-select.vue'
import { formatDate } from '@/static/tools'
export default {
		name: "manage-sign",
    components: {
      CommonTable,
      SignInCalendar,
      AreaSelect
    },
    data(){
		  return{
              typeList: [
                  {code:'yes',name:'有登录'},
                  {code:'no',name:'未登录'},
              ],//问题分类--------
              loading:false,
                columns: [
                    {title: '名称', key: 'name', sortable: true, minWidth: 120,
                    },
                    {title: '区域', key: 'areaName', sortable: true, minWidth: 120},
                    {title: '登录次数', key: 'todayCount', sortable: true, minWidth: 135},
                    {title: '最后登录时间', key: 'lastLogin', sortable: true, minWidth: 120,
                        render: (h, params) => h('span', params.row.lastLogin||'无')
                    },
                ],
                tableData: [],
                // searchSelectOption:[],
                searchList:{
                    areaKey:(process.env.config.areaName=='shanghai'?process.env.config.areaKey:''),
                    companyName:"",
                    isLogin:"yes",
                    startDate:"",
                },
                page: 1,
                limit: 10,
                total: 0,
                showTable:false,
                showDetail: false,
                showOtherDetail:false,
                detailData: {},
                clearTableSelect: null,
                options: {
                    disabledDate (date) {

                        return date && date.valueOf() > Date.now();
                    }
                },
        showModal:false
            }
    },
    mounted () {
      this.getList();
        // this.getAreaInfo();
    },
    methods:{
        getList(){
            this.loading=true;

            this.$axios.post('/user/loginRecords/list', {
                    areaKey:this.searchList.areaKey,
                    companyName:this.searchList.companyName,
                    endDate:formatDate(this.searchList.startDate[1])||'',
                    isLogin:this.searchList.isLogin,
                    pageNo:this.page,
                    pageSize:this.limit,
                    startDate:formatDate(this.searchList.startDate[0])||'',
                    type:"manager",
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
                }
           })
           this.detailData= {}
        },
        // getAreaInfo(){
        //     this.$axios.post('/area/region/list', {
        //            "areaName": process.env.config.areaName
        //     }).then( (res) => {
        //         if(res.data.code=='0'){
        //             this.searchSelectOption=res.data.items;
        //         }else{
        //             this.$Message.error(res.data.status);
        //         }
        //    })
        //
        // },
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
          this.detailData= {}

          this.clearTableSelect= Math.random();
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.page= 1
            this.closeDetail();
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
