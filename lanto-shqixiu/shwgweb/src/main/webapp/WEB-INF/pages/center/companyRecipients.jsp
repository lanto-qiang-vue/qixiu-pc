<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">收件人</span> <span class="sp_wz">您所在位置：<a href="#" onClick="javascript :history.go(-1);">通知管理</a> > <span>收件人</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<div class="dblock table1" style="text-align: left">
				<h1 class="dtitle">收件人列表</h1>
				<table class="layui-table manageNotes-th" lay-size="sm" style="width: 800px;">
					<colgroup>
						<col width="100"><col width="160"><col width=""><col width="100"><col>
					</colgroup>
					<thead>
					<tr>
						<th class="manageNotes-th">收件人</th>
						<th class="manageNotes-th">联系方式</th>
						<th class="manageNotes-th">企业名称</th>
						<th class="manageNotes-th">是否已读</th>
						<th class="manageNotes-th">发送时间</th>
					</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
				<div style="width: 100%;overflow: hidden">
					<div id="pagebar" style="text-align:center;margin-top:5px;"></div>
				</div>

			</div>
			<div style="margin: 20px">
				<button class="manageNotes-buttom" onclick="javascript :history.go(-1);">后退</button>
			</div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
$(function () {
    var id = getUrlParam('id'), token = localStorage.getItem('ACCESSTOKEN'), url = ''
    layer.load()
    if (getUrlParam('type') == 'my') {
        layer.load()
        $(".table1").show()

        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            search(1, laypage)
        });

        function search(page, laypage) {
            var param = {
                "accessToken": token,
                "limit": 10,
                "noticeId": id,
                "page": page
            }
            accessPost(baseu + '/message/notify/getReceiveList/' + id + "/" + token, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                 console.log("getReceiveList",res)
                var datas = res.noticeReceiveDataPage.content, html = '';
                for (var i in datas) {
                    html += "<tr><td>" + (datas[i].nickName ? datas[i].nickName: '')+ "</td><td>"+(datas[i].mobile? datas[i].mobile:'') + "</td><td>" +  (datas[i].companyname ? datas[i].companyname : '') +"</td><td>" + (datas[i].read ? '<span style="color: green">已读</span>' : '<span style="color: red">未读</span>') + "</td><td>" + formatDate(new Date(datas[i].receiveTime), 'yyyy-MM-dd hh:mm:ss') + "</td></tr>"
                }
                $(".table1 tbody").html(html)

                if(laypage){
                    laypage.render({
                        elem: 'pagebar'
                        ,count: res.noticeReceiveDataPage.totalElements //数据总数，从服务端得到
                        ,jump: function(obj, first){
                            //obj包含了当前分页的所有参数，比如：
                            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            console.log(obj.limit); //得到每页显示的条数
                            //首次不执行
                            if(!first){
                                search(obj.curr)
                                //do something
                            }
                        }
                    });
                }
                layer.closeAll('loading');
            })
        }

    }

})
</script>
</html>
