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
            <span class="sp_zw">岗位管理</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">企业中心</a> > <span>岗位管理</span></span>
        </div>
        <div>

            <div style="width: 300px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">关键字</label>
                <div class="layui-input-block">
                    <input id="keyword" type="text" name="keyword" placeholder="请输关键字" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div style="width: 300px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">岗位</label>
                <div class="layui-input-block">
                    <input id="postName" type="text" name="postName" placeholder="请输岗位" autocomplete="off"
                           class="layui-input">
                </div>
            </div>

            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo"
                 style="margin-left: 60px">搜索
            </div>
            <div id="retPost" class="layui-btn layui-btn-normal"
                 style="margin-left: 60px">岗位管理
            </div>
        </div>
        <div class="biaoge" style="overflow: auto">
            <table id="table1" class="layui-table" lay-size="sm" style="width: 1200px">
                <colgroup>
                    <col width="111">
                    <col width="80">
                    <col width="80">
                    <col width="80">
                    <col width="100">
                    <col width="150">
                    <col width="150">
                    <col width="50">
                </colgroup>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>工作年限</th>
                    <th>性别</th>
                    <th>学历</th>
                    <th>期望岗位</th>
                    <th>投递时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

            <div id="pagebarA" style="text-align:center;margin-top:5px;"></div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    var laypage = layui.laypage;
    var id = getUrlParam('id');
    console.log('id', id);
    $(function () {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            if (id) {
                searchA(10, 1, laypage);
            }
        });

    })

    function searchA(limit, page, laypageA) {
        layer.load()
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: (limit ? limit : 10),
            pageNo: page,
            postName: $('#postName').val(),
            keyword: $('#keyword').val(),
            postId: id
        }
        accessPost(baseu + '/post/resume/list', JSON.stringify(param), function (res) {
            console.log('res', res)
            var datas = res.data, html = '';

            for (var i in datas) {
                html += '<tr><td>' + (datas[i].realName ? datas[i].realName : '') + '</td>' +
                    '<td>' + datas[i].age + '</td>' +
                    '<td>' + (datas[i].experience ? datas[i].experience : 0) + '年</td>' +
                    '<td>' + (datas[i].sex == 1 ? '男' : '女') + '</td>';
                if (datas[i].degree == 1) {
                    html += '<td>本科</td>';
                }
                if (datas[i].degree == 2) {
                    html += '<td>大专</td>';
                }
                if (datas[i].degree == 3) {
                    html += '<td>中专</td>';
                }
                if (datas[i].degree == 4) {
                    html += '<td>高中</td>';
                }
                if (datas[i].degree == 5) {
                    html += '<td>初中及以下</td>';
                }

                html += '<td>' + (datas[i].expectPost ? datas[i].expectPost : '') + '</td>';
                html += '<td>' + (datas[i].applyTime ? formatDate(datas[i].applyTime, 'yyyy-MM-dd hh:mm:ss') : '') + '</td>';
                var infoBtn = '<button type="button" class="manageNotes-buttom" id="mn-info" resumeId="' + datas[i].resumeId + '">查看</button>';
                html += '<td>' + infoBtn + '</td></tr>';
            }

            $("#table1 tbody").html(html)
            if (laypageA) {
                laypageA.render({
                    elem: 'pagebarA'
                    , count: res.total //数据总数，从服务端得到
                    , layout: ['count', 'prev', 'page', 'next']
                    , jump: function (obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if (!first) {
                            searchA(limit, obj.curr)
                            //do something
                        }
                    }
                });
            }
            layer.closeAll('loading');

        })
    }

    $("#search").on('click', function () {
        if (id) {
            searchA(10, 1, laypage)
        }
    });

    $("#retPost").on('click', function () {
        window.location.href = 'companyPost'
    })

    //详情
    $("#table1 tbody").on('click', '#mn-info', function () {
        window.location.href = 'resumeInfo?id=' + $(this).attr('resumeId') + '&type=info'
    })
</script>
</html>
