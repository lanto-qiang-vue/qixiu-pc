<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
    <%--<script src="${btx}/js/layui/lay/modules/laydate.js"></script>
    <link rel="stylesheet" href="${btx}/js/layui-v2.1.6/layui/css/modules/laydate/default/laydate.css">--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">意见反馈</span> <span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>意见反馈</span></span>
        </div>
        <div style="margin-top:10px">

            <div style="width: 300px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">时 间</label>
                <div class="layui-input-block">
                    <input type="text" class="layui-input" id="rangeDate" placeholder="请选择日期范围">
                </div>
            </div>

            <div id="search" class="layui-btn layui-btn-normal" lay-submit onclick="search(10,1)" style="margin-left: 60px">搜索</div>
        </div>
        <div class="biaoge" style="overflow: auto">
            <table id="table1" class="layui-table" lay-size="sm" style="width: 1200px">
                <colgroup>
                    <col width="80">
                    <col width="250">
                    <col width="150">
                </colgroup>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>意见反馈</th>
                    <th>创建时间</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

            <script type="text/html" id="barDemo">
                <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
            </script>

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
    //日期选择器
    var startDate = ''
    var endDate = ''
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#rangeDate' //指定元素
            ,range: '~'
            ,done: function(value){
                var range = value.split('~');
                startDate = range[0].trim()
                endDate = '';
                if(range.length == 2){
                    endDate = range[1].trim();
                }
                console.log('startDate',startDate); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log('enddate',endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
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
            startDate: startDate,
            endDate: endDate
            //status: $('.hoverlist3 .select-this').attr('data-value')
        }
        accessPost(baseu+ '/supervision/suggestList', JSON.stringify(param), function (res) {
            console.log(res)
            var html='', data=res.data.dataList;

            for (var i in data){
                console.log('data[i].quesId: ', data[i].quesId);

                html+='<tr>' +
                    '<td>'+(parseInt((param.page - 1) * param.limit + parseInt(i) + 1))+'</td>' +
                    '<td>'+ (data[i].suggestion || '') + '</td>' +
                    '<td>'+(formatDate(data[i].createtime,'yyyy-MM-dd hh:mm:ss') || '')+'</td> ' +
                    '</tr>'
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

        })
    }

</script>
</html>
