<template>
<div class="icon-block" ref="thisBlock" v-show="show" :style="{left: left+'px'}">
  <div class="block" v-show="type==1">
    <nuxt-link tag="a" to="/center/my-car-record"><img src="/img/menu-icon/爱车档案.png"/><p>爱车档案</p></nuxt-link>
    <nuxt-link tag="a" to="/service-map"><img src="/img/menu-icon/维修服务查选.png"/><p>维修服务查选</p></nuxt-link>
    <nuxt-link tag="a" to="/cdf"><img src="/img/menu-icon/车大夫门诊.png"/><p>车大夫门诊</p></nuxt-link>
    <nuxt-link tag="a" to="/service-map"><img src="/img/menu-icon/上门服务.png"/><p>上门服务</p></nuxt-link>
    <nuxt-link tag="a" to="/service-map"><img src="/img/menu-icon/预约服务.png"/><p>预约服务</p></nuxt-link>
    <!--<nuxt-link tag="a" to="/service-map?type=213"><img src="/img/menu-icon/道路救援.png"/><p>道路救援</p></nuxt-link>-->
    <nuxt-link tag="a" to="/article/insure"><img src="/img/menu-icon/车辆保险.png"/><p>车辆保险</p></nuxt-link>
    <nuxt-link tag="a" to="/service-map?type=166"><img src="/img/menu-icon/检测站.png"/><p>综合检测站</p></nuxt-link>
    <nuxt-link tag="a" to="/service-map?type=214"><img src="/img/menu-icon/危运车辆维修.png"/><p>危运车辆维修</p></nuxt-link>
    <nuxt-link tag="a" to="/service-map?type=215"><img src="/img/menu-icon/新能源汽车维修.png"/><p>新能源汽车维修</p></nuxt-link>
    <nuxt-link tag="a" to="/article/help"><img src="/img/menu-icon/道路救援.png"/><p>施救牵引企业</p></nuxt-link>
    <!--<nuxt-link tag="a" to="/guild-article/10281034" ><img src="/img/menu-icon/推介服务.png"/><p>推介服务</p></nuxt-link>-->
     <a href="/file/tips.pdf" ><img src="/img/menu-icon/行业概况.png"/><p>爱车小贴士</p></a>
    <nuxt-link tag="a" to="/service-map?type=300" ><img src="/img/menu-icon/学车找我.png"/><p>学车找我</p></nuxt-link>
    <nuxt-link tag="a" to="/parking" ><img src="/img/menu-icon/停车找我.png"/><p>停车找我</p></nuxt-link>
  </div>
  <div class="block" v-show="type==2">
    <a href="http://hxx.hoxiuxiu.com" ><img src="/img/menu-icon/门店管理.png"/><p>门店管理</p></a>
    <nuxt-link tag="a" to="/center/repored"><img src="/img/menu-icon/电子健康档案上传情况.png"/><p>维修记录</p></nuxt-link>
    <nuxt-link tag="a" to="/center/company-repair-qualify"><img src="/img/menu-icon/维修合格证.png"/><p>维修合格证</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281005"><img src="/img/menu-icon/开业停业咨询.png"/><p>开业停业咨询</p></nuxt-link>
    <nuxt-link tag="a" to="/article/parts" ><img src="/img/menu-icon/配件需求.png"/><p>配件需求</p></nuxt-link>
    <nuxt-link tag="a" to="/article/equip"><img src="/img/menu-icon/汽保设备需求.png"/><p>汽保设备需求</p></nuxt-link>
    <nuxt-link tag="a" to="/cdf"><img src="/img/menu-icon/技术信息.png"/><p>技术需求</p></nuxt-link>
  </div>
  <div class="block" v-show="type==3">
    <nuxt-link tag="a" to="/center/record-company"><img src="/img/menu-icon/电子健康档案.png"/><p>电子健康档案</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281001" ><img src="/img/menu-icon/法律法规.png"/><p>法律法规</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281002" ><img src="/img/menu-icon/管理规范.png"/><p>管理规范</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281003" ><img src="/img/menu-icon/行业政策.png"/><p>行业政策</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281004" ><img src="/img/menu-icon/技术标准.png"/><p>技术标准</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281005" ><img src="/img/menu-icon/办事指南.png"/><p>办事指南</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281006" ><img src="/img/menu-icon/管理职责.png"/><p>管理职责</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281007" ><img src="/img/menu-icon/行业概况.png"/><p>行业概况</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281010" ><img src="/img/menu-icon/行业文明建设.png"/><p>行业文明建设</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281009" ><img src="/img/menu-icon/优质企业.png"/><p>优质企业</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281017" ><img src="/img/menu-icon/违法违规公告.png"/><p>违法违规公告</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281016" ><img src="/img/menu-icon/质量信誉考核.png"/><p>质量信誉考核</p></nuxt-link>
  </div>
  <div class="block" v-show="type==4">
    <nuxt-link tag="a" to="/article/accessoriesUnit" ><img src="/img/menu-icon/汽车配件.png"/><p>汽车配件</p></nuxt-link>
    <nuxt-link tag="a" to="/center/staff-query"><img src="/img/menu-icon/人才需求.png"/><p>人才需求</p></nuxt-link>
    <nuxt-link tag="a" to="/gov-article/10281030" ><img src="/img/menu-icon/相关培训.png"/><p>相关培训</p></nuxt-link>
    <nuxt-link tag="a" to="/partner" ><img src="/img/menu-icon/商务合作.png"/><p>商务合作</p></nuxt-link>
    <nuxt-link tag="a" to="/partner" ><img src="/img/menu-icon/数据需求.png"/><p>数据需求</p></nuxt-link>
    <nuxt-link tag="a" to="/article/books" ><img src="/img/menu-icon/汽车读物.png"/><p>汽车读物</p></nuxt-link>
    <nuxt-link tag="a" to="/article/insure"><img src="/img/menu-icon/汽车保险.png"/><p>汽车保险</p></nuxt-link>
    <nuxt-link tag="a" to="/article/consum" ><img src="/img/menu-icon/汽车用品.png"/><p>汽车用品</p></nuxt-link>
    <nuxt-link tag="a" to="/article/equip" ><img src="/img/menu-icon/汽保设备.png"/><p>汽保设备</p></nuxt-link>
    <nuxt-link tag="a" to="/guild-article/10281032" ><img src="/img/menu-icon/汽车销售.png"/><p>汽车销售</p></nuxt-link>
  </div>
  <div class="block" v-show="type==5">
    <nuxt-link tag="a" to="/article/summary"><img src="/img/menu-icon/协会简介.png"/><p>协会简介</p></nuxt-link>
    <nuxt-link tag="a" to="/guild-article/10281023/212"><img src="/img/menu-icon/协会职能.png"/><p>协会职能</p></nuxt-link>
    <nuxt-link tag="a" to="/guild-article/10281013" ><img src="/img/menu-icon/工作动态.png"/><p>工作动态</p></nuxt-link>
    <nuxt-link tag="a" to="/guild-article/10281014" ><img src="/img/menu-icon/行业风采.png"/><p>行业风采</p></nuxt-link>
    <nuxt-link tag="a" to="/guild-article/10281008" ><img src="/img/menu-icon/行业能手.png"/><p>行业能手</p></nuxt-link>
    <nuxt-link tag="a" to="/guild-article/10281015" ><img src="/img/menu-icon/行业党建.png"/><p>行业党建</p></nuxt-link>
    <nuxt-link tag="a" to="guild-article/10281024" ><img src="/img/menu-icon/专家组.png" /><p>专家组</p></nuxt-link>
  </div>
  <div class="block" v-show="type==6">
    <nuxt-link tag="a" to="/gov-article/10281030" ><img src="/img/menu-icon/培训需求.png"/><p>培训需求</p></nuxt-link>
  </div>
  <div class="block" v-show="type==7">
    <nuxt-link tag="a" to="/guild-article/10281033" ><img src="/img/menu-icon/满意度调查.png"/><p>满意度调查</p></nuxt-link>
    <nuxt-link tag="a" to="/feedback" ><img src="/img/menu-icon/维修投诉.png"/><p>维修反馈</p></nuxt-link>
  </div>
  <div class="block" v-show="type==8">
    <nuxt-link tag="a" to="/partner" ><img src="/img/menu-icon/在线商务.png"/><p>在线商务</p></nuxt-link>
    <nuxt-link tag="a" to="/partner" ><img src="/img/menu-icon/商务合作.png"/><p>商务合作</p></nuxt-link>
  </div>
  <div class="block" v-show="type==9">
    <nuxt-link tag="a" to="/partner" ><img src="/img/menu-icon/二手车市场.png"/><p>二手车服务</p></nuxt-link>
    <nuxt-link tag="a" to="/partner" ><img src="/img/menu-icon/车辆保险.png"/><p>保险数据服务</p></nuxt-link>
  </div>
</div>
</template>
<script>
	export default {
		name: "icon-block",
    props: ['type', 'left', 'show'],
	}
</script>

<style scoped lang="less">
.icon-block{
  background-color: white;
  position: absolute;
  width: 360px;
  min-height: 410px;
  top: 0;
  z-index: 50;
  box-shadow: 0 0 3px #f3f3f3;
  border-left: 1px solid #f3f3f3;
  padding: 20px 20px 0 20px;
  overflow: hidden;
  a{
    display: block;
    width: 33%;
    height: 70px;
    text-align: center;
    float: left;
    margin-bottom: 30px;
    cursor: pointer;
    color: black;
    line-height: normal;
    img{
      width: 36px;
      height: 36px;
    }
    p{
      margin-top: 10px;
      font-size: 14px;
      line-height: normal;
    }
  }
  a:hover{
    color: #4285f4;
  }
}
.icon-block:hover{
  display: block;
}
</style>
<style lang="less">

</style>
