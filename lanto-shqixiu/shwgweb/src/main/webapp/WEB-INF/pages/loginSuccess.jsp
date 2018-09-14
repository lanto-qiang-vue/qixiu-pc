<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script type="text/javascript">
	var tag = '${tag}';
	var i = 5;
	sclock();
//	var stimmer = setInterval("sclock();", 1000);
	function sclock() {
		var reUrl = getUrlParam("reUrl");

        //
        var info = JSON.parse(localStorage.getItem('USERINFO'));
        if(reUrl == '/center/companyEmployeeList'){
            if(info && info.userRoleId != 2){
                layer.msg('对不起，您没有权限访问此功能。', {time: 2000, icon:5},function () {
                    window.location.href = '/index'
                });
                return
            }
        }

		if (tag == 'register') {
			window.location.href = "${ctx}/index";
		} else {
			if (reUrl != null && reUrl != '') {
				window.location.href = reUrl;
			} else {
				window.location.href = "${ctx}/index";
			}
		}


		<%--i--;--%>
		<%--if (i >= 0) {--%>
			<%--$("#show_clock").html(i);--%>
		<%--} else {--%>
			<%--window.clearInterval(stimmer);--%>
			<%--if (tag == 'register') {--%>
				<%--window.location.href = "${ctx}/index";--%>
			<%--} else {--%>
				<%--var reUrl = $('#reUrl').html();--%>
				<%--if (reUrl != null && reUrl != '') {--%>
					<%--window.location.href = reUrl;--%>
				<%--} else {--%>
					<%--window.location.href = "${ctx}/index";--%>
				<%--}--%>
			<%--}--%>
		<%--}--%>
	}

	function toPrev() {
		if (tag == 'register') {
			window.location.href = "${ctx}/index";
		} else {
			var reUrl = $('#reUrl').html();
			if (reUrl != null && reUrl != '') {
				window.location.href = reUrl;
			} else {
				window.location.href = "${ctx}/index";
			}
		}
	}
</script>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div
		style="width: 978px; height: 300px; margin: 0 auto; background: #fff; text-align: center;">
		<div class="loginsuc">
			<div style="padding-top: 50px; font-size: 18px;height: 800px">
				<%--正在跳转中，请稍后。。。--%>
			</div>
			<%--<div style="padding-top: 50px; font-size: 18px;">--%>
				<%--<img style="vertical-align: middle;" src="${btx}/images/logsuc.jpg" />--%>
				<%--&nbsp;&nbsp;&nbsp;&nbsp;您好!恭喜您已成功登录, <font id="show_clock"--%>
					<%--color="red">5</font> 秒后跳转到 <a href="javascript:toPrev();"--%>
					<%--style="color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;">前一页</a>--%>
			<%--</div>--%>
			<%--<div style="margin-top: 20px; font-size: 18px;">--%>
				<%--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您还可以直接访问：--%>
				<%--<a style="color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/index">首页</a> |--%>
				<%--<a class="center1" style="display:none;color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/center/userInfo">车主中心</a>--%>
				<%--<a class="center2" style="display:none;color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/center/companyHome">企业中心</a>--%>
				<%--<a class="center3" style="display:none;color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/center/manageHome">管理中心</a>--%>
				<%--<a class="center4" style="display:none;color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/center/companyVisit">运营商中心</a>--%>
				<%--<a class="center5" style="display:none;color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/cdf/question4Expert">专家中心</a>--%>
				<%--<a class="center6" style="display:none;color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/center/manageNotes">协会中心</a>--%>
				<%--&lt;%&ndash;管理部门领导&ndash;%&gt;--%>
				<%--<a class="center7" style="display:none;color: #4ba7f5; font-size: 16px; text-decoration: none; font-weight: 600;" target="_top" href="${ctx}/center/manageHome">管理中心</a>--%>
			<%--</div>--%>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
<script>
$(function () {
    if(localStorage.getItem('USERINFO')){
        var info= JSON.parse(localStorage.getItem('USERINFO'))
        $(".center"+info.userRoleId).show()
    }
})
</script>
</body>
</html>
