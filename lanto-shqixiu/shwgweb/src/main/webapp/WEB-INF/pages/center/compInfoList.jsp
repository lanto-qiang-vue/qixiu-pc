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
            <span class="sp_zw">维修企业信息</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">管理中心</a> > <span>企业合格证使用信息管理</span></span>
        </div>
        <div class="biaoge" style="overflow: auto; margin-top: 10px">
            <%--<label id="areaLabel" class="layui-form-label" style="margin-right: 15px">区域</label>--%>
            <%--<div id="areaFilter" class="layui-input-inline search_select hoverlist2"--%>
                 <%--style="width: 190px; margin-right: 3px;" data-value=""--%>
                 <%--data-tit="企业区域" data-type="area">--%>
                <%--<div class="layui-unselect layui-form-select">--%>
                    <%--<div class="layui-select-title">--%>
                        <%--<input type="text" placeholder="企业区域" value="" readonly=""--%>
                               <%--class="layui-input layui-unselect">--%>
                        <%--<i class="layui-edge"></i>--%>
                    <%--</div>--%>
                    <%--<dl class="layui-anim layui-anim-upbit" id="areaList">--%>

                    <%--</dl>--%>
                <%--</div>--%>
            <%--</div>--%>
            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">企业名称</label>
                <div class="layui-input-block">
                    <input id="companyname" type="text" name="title" placeholder="请输入企业名称" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">许可证号</label>
                <div class="layui-input-block">
                    <input id="companyroadtransportationlicense" type="text" name="title" placeholder="请输入许可证号" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <%--<div style="display: inline-block">--%>
                <%--<label class="layui-form-label" style="margin-right: 15px">是否对接</label>--%>
                <%--<div id="cnt" class="layui-input-inline search_select hoverlist3"--%>
                     <%--style="width: 190px; margin-right: 3px;" data-value=""--%>
                     <%--data-tit="是否对接" data-type="cnt">--%>
                    <%--<div class="layui-unselect layui-form-select">--%>
                        <%--<div class="layui-select-title">--%>
                            <%--<input type="text" placeholder="请选择" value="" readonly=""--%>
                                   <%--class="layui-input layui-unselect">--%>
                            <%--<i class="layui-edge"></i>--%>
                        <%--</div>--%>
                        <%--<dl class="layui-anim layui-anim-upbit">--%>
                            <%--<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span></dd>--%>
                            <%--<dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>是</span>--%>
                            <%--</dd>--%>
                            <%--<dd data-value="0" class=""><i class="layui-icon">&#xe605;</i> <span>否</span>--%>
                            <%--</dd>--%>
                        <%--</dl>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
            <div style="margin-left: 60px">
                <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-top: 10px">搜索</div>

            <%--<div id="export" class="layui-btn layui-btn-normal" lay-filter="formDemo" style="margin-top: 10px">导出</div>--%>
            </div>
            <table id="table1" class="layui-table" lay-size="sm" style="width: 1000px">
                <colgroup>
                    <col width="100">
                    <col width="80">
                    <%--<col width="60">--%>
                    <col width="200">
                    <col width="80">
                    <col width="80">
                    <col width="80">
                    <col width="100">
                </colgroup>
                <thead>
                <tr>
                    <th>单位名称</th>
                    <th>许可证号</th>
                    <%--<th>备案证号</th>--%>
                    <th>经营范围</th>
                    <th>当年累计发放量</th>
                    <th>去年累计发放量</th>
                    <th>去年累计销证量</th>
                    <%--<th>有效日期</th>--%>
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
        // 初始查询数据
//        doSearch()

        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例

            doSearch(1, 10, laypage);

        });

    })

    function doSearch(pageNo, pageSize, laypage) {
        var loading = layer.load();
        var areaKey = getUrlParam('areaKey')
        accessPost(baseu + '/company/repaircompany/query/company/detail',
                JSON.stringify({
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    page: pageNo ? pageNo : 1,
                    size: pageSize ? pageSize : 10,
                    companyname: $('#companyname').val(),
                    companyroadtransportationlicense: $('#companyroadtransportationlicense').val()
                }),
                function (resp) {
                    handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
                    layer.close(loading);

                    var datas = resp.data, html = '';
                    for (var i in datas) {
                        html += '<tr id="' + datas[i].companyId + '">' +
                                '<td>' + datas[i].companyname.replace(/\"/g, "") + '</td>' +
                                '<td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td>' +
                                '<td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td>' +
                                '<td>' + datas[i].thisYearNum + '</td>' +
                                '<td>' + datas[i].lastYearNum + '</td>' +
                                '<td>' + datas[i].lastYearSalesVolume + '</td></tr>'
                    }

                    $("#table1 tbody").html(html)

                    if(laypage){
                        layui.use('laypage', function () {
                            var laypage = layui.laypage;

                            //执行一个laypage实例
                            laypage.render({
                                elem: 'pagebar' //注意，这里的 test1 是 ID，不用加 # 号
                                , count: resp.total //数据总数，从服务端得到
                                , jump: function (obj, first) {
                                    //obj包含了当前分页的所有参数，比如：
                                    console.log('first: ', first);
                                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                    console.log(obj.limit); //得到每页显示的条数
                                    //首次不执行
                                    if (!first) {
                                        doSearch(obj.curr, obj.limit)
                                    }
                                }
                            });
                        });
                    }

                }
        )
    }

    $("#table1 tbody").on('click', 'tr', function () {
        //根据权限判断用户是否可以查看明细
        var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
        if (!userInfo || !userInfo.userRoleId) {
            return;
        }

        window.location.href = 'certificateIssuanceList?company_id=' + $(this).attr('id')
//
//            if (userInfo.userRoleId == 3 || userInfo.userRoleId == 6) {
//                //管理部门用户无法进入详情页面
//                return;
//            }
//
//            if (userInfo.userRoleId == 7) {
//                window.location.href = 'companyRecord?company_id=' + $(this).attr('id')
//            }
    })

    $('.hoverlist2 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist2 dl dd').removeClass('select-this');
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

    $('#search').click(function () {
        var laypage = layui.laypage;
        doSearch(1, 10, laypage);
    });

</script>
</html>
