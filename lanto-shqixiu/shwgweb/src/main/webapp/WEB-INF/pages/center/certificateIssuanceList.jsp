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
            <span class="sp_zw">企业合格证使用信息管理</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">管理中心</a> > <span>企业合格证使用信息管理</span></span>
        </div>
        <div class="biaoge" style="overflow: auto; margin-top: 10px">
            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">所属年份</label>
                <div class="layui-input-inline search_select hoverlist5"
                     style="width: 50%; margin-right: 3px;margin-left: 20px;" data-value=""
                     data-tit="" data-type="type">
                    <div class="layui-unselect layui-form-select qylx">
                        <div class="layui-select-title">
                            <input id="year" type="text" placeholder="所属年份" value="" readonly=""
                                   class="layui-input layui-unselect"><i
                                class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit" id="yearList">
                        </dl>
                    </div>
                </div>
            </div>
            <div style="margin-left: 60px">
                <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo"
                     style="margin-top: 10px">搜索
                </div>

                <div id="add" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo"
                     style="margin-top: 10px">新增
                </div>

            </div>
            <table id="table1" class="layui-table" lay-size="sm" style="width: 1000px">
                <colgroup>
                    <col width="80">
                    <col width="80">
                    <col width="80">
                    <col width="80">
                </colgroup>
                <thead>
                <tr>
                    <th>年份</th>
                    <th>核准数</th>
                    <th>检测报告副证数</th>
                    <th>黑名单限制数</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

            <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
            <div style="text-align: right">
                <a class="layui-btn layui-btn-normal" href="javascript:void(0)" onclick="history.back()">返回</a>
            </div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>

