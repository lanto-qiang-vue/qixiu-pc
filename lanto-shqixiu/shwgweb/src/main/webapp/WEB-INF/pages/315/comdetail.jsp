<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <script src="${btx}/js/front/login.js"></script>
    <link rel="stylesheet" type="text/css" href="${btx}/css/315.css">
<style>
    #form{
        padding: 20px;
        text-align: left;
    }
    .layui-laydate-footer{text-align: left}
</style>
</head>
<body>
<div class="content">
    <img class="main" src=""/>
    <div class="button"></div>
</div>

<div id="form" style="display: none">
    <form class="layui-form" style="margin-top: 10px;text-align: left"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
        <div class="layui-form-item">
            <label class="layui-form-label">车主姓名</label>
            <div class="layui-input-block" style="width: 500px">
                <input type="text" name="ownerName" id="ownerName" placeholder="请输入（必填）" autocomplete="off" lay-verify="required" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">联系方式</label>
            <div class="layui-input-block" style="width: 500px">
                <input type="number" name="contactMobile" id="contactMobile" placeholder="请输入手机号（必填）" autocomplete="off" lay-verify="required|phone" class="layui-input">
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
                <textarea id="serviceContent" name="serviceContent" placeholder="请输入内容（可选）" class="layui-textarea"></textarea>
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

<script>
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
            area: ['700px', '500px'],
            cancel: function () {
                $("#form").hide()
            }
        });
//        window.location.href= "/maintain/online?company_id=" + id
    })

    var laydate = layui.laydate;
    laydate.render({
        elem: '#time',
        type: 'datetime'
    });
    //监听提交
    var form = layui.form;
    form.on('submit(orderSubmit)', function(data){
        if(!$("#time").val()){
            layer.msg("请选择预约时间", {icon: 5, time: 1500 })
            return
        }
        var token= localStorage.getItem("ACCESSTOKEN")
        if(!token){
            layer.msg('请登录后预约！', {time: 1000, icon:5},function () {
                window.open("/toLogin")
            })
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
            $("#form").hide()

        })
    });

})
</script>
</body>
</html>
