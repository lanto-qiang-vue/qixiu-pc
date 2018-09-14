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
                href="${ctx}/center/manageHome">管理中心</a> > <span>维修企业信息</span></span>
        </div>
        <div class="biaoge" style="overflow: auto; margin-top: 10px">
            <form class="layui-form" >


            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">区域</label>
                <div class="layui-input-block">
                    <select id="area">
                    </select>
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block">
                <label class="layui-form-label">企业名称</label>
                <div class="layui-input-block">
                    <input id="companyname" type="text" name="title" placeholder="请输入企业名称" autocomplete="off"
                           class="layui-input">
                </div>
            </div>

                <div class="layui-form-item" style="width: 300px;display: inline-block" >
                    <label class="layui-form-label">企业类型</label>
                    <div class="layui-input-block">
                        <select id="companycategory">
                            <option value="">全部</option>
                            <option value="43">一类维修企业</option>
                            <option value="44">二类维修企业</option>
                            <option value="45">三类维修企业</option>
                            <option value="46">摩托车维修业户</option>
                            <option value="47">汽车快修业户</option>
                        </select>
                    </div>
                </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">是否对接</label>
                <div class="layui-input-block">
                    <select id="cnt">
                        <option value="">全部</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">未上传天数</label>
                <div class="layui-input-block">
                    <select id="inDays">
                        <option value="">全部</option>
                        <option value="7">大于  7 天</option>
                        <option value="15">大于 15 天</option>
                        <option value="30">大于 30 天</option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">是否总对总</label>
                <div class="layui-input-block">
                    <select id="byZdz">
                        <option value="">全部</option>
                        <option value="yes">是</option>
                        <option value="no">否</option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">是否特约维修</label>
                <div class="layui-input-block">
                    <select id="special">
                        <option value="">全部</option>
                        <option value="true">是</option>
                        <option value="false">否</option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">经营状态</label>
                <div class="layui-input-block">
                    <select id="bussinessStatus">
                        <option value="">全部</option>
                        <option value="1">营业</option>
                        <option value="2">歇业</option>
                        <option value="3">注销</option>
                        <option value="4">空壳</option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">是否前台显示</label>
                <div class="layui-input-block">
                    <select id="isShow">
                        <option value="">全部</option>
                        <option value="true">是</option>
                        <option value="false">否</option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block" >
                <label class="layui-form-label">筛选日期范围</label>
                <div class="layui-input-block">
                    <input id="rangeDate" type="text" name="title" placeholder="选择日期范围" class="layui-input">
                </div>
            </div>

            <div class="layui-form-item" style="width: 300px;display: inline-block">
                <label class="layui-form-label">操作</label>
                <div class="layui-input-block">
                    <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">搜索</div>
                    <div id="export" class="layui-btn layui-btn-normal" lay-filter="formDemo">导出</div>
                </div>
            </div>


            </form>
            <table id="table1" class="layui-table" lay-size="sm" style="width: 100%">
                <colgroup>
                    <col width="50" id="tableAreaCol">
                    <col width="80" name="companyCategoryTd">
                    <col width="180">
                    <col width="50">
                    <col width="50">
                    <col width="50">
                    <col width="200">
                    <col width="50">
                    <col width="50">
                    <col width="50">
                    <col width="50">
                    <col width="50">
                    <col width="50">
                    <col width="50">
                    <col width="100">
                </colgroup>
                <thead>
                <tr>
                    <th id="tableArea">区域</th>
                    <th name="companyCategoryTd">企业类型</th>
                    <th>企业名称</th>
                    <th>是否对接</th>
                    <th>上传数量</th>
                    <th>许可证</th>
                    <th>经营范围</th>
                    <th>未上传天数</th>
                    <th>总对总</th>
                    <th>特约维修</th>
                    <th>经营状态</th>
                    <th>前台显示</th>
                    <th>法人电话</th>
                    <th>日常经营人电话</th>
                    <th>对接时间</th>
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

        if(getUrlParam('areaKey')) {
            $('#cnt').val('1')
            if(getUrlParam('zdz')=='true') $("#byZdz").val("yes")
            else $("#byZdz").val("no")
        }

        var form = layui.form;
        form.render()

        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#rangeDate',
            type: 'date',
            format: 'yyyy-MM-dd',
            range: '~',
//            max: 0
        });

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

