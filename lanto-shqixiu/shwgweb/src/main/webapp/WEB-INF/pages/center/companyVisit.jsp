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
			<span class="sp_zw">上门服务管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome">企业中心</a> > <span>上门服务管理</span></span>
		</div>
		<div style="width: 950px;margin-top: 10px">
			<div style="width: 300px;display: inline-block">
				<label class="layui-form-label">联系人</label>
				<div class="layui-input-block">
					<input id="ownerName" type="text" name="ownerName" placeholder="请输联系人" maxlength="15"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block">
				<label class="layui-form-label">联系方式</label>
				<div class="layui-input-block">
					<input id="contactMobile" type="text" name="contactMobile" placeholder="请输联系方式" maxlength="20"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block">
				<label class="layui-form-label">上门服务地址</label>
				<div class="layui-input-block">
					<input id="contactAddress" type="text" name="contactAddress" placeholder="请输上门服务地址" maxlength="50"
						   class="layui-input">
				</div>
			</div>
			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 40px;">搜索</div>

		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1080px">
				<colgroup>
					<col width="50">
					<col width="200">
					<col width="200">
					<col width="100">
					<col width="80">
					<col width="150">
					<col width="150">
					<col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>操作</th>
					<th>服务内容</th>
					<th>服务状态</th>
					<th>联系人</th>
					<th>联系方式</th>
					<th>上门服务地址</th>
					<th>维修公司</th>
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

<%--选择维修企业弹出框--%>
<form class="layui-form" action="" id="dialog" style="display: none">
	<div>
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
				<input id="companylinkmantel" type="text" name="title" placeholder="请输联系方式" autocomplete="off"
					   class="layui-input">
			</div>
		</div>

		<div id="searchA" class="layui-btn layui-btn-normal" lay-submit lay-filter="">搜索</div>
	</div>
	<div style="min-height: 445px; padding:20px 20px 20px 20px;">
		<div class="biaoge" style="overflow: scroll; min-height: 445px;">
			<table id="table2" class="layui-table" lay-size="sm" style="width: 1000px" >
				<colgroup>
					<col width="200"><col width="200"><col width="150"><col width="150"><col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>企业名称</th>
					<th>许可证号</th>
					<th>经营地址</th>
					<th>法定代表人</th>
					<th>联系方式</th>
				</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<div id="pagebarA" style="text-align:center;margin-top:5px;"></div>
		</div>
	</div>

