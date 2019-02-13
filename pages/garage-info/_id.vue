<template>
<basic-container>
<div style="background-color: #f5f7f9;text-align: center;padding: 10px;">
  <div class="common-content">
    <div class="sub-title">
      <Breadcrumb>
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem to="/service-map">维修查选</BreadcrumbItem>
        <BreadcrumbItem>维修企业详情</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="garage-info">
      <!--head? -->
      <div class="head">
        <!--<div class="left">-->
            <h1>{{ info.name }}<span id="status">{{getStatus(info.status)}}</span></h1>
            <div class="icon"><img src="/img/garage-info/business.png"><img src="/img/garage-info/certification.png"></div>
            <div class="address"><span>{{info.addr}}</span><nuxt-link tag="a" :to="'/service-map?type=164&q='+info.name">导航地图</nuxt-link></div>
            <div class="tel" v-show="info.tel"><span>{{info.tel}}</span></div>
            <div class="button">
              <nuxt-link tag="a" :to="'/visit-service/?id='+$route.params.id">上门服务</nuxt-link>
              <nuxt-link tag="a" :to="'/appointment/?id='+$route.params.id+'&name='+info.name">预约服务</nuxt-link>
            </div>
        <!--</div>-->


        <div class="right" v-show="info.rating">
          <div class="point"><span>{{info.rating}}</span>分</div>
          <div class="avg"><span id="average"></span>{{parseFloat(info.rating)>3?'高':'低'}}于同类平均水平</div>
          <div class="star" v-if="info.rating">
            <img src="/img/garage-info/yellow.png"  v-for="i in parseInt(info.rating)" :key="i">
          </div>
        </div>
      </div>
      <div class="info">
        <h1>企业档案</h1>
        <div class="block">
          <p class="p1">企业性质：<span>{{info.bizScope}}</span></p>
          <p class="p2">行业信誉评级：<span>{{info.grade}}</span></p>
          <p class="p3">评分：<span>{{info.rating?info.rating:'暂无'}}</span></p>
        </div>
        <div class="block" v-show="false">
          <label>企业认证</label>
          <ul></ul>
        </div>
        <div class="block" v-show="info.serveSupports">
          <label>服务支持</label>
          <ul>
            <li v-if="info.serveSupports" v-for="item in info.serveSupports" :key="item">{{item}}</li>
          </ul>
        </div>
        <div class="block" v-show="info.servePreponderance">
          <label>服务优势</label>
          <ul>
            <li>{{info.servePreponderance}}</li>
          </ul>
        </div>
      </div>
      <div class="appraise" >
        <h1>服务评价</h1>
        <div class="tag">
          <!--<ul>
            <li v-if="info.companyShowWors"  v-for="item in info.companyShowWors">{{item}}</li>
          </ul>
          <span>共<em id="number">{{total}}</em>条评价</span>-->
        </div>
        <div class="stars">
          <span>履约情况 <i v-html="getStars(info.keepApp)"></i>
            <em>{{ getGrade(info.keepApp)}}</em></span>
          <span>服务态度 <i v-html="getStars(info.attitude)"></i>
            <em>{{ getGrade(info.attitude)}}</em></span>
          <span>维修质量 <i v-html="getStars(info.quality)"></i>
            <em>{{ getGrade(info.quality)}}</em></span>
          <span>维修速度 <i v-html="getStars(info.speed)"></i>
            <em>{{ getGrade(info.speed)}}</em></span>
          <span>维修价格 <i v-html="getStars(info.price)"></i>
            <em>{{ getGrade(info.price)}}</em></span>
        </div>

        <ul id="list">
          <li v-for="item in tableData">
            <div class="left">
              <img :src="item.photo">
            </div>
            <div class="right">
                <p class="black">
                  <span>车友：{{item.vehicleNum}}</span>
                  <span>点评日期：{{item.createDate}}</span>
                  <span>评分：{{item.userAvgScore}}</span>
                </p>
                <p class="gray">评分详情：
                  <span>履约：{{item.keepAppointment}}</span>
                  <span>态度：{{item.attitude}}</span>
                  <span>质量：{{item.quality}}</span>
                  <span>速度：{{item.speed}}</span>
                  <span>价格：{{item.price}}</span>
                </p>
            </div>
          </li>
        </ul>

        <div id="pagebar">

         <Page :current="page" :page-size="10" show-sizer show-elevator show-total :page-size-opts="[10, 20, 50]"
                placement="top" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"/>
        </div>
      </div>

    </div>
  </div>
</div>
</basic-container>
</template>

