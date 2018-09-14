<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<style>
	.layui-btn{
		position: relative;
	}
	.layui-btn input{
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		left: 0;
		top: 0;
		cursor: pointer;
	}
	.layui-input-block img{
		width: 100%;
	}
	.info{
		padding: 10px;
		text-align: right;
		display: none;
	}
	.info li{
		font-size: 16px;
		line-height: 30px;
		border-bottom: 1px solid #CCCCCC;
		text-align: left;
	}
	.info li label{
		width: 120px;
		display: inline-block;
	}
	#form form{
		display: none;
	}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">绑定车辆</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/userInfo">车主中心</a> > <span>绑定车辆</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<form class="layui-form" action="" style="width: 500px;margin-top: 10px">

				<div class="layui-form-item">
				<label class="layui-form-label">绑定类型</label>
				<div class="layui-input-block">
					<select name="type" lay-filter="type">
						<option value="1">个人车辆</option>
						<option value="2">企业车辆</option>
					</select>
				</div>
				</div>

				<div class="layui-form-item xingshi">
					<label class="layui-form-label">上传行驶证</label>
					<div class="layui-input-block">
						<div class="layui-btn layui-btn-normal" id="upload1">
							<i class="layui-icon">&#xe67c;</i>选择图片
							<input onchange="getImg('.xingshi')" type="file" accept="image/jpg,image/png,image/bmp">
						</div>
						<span>仅支持PNG、JPG、JPEG、BMP</span>
					</div>
				</div>
				<div class="layui-form-item xingshi">
					<label class="layui-form-label"></label>
					<div class="layui-input-block">
						<img src="">
						<ul class="info">
							<li><label>所有人：</label><span class="name"></span></li>
							<li><label>车牌号码：</label><span class="card"></span></li>
							<li><label>车架号(VIN)：</label><span class="vin"></span></li>
							<li><label>发动机号：</label><span class="fadong"></span></li>
							<div class="layui-btn layui-btn-warm" onclick="edit('.xingshi')">
								<i class="layui-icon">&#xe642;</i>修改信息
							</div>
						</ul>

					</div>
				</div>

				<div class="layui-form-item idCard hasIDinfo">
					<label class="layui-form-label">上传身份证（头像面）</label>
					<div class="layui-input-block">
						<div class="layui-btn layui-btn-normal" >
							<i class="layui-icon">&#xe67c;</i>选择图片
							<input onchange="getImg('.idCard')" type="file" accept="image/jpg,image/png,image/bmp">
						</div>
						<span>仅支持PNG、JPG、JPEG、BMP</span>
					</div>
				</div>
				<div class="layui-form-item idCard front">
					<label class="layui-form-label"></label>
					<div class="layui-input-block">
						<img src="">
						<ul class="info">
							<li><label>姓名：</label><span class="name"></span></li>
							<li><label>身份证号：</label><span class="card"></span></li>
							<div class="layui-btn layui-btn-warm" onclick="edit('.idCard')">
								<i class="layui-icon">&#xe642;</i>修改信息
							</div>
						</ul>
					</div>
				</div>

				<%--<div class="layui-form-item idCard idCard-back hasIDinfo">--%>
					<%--<label class="layui-form-label">上传身份证（国徽面）</label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<div class="layui-btn layui-btn-normal" >--%>
							<%--<i class="layui-icon">&#xe67c;</i>选择图片--%>
							<%--<input onchange="getImg('.idCard-back')" type="file" accept="image/jpg,image/png,image/bmp">--%>
						<%--</div>--%>
						<%--<span>仅支持PNG、JPG、JPEG、BMP</span>--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div class="layui-form-item  idCard-back">--%>
					<%--<label class="layui-form-label"></label>--%>
					<%--<div class="layui-input-block">--%>
						<%--<img src="">--%>
						<%--<ul class="info">--%>
							<%--&lt;%&ndash;<li><label>签发机关：</label><span class="unit"></span></li>&ndash;%&gt;--%>
							<%--<li><label>有效期限：</label><span class="time"></span></li>--%>
							<%--<div class="layui-btn layui-btn-warm" onclick="edit('.idCard-back')">--%>
								<%--<i class="layui-icon">&#xe642;</i>修改信息--%>
							<%--</div>--%>
						<%--</ul>--%>
					<%--</div>--%>
				<%--</div>--%>

				<div class="layui-form-item yingye" style="display: none">
					<label class="layui-form-label">上传营业执照</label>
					<div class="layui-input-block">
						<div class="layui-btn layui-btn-normal" >
							<i class="layui-icon">&#xe67c;</i>选择图片
							<input onchange="getImg('.yingye')" type="file" accept="image/jpg,image/png,image/bmp">
						</div>
						<span>仅支持PNG、JPG、JPEG、BMP</span>
					</div>
				</div>
				<div class="layui-form-item yingye" style="display: none">
					<label class="layui-form-label"></label>
					<div class="layui-input-block">
						<img src="">
						<ul class="info">
							<li><label>企业名称：</label><span class="name"></span></li>
							<li><label>法定代表人：</label><span class="person"></span></li>
							<div class="layui-btn layui-btn-warm" onclick="edit('.yingye')">
								<i class="layui-icon">&#xe642;</i>修改信息
							</div>
						</ul>
					</div>
				</div>

				<div class="layui-btn layui-btn-normal" id="submit" style="float: right;margin-bottom: 10px">提交</div>
				<div class="layui-btn layui-btn-normal" id="back" style="float: left;margin-left: 20px;margin-bottom: 10px;">后退</div>
			</form>
		</div>
	</div>
