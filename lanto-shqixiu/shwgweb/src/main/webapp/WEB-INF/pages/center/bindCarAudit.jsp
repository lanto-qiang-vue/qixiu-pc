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
<style>
#form{
    padding: 20px;
}
#form>div{
    display: none;
}
#form img{
    width: 100%;
}
#form div p{
    font-size: 18px;
    margin-top: 10px;
}
#form h3{
    text-align: center;
    font-size: 20px;
    margin-top: 15px;
}
.info{
    padding: 10px;
    text-align: right;
}
.info li{
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #CCCCCC;
    text-align: left;
    display: none;
}
.info li label{
    width: 120px;
    display: inline-block;
}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">绑定车辆审核</span> <span class="sp_wz">您所在位置：<a
                href="/center/runHome">运营商中心</a> > <span>绑定车辆审核</span></span>
        </div>
        <%--<div style="margin-top:10px">--%>

            <%--<div style="width: 300px;display: inline-block;margin-top: 10px">--%>
                <%--<label class="layui-form-label">时 间</label>--%>
                <%--<div class="layui-input-block">--%>
                    <%--<input type="text" class="layui-input" id="rangeDate" placeholder="请选择日期范围">--%>
                <%--</div>--%>
            <%--</div>--%>

            <%--<div id="search" class="layui-btn layui-btn-normal" lay-submit onclick="search(10,1)" style="margin-left: 60px">搜索</div>--%>
        <%--</div>--%>
        <div class="biaoge" style="overflow: auto">
            <table id="table1" class="layui-table" lay-size="sm" style="width: 1200px">
                <colgroup>
                    <col width="80">
                    <col width="100">
                    <col width="100">
                </colgroup>
                <thead>
                <tr>
                    <th>操作</th>
                    <th>车牌号</th>
                    <th>VIN</th>
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

