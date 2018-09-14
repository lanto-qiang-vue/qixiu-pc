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
	table .layui-btn{
		margin-bottom: 5px;
	}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">文章信息列表</span> <span class="sp_wz">您所在位置：<a
				href="/center/runHome">运营商中心</a> > <span>文章信息列表</span></span>
		</div>
		<div style="margin-top: 10px" class="layui-form">
			<%--<div style="width: 300px;display: inline-block;margin-top: 10px">--%>
				<%--<label class="layui-form-label">文章标题</label>--%>
				<%--<div class="layui-input-block">--%>
					<%--<input id="title" type="text" name="title" placeholder="请输入文章标题" autocomplete="off" class="layui-input">--%>
				<%--</div>--%>
			<%--</div>--%>
			<div class="layui-form-item layui-inline" style="width: 300px">
				<label class="layui-form-label">文章标题</label>
				<div class="layui-input-block">
					<input id="title" type="text" name="title" placeholder="请输入文章标题" autocomplete="off" class="layui-input">
				</div>
			</div>

			<div class="layui-form-item layui-inline" style="width: 300px">
				<label class="layui-form-label">发布状态</label>
				<div class="layui-input-block">
					<select id="publishStatus">
						<option value="">全部</option>
						<option value="10311001">已发布</option>
						<option value="10311002">未发布</option>
					</select>
				</div>
			</div>
			<%--<div style="width: 300px;display: inline-block;margin-top: 10px">--%>
				<%--<label class="layui-form-label">发布状态</label>--%>
				<%--<div class="layui-input-block">--%>
					<%--<div id="publishStatus" class="layui-input-inline search_select hoverlist3"--%>
						 <%--style="width: 190px; margin-right: 3px;" data-value=""--%>
						 <%--data-type="publishStatus">--%>
						<%--<div class="layui-unselect layui-form-select">--%>
							<%--<div class="layui-select-title">--%>
								<%--<input type="text" placeholder="请选择发布状态" value="" readonly=""--%>
									   <%--class="layui-input layui-unselect">--%>
								<%--<i class="layui-edge"></i>--%>
							<%--</div>--%>
							<%--<dl class="layui-anim layui-anim-upbit">--%>
								<%--<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10311001" class=""><i class="layui-icon">&#xe605;</i> <span>已发布</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10311002" class=""><i class="layui-icon">&#xe605;</i> <span>未发布</span>--%>
								<%--</dd>--%>
							<%--</dl>--%>
						<%--</div>--%>
					<%--</div>--%>
				<%--</div>--%>
			<%--</div>--%>
				<div class="layui-form-item layui-inline" style="width: 300px">
					<label class="layui-form-label">文章类别</label>
					<div class="layui-input-block">
						<select id="category">
							<option value="">全部</option>

						</select>
					</div>
				</div>

			<%--<div style="width: 300px;display: inline-block;margin-top: 10px">--%>
				<%--<label class="layui-form-label">文章类别</label>--%>
				<%--<div class="layui-input-block">--%>
					<%--<div id="category" class="layui-input-inline search_select hoverlist4"--%>
						 <%--style="width: 190px; margin-right: 3px;" data-value=""--%>
						 <%--data-type="category">--%>
						<%--<div class="layui-unselect layui-form-select">--%>
							<%--<div class="layui-select-title">--%>
								<%--<input type="text" placeholder="请选择文章类别" value="" readonly=""--%>
									   <%--class="layui-input layui-unselect">--%>
								<%--<i class="layui-edge"></i>--%>
							<%--</div>--%>
							<%--<dl class="layui-anim layui-anim-upbit">--%>
								<%--<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281001" class=""><i class="layui-icon">&#xe605;</i> <span>法律法规</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281002" class=""><i class="layui-icon">&#xe605;</i> <span>管理规范</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281003" class=""><i class="layui-icon">&#xe605;</i> <span>行业政策</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281004" class=""><i class="layui-icon">&#xe605;</i> <span>技术标准</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281005" class=""><i class="layui-icon">&#xe605;</i> <span>办事指南</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281006" class=""><i class="layui-icon">&#xe605;</i> <span>管理职责</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281007" class=""><i class="layui-icon">&#xe605;</i> <span>行业概况</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281008" class=""><i class="layui-icon">&#xe605;</i> <span>行业能手</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281009" class=""><i class="layui-icon">&#xe605;</i> <span>优质企业</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281010" class=""><i class="layui-icon">&#xe605;</i> <span>文明建设</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281012" class=""><i class="layui-icon">&#xe605;</i> <span>文件下载</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281013" class=""><i class="layui-icon">&#xe605;</i> <span>工作动态</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281014" class=""><i class="layui-icon">&#xe605;</i> <span>行业风采</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281015" class=""><i class="layui-icon">&#xe605;</i> <span>行业党建</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281016" class=""><i class="layui-icon">&#xe605;</i> <span>质量信誉考核信息</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281017" class=""><i class="layui-icon">&#xe605;</i> <span>违法违规公告</span>--%>
								<%--</dd>--%>
								<%--<dd data-value="10281018" class=""><i class="layui-icon">&#xe605;</i> <span>政务公开</span>--%>
								<%--</dd>--%>
							<%--</dl>--%>
						<%--</div>--%>
					<%--</div>--%>
				<%--</div>--%>
			<%--</div>--%>

				<div class="layui-form-item layui-inline" style="width: 300px">
					<label class="layui-form-label">操作</label>
					<div class="layui-input-block">
						<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" >搜索</div>
						<div id="add" class="layui-btn layui-btn-normal isHide" lay-submit lay-filter="formDemo" >添加</div>
					</div>
				</div>
			</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" >
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="150">
					<col width="80">
					<col width="100">
					<col width="100">
					<col width="100">
					<%--<col width="150">--%>
					<%--<col width="150">--%>
					<col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>操作</th>
					<th>文章标题</th>
					<th>文章类型</th>
					<th>作者</th>
					<th>文章来源</th>
					<th>发布状态</th>
					<%--<th>创建时间</th>--%>
					<%--<th>更新时间</th>--%>
					<th>最近发布时间</th>
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

	$(function(){
        var form = layui.form;
        accessGet(baseu+ '/infopublic/public/info/category', function (res) {
	        var datas=res.list, html=''
	        for (var i in datas){
	            if(datas[i])
                    html+='<option value="'+datas[i].infoType+'">'+datas[i].codeDesc+'</option>'
	        }
	        $("#category").append(html)
            form.render()
        })

		layui.use('laypage', function(){
			//执行一个laypage实例
			search(10, 1, laypage)

		});
        $('#search').click(function () {
            search(10, 1, laypage)
        });
        $("#add").on('click', function () {
            window.location.href = 'addArticle';
        })

	});

	function search(limit, page, laypage) {
		var ii = layer.load();
		currPage = page;
                var param = {
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    size: (limit ? limit : 10),
                    page: page,
                    category: $('#category').val(),
					title: $('#title').val() || '',
					publishStatus: 	$('#publishStatus').val()
                }
                console.log('param',param);
                accessPost(baseu+ '/infopublic/all', JSON.stringify(param), function (res) {
                    handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                    console.log(res)
                    if(res.data){
                        var html='', data=res.data.dataList;
                        //性别
                        for (var i in data){
                            //文章类别
                            var delB = '';
                            var statusB = '';
                            if(data[i].publishStatusName == '已发布'){
								statusB = '<button class="layui-btn layui-btn-sm" onclick="changeStatus(' + data[i].infoId + ','+ 10311002 +')">取消发布</button>';
							}else{
                                statusB = '<button class="layui-btn layui-btn-sm" onclick="changeStatus(' + data[i].infoId + ',' + 10311001 +  ')">发布</button>';
                            }
							if(info && info.userRoleId == 4){
                                delB = '<button class="layui-btn layui-btn-danger layui-btn-sm" onclick="deleteRow(' + data[i].infoId + ')">删除</button>';
                            };
                            var detailRowButtonHtml = '<button class="layui-btn layui-btn-normal layui-btn-sm" onclick="detailRow(' + data[i].infoId + ')">详情</button>';
                            html+='<tr>' +
                                '<td>'+(parseInt((param.page - 1) * param.size + parseInt(i) + 1))+'</td>' +
                                '<td>'+ detailRowButtonHtml + delB + statusB +'</td>' +
                                '<td>'+(data[i].title || '')+'</td>' +
                                '<td>'+(data[i].typeName || '')+'</td>' +
                                '<td>'+(data[i].creator || '')+'</td> ' +
                                '<td>'+(data[i].dataFrom || '')+'</td> ' +
                                '<td>'+(data[i].publishStatusName || '')+'</td> ' +
//                                '<td>'+(formatDate(data[i].createTime,'yyyy-MM-dd hh:mm:ss') || '')+'</td> ' +
//                                '<td>'+(formatDate(data[i].updateTime,'yyyy-MM-dd hh:mm:ss') || '')+'</td> ' +
                                '<td>'+(formatDate(data[i].publishTime,'yyyy-MM-dd hh:mm:ss') || '')+'</td> ' +
                                '</tr>'
                        };

                        $("#table1 tbody").html(html)

                        count = res.count;

                        if(laypage){
                            laypage.render({
                                elem: 'pagebar'
                                ,count: res.data.total //数据总数，从服务端得到
                                ,layout: ['count', 'prev', 'page', 'next']
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
                    }else {
                        layer.msg(res.status, {time: 2000, icon:1});
                        layer.close(ii);
                    }
                })
	}

    function detailRow(infoId){
        window.location.href = 'addArticle?id=' + infoId;
    }
    function changeStatus(infoId,publishStatus){
        console.log('ppppp',infoId,publishStatus);
        layer.confirm('确认更改该条数据的发布状态吗?', {icon: 3, title:'提示'}, function(index){
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                infoId: infoId,
                publishStatus:publishStatus
            };
            accessPost(baseu+ '/infopublic/update/status/' + infoId, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                console.log(res);
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    search(10, 1, laypage);
                });
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
    function deleteRow(infoId){
        layer.confirm('确认删除该条数据吗?', {icon: 3, title:'提示'}, function(index){
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                infoid : infoId
            };
            accessPost(baseu+ '/infopublic/delete/' + infoId, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                console.log(res);
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    search(10, 1, laypage);
                });
                layer.close(ii);
                layer.msg(res.status);

            })

            layer.close(index);
        }, function(index){
            //按钮【按钮二】的回调
            layer.close(index);
        });
    }

