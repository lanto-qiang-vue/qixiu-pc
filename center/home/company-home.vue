<template>
  <div style="padding: 0 10px">
    <div class="dblock">
      <h1 class="dtitle">企业基本信息</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="infoColumns" :data="infoData" ref="table" width="800"
                 stripe border></Table>
        </div>
      </div>
    </div>
    <div class="dblock">
      <h1 class="dtitle">企业联系人（用于接收汽修平台公众号通知）</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="buttColumns" :data="buttData"  width="800"
                 stripe border></Table>
        </div>
      </div>

    </div>
    <div class="dblock">
      <h1 class="dtitle">企业营业时间调整</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="businessHoursColumns" :data="infoData"  width="800"
                 stripe border></Table>
        </div>
      </div>

    </div>
    <div class="dblock">
      <h1 class="dtitle">门店特色</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="businessTags" :data="infoData"  width="800"
                 stripe border></Table>
        </div>
      </div>

    </div>

    <div class="dblock">
      <h1 class="dtitle">未读通知</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="notifyColumns" :data="notifyData" ref="table2"
                 stripe border @on-row-click="onRowClick"></Table>
        </div>
      </div>

    </div>
    <div class="dblock" v-if="isShanghai">
      <h1 class="dtitle">上门服务申请业务（仅限于法律法规允许的业务）</h1>
      <div class="center">
        <div class="inline-box">
          <div id="bar1" style="width: 500px;height: 350px"></div>
        </div>
        <div class="inline-box">
					<h2 class="stitle">上门服务维修申请</h2>
					<div class="list">
						<div class="group">
              <div class="item" v-for="item in visitData"> 姓名：{{item.ownerName}} 电话：{{item.contactMobile}}&nbsp;{{item.serviceType}}</div>
            </div>

					</div>

        </div>
      </div>

    </div>

    <div class="dblock" v-if="isShanghai">
      <h1 class="dtitle">预约维修业务</h1>
      <div class="center">
        <div class="inline-box">
          <div id="bar2" style="width: 500px;height: 350px"></div>
        </div>
        <div class="inline-box">
					<h2 class="stitle">预约维修申请</h2>
					<div class="list">
						<div class="group">
              <div class="item" v-for="item in orderData"> 姓名：{{item.ownerName}} 电话：{{item.contactMobile}}&nbsp;{{item.serviceContent}}</div>
            </div>
            </div>
					</div>
      </div>

    </div>

