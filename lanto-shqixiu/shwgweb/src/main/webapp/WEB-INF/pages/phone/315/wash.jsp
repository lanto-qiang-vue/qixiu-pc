<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="${btx}/js/layui-v2.1.6/layui/css/layui.css" type="text/css">
	<%--<link rel="stylesheet" href="${btx}/js/lib/swipeslider.css">--%>
	<script src="${btx}/js/jquery-1.10.2.min.js"></script>
	<script src="${btx}/js/layui-v2.1.6/layui/layui.all.js"></script>
	<%--<script src="${btx}/js/lib/swipeslider.min.js"></script>--%>

	<script src="${btx}/js/superfish.min.js"></script>
	<script src="${btx}/js/common.js"></script>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<link rel="stylesheet" href="${btx}/css/phone.css" />
</head>
<style>

	.img{
		width: 100%;
		position: relative;
	}
	.img img{
		width: 100%;
	}
	.huiming{
		width: 130px;
		height: 50px;
		/*border: 1px solid black;*/
		position: absolute;
		top: 130px;
		right: 35px;
		display: block;
	}
	.toregister{
		width: 60px;
		height: 20px;
		/*border: 1px solid black;*/
		position: absolute;
		left: 50px;
		bottom: 10px;
		display: block;
	}
	.info{
		background-color: #e4bfab;
		padding: 10px;
		border-radius: 10px;
	}
	.info .head{
		width: 100px;
		margin-bottom: 10px;
	}

</style>
<body>

<div class="supervision">
	<div class="pro_t">
		<span class="wenti">汽修平台操作指南</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine">
		<img class="img" src="${btx}/images/czzninfo.jpg"/>
	</div>
</div>



<script type="text/javascript">
$(function () {
//    window.location.href='/czzn'

    var form = layui.form;
    var laydate = layui.laydate;
    var cominfo=[];

    form.render()
    laydate.render({
        elem: '#date', //指定元素
        format: 'yyyy/MM/dd'
        ,min: 0
        ,max: "2018-03-31"
        ,done: function () {
            if($("#area").val()){
                getStore()
            }

        }
    });

    form.on('select(area)', function (data) {
        if($("#date").val()){
            getStore()
        }else{
            layer.msg( '请选择预约时间', {time: 2000, icon:5});
        }
    });

    form.on('select(store)', function (data) {
        console.log(data.value, cominfo)
        $("#add").text("")
        for( var i in cominfo){
            if( cominfo[i].id== data.value){
                $("#add").text(cominfo[i].corpName)
            }
        }
    });

    var userAgent= navigator.userAgent
    var android= userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1

    $(".toregister").click(function () {
        if(android)
            window.JSInterface.registerByJs("https://www.shanghaiqixiu.org/phone/315/wash")//android 方法
        else
        registerByJs("https://www.shanghaiqixiu.org/phone/315/wash")

    })

    $(".sub").click(function () {
//        console.log(new Date($("#date").val()).toISOString())
        var token= localStorage.getItem("ACCESSTOKEN")
        if(!token){
//            layer.msg('请注册登录后预约！', {time: 1000, icon:5},function () {
////                window.open("/toLogin")
//                window.location.href =  "/toLogin?reUrl=/315/wash"
//            })
            if(android)
                window.JSInterface.registerByJs("https://www.shanghaiqixiu.org/phone/315/wash")//android 方法
            else
                registerByJs("https://www.shanghaiqixiu.org/phone/315/wash")
        }else{
            if (!$("#date").val()){
                layer.msg('请选择预约日期！', {time: 2000, icon:5})
                return
            }
            if (!$("#store").val()){
                layer.msg('请选择预约门店！', {time: 2000, icon:5})
                return
            }
            var param = {
                "accessToken": token,
                "activity": "洗车优惠",
                "amount": 20,
                "category": 0,
                "corpId": $("#store").val(),
                "useTime": new Date($("#date").val()).toISOString()
            }
            simplePost(baseu+'/activity/generate',JSON.stringify(param),function (res) {
//                console.log(res)
                if(res.code=='000000'){
                    layer.open({
                        title: '成功'
                        ,content: '预约成功，请登录微信公众号查看优惠券。'
                    });
                }else{
                    if(android)
                        window.JSInterface.registerByJs("https://www.shanghaiqixiu.org/phone/315/wash")//android 方法
                    else
                        registerByJs("https://www.shanghaiqixiu.org/phone/315/wash")
                }
            })
        }
    })



    function getStore() {
        $("#store").html("<option value=''>门店</option>")
        $(".add").text("请选择门店")
        form.render()
        systemCall(function (tok) {
            var param = {
                areacode: $("#area").val(),
                systemToken: tok,
                useTime: new Date($("#date").val()).toISOString()
            };
            simplePost(baseu+'/activity/carWashList',JSON.stringify(param),function (res) {
                console.log(res)
                if(res.code=='000000'){
                    cominfo= res.data
//                    layer.msg('获取门店列表成功！', {time: 2000, icon:1});
                    var html="<option value=''>门店</option>"
                    for( var i in res.data){
                        html+="<option value='"+res.data[i].id+"'>"+res.data[i].address+"</option>"
                    }
                    $("#store").html(html)
                    form.render()
                }else{
                    layer.msg('系统繁忙！', {time: 2000, icon:5});
                }
            })
        })
    }

})

</script>
</body>

</html>