//    $('.hoverlist3 dl').on('click', 'dd', function () {
//        var par = $(this).parents(".search_select");
//        if ($(this).hasClass('select-this')) {
//            $(this).removeClass('select-this');
//        } else {
//            $('.hoverlist3 dl dd').removeClass('select-this');
//            $(this).addClass('select-this');
//        }
//        var items = [];
//        var titleItems = [];
//        par.find('dl .select-this').each(function () {
//            items.push($(this).attr('data-value'));
//            titleItems.push($(this).find('span').text());
//        });
//        if (titleItems && titleItems.length > 0) {
//            par.find('input').val(titleItems.join('|'));
//            par.attr("title", titleItems.join('|'));
//        } else {
//            par.find('input').val(par.attr('data-tit'));
//            par.attr("title", par.attr('data-tit'));
//        }
//
//        if (items && items.length > 0) {
//            par.attr("data-value", items.join(','));
//        } else {
//            par.attr("data-value", '');
//        }
//    });
//    $('.hoverlist4 dl').on('click', 'dd', function () {
//        var par = $(this).parents(".search_select");
//        if ($(this).hasClass('select-this')) {
//            $(this).removeClass('select-this');
//        } else {
//            $('.hoverlist4 dl dd').removeClass('select-this');
//            $(this).addClass('select-this');
//        }
//        var items = [];
//        var titleItems = [];
//        par.find('dl .select-this').each(function () {
//            items.push($(this).attr('data-value'));
//            titleItems.push($(this).find('span').text());
//        });
//        if (titleItems && titleItems.length > 0) {
//            par.find('input').val(titleItems.join('|'));
//            par.attr("title", titleItems.join('|'));
//        } else {
//            par.find('input').val(par.attr('data-tit'));
//            par.attr("title", par.attr('data-tit'));
//        }
//
//        if (items && items.length > 0) {
//            par.attr("data-value", items.join(','));
//        } else {
//            par.attr("data-value", '');
//        }
//    });
</script>
<style>

</style>
</html>
