<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="${btx}/js/layui-v2.1.6/layui/css/layui.css" type="text/css">
	<link rel="stylesheet" href="${btx}/js/lib/swipeslider.css">
	<script src="${btx}/js/jquery-1.10.2.min.js"></script>
	<script src="${btx}/js/layui-v2.1.6/layui/layui.all.js"></script>
	<script src="${btx}/js/lib/swipeslider.min.js"></script>

	<script src="${btx}/js/superfish.min.js"></script>
	<script src="${btx}/js/common.js"></script>
</head>
<style>
	html, body {
		/*height: 100%;*/
	}
	body{
		background: url(${btx}/images/315/315iconbg.png) no-repeat;
		background-size: 100% 100%;
		/*text-align: center;*/
		min-height: 100vh;
	}
	img{
		width: 100%;
	}
	.content{
		position: relative;
	}
	.button{
		width: 100%;
		height: 20vh;
		position: absolute;
		left: 0;
		bottom: 0;
	}

</style>
<body>
<div class="content">
	<img class="main" src=""/>
	<div class="button"></div>
</div>

<div id="form" style="display: none">
	<form class="layui-form" style="margin-top: 10px;text-align: left"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
		<div class="layui-form-item">
			<label class="layui-form-label">车主姓名</label>
			<div class="layui-input-block" style="width: 200px">
				<input type="text" name="ownerName" id="ownerName" placeholder="请输入（必填）" autocomplete="off" lay-verify="required" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">联系方式</label>
			<div class="layui-input-block" style="width: 200px">
				<input type="number" name="contactMobile" id="contactMobile" placeholder="请输入手机号（必填）" autocomplete="off" lay-verify="required|phone" class="layui-input">
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">预约时间</label>
			<div class="layui-input-block" style="width: 200px">
				<input type="text" class="layui-input" name="time" id="time" placeholder="请选择预约时间（必填）" >
			</div>
		</div>

		<div class="layui-form-item">
			<label class="layui-form-label">维修内容</label>
			<div class="layui-input-block" style="width: 200px">
				<textarea id="serviceContent" name="serviceContent" placeholder="请输入内容（可选）" class="layui-textarea"></textarea>
				<%--<input type="text" name="serviceContent" id="serviceContent" placeholder="请输入" autocomplete="off" class="layui-input">--%>
			</div>
		</div>

		<div class="layui-form-item">
			<div class="layui-input-block" style="width: 200px;text-align: right">
				<a class="layui-btn layui-btn-normal" lay-submit lay-filter="orderSubmit">提交</a>
			</div>
		</div>
	</form>
</div>

<script type="text/javascript">
$(function () {
    var id=getUrlParam('id')
    //$(".main").attr("src","${btx}/images/315/com"+id+".jpg")
    layer.load(1)
    var img = new Image();
    img.src = "https://static.shanghaiqixiu.org/20180315/chengxin/com"+id+".jpg"
    img.onload = function(e){
        $(".main").attr("src","https://static.shanghaiqixiu.org/20180315/chengxin/com"+id+".jpg")
        layer.closeAll();
    }

    $(".button").click(function () {
        layer.open({
            type: 1,
            content: $('#form'),
            title: "填写预约信息",
            area: ['100vw', '100vh'],
            cancel: function () {
                $("#form").hide()
            }
        });
    })

    var form = layui.form;
    var laydate = layui.laydate;

    form.render()
    laydate.render({
        elem: '#time',
        type: 'datetime',
        format: 'yyyy/MM/dd HH:mm:ss'
    });
    //监听提交

	console.log(navigator.userAgent)
    var userAgent= navigator.userAgent
    var android= userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1

    form.on('submit(orderSubmit)', function(data){

        var token= localStorage.getItem("ACCESSTOKEN")
        if(!token){
//            layer.msg('请登录后预约！', {time: 1000, icon:5},function () {
//                //window.open("/toLogin")
//            })
            if( android)
                window.JSInterface.loginByJs("https://www.shanghaiqixiu.org/phone/315/comdetail?id="+getUrlParam('id'))//android 方法
	        else loginByJs("https://www.shanghaiqixiu.org/phone/315/comdetail?id="+getUrlParam('id'))
         }

        if(!$("#time").val()){
            layer.msg("请选择预约时间", {icon: 5, time: 1500 })
            return
        }
        console.log('submit data: ', data);
        var ii = layer.load(1);
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            ownerName: data.field.ownerName,
            contactMobile: data.field.contactMobile,
            serviceContent: data.field.serviceContent,
            companyId: getUrlParam('id'),
            onSiteTime: new Date(data.field.time).toISOString()
        }
        /*
        accessPost(baseu+ '/maintain/addOnsiteOrder', JSON.stringify(param), function (res) {

            console.log('res: ', res);


            if(res.code=='000000'){
                layer.msg(res.status, {
                    icon: 1,
                    time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                }, function(){
                    layer.closeAll();
//                    window.location.href = "/center/myOrders"
                });
            }else{
                layer.msg(res.status, {
                    icon: 5,
                    time: 2000 //1.5秒关闭（如果不配置，默认是3秒）
                }, function(){
                    layer.closeAll();
                });
            }
			$("#form").hide()
        })
	    */

        $.ajax({
            url : baseu+ '/maintain/addOnsiteOrder',
            data : JSON.stringify(param),
            type : "post",
            //headers: headers,
            dataType:"json",
            contentType:"application/json",
            success : function(e) {
                layer.msg(e.status, {
                    icon: 1,
                    time: 2000 //1.5秒关闭（如果不配置，默认是3秒）
                }, function(){
                    layer.closeAll();
                    $("#form").hide()
                });

            },
            error: function () {
                layer.msg('系统繁忙！', {time: 2000, icon:5});
                $("#form").hide()
            }
        })

    });

})
function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    // if(r!=null)return  unescape(r[2]); return null;
    if(r!=null)return r[2];
    return null;
}

</script>
</body>

</html>
