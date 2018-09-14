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
			<span class="sp_zw">满意度调查列表</span> <span class="sp_wz">您所在位置：<a
				href="/center/runHome">运营商中心</a> > <span>满意度调查列表</span></span>
		</div>
		<div class="examine" >
			<ul class="zhengwu_c" id="databody">
				<%--<li><a href="${ctx}/center/detailSatisfactionSurvey">汽车维修服务平台调查</a></li>--%>
			</ul>
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
	});

	function search(limit, page, laypage) {
		var ii = layer.load();
		currPage = page;
                var param = {
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    size: (limit ? limit : 10),
                    page: page
                }
                console.log('param',param);
                accessPost(baseu+ '/admin/question/list', JSON.stringify(param), function (res) {
                    handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                    console.log(res)
                    if(res.data){
                        var html='', data=res.data.dataList;
                        //性别
                        console.log('data',data)
                        for (var i in data){
                            console.log('data',data[i].title)
                            html+='<li>' + '<a href="${ctx}/center/detailSatisfactionSurvey?quesId=' + data[i].quesId + '">' +
                                data[i].title + '结果' + '</a>' +
                                '</li>'
                        };

                        $("#databody").html(html)

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


</script>
<style>

</style>
</html>
