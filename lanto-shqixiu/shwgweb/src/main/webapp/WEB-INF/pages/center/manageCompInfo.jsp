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
			<span class="sp_zw">维修企业信息管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/manageHome">管理中心</a> > <span>维修企业信息管理</span></span>
		</div>
		<div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
			<label id="areaLabel" class="layui-form-label">区域</label>
			<div id="areaFilter" class="layui-input-block search_select hoverlist2"
				 style="width: 190px; margin-right: 3px;" data-value=""
				 data-tit="企业区域" data-type="area">
				<div class="layui-unselect layui-form-select">
					<div class="layui-select-title">
						<input type="text" placeholder="企业区域" value="" readonly=""
							   class="layui-input layui-unselect">
						<i class="layui-edge"></i>
					</div>
					<dl class="layui-anim layui-anim-upbit" id="areaList">

					</dl>
				</div>
			</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">企业名称</label>
				<div class="layui-input-block">
					<input id="companyname" type="text" name="title" placeholder="请输企业名称" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">许可证号</label>
				<div class="layui-input-block">
					<input id="companyroadtransportationlicense" type="text" name="title" placeholder="请输许可证号" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">经营地址</label>
				<div class="layui-input-block">
					<input id="companyaddress" type="text" name="title" placeholder="请输经营地址" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">联系方式</label>
				<div class="layui-input-block">
					<input id="companysuperintendentphone" type="text" name="title" placeholder="请输联系方式" autocomplete="off"
						   class="layui-input">
				</div>
			</div>

			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1200px" >
				<colgroup>
					<col width="200">
					<col width="180">
					<col width="200">
					<col width="200">
					<col width="150">
					<col width="150">
					<col width="80">
					<col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>企业名称</th>
					<th>许可证号</th>
					<th>经营地址</th>
					<th>经营范围</th>
					<th>联系电话</th>
					<th>主修品牌</th>
					<th>信誉等级</th>
					<th>收费标准</th>
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
	var areaKey = getUrlParam('areaKey');
	var laypage = layui.laypage;

	$(function () {
		var areaKey = getUrlParam('areaKey')
		layui.use('laypage', function(){
			var laypage = layui.laypage;
			//执行一个laypage实例
			searchA(10, 1, laypage);

		});

	})

	function sendRequest(pageNo, pageSize) {
		var ii = layer.load();
		var areaKey = getUrlParam('areaKey')
		accessPost(baseu + '/company/repaircompany/querydetail',
				JSON.stringify({
					accessToken: localStorage.getItem('ACCESSTOKEN'),
					pageNo: pageNo,
					pageSize: pageSize,
					area: areaKey != null ? areaKey : $('.hoverlist2').attr('data-value'),
					cnt: $('.hoverlist3 .select-this').attr('data-value'),
					companyname: $('#companyname').val()
				}),
				function (resp) {
					handleIfUserNeedToLoginIn(resp, '${ctx}', '${memberUri}');
					var areas = resp.area || []
					if (areas.length > 1 && (areaKey == null || areaKey == '')) {
						var areaHtml = '<dd data-value=\"\" class=""><i class=\"layui-icon\">&#xe605;</i> <span>全部</span></dd>'
						for (var j in areas) {
							areaHtml += '<dd data-value=\"' + areas[j].areaKey + '\" class=\"\"><i class=\"layui-icon\">&#xe605;</i> <span>' + areas[j].areaName + '</span></dd>'
						}
						$("#areaList").html(areaHtml);

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
							html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].area + '</td><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td></tr>'
						}
					} else {
						$('#tableArea').hide()
						for (var i in datas) {
							html += '<tr id="' + datas[i].companyId + '"><td>' + datas[i].companyname.replace(/\"/g, "") + '</td><td>' + (datas[i].cnt ? '是' : '否') + '</td><td>' + (datas[i].cnt ? datas[i].cnt : 0) + '</td><td>' + (datas[i].companyroadtransportationlicense ? datas[i].companyroadtransportationlicense : '') + '</td><td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td></tr>'
						}
					}
					$("#table1 tbody").html(html)
					layer.close(ii);
				}
		)
	}

	function searchA(limit, page, laypageA) {
		layer.load()
		var param = {
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			size: (limit ? limit : 10),
			page: page,
			area: areaKey != null ? areaKey : $('.hoverlist2').attr('data-value'),
			corporate:'',
			companyroadtransportationlicense:$('#companyroadtransportationlicense').val(),
			companyname:$('#companyname').val(),
            companysuperintendentphone:$('#companysuperintendentphone').val(),
			businessaddress:$('#companyaddress').val()
		}
		accessPost(baseu + '/company/repaircompany/query/detail' ,JSON.stringify(param),function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log('res',res)
			var areas = res.area || []
			if (areas.length > 1 && (areaKey == null || areaKey == '')) {
				var areaHtml = '<dd data-value=\"\" class=""><i class=\"layui-icon\">&#xe605;</i> <span>全部</span></dd>'
				for (var j in areas) {
					areaHtml += '<dd data-value=\"' + areas[j].areaKey + '\" class=\"\"><i class=\"layui-icon\">&#xe605;</i> <span>' + areas[j].areaName + '</span></dd>'
				}
				$("#areaList").html(areaHtml);

				var value = $('.hoverlist2').attr('data-value');
				if (value != '') {
					$('.hoverlist2 dd[data-value=' + value + ']').addClass('select-this');
				}
			}
			var datas = res.data, html = '';

			for (var i in datas) {
				html += '<tr><td>' + datas[i].companyname + '</td>' +
						'<td>' + datas[i].companyroadtransportationlicense + '</td>' +
						'<td>' + (datas[i].businessaddress ? datas[i].businessaddress : "" ) + '</td>' +
						'<td>' + (datas[i].companybusinessscope ? datas[i].companybusinessscope : '') + '</td>' +
						'<td>' + datas[i].companysuperintendentphone + '</td>' +
						'<td>' + (datas[i].brand ? datas[i].brand: '') + '</td>' +
						'<td>' + (datas[i].creditLevel ? datas[i].creditLevel : '') + '</td>' +
						'<td>' + (datas[i].hourprice ? datas[i].hourprice : '')  + '</td></tr>'
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

	$('.hoverlist2 dl').on('click', 'dd', function () {
		var par = $(this).parents(".search_select");
		if ($(this).hasClass('select-this')) {
			$(this).removeClass('select-this');
		} else {
			$('.hoverlist2 dl dd').removeClass('select-this');
			$(this).addClass('select-this');
		}
		var items = [];
		var titleItems = [];
		par.find('dl .select-this').each(function () {
			items.push($(this).attr('data-value'));
			titleItems.push($(this).find('span').text());
		});
		if (titleItems && titleItems.length > 0) {
			par.find('input').val(titleItems.join('|'));
			par.attr("title", titleItems.join('|'));
		} else {
			par.find('input').val(par.attr('data-tit'));
			par.attr("title", par.attr('data-tit'));
		}

		if (items && items.length > 0) {
			par.attr("data-value", items.join(','));
		} else {
			par.attr("data-value", '');
		}
	});

</script>
</html>