//        console.log('$("#area").html()',!!$("#area").html())

        var isFirst = true;
        function sendRequest(pageNo, pageSize, laypage) {
            var ii = layer.load();
            var areaKey = getUrlParam('areaKey');
            var companycategory = getUrlParam('companycategory');
            if(companycategory != '' && companycategory != null) {
                $('#companycategoryFilter').hide();

            }
//            console.log()
            accessPost(baseu + '/company/getUploadReportList',
                JSON.stringify({
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    pageNo: pageNo||1,
                    pageSize: pageSize||10,
//                    area: areaKey != null ? areaKey : $('.hoverlist2').attr('data-value'),
                    area: areaKey != null ? areaKey : $("#area").val(),
//                    cnt: $('.hoverlist3 .select-this').attr('data-value'),
                    cnt: $('#cnt').val(),
                    companyname: $('#companyname').val(),
                    companycategory: companycategory ? companycategory : $("#companycategory").val(),
                    inDays: $("#inDays").val(),
                    isminister: $("#byZdz").val() == "" ? null : ( $("#byZdz").val() == "yes" ? true : false ),
                    special: $("#special").val(),
                    bussinessStatus: $("#bussinessStatus").val(),
                    isShow: $("#isShow").val(),
                    startTime: $("#rangeDate").val()?$("#rangeDate").val().split('~')[0].trim():"",
                    endTime: $("#rangeDate").val()?$("#rangeDate").val().split('~')[1].trim():""
                }),
                function (resp) {
                    handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
                    var areas = resp.area || []
                    if (areas.length > 0 && (areaKey == null || areaKey == '')) {
//                        var areaHtml = '<dd data-value=\"\" class=""><i class=\"layui-icon\">&#xe605;</i> <span>全部</span></dd>'
//                        for (var j in areas) {
//                            areaHtml += '<dd data-value=\"' + areas[j].areaKey + '\" class=\"\"><i class=\"layui-icon\">&#xe605;</i> <span>' + areas[j].areaName + '</span></dd>'
//                        }
//                        $("#areaList").html(areaHtml);
//
//                        var value = $('.hoverlist2').attr('data-value');
//                        if (value != '') {
//                            $('.hoverlist2 dd[data-value=' + value + ']').addClass('select-this');
//                        }
                        if(!$("#area").children().length){
                            var areahtml=areas.length > 1?'<option value="">全部</option>':''
                            for (var j in areas) {
                                areahtml += '<option value="' + areas[j].areaKey + '">' + areas[j].areaName + '</option>'
                            }
                            $("#area").html(areahtml)
                            form.render()
                        }
                    } else {
                        $('#areaLabel').hide()
                        $('#areaFilter').hide()
                    }

                    var datas = resp.data, html = '';
                    if (areas.length > 1 && (areaKey == null || areaKey == '')) {
//                        for (var i in datas) {
//                            if (datas[i].noUpdateDays > 30) {
//                                html += '<tr style="color:orange" id="' + datas[i].companyId + '"><td>' + datas[i].area + '</td><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>' + datas[i].noUpdateDays + '</td><td>' + (datas[i].isminister ? '是' : '否') + '</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>' + datas[i].firstuploadtime + '</td></tr>'
//                            } else {
//                                html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].area + '</td><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>'+datas[i].noUpdateDays+'</td><td>'+(datas[i].isminister?'是':'否')+'</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>'+datas[i].firstuploadtime+'</td></tr>'
//                            }
//                        }
                    } else {
                        $('#tableArea').hide();
                        $('#tableAreaCol').hide();
//                        for (var i in datas) {
//                            if (datas[i].noUpdateDays > 30) {
//                                html += '<tr style="color:orange" id="' + datas[i].companyId + '"><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>' + datas[i].noUpdateDays + '</td><td>' + (datas[i].isminister ? '是' : '否') + '</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>' + datas[i].firstuploadtime + '</td></tr>'
//                            } else {
//                                html += '<tr id="' + datas[i].companyId + '"><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>' + datas[i].noUpdateDays + '</td><td>' + (datas[i].isminister ? '是' : '否') + '</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>' + datas[i].firstuploadtime + '</td></tr>'
//                            }
//                        }
                    }
                    for (var i in datas) {
//                        if (datas[i].noUpdateDays > 30) {
                            html += '<tr '+(datas[i].noUpdateDays > 30?'style="color:orange"':"")+' id="' + datas[i].companyId + '">'
                                +(areas.length > 1 && (areaKey == null || areaKey == '')?'<td>' + datas[i].area + '</td>':"")
                                +'<td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td>' +
                                '<td>' + datas[i].companyname.replace(/\"/g, "") + '</td>' +
                                '<td>' + (datas[i].buttJoin ? '是' : '否') + '</td>' +
                                '<td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td>' +
                                '<td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td>' +
                                '<td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td>' +
                                '<td>' + datas[i].noUpdateDays + '</td>' +
                                '<td>' + (datas[i].isminister ? '是' : '否') + '</td>' +
                                '<td>'+(datas[i].isSpecial ? '是' : '否' )+'</td>' +
                                '<td>'+formtsttus(datas[i].businessStatus)+'</td>' +
                                '<td>'+(datas[i].isShow?'是':'否')+'</td>' +
                                '<td>'+datas[i].corporatePhone+'</td>' +
                                '<td>'+datas[i].companySuperintendentPhone+'</td>' +
                                '<td>' + datas[i].firstuploadtime + '</td>' +
                            '</tr>'
//                        } else {
//                            html += '<tr id="' + datas[i].companyId + '"><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>' + datas[i].noUpdateDays + '</td><td>' + (datas[i].isminister ? '是' : '否') + '</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>' + datas[i].firstuploadtime + '</td></tr>'
//                        }
                    }
                    $("#table1 tbody").html(html);

                    if(companycategory != '' && companycategory != null) {
                        $('col[name=companyCategoryTd]').hide();
                        $('th[name=companyCategoryTd]').hide();
                        $('td[name=companyCategoryTd]').hide();
                    }


//                    layui.use('laypage', function () {
//                        var laypage = layui.laypage;
//
//                        //执行一个laypage实例
//                        laypage.render({
//                            elem: 'pagebar' //注意，这里的 test1 是 ID，不用加 # 号
//                            , count: resp.count //数据总数，从服务端得到
//                            ,layout: ['count', 'prev', 'page','next']
//                            , jump: function (obj, first) {
//                                //obj包含了当前分页的所有参数，比如：
//                                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                                console.log(obj.limit); //得到每页显示的条数
//                                //首次不执行
//                                if (!first) {
//                                    sendRequest(obj.curr, obj.limit)
//                                }
//                            }
//                        });
//                    });

                    if(laypage){
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
                    }


                    layer.close(ii);


                }
            )
        }

        /*function doSearch() {
            var loading = layer.load();
            var areaKey = getUrlParam('areaKey');
            var companycategory = getUrlParam('companycategory');

            if(companycategory != '' && companycategory != null) {
                $('#companycategoryFilter').hide();
            }

            accessPost(baseu + '/company/getUploadReportList',
                JSON.stringify({
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    pageNo: 1,
                    pageSize: 10,
                    area: areaKey != null ? areaKey : $('.hoverlist2').attr('data-value'),
                    cnt: (isFirst && (areaKey || (companycategory != null))) ? 1 : $('.hoverlist3 .select-this').attr('data-value'),
                    companyname: $('#companyname').val(),
                    companycategory: companycategory ? companycategory : $('.hoverlist4 .select-this').attr('data-value'),
                    inDays: $("#inDays").val(),
                    isminister: $("#byZdz").val() == "" ? null : ( $("#byZdz").val() == "yes" ? true : false ),
                    special: $("#special").val(),
                    bussinessStatus: $("#bussinessStatus").val(),
                    isShow: $("#isShow").val(),
                }),
                function (resp) {
                    handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
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
                            if( datas[i].noUpdateDays > 30 ) {
                                html += '<tr style="color:orange" id="' + datas[i].companyId + '"><td>' + datas[i].area + '</td><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>'+ datas[i].noUpdateDays +'</td><td>'+(datas[i].isminister?'是':'否')+'</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>'+datas[i].firstuploadtime+'</td></tr>'
                            } else {
                                html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].area + '</td><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>'+ datas[i].noUpdateDays +'</td><td>'+(datas[i].isminister?'是':'否')+'</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>'+datas[i].firstuploadtime+'</td></tr>'
                            }
                                  }
                    } else {
                        $('#tableArea').hide();
                        $('#tableAreaCol').hide();
                        for (var i in datas) {
                            if (datas[i].noUpdateDays > 30) {
                                html += '<tr style="color:orange" id="' + datas[i].companyId + '"><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>' + datas[i].noUpdateDays + '</td><td>' + (datas[i].isminister ? '是' : '否') + '</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>' + datas[i].firstuploadtime + '</td></tr>'
                            } else {
                                html += '<tr id="' + datas[i].companyId + '"><td name=companyCategoryTd>' + companyCategoryFilter(datas[i].companycategory) + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td><td>' + datas[i].noUpdateDays + '</td><td>' + (datas[i].isminister ? '是' : '否') + '</td><td>'+(datas[i].isSpecial ? '是' : '否' )+'</td><td>'+formtsttus(datas[i].businessStatus)+'</td><td>'+(datas[i].isShow?'是':'否')+'</td><td>' + datas[i].firstuploadtime + '</td></tr>'
                            }
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
        */

        $("#table1 tbody").on('click', 'tr', function () {
            //根据权限判断用户是否可以查看明细
            var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
            if (!userInfo || !userInfo.userRoleId) {
                return;
            }

            if (userInfo.userRoleId == 3 || userInfo.userRoleId == 6) {
                //管理部门用户无法进入详情页面
                return;
            }

            if (userInfo.userRoleId == 7) {
                window.open('/center/companyRecord?company_id=' + $(this).attr('id'), "_blank")
            }
        })

//        $('.hoverlist2 dl').on('click', 'dd', function () {
//            var par = $(this).parents(".search_select");
//            if ($(this).hasClass('select-this')) {
//                $(this).removeClass('select-this');
//            } else {
//                $('.hoverlist2 dl dd').removeClass('select-this');
//                $(this).addClass('select-this');
//            }
//            var items = [];
//            var titleItems = [];
//            par.find('dl .select-this').each(function () {
//                items.push($(this).attr('data-value'));
//                titleItems.push($(this).find('span').text());
//            });
//            if (titleItems && titleItems.length > 0) {
//                par.find('input').val(titleItems.join('|'));
//                par.attr("title", titleItems.join('|'));
//            } else {
//                par.find('input').val(par.attr('data-tit'));
//                par.attr("title", par.attr('data-tit'));
//            }
//
//            if (items && items.length > 0) {
//                par.attr("data-value", items.join(','));
//            } else {
//                par.attr("data-value", '');
//            }
//        });
//
//        $('.hoverlist3 dl').on('click', 'dd', function () {
//            var par = $(this).parents(".search_select");
//            if ($(this).hasClass('select-this')) {
//                $(this).removeClass('select-this');
//            } else {
//                $('.hoverlist3 dl dd').removeClass('select-this');
//                $(this).addClass('select-this');
//            }
//            var items = [];
//            var titleItems = [];
//            par.find('dl .select-this').each(function () {
//                items.push($(this).attr('data-value'));
//                titleItems.push($(this).find('span').text());
//            });
//            if (titleItems && titleItems.length > 0) {
//                par.find('input').val(titleItems.join('|'));
//                par.attr("title", titleItems.join('|'));
//            } else {
//                par.find('input').val(par.attr('data-tit'));
//                par.attr("title", par.attr('data-tit'));
//            }
//
//            if (items && items.length > 0) {
//                par.attr("data-value", items.join(','));
//            } else {
//                par.attr("data-value", '');
//            }
//        });
//
//        $('.hoverlist4 dl').on('click', 'dd', function () {
//            var par = $(this).parents(".search_select");
//            if ($(this).hasClass('select-this')) {
//                $(this).removeClass('select-this');
//            } else {
//                $('.hoverlist4 dl dd').removeClass('select-this');
//                $(this).addClass('select-this');
//            }
//            var items = [];
//            var titleItems = [];
//            par.find('dl .select-this').each(function () {
//                items.push($(this).attr('data-value'));
//                titleItems.push($(this).find('span').text());
//            });
//            if (titleItems && titleItems.length > 0) {
//                par.find('input').val(titleItems.join('|'));
//                par.attr("title", titleItems.join('|'));
//            } else {
//                par.find('input').val(par.attr('data-tit'));
//                par.attr("title", par.attr('data-tit'));
//            }
//
//            if (items && items.length > 0) {
//                par.attr("data-value", items.join(','));
//            } else {
//                par.attr("data-value", '');
//            }
//        });

        $('#search').click(function () {
//            doSearch()
            var laypage = layui.laypage;

            //执行一个laypage实例
            sendRequest(1, 10, laypage)
//            sendRequest()
        });

        $('#export').click(function () {
            var areaKey = getUrlParam('areaKey');
            var companycategory = getUrlParam('companycategory');
            var url = baseu + '/company/exportUploadReportList?';
            url += 'accessToken=' + localStorage.getItem('ACCESSTOKEN');
            url += '&area=' + $('#area').val();
            url += '&cnt=' + $('#cnt').val();
            url += '&companycategory=' +  $('#companycategory').val();
            url += '&companyname=' + $('#companyname').val();
            url += '&inDays=' + $('#inDays').val();
            url += '&isminister=' +  ( $("#byZdz").val() == "" ? '' : ( $("#byZdz").val() == "yes" ? 'true' : 'false' ) );
            url += '&isSpecial=' + $('#special').val();
            url += '&businessStatus=' + $('#bussinessStatus').val();
            url += '&isShow=' + $('#isShow').val();
            url += '&startTime=' + ($("#rangeDate").val()?$("#rangeDate").val().split('~')[0].trim():"");
            url += '&endTime=' + ($("#rangeDate").val()?$("#rangeDate").val().split('~')[1].trim():"");
            window.open(url);
            console.log(url)
        });

        // 初始查询数据
//        doSearch();
//        sendRequest()

        layui.use('laypage', function(){
            var laypage = layui.laypage;

            //执行一个laypage实例
            sendRequest(1, 10, laypage)
        });

    })
    function formtsttus(val) {
        switch (val.toString()){
            case '0': return '0';break
            case '1': return '营业';break
            case '2': return '歇业';break
            case '3': return '注销';break
            case '4': return '空壳';break
        }
    }
</script>
</html>
