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
      <h1 class="dtitle">未读通知</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="notifyColumns" :data="notifyData" ref="table2"
                 stripe border></Table>
        </div>
      </div>

    </div>

    <div class="dblock">
      <h1 class="dtitle">区域对接状况</h1>
      <div class="center">
        <div class="inline-box">
          <div id="bar1" style="width: 800px;height: 350px"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { formatDate } from '~/static/tools.js'
	export default {
		name: "company-home",
    head () {
      return {
        script: [
          { type: 'text/javascript', src: "/libs/echarts.common.min.js"},
        ],
      }
    },
    data(){
      return{
        infoColumns: [
          {title: '业户名称', key: 'companyName',  minWidth: 100,},
          {title: '许可证号', key: 'license',  minWidth: 100,},
          {title: '注册地址', key: 'companyAddress',  minWidth: 100},
          {title: '经营范围', key: 'companyBusinessScope',  minWidth: 100},
        ],
        notifyColumns: [
          {title: '通知标题', key: 'title',  minWidth: 100,},
          {title: '通知内容', key: 'content',  minWidth: 100,
            render: (h, params) => h('span', JSON.parse(params.row.content).content )
          },
          {title: '通知发送人', key: 'companyaddress',  minWidth: 100},
          {title: '通知日期', key: 'sendtime',  minWidth: 100,
            render: (h, params) => h('span', formatDate(params.row.sendtime, 'yyyy-MM-dd hh:mm:ss'))
          },
        ],
        infoData: [],
        notifyData: []
      }
		},
    mounted(){
      this.$axios.$post('/company/repaircompany/detailInfo',{}).then( (res) => {
        if(res.code== '0') this.infoData= [res.item]
      })


      let bar1 = echarts.init(document.getElementById('bar1'));

      let option = {
          color: ['#6eb4f2'],
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
                  data : ['2017/10/12', '2017/10/13', '2017/10/14', '2017/10/15', '2017/10/16', '2017/10/17', '2017/10/18'],
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
                  name:'上传数',
                  type:'bar',
                  data:[4, 3, 4, 2, 3, 5, 1]
              }
          ]
      };

      bar1.setOption(option);
    },
    methods:{

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
      }
    }
  }
</style>
