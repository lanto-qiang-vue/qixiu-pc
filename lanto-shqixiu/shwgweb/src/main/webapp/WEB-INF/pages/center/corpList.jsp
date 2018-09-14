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
            <span class="sp_zw">维修企业信息管理</span> <span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>维修企业信息管理</span></span>
        </div>
        <div>

            <div style="width: 300px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">企业名称</label>
                <div class="layui-input-block">
                    <input id="corpName" type="text" name="title" placeholder="请输企业名称" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div style="width: 300px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">许可证号</label>
                <div class="layui-input-block">
                    <input id="licence" type="text" name="title" placeholder="请输许可证号" autocomplete="off"
                           class="layui-input">
                </div>
            </div>

            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>
            <div id="add" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 30px">新增</div>
        </div>
        <div class="biaoge" style="overflow: auto">
            <table id="table1" class="layui-table" lay-size="sm" style="width: 1200px" >
                <colgroup>
                    <col width="200">
                    <col width="80">
                    <col width="200">
                    <col width="200">
                    <col width="150">
                    <col width="150">
                    <col width="80">
                    <col width="80">
                    <col width="220">
                </colgroup>
                <thead>
                <tr>
                    <th>企业名称</th>
                    <th>许可证号</th>
                    <th>经营地址</th>
                    <th>经营范围</th>
                    <th>联系电话</th>
                    <th>主要业务</th>
                    <th>信誉等级</th>
                    <th>收费标准</th>
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
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    var laypage = layui.laypage;

    $(function () {
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            //执行一个laypage实例
            searchA(10, 1, laypage);
        });

    })

    function searchA(limit, page, laypageA) {
        layer.load()
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: (limit ? limit : 10),
            pageNo: page,
            licence:$('#licence').val(),
            corpName:$('#corpName').val()
        }
        accessPost(baseu + '/corp/list' ,JSON.stringify(param),function (res) {
            console.log('res',res)
            var datas = res.data, html = '';

            for (var i in datas) {
                html += '<tr><td>' + datas[i].corpName + '</td>' +
                    '<td>' + datas[i].licence + '</td>' +
                    '<td>' + (datas[i].busniessAddress ? datas[i].busniessAddress : "" ) + '</td>';
                if (datas[i].scopes && datas[i].scopes.split(',').length > 0){
                    html += '<td>';
                    for (var j in datas[i].scopes.split(',')){
                        if (datas[i].scopes.split(',')[j] == 1){
                            html += '一类机动车维修、';
                            break;
                        }
                    }
                    for (var j in datas[i].scopes.split(',')){
                        if (datas[i].scopes.split(',')[j] == 2){
                            html += '二类机动车维修、';
                            break;
                        }
                    }
                    for (var j in datas[i].scopes.split(',')){
                        if (datas[i].scopes.split(',')[j] == 3){
                            html += '三类机动车维修、';
                            break;
                        }
                    }
                    for (var j in datas[i].scopes.split(',')){
                        if (datas[i].scopes.split(',')[j] == 4){
                            html += '摩托车维修、';
                            break;
                        }
                    }
                    for (var j in datas[i].scopes.split(',')){
                        if (datas[i].scopes.split(',')[j] == 5){
                            html += '汽车快修、';
                            break;
                        }
                    }
                    html += '</td>';
                }else{
                    html +='<td></td>';
                }

            html += '<td>' + datas[i].operatorTel + '</td>';
                if (datas[i].spheres.split(',').length > 0){
                    html += '<td>';
                    for (var j in datas[i].spheres.split(',')){
                        if (datas[i].spheres.split(',')[j] == 1){
                            html += '品牌维修、';
                        }
                        if (datas[i].spheres.split(',')[j] == 2){
                            html += '综合维修、';
                        }
                        if (datas[i].spheres.split(',')[j] == 3){
                            html += '专项维修、';
                        }
                        if (datas[i].spheres.split(',')[j] == 4){
                            html += '营运车辆维修、';
                        }
                        if (datas[i].spheres.split(',')[j] == 5){
                            html += '事故车维修、';
                        }
                        if (datas[i].spheres.split(',')[j] == 6){
                            html += '配件销售、';
                        }
                        if (datas[i].spheres.split(',')[j] == 7){
                            html += '新车销售、';
                        }
                        if (datas[i].spheres.split(',')[j] == 8){
                            html += '汽车保险、';
                        }
                        if (datas[i].spheres.split(',')[j] == 9){
                            html += '二手车置换、';
                        }
                        if (datas[i].spheres.split(',')[j] == 10){
                            html += datas[i].sphereOther;
                        }

                    }
                    html += '</td>';
                }else{
                    html +='<td></td>';
                }
                html += '<td>' + (datas[i].qualityReputationAssessmentLevelDesc ? datas[i].qualityReputationAssessmentLevelDesc : '') + '</td>';
                html += '<td>' + (datas[i].workingHoursPrice ? datas[i].workingHoursPrice : '')  + '</td>';
                var delBtn = '<button type="button" class="manageNotes-buttom" style="background-color:firebrick" id="mn-delete" corpid="'+datas[i].corpId+'">删除</button>';
                var editBtn = '<button type="button" class="manageNotes-buttom" style="background-color: #449d44" id="mn-edit" corpid="'+datas[i].corpId+'">编辑</button>';
                var infoBtn = '<button type="button" class="manageNotes-buttom" id="mn-info" corpid="'+datas[i].corpId+'">查看</button>';
                html += '<td>'+infoBtn+editBtn+delBtn+'</td></tr>';
            }

            $("#table1 tbody").html(html)
            if(laypageA){
                laypageA.render({
                    elem: 'pagebarA'
                    ,count: res.total //数据总数，从服务端得到
                    ,layout: ['count', 'prev', 'page', 'next']
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if(!first){
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
        searchA(10, 1, laypage)
    })

    //新增
    $("#add").on('click', function () {
        window.location.href = 'addcorp';
    })

    //删除
    $("#table1 tbody").on('click','#mn-delete',function(){
        var param = {
            accessToken:localStorage.getItem("ACCESSTOKEN"),
            corpId:$(this).attr('corpid')
        };
        // var url = baseu + "/corp/del";
        var url = baseu + "/corp/del/"+localStorage.getItem("ACCESSTOKEN")+"/"+$(this).attr('corpid');

        layer.confirm('确认要删除该维修企业吗？', {icon:3, btn : ['确定', '取消']}, function() {
            simplePost(url,JSON.stringify(param),function (res) {
                layer.msg('删除成功！', {time: 1000, icon:1}, function () {
                    layui.use('laypage', function(){
                        var laypage = layui.laypage;
                        searchA(10, 1, laypage);
                    });
                });
            });
        });
    });

    //详情
    $("#table1 tbody").on('click', '#mn-info', function () {
        window.location.href='addcorp?id='+$(this).attr('corpid')+'&type=info'
    })

    //编辑
    $("#table1 tbody").on('click', '#mn-edit', function () {
        var id = $(this).attr('corpid');
        window.location.href='addcorp?id=' + id;
    })
</script>
</html>
