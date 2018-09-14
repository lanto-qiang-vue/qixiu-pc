<%--
  Created by IntelliJ IDEA.
  User: lvjj
  Date: 2018/2/5
  Time: 16:27
  To change this template use File | Settings | File Templates.
--%>
<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <%--<script src="${btx}/js/front/myQuestions.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">简历中心</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/userInfo">车主中心</a> > <span>简历中心</span></span>
        </div>
        <div class="biaoge">
            </br>
            <button class="layui-btn layui-btn-normal layui-btn-xs" onclick="addresume()" style="font-size:10px">新增简历</button>
            <table class="gridtable">
                <tr>
                    <th width="20%" align="center">简历</th>
                    <th width="20%" align="center">创建时间</th>
                    <th width="15%" align="center">是否公开简历</th>
                    <th width="15%" align="center">操作</th>
                </tr>
                <tbody id="tablebody">

                </tbody>
            </table>

            <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
        </div>
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
$(function () {
    var param={
        accessToken: localStorage.getItem('ACCESSTOKEN'),
    }
    accessPost(baseu+ '/center/getResumeList', JSON.stringify(param), function (res) {
        /*console.log(res)*/
        var html = '', data = res.data;
        for (var i in data){
            var open = '';
            open += '<input type="checkbox" name="open" onclick="checkboxOnclick(this,'+data[i].id+')" ';
            if(data[i].open){
                open += 'checked';
            }
            open += '/>'
            var editButtonHtml = ( '<button class="layui-btn layui-btn-normal layui-btn-xs" onclick="updateResume(' + data[i].id + ')" style="font-size:10px">编辑</button>' );
            var delectButtonHtml = ( '<button class="layui-btn layui-btn-normal layui-btn-xs" onclick="delectResume(' + data[i].id + ')" style="font-size:10px">删除</button>' );
            html+='<tr>' +
                '<td>'+("我的简历")+'</td>' +
                '<td>'+formatDate(data[i].createTime, "yyyy-MM-dd hh:mm:ss")+'</td> '+
                '<td>'+ open + '</td>' +
                '<td>'+ editButtonHtml + delectButtonHtml + '</td>'
                +'</tr>'
        }
        $("#tablebody").html(html)
    });
});
function delectResume(id){
    console.log('id');
    var ii = layer.load();
    var laypage = layui.laypage;
    layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            id: id
        }
        accessPost(baseu+ '/center/delectResume', JSON.stringify(param), function (res) {
            console.log('res: ', res);
            var message = responseMessageMaker(res, "${ctx}");
            layer.msg(message, {
                icon: 1,
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            }, function(){
                window.location.href ="${ctx}/center/resumeCenter";
            });
        })
        layer.closeAll();
        layer.close(index);
    }, function(index){
        //按钮【按钮二】的回调
        layer.closeAll();
        layer.close(index);
    });
}

    function updateResume(id)
    {
        // location.href='ctx/center/addResume?id=id';
        window.location.href = "${ctx}/center/addResume?id="+id;
    }

    function addresume()
    {
        // location.href='ctx/center/addResume?id=id';
        window.location.href = "${ctx}/center/addResume";
    }

    function checkboxOnclick(checkbox,id) {
        if ( checkbox.checked == true){
            var openid = 1;
        }else{
            var openid= 0;
        }
       /* var ii = layer.load();
        var laypage = layui.laypage;
        layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){*/
            var param={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                open: openid,
                id : id
            }
            accessPost(baseu+ '/center/openResume', JSON.stringify(param), function (res) {
                console.log('res: ', res);
                var message = responseMessageMaker(res, "${ctx}");
                layer.msg(message, {
                    icon: 1,
                    time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                }, function(){
                    layer.closeAll('loading');
                });
              })
        /*  layer.closeAll();
         layer.close(index);
     }, function(index){
         //按钮【按钮二】的回调
         layer.closeAll();
         layer.close(index);
     });*/
    }
</script>
</html>

