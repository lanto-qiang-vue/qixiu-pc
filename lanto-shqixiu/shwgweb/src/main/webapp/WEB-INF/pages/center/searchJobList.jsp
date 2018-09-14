<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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
			<span class="sp_zw">职位搜索</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome">职位搜索管理</a> > <span>职位搜索</span></span>
		</div>
		<div style="width: 950px;margin-top: 10px">
			<div style="width: 300px;display: inline-block;margin-top: 10px" id="isHide">
				<label class="layui-form-label">公司名称</label>
				<div class="layui-input-block">
					<input id="virtualCompanyName" type="text" name="virtualCompanyName" placeholder="请输入公司名称" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">岗位名称</label>
				<div class="layui-input-block">
					<input id="postName" type="text" name="postName" placeholder="请输入岗位名称" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">工作性质</label>
				<div class="layui-input-block">
					<div id="workProperty" class="layui-input-inline search_select hoverlist3"
						 style="width: 190px; margin-right: 3px;" data-value=""
						 data-type="workProperty">
						<div class="layui-unselect layui-form-select">
							<div class="layui-select-title">
								<input type="text" placeholder="请选择工作性质" value="" readonly=""
									   class="layui-input layui-unselect">
								<i class="layui-edge"></i>
							</div>
							<dl class="layui-anim layui-anim-upbit">
								<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span>
								</dd>
								<dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>全职</span>
								</dd>
								<dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>兼职</span>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
			<label class="layui-form-label">发布时间</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input" id="rangeDate" placeholder="请选择发布时间范围">
			</div>
		</div>
		<div style="margin-top: 4px;">
		<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left:30px;">搜索</div>
			<div id="appyPost" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">申请岗位</div>
		</div>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1150px">
				<colgroup>
					<col width="50">
					<col width="100">
					<col width="150">
					<col width="100">
					<col width="100">
					<col width="80">
					<col width="100">
				</colgroup>
				<thead>
				<tr>
					<th style="text-align: center;"><input type="checkbox" class="main_class"/></th>
					<th style="text-align: center;">操作</th>
					<th style="text-align: center;">公司名称</th>
					<th style="text-align: center;">岗位名称</th>
					<th style="text-align: center;">薪资</th>
					<th style="text-align: center;">工作性质</th>
					<th style="text-align: center;">发布时间</th>
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
	var searchText = getUrlParam('searchText');
    if(searchText) {
        $('#postName').val(decodeURI(searchText));
	}
	$(function(){
		layui.use('laypage', function(){
			//执行一个laypage实例
			search(10, 1, laypage)

		});

        $('#search').click(function () {
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
        
        //实现全选功能
        $(".main_class").click(function () {
            if($(".main_class").is(":checked")){
                $(".sub_class").prop("checked",true);
            }else{
                $(".sub_class").prop("checked",false);
            }
        })
        $("#appyPost").click(function(){
            var postId = "";
            $("input[class='sub_class']:checked").each(function(){
                postId +=$(this).val()+",";
            })
            if(postId.length == 0){
                layer.msg("请至少选择一种岗位!",{time:2000,icon: 7});
                return;
            }
            var param1={
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                postIds: postId.substring(0,postId.lastIndexOf(","))
            }
            //检查该用户有没有重复申请岗位
            accessPost(baseu+ '/center/checkPostUnique', JSON.stringify(param1), function (res) {

                if(res.code == "0"){
                    layer.msg("该岗位已申请,不能重复申请,请重新申请!",{time:2000,icon: 7});
                }else{
                    //accessPost(baseu+ '/center/getJobResumeList', JSON.stringify(param2), function (res) {
                        //if(res.code == "000000"){
                            window.location.href = "jobResumeList?postIds="+ postId.substring(0,postId.lastIndexOf(","));
                        //}else{
                            //layer.msg(res.status,{time:1800,icon: 5});
                       // }
                }
            })
        })

	});

	function search(limit, page, laypage) {
		var ii = layer.load();
		currPage = page;

		var param={
			accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (limit ? limit : 10),
            page: page,
            virtualCompanyName: $('#virtualCompanyName').val(),
            postName: $('#postName').val(),
            workProperty: $('.hoverlist3 .select-this').attr('data-value') || '',
            startDate: startDate,
            endDate: endDate
		}
		accessPost(baseu+ '/center/searchJobList', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log(res)
			if(res.data){
                var html='', data=res.data;
            //性别
			for (var i in data){
			    //学历
                var salary = data[i].salary;
                if(salary == 1){
                    salary = '30-50'
                }else if(salary == 2){
                    salary = '60-80'
                }else if(salary == 3){
                    salary = '80-100'
                }else if(salary == 4){
                    salary = '100以上'
                }else if(salary == 5){
                    salary = '2000-3000'
                }else if(salary == 6){
                    salary = '3000-4000'
                }else if(salary == 7){
                    salary = '4000-5000'
                }else if(salary == 8){
                    salary = '5000及以上'
                }else if(salary == 9){
                    salary = '20000-40000'
                }else if(salary == 10){
                    salary = '50000-80000'
                }else if(salary == 11){
                    salary = '90000-110000'
				}else{
                    salary = "12万及以上";
				}
                var detailRowButtonHtml = '<button class="layui-btn layui-btn-normal" onclick="detailRow(' + data[i].id + ')">详情</button>';
                html+='<tr>' +
						'<td style="text-align: center"><input type="checkbox" class="sub_class" value="' + data[i].id + '"/></td>' +
						'<td style="text-align: center">'+ detailRowButtonHtml+'</td>' +
						'<td style="text-align: center">'+(data[i].virtualCompanyName || '')+'</td> ' +
					    '<td style="text-align: center">'+(data[i].post_name || '')+'</td> ' +
                        '<td style="text-align: center">'+(salary || '')+'</td> ' +
                        '<td style="text-align: center">'+(data[i].work_property ==1 ?"全职":"兼职" || '')+'</td> ' +
                        '<td style="text-align: center">'+(formatDate(data[i].publish_time,'yyyy-MM-dd') || '')+'</td> ' +
						'</tr>'
			};

			$("#table1 tbody").html(html)

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

    function detailRow(id){
        window.location.href = 'queryPostDetails?id=' + id;
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
<style>
	.isHide{
		display: none!important;
	}
</style>
</html>
