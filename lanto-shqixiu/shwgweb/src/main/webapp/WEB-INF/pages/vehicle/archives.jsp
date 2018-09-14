<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<link rel="stylesheet" href="${btx}/js/raty/demo/css/application.css" />
<script src="${btx}/js/raty/lib/jquery.raty.min.js"></script>
<c:if test="${loginInfo.userType == 0 }">
<script src="${btx}/js/front/archives.js"></script>
</c:if>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<div class="zhengwu_l">
    	<div class="zhengwu">电子健康档案</div>
        <ul class="zheng_ul">
        	<li class="dangqiande"><a href="${ctx}/archives">电子健康档案</a></li>
        <!--  	<li><a href="">修改密码</a></li> -->
        </ul>
    </div>
    <span id="toSelect" style="display:none;">${toSelect }</span>
	<div class="zhengwu_r">
    	<div class="zhengwu_t">
        	<span class="sp_zw">电子健康档案</span>
            <span class="sp_wz">您所在位置：<a href="${ctx}/index">首页</a> > <span>电子健康档案</span></span>
        </div>
        <c:choose>
			<c:when test="${loginInfo.userType == 0 }">
		        <div class="archives_t">
		        	<span id="bang"></span>
		        	<!--  <span id="dangan"></span>-->
		        </div>
		        <div class="layui-form">
			        <table class="bgys">
			            <tr>
			                <th>车牌号码</th>
			              <!--    <th>车牌颜色</th>  -->
			                <th>VIN</th>
			                <th>发动机号</th>
			                <th>操作</th>
			            </tr>
			            <tbody id="tbbody"></tbody>
					</table>
				</div>
		        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
			</c:when>
			<c:otherwise>
				<div style="padding:30px 0px;text-align:center;">请 <a href="javascript:toLogin();" style="color:red;">登录/注册</a> 成为个人用户后查看电子健康档案</div>
			</c:otherwise>
		</c:choose>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
	layui.use('form', function(){
	  var $ = layui.jquery, form = layui.form();

	  //全选
	  form.on('checkbox(allChoose)', function(data){
	    var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
	    child.each(function(index, item){
	      item.checked = data.elem.checked;
	    });
	    form.render('checkbox');
	  });

	});

	var datas = ${datas};


</script>
</html>
