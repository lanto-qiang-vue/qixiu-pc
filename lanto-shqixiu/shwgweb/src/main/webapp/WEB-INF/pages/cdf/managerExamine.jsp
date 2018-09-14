<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">车大夫管理</span> <span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>车大夫管理</span></span>
        </div>
        <div class="biaoge">

            <form class="layui-form" >
                <div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
                    <label class="layui-form-label">姓名</label>
                    <div class="layui-input-block">
                        <input id="name" type="text" name="name"  placeholder="请输入姓名" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
                    <label class="layui-form-label">职称</label>
                    <div class="layui-input-block">
                        <input id="professor" type="text" name="professor"  placeholder="请输入职称" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item" style="width: 300px;margin-top: 20px;display: inline-block">
                    <label class="layui-form-label">就职企业</label>
                    <div class="layui-input-block">
                        <input id="empUnit" type="text" name="empUnit"  placeholder="请输入就职企业" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <%--<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo"  onclick="search(10,1)" style="margin-left: 60px;">搜索</div>--%>
                <%--<div id="add" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">添加</div>--%>
                <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo"  onclick="search(10,1)" style="margin-left:30px;">搜索</div>
                <div id="add" class="layui-btn layui-btn-normal isHide" lay-submit lay-filter="formDemo" >添加</div>
            </form>
            <table id="table1" class="layui-table" lay-size="sm" style="width: 100%">
                <colgroup>
                    <col width="50"><col width="200"><col width="150"><col width="150"><col width="150"><col width="300">
                </colgroup>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>操作</th>
                    <th>姓名</th>
                    <th>职称</th>
                    <th>就职企业</th>
                    <th>专业擅长</th>
                    <th>主要荣誉</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

            <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    var info = JSON.parse(localStorage.getItem('USERINFO'));
    var roleId = info.userRoleId || '';
    var onsiteServiceId = null;
    var laypageA = layui.laypageA;
    var laypage = layui.laypage;
    var count = 0;
    var currPage = 1;
    var dialogCount = 0;
    var dialogCurrPage = 1;
    var targetAnswerId = null;

    $(function(){
        layui.use('laypage', function(){
            //执行一个laypage实例
            search(10, 1, laypage)

        });
    });

    function search(limit, page, laypage) {
        if(!laypage){
            laypage = layui.laypage;
        }

        var ii = layer.load();
        currPage = page;
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (limit ? limit : 10),
            page: page,
            name: $('#name').val(),
            professor: $('#professor').val(),
            empUnit: $('#empUnit').val()
        }
        accessPost(baseu+ '/cdf/manager/list', JSON.stringify(param), function (res) {
            console.log(res)
            if(res && res.code === "000000"){
            var html='', data=res.data.dataList;
            console.log(data);
                for (var i in data){
                    html+='<tr name="'+data[i].expertId+'"><td>'+(parseInt(i)+1)+'</td>' +
                        '<td><button class="layui-btn layui-btn-normal layui-btn-small" onclick="detailRow(' + data[i].expertId + ')">详情</button>' +
                        '<button class="layui-btn layui-btn-danger layui-btn-small" style="margin-left: 10px;" onclick="deleteRow(' + data[i].expertId + ')">删除</button>'+
                        ' <td>'+(data[i].name || '')+'</td>'+
                        ' <td>'+(data[i].professor || '')+'</td>' +
                        ' <td>' + (data[i].empUnit || '') + '</td>' +
                        ' <td>' + (data[i].goodAt || '') + '</td>' +
                        ' <td>' + (data[i].honor || '') + '</td>' +
                        ' </tr>'
                }
            $("#table1 tbody").html(html)

            if(laypage){
                laypage.render({
                    elem: 'pagebar'
                    ,count: res.data.total //数据总数，从服务端得到
                    ,curr: currPage
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        currPage = obj.curr;
                        //首次不执行
                        if(!first){
                            search(limit, obj.curr)
                            //do something
                        }
                    }
                });
            }
            layer.closeAll();
            }else {
                layer.msg(res.status, {time: 2000, icon:0});
                layer.close(ii);
            }

        })
    }
    function searchA(id, laypageA) {
        layer.load()
        var accessToken = localStorage.getItem('ACCESSTOKEN');
        var id = id;
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            answerId:id
        }
        accessPost(baseu + '/cdf/queryexpertdetail' , JSON.stringify(param), function (res) {
            console.log("res",res)
            var datas = res.data;
            $("#name").val(formatStatusToStatusName(datas.name));
            $("#professor").val(datas.professor);
            $("#empUnit").val(datas.empUnit);
            $("#goodAt").val(datas.goodAt);
            $("#honor").val(datas.honor);

            dialogCount = res.count;

            if(laypageA){
                laypageA.render({
                    elem: 'pagebarA'
                    ,count: res.total //数据总数，从服务端得到
                    ,curr: dialogCount
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        dialogCount = obj.curr;
                        //首次不执行
                        if(!first){
                            searchA(10, obj.curr)
                        }
                    }
                });
            }
            layer.closeAll('loading');

        })
    }

    $("#searchA").on('click', function () {
        searchA(10, 1, laypageA)
    })
    $("#add").on('click', function () {
        window.location.href = '/center/addExpert';
    })
    function detailRow(expertId){
        window.location.href = '/center/addExpert?id=' + expertId;
    }
    function showDetail(id){
        console.log("id",id)
        onsiteServiceId = id;
        showDialog(id);
    }
    //刪除
    function deleteRow(expertId){
        layer.confirm('确认删除该条数据吗?', {icon: 3, title:'提示'}, function(index){
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                expertId : expertId
            };
            accessPost(baseu+ '/cdf/manager/delete/' + expertId, JSON.stringify(param), function (res) {
                console.log(res);
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    search(10, 1, laypage);
                });
                layer.close(ii);
                layer.msg(res.status);

            })

            layer.close(index);
        }, function(index){
            //按钮【按钮二】的回调
            layer.close(index);
        });
    }
</script>
</html>