</div>

<div id="form" style="display: none">
	<form class="layui-form xingshi" action="" style="width: 500px;margin-top: 10px">
		<div class="layui-form-item ">
			<label class="layui-form-label">所有人</label>
			<div class="layui-input-block">
				<input class="layui-input name" type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label">车牌号码</label>
			<div class="layui-input-block">
				<input class="layui-input card " type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label">车架号(VIN)</label>
			<div class="layui-input-block">
				<input class="layui-input vin" type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label">发动机号</label>
			<div class="layui-input-block">
				<input class="layui-input fadong" type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label"></label>
			<div class="layui-input-block">
				<div class="layui-btn layui-btn-normal" onclick="update('.xingshi')">修改</div>
			</div>
		</div>
	</form>
	<form class="layui-form idCard" action="" style="width: 500px;margin-top: 10px">
		<div class="layui-form-item ">
			<label class="layui-form-label">姓名</label>
			<div class="layui-input-block">
				<input class="layui-input name" type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label">身份证号</label>
			<div class="layui-input-block">
				<input class="layui-input card" type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label"></label>
			<div class="layui-input-block">
				<div class="layui-btn layui-btn-normal" onclick="update('.idCard')">修改</div>
			</div>
		</div>
	</form>
	<%--<form class="layui-form idCard-back" action="" style="width: 500px;margin-top: 10px">--%>
		<%--<div class="layui-form-item ">--%>
			<%--<label class="layui-form-label">有效期限</label>--%>
			<%--<div class="layui-input-block">--%>
				<%--<input class="layui-input time1" type="text" style="width: 48%;display: inline-block"> ---%>
				<%--<input class="layui-input time2" type="text" style="width: 48%;display: inline-block">--%>
			<%--</div>--%>
		<%--</div>--%>
		<%--<div class="layui-form-item ">--%>
			<%--<label class="layui-form-label"></label>--%>
			<%--<div class="layui-input-block">--%>
				<%--<div class="layui-btn layui-btn-normal" onclick="update('.idCard-back')">修改</div>--%>
			<%--</div>--%>
		<%--</div>--%>
	<%--</form>--%>
	<form class="layui-form yingye" action="" style="width: 500px;margin-top: 10px">
		<div class="layui-form-item ">
			<label class="layui-form-label">企业名称</label>
			<div class="layui-input-block">
				<input class="layui-input name" type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label">法定代表人</label>
			<div class="layui-input-block">
				<input class="layui-input person" type="text">
			</div>
		</div>
		<div class="layui-form-item ">
			<label class="layui-form-label"></label>
			<div class="layui-input-block">
				<div class="layui-btn layui-btn-normal" onclick="update('.yingye')">修改</div>
			</div>
		</div>
	</form>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
<script src="${btx}/js/front/myBindCar.js?time=2018041201"></script>
</body>
<script type="text/javascript">


</script>
</html>
