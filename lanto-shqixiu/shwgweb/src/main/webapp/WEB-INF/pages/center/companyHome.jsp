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
			<span class="sp_zw">首页</span> <span class="sp_wz">您所在位置：
<a href="${ctx}/center/companyHome">企业中心</a> > <span>首页</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<div class="dblock">
				<h1 class="dtitle">企业基本信息</h1>
				<table id="table" class="layui-table" lay-size="sm" style="width: 800px">
					<colgroup>
						<col width="150"><col width="100"><col width="100"><col width="100"><col width="100"><col width="100">
					</colgroup>
					<thead>
					<tr>
						<th>业户名称</th>
						<th>许可证号</th>
						<th>注册地址</th>
						<th>经营范围</th>
					</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>
			<%--<div class="notice">通知（0）</div>--%>
			<div class="dblock table0">
				<h1 class="dtitle">未读通知</h1>
				<table id="table0" class="layui-table" lay-size="sm" style="width: 800px">
					<colgroup>
						<col width="150"><col width="100"><col width="100"><col width="100"><col width="100"><col width="100">
					</colgroup>
					<thead>
					<tr>
						<th>通知标题</th>
						<th>通知内容</th>
						<th>通知发送人</th>
						<th>通知日期</th>
					</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>

			<div class="dblock" id="data_contection_info" style="display: none;">
				<h1 class="dtitle">数据对接情况</h1>
				<div id="bar1" style="width: 500px;height: 300px"></div>
				<table id="table1" class="layui-table" style="width: 250px">
					<colgroup>
						<col width="150"><col width="100">
					</colgroup>
					<thead>
					<tr><th>日期</th><th>数据条数</th></tr>
					</thead>
					<tbody>
					<%--<tr><td>2017/10/12</td><td>4</td></tr>--%>
					<%--<tr><td>2017/10/13</td><td>3</td></tr>--%>
					<%--<tr><td>2017/10/14</td><td>4</td></tr>--%>
					<%--<tr><td>2017/10/15</td><td>2</td></tr>--%>
					<%--<tr><td>2017/10/16</td><td>3</td></tr>--%>
					<%--<tr><td>2017/10/17</td><td>5</td></tr>--%>
					<%--<tr><td>2017/10/18</td><td>1</td></tr>--%>
					</tbody>
				</table>
			</div>

			<div class="dblock" id="complain_info" style="display: none;">
				<h1 class="dtitle">反馈情况</h1>
				<div id="bar2" style="width: 500px;height: 300px"></div>
				<table id="table2" class="layui-table" style="width: 250px">
					<colgroup>
						<col width="150"><col width="100">
					</colgroup>
					<thead>
					<tr><th>日期</th><th>反馈条数</th></tr>
					</thead>
					<tbody>
					<tr><td>2017/10/12</td><td>10</td></tr>
					<tr><td>2017/10/13</td><td>6</td></tr>
					<tr><td>2017/10/14</td><td>6</td></tr>
					<tr><td>2017/10/15</td><td>7</td></tr>
					<tr><td>2017/10/16</td><td>8</td></tr>
					<tr><td>2017/10/17</td><td>9</td></tr>
					<tr><td>2017/10/18</td><td>1</td></tr>
					</tbody>
				</table>
			</div>

			<div class="dblock">
				<h1 class="dtitle">上门服务申请业务（仅限于法律法规允许的业务）</h1>
				<div id="bar3" style="width: 500px;height: 300px"></div>
				<div class="scollbar" id="scoll1">
					<h2 class="stitle">上门服务维修申请</h2>
					<div class="list">
						<div class="group" id="group1">
							<%--<div class="item">1.姓名：张三 电话：13857463557 请求上门维修</div>--%>
							<%--<div class="item">2.姓名：李四 电话：15096747948 请求上门维修</div>--%>
						</div>

					</div>
				</div>
			</div>

			<div class="dblock">
				<h1 class="dtitle">预约维修业务</h1>
				<div id="bar4" style="width: 500px;height: 300px"></div>
				<div class="scollbar" id="scoll2">
					<h2 class="stitle">预约维修申请</h2>
					<div class="list">
						<div class="group" id="group2">
							<%--<div class="item">1.姓名：张三 电话：13857463557 预约维修</div>--%>
							<%--<div class="item">2.姓名：李四 电话：15096747948 预约维修</div>--%>
						</div>

					</div>
				</div>
			</div>

			<div class="dblock" id="stock_warnning" style="display: none">
				<div class="warning">
					<div class="title">备件库存预警</div>
					<p>米其林17寸轮胎：10条，玛吉斯16寸轮胎：9条，凯迪拉克空气滤芯：三盒</p>
				</div>
			</div>

		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
<script src="${btx}/js/front/company/home.js"></script>
</body>
<script type="text/javascript">

</script>
</html>
