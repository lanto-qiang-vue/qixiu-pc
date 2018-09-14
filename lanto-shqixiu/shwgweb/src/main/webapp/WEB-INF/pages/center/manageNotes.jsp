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
<span class="sp_zw">通知管理</span> <span class="sp_wz">您所在位置：
<a href="${ctx}/center/manageHome">管理中心</a> > <span>通知管理</span></span>
</div>
<div class="biaoge" style="overflow: auto">
<div class="dblock">
<h1 class="dtitle">我发送的通知</h1>
	<div>
		<div style="display: inline-block">
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">通知标题</label>
				<div class="layui-input-block">
					<input id="title" type="text" name="title" placeholder="请输入通知标题" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">时 间</label>
				<div class="layui-input-block">
					<input type="text" class="layui-input" id="rangeDate" placeholder="请选择日期范围">
				</div>
			</div>

			<div id="searchA" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>
		</div>
	<table id="table1" class="layui-table" lay-size="sm" style="width: 940px">
		<colgroup>
			<col width="280"><col width="180"><col width="200"><col>
		</colgroup>
		<thead>
		<tr>
			<th>通知标题</th>
			<th>通知状态</th>
			<%--<th>通知发送人</th>--%>
			<th class="manageNotes-th">通知日期</th>
			<th class="manageNotes-th">查看详情</th>

		</tr>
		</thead>
		<tbody>

		</tbody>
	</table>
	<div id="pagebarA" style="text-align:center;margin-top:5px;"></div>
</div>
<div class="dblock">
<h1 class="dtitle">我收到的通知</h1>
	<div>
		<div style="display: inline-block">
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">通知标题</label>
				<div class="layui-input-block">
					<input id="title2" type="text" name="title" placeholder="请输入通知标题" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">时 间</label>
				<div class="layui-input-block">
					<input type="text" class="layui-input" id="rangeDate2" placeholder="请选择日期范围">
				</div>
			</div>

			<div id="search2" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>
		</div>
	<table id="table2" class="layui-table" lay-size="sm" style="width: 940px">
		<colgroup>
			<col width="300"><col width="100"><col width="140"><col width="100"><col width="100">
		</colgroup>
		<thead>
		<tr>
			<th>通知标题</th>
			<th class="manageNotes-th">通知发送人</th>
			<th class="manageNotes-th">通知日期</th>
			<th class="manageNotes-th">是否已读</th>
			<th class="manageNotes-th">查看详情</th>

		</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	<div id="pagebarB" style="text-align:center;margin-top:5px;"></div>
</div>

</div>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {
    layui.use('laypage', function(){
        var laypage = layui.laypage;

        //执行一个laypage实例
        searchA(10, 1, laypage)
    });

    layui.use('laypage', function(){
         laypageB = layui.laypage;
        //执行一个laypage实例
        searchB(10, 1, laypageB)

    });
//日期选择器
    var startDateA = ''
    var endDateA = ''
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#rangeDate' //指定元素
            ,range: '~'
            ,done: function(value){
                if (value != null && value != '') {
                    var range = value.split('~');
                    startDateA = range[0].trim()
                    endDateA = range[1].trim()
                }
            }
        });
    });
//删除
    $("#table1 tbody").on('click','#mn-delete',function(){
        var param = {
            accessToken:localStorage.getItem("ACCESSTOKEN"),
            notifyId:$(this).attr('notid')
        };
        var url = baseu + "/message/notify/delete";

        layer.confirm('确认要删除该通知吗？', {icon:3, btn : ['确定', '取消']}, function() {
            simplePost(url,JSON.stringify(param),function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.msg('删除成功！', {time: 1000, icon:1}, function () {
                    layui.use('laypage', function(){
                        var laypage = layui.laypage;
                        searchA(10, 1, laypage);
                    });
                });
            });
        });
    });
