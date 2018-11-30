<template>
<basic-container>
  <div class="single-page">
    <div class="center">
      <div style="background:url('/img/garage-info/about_bg.jpg');width:100%;height:auto;">
        <div class="info">
          <h1>上海市机动车维修公共服务平台</h1>
          <div></div>
          <p>上海市机动车维修公共服务网（平台）为本市机动车维修行业政府管理部门确定的公共管理和公共服务民生实事信息化建设项目，旨在服务人民群众的美好汽车生活和行业向现代服务业发展，是为人民群众、行业企业提供机动车维修服务及相关产业服务的本市机动车维修行业唯一权威的电子信息平台。网站建设、服务方针为：为民、便民、利民。
          </p>
          <p>网站由车主服务中心板块、汽修企业服务中心板块、汽修相关产业服务中心板块、政务服务中心板块、协会服务中心板块、公众监督板块、商务服务中心板块和大数据服务中心板块等八个板块功能组成，具体在网站上以公共服务、公共管理、协会治理、公共监督、商务广告和在线商务等功能栏目体现。网站在中国互联网上注册的域名为：www.shanghaiqixiu.org，配套有管理内网和手机APP、公众微信号（手机APP和公众微信号名称为上海汽修平台）。
          </p>
          <p>上海蓝速汽车技术有限公司是专注于汽车相关市场的专业性的科技公司。公司从技术层面融入汽车产业相关的数据云端交互、数据应用开发及数据管理等大数据使用场景，为汽车销售、维修、保养等相关业务提供平台支持和大数据支撑，助力汽车产业相关企业的数字化创新。为车主的美好汽车生活提供多元、高效、便捷的创新型平台。
          </p>
        </div>
        <div class="msg">
          <img src="/img/garage-info/about_msg.jpg">
          <div class="">
            <i></i>
            <p>公司地址：上海市长宁区淞虹路207号明基商务广场C座</p>
            <p>服务热线：400-663-8210 </p>
            <p>邮箱：contact@lantoev.com</p>
          </div>
        </div>
      <!--<div style="position: absolute;top:50%;left:50%;margin-left:-420px;margin-top:-140px;">-->
        <!--<div style="float:left;"><img src="/img/garage-info/about_msg.jpg" width="600"/></div>-->
        <!--<div style="float:left;font-size:18px;">-->
          <!--<div style="line-height:50px;padding:30px 0 0 20px;">请使用以下方式联系我们：</div>-->
          <!--<div style="line-height:50px;padding-left:20px;">服务热线：400-663-8210</div>-->
          <!--<div style="line-height:50px;padding-left:20px;">邮箱：contact@lantoev.com</div>-->
        <!--</div>-->
      <!--</div>-->
      </div>
    </div>
  </div>
</basic-container>
</template>

<script>
  import BasicContainer from '~/components/basic-container.vue'
  export default {
    name: 'partner',
    layout: 'layout-root',
    components: {
      BasicContainer
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
.info {
    margin:0 auto;
    width: 800px;
    padding: 10px;
    margin-bottom: 35px;
  }
.info h1 {
  font-size: 30px;
}
.info p {
  line-height: 26px;
  margin-top: 15px;
  font-size: 14px;
  text-align: justify;
  text-indent: 2em;
}
.msg {
  width: 800px;
  height: 250px;
  margin: 0 auto;
  padding: 10px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
.msg img {
  width: 50%;
}
.msg div {
  width: 50%;
  padding-left: 30px;
  line-height: 30px;
}
.msg div i {
  width: 50px;
  border-bottom: 2px solid #4ea9f0;
  display: block;
  margin-bottom: 10px;
}
</style>
