<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
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
            <span class="sp_zw">为您服务管理</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/companyHome">企业中心</a> > <span>为您服务管理</span></span>
        </div>
        <div style="width: 950px;margin-top: 10px">
            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">联系人</label>
                <div class="layui-input-block">
                    <input id="contactName" type="text" name="contactName" placeholder="请输联系人" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">联系方式</label>
                <div class="layui-input-block">
                    <input id="contactTel" type="text" name="contactTel" placeholder="请输联系方式" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 40px;">搜索</div>

        </div>
        <div class="biaoge" style="overflow: auto">
            <table id="table1" class="layui-table" lay-size="sm" style="width: 1080px">
                <colgroup>
                    <col width="50">
                    <col width="100 ">
                    <col width="200">
                    <col width="100">
                    <col width="80">
                    <col width="100">
                </colgroup>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>操作</th>
                    <th>服务内容</th>
                    <th>服务状态</th>
                    <th>联系人</th>
                    <th>联系方式</th>
                </tr>
                </thead>
                <tbody>

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

    $(function(){
        layui.use('laypage', function(){
            //执行一个laypage实例
            search(10, 1, laypage)

        });
        $('#search').click(function () {
            search(10, 1, laypage)
        })
    });

    function search(limit, page, laypage) {
        var ii = layer.load();
        currPage = page;
        // var statusArray = [];
        //
        // if(roleId==2){
        //     //维修企业的情况，搜索status为2，3的数据
        //     statusArray=[2,3];
        // }
        //
        // if(roleId==4){
        //     //运营商的情况，搜索status为1，2，3的数据
        //     statusArray=[1,2,3];
        // }

        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: (limit ? limit : 10),
            pageNo: page,
            contact_name: $('#contactName').val(),
            contact_tel: $('#contactTel').val()
        }
        accessPost(baseu+ '/maintain/getOnserviceForyoulist', JSON.stringify(param), function (res) {
            console.log(res)
            var html='', data=res.data;

            for (var i in data){
                var replayButtonHtml = (/*roleId==2 &&*/ data[i].status==1 ? '<button class="layui-btn layui-btn-normal layui-btn-xs" onclick="updateStatusToReply(' + data[i].id + ')" style="font-size:10px">已回复</button>' : '');
                /*var setCompanyButtonHtml = (roleId==4 ? '<button class="layui-btn layui-btn-xs" onclick="setCompany(' + data[i].id + ')"  style="font-size:10px">指定维修企业</button>' : '');*/
                /*var deleteRowButtonHtml = '<button class="layui-btn layui-btn-danger layui-btn-xs" onclick="deleteRow(' + data[i].id + ')"  style="font-size:10px">删除</button>';*/
                html+='<tr>' +
                    '<td>'+(parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1))+'</td>' +
                    '<td>'/*+ deleteRowButtonHtml */+ replayButtonHtml + '</td>' +
                    '<td>'+(data[i].content)+'</td>' +
                    '<td>'+formatStatusToLabel(data[i].status)+'</td>' +
                    '<td>'+(data[i].contactName || '')+'</td> ' +
                    '<td>'+(data[i].contactTel || '')+'</td> ' /*+
                   /!* '<td>'+(data[i].contactaddress || '')+'</td> ' +*!/
                    '<td>'+formatCompanyName(data[i].companyName || '')+'</td> ' +
                    //						'<td>'+(data[i].createtime ? new Date(data[i].createtime) : '')+'</td>' +
                    '</tr>'*/
            }
            $("#table1 tbody").html(html)

            count = res.count;

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

    function formatStatusToLabel(statusCode){
        var statusLabel = '';
        switch(statusCode){
            case 1:
                statusLabel = '待回复';
                break;
            case 2:
                statusLabel = '已回复';
                break;
            /*case 3:
                statusLabel = '已回复';
                break;*/
            default:
                statusLabel = '';
        }

        return statusLabel;
    }

    function updateStatusToReply(id){
        console.log('update');
        var ii = layer.load();
        var laypage = layui.laypage;
        layer.confirm('确定要设置该数据状态至已回复吗?', {icon: 3, title:'提示'}, function(index){
            var param={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                id: id
            }
            accessPost(baseu+ '/maintain/updateStatusServiceForyou', JSON.stringify(param), function (res) {
                console.log(res);
                search(10, currPage, laypage);
            })
            layer.closeAll();
            layer.close(index);
        }, function(index){
            //按钮【按钮二】的回调
            layer.closeAll();
            layer.close(index);
        });
    }

    function deleteRow(id){
        console.log('delete');
//		var ii = layer.load();
        var laypage = layui.laypage;
        layer.confirm('确定要删除该行数据吗?', {icon: 3, title:'提示'}, function(index){
            var param={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                id: id
            }
            accessPost(baseu+ '/maintain/delete', JSON.stringify(param), function (res) {
                console.log(res);
                search(10, currPage, laypage);
            })
            layer.closeAll();
            layer.close(index);
        }, function(index){
            //按钮【按钮二】的回调
            layer.close(index);
        });
    }

</script>
</html>
