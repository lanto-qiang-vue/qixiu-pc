<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
	<%--<script src="${btx}/js/layui/lay/modules/laydate.js"></script>
	<link rel="stylesheet" href="${btx}/js/layui-v2.1.6/layui/css/modules/laydate/default/laydate.css">--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
<div class="zhengwu_r">
	<div class="zhengwu_t">
		<span class="sp_zw">绑定他人车辆</span> <span class="sp_wz">您所在位置：<a
			href="${ctx}/center/userInfo">车主中心</a> > <span>绑定他人车辆</span></span>
	</div>
	<div class="biaoge" style="overflow: auto">
		<form class="layui-form" action="" style="width: 500px;margin-top: 10px">
			<div class="layui-form-item">
				<label class="layui-form-label">车主手机号</label>
				<div class="layui-input-block">
					<input class="layui-input tel" type="text">
				</div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label">车牌号</label>
				<div class="layui-input-block">
					<input class="layui-input carCard" type="text">
				</div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label">与车主关系</label>
				<div class="layui-input-block">
					<select name="type" lay-filter="type" id="type">
						<option value="1">家人</option>
						<option value="2">同事</option>
						<option value="3">朋友</option>
					</select>
				</div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label"></label>
				<div class="layui-input-block">
					<div class="layui-btn layui-btn-normal" id="submit" style="float: right;margin-bottom: 10px">提交</div>
				</div>
			</div>
		</form>
	</div>

</div>
</div>
<div id="form" style="display: none">
	<form class="layui-form" action="" style="width: 500px;margin-top: 10px">
		<div class="layui-form-item ">
			<label class="layui-form-label">验证码</label>
			<div class="layui-input-block">
				<input class="layui-input captcha" type="text">
			</div>
		</div>
		<div class="layui-btn layui-btn-normal" id="captcha" style="float: right;margin-bottom: 10px">确定</div>
	</form>
</div>


<script>
$(function () {
    var form = layui.form;
    form.render()
	$("#submit").click(function () {
		var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            telephone: $('.tel').val(),
            vehicleNumber: $('.carCard').val(),
            relation: $('#type').val()
		}
        accessPost(baseu+ '/scan/authorize', JSON.stringify(param), function (res) {
            if(res.code=='000000'){
                layer.open({
                    type: 1,
                    content: $('#form'),
                    title: "请填写车主收到的验证码",
                    area: ['520px', '200px'],
                    cancel: function () {
                        $("#form").hide()
                    }
                });
            }else{
                layer.msg(res.status, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        })
    })

	$("#captcha").click(function () {
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            telephone: $('.tel').val(),
            vehicleNumber: $('.carCard').val(),
            relation: $('#type').val(),
            captcha: $('.captcha').val()
        }
        accessPost(baseu+ '/scan/authorize', JSON.stringify(param), function (res) {
            if(res.code=='000000'){
                layer.msg('绑定成功', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                },function () {
                    window.location.href= '/center/repairInfo?role_id=1'
                });
            }else{
                layer.msg(res.status, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        })
    })
})
</script>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
</html>