<template>
  <div style="padding: 0 10px">

    <div class="dblock">
      <h1 class="dtitle" v-show="!isManage">维修数据上报管理</h1>
      <div style="padding: 15px 0;">
        <Form :label-width="110" class="common-form">
          <FormItem label="统计维度:">
            <Button style="width: 60px;" type="primary" shape="circle" v-if="buttonType == 1"
                    @click="buttonType=1,minus(7)" :disabled="isManage">7天
            </Button>
            <Button style="width: 60px;" shape="circle" @click="buttonType=2,minus(30)" v-if="buttonType == 1" v-show="!isManage">1个月
            </Button>
            <Button style="width: 60px;" shape="circle" v-if="buttonType == 2" @click="buttonType=1,minus(7)" :disabled="isManage">7天
            </Button>
            <Button style="width: 60px;" shape="circle" type="primary" @click="buttonType=2,minus(30)"
                    v-if="buttonType == 2" v-show="!isManage">1个月
            </Button>
            <Button style="width: 60px;"  shape="circle" v-if="buttonType == 3"
                    @click="buttonType=1,minus(7)" :disabled="isManage">7天
              </Button>
              <Button style="width: 60px;" shape="circle"  @click="buttonType=2,minus(30)"
                      v-if="buttonType == 3" v-show="!isManage">1个月
              </Button>
          </FormItem>
          <FormItem label="" :label-width="0" style="width:320px;text-align: left;">
            <DatePicker type="daterange" v-model="searchTime" :options="options" format="yyyy-MM-dd" placeholder="开始日期  -  结束日期"
                        style="width: 300px" :disabled="isManage"></DatePicker>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="getAll" v-show="!isManage">查询</Button>
            <Button type="primary" v-show="isManage" @click="goToManage">统计更多日期</Button>
          </FormItem>
        </Form>
      </div>
      <div class="center">
        <!--各区维修记录上传情况-->
        <div class="inline-box" style="width:100%;position:relative;margin-top:20px;padding-top:20px;">
          <div id="bar2" style="width: 100%;height: 600px;"></div>
          <div style="position:absolute;left:10%;top:15px;font-size:12px;" v-show="apiShow">
            <div>
              <div
                style="height:15px;width:30px;float:left;background-color:#DD0A14;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;"><b>未上传企业: {{success1}}家</b></div>
            </div>
            <div>
              <div
                style="height:15px;width:30px;float:left;background-color:#F6A805;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;"><b>错误记录企业: {{error1}}家</b></div>
            </div>
            <div>
              <div
                style="height:15px;width:30px;float:left;background-color:#19be6b;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;"><b>上传无误企业: {{successUpdateNum}}家</b></div>
            </div>
          </div>
          <div style="position:absolute;left:8%;top:-20px;"><b style="font-size:18px;" v-show="apiShow">各区维修记录上传情况</b>
          </div>
          <div style="position:absolute;top:30px;right:10%;" v-show="apiShow">
            <Select style="width:150px;" v-model="key1">
              <Option v-for="item in areaName" :value="item" :key="item">{{item}}</Option>
            </Select>

          </div>
        </div>
        <!--各区推送阅读情况-->
        <div class="inline-box" style="width:100%;position:relative;margin-top:20px;">
          <div id="bar3" style="width: 100%;height: 600px;"></div>
          <div style="position:absolute;left:10%;top:15px;font-size:12px;" v-show="apiShow">
            <div>
              <div
                style="height:15px;width:30px;float:left;background-color:#DD0A14;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;padding-left:10px;"><b>未上传未读企业: {{count1}}家</b></div>
            </div>
            <div>
              <div
                style="height:15px;width:30px;float:left;background-color:#F6A805;border-radius:5px;margin-top:2px;"></div>
              <div style="float:left;padding-left:10px;"><b>错误记录未读企业: {{count2}}家</b></div>
            </div>
          </div>
          <div style="position:absolute;left:8%;top:-20px;"><b style="font-size:18px;" v-show="apiShow">各区推送未读情况</b>
          </div>
          <div style="position:absolute;top:10px;right:10%;" v-show="apiShow">
            <Select style="width:150px;" v-model="key3">
              <Option v-for="item in readArea" :value="item.deptCode" :key="item.deptCode">{{item.deptName}}</Option>
            </Select>

          </div>
        </div>
        <!--试点企业维修点评情况-->
        <div class="inline-box" style="width:100%;position:relative;margin-top:20px;">
          <div id="bar" style="width: 100%;height: 650px;"></div>
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
        options: {
          disabledDate (date) {
            let now = new Date();
            let d1 = new Date(now.getFullYear(),now.getMonth(),now.getDate()-1);
            return date > d1;
          }
        },
        areaName: [],//区域名称获取。区域不重复。不用去重
        secondArea: [],//二级区域
        readArea: [],//阅读区域下拉
        stage: 1,//区分阶段
        readStage: 1,//未读阶段
        dataObj: {},
        key1: '全部',//维修上传记录筛选key
        key3: '',//read筛选key
        success1: 0,//
        error1: 0,
        successUpdateNum:0,
        count1: 0,//未上传阅读数
        count2: 0,//上传错误阅读数
        bar2: null,
        bar3: null,
        optionBar1: null,
        optionBar3: null,
        buttonType: 1,
        apiShow: false,//api慢我就不显示
        searchTime: null,
        readList: [],//未读区域数据
        optionBar: null,
        bar: null,
        isManage:false,
      }
    },
    mounted() {

      let queryData= this.$route;
      console.log("queryData",queryData);
      if(queryData.path=='/center/gov-home'){
        this.isManage=true;
      }


      let self = this
      window.onresize = function() {
        if (window.innerWidth != self.windowInnerWidth) {
          if (self.bar2) {
            self.bar2.resize()
          }
          if (self.bar3) {
            self.bar3.resize()
          }
          if (self.bar) {
            self.bar.resize()
          }
        }
      }

      $.getScript('/libs/echarts.common.min.js', () => {
        this.minus(7)
        this.add1(new Date());
      })
    },
    methods: {
      getAll() {
        this.getData()
        this.getRead()
        this.getComment()
      },
      computedTime(day){
        let date = new Date()
        let buildDate1 = new Date(date.getTime() - 1 * 3600 * 24 * 1000)
        let time = date.getTime() - day * 3600 * 24 * 1000
        let buildDate2 = new Date(time)
        return [buildDate2, buildDate1];
      },
      minus(day) {
        let date = new Date()
        let buildDate1 = new Date(date.getTime() - 1 * 3600 * 24 * 1000)
        let time = date.getTime() - day * 3600 * 24 * 1000
        let buildDate2 = new Date(time)
        this.searchTime = [buildDate2, buildDate1]
        this.getAll()
      },
      toymd(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      },
      add1(date){
        let now = date;
        return new Date(now.getFullYear(),now.getMonth(),now.getDate());
      },
      getRead(code = '') {
        if (this.searchTime[0] == '' || this.searchTime[1] == '') {
          //缺少时间由getData抛出
          return false
        }
        this.$axios.$get('/monitoring/display/company/docking-unread/count?startDate=' + this.toymd(this.searchTime[0]) + '&endDate=' + this.toymd(this.add1(this.searchTime[1])) + '&deptCode=' + code).then(res => {
          let data = res
          if (code == '') {
            this.readList = res
            let area = []
            for (let i in data) {
              area.push({ deptName: data[i].deptName, deptCode: data[i].deptCode })
            }
            area.unshift({ deptName: '全部', deptCode: 0 })
            this.readArea = area
            //交给计算属性key3
            this.showRead(data, true)
            this.key3 = 0
          } else {
            this.showRead(data, false)
            this.readStage = 2
          }
        })
      },
      showRead(data, flag = false) {
        this.bar3 = echarts.init(document.getElementById('bar3'))
        this.bar3.off('click')
        this.optionBar3 = {
          color: ['#C14DE8', '#0f0f0f'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: { show: true }
            }
          },
          selected: {
            '未上传未读': true,
            // 不选中'系列2'
            '存在错误未读': true
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
                rotate: 0,
                padding: [4, 20]
              },
              triggerEvent: true
            }


          ],
          yAxis: [
            {
              min: 0,
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
                  color: '#DD0A14'
                }
              },
              name: '未上传未读',
              type: 'bar',
              data: [],
              barGap: '20',
              stack: '数量',
              barMaxWidth: 100
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
                  color: '#F6A805'
                }
              },
              name: '存在错误未读',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量',
              barMaxWidth: 100
            }
          ]
        }
        //阴影展开
        let that = this
        // this.bar3.getZr().on('click', function(params) {
        //   if (that.readStage == 2) return
        //   let pointInPixel = [params.offsetX, params.offsetY]
        //   if (self.containPixel('grid', pointInPixel)) {
        //     let index = self.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]
        //     that.key3 = that.readList[index].deptCode
        //   }
        // })
        //选中跳转
        this.bar3.on('click', (params) => {
          let name = params.name || params.value
          let arr
          let url
          let store
          let type
          if (that.readStage == 1) {
            store = this.readList
          } else {
            store = data
          }
          arr = store.filter(function(obj) {
            return obj.deptName == name
          })
          let deptCode = arr[0].deptCode
          if (params.componentType == 'xAxis' && that.readStage == 1) {
            that.key3 = deptCode
            return
          }
          if(params.componentType == 'xAxis' && that.readStage == 2){
            return;
          }
          if (params.seriesName == '存在错误未读') {
            url = 'repair-error-noread'
            type = 'UPLOAD_FAULT'
          } else {
            url = 'repair-upload-noread'
            type = 'NOT_UPLOAD'
          }
          this.$router.push({
            path: url,
            query: {
              deptCode: deptCode,
              deptName: params.name,
              startDate: this.toymd(this.searchTime[0]),
              endDate: this.toymd(this.searchTime[1]),
              type: type
            }
          })
        })
        let area = [], success = [], error = [], count1 = 0, count2 = 0
        for (let i = 0; i < data.length; i++) {
          area.push(data[i].deptName)
          success.push(data[i].notUpload)
          count1 += data[i].notUpload
          error.push(data[i].uploadFault)
          count2 += data[i].uploadFault
        }
        this.count1 = count1
        this.count2 = count2
        this.optionBar3.xAxis[0].data = area
        this.optionBar3.series[0].data = success
        this.optionBar3.series[1].data = error
        this.bar3.clear()
        this.bar3.setOption(this.optionBar3)
      },
      getComment(code = '') {
        this.$axios.$get('/monitoring/display/company/upload-comment/count?startDate=' + this.toymd(this.searchTime[0]) + '&endDate=' + this.toymd(this.add1(this.searchTime[1])) + '&deptCode=' + code).then(res => {
          let data = {}
          for (let i in res) {
            let probability
            //还有除以0异常
            if (res[i].recordTotalCount == 0) {
              probability = 0
            } else {
              probability = (res[i].commentCount / res[i].recordTotalCount * 10000).toFixed(2) / 10000;
            }
            data[res[i].companyName] = {
              success: res[i].recordTotalCount, error: res[i].commentCount,
              gl: probability
            }
          }
          this.showComment(data)
        })
      },
      showComment(data) {
        let obj = data
        // let obj = {'a1':{success:100,error:10,gl:0.1},'a2':{success:200,error:20,gl:0.1},'a3':{success:300,error:30,gl:0.1}};
        this.bar = echarts.init(document.getElementById('bar'))
        this.bar.off('click')
        this.optionBar = {
          color: ['#C14DE8', '#0f0f0f'],
          title:{
            show:true,
            text:'企业维修点评情况(top20)',
            x:'center',
          },
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              let company = params[0].axisValue
              let str = company + '<br/>'
              str += '<div style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#557D98"></div>记录数:' + obj[company].success + '条<br/>'
              str += '<div style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#61A0A8"></div>评论数:' + obj[company].error + '条<br/>'
              str += "占比:"+obj[company].gl * 100 + "%";
              return str
            },
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: { show: true }
            }
          },
          selected: {
            '记录数': true,
            // 不选中'系列2'
            '评论数': true
          },
          grid: {
            bottom: 120
          },
          legend: {
            data: ['记录数', '评论数'],
            bottom: 10
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
                rotate: 0,
                formatter: function(params) {
                  return params.replace(/(.{3})/g, '$1\n')
                }
              },
              triggerEvent: false
            }


          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: function(value) {
                  return value * 100 + '%'
                }
              }
            }
          ],
          series: [
            {
              barGap: 0,
              // label: labelOption,
              label: {
                show: true,
                position: 'top',
                formatter: function(params) {
                  return obj[params.name].success
                }

              },
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: '#557D98'
                }
              },
              name: '记录数',
              type: 'bar',
              data: [],
              barGap: '-100%',
              barMaxWidth: 100
            },
            {
              label: {
                show: true,
                position: 'inside',
                formatter: function(params) {
                  if (obj[params.name].error == 0) return ''
                  return obj[params.name].error + '\n' + '占比' + '\n' + obj[params.name].gl * 100 + '%'
                }
              },
              //配置样式
              itemStyle: {
                //通常情况下：
                normal: {
                  color: '#61A0A8'
                }
              },
              name: '评论数',
              type: 'bar',
              data: [],
              z: 10,
              barMaxWidth: 100
            }
          ]
        }
        let company = []
        let gl = []
        let one = []
        for (let item in obj) {
          company.push(item)
          gl.push(obj[item].gl)
          one.push(1)
        }
        this.optionBar.xAxis[0].data = company
        this.optionBar.series[0].data = one
        this.optionBar.series[1].data = gl
        this.bar.clear()
        this.bar.setOption(this.optionBar)
        // this.bar.on('click', (params) => {
        //   this.$router.push({ path: '/center/record-repair', query: {name:params.name } })
        // })
      },
      getData(code = '') {
        if (this.searchTime[0] == '' || this.searchTime[1] == '') {
          this.$Message.info('数据查询需要选择时间段')
          return false
        }
        if (code == '') {
          this.stage = 1
          this.key1 = '全部'
        } else {
          this.stage = 2
        }
        this.$Spin.show()
        let success = new Promise((resolve, reject) => {
          this.$axios.$get('/monitoring/display/company/upload-not/count?startDate=' + this.toymd(this.searchTime[0]) + '&endDate=' + this.toymd(this.add1(this.searchTime[1])) + '&deptCode=' + code).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        })
        let error = new Promise((resolve, reject) => {
          this.$axios.$get('/monitoring/display/company/upload-fault/count?startDate=' + this.toymd(this.searchTime[0]) + '&endDate=' + this.toymd(this.add1(this.searchTime[1])) + '&deptCode=' + code).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        })
        let noUpdate = new Promise((resolve, reject) => {
          this.$axios.$get('/monitoring/display/company/dept/count?deptCode=' + code).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        })
        return Promise.all([
          success,
          error,
          noUpdate
        ]).then(([res, data,data1]) => {
          if (res.status == 404 && data.status == 404 && data1.status == 404) {
            return false
          }

          let areaName = []
          let dataObj = {}
          let errorData = {}
          let success1 = 0
          let error1 = 0
          let successUpdate={};
          let successUpdateNum=0;
          for (let i in data) {
            errorData[data[i].deptName] = data[i].companyCount
            error1 += parseInt(data[i].companyCount)
          }

          for (let i in data1) {
            let notData=0;
            if(data[i]){
              notData=parseInt(data[i].companyCount)
            }

            successUpdate[data1[i].deptName] = parseInt(data1[i].companyCount)-parseInt(res[i].companyCount)-notData
            successUpdateNum += (parseInt(data1[i].companyCount)-parseInt(res[i].companyCount)-notData)
          }
          for (let i in res) {
            areaName.push(res[i].deptName)
            dataObj[res[i].deptName] = {
              success: res[i].companyCount,
              error: errorData[res[i].deptName] || 0,
              code: res[i].deptCode,
              successUpdate:successUpdate[res[i].deptName]||0
            }
            success1 += parseInt(res[i].companyCount)
          }
          if (code == '') {
            this.areaName = areaName
            this.dataObj = dataObj
          } else {
            this.secondArea = dataObj
          }
          this.success1 = success1
          this.error1 = error1
          this.successUpdateNum=successUpdateNum
          this.apiShow = true
          this.showChart(areaName, dataObj)
          areaName.unshift('全部')
          this.$Spin.hide()
        })
      },
      showChart(areaName, dataObj) {
        this.bar2 = echarts.init(document.getElementById('bar2'))
        this.bar2.off('click')
        this.optionBar1 = {
          color: ['#C14DE8', '#0f0f0f'],
          tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              let company = params[0].axisValue

              let noUpload=0;
              let noUpload1=0;
              noUpload+=parseInt(dataObj[company].success)+parseInt(dataObj[company].successUpdate)+parseInt(dataObj[company].error);
              if(noUpload>0){
                noUpload1=((parseInt(dataObj[company].success)*10000/noUpload)/100).toFixed(2)+'%'
              }

              let errorUpload=0;
              let errorUpload1=0;
              errorUpload+=parseInt(dataObj[company].successUpdate)+parseInt(dataObj[company].error);
              if(errorUpload>0){
                errorUpload1=((parseInt(dataObj[company].error)*10000/errorUpload)/100).toFixed(2)+'%'
              }

              let str = company + '<br/>'
              str += '<div style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#DD0A14"></div>未上传:' + dataObj[company].success + '<br/>'
              str += '<div style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2b85e4"></div>未上传占比:' + noUpload1 + '<br/>'
              str += '<div style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#F6A805"></div>存在错误:' + dataObj[company].error + '<br/>'
              str += '<div style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2b85e4"></div>错误占比:' + errorUpload1 + '<br/>'
              str += '<div style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#19be6b"></div>已上传(无误+有误):' + errorUpload + '<br/>'


                return str;
            },
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              label: { show: true }
            }
          },
          selected: {
            '未上传': true,
            // 不选中'系列2'
            '存在错误': true
          },
          grid: {},
          legend: {
            data: ['未上传', '存在错误','上传无误'],
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
                rotate: 0,
                padding: [4, 20]
              },
              triggerEvent: true
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
                  color: '#DD0A14'
                }
              },
              name: '未上传',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量',
              barMaxWidth: 100
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
                  color: '#F6A805'
                }
              },
              name: '存在错误',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量',
              barMaxWidth: 100
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
                  color: '#19be6b'
                }
              },
              name: '上传无误',
              type: 'bar',
              data: [],
              barGap: '20%',
              stack: '数量',
              barMaxWidth: 100
            }
          ]
        }
        let area = [], success = [], error = [],uploadData=[]
        for (let i = 0; i < areaName.length; i++) {
          area.push(areaName[i])
          success.push(dataObj[areaName[i]].success)
          error.push(dataObj[areaName[i]].error)
          uploadData.push(dataObj[areaName[i]].successUpdate)
        }
        this.optionBar1.xAxis[0].data = area
        this.optionBar1.series[0].data = success
        this.optionBar1.series[1].data = error
        this.optionBar1.series[2].data = uploadData
        this.bar2.clear()
        this.bar2.setOption(this.optionBar1)
        let that = this
        this.bar2.on('click', (params) => {
          let name = params.name || params.value


          let deptCode
          let url
          if (this.dataObj.hasOwnProperty(name)) {
            deptCode = this.dataObj[name].code
          } else {
            deptCode = this.secondArea[name].code
          }
          if (that.stage == 1 && params.componentType == 'xAxis') {
            that.key1 = name
            return false
          }
          if(that.stage ==2 && params.componentType == 'xAxis'){
            return false;
          }
          if (params.seriesName == '未上传') {
            url = '/center/repair-upload'
          } else if (params.seriesName == '存在错误'){
            url = '/center/repair-upload-error'
          }else{
            return;
          }
          this.$router.push({
            path: url,
            query: {
              deptCode: deptCode,
              deptName: params.name,
              startDate: this.toymd(this.searchTime[0]),
              endDate: this.toymd(this.searchTime[1])
            }
          })
        })

      },
      onRowClickTop(row) {
        let rowData = ''
        if (row.category) {
          rowData = row.category
        }
        this.$router.push({ path: '/center/record-company', query: { category: rowData, name: 'top' } })
      },
      onRowClick(row) {
        this.$router.push({
          path: '/center/review-manage',
          query: { companyName: row.companyName, type: this.searchType, name: 'clp' }
        })
      },
      onChange(value) {
        this.getList()
      },
      goToManage(){
        this.$router.push({path: '/center/maintain-data-manage',})
      }
    },
    watch: {
      searchTime(val) {
        // alert(JSON.stringify(this.computedTime(7)));
        let start;
        let end;
         if(this.searchTime[0] != '' && this.searchTime[1] != ""){
            start = this.toymd(this.searchTime[0]);
            end  = this.toymd(this.searchTime[1]);
         }
        if(this.toymd(this.computedTime(7)[0]) == start && this.toymd(this.computedTime(7)[1]) == end){
          this.buttonType = 1;
        }else if(this.toymd(this.computedTime(30)[0]) == start &&this.toymd(this.computedTime(30)[1]) == end){
          this.buttonType = 2;
        }else{
          this.buttonType = 3;
        }
      },
      key1(val) {
        // let area = [], success = [], error = [], success1 = 0, error1 = 0,successUpdateNum=0
        if (this.key1 == '全部') {
          // this.stage = 1
          // for (let i = 0; i < this.areaName.length; i++) {
          //   if (this.areaName[i] == '全部') {
          //     continue
          //   }
          //   console.log("this.dataObj",this.dataObj);
          //   area.push(this.areaName[i])
          //   success.push(this.dataObj[this.areaName[i]].success)
          //   success1 += parseInt(this.dataObj[this.areaName[i]].success)
          //   error.push(this.dataObj[this.areaName[i]].error)
          //   error1 += parseInt(this.dataObj[this.areaName[i]].error)
          //   successUpdateNum+=parseInt(this.dataObj[this.areaName[i]].successUpdate)
          //   this.optionBar1.xAxis[0].data = area
          //   this.optionBar1.series[0].data = success
          //   this.optionBar1.series[1].data = error
          //   this.bar2.setOption(this.optionBar1)
          //   this.success1 = success1
          //   this.error1 = error1
          //   this.successUpdateNum=successUpdateNum


          // }
          // this.showChart(area, this.dataObj)
          // return
          this.getData('')
        } else {
          this.getData(this.dataObj[val].code)
        }
      },
      key3(val) {
        if (val == 0) {
          this.readStage = 1
          let data = this.readList
          console.log("分割");
          console.log(JSON.stringify(data));
          let area = [], success = [], error = [], count1 = 0, count2 = 0
          for (let i = 0; i < data.length; i++) {
            area.push(data[i].deptName)
            success.push(data[i].notUpload)
            count1 += data[i].notUpload
            error.push(data[i].uploadFault)
            count2 += data[i].uploadFault
          }
          this.count1 = count1
          this.count2 = count2
          this.optionBar3.xAxis[0].data = area
          this.optionBar3.series[0].data = success
          this.optionBar3.series[1].data = error
          this.bar3.clear()
          this.bar3.setOption(this.optionBar3)
        } else {
          this.getRead(val)
        }
      },

    }
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
