<template>
<div class="footer">
    <div class="content" v-if="areaName=='shanghai'">
      <p class="link">
        友情链接：<a href="http://www.mot.gov.cn/" target="_Blank">中华人民共和国交通运输部</a>
        |
        <a href="http://www.jt.sh.cn" target="_Blank">上海交通网</a>
        |
        <a href="http://www.shygc.net" target="_Blank">上海市城市交通运输管理处</a>
        |
        <a href="http://www.shjtzf.com/" target="_Blank">上海市交通委执法总队</a>
        |
        <a href="http://www.hoxiuxiu.com/" target="_Blank">好修修</a>
      </p>
      <p class="copyright">
        copyright© 2019 上海蓝速汽车技术有限公司 All rights reserved. 沪ICP备17039665号-1.
        <span> 沪公网安备 310000039060-18001. </span>
      </p>
    </div>

  <div class="content" v-if="areaName=='shandong'">
    <p class="link">
      指导部门：<a >山东省交通运输厅</a>
    </p>
    <p class="copyright">
      copyright &#169 2019 山东中交车服网络科技有限公司. All Rights Reserved. | 鲁ICP备18044033号-1
    </p>
  </div>
</div>
</template>

<script>
	export default {
		name: "common-footer",
    computed:{
      areaName(){
        return process.env.config.areaName
      },
    },
    mounted(){
    }
	}
</script>

<style scoped lang="less">
  .footer{
    width: 100%;
    border-top: 2px solid #4ba7f5;
    padding: 30px 0;
    text-align: center;
    color: #666666;
    min-width: 800px;
    font-size: 14px;
    .link a{
      margin: 0 5px;
      /*font-weight: 600;*/
      color: #333333;
    }
    .copyright{
      margin-top: 20px;
    }
  }

</style>