</form>

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
		$("#table2 tbody").on('click','tr', function () {
			if(onsiteServiceId){
				var param = {
					accessToken: localStorage.getItem('ACCESSTOKEN'),
					id: onsiteServiceId,
					companyId: $(this).attr('id')
				};
				accessPost(baseu+ '/maintain/setRepairCompany', JSON.stringify(param), function (res) {
					handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
					console.log(res)
					layer.closeAll();

					$("#dialog").hide();
					search(10, currPage, laypage)
				})
			}
		})
	});

	function search(limit, page, laypage) {
		var ii = layer.load();
		currPage = page;
		var statusArray = [];

		if(roleId==2){
			//维修企业的情况，搜索status为2，3的数据
			statusArray=[2,3];
		}

		if(roleId==4){
			//运营商的情况，搜索status为1，2，3的数据
			statusArray=[1,2,3];
		}

		var param={
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			pageSize: (limit ? limit : 10),
			pageNo: page,
			companyId: getUrlParam('company_id'),
			statusArray: statusArray,
            contactAddress: $('#contactAddress').val(),
            ownerName: $('#ownerName').val(),
            contactMobile: $('#contactMobile').val()
		}
		accessPost(baseu+ '/maintain/getOnsiteServicelist', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log(res)
			var html='', data=res.data;

			for (var i in data){
				var replayButtonHtml = (roleId==2 && data[i].status==2 ? '<button class="layui-btn layui-btn-normal layui-btn-xs" onclick="updateStatusToReply(' + data[i].id + ')" style="font-size:10px">已回复</button>' : '');
				var setCompanyButtonHtml = (roleId==4 ? '<button class="layui-btn layui-btn-xs" onclick="setCompany(' + data[i].id + ')"  style="font-size:10px">指定维修企业</button>' : '');
				var deleteRowButtonHtml = '<button class="layui-btn layui-btn-danger layui-btn-xs" onclick="deleteRow(' + data[i].id + ')"  style="font-size:10px">删除</button>';
				html+='<tr>' +
						'<td>'+(parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1))+'</td>' +
						'<td>'+ deleteRowButtonHtml +
						replayButtonHtml +
						setCompanyButtonHtml + '</td>' +
						'<td>'+formatServiceTypeToLabel(data[i].servicetype)+'</td>' +
						'<td>'+formatStatusToLabel(data[i].status)+'</td>' +
						'<td>'+data[i].ownername+'</td> ' +
						'<td>'+data[i].contactmobile+'</td> ' +
						'<td>'+(data[i].contactaddress || '')+'</td> ' +
						'<td>'+formatCompanyName(data[i].companyName || '')+'</td> ' +
//						'<td>'+(data[i].createtime ? new Date(data[i].createtime) : '')+'</td>' +
						'</tr>'
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
				statusLabel = '待指派';
				break;
			case 2:
				statusLabel = '已指派';
				break;
			case 3:
				statusLabel = '已回复';
				break;
			default:
				statusLabel = '';
		}

		return statusLabel;
	}

	function formatServiceTypeToLabel(serviceTypeCodes){
		var serviceTypeLabel = '';
		var serviceTypeCodeList = serviceTypeCodes ? serviceTypeCodes.split(',') : '';

		if(serviceTypeCodeList && serviceTypeCodeList.length){
			serviceTypeCodeList.forEach(
					function(serviceTypeCode){
						switch(serviceTypeCode){
							case '300001':
								serviceTypeLabel = serviceTypeLabel + '上门故障诊断' + ' ';
								break;
							case '300002':
								serviceTypeLabel = serviceTypeLabel + '上门取送车服务' + ' ';
								break;
							case '300003':
								serviceTypeLabel = serviceTypeLabel + '上门更换备胎' + ' ';
								break;
							case '300004':
								serviceTypeLabel = serviceTypeLabel + '上门更换灯泡' + ' ';
								break;
							case '300005':
								serviceTypeLabel = serviceTypeLabel + '上门更换雨刮片' + ' ';
								break;
							case '300006':
								serviceTypeLabel = serviceTypeLabel + '上门电瓶泵电' + ' ';
								break;
							case '300007':
								serviceTypeLabel = serviceTypeLabel + '其他' + ' ';
								break;
							default:
								serviceTypeLabel = serviceTypeLabel + '';
						}
					}
			)
		}

		return serviceTypeLabel;
	}

	function formatCompanyName(originCompanyName){
		return originCompanyName ? originCompanyName.replace(/"/g, "") : '';
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
			accessPost(baseu+ '/maintain/updateStatus2Reply', JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
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
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
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

	function showDialog(){
		layer.open({
			type: 1,
			title: '指定维修企业',
			area: ['800px', '500px'],
			cancel: function(){
				$("#dialog").hide();
			},
			content: $('#dialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
			success: function(layero, index){
				searchA(10, 1, laypageA)

			}
		});
	}

	function searchA(limit, page, laypageA) {
		layer.load()
		var param = {
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			size: (limit ? limit : 10),
			page: page,
			corporate:'',
			companyroadtransportationlicense:$('#companyroadtransportationlicense').val(),
			companyname:$('#companyname').val(),
			companylinkmantel:$('#companylinkmantel').val(),
			companyaddress:$('#companyaddress').val()
		}
		accessPost(baseu + '/company/repaircompany/company/list' ,JSON.stringify(param),function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log(res)
			var datas = res.data, html = '';
			for (var i in datas) {
				html += '<tr id="'+datas[i].companyId+'">' +
						'<td>' + (datas[i].companyname || '') + '</td>' +
						'<td>' + (datas[i].companyroadtransportationlicense || '') + '</td>' +
						'<td>' + (datas[i].companyaddress || '') + '</td>' +
						'<td>' + (datas[i].corporate || '') + '</td>' +
						'<td>' + (datas[i].companylinkmantel || '') + '</td>' +
						'</tr>'
			}

			dialogCount = res.count;

			$("#table2 tbody").html(html)
			dialogCount = page;
			if(laypageA){
				laypageA.render({
					elem: 'pagebarA'
					,count: res.total //数据总数，从服务端得到
					,curr: dialogCount
					,jump: function(obj, first){
						//obj包含了当前分页的所有参数，比如：
						dialogCount = obj.curr;
						//首次不执行
						if(!first){
							searchA(10, obj.curr)
						}
					}
				});
			}
			layer.closeAll('loading');

		})
	}

	$("#searchA").on('click', function () {
		searchA(10, 1, laypageA)
	})

	function setCompany(id){
		onsiteServiceId = id;
		showDialog(id);
	}

</script>
</html>
