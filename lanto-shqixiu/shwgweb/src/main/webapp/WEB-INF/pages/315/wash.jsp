<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <script src="${btx}/js/front/login.js"></script>
    <link rel="stylesheet" type="text/css" href="${btx}/css/315.css">
<style>
    .huiming{
        width: 130px;
        height: 60px;
        /*border: 1px solid black;*/
        position: absolute;
        top: 430px;
        right: 210px;
        display: block;
    }
    .toregister{
        width: 100px;
        height: 30px;
        /*border: 1px solid black;*/
        position: absolute;
        left: 164px;
        bottom: 560px;
        display: block;
    }
</style>
</head>
<body>
<div class="content">
    <img src="${btx}/images/315/wash.jpg"/>
    <div class="info">
        <img class="head" src="${btx}/images/315/washhead.png"/>
        <br/>
        <form class="layui-form" style="display: inline-block;text-align: left"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
            <div class="layui-form-item">
                <label class="layui-form-label" style="color: #941f25">预约日期</label>
                <div class="layui-input-block" >
                    <input type="text" class="layui-input" id="date">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label" style="margin-right: 30px;color: #941f25">选择门店</label>
                <div class="layui-inline"  style="width: 80px">
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

                </div>
                <div class="layui-inline" >
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
            <%--<div class="layui-form-item">--%>
                <%--<label class="layui-form-label" >联系电话</label>--%>
                <%--<div class="layui-input-block" >--%>
                    <%--<input type="text" class="layui-input" id="tel">--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="layui-form-item">--%>
                <%--<label class="layui-form-label" >联系人</label>--%>
                <%--<div class="layui-input-block" >--%>
                    <%--<input type="text" class="layui-input" id="name">--%>
                <%--</div>--%>
            <%--</div>--%>
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

    $(".sub").click(function () {
//        console.log(new Date($("#date").val()).toISOString())
        var token= localStorage.getItem("ACCESSTOKEN")
        if(!token){
            layer.msg('请登录后预约！', {time: 1000, icon:5},function () {
//                window.open("/toLogin")
                window.location.href =  "/toLogin?reUrl=/315/wash"
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
                    layer.msg(res.status, {time: 2000, icon:5});
                }
            })
        })
    }

})
</script>
</body>
</html>
