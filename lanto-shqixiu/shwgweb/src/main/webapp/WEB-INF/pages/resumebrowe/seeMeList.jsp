<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        .warn {
            font-size: 12px;
            color: #7f6d47;
            margin-bottom: 15px;
            padding: 5px 15px;
            background-color: #fff7dc;
            border: 1px solid #f4e09f;
        }

        .c_orange {
            color: #ff6000 !important;
        }
    </style>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">谁看过我</span> <span class="sp_wz">您所在位置：<a
                href="/shwgweb/center/userInfo">车主中心</a> > <span>谁看过我</span></span>
        </div>
        <div style="margin-top:10px">
            <div style="display: inline-block">
                <div class="warn" style="width:1026px">
                    近60天简历被浏览<span class="c_orange" id="countResumeBrowes"></span>次，浏览公司<span class="c_orange" id="countConpany"></span>家
                </div>
            </div>

        </div>
        <div class="biaoge" style="overflow: auto">
            <table id="table1" class="layui-table" lay-size="sm" >
                <colgroup>
                    <col width="100">
                    <col width="800">
                    <col width="100">
                </colgroup>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>公司名称</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

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

    $("#table1 tbody").on('click','#mn-check', function () {
        console.log(this)
        window.location.href='companyResumeBrowe?corpId='+$(this).attr('companyId')
    })

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
            //status: $('.hoverlist3 .select-this').attr('data-value')
        }
        accessPost(baseu+ '/resumeBroswe/seeMeList', JSON.stringify(param), function (res) {
            console.log(res)
            var html='', data=res.data.dataList;

            for (var i in data){
                console.log('data[i].quesId: ', data[i].quesId);

                html+='<tr>' +
                    ' <td> '+(parseInt((param.page - 1) * param.limit + parseInt(i) + 1))+'</td>' +
                    ' <td> ' + (data[i].virtualCompanyName || '') + '</td>' +
                    '<td><button type="button" class="manageNotes-buttom" id="mn-check" companyId="'+data[i].companyId+'">查看</button> </td>' +
                    ' </tr> '
            }
            $("#table1 tbody").html(html);
            $("#countConpany").html(res.data.total);
            $("#countResumeBrowes").html(res.data.countResumeBroswes);

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
