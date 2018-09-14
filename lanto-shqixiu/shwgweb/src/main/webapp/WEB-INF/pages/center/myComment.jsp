<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<style>
	#table td span, #table2 td span{
		margin-right: 5px;
	}
</style>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="Government archives">
		<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
		<div class="zhengwu_r">
			<div class="zhengwu_t">
				<span class="sp_zw">我的点评</span> <span class="sp_wz">您所在位置：<a
					href="${ctx}/center/userInfo">车主中心</a> > <span>我的点评</span></span>
				<input type="text" id="ctx" name="ctx" style="display:none;" value="${ctx}"/>
			</div>
			<div class="biaoge">
				<div class="layui-tab">
					<ul class="layui-tab-title">
						<li >根据车牌号评价</li>
						<li class="layui-this">根据维修记录评价</li>

					</ul>
					<div class="layui-tab-content">
						<div class="layui-tab-item ">

							<table id="table" class="layui-table" lay-size="sm" >
								<colgroup>
									<col width="80">
									<col width="40">
									<col width="150">
									<col width="100">
									<col width="100">
									<col width="100">
								</colgroup>
								<thead>
								<tr>
									<th align="center">点评日期</th>
									<th align="center">评分</th>
									<th align="center">评分详情</th>
									<th align="center">门店名称</th>
									<th align="center">门店地址</th>
									<th align="center">维修车牌</th>
								</tr>
								</thead>
								<tbody>

								</tbody>
							</table>
							<div id="pagebar" style="text-align:center;margin-top:5px;"></div>

						</div>
						<div class="layui-tab-item layui-show">

							<table id="table2" class="layui-table" lay-size="sm" >
								<colgroup>
									<col width="80">
									<col width="40">
									<col width="150">
									<col width="100">
									<col width="100">
									<col width="100">
								</colgroup>
								<thead>
								<tr>
									<th align="center">点评日期</th>
									<th align="center">评分</th>
									<th align="center">评分详情</th>
									<th align="center">门店名称</th>
									<th align="center">门店地址</th>
									<th align="center">维修车牌</th>
								</tr>
								</thead>
								<tbody>

								</tbody>
							</table>
							<div id="pagebar2" style="text-align:center;margin-top:5px;"></div>

						</div>

					</div>
				</div>

			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {
    var laypage = layui.laypage;
    getList(1, 10, laypage)
    getList2(1, 10, laypage)

    function getList(pageNo, pageSize, laypage) {
        var ii = layer.load();
        accessPost(baseu + '/comment/getComments',
            JSON.stringify({
                "userId": JSON.parse(localStorage.getItem("USERINFO")).userId,
	            "page": pageNo|| 1,
	            "pageSize": pageSize|| 10
            }),
            function (res) {
                if(res.code=='000000'){
                    var datas= res.comments, html=''
	                for(var i in datas){
                        html+='<tr>' +
	                        '<td>'+ formatDate( datas[i].createTime, 'yyyy-MM-dd')+'</td>'+
	                        '<td>'+datas[i].userAvgScore+'</td>'+
	                        '<td>'+codatail(datas[i])+'</td>'+
	                        '<td>'+datas[i].companyName+'</td>'+
	                        '<td>'+datas[i].companyAddress+'</td>'+
	                        '<td>'+datas[i].vehicleNum+'</td>'+
                        '</tr>'
	                }
	                $("#table tbody").html(html)
                }
                if(laypage){
                    laypage.render({
                        elem: 'pagebar' //注意，这里的 test1 是 ID，不用加 # 号
                        , count: res.count //数据总数，从服务端得到
                        ,layout: ['count', 'prev', 'page','next']
                        , jump: function (obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            console.log(obj.limit); //得到每页显示的条数
                            //首次不执行
                            if (!first) {
                                getList(obj.curr, obj.limit)
                            }
                        }
                    });
                }
                layer.close(ii);
            })
    }
    function getList2(pageNo, pageSize, laypage) {
        var ii = layer.load();
        accessPost(baseu + '/comment/getComments/repair?accessToken='+ localStorage.getItem("ACCESSTOKEN"),
            JSON.stringify({
                "userId": JSON.parse(localStorage.getItem("USERINFO")).userId,
                "page": pageNo|| 1,
                "pageSize": pageSize|| 10
            }),
            function (res) {
                if(res.code=='000000'){
                    var datas= res.comments, html=''
                    for(var i in datas){
                        html+='<tr>' +
                            '<td>'+ formatDate( datas[i].createTime, 'yyyy-MM-dd')+'</td>'+
                            '<td>'+datas[i].userAvgScore+'</td>'+
                            '<td>'+codatail(datas[i])+'</td>'+
                            '<td>'+datas[i].companyName+'</td>'+
                            '<td>'+datas[i].companyAddress+'</td>'+
                            '<td>'+datas[i].vehicleNum+'</td>'+
                            '</tr>'
                    }
                    $("#table2 tbody").html(html)
                }
                if(laypage){
                    laypage.render({
                        elem: 'pagebar2' //注意，这里的 test1 是 ID，不用加 # 号
                        , count: res.count //数据总数，从服务端得到
                        ,layout: ['count', 'prev', 'page','next']
                        , jump: function (obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            console.log(obj.limit); //得到每页显示的条数
                            //首次不执行
                            if (!first) {
                                getList2(obj.curr, obj.limit)
                            }
                        }
                    });
                }
                layer.close(ii);
            })
    }
    function codatail(item) {
        var detail='<span>履约'+item.keepAppointment+'</span>'+
            '<span>态度'+item.attitude+'</span>'+
            '<span>质量'+item.quailty+'</span>'+
            '<span>速度'+item.speed+'</span>'+
            '<span>价格'+item.price+'</span>'
//	    console.log(detail)
	    return detail
    }
})

</script>
</html>
