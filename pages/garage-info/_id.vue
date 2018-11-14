<template>
<div style="background-color: #f5f7f9;text-align: center;padding: 10px;">
  <div class="common-content">
    <div class="sub-title">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>维修企业详情</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="garage-info">
      <!--head? -->
      <div class="head">
        <!--<div class="left">-->
            <h1>{{ info.companyName }}<span id="status">{{info.status}}</span></h1>
            <div class="icon"><img src="/img/garage-info/营业执照.png"><img src="/img/garage-info/认证.png"></div>
            <div class="address"><span>{{info.companyAddress}}</span><a >导航地图</a></div>
            <div class="tel"><span>{{info.companyTel}}</span></div>
            <div class="button"><a >上门服务</a><a >预约服务</a></div>
        <!--</div>-->
        

        <div class="right" v-show="info.avgCompany">
          <div class="point"><span>{{info.avgCompany}}</span>分</div>
          <div class="avg"><span id="average"></span>低于同类平均水平</div>
          <div class="star">
            <img src="/img/garage-info/yellow.png" v-for="i in parseInt(info.avgCompany)" :key="i">
          </div>
        </div>
      </div>
      <div class="info">
        <h1>企业档案</h1>
        <div class="block">
          <p class="p1">企业性质：<span>{{info.companyProperty}}</span></p>
          <p class="p1">行业信誉评级：<span>{{info.crediRating}}</span></p>
          <p class="p1">评分：<span>{{info.avgCompany?info.avgCompany:'暂无'}}</span></p>
        </div>
        <div class="block">
          <label>企业认证</label>
          <ul></ul>
        </div>
        <div class="block">
          <label>服务支持</label>
          <ul>
            <!--<li  v-for="item in info.serveSupports" >{{item}}</li>-->
          </ul>
        </div>
        <div class="block">
          <label>服务优势</label>
          <ul>
            <li>{{info.servePreponderance}}</li>
          </ul>
        </div>
      </div>
      <div class="appraise">
        <h1>服务评价</h1>
        <!--<div class="tag">
          <ul>
            <li  v-for="item in info.companyShowWors">{{item}}</li>
          </ul>
          <span>共<em id="number"></em>条评价</span>
        </div>-->
        <div class="stars">
          <span>履约情况 <i v-html="getStars(info.avgKeepAppointment)"></i>
            <em>{{ getGrade(info.avgKeepAppointment)}}</em></span>
          <span>服务态度 <i v-html="getStars(info.avgStatus)"></i>
            <em>{{ getGrade(info.avgStatus)}}</em></span>
          <span>维修质量 <i v-html="getStars(info.avgQuality)"></i>
            <em>{{ getGrade(info.avgQuality)}}</em></span>
          <span>维修速度 <i v-html="getStars(info.avgSpeed)"></i>
            <em>{{ getGrade(info.avgSpeed)}}</em></span>
          <span>维修价格 <i v-html="getStars(info.avgPrice)"></i>
            <em>{{ getGrade(info.avgPrice)}}</em></span>
        </div>
        <ul id="list">
        </ul>
        <div id="pagebar">
          
          <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page" :showOperate=false :showSearch=false >
          </common-table>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
const pkg = require('../../package')
export default {
  name: "garage-info",
  layout: 'common',
  components: {
      CommonTable,
      
    },
  validate ({ app, params, store }) {
    return params.id? true: false
  },
  // asyncData ({ app, params, error }) {
  //   return app.$axios({
  //     baseURL: 'http://127.0.0.1:'+ pkg.config.nuxt.port+'/repair',
  //     url: '/micro/search/company/repair/'+ params.id,
  //     method: 'get',
  //   }).then((res) => {
  //     return {
  //       info: res.data
  //     }
  //   }, (err)=>{
  //     console.log(err)
  //     // if(process.client)
  //     console.log('err:', err.response.data)
  //     return {
  //       info: {},
  //       error: err.response.data
  //     }
  //   });
  // },
  data(){
    return{
      info: {
        companyShowWors:[],
        serveSupports:[],
        status:'营业',
        avgCompany:'3',
        companyName:'上海汽修',
        companyAddress:'明基广场',
        companyTel:'021-1234567',

        companyProperty:'二类维修企业',
        crediRating:'未考核',

        servePreponderance:'',
        avgKeepAppointment:2,
        avgStatus:2,
        avgQuality:2,
        avgSpeed:2,
        avgPrice:2,

      },
      columns: [
          
          {title: '车友', key: 'corpName', sortable: true, minWidth: 120,
          },
          {title: '点评日期', key: 'licence', sortable: true, minWidth: 120},
          {title: '评分', key: 'businessAddress', sortable: true, minWidth: 135},
          {title: '评分详情', key: 'scopes', sortable: true, minWidth: 120},
        ],
        tableData: [],
        page: 0,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
      error: null
    }
  },
  mounted(){
    this.$axios({
      baseURL: '/repair',
      url: '/micro/search/company/repair/'+ this.$route.params.id,
      method: 'get',
    });

    
  },
  methods:{
    getStars( val) {
      let star=''
      for(let i=0; i<5; i++){
        if(i < parseInt(val))
          star+='<img style="width: 15px;"  src="/img/garage-info/yellow.png"/>'
        else
          star+='<img style="width: 15px;"  src="/img/garage-info/gray.png"/>'
      }
      return star
    },
    getGrade(val){
      return val ?val.toFixed(1):0
    },
    changePage(page){
          this.page= page
          this.getList()
        },
        changePageSize(size){
          this.limit= size
          this.getList()
        },
        onRowClick( row, index){
            console.log('row：',row);
            this.detailData=row
        },
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          this.page=1;
          this.getList();
        },

      getList(){
        console.log('开始进行');
        this.$axios.get('/comment/maintain/query/companyId?size='+this.limit+'&page='+this.page+'&companyId=1196', {
        }).then( (res) => {
          console.log(res);
          if(res.status===200){
              this.tableData=res.data.content;
              this.total=res.data.totalElements;

          }else{

            this.$Message.error(res.statusText);
          }
          
        })
    },
  }
}
</script>

