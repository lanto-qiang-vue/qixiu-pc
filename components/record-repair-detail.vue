<!--车辆档案详情  2018-10-30 -->
<template>
  <div>
    <Modal
      v-model="showModal"
      title="车辆档案详情"
      width="90"
      :scrollable="true"
      :transfer="true"
      :footer-hide="false"
      :mask-closable="false"
      class="table-modal-detail"
      :transition-names="['', '']">

      <div style="height: 100%;overflow: auto;" class="record-repair-detail">
        <Collapse v-model="collapse">
          <Panel name="1">维修记录
            <Form slot="content" :label-width="120" class="common-form">
              <FormItem label="维修企业名称:" :class="[{'mark-change': markChange('companyName',true)},'common-span']">
                <span :class="[{'mark-header': markChange('companyName')}]">{{listSearch.companyName}}</span>
              </FormItem>
              <FormItem label="车牌号码:" :class="[{'mark-change': markChange('plateNumber',true)},'common-span']">
                <span :class="[{'mark-header': markChange('plateNumber')}]">{{listSearch.plateNumber}}</span>
              </FormItem>
              <FormItem label="车辆识别号VIN:" :class="[{'mark-change': markChange('vin',true)},'common-span']">
                <span :class="[{'mark-header': markChange('vin')}]">{{listSearch.vin}}</span>
              </FormItem>
              <FormItem label="送修里程:" :class="[{'mark-change': markChange('repairMileage',true)},'common-span']">
                <span :class="[{'mark-header': markChange('repairMileage')}]">{{listSearch.repairMileage}}</span>

              </FormItem>
              <FormItem label="送修日期:" prop="ORDER_TIME" :class="[{'mark-change': markChange('repairDate',true)},'common-span']">
                <span :class="[{'mark-header': markChange('repairDate')}]">{{listSearch.repairDate}}</span>
              </FormItem>
              <FormItem label="结算日期:" :class="[{'mark-change': markChange('settleDate',true)},'common-span']">
                <span :class="[{'mark-header': markChange('settleDate')}]">{{listSearch.settleDate}}</span>
              </FormItem>
              <FormItem label="结算编号:" :class="[{'mark-change': markChange('costlistcode',true)},'common-span']">
                <span :class="[{'mark-header': markChange('costlistcode')}]">{{listSearch.costlistcode}}</span>
              </FormItem>
              <FormItem label="故障描述:" prop="TELPHONE" :class="[{'mark-change': markChange('faultDescription',true)},'common-span']">
                <span :class="[{'mark-header': markChange('faultDescription')}]">{{listSearch.faultDescription}}</span>
              </FormItem>

            </Form>
          </Panel>
        </Collapse>
        <div class="r-list-search">
          <h4 :class="[{'mark-header': markChange('repairprojectlist')}, 'main-table']">维修项目</h4>
        </div>
        <Table
          :class="[{'mark-border': markChange('repairprojectlist')}, 'main-table']"
          ref="tablesMain"
          :columns="columns"
          :data="tableData"
          stripe
          border
        ></Table>

        <div class="r-list-search">
          <h4 :class="[{'mark-header': markChange('repairprojectlist')}, 'main-table']">维修配件</h4>
        </div>
        <Table
          :class="[{'mark-border': markChange('vehiclepartslist')}, 'main-table']"
          ref="tablesMain"
          :columns="columns1"
          :data="tableData1"
          stripe
          border
        ></Table>
        <Collapse v-model="collapse" style="margin-top:5px;" v-show="commentData.id > 0">
          <Panel name="2">维修评价
           <Form slot="content" :label-width="120" class="common-form">
           <FormItem label="车牌">
             <Input :value="commentData.vehicleNum" :readonly="true"></Input>
           </FormItem>
             <FormItem label="点评日期">
               <Input :value="commentData.cmCreateDate" :readonly="true"></Input>
             </FormItem>
             <FormItem label="评分">
               <Input :value="commentData.avgScore" :readonly="true"></Input>
             </FormItem>
             <FormItem label="履约">
               <Input :value="commentData.keepAppointment	" :readonly="true"></Input>
             </FormItem>
             <FormItem label="态度">
               <Input :value="commentData.attitude" :readonly="true"></Input>
             </FormItem>
             <FormItem label="质量">
               <Input :value="commentData.quality" :readonly="true"></Input>
             </FormItem>
             <FormItem label="速度">
               <Input :value="commentData.speed" :readonly="true"></Input>
             </FormItem>
             <FormItem label="价格">
               <Input :value="commentData.price	" :readonly="true"></Input>
             </FormItem>
           </Form>
          </Panel>
        </Collapse>
        <!--维修反馈-->
        <Collapse v-model="collapse" style="margin-top:5px;" v-show="feedData.id > 0">
          <Panel name="3">维修反馈
            <Form slot="content" :label-width="120" class="common-form">
              <FormItem label="反馈原因">
                <Input value="维修记录不正确" :readonly="true"></Input>
              </FormItem>
              <FormItem label="凭据">
                <Input :value="feedData.hasEvidence ? '有' : '没有'" :readonly="true"></Input>
              </FormItem>
              <FormItem label="反馈时间">
                <Input :value="feedData.createDate" :readonly="true"></Input>
              </FormItem>
            </Form>
          </Panel>
        </Collapse>
        <div style="height:10px;"></div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="comment" v-if="accessBtn('addMaintain')" v-show="!(commentData.id > 0)" >点评</Button>
        <Button type="info" @click="feedback" v-if="accessBtn('addComplaint')" v-show="!(feedData.id > 0)">反馈</Button>
        <Button size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
      </div>
    </Modal>
    <!--点评-->
    <Modal
      v-model="commentModal"
      title="点评"
      width="500"
      :styles="{height:'600px'}"

      :scrollable="true"
      :transfer="true"
      :footer-hide="false"
      :mask-closable="false"
      class="table-modal-detail"
      :transition-names="['', '']">
      <div style="padding: 10px 90px 10px 0px;position:relative;">
        <h1>您对该次服务满意吗？</h1>
        <p>以下反馈是匿名的，便于我们记录并沟通改进</p>
        <img style="width: 85px;position: absolute;top: 0;right: 0;bottom: 0;margin: auto 5px auto auto;" src="/img/garage-info/chartico.png">
      </div>
      <div style="margin-top:10px;font-size:14px;">{{listSearch.companyName}}</div>
      <div style="margin-top:10px;font-size:14px;"><div style="float:left;">履约情况</div><div style="float:left;padding-left:20px;"><select-start :clearValue="clearValue" @success="setkeepAppointment"></select-start></div></div>
      <div style="clear:both;"></div>
      <div style="margin-top:10px;font-size:14px;"><div style="float:left;">服务态度</div><div style="float:left;padding-left:20px;"><select-start @success="setattitude" :clearValue="clearValue" ></select-start></div></div>
      <div style="clear:both;"></div>
      <div style="margin-top:10px;font-size:14px;"><div style="float:left;">维修质量</div><div style="float:left;padding-left:20px;"><select-start @success="setquality" :clearValue="clearValue"></select-start></div></div>
      <div style="clear:both;"></div>
      <div style="margin-top:10px;font-size:14px;"><div style="float:left;">维修速度</div><div style="float:left;padding-left:20px;"><select-start @success="setspeed" :clearValue="clearValue"></select-start></div></div>
      <div style="clear:both;"></div>
      <div style="margin-top:10px;font-size:14px;"><div style="float:left;">维修价格</div><div style="float:left;padding-left:20px;"><select-start @success="setprice" :clearValue="clearValue"></select-start></div></div>
      <div style="clear:both;"></div>
      <div>
        <div style="width:100%;height:50px;">
         <div style="float:left;font-size:14px;line-height:50px;">你还想在说点什么吗？</div>
          <div style="float:right;" v-if="goodShow">
            <div style="float:left;"><img src="/img/garage-info/goodon.png" width="40" @click="goodShow = true" style="padding-right:10px;padding-top:10px;cursor:pointer;"/></div>
            <div style="float:left;"><img src="/img/garage-info/bad.png" width="40" @click="goodShow = false" style="padding-right:10px;padding-top:10px;cursor:pointer;"/></div>
          </div>
          <div style="float:right;" v-else>
            <div style="float:left;"><img src="/img/garage-info/good.png" width="40" @click="goodShow = true" style="padding-right:10px;padding-top:10px;cursor:pointer;"/></div>
            <div style="float:left;"><img src="/img/garage-info/badon.png" width="40" @click="goodShow = false" style="padding-right:10px;padding-top:10px;cursor:pointer;"/></div>
          </div>
        </div>
        <div v-if="goodShow">
         <div v-for="item in goods" @click="changeSelect(item)" style="border-radius:5px;display:inline-block;background:#ff8327;padding:5px 10px;color:white;cursor: pointer;margin-bottom: 10px;margin-right:10px;" v-if="item.select">
           {{item.name}}
         </div>
          <div @click="changeSelect(item)" style="border-radius:5px;display:inline-block;background:#f4f4f4;padding:5px 10px;color:#666666;cursor: pointer;margin-bottom: 10px;margin-right:10px;" v-else>{{item.name}}</div>
        </div>
        <div v-if="!goodShow">
          <div v-for="item in badList" @click="changeBad(item)" style="border-radius:5px;display:inline-block;background:#ff8327;padding:5px 10px;color:white;cursor: pointer;margin-bottom: 10px;margin-right:10px;" v-if="item.select">
            {{item.name}}
          </div>
          <div @click="changeBad(item)" style="border-radius:5px;display:inline-block;background:#f4f4f4;padding:5px 10px;color:#666666;cursor: pointer;margin-bottom: 10px;margin-right:10px;" v-else>{{item.name}}</div>
        </div>
      </div>
      <div slot="footer">
        <Button  type="primary" @click="submit">提交</Button>
      </div>
    </Modal>
    <!---->
    <!--反馈-->
    <Modal
      v-model="feedbackModal"
      title="反馈"
      width="500"

      :scrollable="true"
      :transfer="true"
      :footer-hide="false"
      :mask-closable="false"
      class="table-modal-detail"
      :transition-names="['', '']">
      <div style="height:100%;width:100%;overflow:auto;">
      <h1 style="text-align: center;font-size:16px;margin: 10px 0;">反馈原因：维修记录不正确</h1>
      <div class="above">
        <div style="font-size: 14px;font-weight: 300;height: 24px;line-height: 24px;display: flex;justify-content: center;align-items: center;"><i></i>请上传维修凭证（必填）<i></i></div>
        <div style="width:200px;height:auto;margin: 20px auto 0 auto;border-radius: 5px;overflow: hidden;">
          <div class="pic" style="width:200px;height:150px;background:#f2f7fd url('/img/garage-info/nopic.png') center center no-repeat;background-size:50%;">
            <!--<div class="pic">-->
            <img style="transform: scale(1) translate(0px, 0px);width:200px;height:150px;" v-show="feedData.url != ''" :src="feedData.url">
          </div>
          <Upload
            multiple
            :headers="{token:this.$store.state.user.token}"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/png,image/jpeg"
            :max-size="3072"
            :on-success="handleSuccess"
            action="/proxy/file/image/add">
          <p style="width:200px;text-align: center;color: white;height: 30px;line-height: 30px;font-size: 16px;background-color: #5795fc;position: relative;cursor:pointer;">
            拍摄/上传照片
          </p>
          </Upload>
          <span style="text-align: center;width: 100%;display: block;margin: 10px 0;">仅支持jpg、png、bmp</span>
        </div>
      </div>
      <div style="text-align: center;font-size: 16px;font-weight: 300;height: 24px;line-height: 24px;display: flex;justify-content: center;align-items: center;"><i></i>上传要求<i></i></div>
      <div style="width: 80%;margin: 20px auto 0 auto;overflow: hidden;" class="content">
        <p>维修凭证可以是维修企业开具的《结算单》的清晰照片，或是必须包含以下信息的维修单据的清晰、完整的照片：</p>
        <p> 1、维修企业名称</p>
        <p> 2、车牌号码</p>
        <p> 3、结算日起</p>
        <p> 4、维修项目</p>
        <p> 5、维修配件</p>
      </div>
      </div>
      <div slot="footer">
        <Button  type="primary" @click="submitFeedBack">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { formatDate } from '@/static/tools.js'
  import selectStart from '~/components/select-start.vue'
  import SelectStart from './select-start'
  import { deepClone } from '../static/util'
  import funMixin from '~/components/fun-auth-mixim.js'
  export default {
    name: 'record-repair-detail',
    components: { SelectStart },
    props: ['showDetail', 'detailData','selectStart'],
    mixins: [funMixin],
    data() {
      return {
        showModal: false,
        clearValue:false,
        commentModal: false,
        goodShow:true,
        feedbackModal:false,
        commentData:{
          cp:'车牌',
        },
        repairId:0,
        storeFeedData:{
          url:'',
          repairId:0,
        },
        feedData:{

        },
        formData:{},
        storeData:{
          keepAppointment:3,
          attitude:3,
          price:3,
          quality:3,
          speed:3,
          vehicleNum:'',
          repairId:0,
          level:0,
        },
        goods:[],
        storeGoods:[
          {name:'价格实惠',select:false},
          {name:'服务热情',select:false},
          {name:'维修时间短',select:false},
          {name:'有WIFI',select:false},
          {name:'维修工位多',select:false},
          {name:'客休区大',select:false},
          {name:'客餐丰富可口',select:false},
          {name:'索赔方便',select:false},
          {name:'上门取车',select:false},
        ],
        badList:[],
        storeBadList:[
          {name:'乱收费',select:false},
          {name:'维修时间',select:false},
          {name:'态度差',select:false},
          {name:'不专业',select:false},
          {name:'维修区杂乱',select:false},
          {name:'需要返工',select:false},
        ],
        collapse: [1,2,3],
        listSearch: {
          companyName: '',
          costlistcode: '',
          faultDescription: '',
          repairDate: '',
          repairMileage: '',
          settleDate: '',
          plateNumber: '',
          vin: ''
        },
        columns: [
          {
            title: '项目名称', key: 'repairproject', sortable: true, minWidth: 180
          },
          { title: '工时', key: 'workinghours', sortable: true, minWidth: 120 }
        ],
        tableData: [],
        columns1: [
          {
            title: '配件名称', key: 'partsname', sortable: true, minWidth: 180
          },
          { title: '编号', key: 'partscode', sortable: true, minWidth: 120 },
          { title: '数量', key: 'partsquantity', sortable: true, minWidth: 120 }
        ],
        tableData1: [],
        listButton: {
          audit: true,
          out: true
        },
        allFields:[],

      }
    },
    watch: {
      showDetail() {
        this.showModal = true
        this.repairId = this.detailData.id;
        this.getFeedBack();
        this.getComment();
        this.getDetail()
      }
    },
    methods: {
      submitFeedBack(){
        //提交反馈...../complaint/maintain/repairId
        if(this.feedData.url == ''){
          this.$Modal.error({
            title:'系统提示',
            content:'请上传反馈图片',
          });
          return false;
        }
        this.feedData.repairId = parseInt(this.repairId);
        this.feedData.photoUrl = this.feedData.url;
        this.$axios.post('/comment/complaint/maintain/repairId',this.feedData).then((res) => {
          if (res.data.code == '0') {
            this.$Message.info("反馈成功");
            this.feedbackModal = false;
            this.getFeedBack();
          } else {
            this.$Message.error(res.data.status)
          }
        })
      },
      handleSuccess(res){
        this.feedData.url = res.item.path;
      },
      feedback(){
        this.feedData = deepClone(this.storeFeedData);
        this.feedbackModal = true;
      },
      setattitude(num){
        this.formData.attitude = num;
      },
      setkeepAppointment(num){
        this.formData.keepAppointment = num;
      },
      setprice(num){
        this.formData.price = num;
      },
      setquality(num){
        this.formData.quality = num;
      },
      setspeed(num){
        this.formData.speed = num;
      },
      submit(){
        let data = [];
        if(this.goodShow){
          this.formData.level = 0;
          for(let i in this.goods){
            if(this.goods[i].select) data.push(this.goods[i].name);
          }
        }else{
          this.formData.level = 1;
          for(let i in this.badList){
            if(this.badList[i].select) data.push(this.badList[i].name);
          }
        }
        this.formData.tags = data;
        this.$axios.post('/comment/maintain',this.formData).then((res) => {
          if (res.data.code == '0') {
            this.$Message.info("点评成功");
            this.commentModal = false;
            this.getComment();
          } else {
            this.$Message.error(res.data.status)
          }
        })
      },
      changeSelect(item){
        let index = this.goods.indexOf(item);
        this.goods[index].select = !this.goods[index].select;
      },
      changeBad(item){
        let index = this.badList.indexOf(item);
        this.badList[index].select = !this.badList[index].select;
      },
      comment() {
        this.goodShow = true;
        this.formData = deepClone(this.storeData);
        this.goods = deepClone(this.storeGoods);
        this.badList = deepClone(this.storeBadList);
        this.clearValue = Math.random();
        this.formData.vehicleNum = this.listSearch.plateNumber;
        this.formData.repairId = this.repairId;
        this.commentModal = true
      },
      getComment(){
        // /comment/maintain/repairId?repairId
        this.$axios.get('/comment/maintain/query/repairId?repairId='+this.detailData.id, {
        }).then((res) => {
          if(res.data.id > 0){
             this.commentData = res.data;
          }else{
            this.commentData = {};
          }
           // this.formData = res.data;
        }).catch(()=>{
          this.commentData = {};
        })
      },
      getFeedBack(){
        this.$axios.get('/comment/complaint/maintain/query/repairId?repairId='+this.detailData.id, {
        }).then((res) => {
              this.feedData = res.data;
        }).catch(()=>{
             this.feedData = {};
        })
      },
      getDetail() {
        this.$Spin.show();
        this.$axios.post('/vehicle/carfile/queryDetail', {
          'repairbasicinfoId': this.detailData.id
        }).then((res) => {
          if (res.data.code == '0') {
            this.listSearch = res.data.item['repairBasicinfo']
            this.allFields=res.data.item['repairBasicinfo']['fields'];
            this.tableData = res.data.item['repairprojectlist']
            this.tableData1 = res.data.item['vehiclepartslist']
          } else {
            this.$Message.error(res.data.status)
          }
          this.$Spin.hide();
        })
      },

      //判断是否错误
      markChange(field,val){
        
        let arr= field.split(','),flag=false
        for(let i in arr){
          if(this.allFields.indexOf(arr[i])>=0){
            flag= true
            break
          }
        }
        if(val){
          return (flag&&!this.listSearch[field])
        }
        return flag
      },

    }
  }
</script>

<style scoped lang="less">

.content p{
  font-size: 13px;
  color: #999999;
  margin-bottom: 5px;
}


  .r-list-search {
    width: 100%;
    padding: 10px 0;

  }
  .common-span{
    width: 30%;
    span{
      width:100%;
      height:32px;
      display: block;
    }
  }

  .mark-border{
    border: 1px solid #ed4014;
    margin-top: 2px;
    padding-top: 2px;
  }
  .mark-header{
    color: #ed4014;
  }
</style>

<style lang="less">
.record-repair-detail{
    .mark-change{
        .ivu-form-item-label{
          color: #ed4014;
        }
    }
} 

</style>
