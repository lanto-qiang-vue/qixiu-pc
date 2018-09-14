<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <script src="/statics/js/lib/simple-calendar.js"></script>
    <link rel="stylesheet" href="/statics/js/lib/simple-calendar.css" >
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">企业登录信息</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">管理中心</a> > <span>管理部门登录信息</span></span>
        </div>
        <div style="margin-top: 10px">

            <form class="layui-form"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">日期范围</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" name="date" id="date" placeholder="请选择" >
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">是否登录</label>
                    <div class="layui-input-block">
                        <select id="isLogin" >
                            <option value="yes" selected>有登录</option>
                            <option value="no">未登录</option>
                        </select>
                    </div>
                </div>
                <%--<div class="layui-form-item layui-inline" style="width: 300px">--%>
                    <%--<label class="layui-form-label">用户类型</label>--%>
                    <%--<div class="layui-input-block">--%>
                        <%--<select id="type" lay-filter="type">--%>
                            <%--<option value="company" selected>企业</option>--%>
                            <%--<option value="manager">管理部门</option>--%>
                        <%--</select>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="layui-form-item layui-inline compname" style="width: 300px">--%>
                    <%--<label class="layui-form-label">企业名称</label>--%>
                    <%--<div class="layui-input-block">--%>
                        <%--<input type="text" class="layui-input" id="name" >--%>
                    <%--</div>--%>
                <%--</div>--%>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">所属辖区</label>
                    <div class="layui-input-block">
                        <select id="area" >
                            <option value="">全部</option>

                        </select>
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label"></label>
                    <div class="layui-input-block">
                        <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">搜索</div>
                        <%--<div id="addButton" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" >添加</div>--%>
                    </div>
                </div>
            </form>


        </div>
        <table id="table1" class="layui-table" lay-size="sm" style="">
            <colgroup>
                <col width="300">
                <col width="80">
                <col width="200" class="card">
                <col width="80">
                <col width="200">
                <col width="80">
            </colgroup>
            <thead>
            <tr>
                <th>名称</th>
                <th>区域</th>
                <th class="card">经营许可证</th>
                <th>登录次数</th>
                <th>最后登录时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
    </div>
</div>

<div id="form" style="display: none;padding: 10px">
    <table id="table2" class="layui-table" lay-size="sm" style="">
        <colgroup>
            <col width="300">
            <%--<col width="120">--%>
            <col width="100">
            <col width="200">
        </colgroup>
        <thead>
        <tr>
            <th>名称</th>
            <%--<th>登录ip</th>--%>
            <th>登录方式</th>
            <th>登录时间</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    <div id="pagebar2" style="text-align:center;margin-top:5px;"></div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    var startDate= '', endDate= '';
    $(function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#date',
            type: 'date',
            format: 'yyyy-MM-dd',
            range: '~',
            max: 0
        });

        var form = layui.form;
//        form.on('select(type)', function(data){
//            if(data.value=='manager')
//                $(".compname").hide()
//            else
//                $(".compname").show()
//        });


        simplePost(baseu+ '/company/area/infos?accesstoken='+localStorage.getItem('ACCESSTOKEN'), '', function (res) {
            console.log(res)
            var html='', areas= res.areaRespPos;
            for(var i in areas){
                if(areas[i])
                html+= '<option value="'+ areas[i].areaKey +'">'+areas[i].areaSimpleName+'</option>'
            }
            $("#area").append(html)
            form.render()
        })

        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            search(10, 1, laypage)

        });
        var laypage2 = layui.laypage;

        $('#search').click(function () {
            search(10, 1, laypage2)
        })
    });

    function search(pageSize, pageNo, laypage) {
        var ii = layer.load();

        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: (pageSize ? pageSize : 10),
            pageNum: pageNo,
//            date: $("#date").val(),
            startDate: $("#date").val()?$("#date").val().split("~")[0].trim():'',
            endDate: $("#date").val()?$("#date").val().split("~")[1].trim():'',
            isLogin: $("#isLogin").val(),
            type: "manager",
//            comanyName: $("#name").val().trim(),
            areaKey: $("#area").val()

        }
        accessPost(baseu + '/company/repaircompany/company/login/records', JSON.stringify(param), function (res) {
            console.log('res',res)
            if(res.code=='000000'){
                startDate= $("#date").val()?$("#date").val().split("~")[0].trim():'';
                endDate= $("#date").val()?$("#date").val().split("~")[1].trim():''
                var html='', datas=res.loginRecords;
                for( var i in datas){
                    html+='<tr>' +
                        '<td>'+datas[i].name+'</td>' +
                        '<td>'+datas[i].areaName+'</td>' +
                        (datas[i].roadPermit?('<td class="card">'+(datas[i].roadPermit||'无')+'</td>'):'') +
                        '<td>'+datas[i].todayCount+'</td>' +
                        '<td>'+(datas[i].lastLogin||'无')+'</td>' +
                        '<td>'+(datas[i].todayCount?('<div class="layui-btn layui-btn-normal" onclick="detail(\''+datas[i].loginType+'\',\''+datas[i].id+'\',\''+ datas[i].name+'\')">查看</div>'):'无')+'</td>' +
                    '</tr>'
                }
                if($("#type").val()=='company'){
                    $(".card").show()
                }else{
                    $(".card").hide()
                }
                $("#table1 tbody").html(html)
            }

            if (laypage) {
                laypage.render({
                    elem: 'pagebar'
                    , count: res.totalCount //数据总数，从服务端得到
                    ,layout: ['count', 'prev', 'page','next']
                    , jump: function (obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        //首次不执行
                        if (!first) {
                            search(pageSize, obj.curr)
                            //do something

                        }
                    }
                });
            }
            layer.close(ii);
        })
    }

    function detail(type, id, name) {
        search2(10, 1, laypage,type, id, name)
        layer.open({
            type: 1,
            content: $('#form'),
            title: "登录详情",
            area: ['700px', '500px'],
            cancel: function () {
                $("#form").hide()
            }
        });
    }

    function search2(pageSize, pageNo, laypage, type, id, name) {
        var ii = layer.load();
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: (pageSize ? pageSize : 10),
            pageNum: pageNo,
            loginTime: startDate,
            endTime: endDate,
            companyId: type=='company'? id : '',
            userId: type=='company'? '' : id
        }
        accessPost(baseu + '/company/repaircompany/company/login/records/details', JSON.stringify(param), function (res) {
            console.log('res', res)
            if(res.code=='000000'){
                var html='', datas=res.list;
                for( var i in datas){
                    html+='<tr>' +
                        '<td>'+name+'</td>' +
                        '<td>'+datas[i].loginMethod+'登录</td>' +
                        '<td>'+datas[i].loginTime+'</td>' +
                    '</tr>'
                }
                $("#table2 tbody").html(html)
            }

            if (laypage) {
                laypage.render({
                    elem: 'pagebar2'
                    , count: res.count //数据总数，从服务端得到
                    ,layout: ['count', 'prev', 'page','next']
                    , jump: function (obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        //首次不执行
                        if (!first) {
                            search2(pageSize, obj.curr , '', type, id, name)
                            //do something

                        }
                    }
                });
            }
            layer.close(ii);
        })
    }
</script>
<style>
    #table1 a {
        color: #4ba7f5;
    }

    .addButton {
        display: none;
    }
</style>
</html>
