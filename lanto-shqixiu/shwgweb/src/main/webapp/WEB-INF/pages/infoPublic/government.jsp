<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/government.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>

<div class="Government">
	<div class="zhengwu_l">
    	<div class="zhengwu">公共管理</div>
        <ul class="zheng_ul">
        	<li class="nav_menu open">
        		<div><a href="javascript:void(0);">政务公开</a></div>
        		<ul>
        			<li class="${type=='10281001'?'dangqiande':'' }"><a href="${ctx}/government/10281001">法律法规</a></li>
					<li class="${type=='10281002'?'dangqiande':'' }"><a href="${ctx}/government/10281002">管理规范</a></li>
					<li class="${type=='10281003'?'dangqiande':'' }"><a href="${ctx}/government/10281003">行业政策</a></li>
					<li class="${type=='10281004'?'dangqiande':'' }"><a href="${ctx}/government/10281004">技术标准</a></li>
        		</ul>
        	</li>
        	<li class="${type=='10281005'?'dangqiande':'' }"><a href="${ctx}/government/10281005">办事指南</a></li>
        	<li class="${type=='10281006'?'dangqiande':'' }"><a href="${ctx}/government/10281006">管理职责</a></li>
        	<li class="${type=='10281007'?'dangqiande':'' }"><a href="${ctx}/government/10281007">行业概况</a></li>
        	<li class="nav_menu open">
        		<div><a href="javascript:void(0);">管理动态</a></div>
        		<ul>
			        <li><a id="repairInfo" class="">电子维修档案</a></li>
			        <%--<li><a class="toLogin" href="${ctx}/center/repairInfo">电子维修档案</a></li>--%>
			        <%--<li><a href="javascript:void(0);">客货运车辆技术管理</a></li>--%>
			        <li><a id="companyCertificate">企业合格证使用信息管理</a></li>
        			<li class="${type=='10281016'?'dangqiande':'' }"><a href="${ctx}/government/10281016">质量信誉考核信息</a></li>
					<li class="${type=='10281017'?'dangqiande':'' }"><a href="${ctx}/government/10281017">违法违规公告</a></li>
        		</ul>
        	</li>
        	
        	<li class="nav_menu open">
        		<div><a href="javascript:void(0);">创先争优</a></div>
        		<ul>
        			<li class="${type=='10281009'?'dangqiande':'' }"><a href="${ctx}/government/10281009">优质企业</a></li>
					<%--<li class="${type=='10281008'?'dangqiande':'' }"><a href="${ctx}/government/10281008">行业能手</a></li>--%>
        		</ul>
        	</li>
        	<li class="${type=='10281010'?'dangqiande':'' }"><a href="${ctx}/government/10281010">行业文明创建</a></li>
        </ul>
    </div>
    <span id="infoType" style="display:none;">${type }</span>
	<div class="zhengwu_r">
    	<div class="zhengwu_t">
        	<span class="sp_zw">${typeName }</span>
            <span class="sp_wz"><a href="">首页</a> > <span>公共管理</span> > <span>${typeName }</span></span>
        </div>
        <ul class="zhengwu_c" id="dataBody">
        	
        </ul>
        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
<script>
$(function () {
	var info = JSON.parse(localStorage.getItem('USERINFO'));
	var roleId = info.userRoleId || '';

	if(roleId == '1'){
		//车主的情况

		//电子健康档案
		$("#repairInfo").attr('href', '${ctx}/center/applyList');
		//企业合格证使用信息管理
		$("#companyCertificate").parent().hide();
	}

	if(roleId == '2'){
		//维修企业的情况

		//电子健康档案
		$("#repairInfo").attr('href', '${ctx}/center/repairInfo');
		//企业合格证使用信息管理
		$("#companyCertificate").attr('href', '${ctx}/center/repairQuality');
	}

	if(roleId == '3'){
		//管理部门的情况

		//电子健康档案
		$("#repairInfo").attr('href', '${ctx}/center/recordCompInfo');
		//企业合格证使用信息管理
		$("#companyCertificate").attr('href', '${ctx}/center/compInfoList');

	}

	if(roleId == '4'){
		//运营商的情况

		//电子健康档案
		$("#repairInfo").attr('href', '${ctx}/center/applyList');
		//企业合格证使用信息管理
		$("#companyCertificate").parent().hide();
	}

	if(roleId == '5'){
		//专家的情况

		//电子健康档案
		$("#repairInfo").attr('href', '${ctx}/center/applyList');
		//企业合格证使用信息管理
		$("#companyCertificate").parent().hide();
	}

	if(roleId == '6'){
		//协会的情况

		//电子健康档案
		$("#repairInfo").attr('href', '${ctx}/center/recordCompInfo');
		//企业合格证使用信息管理
		$("#companyCertificate").parent().hide();
	}

	if(roleId == '7'){
		//管理部门领导的情况

		//电子健康档案
		$("#repairInfo").attr('href', '${ctx}/center/recordCompInfo');
		//企业合格证使用信息管理
		$("#companyCertificate").attr('href', '${ctx}/center/compInfoList');
	}

})
</script>
</body>
</html>
