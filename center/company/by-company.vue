<template>
  <common-table v-model="tableData" :columns="columns" :total="total"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :clearSelect="clearTableSelect" :page="page" @onRowClick="rowClick"
                :loading="loading"  @onSortChange="onSortChange">
    <div slot="search">
      <Form :label-width="80" class="common-form">
        <FormItem label="区域:">
          <!--<Select v-model="search.area">-->
            <!--<Option v-for="item in areaList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}-->
            <!--</Option>-->
          <!--</Select>-->

          <area-select :change-on-select="true"
                       @changeSelect="search.area= $event"
                       :rules="{other: { useSelect: false, mode: 'login-areas'}}"
          ></area-select>
        </FormItem>

        <FormItem label="企业名称:">
          <Input type="text" v-model="search.companyName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="accessBtn('export')"  @click="exportFun">导出</Button>


    </div>
  </common-table>
</template>
<script>
import CommonTable from '~/components/common-table.vue'
import AreaSelect from '~/components/area-select.vue'
import { getName, deepClone } from '@/static/util.js'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
    name: 'by-company',
    components: { CommonTable, AreaSelect },
    mixins: [funMixin],
    data: function() {
      return {
        // areaList:[],
        clearTableSelect: false,
        search: {
          area:'',
          companyName:'',
          "order": 0,
          "orderField": 0,
        },
        total: 0,
        page: 1,
        limit: 10,
        tableData: [],
        showTable: false,
        area: [],
        loading: false,
        columns: [
          {
            title: '序号', minWidth: 80,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          {
            title: '企业名称', key: 'companyName',  minWidth: 110
          },
          {
            title: '许可证号', key: 'license', minWidth: 110
          },
          {
            title: '人员数量', key: 'staffNumber', sortable: 'custom', minWidth: 110
          },
          {
            title: '已注册数', key: 'regNumber', sortable: 'custom', minWidth: 110
          },
          {
            title: '注册率', key: 'regRate',sortable: 'custom', minWidth: 110,
            render: (h, params) => {
              let regRate=0;
              if(params.row.regRate=='0.0'){
                  regRate=0;
              }else{
                regRate=params.row.regRate+'%';
              }
              return h('div', [
                h('span',regRate)
              ]);

            }
          }

        ],
        typeArr:[
          {code:"staffNumber",name:0},
          {code:"regNumber",name:1},
          {code:"regRate",name:2},
        ],
      }
    },
    computed: {},
    mounted() {
      // this.getArea();
      this.showTable = Math.random()
      this.getList()
    },
    methods: {
      rowClick(row) {
        this.$router.push({path: "/center/employees-query", query:{id: row.companyId}})
      },
      exportFun(){
        this.search.pageNo= this.page,
        this.search.pageSize= this.limit
        this.$axios({
          method: 'post',
          url: '/company/getEmployeeList/export',
          data: this.search,
          responseType: 'arraybuffer'
        }).then( (res) => {


            let headerData=res.headers["content-disposition"].split(';')[1].split('=');
            let headerName=headerData[1].substring(1,(headerData[1].length)-1)



            let blob = new Blob([res.data], {type: 'application/octet-stream'});

            // console.log(blob);
            let a = document.createElement('a');
            a.download = headerName;

            a.href = window.URL.createObjectURL(blob);
            $("body").append(a);
            a.click();
            $(a).remove();

        })
      },
      // getName(list, id) {
      //   let data = ''
      //   for (let i in list) {
      //     if (list[i].id == id) {
      //       data = list[i].name
      //       break
      //     }
      //   }
      //   return data
      // },
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      // getArea() {
      //   this.$axios.post('/area/region/list', {
      //     areaName: process.env.config.areaName
      //   }).then((res) => {
      //     if (res.data.code == '0') {
      //       this.areaList = res.data.items
      //       this.areaList.unshift({ regionCode: '0', shortName: '全部' })
      //     }
      //   })
      // },
      getList() {
        this.search.pageNo= this.page,
        this.search.pageSize= this.limit
        this.loading = true
        this.$axios.post('/company/repaircompany/getEmployeeList', this.search).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      },
      //检测排序-----------
      onSortChange(type,value){
          if(type=="normal"){
              this.search.order=0;
              this.search.orderField=0;
              this.getList();
          }else{

              if(type=="desc"){
                  this.search.order=0;
              }else if(type=="asc"){
                  this.search.order=1;
              }

              this.search.orderField=getName(this.typeArr,value);
              this.getList();
          }
      },
    },

  }
</script>
