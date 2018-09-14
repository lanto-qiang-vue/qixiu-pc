<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<style>
	.questimg img{
		width: 100px;
		height: 100px;
		margin-right: 10px;
	}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">车大夫问题管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/cdf/question4Expert">专家中心</a> > <span>车大夫问题管理</span></span>
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
			<table id="table1" class="layui-table" lay-size="sm">
				<colgroup>
					<%--<col width="50">--%>
					<col width="40">
					<col width="350">
					<col width="100">
					<col width="80">
					<col width="80">
					<col width="80">
					<col width="80">
					<col width="80">
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
					<th style="text-align: center">回答专家</th>
					<th style="text-align: center">回答时间</th>
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
		<div style="width:900px;margin-top: 10px">
			<label class="layui-form-label">问题分类</label>
			<div class="layui-input-block">
				<input id="category" type="text" name="title" autocomplete="off"
					   class="layui-input" disabled>
			</div>
		</div>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">问题内容</label>
			<div class="layui-input-block">
				<%--<textarea id="quesContent" type="text" name="title" placeholder="请输企业名称" autocomplete="off"--%>
					   <%--class="layui-input">--%>
					<textarea id="quesContent" name="content" placeholder="请输入内容"
							  class="layui-textarea notify-detail-input" disabled></textarea>
			</div>
		</div>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">问题图片</label>
			<div class="layui-input-block questimg">

			</div>
		</div>

		<div style="width: 900px;margin-top: 10px">
			<label class="layui-form-label">回答内容</label>
			<div class="layui-input-block">
				<textarea id="expertAnswer" type="text" name="title" autocomplete="off"
					   class="layui-textarea notify-detail-input" placeholder="请输入您的答案"></textarea>
			</div>
		</div>

		<div style="width:90%;text-align: right; margin-top:10px; margin-bottom:10px;">
			<button class="layui-btn layui-btn-normal" lay-filter="" onclick="submitAnswer()">提交</button>
		</div>
	</div>

	<div class="other">
		<div class="other-title">
			<em class="fl" style="padding-left:10px;">其他共<span id="total"></span>回答</em>
		</div>
		<div class="other-content" style="border-bottom:0px;"></div>
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
	var answerTargetQuestionId = null;

	$(function(){
		layui.use('laypage', function(){
			//执行一个laypage实例
			search(10, 1, laypage)

		});

	});

	function search(limit, page, laypage) {
		var ii = layer.load();
		currPage = page;

		var param={
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			pageSize: (limit ? limit : 10),
			pageNo: page,
            category: $('.hoverlist3 .select-this').attr('data-value'),
			content: $('#contentLk').val(),
		}
		accessPost(baseu+ '/cdf/list', JSON.stringify(param), function (res) {
//		accessPost(baseu+ '/center/all', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log(res)
			var html='', data=res.data && res.data.dataList;

			for (var i in data){
				var showDetailButtonHtml = (roleId==5 ? '<button class="layui-btn layui-btn-xs" onclick="showDetail(' + data[i].quesId + ')"  style="font-size:10px">回答</button>' : '');
//				var deleteRowButtonHtml = '<button class="layui-btn layui-btn-danger layui-btn-xs" onclick="deleteRow(' + data[i].id + ')"  style="font-size:10px">删除</button>';
                if(data[i].quesStatus == 1){
                    data[i].quesStatus = '未审核'
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
						'<td align="center">'+ showDetailButtonHtml + '</td>' +
						'<td>'+data[i].quesContent+'</td>' +
						'<td style="text-align: center">'+data[i].quesStatus+'</td>' +
						'<td style="text-align: center">'+(data[i].expertName ? data[i].expertName : '')+'</td> ' +
						'<td style="text-align: center">'+data[i].categoryName+'</td> ' +
						'<td style="text-align: center">'+data[i].userName+'</td> ' +
						'<td style="text-align: center">'+data[i].lastedName+'</td> ' +
						'<td style="text-align: center">'+data[i].lastedTime+'</td> ' +
						'</tr>'
			}
			$("#table1 tbody").html(html)

			count = res.total;

			if(laypage){
				laypage.render({
					elem: 'pagebar'
					,count: res.data && res.data.total //数据总数，从服务端得到
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

	function formatCompanyName(originCompanyName){
		return originCompanyName ? originCompanyName.replace(/"/g, "") : '';
	}

	function showDialog(id){
		answerTargetQuestionId = id;
		$("#expertAnswer").val("");
		layer.open({
			type: 1,
			title: '回答问题',
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
        simpleGet(baseu + '/QxwCdf/article/detail/'+ accessToken + '/' + id ,function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			var datas = res.data;
//            if(datas.status == 1){
//                datas.status = '未审核'
//            }else if(datas.status == 2){
//                datas.status = '审核通过'
//            }else {
//                datas.status = '审核未通过'
//            }

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
//			$("#quesStatus").val(datas.status),
//            $("#expertName").val(datas.expertid)
            $("#category").val(datas.categoryName)
//            $("#userName").val(datas.userid)
            $("#quesContent").val(datas.quesContent)
			$('.dialogContent').attr('id', datas.quesId)

	        var answers= res.data.answer
	        $("#total").text(answers.length)
	        var html=''

            for(var j in res.data.images){
                html+='<img src="'+res.data.images[j]+'"/>'
            }
            $(".questimg").html(html)
            html=''
	        for(var i in answers){
                html+= '<div style="border-bottom: 1px dotted #ccc; margin-bottom: 10px;padding-bottom: 10px;">' +
	                '<div class="photo">' +
	                '<img src='+(answers[i].answerPhoto||'"/statics/images/default_user.png"')+' width="55px" height="58px">' +
	                '<em class="fl">'+ answers[i].answerUserName +'</em>' +
	                '<em class="fr fgray">'+formatDate(answers[i].answerTime, 'yyyy-MM-dd hh:mm:ss')+'</em>' +
	                '</div><div style="margin-left:84px; overflow-x:auto; overflow-y:hidden; +overflow-y:auto; position: relative;word-break:break-all;">'+answers[i].answerContent+'</div></div>'
	        }

	        $(".other-content").html(html)
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

	function showDetail(id){
	    console.log("id",id)
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

	function submitAnswer() {
		var ii = layer.load();
		layer.confirm("确定您要提交回答吗？", {icon: 3, title:'提示'}, function(index){
			var param = {
				accessToken: localStorage.getItem('ACCESSTOKEN'),
				content: $("#expertAnswer").val(),
				isanonymous: false,
				questionId: answerTargetQuestionId
			}
			accessPost(baseu+ '/QxwCdf/addanswer', JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
				console.log(res);
				if(res.code=='000000'){
                    search(10, currPage, laypage);
                    layer.close(index);
                    layer.close(ii);
                    $("#dialog").hide();
				}else{
                    layer.msg(res.status, {time: 2000, icon:5});
                    layer.close(ii);
				}
			})

		}, function(index){
			//按钮【按钮二】的回调
			layer.close(index);
			layer.close(ii);
		});

	}

</script>
</html>