<div class="layui-form" action="" id="dialog" style="display: none">
    <div class="contain_box">
        <div class="layui-form-item" style="margin-top: 10px;">
            <label class="layui-form-label my_layui-form-label">资料类型</label>
            <div class="layui-input-inline search_select hoverlist4"
                 style="width: 50%; margin-right: 3px;margin-left: 10px;" data-value=""
                 data-tit="" data-type="type">
                <div class="layui-unselect layui-form-select qylx">
                    <div class="layui-select-title">
                        <input id="certificatetype" type="text" placeholder="资料类型" value="" readonly=""
                               class="layui-input layui-unselect"><i
                            class="layui-edge"></i>
                    </div>
                    <dl class="layui-anim layui-anim-upbit">
                        <dd data-value="1">
                            <i class="layui-icon">&#xe605;</i> <span>合格证</span>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label my_layui-form-label">所属年份</label>
            <div class="layui-input-inline search_select hoverlist5"
                 style="width: 50%; margin-right: 3px;margin-left: 10px;" data-value=""
                 data-tit="" data-type="type">
                <div class="layui-unselect layui-form-select qylx">
                    <div class="layui-select-title">
                        <input id="toYear" type="text" placeholder="所属年份" value="" readonly=""
                               class="layui-input layui-unselect"><i
                            class="layui-edge"></i>
                    </div>
                    <dl class="layui-anim layui-anim-upbit" id="yearList2">
                    </dl>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label my_layui-form-label">黑名单限制数</label>
            <div class="layui-input-block">
                <input type="number" required id="blacklistlimitnumber" lay-verify="required" placeholder="请输入"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label my_layui-form-label">检测报告副证数</label>
            <div class="layui-input-block">
                <input type="number" required id="examinationreportcolicensecount" lay-verify="required"
                       placeholder="请输入" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label my_layui-form-label">核准数</label>
            <div class="layui-input-block">
                <input type="number" required id="approvalcount" lay-verify="required" placeholder="请输入"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="" style="text-align: right;">
                <button class="layui-btn" onclick="submitReview()">立即提交</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        // 初始查询数据
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            doSearch(1, 10, laypage);
        });

        var mydate = new Date();
        var year = mydate.getFullYear();
        var htmlStart = '';
        var htmlEnd = '';
        for (var i = 0; i < 5; i++) {
            htmlStart += '<dd data-value="' + (year - 5 + i) + '"><i class="layui-icon">&#xe605;</i><span>' + (year - 5 + i) + '</span></dd>';
            htmlEnd += '<dd data-value="' + (year + i) + '"><i class="layui-icon">&#xe605;</i><span>' + (year + i) + '</span></dd>';
        }
        var html = htmlStart + htmlEnd + '<dd data-value="' + (year + 5) + '"><i class="layui-icon">&#xe605;</i><span>' + (year + 5) + '</span></dd>';
        $('#yearList').html(html);
        $('#yearList2').html(html);
    })

    function submitReview() {
        var companyid = getUrlParam('company_id');
        var certificatetype = $('#certificatetype').val();
        var year = $('#toYear').val();
        var blacklistlimitnumber = $('#blacklistlimitnumber').val();
        var examinationreportcolicensecount = $('#examinationreportcolicensecount').val();
        var approvalcount = $('#approvalcount').val();

        if (certificatetype == '') {
            layer.msg('请选择资料类型');
            return;
        } else if (year == '') {
            layer.msg('请选择所属年份');
            return;
        } else if (blacklistlimitnumber == '') {
            layer.msg('请输入黑名单限制数');
            return;
        } else if (examinationreportcolicensecount == '') {
            layer.msg('请输检测报告副证数');
            return;
        } else if (approvalcount == '') {
            layer.msg('请输核准数');
            return;
        }
        layer.load();
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            companyid: companyid,
            certificatetype: certificatetype,
            year: year,
            blacklistlimitnumber: blacklistlimitnumber,
            examinationreportcolicensecount: examinationreportcolicensecount,
            approvalcount: approvalcount
        };

        accessPost(baseu + '/company/certificateIssuance/add',
            JSON.stringify(param),
            function (resp) {
                handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
                layer.closeAll();
                if (resp.code == '000000') {
                    layer.msg('发证成功');
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    doSearch(1, 10, laypage);
                } else {
                    layer.msg('发证失败');
                }
            }
        )
    }

    function doSearch(pageNo, pageSize, laypage) {
        var loading = layer.load();
        var companyId = getUrlParam('company_id');
        accessPost(baseu + '/company/certificateIssuance',
            JSON.stringify({
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                pageNo: pageNo ? pageNo : 1,
                pageSize: pageSize ? pageSize : 10,
                year: $('#year').val(),
                companyid: companyId ? companyId : null
            }),
            function (resp) {
                handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
                layer.close(loading);

                var datas = resp.data, html = '';
                for (var i in datas) {
                    html += '<tr id="' + datas[i].id + '">' +
                        '<td>' + datas[i].year + '</td>' +
                        '<td>' + datas[i].approvalcount + '</td>' +
                        '<td>' + datas[i].examinationreportcolicensecount + '</td>' +
                        '<td>' + datas[i].blacklistlimitnumber + '</td></tr>'
                }

                $("#table1 tbody").html(html)

                if (laypage) {
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

    $('#add').click(function () {
        $('#certificatetype').val('');
        $('#toYear').val('');
        $('#blacklistlimitnumber').val('');
        $('#examinationreportcolicensecount').val('');
        $('#approvalcount').val('');

        $('.hoverlist4 dl dd').removeClass('select-this');
        $('.hoverlist5 dl dd').removeClass('select-this');

        layer.open({
            type: 1,
            title: '新增',
            area: ['600px', '600px'],
            content: $('#dialog'),
            yes: function (index, layero) {
                //do something
                $('#dialog').hide();
            },
            cancel: function () {
                $('#dialog').hide();
            }
        });
    });

    $('.hoverlist4 dl dd').click(function () {
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

    $('.hoverlist5 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist5 dl dd').removeClass('select-this');
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
    .contain_box {
        width: 90%;
        margin: 0 auto;
    }

    .my_layui-form-label {
        width: 90px !important;
    }
</style>
</html>