<style scoped lang="less">
  .common-content{
    display: inline-block;
    text-align: left;
    width: 100%;
    max-width: 1000px;
    min-width: 800px;
    min-height: 70vh;
    background-color: white;
    .sub-title{
      line-height: 38px;
      padding: 0 10px;
      background-color: white;
      border-bottom: 2px solid #4ba7f5;
    }
    >div:not(.sub-title){
      min-height: calc(100% - 40px);
      overflow: hidden;
      background-color: white;
    }

    .garage-info{
      padding:0 10px;
      .head{
        padding:20px 12px;
            position: relative;
            font-size: 14px;
            border-bottom: 1px dashed #eeeeee;
        /*overflow: hidden;*/


        h1{
          font-size: 26px;
              display: flex;
            align-items: center;
            span{
                  font-size: 12px;
                  color: white;
                  padding: 3px 10px;
                  margin-left: 10px;
                  background-color: rgb(0, 204, 153);
            }
        }
        .icon{
            display: inline-block;
            overflow: hidden;
            img {
                margin-right: 5px;
            }
        }
        .address{
           a{
              margin-left: 10px;
              padding-left: 15px;
              background: url(/statics/img/maintain/导航.png) no-repeat left center;
              /* background-size: 12px auto; */
              color: #4ba6f5;
          }
          span{
            padding-left: 15px;
            background: url(/statics/img/maintain/map.png) no-repeat left center;
            /* background-size: 12px auto; */
          }
        }
        .tel {
            padding-left: 15px;
            background: url(/statics/img/maintain/phone.png) no-repeat left center;
            span {
                margin-right: 10px;
            }
        }
        .button{
          a{
              height: 30px;
              line-height: 30px;
              padding: 0 20px;
              background-color: #4ba6f5;
              color: white;
              border-radius: 5px;
              margin-right: 10px;
              display: inline-block;
          }
        }
        .right{
          /*float: right;*/
              width: 150px;
              height: 100px;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              margin: auto 0;
              text-align: center;
              padding-top: 10px;
              .point{
                color: #4ba6f5;
                /*font-weight: 800;*/
                display: flex;
                align-items: flex-end;
                justify-content: center;
                font-size: 30px;
                margin-bottom: 5px;
                span{
                  font-size: 50px;
                  line-height: 50px;
                  margin-right: 5px;
                }
              }

              .avg {
                  margin-bottom: 5px;
              }
              
              .star{
                img{
                  width: 20px;
                }
              }
          
        }
      }
      
      .info{
        padding:20px 12px;
        border-bottom: 1px dashed #eeeeee;
        h1{
          font-size: 20px;
        }
        .block{
          margin-top: 20px;
          overflow: hidden;
          .p1{
            font-size: 16px;
            float:left;
            padding-right:20px;
            span{
              font-size: 14px;
              color: red;
            }
          }
        }
      }

      .appraise{
        h1{
          font-size: 20px;
          padding:20px 12px;
        }
        .stars{
              margin-top: 20px;
              padding:0 12px;
          span{
                font-size: 16px;
                margin-right: 20px;
                white-space: nowrap;
                display: inline-block;
                margin-bottom: 5px;
            i{
              white-space: nowrap;
              margin: 0 10px;
              
            }
            
          }
        }
      }
    }
    
    
  }
  
</style>
