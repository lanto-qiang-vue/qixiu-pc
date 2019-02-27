<template>
<!--维修企业信息-变更记录  2018-11-05  -->
<Modal
    v-model="showModal"
    title="变更记录"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="true"
    :mask-closable="false"
    class="table-modal-detail change-company-info"
    :transition-names="['', '']">

    <div >

        <Table :columns="columns10" :data="data9"></Table>
        <div class="table-bottom">
            <Page :current="page" :page-size="10" show-sizer show-elevator show-total :page-size-opts="[10, 20]"
                placement="top" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>

        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </Modal>
</template>

<script>

import changeCompanyData from './change-company-data.vue';
export default {
	name: "change-company-info",
    props:['showChange', 'detailId'],
    components: {
      changeCompanyData
    },
    data(){
		return{
            showModal:false,
            spinShow:false,
            columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(changeCompanyData, {
                                props: {
                                    row: params.row.changeInfoModels
                                }
                            })
                        }
                    },
                    {
                        title: '变更类型',
                        key: 'type'
                    },
                    {
                        title: '变更时间',
                        key: 'updateTime'
                    },
                    {
                        title: '操作人',
                        key: 'name'
                    }
            ],
            data9: [],
            page:1,
            limit:10,
            total:0,
        }
    },
    watch:{
        showChange(){
            this.showModal=true;
            this.getRecords();
        },
    },
    methods:{
        changePage(page){
            this.page= page;
            this.getRecords();
        },
        changePageSize(size){
            this.limit= size
            this.getRecords();
        },
        visibleChange(status){
            if(status === false){
                this.data9=[];
            }
        },
        getRecords(){
            this.spinShow=true;
            this.$axios.post('/change/records/list', {
                "corpId":this.detailId,
                "pageNo": this.page,
                "pageSize": this.limit,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.data9=res.data.items;
                    this.total=res.data.total;
                }
                this.spinShow=false;
            })
        }

    },
}
</script>

<style lang="less">
.change-company-info{
  .ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-body{
    height: calc(100% - 60px);
  }
  .ivu-table-expanded-cell{
    padding: 10px 20px;
  }
}
</style>

<!--<style scoped lang="less">-->

<!--.table-bottom{-->
    <!--/*position: absolute;*/-->
    <!--/*height: 52px;*/-->
    <!--padding: 10px;-->
    <!--width: 100%;-->
    <!--background-color: white;-->

  <!--}-->
<!--.content-list{-->
    <!--width: 100%;-->
    <!--height: 45px;-->
    <!--line-height: 45px;-->
    <!--overflow: hidden;-->
    <!--img{-->
        <!--width:40px;-->
        <!--height:40px;-->
        <!--border:1px solid #ccc;-->
        <!--float: left;-->
    <!--}-->
    <!--h3{-->
        <!--float: left;-->
        <!--height: 45px;-->
        <!--line-height: 45px;-->
        <!--margin-left: 10px;-->
    <!--}-->
    <!--span{-->
        <!--float: right;-->
    <!--}-->
    <!---->
<!--}-->
<!--.content-p{-->
    <!--padding-left: 55px;-->
<!--}-->
<!--.menu-manage{-->

<!--}-->
<!--.search-block{-->
  <!--display: inline-block;-->
  <!--width: 200px;-->
  <!--margin-right: 10px;-->
<!--}-->
  <!--.r-list-search{-->
    <!--width: 100%;-->
    <!--padding: 10px 0;-->
    <!---->

  <!--}-->

  <!--.pic-card{-->
      <!--display: inline-block;-->
      <!--margin: 0 10px 10px 0;-->
      <!--width: 200px;-->
      <!--min-width: 200px;-->
      <!---->
      <!--.red{-->
        <!--color: red;-->
      <!--}-->
      <!--.pic-body{-->
        <!--width: 100%;-->
        <!--height: 150px;-->
        <!--/*border: 1px solid #dcdee2;*/-->
        <!--position: relative;-->
        <!--.no-pic{-->
          <!--width: 250px;-->
          <!--position: absolute;-->
          <!--left: 50%;-->
          <!--top: 50%;-->
          <!--transform: translate(-50% , -50%);-->
        <!--}-->
        <!--.pic{-->
          <!--max-width: 100%;-->
          <!--max-height: 100%;-->
          <!--position: absolute;-->
          <!--left: 50%;-->
          <!--top: 50%;-->
          <!--transform: translate(-50% , -50%);-->
          <!--cursor: pointer;-->
        <!--}-->
        <!--.button{-->
          <!--width: 100%;-->
          <!--position: absolute;-->
          <!--left: 0;-->
          <!--bottom: 0;-->
          <!--text-align: center;-->
          <!--&gt; *{-->
            <!--margin: 0 5px;-->
            <!--vertical-align: top;-->
          <!--}-->
          <!--.up-img{-->
            <!--display: inline-block;-->
            <!--overflow: hidden;-->
            <!--position: relative;-->
            <!--.input{-->
              <!--width: 100%;-->
              <!--height: 100%;-->
              <!--position: absolute;-->
              <!--left: 0;-->
              <!--top: 0;-->
              <!--opacity: 0;-->
              <!--font-size: 0;-->
              <!--cursor: pointer;-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->

    <!--.yearClass{-->
<!--width: 110px;height: 25px;border: 1px solid #dcdee2; line-height: 25px; display: inline-block; margin-right: 10px; text-align: center ;margin-top:10px;-->
    <!--}-->


    <!--.header-inner {-->
        <!--display: inline-block;-->
        <!--width: 100%;-->
        <!--height: 20px;-->
        <!--line-height: 20px;-->
        <!--font-size: 14px;-->
        <!--color: #17233d;-->
        <!--font-weight: 700;-->
        <!--overflow: hidden;-->
        <!--text-overflow: ellipsis;-->
        <!--white-space: nowrap;-->

        <!--span{-->
            <!--color:red;-->
        <!--}-->
    <!--}-->

    <!--.modelClass{-->
        <!--text-align: center;height: 150px;-->
    <!--line-height: 150px;-->
    <!--font-size: 18px;-->
    <!--font-weight: bold;-->
    <!--}-->
<!--</style>-->