//编辑
    $("#table1 tbody").on('click', '#mn-edit', function () {
        var id = $(this).attr('notid');
        window.location.href='manageNotify?id=' + id;
    })

    //日期选择器
    var startDateB = ''
    var endDateB = ''
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#rangeDate2' //指定元素
            ,range: '~'
            ,done: function(value){
                var range = value.split('~');
                if (value != null && value != '') {
                    startDateB = range[0].trim()
                    endDateB = range[1].trim()
                }
            }
        });
    });

    $("#table1 tbody").on('click', '#mn-check', function () {
        window.location.href='notifyDetail?id='+$(this).attr('notid')+'&type=my'
    })

    $("#table2 tbody").on('click', '#mn-check', function () {
        window.location.href='notifyDetail?id='+$(this).attr('notid')
    })

    $("#searchA").on('click', function () {
        searchA(10, 1, laypage)
    })

    $("#search2").on('click', function () {
        searchB(10, 1, laypageB)
    })

    function searchA(limit, page, laypageA) {
        layer.load()
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (limit ? limit : 10),
            page: page,
            title: $('#title').val(),
            startDate: startDateA,
            endDate: endDateA
        }
        //查询我发送的通知
        accessPost(baseu+ '/message/notify/getSendNotify',JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            console.log(res);
            var datas=res.data, content='', statusMsg='', html='';
            for(var i in datas){
                var delBtn = '<button type="button" class="manageNotes-buttom" style="background-color:firebrick" id="mn-delete" notid="'+datas[i].notifyId+'">删除</button>';
                var editBtn = '<button type="button" class="manageNotes-buttom" style="background-color: #449d44" id="mn-edit" notid="'+datas[i].notifyId+'">编辑</button>';

//            content= JSON.parse(datas[i].content).content
//			console.log('content', content);
                if (datas[i].status == 1) {
                    statusMsg = '未审核';

                    delBtn = '';
                    editBtn =''
                } else if (datas[i].status == 2) {
                    statusMsg = '通过审核';
                    delBtn = '';
                    editBtn =''

                } else {
                    statusMsg = '被驳回'
                }
                html+='<tr ><td>'+datas[i].title +'</td><td>'+statusMsg+'</td>'+
                    '<td class="manageNotes-th">'+formatDate(datas[i].sendtime,'yyyy-MM-dd hh:mm:ss')+'</td><td class="manageNotes-th" id="btn">'+ editBtn +'<button type="button" class="manageNotes-buttom" id="mn-check" notid="'+datas[i].notifyId+'">查看</button>'  + delBtn + '</td></tr>'
            }
            $("#table1 tbody").html(html)

            if(laypageA){
                laypageA.render({
                    elem: 'pagebarA'
                    ,count: res.total //数据总数，从服务端得到
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

    function searchB(limit, page, laypageB) {
        layer.load()
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (limit ? limit : 10),
            page: page,
            title: $('#title2').val(),
            startDate: startDateB,
            endDate: endDateB
        }
        //查询我收到的通知
        accessPost(baseu+ '/message/notify/getReceiveNotify',JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            var datas=res.data,content='', html='';
            for(var i in datas){
//            content= JSON.parse(datas[i].content).content
                html+='<tr><td>'+datas[i].title+'</td>'+'<td class="manageNotes-th">'+(datas[i].nickName? datas[i].nickName: datas[i].mobile)+'</td><td class="manageNotes-th">'+formatDate(datas[i].sendtime,'yyyy-MM-dd hh:mm:ss')+'</td><td class="manageNotes-th">'+(datas[i].read?'<span style="color: green">已读</span>':'<span style="color: red">未读</span>')+'</td><td class="manageNotes-th"><button type="button" class="manageNotes-buttom" id="mn-check" notid="'+datas[i].notifyId+'">查看</button></td></tr>'
            }
            $("#table2 tbody").html(html)

            if(laypageB){
                laypageB.render({
                    elem: 'pagebarB'
                    ,count: res.total //数据总数，从服务端得到
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                        console.log(obj.limit); //得到每页显示的条数
                        //首次不执行
                        if(!first){
                            searchB(limit, obj.curr)
                            //do something
                        }
                    }
                });
            }
            layer.closeAll('loading');
        })
    }
})



</script>
</html>
<style>
	.isShow{
		display: none;
	}
</style>
