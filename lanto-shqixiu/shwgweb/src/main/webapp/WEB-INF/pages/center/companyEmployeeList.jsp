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
			<span class="sp_zw">企业员工信息管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/companyHome">企业中心</a> > <span>企业人员信息管理</span></span>
		</div>
		<div style="width: 950px;margin-top: 10px">
			<div style="width: 300px;display: inline-block;margin-top: 10px" id="isHide">
				<label class="layui-form-label">企业名称</label>
				<div class="layui-input-block">
					<input id="companyname" type="text" name="companyname" placeholder="请输入企业名称" autocomplete="off"
						   class="layui-input" id="companyname">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">姓名</label>
				<div class="layui-input-block">
					<input id="name" type="text" name="name" placeholder="请输入姓名" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">学历</label>
				<div class="layui-input-block">
					<div id="education" class="layui-input-inline search_select hoverlist3"
						 style="width: 190px; margin-right: 3px;" data-value=""
						 data-type="education">
						<div class="layui-unselect layui-form-select">
							<div class="layui-select-title">
								<input type="text" placeholder="请选择学历" value="" readonly=""
									   class="layui-input layui-unselect">
								<i class="layui-edge"></i>
							</div>
							<dl class="layui-anim layui-anim-upbit">
								<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span>
								</dd>
								<dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>小学</span>
								</dd>
								<dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>初中</span>
								</dd>
								<dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>高中</span>
								</dd>
								<dd data-value="7" class=""><i class="layui-icon">&#xe605;</i> <span>技校</span>
								</dd>
								<dd data-value="8" class=""><i class="layui-icon">&#xe605;</i> <span>中专</span>
								</dd>
								<dd data-value="9" class=""><i class="layui-icon">&#xe605;</i> <span>高职</span>
								</dd>
								<dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>本科</span>
								</dd>
								<dd data-value="6" class=""><i class="layui-icon">&#xe605;</i> <span>硕士</span>
								</dd>
								<dd data-value="10" class=""><i class="layui-icon">&#xe605;</i> <span>博士</span>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">岗位</label>
				<div class="layui-input-block">
					<div id="position" class="layui-input-inline search_select hoverlist4"
						 style="width: 190px; margin-right: 3px;" data-value=""
						 data-type="position">
						<div class="layui-unselect layui-form-select">
							<div class="layui-select-title">
								<input type="text" placeholder="请选择岗位" value="" readonly=""
									   class="layui-input layui-unselect">
								<i class="layui-edge"></i>
							</div>
							<dl class="layui-anim layui-anim-upbit">
								<dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span>
								</dd>
								<dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>技术负责人</span>
								</dd>
								<dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>质量检验员</span>
								</dd>
								<dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>汽车维修机工</span>
								</dd>
								<dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>汽车维修电工</span>
								</dd>
								<dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>汽车维修钣金工</span>
								</dd>
								<dd data-value="6" class=""><i class="layui-icon">&#xe605;</i> <span>汽车维修漆工</span>
								</dd>
								<dd data-value="7" class=""><i class="layui-icon">&#xe605;</i> <span>焊工</span>
								</dd>
								<dd data-value="8" class=""><i class="layui-icon">&#xe605;</i> <span>轮胎维修工</span>
								</dd>
								<dd data-value="9" class=""><i class="layui-icon">&#xe605;</i> <span>气缸镗磨工</span>
								</dd>
								<dd data-value="10" class=""><i class="layui-icon">&#xe605;</i> <span>曲轴修磨工</span>
								</dd>
								<dd data-value="11" class=""><i class="layui-icon">&#xe605;</i> <span>汽车美容装潢工</span>
								</dd>
								<dd data-value="12" class=""><i class="layui-icon">&#xe605;</i> <span>摩托车修理工</span>
								</dd>
								<dd data-value="13" class=""><i class="layui-icon">&#xe605;</i> <span>车身清洁工</span>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
			<div style="width: 300px;display: inline-block;margin-top: 10px">
				<label class="layui-form-label">职称</label>
				<div class="layui-input-block">
					<input id="professionaltitle" type="text" name="professionaltitle" placeholder="请输入职称" autocomplete="off"
						   class="layui-input">
				</div>
			</div>
			<div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left:30px;">搜索</div>
			<div id="add" class="layui-btn layui-btn-normal isHide" lay-submit lay-filter="formDemo">添加</div>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table id="table1" class="layui-table" lay-size="sm" style="width: 1150px">
				<colgroup>
					<col width="50">
					<col width="150">
					<col width="150" class="companyN">
					<col width="100">
					<col width="100">
					<col width="100">
					<col width="200">
					<col width="100">
					<col width="150">
				</colgroup>
				<thead>
				<tr>
					<th>序号</th>
					<th>操作</th>
					<th class="companyN">企业名称</th>
					<th>姓名</th>
					<th>性别</th>
					<th>学历</th>
					<th>岗位</th>
					<th>是否在岗</th>
					<th>职称</th>
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
		layui.use('laypage', function(){
			//执行一个laypage实例
			search(10, 1, laypage)

		});
        $('#search').click(function () {
            search(10, 1, laypage)
        });
        $("#add").on('click', function () {
            window.location.href = 'companyEmployee';
        })
		if(getUrlParam('company_id') || (info && info.userRoleId == 2)){
            $('#isHide').addClass('isHide');
		}
        if(info && info.userRoleId == 2){
            $('.companyN').addClass('isHide');
        }
		console.log('role',info.userRoleId)

        if(info && info.userRoleId == 2){
            $('#add').removeClass('isHide');
        }
	});

	function search(limit, page, laypage) {
		var ii = layer.load();
		currPage = page;

		var param={
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			pageSize: (limit ? limit : 10),
			pageNo: page,
            name: $('#name').val(),
            education: $('.hoverlist3 .select-this').attr('data-value') || '',
            position: $('.hoverlist4 .select-this').attr('data-value') || '',
            companyid: getUrlParam('company_id'),
            professionaltitle: $('#professionaltitle').val(),
            companyname:$('#companyname').val() || ''
		}
		console.log('param',param);
		accessPost(baseu+ '/staff/list', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log(res)
			if(res.data){
                var html='', data=res.data.dataList;
            //性别
			for (var i in data){
			    if(data[i].gender == 1){
			        data[i].sex = '男';
				}else if(data[i].gender == 2){
                    data[i].sex = '女';
				};
			    //是否在岗
			    if(data[i].isonduty == true){
                    data[i].isondutyname = '是'
				}else if(data[i].isonduty == false){
                    data[i].isondutyname = '否'
				};
			    //学历
                if(data[i].education == 1){
                    data[i].educationname = '小学'
                }else if(data[i].education == 2){
                    data[i].educationname = '初中'
                }else if(data[i].education == 3){
                    data[i].educationname = '高中'
                }else if(data[i].education == 4){
                    data[i].educationname = '大专'
                }else if(data[i].education == 5){
                    data[i].educationname = '本科'
                }else if(data[i].education == 6){
                    data[i].educationname = '硕士'
                }else if(data[i].education == 7){
                    data[i].educationname = '技校'
                }else if(data[i].education == 8){
                    data[i].educationname = '中专'
                }else if(data[i].education == 9){
                    data[i].educationname = '高职'
                }else if(data[i].education == 10){
                    data[i].educationname = '博士'
                };
                //岗位
                if(data[i].position == 1){
                    data[i].positionname = '技术负责人'
                }else if(data[i].position == 2){
                    data[i].positionname = '质量检验员'
                }else if(data[i].position == 3){
                    data[i].positionname = '汽车维修机工'
                }else if(data[i].position == 4){
                    data[i].positionname = '汽车维修电工'
                }else if(data[i].position == 5){
                    data[i].positionname = '汽车维修钣金工'
                }else if(data[i].position == 6){
                    data[i].positionname = '汽车维修漆工'
                }else if(data[i].position == 7){
                    data[i].positionname = '焊工'
                }else if(data[i].position == 8){
                    data[i].positionname = '轮胎维修工'
                }else if(data[i].position == 9){
                    data[i].positionname = '气缸镗磨工'
                }else if(data[i].position == 10){
                    data[i].positionname = '曲轴修磨工'
                }else if(data[i].position == 11){
                    data[i].positionname = '汽车美容装潢工'
                }else if(data[i].position == 12){
                    data[i].positionname = '摩托车修理工'
                }else if(data[i].position == 13){
                    data[i].positionname = '车身清洁工'
                };
                var compn ='<td id="compN">'+(data[i].companyname || '')+'</td>' ;
                var delB = '';
                if(info && info.userRoleId == 2){
                    compn = '';
                    delB = '<button class="layui-btn layui-btn-danger" onclick="deleteRow(' + data[i].id + ')">删除</button>';
                };
                var detailRowButtonHtml = '<button class="layui-btn layui-btn-normal" onclick="detailRow(' + data[i].id + ')">详情</button>';
                html+='<tr>' +
						'<td>'+(parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1))+'</td>' +
						'<td>'+ detailRowButtonHtml + delB + '</td>' +
                           compn +
						'<td>'+(data[i].name || '')+'</td>' +
						'<td>'+(data[i].sex || '')+'</td> ' +
					    '<td>'+(data[i].educationname || '')+'</td> ' +
                        '<td>'+(data[i].positionname || '')+'</td> ' +
                        '<td>'+(data[i].isondutyname || '')+'</td> ' +
                        '<td>'+(data[i].professionaltitle || '')+'</td> ' +
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
                layer.msg(res.status, {time: 2000, icon:1},function () {
                    window.location.href = '/index'
                });
                layer.close(ii);
			}
		})
	}

    function detailRow(id){
        window.location.href = 'companyEmployee?id=' + id;
    }
//刪除
    function deleteRow(id){
        layer.confirm('确认删除该员工信息吗?', {icon: 3, title:'提示'}, function(index){
            var ii = layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                staffId : id
            };
            accessPost(baseu+ '/staff/delete/' + id, JSON.stringify(param), function (res) {
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
    $('.hoverlist4 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist4 dl dd').removeClass('select-this');
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
