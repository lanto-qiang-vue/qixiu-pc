<template>
  <div style="padding: 0 10px">

    <div class="dblock">
      <h1 class="dtitle">维修数据上报管理</h1>
      <div style="padding: 15px 0;">
        <Form :label-width="110" class="common-form">
          <FormItem label="统计维度:">
            <Button style="width: 60px;"  type="primary" shape="circle" v-if="buttonType == 1" @click="buttonType=1,minus(7)">7天</Button>
            <Button style="width: 60px;"  shape="circle" @click="buttonType=2,minus(30)" v-if="buttonType == 1">1个月</Button>
            <Button style="width: 60px;"   shape="circle" v-if="buttonType == 2" @click="buttonType=1,minus(7)">7天</Button>
            <Button style="width: 60px;"  shape="circle" type="primary" @click="buttonType=2,minus(30)" v-if="buttonType == 2">1个月</Button>
          </FormItem>
          <FormItem label="" :label-width="0" style="width:320px;text-align: left;">
              <DatePicker type="daterange" v-model="searchTime" format="yyyy-MM-dd" placeholder="开始日期  -  结束日期" style="width: 300px"></DatePicker>
          </FormItem>
           <FormItem :label-width="0">
             <Button type="primary" @click="getAll()">查询</Button>
           </FormItem>
        </Form>
      </div>
      <div class="center">
        <!--各区维修记录上传情况-->
        <div class="inline-box" style="width:100%;position:relative;margin-top:20px;">
          <div id="bar2" style="width: 100%;height: 600px;"></div>
          <div style="position:absolute;left:10%;top:15px;font-size:14px;" v-show="apiShow">
            <div style="float:left;">
              <div
                style="height:15px;width:30px;float:left;background-color:#61A0A8;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;padding-left:10px;"><b>未上传企业: {{success1}}家</b></div>
            </div>
            <div style="float:left;padding-left:20px;">
              <div
                style="height:15px;width:30px;float:left;background-color:#C23431;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;padding-left:10px;"><b>错误记录企业: {{error1}}家</b></div>
            </div>
          </div>
          <div style="position:absolute;left:8%;top:-20px;"><b style="font-size:18px;" v-show="apiShow">各区维修记录上传情况</b></div>
          <div style="position:absolute;top:10px;right:10%;" v-show="apiShow">
            <Select style="width:150px;" v-model="key1">
              <Option v-for="item in areaName" :value="item" :key="item">{{item}}</Option>
            </Select></div>
        </div>
        <!--各区推送阅读情况-->
        <div class="inline-box" style="width:100%;position:relative;margin-top:20px;">
          <div id="bar3" style="width: 100%;height: 600px;"></div>
          <div style="position:absolute;left:10%;top:15px;font-size:14px;" v-show="apiShow">
            <div style="float:left;">
              <div
                style="height:15px;width:30px;float:left;background-color:#61A0A8;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;padding-left:10px;"><b>未上传未读企业: {{count1}}家</b></div>
            </div>
            <div style="float:left;padding-left:20px;">
              <div
                style="height:15px;width:30px;float:left;background-color:#C23431;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;padding-left:10px;"><b>错误记录未读企业: {{count2}}家</b></div>
            </div>
          </div>
          <div style="position:absolute;left:8%;top:-20px;"><b style="font-size:18px;" v-show="apiShow">各区推送未读情况</b></div>
          <div style="position:absolute;top:10px;right:10%;" v-show="apiShow">
            <Select style="width:150px;" v-model="key3">
              <Option v-for="item in readArea" :value="item.deptCode" :key="item.deptCode">{{item.deptName}}</Option>
            </Select></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'maintain-data-manage',
    data() {
      return {
        searchType: 0,
        areaType: [],
        areaName: [],//区域名称获取。区域不重复。不用去重
        secondArea:[],//二级区域
        readArea:[],//阅读区域下拉
        stage:1,//区分阶段
        readStage:1,//未读阶段
        dataObj: {},
        key1: '全部',//维修上传记录筛选key
        key3:'',//read筛选key
        success1: 0,//
        error1: 0,
        count1:0,//未上传阅读数
        count2:0,//上传错误阅读数
        bar2:null,
        bar3:null,
        optionBar1:null,
        optionBar3:null,
        buttonType:1,
        apiShow:false,//api慢我就不显示
        searchTime:null,
        readList:[],//未读区域数据
      }
    },
    mounted() {
      let self= this;
      window.onresize = function(){
        if(window.innerWidth!= self.windowInnerWidth){
          if(self.bar2){
            self.bar2.resize();
          }
          if(self.bar3){
            self.bar3.resize();
          }
        }
      }

      $.getScript('/libs/echarts.common.min.js', () => {
        this.minus(7);
      })
    },
    methods: {
      getAll(){
        this.getData();
        this.getRead();
      },
      minus(day){
        let date = new Date();
        let buildDate1 = new Date();
        let time = date.getTime() - day * 3600 * 24 * 1000;
        let buildDate2 = new Date(time);
        this.searchTime = [buildDate2,buildDate1];
        this.getAll();
      },
      toymd(date){
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      },
      getRead(code = ""){
        if(this.searchTime[0] == "" || this.searchTime[1] == ""){
          //缺少时间由getData抛出
          return false;
        }
        this.$axios.$get('/monitoring/display/company/docking-unread/count?startDate='+this.toymd(this.searchTime[0])+'&endDate='+this.toymd(this.searchTime[1])+"&deptCode="+code).then(res => {
         let data = res;
         if(code == ""){
           this.readList = res;
           let area = [];
           for(let i in data){
             area.push({deptName:data[i].deptName,deptCode:data[i].deptCode});
           }
           area.unshift({deptName:'全部',deptCode:0})
           this.readArea = area;
           //交给计算属性key3
           this.showRead(data,true);
           this.key3 = 0;
         }else{
           this.showRead(data,false);
           this.readStage = 2;
         }
        })
      },
      showRead(data,flag = false){
        this.bar3 = echarts.init(document.getElementById('bar3'))
        this.bar3.off('click');
        this.optionBar3 = {
          color: ['#C14DE8', '#0f0f0f'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: { show: true }
            }
          },
          selected:{
            '未上传未读': true,
            // 不选中'系列2'
            '存在错误未读': true,
          },
          grid: {},
          legend: {
            data: ['未上传未读', '存在错误未读'],
            top: 15,
            right: '30%'
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,
                rotate: 0
              }
            }


          ],
          yAxis: [
            {
              min:0,
              max:5,
              type: 'value'
            }
          ],
          series: [
            {
              barGap: 0,
              // label: labelOption,
              label: {
                show: true,
                position: 'inside'
              },
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#61A0A8'
                }
              },
              name: '未上传未读',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量'
            },
            {
              label: {
                show: true,
                position: 'inside'
              },
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  color: '#C23431'
                }
              },
              name: '存在错误未读',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量'
            }
          ]
        }
        //阴影展开
        let self = this.bar3;
        let that = this;
        this.bar3.getZr().on('click', function (params) {
          if(that.readStage == 2) return;
          let pointInPixel= [params.offsetX, params.offsetY];
          if (self.containPixel('grid',pointInPixel)) {
            let index = self.convertFromPixel({seriesIndex: 0}, [params.offsetX, params.offsetY])[0];
            that.key3 = that.readList[index].deptCode;
          }
        });
        //选中跳转
        this.bar3.on('click', (params)=>{
          console.log(params);
          let name = params.name;
          let arr;
          let store;
          if(that.readStage == 1){
            store = this.readList;
          }else{
            store = data;
          }
          arr = data.filter(function(obj){
            return obj.deptName == name;
          });
          let deptCode = arr[0].deptCode;
          alert(deptCode);
          if(params.seriesName == "存在错误未读"){

          }else{

          }
        });
        if(flag){
          return;
        }
        let area = [], success = [], error = [],count1 = 0,count2 = 0;
        for (let i = 0; i < data.length; i++) {
          area.push(data[i].deptName);
          error.push(data[i].notUpload);
          count1 += data[i].notUpload;
          success.push(data[i].uploadFault);
          count2 += data[i].uploadFault;
        }
        this.count1 = count1;
        this.count2 = count2;
        this.optionBar3.xAxis[0].data = area
        this.optionBar3.series[0].data = success
        this.optionBar3.series[1].data = error
        this.bar3.clear();
        this.bar3.setOption(this.optionBar3);
      },
      getData(code = "") {
        if(this.searchTime[0] == "" || this.searchTime[1] == ""){
          this.$Message.info("数据查询需要选择时间段");
          return false;
        }
        if(code == ""){
          this.stage = 1;
          this.key1 = "全部";
        }else{
          this.stage = 2;
        }
        this.$Spin.show();
        let success = new Promise((resolve, reject) => {
          this.$axios.$get('/monitoring/display/company/upload-not/count?startDate='+this.toymd(this.searchTime[0])+'&endDate='+this.toymd(this.searchTime[1])+"&deptCode="+code).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        })
        let error = new Promise((resolve, reject) => {
          this.$axios.$get('/monitoring/display/company/upload-fault/count?startDate='+this.toymd(this.searchTime[0])+'&endDate='+this.toymd(this.searchTime[1])+"&deptCode="+code).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        })
        return Promise.all([
          success,
          error
        ]).then(([res, data]) => {
        if(res.status == 404 && data.status == 404){
          return false;
        }
          let areaName = []
          let dataObj = {}
          let errorData = {}
          let success1 = 0
          let error1 = 0
          for (let i in data) {
            errorData[data[i].deptName] = data[i].companyCount;
            error1 += parseInt(data[i].companyCount);
          }
          for (let i in res) {
            areaName.push(res[i].deptName)
            dataObj[res[i].deptName] = { success: res[i].companyCount, error: errorData[res[i].deptName] || 0,code:res[i].deptCode }
            success1 += parseInt(res[i].companyCount);
          }
          if(code == ""){
            this.areaName = areaName;
            this.dataObj = dataObj;
          }else{
            this.secondArea = dataObj;
          }
          this.success1 = success1;
          this.error1 = error1;
          this.apiShow = true;
          this.showChart(areaName,dataObj);
          areaName.unshift('全部')
          this.$Spin.hide();
        })
      },
      showChart(areaName,dataObj) {
        this.bar2 = echarts.init(document.getElementById('bar2'))
          this.bar2.off('click');
         this.optionBar1 = {
          color: ['#C14DE8', '#0f0f0f'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: { show: true }
            }
          },
           selected:{
             '未上传': true,
             // 不选中'系列2'
             '存在错误': true,
           },
          grid: {},
          legend: {
            data: ['未上传', '存在错误'],
            top: 15,
            right: '30%'
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0,
                rotate: 0
              }
            }


          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              barGap: 0,
              // label: labelOption,
              label: {
                show: true,
                position: 'inside'
              },
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#61A0A8'
                }
              },
              name: '未上传',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量'
            },
            {
              label: {
                show: true,
                position: 'inside'
              },
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  color: '#C23431'
                }
              },
              name: '存在错误',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量'
            }
          ]
        }
        let area = [], success = [], error = [];
        for (let i = 0; i < areaName.length; i++) {
          area.push(areaName[i])
          success.push(dataObj[areaName[i]].success)
          error.push(dataObj[areaName[i]].error)
        }
        this.optionBar1.xAxis[0].data = area
        this.optionBar1.series[0].data = success
        this.optionBar1.series[1].data = error
        this.bar2.clear();
        this.bar2.setOption(this.optionBar1);
        let self = this.bar2;
        let that = this;
        this.bar2.getZr().on('click', function (params) {
          let pointInPixel= [params.offsetX, params.offsetY];
          if (self.containPixel('grid',pointInPixel)) {
            let xIndex = self.convertFromPixel({seriesIndex: 0}, [params.offsetX, params.offsetY])[0];
            if(that.stage == 1){
              that.key1 = that.areaName[xIndex+1];
            }
          }
        });
         this.bar2.on('click', (params)=>{
        let deptCode;
        let url;
        if(this.dataObj.hasOwnProperty(params.name)){
          deptCode = this.dataObj[params.name].code;
        }else{
          deptCode = this.secondArea[params.name].code;
        }
        if(params.seriesName == '未上传'){
          url = "/center/repair-upload";
        }else{
          url = "/center/repair-upload-error";
        }
        this.$router.push({ path:url, query: { deptCode: deptCode,deptName:params.name,startDate:this.toymd(this.searchTime[0]),endDate:this.toymd(this.searchTime[1])} })
      });

      },
      onRowClickTop(row) {
        let rowData = ''
        if (row.category) {
          rowData = row.category
        }
        this.$router.push({ path: '/center/record-company', query: { category: rowData, name: 'top' } })
      },
      onRowClick(row) {
        // console.log(row);

        this.$router.push({
          path: '/center/review-manage',
          query: { companyName: row.companyName, type: this.searchType, name: 'clp' }
        })
      },
      onChange(value) {
        this.getList()
      }
    },
    watch:{
      searchTime(val){

      },
      key1(val){
        let area = [], success = [], error = [],success1 = 0,error1 = 0;
        if(this.key1 == "全部"){
          this.stage = 1;
          for (let i = 0; i < this.areaName.length; i++) {
            if (this.areaName[i] == '全部') {
              continue
            }
            area.push(this.areaName[i])
            success.push(this.dataObj[this.areaName[i]].success)
            success1 += parseInt(this.dataObj[this.areaName[i]].success);
            error.push(this.dataObj[this.areaName[i]].error)
            error1 += parseInt(this.dataObj[this.areaName[i]].error);
            this.optionBar1.xAxis[0].data = area
            this.optionBar1.series[0].data = success
            this.optionBar1.series[1].data = error
            this.bar2.setOption(this.optionBar1);
            this.success1 = success1;
            this.error1 = error1;
          }
          return;
        }else{
          this.getData(this.dataObj[val].code);
        }
      },
      key3(val){
       if(val == 0){
         this.readStage = 1;
         let data = this.readList;
         let area = [], success = [], error = [],count1 = 0,count2 = 0;
         for (let i = 0; i < data.length; i++) {
           area.push(data[i].deptName);
           error.push(data[i].notUpload);
           count1 += data[i].notUpload;
           success.push(data[i].uploadFault);
           count2 += data[i].uploadFault;
         }
         this.count1 = count1;
         this.count2 = count2;
         this.optionBar3.xAxis[0].data = area
         this.optionBar3.series[0].data = success
         this.optionBar3.series[1].data = error
         this.bar3.clear();
         this.bar3.setOption(this.optionBar3);
       }else{
         this.getRead(val);
       }
      }
    },
  }
</script>

<style scoped lang="less">
  .dblock {
    margin: 10px 0;
    .dtitle {
      text-align: left;
      padding-left: 10px;
      border-left: 5px solid #4ba7f5;
      font-size: 16px;
      width: 100%;
      margin-bottom: 15px;
    }
    .center {
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
  .pie-num {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
      /*margin: 8px 0;*/
      text-align: center;
      font-size: 22px;
    }
  }
</style>
