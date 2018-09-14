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
			<span class="sp_zw">通知管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome">企业中心</a> > <span>通知管理</span></span>
		</div>
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

				<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>
			</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 900px">
				<colgroup>
					<col><col width="180"><col width="200"><col width="100"><col width="100">
				</colgroup>
				<thead>
				<tr>
					<th>通知标题</th>
					<%--<th>通知内容</th>--%>
					<th>通知发送人</th>
					<th>通知日期</th>
					<th>是否已读</th>
					<th class="manageNotes-th">查看详情</th>
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
$(function () {
//    accessGet(baseu+ '/message/notify/getReceiveNotify/'+localStorage.getItem('ACCESSTOKEN'), function (res) {
//        console.log(res)
//        var datas=res.data,content='', html='';
//        for(var i in datas){
//            content= JSON.parse(datas[i].content).content
//            html+='<tr notid="'+datas[i].notifyId+'"><td>'+datas[i].title+'</td><td>'+(content ? content.substring(0,100)+'...' : '无')+'</td><td>'+(datas[i].nickName? datas[i].nickName: datas[i].mobile)+'</td><td>'+new Date(datas[i].sendtime).toISOString().split(".")[0].split("T")+'</td><td>'+(datas[i].read?'<span style="color: green">已读</span>':'<span style="color: red">未读</span>')+'</td></tr>'
//        }
//        $("#table1 tbody").append(html)
//    })
//
//    $("#table1 tbody").on('click', 'tr', function () {
////	    console.log($(this).attr("notid"))
//        window.location.href='notifyDetail?id='+$(this).attr('notid')
//    })

    layui.use('laypage', function(){
        var laypage = layui.laypage;

        //执行一个laypage实例
        search(1, 10, laypage)
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
                endDate = range[1].trim()
                console.log('startDate',startDate); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log('enddate',endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
        });
    });

    $("#table1 tbody").on('click', '#mn-check', function () {
//	    console.log($(this).attr("notid"))
        window.location.href='notifyDetail?id='+$(this).attr('notid')
    })
    $("#search").on('click', function () {
        search(1, 10, laypage)
    })
    function search(page, limit, laypage) {
        layer.load()
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (limit ? limit : 10),
            page: page,
            title: $('#title').val(),
            startDate: startDate,
            endDate: endDate
        }
        //查询我收到的通知
        accessPost(baseu+ '/message/notify/getReceiveNotify',JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            var datas=res.data,content='', html='';
            for(var i in datas){
//                content= JSON.parse(datas[i].content).content
                html+='<tr><td>'+datas[i].title+'</td>'+ '<td class="manageNotes-th">'+(datas[i].nickName? datas[i].nickName: datas[i].mobile)+'</td><td class="manageNotes-th">'+formatDate(datas[i].sendtime,'yyyy-MM-dd hh:mm:ss')+'</td><td class="manageNotes-th">'+(datas[i].read?'<span style="color: green">已读</span>':'<span style="color: red">未读</span>')+'</td><td class="manageNotes-th"><button type="button" class="manageNotes-buttom" id="mn-check" notid="'+datas[i].notifyId+'">查看</button></td></tr>'
            }
            $("#table1 tbody").html(html)

            if(laypage){
                laypage.render({
                    elem: 'pagebarA'
                    ,count: res.total //数据总数，从服务端得到
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数，比如：
                        console.log("当前页", obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        console.log("数据总数",res.total); //得到每页显示的条数
                        //首次不执行
                        if(!first){
                            search(obj.curr, limit)
                            //do something
                            console.log("do somethis ");
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
