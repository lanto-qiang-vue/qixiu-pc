<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>

<div class="Government industry page">
	<div class="zhengwu_l">
    	<div class="zhengwu">协会治理</div>
        <ul class="zheng_ul">
        	<li class="${type=='summary'?'dangqiande':'' }"><a href="${ctx}/assoinfo/summary">协会简介</a></li>
        	<li class="${type=='function'?'dangqiande':'' }"><a href="${ctx}/assoinfo/function">协会职能</a></li>
        	<li class="${type=='10281013'?'dangqiande':'' }"><a href="${ctx}/industry/10281013">工作动态</a></li>
        	<li class="${type=='10281014'?'dangqiande':'' }"><a href="${ctx}/industry/10281014">行业风采</a></li>
        	<li class="${type=='10281015'?'dangqiande':'' }"><a href="${ctx}/industry/10281015">行业党建</a></li>
	        <li class="${type=='10281008'?'dangqiande':'' }"><a href="${ctx}/industry/10281008">行业能手</a></li>
	        <li class="${type=='specialist'?'dangqiande':'' }"><a href="${ctx}/specialist">专家组</a></li>
        </ul>
    </div>
	<div class="zhengwu_r">
    	<div class="zhengwu_t">
        	<span class="sp_zw">${typeName }</span>
            <span class="sp_wz"><a href="">首页</a> > <span>协会治理</span> > <span>${typeName }</span></span>
        </div>
        <div class="detailpage">
        	<%--<h1>${typeName }</h1>--%>
            ${content }
        </div>
    </div>
</div>



<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>
