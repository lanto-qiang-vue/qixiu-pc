<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">质量信誉考核管理</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">管理中心</a> > <span>质量信誉考核管理</span></span>
        </div>
        <div style="width: 800px;margin-top: 10px">
            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">标题</label>
                <div class="layui-input-block">
                    <input id="title" type="text" name="title" placeholder="请输标题" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div style="display: inline-block">
                <label class="layui-form-label" style="margin-right: 15px">状态</label>
                <div id="cnt" class="layui-input-inline search_select hoverlist3"
                     style="width: 190px; margin-right: 3px;" data-value=""
                     data-tit="状态" data-type="cnt">
                    <div class="layui-unselect layui-form-select">
                        <div class="layui-select-title">
                            <input type="text" placeholder="请选择状态" value="" readonly=""
                                   class="layui-input layui-unselect">
                            <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                            <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>待发布</span>
                            </dd>
                            <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>已发布</span>
                            </dd>
                            <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>已撤销</span>
                            </dd>

                        </dl>
                    </div>
                </div>
            </div>
            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 30px">搜索</div>
            <div id="addButton" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" >添加</div>
            <%--<button type="button" class="layui-btn layui-btn-normal" id="upload">--%>
            <%--<i class="layui-icon">&#xe67c;</i>上传文件--%>
            <%--</button>--%>
            <%--<button type="button" class="layui-btn layui-btn-normal addButton" id="addButton">--%>
                <%--添加--%>
            <%--</button>--%>

        </div>
        <table id="table1" class="layui-table" lay-size="sm" style="width: 940px">
            <colgroup>
                <col width="200">
                <col width="340">
                <col width="200">
                <col width="150">
            </colgroup>
            <thead>
            <tr>
                <%--<th>文件分类</th>--%>
                <th>标题</th>
                <th>描述</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
    </div>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    $(function () {

        if (localStorage.getItem('USERINFO')) {
            var info = JSON.parse(localStorage.getItem('USERINFO'))
            console.log('role', info)
            if (info.userRoleId == 3) {
                $("#addButton").removeClass("addButton")
            }
        }

        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            search(10, 1, laypage)

        });

        $('#search').click(function () {
            search(10, 1, laypage)
        })


        $("#table1 tbody").on('click', '#review', function () {
            window.location.href = 'qualCheckDetail?id=' + $(this).attr('notid') + '&type=my'
        })
        $("#addButton").on('click', function () {
            window.location.href = 'addQualCheck'
        })


    });

    function search(pageSize, pageNo, laypage) {
        var ii = layer.load();
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (pageSize ? pageSize : 10),
            page: pageNo,
            status: $('.hoverlist3 .select-this').attr('data-value'),
            title: $('#title').val()
        }
        accessPost(baseu + '/reputation-assessmant/list', JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            console.log('res',res)
            if(res.data == null){
//                console.log('11111');
                layer.close(ii);
                return false;
            }
            var html = '', data = res.data.dataList;
            console.log('count',res.data.total)
            for (var i in data) {
                if(data[i].status == 1){
                    data[i].status = '待发布'
                }else if(data[i].status == 2){
                    data[i].status = '已发布'
                }else {
                    data[i].status = '已撤销'
                }

                html += '<tr><td>'+data[i].title+'</td><td>'+data[i].description+'</td><td>'+data[i].status+'</td><td><div  style="text-align: center;width: 100%"><button type="button" id="review" notid="'+data[i].id+'" class="layui-btn layui-btn-normal">详情</button></div></td></tr>'
            }
            $("#table1 tbody").html(html)

            if (laypage) {
                laypage.render({
                    elem: 'pagebar'
                    , count: res.data.total //数据总数，从服务端得到
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
    $('.hoverlist3 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist3 dl dd').removeClass('select-this');
            $(this).addClass('select-this');
        }
        var items = [];
        var titleItems = [];
        par.find('dl .select-this').each(function () {
            items.push($(this).attr('data-value'));
            titleItems.push($(this).find('span').text());
        });
        if (titleItems && titleItems.length > 0) {
            par.find('input').val(titleItems.join('|'));
            par.attr("title", titleItems.join('|'));
        } else {
            par.find('input').val(par.attr('data-tit'));
            par.attr("title", par.attr('data-tit'));
        }

        if (items && items.length > 0) {
            par.attr("data-value", items.join(','));
        } else {
            par.attr("data-value", '');
        }
    });
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
