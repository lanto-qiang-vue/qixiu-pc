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
			<span class="sp_zw">车大夫问题管理</span> <span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>车大夫问题管理</span></span>
		</div>
		<div>
			<div style="display: inline-block">
				<label class="layui-form-label" style="margin-right: 15px">问题分类</label>
				<div id="cnt" class="layui-input-inline search_select hoverlist3"
					 style="width: 190px; margin-right: 3px;" data-value=""
					 data-tit="问题分类" data-type="cnt">
					<div class="layui-unselect layui-form-select">
						<div class="layui-select-title">
							<input type="text" placeholder="请选择问题分类" value="" readonly=""
								   class="layui-input layui-unselect">
							<i class="layui-edge"></i>
						</div>
						<dl class="layui-anim layui-anim-upbit">
							<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span></dd>
							<dd data-value="10401001" class=""><i class="layui-icon">&#xe605;</i> <span>发动机</span>
							</dd>
							<dd data-value="10401002" class=""><i class="layui-icon">&#xe605;</i> <span>变速箱</span>
							</dd>
							<dd data-value="10401003" class=""><i class="layui-icon">&#xe605;</i> <span>空调</span>
							</dd>
							<dd data-value="10401004" class=""><i class="layui-icon">&#xe605;</i> <span>传动转向</span>
							</dd>
							<dd data-value="10401005" class=""><i class="layui-icon">&#xe605;</i> <span>车身车架</span>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">问题内容</label>
				<div class="layui-input-block">
					<input id="contentLk" type="text" name="title" placeholder="请输入问题内容" autocomplete="off"
						   class="layui-input">
				</div>
			</div>

			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1200px">
				<colgroup>
					<%--<col width="50">--%>
					<col width="40">
					<col width="350">
					<col width="100">
					<col width="80">
					<col width="150">
					<col width="150">
				</colgroup>
				<thead>
				<tr>
					<%--<th>序号</th>--%>
					<th style="text-align: center">操作</th>
					<th>问题内容</th>
					<th style="text-align: center">问题状态</th>
					<th style="text-align: center">提问专家</th>
					<th style="text-align: center">问题分类</th>
					<th style="text-align: center">提问用户</th>
					<%--<th>维修公司</th>--%>
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
<div class="layui-form" action="" id="dialog" style="display: none">
	<div class="dialogContent">
		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">问题状态</label>
			<div class="layui-input-block">
				<input id="quesStatus" type="text" name="title" autocomplete="off"
					   class="layui-input" disabled>
			</div>
		</div>

		<%--<div style="width:900px;margin-top: 10px">--%>
			<%--<label class="layui-form-label">提问专家</label>--%>
			<%--<div class="layui-input-block">--%>
				<%--<input id="expertName" type="text" name="title" placeholder="请输经营地址" autocomplete="off"--%>
					   <%--class="layui-input">--%>
			<%--</div>--%>
		<%--</div>--%>

		<div style="width:900px;margin-top: 10px">
			<label class="layui-form-label">问题分类</label>
			<div class="layui-input-block">
				<input id="category" type="text" name="title" autocomplete="off"
					   class="layui-input" disabled>
			</div>
		</div>

		<%--<div style="width: 900px;margin-top: 10px">--%>
			<%--<label class="layui-form-label">提问用户</label>--%>
			<%--<div class="layui-input-block">--%>
				<%--<input id="userName" type="text" name="title" placeholder="请输经营地址" autocomplete="off"--%>
					   <%--class="layui-input">--%>
			<%--</div>--%>
		<%--</div>--%>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">问题内容</label>
			<div class="layui-input-block">
				<%--<textarea id="quesContent" type="text" name="title" placeholder="请输企业名称" autocomplete="off"--%>
					   <%--class="layui-input">--%>
					<textarea id="quesContent" name="content" placeholder="请输入内容"
							  class="layui-textarea notify-detail-input" disabled></textarea>
			</div>
		</div>

		<div style="width:900px;margin-top: 10px">
			<label class="layui-form-label">问题图片</label>
			<div class="layui-input-block imgblock">

			</div>
		</div>



		<div style="width:90%;text-align: right">
			<button class="layui-btn layui-btn-normal" lay-filter="" onclick="updateStatus(2)">通过</button>
			<button class="layui-btn layui-btn-normal" lay-filter="" onclick="updateStatus(3)">不通过</button>
			<%--<button id="searchB" class="layui-btn layui-btn-normal" lay-submit lay-filter="">审核未通过</button>--%>
		</div>
	</div>
	<%--<div style="min-height: 445px; padding:20px 20px 20px 20px;">--%>
		<%--<div class="biaoge" style="overflow: scroll; min-height: 445px;">--%>
			<%--<table id="table2" class="layui-table" lay-size="sm" style="width: 1000px" >--%>
				<%--<colgroup>--%>
					<%--<col width="200"><col width="200"><col width="150"><col width="150"><col width="150">--%>
				<%--</colgroup>--%>
				<%--<thead>--%>
				<%--<tr>--%>
					<%--<th>企业名称</th>--%>
					<%--<th>许可证号</th>--%>
					<%--<th>经营地址</th>--%>
					<%--<th>法定代表人</th>--%>
					<%--<th>联系方式</th>--%>
				<%--</tr>--%>
				<%--</thead>--%>
				<%--<tbody>--%>

				<%--</tbody>--%>
			<%--</table>--%>

			<%--<div id="pagebarA" style="text-align:center;margin-top:5px;"></div>--%>
		<%--</div>--%>
	<%--</div>--%>

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
					search(10, currPage, laypage);
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
            limit: (limit ? limit : 10),
            page: page,
            category: $('.hoverlist3 .select-this').attr('data-value'),
            contentLk: $('#contentLk').val()
		}
		accessPost(baseu+ '/center/all', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log(res)
			var html='', data=res.data.dataList;

			for (var i in data){
				var setCompanyButtonHtml = (roleId==4 && data[i].quesStatus==1 && !data[i].companyid ? '<button class="layui-btn layui-btn-xs" onclick="setCompany(' + data[i].quesId + ')"  style="font-size:10px">审核</button>' : '');
                if(data[i].quesStatus == 1){
                    data[i].quesStatus = '待审核'
				}else if(data[i].quesStatus == 2){
                    data[i].quesStatus = '审核通过'
				}else {
                    data[i].quesStatus = '审核未通过'
				}

				if('10401001' === data[i].category) {
                    data[i].categoryName = '发动机';
				} else if('10401002' === data[i].category) {
                    data[i].categoryName = '变速箱';
                } else if('10401003' === data[i].category) {
                    data[i].categoryName = '空调';
                } else if('10401004' === data[i].category) {
                    data[i].categoryName = '传动转向';
                } else if('10401005' === data[i].category) {
                    data[i].categoryName = '车身车架';
                } else {
                    data[i].categoryName = '其他';
				}

				html+=
					'<tr>' +
//						'<td>'+(parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1))+'</td>' +
						'<td align="center">'+
						setCompanyButtonHtml + '</td>' +
						'<td>'+data[i].quesContent+'</td>' +
						'<td style="text-align: center">'+data[i].quesStatus+'</td>' +
						'<td style="text-align: center">'+(data[i].expertName ? data[i].expertName : '')+'</td> ' +
						'<td style="text-align: center">'+data[i].categoryName+'</td> ' +
						'<td style="text-align: center">'+data[i].userName+'</td> ' +
						'</tr>'
			}
			$("#table1 tbody").html(html)

			count = res.total;

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

	function showDialog(id){
		layer.open({
			type: 1,
			title: '审核',
			area: ['90vw', '90vh'],
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

	function searchA(id, laypageA) {
		layer.load()
		var accessToken = localStorage.getItem('ACCESSTOKEN');
		var id = id;
		var param = {
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			id:id
//			size: (limit ? limit : 10),
//			page: page,
//			corporate:'',
//			companyroadtransportationlicense:$('#companyroadtransportationlicense').val(),
//			companyname:$('#companyname').val(),
//			companylinkmantel:$('#companylinkmantel').val(),
//			companyaddress:$('#companyaddress').val()
		}
        simpleGet(baseu + '/QxwCdf/question/getId/'+ accessToken + '/' + id ,function (res) {

			var datas = res.answerAndImgBO;
            if(datas.status == 1){
                datas.status = '未审核'
            }else if(datas.status == 2){
                datas.status = '审核通过'
            }else {
                datas.status = '审核未通过'
            }

            if('10401001' === datas.category) {
                datas.categoryName = '发动机';
            } else if('10401002' === datas.category) {
                datas.categoryName = '变速箱';
            } else if('10401003' === datas.category) {
                datas.categoryName = '空调';
            } else if('10401004' === datas.category) {
                datas.categoryName = '传动转向';
            } else if('10401005' === datas.category) {
                datas.categoryName = '车身车架';
            } else {
                datas.categoryName = '其他';
            }

			console.log("datas",datas)
			$("#quesStatus").val(datas.status),
            $("#expertName").val(datas.expertid)
            $("#category").val(datas.categoryName)
            $("#userName").val(datas.userid)
            $("#quesContent").val(datas.content)
//            $("#quesimg").attr('src',datas.path)
			$('.dialogContent').attr('id', datas.id)

            $(".imgblock").html("")
	        if(datas.images)
	        for(var i in datas.images){
                $(".imgblock").append('<img class="quesimg" src="'+datas.images[i]+'" height="200" width="200" style="margin: 5px;border: 1px solid black;cursor: pointer" onclick="bigPic(this)">')
	        }

			layer.closeAll('loading');

		})
	}

    function updateStatus(status) {
        var id = $('.dialogContent').attr('id');
		console.log($('.dialogContent').attr('id'))
        simpleGet(baseu + '/QxwCdf/question/status/'+ localStorage.getItem('ACCESSTOKEN')	 + '/' + id + '/' + status ,function (res) {
			layer.msg('操作成功');
			setTimeout(function (e) {
                layer.closeAll();
                $("#dialog").hide();
                search(10, 1, laypage);
            },1000);
        })
    }

	$("#search").on('click', function () {
		search(10, 1, laypage)
	})

	function setCompany(id){
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

    function bigPic(e){
        console.log($(e).attr("height"))
        var h = $(e).attr("height");
        var w = $(e).attr("width");
        if(w!=200||h!=200){
            $(e).attr("height","200");
            $(e).attr("width","200");
		}
          else{
            $(e).attr("height","");
            $(e).attr("width","");
		}
    }

</script>
</html>
