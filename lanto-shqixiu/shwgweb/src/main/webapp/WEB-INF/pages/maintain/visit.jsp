<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<%--<script src="${btx}/js/kindeditor/kindeditor-all-min.js"></script>--%>
<%--<script src="${btx}/js/kindeditor/lang/zh_CN.js"></script>--%>
<%--<script src="${btx}/js/front/expert.js"></script>--%>
<%--<script src="${btx}/js/front/cdf.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="supervision">
<div class="pro_t">
	<span class="wenti">上门服务</span>
	<input type="text" id="ctx" name="ctx" style="display:none;" value="${ctx}"/>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
<div class="examine" >
	<form class="layui-form" style="margin-top: 10px"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
		<div class="layui-form-item">
			<label class="layui-form-label">车主姓名</label>
			<div class="layui-input-block" style="width: 500px">
				<input type="text" name="ownerName" placeholder="请输入" id="ownerName" maxlength="15" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">联系方式</label>
			<div class="layui-input-block" style="width: 500px">
				<input type="text" name="contactMobile" placeholder="请输入" id="contactMobile" maxlength="15" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">地址</label>
			<div class="layui-input-block" style="width: 500px">
				<input type="text" name="contactAddress" placeholder="请输入" id="contactAddress" maxlength="30" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">服务内容</label>
			<div class="layui-input-block">
				<input type="checkbox" name="serviceType1" title="上门故障诊断" lay-skin="primary" value="300001">
				<input type="checkbox" name="serviceType2" title="上门取送车服务" lay-skin="primary" value="300002">
				<input type="checkbox" name="serviceType3" title="上门更换备胎" lay-skin="primary" value="300003">
				<input type="checkbox" name="serviceType4" title="上门更换灯泡" lay-skin="primary" value="300004">
				<input type="checkbox" name="serviceType5" title="上门更换雨刮片" lay-skin="primary" value="300005">
				<input type="checkbox" name="serviceType6" title="上门泵电" lay-skin="primary" value="300006">
				<input type="checkbox" name="serviceType7" title="其他" lay-skin="primary" value="300007">
			</div>
		</div>

		<div class="layui-form-item" style="text-align: right">
			<a class="layui-btn layui-btn-normal" lay-submit="" lay-filter="serviceSubmit" id="submitBtn">提交</a>
		</div>
	</form>

</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
	$(function () {
        var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
		if(!userinfo){
            layer.msg('请先进行登录');
            setTimeout(function(){
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + "${memberUri}";
			},2000)
		}
	//    layui.use('form', function() {
			var form = layui.form;
			form.render();
	//    })

	})
	var speed=40
	function Marquee(){
		if(expertlist2.offsetTop-expertlist.scrollTop<=0)
			expertlist.scrollTop-=expertlist1.offsetHeight
		else{
			expertlist.scrollTop++
		}
	}
	var MyMar;
	if($("#expertlist1").children().length > 5){
		expertlist2.innerHTML=expertlist1.innerHTML
		MyMar=setInterval(Marquee,speed);
		expertlist.onmouseover=function() {clearInterval(MyMar)}
		expertlist.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
	}
	var nums = 11; //每页出现的数据量


	layui.use('form', function(){
		var form = layui.form;
		//监听提交
		form.on('submit(serviceSubmit)', function(data){
			console.log('submit data: ', data);
			var ii = layer.load();
			var serviceType = "";

			for(var prop in data.field){
				if(prop.substr(0, 11) === 'serviceType'){
					serviceType = serviceType + data.field[prop] + ',';
				}
			}
			if(serviceType.length > 0){
				serviceType = serviceType.substring(0, serviceType.length - 1);
			}

			var param={
				accessToken: localStorage.getItem('ACCESSTOKEN'),
				ownerName: data.field.ownerName,
				contactMobile: data.field.contactMobile,
				contactAddress: data.field.contactAddress,
				serviceType: serviceType,
				companyId: getUrlParam('company_id'),
			}
			accessPost(baseu+ '/maintain/addOnsiteService', JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
				console.log('res: ', res);
				var message = responseMessageMaker(res, "${ctx}");
				layer.msg(message, {
					icon: 1,
					time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
				}, function(){
					layer.closeAll();
				});

                if(res.code=='000000'){
                    window.location.href = "/center/myOnsites"
                }
			})
		});
	});
</script>
</html>
