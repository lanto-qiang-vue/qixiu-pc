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
			<span class="sp_zw">岗位管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/sysLogInfo">企业中心</a> > <span>岗位管理</span></span>
		</div>
		<div style="width: 950px;margin-top: 10px">
			<div style="width: 400px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">关键字</label>
				<div class="layui-input-block">
					<input type="text" class="layui-input" id="key" placeholder="请输入岗位名称、岗位编号或工作地点">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">岗位类型</label>
				<div class="layui-input-block">
					<div id="postType" class="layui-input-inline search_select hoverlist"
						 style="width: 190px; margin-right: 3px;" data-value=""
						 data-type="postType">
						<div class="layui-unselect layui-form-select">
							<div class="layui-select-title">
								<input type="text" placeholder="请选择岗位类型" value="" readonly=""
									   class="layui-input layui-unselect">
								<i class="layui-edge"></i>
							</div>
							<dl class="layui-anim layui-anim-upbit">
								<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span>
								</dd>
								<dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>实习职位</span>
								</dd>
								<dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>社会职位</span>
								</dd>
								<dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>基层职位</span>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 40px;">搜索</div>
			<div id="add" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 40px;">新增岗位</div>
		</div>
		<div class="layui-tab layui-tab-card" lay-filter="demo">
			<ul class="layui-tab-title">
				<li class="layui-this" id="released">发布中</li>
				<li id="unreleased">未发布</li>
				<li id="stoped">暂停</li>
				<li id="all">全部</li>
			</ul>
			<div class="layui-tab-content" style="height: 100%;">
				<div class="layui-tab-item layui-show" style="overflow: auto">
					<div class="biaoge">
						<table id="releasedTable" class="layui-table" lay-size="sm" style="width: 1200px">
							<colgroup>
								<col width="15%">
								<col width="15%">
								<col width="20%">
								<col width="10%">
								<col width="8%">
								<col width="8%">
								<col width="24%">
							</colgroup>
							<thead>
							<tr>
								<th>岗位名称</th>
								<th>企业名称</th>
								<th>工作地点</th>
								<th>发布日期</th>
								<th>开始日期</th>
								<th>结束日期</th>
								<th>操作</th>
							</tr>
							</thead>
							<tbody>
							</tbody>
						</table>

						<div id="releasedTablePagebar" style="text-align:center;margin-top:5px;"></div>
					</div>
				</div>
				<div class="layui-tab-item" style="overflow: auto">
					<div class="biaoge">
							<table id="unreleasedTable" class="layui-table" lay-size="sm" style="width: 1200px">
								<colgroup>
									<col width="15%">
									<col width="15%">
									<col width="20%">
									<col width="10%">
									<col width="8%">
									<col width="8%">
									<col width="24%">
								</colgroup>
								<thead>
								<tr>
									<th>岗位名称</th>
									<th>企业名称</th>
									<th>工作地点</th>
									<th>发布日期</th>
									<th>开始日期</th>
									<th>结束日期</th>
									<th>操作</th>
								</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
							<div id="unreleasedTablePagebar" style="text-align:center;margin-top:5px;"></div>
						</div>
				</div>
				<div class="layui-tab-item" style="overflow: auto">
					<div class="biaoge">
							<table id="stopedTable" class="layui-table" lay-size="sm" style="width: 1200px">
								<colgroup>
									<col width="15%">
									<col width="15%">
									<col width="20%">
									<col width="10%">
									<col width="8%">
									<col width="8%">
									<col width="24%">
								</colgroup>
								<thead>
								<tr>
									<th>岗位名称</th>
									<th>企业名称</th>
									<th>工作地点</th>
									<th>发布日期</th>
									<th>开始日期</th>
									<th>结束日期</th>
									<th>操作</th>
								</tr>
								</thead>
								<tbody>
								</tbody>
							</table>

							<div id="stopedTablePagebar" style="text-align:center;margin-top:5px;"></div>
						</div>
				</div>
				<div class="layui-tab-item" style="overflow: auto">
					<div class="biaoge">
							<table id="allTable" class="layui-table" lay-size="sm" style="width: 1200px">
								<colgroup>
									<col width="15%">
									<col width="15%">
									<col width="20%">
									<col width="10%">
									<col width="8%">
									<col width="8%">
									<col width="24%">
								</colgroup>
								<thead>
								<tr>
									<th>岗位名称</th>
									<th>企业名称</th>
									<th>工作地点</th>
									<th>发布日期</th>
									<th>开始日期</th>
									<th>结束日期</th>
									<th>操作</th>
								</tr>
								</thead>
								<tbody>
								</tbody>
							</table>

							<div id="allTablePagebar" style="text-align:center;margin-top:5px;"></div>
						</div>
				</div>
			</div>
				</div>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    var info = JSON.parse(localStorage.getItem('USERINFO'));
	var laypage = layui.laypage;
    var element = layui.element;
	var count = 0;
	var currPage = 1;
    //日期选择器
	var tableId = 'releasedTable';
    var key = '';
    var postType = '';
	$(function(){
		layui.use(['laypage','element'], function(){
			//执行一个laypage实例
			search(10, 1, laypage,tableId);
			//监听Tab切换
            element.on('tab(demo)', function(data) {
                tableId = this.id + 'Table';
                search(10, 1, laypage, tableId);
            });
		});

        $('#search').click(function () {
            key = $("#key").val();
            postType = $('.hoverlist .select-this').attr('data-value') || '';
            search(10, 1, laypage, tableId);
        });

        $('#add').click(function () {
			location.href = ctx +'/center/addPost';
        });
	});

	function search(limit, page, laypage, tableId) {
		var ii = layer.load();
		currPage = page;
		var status = '';
		if(tableId == 'releasedTable'){
            status = 1;
		}else if(tableId == 'unreleasedTable'){
            status = 2;
		}else if(tableId == 'stopedTable'){
            status = 3;
		}
		var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
			limit: (limit ? limit : 10),
			page: page,
            status: status,
            key: key,
            postType: postType
		}
        console.log('param',param);
		accessPost(baseu+ '/center/companyPost/postList', JSON.stringify(param), function (res) {
			console.log(res)
			if(res && res.code === "000000"){
				var html='', data=res.data;
				for (var i in data){
					html+='<tr>';
                    //置顶 再发布 查看简历 暂停
					var link = '<td>';
                    link += '<button class="layui-btn layui-btn-normal layui-btn-small" onclick="postToTop('+(data[i].id || '')+','+(data[i].corpId || '')+','+(data[i].seq || '')+')">置顶</button>';

					if(data[i].status == 1){
                        link += '<button class="layui-btn layui-btn-normal layui-btn-small" onclick="stop('+(data[i].id || '')+')">暂停</button>';
                        link += '<button class="layui-btn layui-btn-normal layui-btn-small" onclick="refresh('+(data[i].id || '')+')">刷新</button>';
					}else if(data[i].status == 2){
                        link += '<button class="layui-btn layui-btn-normal layui-btn-small" onclick="publish('+(data[i].id || '')+')">发布</button>';
                    }else if(data[i].status == 3){
                        link += '<button class="layui-btn layui-btn-normal layui-btn-small" onclick="publish('+(data[i].id || '')+')">再发布</button>';
                    }
                    link += '<button class="layui-btn layui-btn-normal layui-btn-small" onclick="detailRow(' + data[i].id + ')">查看简历</button>';
                    link += '</td>';
					html+='<td><a href="'+ctx+'/center/addPost?id='+(data[i].id || '')+'" style="color: blue;">'+(data[i].postName || '')+ '</a></td>' +
						'<td>'+ (data[i].corpName || '') +'</td>' +
						'<td>'+(data[i].address || '')+'</td>' +
						'<td>'+(formatDate(data[i].publishTime,'yyyy-MM-dd') || '')+'</td> ' +
                        '<td>'+(formatDate(data[i].beginTime,'yyyy-MM-dd') || '')+'</td> ' +
                        '<td>'+(formatDate(data[i].endTime,'yyyy-MM-dd') || '')+'</td> ' + link
						'</tr>'
				};

				$("#"+tableId+" tbody").html(html);

				if(laypage){
					laypage.render({
						elem: tableId + 'Pagebar'
						,count: res.total //数据总数，从服务端得到
						,layout: ['count', 'prev', 'page', 'next']
						,curr: currPage
						,jump: function(obj, first){
							//obj包含了当前分页的所有参数，比如：
							console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
							currPage = obj.curr;
							//首次不执行
							if(!first){
								search(limit, obj.curr, laypage, tableId)
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
	function postToTop(id,corpId,seq){
        layer.confirm('确认置顶该岗位吗?', {icon: 3, title:'提示'}, function(index){
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                id: id,
                corpId: corpId,
                seq: seq
            };
            accessPost(baseu+ '/center/companyPost/postToTop', JSON.stringify(param), function (res) {
                console.log(res);
                if(res.code == '000000'){
                    search(10, 1, laypage, tableId);
                }
                layer.msg(res.status);
            })
            layer.close(ii);
            layer.close(index);
        }, function(index){
            layer.close(index);
        });
	}
	function stop(id){
        layer.confirm('确认暂停该岗位吗?', {icon: 3, title:'提示'}, function(index){
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                status : 3,
				id: id
            };
            accessPost(baseu+ '/center/companyPost/update/' + id, JSON.stringify(param), function (res) {
                console.log(res);
                if(res.code == '000000'){
                    search(10, 1, laypage, tableId);
                }
                layer.msg(res.status);
            })
            layer.close(ii);
            layer.close(index);
        }, function(index){
            layer.close(index);
        });
	}
    function refresh(id){
        var ii = layer.load();
		var param = {
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			id: id,
            status : 1
		};
		accessPost(baseu+ '/center/companyPost/update/' + id, JSON.stringify(param), function (res) {
			console.log(res);
			layer.msg(res.status);
		})
		layer.close(ii);
    }
	function publish(id){
        layer.confirm('确认发布该岗位吗?', {icon: 3, title:'提示'}, function(index){
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                status : 1,
                id: id
            };
            accessPost(baseu+ '/center/companyPost/update/' + id, JSON.stringify(param), function (res) {
                console.log(res);
                if(res.code == '000000'){
                    search(10, 1, laypage, tableId);
                }
                layer.msg(res.status);
            })
            layer.close(ii);
            layer.close(index);
        }, function(index){
            layer.close(index);
        });
	}
    function detailRow(id){
        window.location.href = '/shwgweb/center/postResumes?id=' + id;
    }
    $('.hoverlist dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist dl dd').removeClass('select-this');
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
