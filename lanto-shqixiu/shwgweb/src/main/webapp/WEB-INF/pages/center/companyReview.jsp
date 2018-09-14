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
			<span class="sp_zw">维修企业评价管理</span> <span class="sp_wz">您所在位置：<a
				href="##">维修企业评价管理</a> > <span>维修企业评价列表</span></span>
		</div>
		<div style="width: 950px;margin-top: 10px;display: none;">
			<div style="width: 300px;display: inline-block">
				<label class="layui-form-label">预约联系人</label>
				<div class="layui-input-block">
					<input id="ownerName" type="text" name="ownerName" placeholder="请输预约联系人" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block">
				<label class="layui-form-label">联系方式</label>
				<div class="layui-input-block">
					<input id="contactMobile" type="text" name="contactMobile" placeholder="请输联系方式" autocomplete="off"
						   class="layui-input">
				</div>
			</div>

			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 40px;">搜索</div>

		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table" class="layui-table" lay-size="sm" style="width: 1120px">
				<colgroup>
					<col width="50">
					<col width="130">
					<col width="130">
					<col width="80">
					<col width="80">
					<col width="80">
					<col width="80">
					<col width="80">
					<col width="80">
					<col width="80">
					<col width="100">
					<col width="150">
				<thead>
				<tr>
					<th style="text-align: center;">序号</th>
					<th style="text-align: center;">操作</th>
					<th style="text-align: center;">被评价企业名称</th>
					<th style="text-align: center;">评价人</th>
					<th style="text-align: center;">维修速度</th>
					<th style="text-align: center;">维修质量</th>
					<th style="text-align: center;">维修价格</th>
					<th style="text-align: center;">服务态度</th>
					<th style="text-align: center;">履约情况</th>
					<th style="text-align: center;">综合评分</th>
					<th style="text-align: center;">结算清单编号</th>
					<th>评价内容</th>
				</tr>
				</thead>
				<tbody id="tablebody">

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
	var roleId = info.userRoleId || '';
	var onsiteServiceId = null;
	var laypage = layui.laypage;
	var count = 0;
	var currPage = 1;
	var dialogCount = 0;
	var dialogCurrPage = 1;

	$(function(){
        getAjaxData(1);
	});
    function getAjaxData(page, limit){
        var tempLimit = (limit ? limit : 10);
        currPage = page;
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: tempLimit,
            pageNo: page,
        }
        accessPost(baseu + '/companyRepair/getPageRepairList' ,JSON.stringify(param),function (res) {
            var datas = res.userCompanyRepairList, html = '';
            var index = 0;
            for (var i in datas) {
				var passBtn = '';
				var delBtn = '<button class="layui-btn layui-btn-danger layui-btn-small" onclick="delRow(' + datas[i].reviewId + ')">删除</button>'
				if(datas[i].isdisable == true){
					passBtn = '<button class="layui-btn layui-btn-normal layui-btn-small" onclick="passRow(' + datas[i].reviewId +  ',' + false + ')">通过</button>'
				}
				index++;
                html += '<tr id="'+datas[i].reviewId+'">' +
                    '<td style="text-align: center;">' + (parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1)) + '</td>' +
					'<td style="text-align: center;">' + delBtn + passBtn + '</td>' +
					'<td style="text-align: center;">' + (datas[i].companyName || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].username || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].speed || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].quality || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].price || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].attitude || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].performance || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].composite || '') + '</td>' +
                    '<td style="text-align: center;">' + (datas[i].costlistcode || '') + '</td>' +
                    '<td><textarea>' + (datas[i].jsoninfo || '') + '</textarea></td>' +
                    '</tr>'

            }

            $("#tablebody").empty();
            if(!datas || datas.length == 0){
                $("#tablebody").append('<tr><td colspan="5" style="padding:50px 0px;text-align:center;color:#999;">未查询到数据</td></tr>');
            }else if(res.code == "130410") {
                $("#tablebody").append('<tr><td colspan="5" style="padding:50px 0px;text-align:center;color:#999;">'+res.status+'</td></tr>');
            }else if(res.code == "error") {
                $("#tablebody").append('<tr><td colspan="5" style="padding:50px 0px;text-align:center;color:#999;">'+res.status+'</td></tr>');
            }else{
                $("#tablebody").append(html);
            }

            laypage.render({
                elem: 'pagebar'
                ,count: res.count //数据总数，从服务端得到
                ,curr: currPage
                ,jump: function(obj, first){
                    //obj包含了当前分页的所有参数，比如：
                    console.log('obj.curr: ', obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    currPage = obj.curr;
                    //首次不执行
                    if(!first){
                        getAjaxData(currPage);
                        //do something
                    }
                }
            });

        })

    }

	function passRow(reviewId,isdisable){
		console.log('ppppp',reviewId,isdisable);
		layer.confirm('确认通过该评论吗?', {icon: 3, title:'提示'}, function(index){
			var ii = layer.load();
			var param = {
				accessToken: localStorage.getItem('ACCESSTOKEN'),
				reviewId: reviewId,
				isdisable:isdisable
			};
			console.log('param',param);
			accessPost(baseu+ '/company/review/approve/' + reviewId, JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
				console.log(res);
				getAjaxData(1);
				layer.close(ii);
				layer.msg(res.status);

			})

			layer.close(index);
		}, function(index){
			//按钮【按钮二】的回调
			layer.close(index);
		});

	}

	//刪除
	function delRow(reviewId){
		layer.confirm('确认删除该条数据吗?', {icon: 3, title:'提示'}, function(index){
			var ii = layer.load();
			var param = {
				accessToken: localStorage.getItem('ACCESSTOKEN'),
				reviewId : reviewId
			};
			accessPost(baseu+ '/company/review/delete/' + reviewId, JSON.stringify(param), function (res) {
				handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
				console.log(res);
				getAjaxData(1);
				layer.close(ii);
				layer.msg(res.status);

			})

			layer.close(index);
		}, function(index){
			//按钮【按钮二】的回调
			layer.close(index);
		});
	}
</script>
</html>
