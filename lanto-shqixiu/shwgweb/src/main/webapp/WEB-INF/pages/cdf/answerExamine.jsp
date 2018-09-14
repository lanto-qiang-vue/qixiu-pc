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
			<span class="sp_zw">车大夫回答管理</span> <span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>车大夫回答管理</span></span>
		</div>
		<div style="margin-top:10px">
			<div style="display: inline-block">
				<div style="display: inline-block">
					<label class="layui-form-label" style="margin-right: 15px">答案状态</label>
					<div id="cnt" class="layui-input-inline search_select hoverlist3"
						 style="width: 190px; margin-right: 3px;" data-value=""
						 data-tit="问题分类" data-type="cnt">
						<div class="layui-unselect layui-form-select">
							<div class="layui-select-title">
								<input type="text" placeholder="请选择答案状态" value="" readonly=""
									   class="layui-input layui-unselect">
								<i class="layui-edge"></i>
							</div>
							<dl class="layui-anim layui-anim-upbit">
								<dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>未审核</span>
								</dd>
								<dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>审核通过</span>
								</dd>
								<dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>审核未通过</span>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

			<div id="search" class="layui-btn layui-btn-normal" lay-submit onclick="search(10,1)" style="margin-left: 60px">搜索</div>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1200px">
				<colgroup>
					<col width="50">
					<col width="100">
					<col width="350">
					<col width="350">
					<col width="80">
					<col width="200">
					<col width="200">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>操作</th>
					<th>问题内容</th>
					<th>答案内容</th>
					<th>答案状态</th>
					<th>提问时间</th>
					<th>回答时间</th>
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
<form class="layui-form" action="" id="dialog" style="display: none;">
	<div style="min-height:500px;">
		<div style="width: 900px;margin-top: 10px; ">
			<label class="layui-form-label">回答状态</label>
			<div class="layui-input-block">
				<input id="answerStatus" type="text" name="answerStatus" placeholder="" autocomplete="off"
					   class="layui-input" disabled>
			</div>
		</div>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">问题内容</label>
			<div class="layui-input-block">
				<%--<textarea id="quesContent" type="text" name="title" placeholder="请输企业名称" autocomplete="off"--%>
					   <%--class="layui-input">--%>
					<textarea id="questionContent" name="questionContent" placeholder=""
							  class="layui-textarea notify-detail-input" disabled></textarea>
			</div>
		</div>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">回答内容</label>
			<div class="layui-input-block">
				<%--<textarea id="quesContent" type="text" name="title" placeholder="请输企业名称" autocomplete="off"--%>
					   <%--class="layui-input">--%>
					<textarea id="answerContent" name="answerContent" placeholder=""
							  class="layui-textarea notify-detail-input" disabled></textarea>
			</div>
		</div>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">提问时间</label>
			<div class="layui-input-block">
				<input id="questionTime" type="text" name="questionTime" placeholder="" autocomplete="off"
					   class="layui-input" disabled>
			</div>
		</div>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">回答时间</label>
			<div class="layui-input-block">
				<input id="answerTime" type="text" name="answerTime" placeholder="" autocomplete="off"
					   class="layui-input" disabled>
			</div>
		</div>

		<div style="width:90%;text-align: right; margin-top:10px; margin-bottom:10px;">
			<div style="display:inline-block">
				<div id="updateStatus2Pass" class="layui-btn layui-btn-normal" onclick="updateStatus(2)">通过</div>
			</div>
			<div style="display:inline-block">
				<div id="updateStatus2Unpass" class="layui-btn layui-btn-normal" onclick="updateStatus(3)">不通过</div>
			</div>
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
	var targetAnswerId = null;

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
			status: $('.hoverlist3 .select-this').attr('data-value')
		}
		accessPost(baseu+ '/cdf/answer/list', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log(res)
			var html='', data=res.data.dataList;

			for (var i in data){
				console.log('data[i].quesId: ', data[i].quesId);
				var showDetailButtonHtml = (roleId==4 && !data[i].companyid ? '<button class="layui-btn layui-btn-xs" onclick="showDetail(' + data[i].answerId + ')"  style="font-size:10px">审核</button>' : '');
                if(data[i].answerStatus == 1){
                    data[i].quesStatus = '未审核'
				}else if(data[i].answerStatus == 2){
                    data[i].quesStatus = '审核通过'
                    showDetailButtonHtml= (roleId==4 && !data[i].companyid ? '<button class="layui-btn layui-btn-xs layui-btn-danger" onclick="showDetail(' + data[i].answerId + ')"  style="font-size:10px">驳回</button>' : '');
                }else {
                    data[i].answerStatus = '审核未通过'
                    showDetailButtonHtml=''
				}

				html+='<tr>' +
						'<td>'+(parseInt((param.page - 1) * param.limit + parseInt(i) + 1))+'</td>' +
						'<td>'+ showDetailButtonHtml + '</td>' +
						'<td>'+ (data[i].questionContent || '') +'</td>' +
						'<td>'+ (data[i].answerContent || '') +'</td>' +
						'<td>'+ formatStatusToStatusName(data[i].answerStatus) +'</td>' +
						'<td>'+ formatDate(data[i].questionTime, "yyyy-MM-dd hh:mm:ss") +'</td> ' +
						'<td>'+ formatDate(data[i].answerTime, "yyyy-MM-dd hh:mm:ss") +'</td> ' +
						'</tr>'
			}
			$("#table1 tbody").html(html)

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

	function formatStatusToLabel(statusCode){
		var statusLabel = '';
		switch(statusCode){
			case 1:
				statusLabel = '新增';
				break;
			case 2:
				statusLabel = '已指派企业';
				break;
			case 3:
				statusLabel = '已回复';
				break;
			default:
				statusLabel = '';
		}

		return statusLabel;
	}

	function formatCompanyName(originCompanyName){
		return originCompanyName ? originCompanyName.replace(/"/g, "") : '';
	}

	function updateStatus(status){
		console.log('update');
		var ii = layer.load();
		var laypage = layui.laypage;
		var tip = "";
		if(status == 2){
			tip = "确定要通过该回答吗？"
		}
		if(status == 3){
			tip = "确定不通过该回答吗？"
		}

		layer.confirm(tip, {icon: 3, title:'提示'}, function(index){
			var param={
				accessToken: localStorage.getItem('ACCESSTOKEN'),
				answerId: targetAnswerId,
				status: status,
			}
			accessPost(baseu+ '/cdf/answer/audit', JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
				console.log(res);
				search(10, currPage, laypage);
				layer.close(index);
				layer.close(ii);
				$("#dialog").hide();
			})

		}, function(index){
			//按钮【按钮二】的回调
			layer.close(index);
			layer.close(ii);
		});
	}

	function showDialog(id){
		targetAnswerId = id;
		$("#dialog").show();
		layer.open({
			type: 1,
			title: '回答详情',
			area: ['1000px', '460px'],
			cancel: function(){
				$("#dialog").hide();
			},
			content: $('#dialog'), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
			success: function(layero, index){
				searchA(id, laypageA)
				console.log("id============================111",id)
			}
		});
	}

	function formatStatusToStatusName(statusCode) {
		var statusName = '';
		if(statusCode == 1){
			statusName = '待审核'
		}else if(statusCode == 2){
			statusName = '审核通过'
		}else {
			statusName = '审核未通过'
		}
		return statusName;
	}

	function searchA(id, laypageA) {
		layer.load()
		var accessToken = localStorage.getItem('ACCESSTOKEN');
		var id = id;
		var param = {
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			answerId:id
		}
        accessPost(baseu + '/cdf/answer/detail' , JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log("res",res)
			var datas = res.data;
			$("#answerStatus").val(formatStatusToStatusName(datas.answerStatus));
            $("#questionContent").val(datas.questionContent);
            $("#answerContent").val(datas.answerContent);
            $("#questionTime").val(formatDate(datas.questionTime, "yyyy-MM-dd hh:mm:ss"));
            $("#answerTime").val(formatDate(datas.answerTime, "yyyy-MM-dd hh:mm:ss"));

			dialogCount = res.count;

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

	function showDetail(id){
	    console.log("id",id)
		onsiteServiceId = id;
		showDialog(id);
	}


	$('.hoverlist3 dl').on('click', 'dd', function () {
		var par = $(this).parents(".search_select");
		if ($(this).hasClass('select-this')) {
			$(this).removeClass('select-this');
		} else {
			$('.hoverlist3 dl dd').removeClass('select-this');
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
