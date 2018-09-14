<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>

<div class="Government industry">
	<div class="zhengwu_l">
		<div class="zhengwu">协会治理</div>
		<ul class="zheng_ul">
			<li class="${type=='summary'?'dangqiande':'' }"><a
					href="${ctx}/assoinfo/summary">协会简介</a></li>
			<li class="${type=='function'?'dangqiande':'' }"><a
					href="${ctx}/assoinfo/function">协会职能</a></li>
			<li class="${type=='10281013'?'dangqiande':'' }"><a
					href="${ctx}/industry/10281013">工作动态</a></li>
			<li class="${type=='10281014'?'dangqiande':'' }"><a
					href="${ctx}/industry/10281014">行业风采</a></li>
			<li class="${type=='10281015'?'dangqiande':'' }"><a
					href="${ctx}/industry/10281015">行业党建</a></li>
			<li class="${type=='10281008'?'dangqiande':'' }">
				<a href="${ctx}/industry/10281008">行业能手</a></li>
			<li class="${type=='specialist'?'dangqiande':'' }"><a
					href="${ctx}/specialist">专家组</a></li>
		</ul>
	</div>
	<div class="zhengwu_r" >
		<div class="zhengwu_t">
			<span class="sp_zw">${typeName }</span> <span class="sp_wz"><a
				href="">首页</a> > <span>协会治理</span> > <span>${typeName }</span></span>
		</div>
		<div class="zhuanjia" style="height: auto">

			<p style="line-height: 2em; text-align: center;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><br/></span>
			</p>
			<p style="line-height: 2em; text-align: center;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 24px;">专家名录</span>
			</p>
			<p style="line-height: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><br/></span>
			</p>
			<div class="jianjie" style="height:100%;overflow: auto;border: 0" >
				<div class="jianjie_b" style="text-align: center">
					<c:forEach items="${detailList}" var="item">
						<div id="${item.name}" style="overflow: hidden;display: inline-block;width: 70%;text-align: left;margin-bottom: 20px">
							<div  class="img">
								<img src="${item.photo }" width="127" height="127" alt="">
								<span>专家认证</span>
							</div>
							<ul>
								<li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</span>${item.name }</li>
								<li><span>职&nbsp;&nbsp;&nbsp;&nbsp;称：</span>${item.professor }</li>
								<li><span>就职企业：</span>${item.empUnit }</li>
								<li><span>专业擅长：</span>${item.goodAt }</li>
								<li><span>主要荣誉：</span>${item.honor }</li>
							</ul>
						</div>
					</c:forEach >
				</div>
			</div>
			<p>
				<br/>
			</p>
		</div>
	</div>
</div>

<script>
$(function () {
//    console.log(window.location.hash)
    var id= decodeURI(window.location.hash)
	console.log(id)
    if($(id)){
        console.log($(id).offset().top)
        $(window).scrollTop($(id).offset().top)
    }

})
</script>
<script src="${btx}/js/front/sepcialist.js"></script>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>


</html>
