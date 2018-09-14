<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
    <%--<%@ include file="/WEB-INF/pages/common/icon.jsp"%>--%>

    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <script src="${btx}/js/front/login.js"></script>
    <link rel="stylesheet" href="${btx}/css/phone.css" />
<style>
    body{
        text-align: center;
        /*min-height: 100vh;*/
        background-color: #ee3847;
    }
    .content{
        display: inline-block;
        text-align: center;
        min-height: 100vh;
        width: 100%;
        max-width: 414px;
        background: url("${btx}/img/hiteggs/bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .title{
        width: 100%;
        margin-bottom: 20%;
    }
    .info{
        padding: 10px;
        background-color: #e4bfab;
        border-radius: 10px;
        text-align: center;
        width: 90%;
        left: 0;
        right: 0;
        margin: auto;
    }
    .info .head{
        width: 120px;
        margin-bottom: 10px;
    }
    .msg{
        font-size: 18px;
        color: #941f25;
    }
    .info input{
        border-radius: 10px;
        border: 1px solid #bc6c53;
    }

    .info #add{
        line-height: 38px;
        color: #941f25;
    }

    .info .sub{
        width: 150px;
        cursor: pointer;
    }
    .layui-form-select{
        margin-bottom: 5px;
    }
</style>
</head>
<body>
<div class="content">
    <img class="title" src="${btx}/img/hiteggs/title.png"/>
    <div class="info">
        <%--<img class="head" src="${btx}/images/315/washhead.png"/>--%>
        <p class="msg">请预约1元洗车门店</p>
        <br/>
        <form class="layui-form" style="width: 100%;text-align: left"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
            <div class="layui-form-item">
                <label class="layui-form-label" style="color: #941f25">预约日期</label>
                <div class="layui-input-block" >
                    <input type="text" class="layui-input" id="date">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label" style="color: #941f25">选择门店</label>
                <div class="layui-input-block" >
                    <select id="area" lay-filter="area" >
                        <option value="">区域</option>
                        <option value="310101"> 黄浦区</option>
                        <option value="310104"> 徐汇区</option>
                        <option value="310105"> 长宁区</option>
                        <option value="310106"> 静安区</option>
                        <option value="310107"> 普陀区</option>
                        <option value="310109"> 虹口区</option>
                        <option value="310110"> 杨浦区</option>
                        <option value="310112"> 闵行区</option>
                        <option value="310113"> 宝山区</option>
                        <option value="310114"> 嘉定区</option>
                        <option value="310115"> 浦东新区</option>
                        <option value="310116"> 金山区</option>
                        <option value="310117"> 松江区</option>
                        <option value="310118"> 青浦区</option>
                        <option value="310120"> 奉贤区</option>
                        <option value="310230"> 崇明区</option>
                    </select>
                    <select id="store" lay-filter="store">
                        <option value="">门店</option>
                    </select>
                </div>
            </div>
            <div class="layui-form-item address">
                <label class="layui-form-label" style="color: #941f25">门店名称</label>
                <div class="layui-input-block" >
                    <%--<input type="text" class="layui-input" id="add" readonly="">--%>
                    <span id="add"></span>
                </div>
            </div>

        </form>
        <br/>
        <img src="${btx}/images/315/washbutton.png" class="sub"/>
    </div>

    <a class="huiming" href="/315/youhui"></a>
    <a class="toregister" href="/toLogin"></a>
</div>

<script>
$(function () {
    var form = layui.form;
    var laydate = layui.laydate;
    var cominfo=[];
    laydate.render({
        elem: '#date', //指定元素
        format: 'yyyy/MM/dd'
        ,min: 0
        ,max: "2018-04-30"
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

    $(".sub").click(function () {
//        console.log(new Date($("#date").val()).toISOString())
        var token= localStorage.getItem("ACCESSTOKEN")
        if(!token){
            layer.msg('请登录后预约！', {time: 1000, icon:5},function () {
//                window.open("/toLogin")
                window.location.href =  "/toLogin?reUrl=/phone/wash"
            })
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
                "corpId": $("#store").val(),
                "property": 2,
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
                    layer.msg(res.status, {time: 2000, icon:5});
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
            simplePost(baseu+'/activity/tuhuList',JSON.stringify(param),function (res) {
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
                    layer.msg(res.status, {time: 2000, icon:5});
                }
            })
        })
    }

})
</script>
</body>
</html>
