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
            <span class="sp_zw">维修企业员工信息</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">管理中心</a> > <span>维修企业员工信息</span></span>
        </div>
        <div class="biaoge" style="overflow: auto; margin-top: 10px">
            <div style="width: 300px;display: inline-block" id="areaLabel">
                <label class="layui-form-label" style="margin-right: 15px">区域</label>
                <div id="areaFilter" class="layui-input-inline search_select hoverlist2"
                     style="width: 190px; margin-right: 3px;" data-value=""
                     data-tit="企业区域" data-type="area">
                    <div class="layui-unselect layui-form-select">
                        <div class="layui-select-title">
                            <input type="text" placeholder="企业区域" value="" readonly=""
                                   class="layui-input layui-unselect">
                            <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit" id="areaList">

                        </dl>
                    </div>
                </div>
            </div>
            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">企业名称</label>
                <div class="layui-input-block">
                    <input id="companyname" type="text" name="title" placeholder="请输入企业名称" autocomplete="off"
                           class="layui-input">
                </div>
            </div>

            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px;">搜索</div>

            <%--<div id="export" class="layui-btn layui-btn-normal" lay-filter="formDemo">导出</div>--%>
            <table id="table1" class="layui-table" lay-size="sm" style="width: 100%">
                <colgroup>
                    <col width="60" id="tableAreaCol">
                    <col width="120">
                    <col width="60">
                    <col width="60">
                </colgroup>
                <thead>
                <tr>
                    <th id="tableArea">区域</th>
                    <th>企业名称</th>
                    <th>许可证号</th>
                    <th>人员数量</th>
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
        function companyCategoryFilter(code) {
            var categoryArr = [{code: '43', value: '一类维修企业'},{code: '44', value: '二类维修企业'},{code: '45', value: '三类维修企业'},{code: '46', value: '摩托车维修业户'},{code: '47', value: '汽车快修业户'}];
            if(code != null && code != '') {
                for(var i in categoryArr) {
                    if(code == categoryArr[i].code) {
                        return categoryArr[i].value;
                    }
                }
            } else {
                return '';
            }
        }

        var isFirst = true;
        function sendRequest(pageNo, pageSize) {
            var ii = layer.load();
            var areaKey = getUrlParam('areaKey');
            var companycategory = getUrlParam('companycategory');
            if(companycategory != '' && companycategory != null) {
                $('#companycategoryFilter').hide();

            }
            accessPost(baseu + '/company/repaircompany/getEmployeeList',
                JSON.stringify({
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    pageNo: pageNo,
                    pageSize: pageSize,
                    area: areaKey != null ? areaKey : $('.hoverlist2').attr('data-value'),
                    companyname: $('#companyname').val()
                }),
                function (resp) {
                    handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
                    console.log('resp',resp);
                    var areas = resp.area || []
                    if (areas.length > 1 && (areaKey == null || areaKey == '')) {
                        var areaHtml = '<dd data-value=\"\" class=""><i class=\"layui-icon\">&#xe605;</i> <span>全部</span></dd>'
                        for (var j in areas) {
                            areaHtml += '<dd data-value=\"' + areas[j].areaKey + '\" class=\"\"><i class=\"layui-icon\">&#xe605;</i> <span>' + areas[j].areaName + '</span></dd>'
                        }
                        $("#areaList").html(areaHtml);

                        var value = $('.hoverlist2').attr('data-value');
                        if (value != '') {
                            $('.hoverlist2 dd[data-value=' + value + ']').addClass('select-this');
                        }
                    } else {
                        $('#areaLabel').hide()
                        $('#areaFilter').hide()
                    }

                    var datas = resp.data, html = '';
                    if (areas.length > 1 && (areaKey == null || areaKey == '')) {
                        for (var i in datas) {
                            html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].area + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].staffnumber ? datas[i].staffnumber : 0) + '</td></tr>'
                        }
                    } else {
                        $('#tableArea').hide();
                        $('#tableAreaCol').hide();
                        for (var i in datas) {
                            html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].staffnumber ? datas[i].staffnumber : 0) + '</td></tr>'
                        }
                    }
                    $("#table1 tbody").html(html);

                    if(companycategory != '' && companycategory != null) {
                        $('col[name=companyCategoryTd]').hide();
                        $('th[name=companyCategoryTd]').hide();
                        $('td[name=companyCategoryTd]').hide();
                    }

                    layer.close(ii);
                }
            )
        }

        function doSearch() {
            var loading = layer.load();
            var areaKey = getUrlParam('areaKey');
            var companycategory = getUrlParam('companycategory');

            if(companycategory != '' && companycategory != null) {
                $('#companycategoryFilter').hide();
            }

            accessPost(baseu + '/company/repaircompany/getEmployeeList',
                JSON.stringify({
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    pageNo: 1,
                    pageSize: 10,
                    area: areaKey != null ? areaKey : $('.hoverlist2').attr('data-value'),
                    cnt: (isFirst && (areaKey || (companycategory != null))) ? 1 : $('.hoverlist3 .select-this').attr('data-value'),
                    companyname: $('#companyname').val(),
                    companycategory: companycategory ? companycategory : $('.hoverlist4 .select-this').attr('data-value')
                }),
                function (resp) {
                    handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
                    console.log('resp',resp);
                    var areas = resp.area || []
                    if (areas.length > 1 && (areaKey == null || areaKey == '')) {
                        var areaHtml = '<dd data-value=\"\" class=""><i class=\"layui-icon\">&#xe605;</i> <span>全部</span></dd>'
                        for (var j in areas) {
                            areaHtml += '<dd data-value=\"' + areas[j].areaKey + '\" class=\"\"><i class=\"layui-icon\">&#xe605;</i> <span>' + areas[j].areaName + '</span></dd>'
                        }
                        $("#areaList").html(areaHtml)

                        var value = $('.hoverlist2').attr('data-value');
                        if (value != '') {
                            $('.hoverlist2 dd[data-value=' + value + ']').addClass('select-this');
                        }
                    } else {
                        $('#areaLabel').hide()
                        $('#areaFilter').hide()
                    }

                    var datas = resp.data, html = '';
                    if (areas.length > 1 && (areaKey == null || areaKey == '')) {
                        for (var i in datas) {
                            html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].area + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].staffnumber ? datas[i].staffnumber : 0) + '</td></tr>'
                        }
                    } else {
                        $('#tableArea').hide();
                        $('#tableAreaCol').hide();
                        for (var i in datas) {
                            html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].staffnumber ? datas[i].staffnumber : 0) + '</td></tr>'
                        }
                    }
                    $("#table1 tbody").html(html);

                    if(isFirst && (areaKey || (companycategory != null))) {
                        $('.hoverlist3 dd[data-value=1]').click();
                        isFirst = false;
                    }

                    if(companycategory != '' && companycategory != null) {
                        $('col[name=companyCategoryTd]').hide();
                        $('th[name=companyCategoryTd]').hide();
                        $('td[name=companyCategoryTd]').hide();
                    }

                    layui.use('laypage', function () {
                        var laypage = layui.laypage;

                        //执行一个laypage实例
                        laypage.render({
                            elem: 'pagebar' //注意，这里的 test1 是 ID，不用加 # 号
                            , count: resp.count //数据总数，从服务端得到
                            ,layout: ['count', 'prev', 'page','next']
                            , jump: function (obj, first) {
                                //obj包含了当前分页的所有参数，比如：
                                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                console.log(obj.limit); //得到每页显示的条数
                                //首次不执行
                                if (!first) {
                                    sendRequest(obj.curr, obj.limit)
                                }
                            }
                        });
                    });
                    layer.close(loading);
                }
            )
        }

        $("#table1 tbody").on('click', 'tr', function () {
            //根据权限判断用户是否可以查看明细
            var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
            if (!userInfo || !userInfo.userRoleId) {
                return;
            }

            if (userInfo.userRoleId == 6) {
                //管理部门用户无法进入详情页面
                return;
            }

            if (userInfo.userRoleId == 3 ||userInfo.userRoleId == 7) {
                window.location.href = 'companyEmployeeList?company_id=' + $(this).attr('id')
            }
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

        $('.hoverlist4 dl').on('click', 'dd', function () {
            var par = $(this).parents(".search_select");
            if ($(this).hasClass('select-this')) {
                $(this).removeClass('select-this');
            } else {
                $('.hoverlist4 dl dd').removeClass('select-this');
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
            doSearch()
        });

//        $('#export').click(function () {
//
//            var areaKey = getUrlParam('areaKey');
//            var companycategory = getUrlParam('companycategory');
//            var url = baseu + '/company/repaircompany/querydetail/export?';
//            url += 'accessToken=' + localStorage.getItem('ACCESSTOKEN');
//            url += '&area=' + (areaKey != null ? areaKey : $('.hoverlist2').attr('data-value'));
//            url += '&cnt=' + ($('.hoverlist3 .select-this').attr('data-value') != undefined ? $('.hoverlist3 .select-this').attr('data-value') : '');
//            url += '&companycategory=' + (companycategory != null ? companycategory : $('.hoverlist4').attr('data-value'));
//            url += '&companyname=' + $('#companyname').val(),
//            window.open(url);
//
//        });

        // 初始查询数据
        doSearch();

    })
</script>
</html>
