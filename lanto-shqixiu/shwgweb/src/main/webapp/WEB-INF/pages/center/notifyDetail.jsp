<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
	<script src="${btx}/js/front/notifyDetail.js"></script>
</head>
<style>
	/*.title{*/
		/*font-size: 13px;*/
		/*line-height: 16px;*/
	/*}*/
	/*.context{*/
		/*font-size: 13px;*/
		/*line-height: 16px;*/
	/*}*/
	.recipient-button{
		display: none;
	}
    .notify-detail-input{
	display: inline-block;
	width: 100%;
	height: 32px;
	line-height: 1.5;
	padding: 4px 7px;
	border: 1px solid #dddee1;
	border-radius: 4px;
	color: #495060;
	background-color: #fff;
	background-image: none;
	position: relative;
	cursor: text;
	transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
.extra li{
	width: 500px;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #cccccc;
}
.extra li a{
	color: red;
}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
<div class="zhengwu_r">
<div class="zhengwu_t">
<span class="sp_zw">通知详情</span> <span class="sp_wz">您所在位置：
<a href="#" onClick="javascript :history.go(-1);">通知管理</a> > <span>通知详情</span></span>
</div>
<div class="biaoge" style="overflow: auto">
	<div class="dblock">
		<%--<h1 class="dtitle title1">我发送的通知</h1>--%>
		<div style="width:100%">
			<div class="layui-form-item" style="margin-top: 10px;width:100%; ">
				<p id="title" style="width: 92%;font-size:24px;text-align: center;margin:0 auto"></p>
			</div>

			<div class="layui-form-item" style="margin-top: 10px;width:100%; ">
				<div style="width:100%;">
					<p id="context" style="width: 92%;margin: 0 auto"></p>
				</div>
			</div>
			<div class="layui-form-item" style="margin-top: 10px">
				<label class="layui-form-label">附件下载</label>
				<div class="layui-input-block">
					<ul class="extra" style="width: 500px">
						<%--<li><a href="">ssssssss</a></li>--%>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<%--<div class="dblock table1" style="display: none;text-align: left">--%>
		<%--<h1 class="dtitle">收件人列表</h1>--%>
			<%--<table class="layui-table manageNotes-th" lay-size="sm" style="width: 800px;">--%>
				<%--<colgroup>--%>
					<%--<col width="100"><col width="100"><col width="100">--%>
				<%--</colgroup>--%>
				<%--<thead>--%>
				<%--<tr>--%>
					<%--<th class="manageNotes-th">收件人</th>--%>
					<%--<th class="manageNotes-th">是否已读</th>--%>
					<%--<th class="manageNotes-th">发送时间</th>--%>
				<%--</tr>--%>
				<%--</thead>--%>
				<%--<tbody>--%>

				<%--</tbody>--%>
			<%--</table>--%>
			<%--<div id="pagebar" style="text-align:center;margin-top:5px;"></div>--%>
	<%--</div>--%>
	<div style="margin: 20px">
		<button class="manageNotes-buttom" onclick="javascript :history.go(-1);">后退</button>
		<button class="manageNotes-buttom recipient-button" id="recipient-button" onclick="recipient()">查看收件人</button>
	</div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {

})

</script>

</html>