<script>
import BasicContainer from '~/components/basic-container.vue'
import CommonTable from '~/components/common-table.vue'
import config from '../../config.js'
export default {
  name: "garage-info",
  layout: 'layout-root',
  components: {
    CommonTable,
    BasicContainer
  },
  validate ({ app, params, store }) {
    return params.id? true: false
  },
  asyncData ({ app, params, error }) {
    let  baseURL= 'http://127.0.0.1:'+config.port+'/repair'
    if(process.client)  baseURL= window.location.origin +'/repair'
    return app.$axios({
      baseURL: baseURL,
      url: '/micro/search/company/repair/'+ params.id,
      method: 'get',
    }).then((res) => {
      // console.log(res)
      return {
        info: res.data
      }
    }, (err)=>{
      // console.log(err)
      // if(process.client)
      // console.log('err:', err.response.data)
      return {
        info: {},
        error: err.response? err.response.data: 'err'
      }
    });
  },
  data(){
    return{
      info: {
        companyShowWors:[],
        serveSupports:[],
        status:'',
        rating:'',
        name:'',
        addr:'',
        tel:'',
        companyProperty:'',
        grade:'',
        servePreponderance:'',
        keepApp:2,
        attitude:2,
        quality:2,
        speed:2,
        price:2,

      },
      columns: [
        {title: '车友', key: 'corpName', sortable: true, minWidth: 120,},

        {title: '点评日期', key: 'licence', sortable: true, minWidth: 120},
        {title: '评分', key: 'businessAddress', sortable: true, minWidth: 135},
        {title: '评分详情', key: 'scopes', sortable: true, minWidth: 120},
      ],
      tableData: [],
      page: 1,
      limit: 10,
      total: 0,
      showTable:false,
      showDetail: false,
      detailData: null,
      clearTableSelect: null,
      error: null,
      isMounted: false
    }
  },
  mounted(){
    // this.$axios({
    //   baseURL: '/repair',
    //   url: '/micro/search/company/repair/'+ this.$route.params.id,
    //   method: 'get',
    // }).then((res) => {
    //   console.log(res.data)
    //     this.info= res.data
    // });

    this.getList();

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
    getStatus(val){
      return val ?'营业':'休息中'
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
        let page=this.page-1;
        this.$axios.get('/comment/maintain/query/companyId?size='+this.limit+'&page='+page+'&companyId='+this.$route.params.id, {
        }).then( (res) => {

          if(res.status===200){
              this.tableData=res.data.content;
              this.total=res.data.totalElements;

          }else{

            // this.$Message.error(res.statusText);
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
    max-width: 1200px;
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
              background: url(/img/garage-info/navigation.png) no-repeat left center;
              /* background-size: 12px auto; */
              color: #4ba6f5;
          }
          span{
            padding-left: 15px;
            background: url(/img/garage-info/map.png) no-repeat left center;
            /* background-size: 12px auto; */
          }
        }
        .tel {
            padding-left: 15px;
            background: url(/img/garage-info/phone.png) no-repeat left center;
            span {
                margin-right: 10px;
            }
        }
        .button{
          padding: 10px 0px;
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

          p {
              padding-left: 15px;
              margin-right: 15px;
              display: inline-block;
          }
          .p1{
            background: url(/img/garage-info/store.png) no-repeat left center;
            font-size: 16px;

            span{
              font-size: 14px;
              color: #ff8327;
            }
          }
          .p2{
            background: url(/img/garage-info/discount.png) no-repeat left center;
            font-size: 16px;

            span{
              font-size: 14px;
              color: #ff8327;
            }
          }
          .p3{
            background: url(/img/garage-info/star.png) no-repeat left center;
            font-size: 16px;

            span{
              font-size: 14px;
              color: #ff8327;
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
        /*评价样式*/
        #list{
          margin-top: 20px;
          li{
            overflow: hidden;
            position: relative;
            margin-bottom: 15px;
            .left{
              position: absolute;
              width: 45px;
              height: 45px;
              border-radius: 100%;
              background-color: #eeeeee;
              overflow: hidden;
              img{
                    width: 100%;
                    height: 100%;
              }
            }
            .right{
              padding-left: 50px;
              p{
                margin: 0;
                padding: 0;
                border: 0;
                list-style: none;
                box-sizing: border-box;
              }
              .black{
                span{
                  margin-right: 20px;
                }
              }
              .gray {
                  margin-top: 5px;
                  color: #a6a6a6;
                  span {
                      margin-right: 15px;
                  }
              }

            }

          }
        }
        /*翻页样式*/
        #pagebar{
          margin: 10px 0;
        }

      }
    }


  }

</style>
