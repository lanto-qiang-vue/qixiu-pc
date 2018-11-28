<template>
  <div class="footer">
    <div class="footer_in">
      <div class="footer_l">
        <p class="yqlj">
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
        <p>copyright© 2018 上海蓝速汽车技术有限公司 All rights reserved. 沪ICP备17039665号-1.
          <span> 沪公网安备 310000039060-18001. </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "common-footer"
	}
</script>

<style scoped>
  .footer{
    width: 100%;
    border-top: 2px solid #4ba7f5;
    padding: 20px 0;
    text-align: center;
    color: #666666;
    min-width: 800px;
  }

  .footer_in{

    margin: 0 auto;
    position: relative;

  }


  .yqlj a{
    margin: 0 5px;
  }

  .footer p{
    margin-top: 18px;
    font-size: 14px;
  }

  .footer p a{
    color: #666666;
  }

</style>
