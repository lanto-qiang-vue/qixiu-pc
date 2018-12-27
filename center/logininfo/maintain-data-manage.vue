<template>
<div style="padding: 0 10px">
    
  <div class="dblock">
    <h1 class="dtitle">维修数据上报管理</h1>
    <div style="padding: 15px 0;">
            <Form :label-width="110" class="common-form">
                <FormItem label="统计维度:">
                    <Button style="width: 60px;" type="primary" shape="circle">7天</Button>
                    <Button style="width: 60px;" type="primary" shape="circle">1个月</Button>
                </FormItem>
                <FormItem label="" :label-width="0" style="width:410px;text-align: left;">
                    <DatePicker type="date" placeholder="请选择开始日期" style="width: 150px"></DatePicker>
                    <span>-</span>
                    <DatePicker type="date" placeholder="请选择结束日期" style="width: 150px"></DatePicker>
                </FormItem>
                
          </Form>
        </div>
    <div class="center">



      <div class="inline-box">
        <div id="bar2" style="width: 800px;height: 450px"></div>
      </div>
      <div >
          <div>
            <Table :columns="areaColumns" :data="areaColumnsData" ref="table2"
                  stripe border @on-row-click="onRowClick" :loading="loading"></Table>
          </div>

          <div style="padding: 15px 0;">
            <Table :columns="areaColumns1" :data="areaColumnsData1" ref="table2"
                  stripe border @on-row-click="onRowClick" :loading="loading"></Table>
          </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>
export default {
  name: "maintain-data-manage",

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
      areaColumns:[
          {title: '未上报维修记录企业总数', minWidth: 250,key: 'noCount',},
          {title: '沪市', key: 'noCount',  minWidth: 80,},
          {title: '沪闵', key: 'noCount',  minWidth: 100},
          {title: '沪宝', key: 'noCount',  minWidth: 100,},
          {title: '沪嘉', key: 'noCount',  minWidth: 100,},
          {title: '沪金', key: 'noCount',  minWidth: 100,},
          {title: '沪松', key: 'noCount',  minWidth: 100,},
          {title: '沪青', key: 'noCount',  minWidth: 100,},
          {title: '沪奉', key: 'noCount',  minWidth: 100,},
          {title: '沪崇', key: 'noCount',  minWidth: 100,},
      ],
      areaColumnsData:[{noCount:1}],
      areaColumns1:[
          {title: '上报异常的企业数', minWidth: 250,key: 'noCount',},
          {title: '沪市', key: 'noCount',  minWidth: 100,},
          {title: '沪闵', key: 'noCount',  minWidth: 100},
          {title: '沪宝', key: 'noCount',  minWidth: 100,},
          {title: '沪嘉', key: 'noCount',  minWidth: 100,},
          {title: '沪金', key: 'noCount',  minWidth: 100,},
          {title: '沪松', key: 'noCount',  minWidth: 100,},
          {title: '沪青', key: 'noCount',  minWidth: 100,},
          {title: '沪奉', key: 'noCount',  minWidth: 100,},
          {title: '沪崇', key: 'noCount',  minWidth: 100,},
      ],
      areaColumnsData1:[{noCount:1}],

      notifyData: [],
      typeList:[
            {code:0,name:"维修记录未上传"},
            {code:1,name:"维修记录不正确"},
        ],
        searchType:0,
        areaType:[],
    }
  },
  mounted() {
    this.$Spin.show();
    $.getScript('/libs/echarts.common.min.js',()=>{
      this.getData()
      this.$Spin.hide();
    })
  },
  methods:{
    getData(){
      this.$axios.$get('/mgmtdept/statistics/shanghai').then((res) => {
        this.res= res.item
        this.showChart(res.item)

      })
    },
    showChart(data){
      this.recordData=[
        {category: 0, type: '维修企业', count: data.corpcount, uploadCount: data.uploadcorpcount, rate: data.corprate.toFixed(2)+'%'},
        {category: 43, type: '一类维修企业', count: data.class1corpcount, uploadCount: data.class1uploadcorpcount, rate: data.class1corprate.toFixed(2)+'%'},
        {category: 44, type: '二类维修企业', count: data.class2corpcount, uploadCount: data.class2uploadcorpcount, rate: data.class2corprate.toFixed(2)+'%'},
        {category: 45, type: '三类维修业户', count: data.class3corpcount, uploadCount: data.class3uploadcorpcount, rate: data.class3corprate.toFixed(2)+'%'},
        {category: 47, type: '汽车快修业户', count: data.class5corpcount, uploadCount: data.class5uploadcorpcount, rate: data.class5corprate.toFixed(2)+'%'},
        {category: 46, type: '摩托车维修业户', count: data.class4corpcount, uploadCount: data.class4uploadcorpcount, rate: data.class4corprate.toFixed(2)+'%'},
      ]
      this.areaType=this.res.areaItems;

      
      let bar2 = echarts.init(document.getElementById('bar2'));


      var app={};

app.config = {
    rotate: 0,
    align: 'center',
    verticalAlign: 'middle',
    position: 'top',
    distance: 15,
};

      var labelOption = {
            normal: {
                show: true,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}',
                fontSize: 14,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        };

      
      let optionBar1 = {
        color: ['#C14DE8','#0f0f0f'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            label:{show: true}
          }
        },
        grid: {
        },
        legend: {
          data:['未上报维修记录企业数', '上报异常的企业数',],
        },
        xAxis : [
          {
            type : 'category',
            data : [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: 0
            },
          },

          
          
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            barGap: 0,
            label: labelOption,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal:{
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: '#61A0A8'
              }
            },
            name:'未上报维修记录企业数',
            type:'bar',
            data:[],
            barGap:'20%', 
          },
          {
            label: labelOption,
            //配置样式
            itemStyle: {
              //通常情况下：
              normal:{
                color: '#C23431'
              }
            },
            name:'上报异常的企业数',
            type:'bar',
            data:[],
            barGap:'20%', 

          },
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
     

      let datas = data.areaItems;
      let area=[], num=[], num2=[], sum=[]

      for (var i in datas){
          area.push(datas[i].areaname)
          num.push(datas[i].nzdzcount)
          num2.push(datas[i].zdzcount)
          sum.push(datas[i].nzdzcount+ datas[i].zdzcount)
      }

      optionBar1.xAxis[0].data= area;
      optionBar1.series[0].data=num;
      optionBar1.series[1].data=num2;
    //   optionBar1.series[2].data=sum;
      bar2.setOption(optionBar1);

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
