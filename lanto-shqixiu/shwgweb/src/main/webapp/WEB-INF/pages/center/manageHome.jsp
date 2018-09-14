<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<script src="${btx}/js/front/json/echarts.common.min.js"></script>
	<%--<script src="${btx}/js/front/json/echarts.common.min.js"></script>--%>

</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
<div class="zhengwu_r">
<div class="zhengwu_t">
<span class="sp_zw">首页</span> <span class="sp_wz">您所在位置：<a
href="${ctx}/center/manageHome">管理中心</a> > <span>首页</span></span>
</div>
<div class="biaoge" style="overflow: auto">
	<div class="dblock">
		<h1 class="dtitle">电子健康档案状况</h1>
		<table id="table1" class="layui-table" style="width: 600px">
			<colgroup>
				<col width="150"><col width="150"><col width="150"><col width="150">
			</colgroup>
			<thead>
				<tr><th>类型</th><th>总数</th><th>已对接数量</th><th>完成率（%）</th></tr>
			</thead>
			<tbody style="cursor: pointer">

			</tbody>
		</table>

	</div>

	<div class="dblock">
		<div id="pie1" style="width: 300px;height: 300px;position: relative"></div>
		<div id="pie3" style="width: 300px;height: 300px;position: relative"></div>
	</div>

	<div class="dblock">
		<h1 class="dtitle">区域对接状况</h1>
		<div id="bar1" style="width: 800px;height: 350px"></div>
	</div>

	<%--<div class="dblock">--%>
		<%--<h1 class="dtitle">ERP公司对接情况</h1>--%>
		<%--<table class="layui-table" style="width: 600px">--%>
			<%--<colgroup>--%>
				<%--<col width="200"><col width="200"><col width="200">--%>
			<%--</colgroup>--%>
			<%--<thead>--%>
			<%--<tr><th>对接完成名单（9家）</th><th>对接进行中名单（7家）</th><th>还未对接名单（8家）</th>--%>
			<%--</thead>--%>
			<%--<tbody>--%>
			<%--<tr><td>驷惠软件</td><td>车保无忧</td><td>上海瑞龙</td></tr>--%>
			<%--<tr><td>理工华泰</td><td>奇策   </td><td>江淮汽车 JAC DMS</td></tr>--%>
			<%--<tr><td>软平    </td><td>全智通 </td><td>慧与（中国）有限公司软件商公司</td></tr>--%>
			<%--<tr><td>汽修通  </td><td>翰都   </td><td>卓越软件</td></tr>--%>
			<%--<tr><td>大智慧  </td><td>思顶   </td><td>宝马主机厂ERP系统</td></tr>--%>
			<%--<tr><td>偲腾    </td><td>Autoplus</td><td>ERP路虎捷豹主机厂</td></tr>--%>
			<%--&lt;%&ndash;<div>完成率 70%</div>&ndash;%&gt;--%>
			<%--</tbody>--%>
		<%--</table>--%>
		<%--<div id="pie3" style="width: 300px;height: 350px"></div>--%>
	<%--</div>--%>

	<div class="dblock">
		<h1 class="dtitle">用户反馈</h1>
		<div class="subtitle layui-form">
			<div class="layui-form-item" style="width: 300px;display: inline-block;text-align: left" >
			<label class="layui-form-label">反馈类型</label>
			<div class="layui-input-block">
				<select id="complaintType"  lay-filter="complaintType">
					<option value="0" selected>维修记录未上传</option>
					<option value="1">维修记录不正确</option>
				</select>
			</div>
		</div></div>
		<table class="layui-table complaint" id="complaint0" style="width: 800px;display: none">
			<colgroup>
				<col width="50"><col width="200"><col width="120"><col width="120"><col width="120">
			</colgroup>
			<thead>
			<tr><th>排名</th><th>企业名称</th><th>反馈总量（次）</th><th>有凭证数量（次）</th><th>无凭证数量（次）</th>
			</thead>
			<tbody style="cursor: pointer">
			</tbody>
		</table>
		<table class="layui-table complaint" id="complaint1" style="width: 800px;display: none">
			<colgroup>
				<col width="50"><col width="200"><col width="120"><col width="120"><col width="120">
			</colgroup>
			<thead>
			<tr><th>排名</th><th>企业名称</th><th>反馈总量（次）</th><th>有凭证数量（次）</th><th>无凭证数量（次）</th>
			</thead>
			<tbody style="cursor: pointer">
			</tbody>
		</table>
	</div>

</div>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
<script src="${btx}/js/front/manage/home.js?v=20180730"></script>
</body>
<script type="text/javascript">

</script>
</html>
