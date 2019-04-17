<template>
<div style="padding: 0 10px">
  <div class="dblock">
    <h1 class="dtitle">电子健康档案状况</h1>
    <div class="center">
      <div class="inline-box">
        <Table :columns="recordColumns" :data="recordData" ref="table" width="600"
               stripe border @on-row-click="onRowClickTop"></Table>
      </div>
      <div class="inline-box">
        <div id="pie1" style="width: 300px;height: 300px;position: relative"></div>
        <div id="pie3" style="width: 300px;height: 300px;position: relative"></div>
      </div>
    </div>
  </div>
  <div class="dblock">
    <h1 class="dtitle">维修记录上传监控</h1>
    <div class="center">
      <maintain-data-manage></maintain-data-manage>
    </div>

  </div>
  <div class="dblock">
    <h1 class="dtitle">区域对接状况</h1>
    <div class="center">
      <div class="inline-box" style="width: 100%">
        <div id="bar1" style="width: 100%;height: 400px"></div>
      </div>
    </div>

  </div>
  <div class="dblock" v-if="accessBtn('get')">
    <h1 class="dtitle">用户反馈</h1>
    <div class="center">
      <div >
        <div style="width: 150px; height: 50px;" class="inline-box">
          <Select v-model="searchType" @on-change="onChange">
              <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </div>
          <div>
            <Table :columns="notifyColumns" :data="notifyData" ref="table2"
                  stripe border @on-row-click="onRowClick" :loading="loading"></Table>
          </div>


      </div>
    </div>

  </div>

</div>
</template>

<script>
  import funMixin from '~/components/fun-auth-mixim.js'
  import maintainDataManage from '~/center/logininfo/maintain-data-manage.vue'
