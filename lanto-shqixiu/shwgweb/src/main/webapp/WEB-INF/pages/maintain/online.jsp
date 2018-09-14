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
	<span class="wenti">在线预约维修</span>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
<div class="examine" >
	<form class="layui-form" style="margin-top: 10px"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
		<div class="layui-form-item">
			<label class="layui-form-label">预约公司名称</label>
			<div class="layui-input-block" style="width: 500px">
				<input type="text" name="comName" id="comName" class="layui-input" readonly>
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">车主姓名</label>
			<div class="layui-input-block" style="width: 500px">
				<input type="text" name="ownerName" id="ownerName" placeholder="请输入（必填）" maxlength="15" lay-verify="required" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">联系方式</label>
			<div class="layui-input-block" style="width: 500px">
				<input type="text" name="contactMobile" id="contactMobile" placeholder="请输入手机号（必填）" maxlength="15" lay-verify="required|phone" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">预约时间</label>
			<div class="layui-input-block" style="width: 500px">
				<input type="text" class="layui-input" name="time" id="time" placeholder="请选择预约时间（必填）" >
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">预约维修内容</label>
			<div class="layui-input-block" style="width: 500px">
				<textarea id="serviceContent" name="serviceContent" placeholder="请输入内容（可选）" class="layui-textarea" maxlength="50"></textarea>
				<%--<input type="text" name="serviceContent" id="serviceContent" placeholder="请输入" autocomplete="off" class="layui-input">--%>
			</div>
		</div>

		<div class="layui-form-item">
			<div class="layui-input-block" style="width: 500px;text-align: right">
			<a class="layui-btn layui-btn-normal" lay-submit lay-filter="orderSubmit">提交</a>
			</div>
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
	var form = layui.form;
	form.render();

    systemCall(function (tok) {
        var param={
            corpId: getUrlParam('company_id'),
            systemToken: tok
        }
        accessPost(baseu+ '/maintain/corpDetail', JSON.stringify(param), function (res) {
            console.log(res)
	        if(res.code=='000000'){
                $("#comName").val(res.data.corpName)
	        }
        })
    })
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

var laydate = layui.laydate;
laydate.render({
    elem: '#time',
	type: 'datetime',
    format: 'yyyy/MM/dd'
});



	var form = layui.form;
	//监听提交
	form.on('submit(orderSubmit)', function(data){
	    if(!$("#time").val()){
            layer.msg("请选择预约时间", {icon: 5, time: 1500 })
	        return
	    }
		console.log('submit data: ', data);
		var ii = layer.load();
		var param={
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			ownerName: data.field.ownerName,
			contactMobile: data.field.contactMobile,
			serviceContent: data.field.serviceContent,
			companyId: getUrlParam('company_id'),
            onSiteTime: new Date(data.field.time).toISOString()
		}
		accessPost(baseu+ '/maintain/addOnsiteOrder', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log('res: ', res);
			var message = responseMessageMaker(res, "${ctx}");

			if(res.code=='000000'){
                layer.msg(message, {
                    icon: 1,
                    time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                }, function(){
                    layer.closeAll();
                    window.location.href = "/center/myOrders"
                });
            }else{
                layer.msg(message, {
                    icon: 5,
                    time: 2000 //1.5秒关闭（如果不配置，默认是3秒）
                }, function(){
                    layer.closeAll();
                });
            }


		})
	});

</script>
</html>
