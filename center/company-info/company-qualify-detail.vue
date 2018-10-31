<!--质量考核管理  2018-10-30 -->
<template>
<Modal
    v-model="showModal"
    title="企业合格证信息"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
        <FormItem label="企业名称:">
            <Input type="text" v-model="searchList.companyName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem label="许可证号:">
            <Input type="text" v-model="searchList.companyroadtransportationlicense" placeholder="请输入许可证号"></Input>
        </FormItem>
        
        <FormItem :label-width="0" style="width: 90px;">
            <Button type="primary" v-if="" @click="searchFun">搜索</Button>
        </FormItem>

        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="showAdd=true;" >新增</Button>
    </div>

</common-table>

    <!--新增界面-->
    <Modal
    v-model="showAdd"
    title="新增"
    width="400"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    
    :transition-names="['', '']">
        <Form  :label-width="120" class="common-form">
            <FormItem label="考核标题:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.title" placeholder=""> </Input>
            </FormItem>
            <FormItem label="考核状态:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.status" placeholder=""> </Input>
            </FormItem>
            <FormItem label="考核描述:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.description" placeholder=""> </Input>
            </FormItem>
            <FormItem label="考核附件:" style="width: 80%;">
                <Button  size="large" type="default" style="margin-right: 10px;" @click="">附件下载</Button>
            </FormItem>
        </Form>
    

  </Modal>

  </Modal>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
export default {
	name: "company-qualify-detail",
    props:['showDetail', 'detailData'],
    components: {
      CommonTable,

    },
    data(){
		return{
            showAdd:false,//新增界面
            showModal:false,
            listSearch:{
                description:"",
                fileurl:"",
                id:"",
                status:"",
                title:"",
            },
            columns: [
          
          {title: '年份', key: 'year', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '核准数', key: 'approvalcount', sortable: true, minWidth: 120},

          {title: '检测报告副证数', key: 'examinationreportcolicensecount', sortable: true, minWidth: 120},
          {title: '黑名单限制数', key: 'blacklistlimitnumber', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchList:{
            "area": "",
            "businessaddress": "",
            "companyName": "",
            "companyroadtransportationlicense": "",
            "companysuperintendentphone": "",
        },
        page: 1,
        limit: 10,
        total: 0,

        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.getDetail();
        },
    },
    methods:{
        getDetail(){
            this.$axios.post('/company/certificateIssuance',{

                        "companyid": this.detailData.companyId,
                        "pageNo": this.page,
                        "pageSize": this.limit,
                        "year": ""
                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.tableData=res.data.items;
                        this.total=res.data.total;

                    }else{
                        this.$Message.error(res.data.status);
                    }
            })
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            
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
  .r-list-search{
    width: 100%;
    padding: 10px 0;
    

  }
</style>