export default {
  name: "government-center",
  mixins: [funMixin],
  components: {
      maintainDataManage
  },
  computed:{
    isShanghai(){
        return process.env.config.areaName=='shanghai'
      },
  },
  data(){
    return{
      res:{},
      loading:false,
      recordColumns: [
        {title: '类型', key: 'type',  minWidth: 100,},
        {title: '总数', key: 'count',  minWidth: 100,},
        {title: '已对接数量', key: 'uploadCount',  minWidth: 100},
        {title: '完成率', key: 'rate',  minWidth: 100},
      ],
      recordData: [],
      notifyColumns: [
          {title: '排名', minWidth: 100,type: "index",},
          {title: '企业名称', key: 'companyName',  minWidth: 100,
          },
          {title: '反馈总量(次)', key: 'allCount',  minWidth: 100},
          {title: '有凭证数量(次)', key: 'hasCount',  minWidth: 100,

          },
          {title: '无凭证数量(次)', key: 'noCount',  minWidth: 100,

          },
      ],

      notifyData: [],
      typeList:[
            {code:0,name:"维修记录未上传"},
            {code:1,name:"维修记录不正确"},
        ],
        searchType:0,
        areaType:[],
      barTotal:[]
    }
  },
  mounted() {
    this.$Spin.show();
    $.getScript('/libs/echarts.common.min.js',()=>{
      this.getData()
      this.$Spin.hide();
    })

    if(this.accessBtn('get')){
      this.getList();
    }

  },
  methods:{
    getData(){
      this.$axios.$get('/mgmtdept/statistics/'+process.env.config.areaName).then((res) => {
        this.res= res.item
        this.showChart(res.item)

      })
    },
    showChart(data){
      if(this.isShanghai){
        this.recordData=[
          {category: 0, type: '维修企业', count: data.corpcount, uploadCount: data.uploadcorpcount, rate: data.corprate.toFixed(2)+'%'},
          {category: 43, type: '一类维修企业', count: data.class1corpcount, uploadCount: data.class1uploadcorpcount, rate: data.class1corprate.toFixed(2)+'%'},
          {category: 44, type: '二类维修企业', count: data.class2corpcount, uploadCount: data.class2uploadcorpcount, rate: data.class2corprate.toFixed(2)+'%'},
          {category: 45, type: '三类维修业户', count: data.class3corpcount, uploadCount: data.class3uploadcorpcount, rate: data.class3corprate.toFixed(2)+'%'},
          {category: 47, type: '汽车快修业户', count: data.class5corpcount, uploadCount: data.class5uploadcorpcount, rate: data.class5corprate.toFixed(2)+'%'},
          {category: 46, type: '摩托车维修业户', count: data.class4corpcount, uploadCount: data.class4uploadcorpcount, rate: data.class4corprate.toFixed(2)+'%'},
        ]
      }else{
        this.recordData=[
          {category: 0, type: '维修企业', count: data.corpcount, uploadCount: data.uploadcorpcount, rate: data.corprate.toFixed(2)+'%'},
          {category: 43, type: '一类维修企业', count: data.class1corpcount, uploadCount: data.class1uploadcorpcount, rate: data.class1corprate.toFixed(2)+'%'},
          {category: 44, type: '二类维修企业', count: data.class2corpcount, uploadCount: data.class2uploadcorpcount, rate: data.class2corprate.toFixed(2)+'%'},
          {category: 45, type: '三类维修业户', count: data.class3corpcount, uploadCount: data.class3uploadcorpcount, rate: data.class3corprate.toFixed(2)+'%'},
        ]
      }

      this.areaType=this.res.areaItems;

      let pie1 = echarts.init(document.getElementById('pie1'));
      let pie3 = echarts.init(document.getElementById('pie3'));
      let bar1 = echarts.init(document.getElementById('bar1'));
      let option1 = {
        title: {
          text:'维修企业注册数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          // x: 'left',
          bottom: 0,
          data:['维修企业完成对接','维修企业未完成对接']
        },
        color:['#C14DE8','#4DB2E8','#C14DE8'],
        series: [{
          name:'数据对接完成情况',
          type:'pie',
          radius: ['50%', '65%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '16',
                fontWeight: ''
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:4380, name:'维修企业完成对接'},
            {value:1620, name:'维修企业未完成对接'},
          ]
        }]
      };
      let option3 = {
        title: {
          text:'维修记录上传数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          // x: 'left',
          bottom: 0,
          data:['今日上传数量','昨日上传数量']
        },
        color:['#C14DE8','#4DB2E8','#C14DE8'],
        series: [{
          name:'维修记录上传数量',
          type:'pie',
          radius: ['50%', '65%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '16',
                fontWeight: ''
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:[
            {value:4380, name:'今日上传数量'},
            {value:1620, name:'昨日上传数量'},
          ]
        }]
      };
      let optionBar = {
        color: ['#C14DE8'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            label:{show: true}
          },
          extraCssText: 'text-align: left;'
        },
        grid: {
        },
        legend: {
          data:['非总对总数', '总对总数量', '已对接总数'],
        },
        xAxis : [
          {
            type : 'category',
            data : ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区',  '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区',  '奉贤区', '崇明区'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            triggerEvent: true
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            barGap: 0,
            label: {
              normal: {
                show: true,
                position: 'inside',
                // offset: [-25,-2]
              }
            },
            //配置样式
            itemStyle: {
              //通常情况下：
              normal:{
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: '#6761FF'
              }
            },
            name:'非总对总数',
            type:'bar',
            barWidth: '60%',
            data:[],
            stack: '数量',
            z: 3,
          },
          {
            label: {
              normal: {
                show: true,
                // position: 'inside',
                position: 'top',
                // offset: [0,-2]
              }
            },
            //配置样式
            itemStyle: {
              //通常情况下：
              normal:{
                color: '#4DB2E8'
              }
            },
            name:'总对总数量',
            type:'bar',
            //barWidth: '60%',
            data:[],
            stack: '数量',
          },
          {
            name:'已对接总数',
            type:'line',
            data:[],
            label: {
              normal: {
                show: true,
                position: 'top',
                offset: [0,-10]
              }
            },
            itemStyle: {
              //通常情况下：
              normal:{
                color: '#C14DE8'
              }
            },
            z: 4,
          }
        ],
        // dataZoom: [
        // {
        //     show: true,
        //     yAxisIndex: 0,
        //     filterMode: 'none',
        //     width: 30,
        //     height: '70%',
        //     showDataShadow: false,
        //     left: '93%',
        //     minSpan:10
        // }
        // ],
      };

      option1.series[0].data=[
        {value:parseInt(this.res.uploadcorpcount), name:'维修企业完成对接'},
        {value:parseInt(this.res.corpcount) - parseInt(this.res.uploadcorpcount), name:'维修企业未完成对接'},
      ]
      pie1.setOption(option1);
      option3.series[0].data=[
        {value:parseInt(this.res.todayuploadcount), name:'今日上传数量'},
        {value:parseInt(this.res.yesterdayuploadcount), name:'昨日上传数量'},
      ]
      pie3.setOption(option3);

      $("#pie1").append("<div class='pie-num'><p>总数</p><p>"+this.res.corpcount+"</p></div>")
      $("#pie3").append("<div class='pie-num'><p>总数</p><p>"+this.res.currentuploadcount+"</p></div>")

      let datas = data.areaItems;
      let area=[], num=[], num2=[], sum=[], total=[]

      for (let i in datas){
          area.push(datas[i].areaname)
          num.push(datas[i].nzdzcount)
          num2.push(datas[i].zdzcount)
          sum.push(datas[i].nzdzcount+ datas[i].zdzcount)
          if(!this.isShangHai) total.push(datas[i].total)
      }

      optionBar.xAxis[0].data= area;
      optionBar.series[0].data=num;
      optionBar.series[1].data=num2;
      optionBar.series[2].data=sum;
      if(!this.isShangHai){
        optionBar.tooltip.formatter= function (params) {
          // console.log(params)
          let tooltip= params[0].name+ '<br/>'+
            params[0].marker+params[0].seriesName+':'+ params[0].value+ '<br/>'+
            params[1].marker+params[1].seriesName+':'+ params[1].value+ '<br/>'+
            params[2].marker+params[2].seriesName+':'+ params[2].value+ '<br/>'+
            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:black;"></span>' +
            '对接完成率:'+(params[2].value/total[params[2].dataIndex]*100).toFixed(0)+'%'
          return tooltip
        }
        optionBar.series[2].label.normal.formatter= function (params) {
          // console.log('params', params)
          var data=  '{b|'+(params.value/total[params.dataIndex]*100).toFixed(0)+'%}'+'\n'+'{a|'+params.value+'}'
          return data
        }
        optionBar.series[2].label.normal.rich= {
          a: {},
          b: {color: 'black',},
        }
      }

      bar1.setOption(optionBar);

      bar1.on('click', (params)=>{
          console.log(params)
          let areaData='';
          for(let i in this.areaType){
                    if(this.areaType[i].areaname==params.name){
                        areaData=this.areaType[i].areakey;
                        break;
                    }
                }
         this.$router.push({path:'/center/record-company', query:{ minister: params.seriesIndex, area:areaData,name:'zdz'}})
      });


    },
    onRowClickTop(row){
      // console.log(row);
      let rowData='';
      if(row.category){
        rowData=row.category;
      }
      this.$router.push({path:'/center/record-company', query:{ category: rowData,name:'top'}})
    },
    onRowClick(row){
      // console.log(row);

      this.$router.push({path:'/center/review-manage', query:{ companyName: row.companyName,type:this.searchType,name:'clp'}})
    },
    getList(){
      let strUrl="";
      if(this.searchType==0){
        strUrl+='&type=0';
      }else if(this.searchType==1){
        strUrl+='&type=1';
      }
      this.loading=true;
      this.$axios.get('/comment/complaint/maintain/query/statistics?size=10&page=0'+strUrl, {
      }).then( (res) => {

        if(res.status===200){
            this.notifyData=res.data.content;
            this.loading=false;
        }else{
          // this.$Message.error(res.statusText);
          this.loading=false;
        }

      })
    },
    onChange(value){
      this.getList();
    }
  },
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
    }
  }
}

</style>
<style lang="less">
  .pie-num{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    p{
      /*margin: 8px 0;*/
      text-align: center;
      font-size: 22px;
    }
  }
</style>