<!--调整营业时间或状态-->
    <Modal v-model="modal2" title="调整营业时间或状态" :transfer="false"
    :footer-hide="false"
    :mask-closable="false" :z-index="1000" :transition-names="['', '']" width="525" @on-visible-change="visibleChange">
      <Form :label-width="120" style="width: 300px;" ref="businessHours" :rules="ruleValidate1" :model="businessHours">
        <FormItem label="营业状态:" prop="yyState">
            <Select v-model="businessHours.yyState" :transfer="true">
                <Option v-for="item in yyStateArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="营业时间:" prop="businessHours">

            <TimePicker format="HH:mm" type="timerange" placement="bottom-start" placeholder="请选择" style="width: 100%;" v-model="businessHours.businessHours"></TimePicker>
        </FormItem>
    </Form>
      <div slot="footer">
        <Button size="large" type="primary" @click="updateBusiness">提交</Button>
      </div>
    </Modal>

    <!--调整门店特色-->
    <Modal v-model="modal3" title="选择门店特色" :transfer="false"
    :footer-hide="false"
    :mask-closable="false" :z-index="1000" :transition-names="['', '']" width="525" @on-visible-change="visibleChange1">
      <Form :label-width="120" style="width: 300px;" >
        <FormItem label="门店特色:" >
            <Select v-model="storeSpecials" :transfer="true" multiple>
                <Option v-for="item in featureArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
    </Form>
      <div slot="footer">
        <Button size="large" type="primary" @click="updateTags">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { formatDate } from '~/static/tools.js'
	export default {
		name: "company-home",
    data(){
      return{
        commentModal:true,
        modal2:false,
        modal3:false,
        buttColumns:[
          {title: '联系人', key: 'contactName',  minWidth: 100,},
          {title: '联系人手机', key: 'contactMobile',  minWidth: 100,},
          {title: '操作', key: 'cz',  width: 100,
            render: (h, params) => {
              let buttonContent= '更改';
              let buttonStatus = 'primary';
              return h('div', [
                h('Button', {
                  props: {
                    type: buttonStatus,
                  },
                  style: {
                    width:"60px",
                    textAlign: "center",
                    marginRight: '10px',
                  },
                  on: {
                    click: (index) => {
                      this.$store.commit('app/setButtShow', {data: params.row, type: 'weixiuqiye'})
                    }
                  }
                }, buttonContent),
              ]);
            }
          },
        ],
        infoColumns: [
          {title: '业户名称', key: 'companyName',  minWidth: 100,},
          {title: '许可证号', key: 'license',  minWidth: 100,},
          {title: '注册地址', key: 'companyAddress',  minWidth: 100},
          {title: '经营范围', key: 'businessScope',  minWidth: 100},
        ],
        notifyColumns: [
          {title: '通知标题', key: 'title',  minWidth: 100,},
          {title: '通知内容', key: 'content',  minWidth: 100,
            // render: (h, params) => h('span', JSON.parse(params.row.content).content)
          },
          {title: '通知发送人', key: 'nickname',  minWidth: 100},
          {title: '通知日期', key: 'sendTime',  minWidth: 100,
            // render: (h, params) => h('span', formatDate(params.row.sendtime, 'yyyy-MM-dd hh:mm:ss'))
          },
        ],
        businessHoursColumns:[
          {title: '营业状态', key: 'yyState',  minWidth: 100,
            render: (h, params) => {
              let content= '';
              if(params.row.yyState==0){
                content="营业中"
              }else if(params.row.yyState==1){
                content="休息中"
              }
              return h('div', [
                h('span',  content),
              ]);
            }
          },
          {title: '营业时间', key: 'businessHours',  minWidth: 100,},
          {title: '操作', key: 'cz',  width: 100,
            render: (h, params) => {
              let buttonContent= '更改';
              let buttonStatus = 'primary';
              return h('div', [
                h('Button', {
                  props: {
                    type: buttonStatus,
                  },
                  style: {
                    width:"60px",
                    textAlign: "center",
                    marginRight: '10px',
                  },
                  on: {
                    click: (index) => {
                      this.modal2=true;
                      this.businessHours.yyState=this.infoData[0].yyState;
                      if(this.infoData[0].businessHours){
                        this.businessHours.businessHours=this.infoData[0].businessHours.split('-');
                      }else{
                        this.businessHours.businessHours='';
                      }
                      

                    }
                  }
                }, buttonContent),
              ]);
            }
          },
        ],
        businessTags:[
          {title: '已选标签', key: 'storeSpecials',  minWidth: 100,
              render: (h, params) => {
                let buttonContent= '';
                for(let i in this.featureArr){
                  for(let j in this.tagDatas.storeSpecials){
                      if(this.tagDatas.storeSpecials[j]==this.featureArr[i]['id']){
                          buttonContent+=this.featureArr[i]['name']+','
                      }

                  }
                }


                return h('div', [
                  h('span',buttonContent),
                ]);
              }
          },
          {title: '操作', key: 'cz',  width: 120,
            render: (h, params) => {
              let buttonContent= '选择特色';
              let buttonStatus = 'primary';
              return h('div', [
                h('Button', {
                  props: {
                    type: buttonStatus,
                  },
                  style: {
                    // width:"60px",
                    textAlign: "center",
                    marginRight: '10px',
                  },
                  on: {
                    click: (index) => {
                      this.modal3=true;
                      this.storeSpecials=this.tagDatas.storeSpecials;
                    }
                  }
                }, buttonContent),
              ]);
            }
          },
        ],
        ruleValidate1: {
            businessHours: [{ required: true , message: '必填项不可为空' },{
                  validator: (rule, value, callback) => {

                    if (value.length >0 && !value[0]&&!value[1]) {
                      callback(new Error('必填项不可为空'));
                    }else{
                      callback();
                    }
                  }
                },],
            yyState: [{ required: true, message: '必填项不可为空' }],
        },//规则验证
        infoData: [],
        notifyData: [],
        visitDate:[],//上门日期服务--------
        buttData:[],
        visitData:[],
        orderData:[],
        businessHours:{
          businessHours:[],
          yyState:'',
        },
        yyStateArr:[
          {code:0,name:"营业中"},
          {code:1,name:'休息中'}
        ],
        tagDatas:{
          storeSpecials:[],
          corpInfoId:'',
        },
        storeSpecials:[],
        featureArr:[]
      }
		},
    computed:{
      isShanghai(){
        return process.env.config.areaName=='shanghai'
      },
      buttRefresh(){
        return this.$store.state.app.butt.refresh
      }
    },
    watch:{
      buttRefresh(val){
        // console.log('butts', val)
        this.checkButt();
      }
    },
    mounted(){
      $.getScript('/libs/echarts.common.min.js',()=>{
        if(this.isShanghai){
          this.getVisit();
          this.getOrder();
        }
      })
      this.$axios.$post('/company/repaircompany/detailInfo',{}).then( (res) => {
        if(res.code== '0') this.infoData= [res.item]
      })

      for(let i=0;i<7;i++){
        let oDate=new Date();
        oDate.setDate(oDate.getDate()-i);

        let newDate=formatDate(oDate, 'yyyy-MM-dd');
        this.visitDate.unshift(newDate);
      }
      this.checkButt();
      // console.log(this.visitDate);

      // this.getServerDate();

      this.getNotify();
      this.getFeature();
      this.getTagDatas();
    },
    methods:{
      checkButt(){
        this.$axios.get('/monitoring/config/company-docking/query/companyCode').then((res) => {
          if(res.status == 200){
            this.buttData = res.data.content;
          }
        })
      },
        getServerDate(){
          this.$axios.get('/statistics/admin/comStatistics',{

          } ).then( (res) => {
              if(res.data.code=='0'){
                  console.log(res.data.items);
                      for(let i in res.data.items){
                        console.log(formatDate(res.data.items[i]['statisticsDate']));
                      }
              }
          })
        },
      //获取上门服务数据
        getVisit(){
            this.$axios.post('/service/query',{
                "pageNo": 1,
                "pageSize": 10,
                "starts": this.visitDate
            } ).then( (res) => {
                if(res.data.code=='0'){
                    let count=res.data.counts;
                    this.visitData=res.data.items;
                    this.setVisitServer(count);
                }
            })
        },
        setVisitServer(count){
            let bar1 = echarts.init(document.getElementById('bar1'));
            let option = {
                color: ['#82d03c'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.visitDate,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        name:'上门服务申请数',
                        type:'bar',
                        data:count
                    }
                ]
            };
            bar1.setOption(option);
        },
        //获取预约服务数据
        getOrder(){
          this.$axios.post('/service/order/stat',{
                "pageNo": 1,
                "pageSize": 10,
                "starts": this.visitDate
            } ).then( (res) => {
                if(res.data.code=='0'){
                    let count=res.data.counts;
                    this.orderData=res.data.items;
                    this.setOrderServer(count);
                }
            })
        },
        setOrderServer(count){
            let bar2 = echarts.init(document.getElementById('bar2'));
            let option2 = {
                color: ['#fdc12f '],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.visitDate,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        name:'预约服务申请数',
                        type:'bar',
                        data:count
                    }
                ]
            };

            bar2.setOption(option2);
        },
        //获取未读通知---
        getNotify(){
          this.$axios.post('/message/notify/getReceiveNotify',{
              "pageNo": 1,
              "pageSize": 25,
          } ).then( (res) => {
              if(res.data.code=='0'){
                  for(let i in res.data.items){
                      if(res.data.items[i]['read']=="未读"){
                          this.notifyData.push(res.data.items[i]);
                      }
                  }
              }
          })
        },
        onRowClick( row, index){

            var query={flag:true,listSearch:row['id']};
            this.$router.push({path:'/center/company-note-manage',query:query});

        },
        updateBusiness(){
          this.$refs['businessHours'].validate((valid) => {
          if (valid) {
                this.$axios.post('/corp/manage/update/state',{
                  "businessHours": (this.businessHours.businessHours[0]+"-"+this.businessHours.businessHours[1]),
                  "id": this.infoData.companyId,
                  "yyState": this.businessHours.yyState,
                } ).then( (res) => {
                    if(res.data.code=='0'){
                        this.infoData[0].yyState=this.businessHours.yyState;
                        this.infoData[0].businessHours=(this.businessHours.businessHours[0]+"-"+this.businessHours.businessHours[1]);
                        console.log(this.infoData);
                        this.modal2=false;
                    }
                })
          }
        })

        },
        visibleChange(status) {
          if (status === false) {
            // for(let i in this.businessHours){
            //   this.businessHours[i]='';
            // }
            this.$refs['businessHours'].resetFields();
          }
        },
        visibleChange1(status) {
          if (status === false) {
            // for(let i in this.businessHours){
            //   this.businessHours[i]='';
            // }
            // this.$refs['businessHours'].resetFields();
          }
        },
        //更新特色标签-
        updateTags(){
            this.$axios.post('/corp/manage/tags/update',{
              corpInfoId:this.tagDatas.corpInfoId,
              storeSpecials:this.storeSpecials
            }).then( (res) => {
                  if(res.data.code=='0'){
                      this.modal3=false;
                      this.tagDatas.storeSpecials=this.storeSpecials;
                  }
            })
        },
        //获取特色标签列表--
        getFeature(){
            this.$axios.get('/corp/manage/tags/list/all',).then( (res) => {
                  if(res.data.code=='0'){
                      this.featureArr=res.data.items;
                  }
            })
        },
        //获取特色标签数据--
        getTagDatas(){
            this.$axios.get('/corp/manage/tags/list',).then( (res) => {
                  if(res.data.code=='0'){
                      this.tagDatas=res.data.item;
                      this.storeSpecials=res.data.item.storeSpecials;
                  }
            })
        },

    }
	}
</script>

<style scoped lang="less">
  .dblock{
    margin: 10px 0;
    .dtitle {
      text-align: left;
      padding-left: 10px;
      border-left: 5px solid #4ba7f5;
      font-size: 16px;
      width: 100%;
      margin-bottom: 15px;
    }
    .center{
      text-align: center;
      .inline-box {
        display: inline-block;
        vertical-align: top;
        margin-bottom: 30px;
        > div {
          white-space: nowrap;
          display: inline-block;
        }
        .group{
          text-align: left;
          .item{
            height: 35px;
            line-height: 35px;
          }
        }
      }
    }
  }
</style>
