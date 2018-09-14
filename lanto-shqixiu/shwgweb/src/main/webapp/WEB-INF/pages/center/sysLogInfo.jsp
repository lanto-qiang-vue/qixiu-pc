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
			<span class="sp_zw">用户行为日志列表</span> <span class="sp_wz">您所在位置：<a
				href="/center/runHome">运营商中心</a> > <span>用户行为日志列表</span></span>
		</div>
		<div style="width: 950px;margin-top: 10px">
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">时 间</label>
				<div class="layui-input-block">
					<input type="text" class="layui-input" id="rangeDate" placeholder="请选择日期范围">
				</div>
			</div>
			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 40px;">搜索</div>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table" class="layui-table" lay-size="sm" style="width: 1400px">
				<colgroup>
					<col width="5%">
					<col width="15%">
					<col width="5%">
					<col width="10%">
					<col width="23%">
					<col width="21%">
					<col width="5%">
					<col width="6%">
					<col width="10%">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>远程地址</th>
					<th>类型</th>
					<th>上下文</th>
					<th>请求路径</th>
					<th>用户凭据</th>
					<th>用户名</th>
					<th>请求方法</th>
					<th>请求时间</th>
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
	var laypage = layui.laypage;
	var count = 0;
	var currPage = 1;
    //日期选择器
    var startDate = ''
    var endDate = ''
	$(function(){
		layui.use('laypage', function(){
			//执行一个laypage实例
			search(10, 1, laypage)

		});

        layui.use('laydate', function(){
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#rangeDate' //指定元素
                ,range: '~'
                ,done: function(value){
                    var range = value.split('~');
                    startDate = range[0].trim();
                    endDate = '';
                    if(range.length == 2){
                        endDate = range[1].trim();
					}
                    console.log('startDate',startDate); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                    console.log('enddate',endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                }
            });
        });
        $('#search').click(function () {
            search(10, 1, laypage)
        });
	});

	function search(limit, page, laypage) {
		var ii = layer.load();
		currPage = page;
		var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
			limit: (limit ? limit : 10),
			page: page,
            startDate: startDate,
            endDate: endDate
		}
        console.log('param',param);
		accessPost(baseu+ '/center/sysLog/logList', JSON.stringify(param), function (res) {
			console.log(res)
			if(res && res.code === "000000"){
				var html='', data=res.data;
				for (var i in data){
				    var type = "操作";
				    if(data[i].type == 1){
				        type = "登录";
					}
					if(data[i].type == 2){
				        type = "注销";
					}
                    if(data[i].type == 3){
                        type = "鉴权失败";
                    }
					html+='<tr>';
				    if(param.page == 1){
                        html+='<td>'+(parseInt(i) + 1)+'</td>';
					}else{
                        html+='<td>'+(parseInt((param.page - 1) * param.limit + parseInt(i) + 1))+'</td>';
					}
					html+='<td>'+(data[i].remoteAddress || '')+ '</td>' +
						'<td>'+ type +'</td>' +
						'<td>'+(data[i].context || '')+'</td>' +
						'<td>'+(data[i].path || '')+'</td> ' +
                        '<td>'+(data[i].token || '')+'</td> ' +
                        '<td>'+(data[i].userName || '')+'</td> ' +
                        '<td>'+(data[i].method || '')+'</td> ' +
						'<td>'+(formatDate(data[i].createTime,'yyyy-MM-dd hh:mm:ss') || '')+'</td> ' +
						'</tr>'
				};

				$("#table tbody").html(html)

				if(laypage){
					laypage.render({
						elem: 'pagebar'
						,count: res.total //数据总数，从服务端得到
						,layout: ['count', 'prev', 'page', 'next']
						,curr: currPage
						,jump: function(obj, first){
							//obj包含了当前分页的所有参数，比如：
							console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
							currPage = obj.curr;
							//首次不执行
							if(!first){
								search(limit, obj.curr, laypage)
								//do something
							}
						}
					});
				}
				layer.closeAll();
			}else {
				layer.msg(res.status, {time: 2000, icon:0});
				layer.close(ii);
			}
		})
	}
</script>
<style>

</style>
</html>
