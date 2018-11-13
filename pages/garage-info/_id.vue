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

	<div class="head">
		<h1>{{ info.companyName }}<span id="status"></span></h1>
		<div class="icon"><img src="/img/garage-info/营业执照.png"><img src="/img/garage-info/认证.png"></div>
		<div class="address"><span>{{info.companyAddress}}</span><a >导航地图</a></div>
		<div class="tel"><span>{{info.companyTel}}</span></div>
		<div class="button"><a >上门服务</a><a >预约服务</a></div>
		<div class="right" v-show="info.avgCompany">
			<div class="point"><span>{{info.avgCompany}}</span>分</div>
			<div class="avg"><span id="average"></span>于同类平均水平</div>
			<div class="star">
        <img src="/img/garage-info/yellow.png" v-for="i in parseInt(info.avgCompany)" :key="i">
			</div>
		</div>
	</div>
	<div class="info">
		<h1>企业档案</h1>
		<div class="block">
			<p class="p1">企业性质：<span>{{info.companyProperty}}</span></p><p class="p2">行业信誉评级：<span>{{info.crediRating}}</span></p><p class="p3">评分：<span>{{info.avgCompany?info.avgCompany:'暂无'}}</span></p>
		</div>
		<div class="block">
			<label>企业认证</label>
			<ul></ul>
		</div>
		<div class="block">
			<label>服务支持</label>
			<ul>
				<li v-for="item in info.serveSupports">{{item}}</li>
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
		<div class="tag">
			<ul>
				<li v-for="item in info.companyShowWors">{{item}}</li>
			</ul>
			<span>共<em id="number"></em>条评价</span>
		</div>
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
		<ul id="list"></ul>
		<div id="pagebar"></div>
	</div>

    </div>
  </div>
</div>
</template>

<script>
const pkg = require('../../package')
export default {
  name: "garage-info",
  layout: 'common',
  validate ({ app, params, store }) {
    return params.id? true: false
  },
  asyncData ({ app, params, error }) {
    return app.$axios({
      baseURL: 'http://127.0.0.1:'+ pkg.config.nuxt.port+'/repair',
      url: '/micro/search/company/repair/'+ params.id,
      method: 'get',
    }).then((res) => {
      return {
        info: res.data
      }
    }, (err)=>{
      console.log(err)
      // if(process.client)
      console.log('err:', err.response.data)
      return {
        info: {},
        error: err.response.data
      }
    });
  },
  data(){
    return{
      info: {},
      error: null
    }
  },
  mounted(){
    this.$axios({
      baseURL: '/repair',
      url: '/micro/search/company/repair/'+ this.$route.params.id,
      method: 'get',
    })
  },
  methods:{
    getStars( val) {
      let star=''
      for(let i=0; i<5; i++){
        if(i < parseInt(val))
          star+='<img src="/img/garage-info/yellow.png"/>'
        else
          star+='<img src="/img/garage-info/gray.png"/>'
      }
      return star
    },
    getGrade(val){
      return val ?val.toFixed(1):0
    }
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
  }
</style>
