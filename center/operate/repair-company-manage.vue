
<template>
  <!--维修企业信息管理 2018-11-05-->
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
              <FormItem label="企业名称:">
                  <Input type="text" v-model="search.name" placeholder="请输入企业名称"></Input>
              </FormItem>
              <FormItem label="许可证号:">
                  <Input type="text" v-model="search.licence" placeholder="请输入许可证号"></Input>
              </FormItem>
              <FormItem label="经营范围:">
                  <Select v-model="search.businessScope" clearable>

                    <Option v-for="item in repairType" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="是否对接:">
                  <Select v-model="search.buttJoint" clearable>
                    <Option value="" selected>全部</Option>
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                  </Select>
              </FormItem>
              <FormItem label="总对总:">
                  <Select v-model="search.totalToTotal" clearable>
                    <Option value="" selected>全部</Option>
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                  </Select>
              </FormItem>
              <FormItem label="特约维修:">
                  <Select v-model="search.special" clearable>
                    <Option value="" selected>全部</Option>
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                  </Select>
              </FormItem>
              <FormItem label="前台显示:">
                  <Select v-model="search.show" clearable>
                    <Option value="" selected>全部</Option>
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                  </Select>
              </FormItem>
              <FormItem label="经营状态:">
                  <Select v-model="search.businessStatus" clearable>
                    <Option v-for="item in businessType" :value="item.key" :key="item.key">{{ item.name }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="关键信息审核状态:">
                  <Select v-model="search.status" clearable>

                    <Option v-for="item in statusArr" :value="item.name" :key="item.name">{{ item.code }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="一般信息审核状态:" v-show="roleType=='yunying'">
                  <Select v-model="search.generalStatus" clearable>

                    <Option v-for="item in statusArr" :value="item.name" :key="item.name">{{ item.code }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="备案状态:">
                  <Select v-model="search.beianStatus" clearable>

                    <Option v-for="item in beianStatusArr" :value="item.name" :key="item.name">{{ item.code }}</Option>
                  </Select>
              </FormItem>

              <FormItem label="显示隐藏数据:">
                <Select v-model="search.hidden">
                  <Option value="false" >否</Option>
                  <Option value="true" >是</Option>
                </Select>
              </FormItem>

              <FormItem :label-width="0" style="width: 60px;">
                  <Button type="primary" v-if="accessBtn('list')" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="accessBtn('insert')" @click="showDetail=Math.random();detailData=null;">新增</Button>
      <Button type="primary" v-if="accessBtn('import')" @click="type=Math.random();">导入</Button>
      <Button type="primary" v-if="accessBtn('export')" @click="exportBut">导出</Button>
      <Button type="info" v-if="accessBtn('viewcrux')" @click="showDetail=Math.random();" :disabled="!detailData">查看|编辑</Button>
      <Button type="info" v-if="accessBtn('crux-detail')" @click="showDetail=Math.random();" :disabled="!detailData">查看|审核</Button>

    </div>
    <repair-company-info :showDetail='showDetail' :detailData="detailData" :roleType="roleType" @closeDetail="closeDetail"></repair-company-info>
    <upload-excel :type="type" :actionUrl="'/proxy/corp/manage/import'" :title="'导入文件'"></upload-excel>
  </common-table>

</template>

<script>
    import uploadExcel from '~/components/upload-excel.vue'
  import CommonTable from '~/components/common-table.vue'
  import repairCompanyInfo from './repair-company-info.vue'
import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "repair-company-manage",
    components: {
      CommonTable,
      repairCompanyInfo,
    uploadExcel
    },
    mixins: [funMixin],
    data(){
		  return{
        type:null,
        loading:true,

        tableData: [],

        search:{
            "beianStatus": "",
            "businessScope": "",
            "businessStatus": "",
            "buttJoint": "",
            "licence": "",
            "name": "",
            "show": "",
            "special": "",
            "status": "",
            "generalStatus":"",
            "totalToTotal": "",
            hidden: 'false'
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        //维修类别数据---------
        repairType:[],
        beianStatusArr:[
          {code:"全部",name:""},
          {code:"待备案",name:1},
          {code:"已备案",name:2},
          {code:"未备案",name:3},
        ],
        statusArr:[
          {code:"全部",name:""},
          {code:"待审核",name:1},
          {code:"审核成功",name:2},
          {code:"审核不成功",name:3},
        ],
        businessType:[],//经营状态类型集合------
      }
    },
    computed:{
		  roleType(){
		    let role=''
		    switch (this.$route.path){
          case '/center/company-info-manage':{
            role= 'guanlibumen'
            break
          }
          default:{
            role= 'yunying'
          }
        }
        return role
      },
      columns(){
        let columns= [
          {title: '区域', key: 'areaName', sortable: true, minWidth: 120,},
          {title: '关键信息审核状态', key: 'status', sortable: true, minWidth: 120},
          {title: '一般信息审核状态', key: 'generalStatus', sortable: true, minWidth: 120},
          {title: '备案状态', key: 'beianStatus', sortable: true, minWidth: 135},
          {title: '企业名称', key: 'name', sortable: true, minWidth: 120},
          {title: '许可证号', key: 'licence', sortable: true, minWidth: 120,},
          {title: '经营范围', key: 'businessScope', sortable: true, minWidth: 120,},
          {title: '是否对接', key: 'buttJoint', sortable: true, minWidth: 120,},
          {title: '上传数量', key: 'uploadNum', sortable: true, minWidth: 120,},
          {title: '总对总', key: 'totalToTotal', sortable: true, minWidth: 120,},
          {title: '特约维修', key: 'special', sortable: true, minWidth: 120,},
          {title: '前台显示', key: 'show', sortable: true, minWidth: 120,},
          {title: '经营状态', key: 'businessStatus', sortable: true, minWidth: 120,},
          {title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 120,},
        ]
        // let item= {title: '一般信息审核状态', key: 'generalStatus', sortable: true, minWidth: 120}

        // if(this.roleType=='yunying'){
        //   columns.splice(1, 0, item)
        // }
        return columns
      }
    },
    mounted () {

      this.getBusinessType();
      this.getValuesByTypeFun(1);
      this.getList();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/corp/manage/list', {

                "beianStatus": this.search.beianStatus,
                "businessScope": this.search.businessScope,
                "businessStatus": this.search.businessStatus,
                "buttJoint": this.search.buttJoint,
                "licence": this.search.licence,
                "name": this.search.name,
                "show": this.search.show,
                "special": this.search.special,
                "status": this.search.status,
                "generalStatus":this.search.generalStatus,
                "totalToTotal": this.search.totalToTotal,
                "hidden": this.search.hidden,
                "pageNo": this.page,
                "pageSize": this.limit,
          }).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }else{
              this.$Message.info(res.data.status);
              this.loading=false;
            }

          })
          this.detailData= null;
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

        exportBut(){
          this.$Modal.confirm({
              title:"系统提示!",
              content:"确定要导出吗？",
              onOk:this.exportFun,

          })

        },
        exportFun(){
          this.$axios({
            method: 'post',
            url: '/corp/manage/export',
            data:{
              "beianStatus": this.search.beianStatus,
              "businessScope": this.search.businessScope,
              "businessStatus": this.search.businessStatus,
              "buttJoint": this.search.buttJoint,
              "licence": this.search.licence,
              "name": this.search.name,
              "show": this.search.show,
              "special": this.search.special,
              "status": this.search.status,
              "generalStatus":this.search.generalStatus,
              "totalToTotal": this.search.totalToTotal,
              "pageNo": this.page,
              "pageSize": this.limit,
              },
              responseType: 'arraybuffer'
            }).then( (res) => {
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
        },
        getBusinessType(){
            this.$axios.get('/company/category/business/list', {
            }).then( (res) => {
                if(res.data.code=='0'){

                    this.businessType=res.data.items;

                }
           })
        },
        getValuesByTypeFun(id){
            this.$axios.get('/dict/getValuesByTypeId/'+id, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    if(id==1){
                        this.repairType=res.data.items;
                    }

                }else{
                    // this.$Message.error(res.data.status);
                }
           })
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