<div id="form" style="display: none">
    <div class="xinshi">
        <h3>行驶证</h3>
        <img>
        <p>修改前：</p>
        <ul class="info before">
            <li><label>所有人：</label><span class="name"></span></li>
            <li><label>车牌号码：</label><span class="card"></span></li>
            <li><label>车架号(VIN)：</label><span class="vin"></span></li>
            <li><label>发动机号：</label><span class="fadong"></span></li>
        </ul>
        <p>修改后：</p>
        <ul class="info after">
            <li><label>所有人：</label><span class="name"></span></li>
            <li><label>车牌号码：</label><span class="card"></span></li>
            <li><label>车架号(VIN)：</label><span class="vin"></span></li>
            <li><label>发动机号：</label><span class="fadong"></span></li>
        </ul>
    </div>
    <div class="personCard">
        <h3>身份证</h3>
        <img>
        <p>修改前：</p>
        <ul class="info before">
            <li><label>姓名：</label><span class="name"></span></li>
            <li><label>身份证号：</label><span class="card"></span></li>
        </ul>
        <p>修改后：</p>
        <ul class="info after">
            <li><label>姓名：</label><span class="name"></span></li>
            <li><label>身份证号：</label><span class="card"></span></li>
        </ul>
    </div>
    <div class="yingye">
        <h3>营业执照</h3>
        <img>
        <p>修改前：</p>
        <ul class="info before">
            <li><label>企业名称：</label><span class="name"></span></li>
            <li><label>法定代表人：</label><span class="person"></span></li>
        </ul>
        <p>修改后：</p>
        <ul class="info after">
            <li><label>企业名称：</label><span class="name"></span></li>
            <li><label>法定代表人：</label><span class="person"></span></li>
        </ul>
    </div>
    <ul style="text-align: right">
        <div class="layui-btn layui-btn-xs layui-btn-normal" onclick="auditor(2)">通过</div>
        <div class="layui-btn layui-btn-xs layui-btn-danger" onclick="auditor(3)">驳回</div>
    </ul>
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
    var formId=''

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
        }
        accessPost(baseu+ '/scan/checkList' , JSON.stringify(param), function (res) {
            console.log(res)
            var html='', data=res.vehicleBOList;

            for (var i in data){
                console.log('data[i].quesId: ', data[i].quesId);

                html+='<tr>' +
//                    '<td>'+(parseInt((param.page - 1) * param.limit + parseInt(i) + 1))+'</td>' +
                    '<td><div class="layui-btn layui-btn-xs" onclick="check('+data[i].vehicleId+')">审核</div></td>'+
                    '<td>'+ (data[i].vehicleplatenumber || '') + '</td>' +
                    '<td>'+(data[i].vin || '')+'</td> ' +
                    '</tr>'
            }
            $("#table1 tbody").html(html)

            if(laypage){
                laypage.render({
                    elem: 'pagebar'
                    ,count: res.count //数据总数，从服务端得到
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

    function check(id) {
        $("#form>div, .info li").hide()
        layer.load()
        accessGet(baseu+ '/scan/checkDetail/'+ localStorage.getItem('ACCESSTOKEN')+ '/'+ id,function (res) {
            console.log(res)
            if(res.code=='000000'){
                layer.open({
                    type: 1,
                    content: $('#form'),
                    title: "审核",
                    area: ['500px', '800px'],
                    cancel: function () {
                        $("#form").hide()
                    }
                });
                formId= res.data.vehicleId
                var xsinfo= res.data.userVehicleTravelLicenseBO||''
                if(xsinfo){
                    $(".xinshi").show()
                    $(".xinshi img").attr('src','data:image/jpg;base64,'+xsinfo.frontImage)
                    if(xsinfo.ownerName!=xsinfo.newOwnerName){
                        $(".xinshi .info li:nth-child(1)").show()
                        $(".xinshi .info.before li:nth-child(1) span").text(xsinfo.ownerName)
                        $(".xinshi .info.after li:nth-child(1) span").text(xsinfo.newOwnerName)
                    }
                    if(xsinfo.vehiclePlateNumber!= xsinfo.reviseVehiclePlateNumber){
                        $(".xinshi .info li:nth-child(2)").show()
                        $(".xinshi .info.before li:nth-child(2) span").text(xsinfo.vehiclePlateNumber)
                        $(".xinshi .info.after li:nth-child(2) span").text(xsinfo.reviseVehiclePlateNumber)
                    }
                    if(xsinfo.vin!= xsinfo.reviseVin){
                        $(".xinshi .info li:nth-child(3)").show()
                        $(".xinshi .info.before li:nth-child(3) span").text(xsinfo.vin)
                        $(".xinshi .info.after li:nth-child(3) span").text(xsinfo.reviseVin)
                    }
                    if(xsinfo.engineNo!= xsinfo.reviseEngineNo){
                        $(".xinshi .info li:nth-child(3)").show()
                        $(".xinshi .info.before li:nth-child(3) span").text(xsinfo.engineNo)
                        $(".xinshi .info.after li:nth-child(3) span").text(xsinfo.reviseEngineNo)
                    }
                }
                var sfinfo= res.data.userIdCardBO||''
                if(sfinfo){
                    $(".personCard").show()
                    $(".personCard img").attr('src','data:image/jpg;base64,'+sfinfo.frontImage)
                    if(sfinfo.ownerName!=sfinfo.reviseOwnerName){
                        $(".personCard .info li:nth-child(1)").show()
                        $(".personCard .info.before li:nth-child(1) span").text(sfinfo.ownerName)
                        $(".personCard .info.after li:nth-child(1) span").text(sfinfo.reviseOwnerName)
                    }
                    if(sfinfo.idCardNo!= sfinfo.reviseIdCardNo){
                        $(".personCard .info li:nth-child(2)").show()
                        $(".personCard .info.before li:nth-child(2) span").text(sfinfo.idCardNo)
                        $(".personCard .info.after li:nth-child(2) span").text(sfinfo.reviseIdCardNo)
                    }
                }
                var yyinfo= res.data.userBusinessLicenseBO||''
                if(yyinfo){
                    $(".yingye").show()
                    $(".yingye img").attr('src','data:image/jpg;base64,'+yyinfo.frontImage)
                    if(yyinfo.corpName!=yyinfo.reviseCorpName){
                        $(".yingye .info li:nth-child(1)").show()
                        $(".yingye .info.before li:nth-child(1) span").text(yyinfo.corpName)
                        $(".yingye .info.after li:nth-child(1) span").text(yyinfo.reviseCorpName)
                    }
                    if(yyinfo.legalPerson!= yyinfo.reviseLegalPerson){
                        $(".yingye .info li:nth-child(2)").show()
                        $(".yingye .info.before li:nth-child(2) span").text(yyinfo.legalPerson)
                        $(".yingye .info.after li:nth-child(2) span").text(yyinfo.reviseLegalPerson)
                    }
                }
            }else{
                layer.msg(res.status, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
            layer.closeAll('loading');
        })
    }

    function auditor(status) {
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            status: status,
            vehicleId: formId,
        }
        accessPost(baseu+ '/scan/check' , JSON.stringify(param), function (res) {
            console.log(res)
            if(res.code=='000000'){
                layer.closeAll()
                $("#form").hide()
                search(10, 1, laypage)
            }else{
                layer.msg(res.status, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        })
    }

</script>
</html>
