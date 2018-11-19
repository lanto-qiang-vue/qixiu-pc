<!--企业中心 反馈管理详情 2018-11-16-->

<template>
  <Modal
    v-model="showModal"
    :mask-closable="false"
    title="反馈详情"
    @on-visible-change="visibleChange"
    width="60"
    :scrollable="true"
    :transfer="false"
    :footer-hide="true"
    class="table-modal-detail"
    :transition-names="['', '']">
        <Form :label-width="80" class="common-form">
          <FormItem label="车牌号:" style="width: 60%">
            <Input type="text" v-model="search.vehicleNum" :readonly="true" placeholder=""></Input>
          </FormItem>
          <FormItem label="反馈类型:" style="width: 60%">
            <Input type="text" v-model="search.type" :readonly="true" placeholder=""></Input>
          </FormItem>
          <FormItem label="事件发生日期:" style="width: 60%">
            <Input type="text" v-model="search.cmCreateDate" :readonly="true" placeholder=""></Input>
          </FormItem>
          <FormItem label="反馈日期:" style="width: 60%">
            <Input type="text" v-model="search.createDate" :readonly="true" placeholder=""></Input>
          </FormItem>
          <FormItem label="凭证:" style="width: 60%">
            <Card class="pic-card" >
                <div class="pic-body">
                    <img  class="pic" :src="search.photoUrl"/>
                </div>
            </Card>
          </FormItem>
        </Form>
  </Modal>
</template>
<script>
  import { formatDate } from '@/static/tools.js'
  import { getName } from '@/static/util.js'
  export default{
    name:"complaint-manage-detail",
    props:['showType','detailData'],
    watch:{
      showType(){
        this.showModal = true;
        for(let i in this.detailData){
            this.search[i]=this.detailData[i];
        }
        this.search['cmCreateDate']=formatDate(this.search['cmCreateDate']);
        this.search['createDate']=formatDate(this.search['createDate']);
        this.search['type']=getName(this.typeList,this.search['type']);

        if(!this.search['hasRead']){
            this.updateStatus();
        }
      }
    },
    data(){
      return {
        search:{
            cmCreateDate:"",
            createDate:"",
            photoUrl:"",
            type:"",
            vehicleNum:"",
        },
        typeList:[
            {code:0,name:"维修记录未上传"},
            {code:1,name:"维修记录不正确"},
        ],
        total:0,
        page:1,
        limit:10,
        showModal:false,
        tableData:[],
        showTable:false,
        area:[],
        loading:false,
        columns: [
            {title: '企业名称', key: 'companyName', sortable: true, minWidth: 110},
            { title: '许可证号', key: 'license', sortable: true, minWidth: 150 },
            { title: '经营地址', key: 'businessAddress', sortable: true, minWidth: 120 ,},
            { title: '法定代表人', key: 'corporate', sortable: true, minWidth: 120,},
            { title: '联系方式', key: 'companyLinkMantel', sortable: true, minWidth: 120,},
        ],
      }
    },
    methods:{
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      onRowClick( row, index){
            console.log('row：',row);
            
          this.setRepairCompany(row)
        },
      getName(data, code) {
        let name = ''
        for (let i in data) {
          if (data[i].regionCode == code) {
            name = data[i].shortName
            break
          }
        }
        return name
      },
      getList() {
        this.loading = true
        this.$axios.post('company/list', {
            businessAddress:"",
            companyLinkMantel:"",
            companyName:"",
            license:"",
            'pageNo': this.page,
            'pageSize': this.limit
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      },
      setRepairCompany(row) {
        this.$axios.post('/service/setRepairCompany', {
            "companyId": row.companyId,
            "id": this.detailData.id
        }).then((res) => {
          if (res.data.code == '0') {
            
          }
        })
      },
      //监听界面变化--------
      visibleChange(status){
        if(status === false){
          this.$emit('closeDetail');
        }
      },
      updateStatus(){
        this.$axios.put('/comment/complaint/maintain/'+this.detailData.id+'/hasRead', {
        }).then((res) => {
            if (res.data.code == '0') {
                
            }
        })
      }
    },

  }
</script>

<style scoped lang="less">
  .pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 200px;
      min-width: 200px;
      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 150px;
        /*border: 1px solid #dcdee2;*/
        position: relative;
        .no-pic{
          width: 250px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
        }
        .pic{
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
          cursor: pointer;
        }
        .button{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          text-align: center;
          > *{
            margin: 0 5px;
            vertical-align: top;
          }
          .up-img{
            display: inline-block;
            overflow: hidden;
            position: relative;
            .input{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              font-size: 0;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
