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
      <h1 class="dtitle">平台对接人</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="buttColumns" :data="buttData"  width="800"
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
    <div class="dblock">
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

    <div class="dblock">
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
<butt-joint :type="showType" :dataInit="dataInit" @refresh="checkButt" stage="2"></butt-joint>
  </div>
</template>

<script>
  import { formatDate } from '~/static/tools.js'
  import buttJoint from '~/components/butt-joint.vue'
	export default {
		name: "company-home",
    // head () {
    //   return {
    //     script: [
    //       { type: 'text/javascript', src: "/libs/echarts.common.min.js"},
    //     ],
    //   }
    // },
    components:{buttJoint},
    data(){
      return{
        commentModal:true,
        showType:false,
        dataInit:null,
        buttColumns:[
          {title: '对接人姓名', key: 'contactName',  minWidth: 100,},
          {title: '对接人手机号', key: 'contactMobile',  minWidth: 100,},
          {title: '操作', key: 'cz',  minWidth: 100,
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
                      this.changeButt(params.row);
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
        infoData: [],
        notifyData: [],
        visitDate:[],//上门日期服务--------
        buttData:[],
        visitData:[],
        orderData:[],
      }
		},
    mounted(){
      $.getScript('/libs/echarts.common.min.js',()=>{
        this.getVisit();
        this.getOrder();
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
      console.log(this.visitDate);

      // this.getServerDate();

      this.getNotify();
    },
    methods:{
      checkButt(){
        this.$axios.get('/monitoring/config/company-docking/query/companyCode').then((res) => {
          if(res.status == 200){
            this.buttData = res.data.content;
          }
        })
      },
      changeButt(row){
        this.dataInit = row;
        this.showType = Math.random();
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
