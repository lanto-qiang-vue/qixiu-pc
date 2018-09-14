<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<%--<script src="${btx}/js/kindeditor/kindeditor-all-min.js"></script>--%>
<%--<script src="${btx}/js/kindeditor/lang/zh_CN.js"></script>--%>
<script src="${btx}/js/front/expert.js"></script>
<script src="${btx}/js/front/cdf.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="problem consult" style="height:100%;display: table;">
	<div class="problem_l" style="height:100%;min-height:1030px;">
    	<div class="pro_t">
        	<span class="wenti">专家咨询</span>
            <span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <a href="${ctx}/cdf">车大夫门诊</a> > <span>专家咨询</span></span>
			<input type="text" id="ctx" name="ctx" style="display:none;" value="${ctx}"/>
        </div>
        <div class="jianjie">
        	<div class="jianjie_t">专家简介</div>
            <div class="jianjie_b">
            	<div class="img">
                    <img src="${model.photo }" width="127" height="127" alt="">
                    <span>专家认证</span>
                </div>
                <ul>
                	<li><span>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</span>${model.name }</li>
                	<li><span>职&nbsp;&nbsp;&nbsp;&nbsp;称：</span>${model.professor }</li>
                	<li><span>就职企业：</span>${model.empUnit }</li>
                	<li><span>专业擅长：</span>${model.goodAt }</li>
                	<li><span>主要荣誉：</span>${model.honor }</li>
                </ul>
            </div>
        </div>
        <div class="jianjie">
        	<span id="expertId" style="display:none;">${model.expertId }</span>
        	<span id="vehicleId" style="display:none;">${selectvehicle.vehicleId }</span>
        	<div class="jianjie_t">我要咨询</div>
            <div class="zixun">
            	<p>问题咨询</p>
				<form class="layui-form" action="" >
					<textarea class="content" name="content" style="height:200px;width: 100%;padding: 10px;box-sizing: border-box"></textarea>
					<%--<c:choose>--%>
						<%--<c:when test="${loginFlag == 1 && loginInfo.userType == 0}">--%>
							<%--<textarea name="content" style="height:200px;visibility:hidden;"></textarea>--%>
						<%--</c:when>--%>
						<%--<c:otherwise>--%>
							<%--<div class="zixun_in">请<a href="javascript:toLogin();">登录/注册</a>成为个人用户后提问</div>--%>
						<%--</c:otherwise>--%>
					<%--</c:choose>--%>
					<div>
						<span id="qusttypepanel" class="questlist">
							<em>选择问题分类：</em>
							<a onclick="setCategory(10401001)" data-code="10401001">发动机</a>
							<a onclick="setCategory(10401002)" data-code="10401002">变速箱</a>
							<a onclick="setCategory(10401003)" data-code="10401003">空调</a>
							<a onclick="setCategory(10401004)" data-code="10401004">传动转向</a>
							<a onclick="setCategory(10401005)" data-code="10401005">车身车架</a>
						</span>
					</div>

					<div>
						<span id="qusttypepanel2" class="questlist">
							<em style="margin-left:20px;">是否匿名：</em>
							<div class="layui-input-block" lay-skin="primary">
								<input type="radio" name="isanonymous" value="1" title="是">
								<input type="radio" name="isanonymous" value="0" title="否" checked>
							</div>
						</span>
					</div>

					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label">上传图片</label>
						<div class="layui-input-block">
							<button type="button" class="layui-btn layui-btn-normal notify-button notify-button-a"
									id="upload">
								<i class="layui-icon">&#xe67c;</i> 添加图片
							</button>
							<span>（仅支持jpg、gif、png、docx、bmp、ico）</span>
						</div>
					</div>

					<div class="extra notify-margin">
						<%--<div class="showextra" style="margin-top: 10px;">--%>
						<%--<div class="layui-btn layui-btn-normal hideextra">移除附件</div>--%>
						<%--<span>附件地址：</span><a style="color: red" href="">附件</a>--%>
						<%--</div>--%>
					</div>

					<div class="submitbtn" style="margin-bottom: 20px;">
						<div class="layui-btn layui-btn-normal" lay-submit lay-filter="addQuestion">提交问题</div>
					</div>
				</form>
                <%--<c:if test="${loginFlag == 1  && loginInfo.userType == 0}">--%>
	                <%--<div class="submitbtn">--%>
	                	<%--<button class="layui-btn layui-btn-normal" id="submitbutton">提交问题</button>--%>
	                <%--</div>--%>
                <%--</c:if>--%>
            </div>
        </div>
        <div class="jianjie">
        	<div class="jianjie_t">咨询问答</div>
            <%--<div class="biaoge">--%>
                <%--<table class="gridtable">--%>
                    <%--<tr>--%>
						<%--<th width="3%"></th>--%>
						<%--<th width="15%">问题分类</th>--%>
						<%--<th width="55%">问题</th>--%>
						<%--<th width="15%">提问时间</th>--%>
						<%--<th width="10%">查看次数</th>--%>
                    <%--</tr>--%>
                    <%--<tbody id="tablebody">--%>
                	<%--</tbody>--%>
                <%--</table>--%>
                <%--<div id="pagebar" style="text-align:center;margin-top:5px;"></div>--%>
            <%--</div>--%>
	        <div class="biaoge" style="height: 555px;">
		        <ul class="question" id="question">
		        </ul>
		        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
	        </div>
        </div>
    </div>
	<div class="problem_r">
    	<div class="hangye_t">
            <div class="pro_t">
                <span class="wenti">问答专家团</span>
                <span class="weizhi"><a href="${ctx}/specialist">更多>></a></span>
            </div>
            <div class="consult_b" id="expertlist">
            	<ul class="lb" id="expertlist1">
            		<c:forEach items="${experts }" var="item" varStatus="state">
						<li>
	                    	<a class="a1" href="${ctx}/cdf/expert/${item.EXPERT_ID}"><img src="${item.PHOTO }" alt=""></a>
	                        <div class="lb_r">
	                            <a class="a2" href="${ctx}/cdf/expert/${item.EXPERT_ID}">${item.NAME }<span></span></a>
	                            <p>${item.PROFESSOR }</p>
	                            <a class="a3" href="${ctx}/cdf/expert/${item.EXPERT_ID}">向TA提问</a>
	                        </div>
	                    </li>
					</c:forEach>
            	</ul>
            	<ul class="lb" id="expertlist2">
            		
            	</ul>
            </div>
        </div>
        <div class="hangye_t changshi_b">
            <div class="pro_t">
                <span class="wenti">行业信息</span>
                <span class="weizhi"><a href="${ctx}/industry/10281001" target="_blank">更多>></a></span>
            </div>
            <ul class="baoyang">
           		<c:forEach items="${infoList }" var="item" varStatus="state">
					<li><a href="${ctx}/industry/detail/${item.INFO_ID}" target="_blank">${item.TITLE }</a></li>
				</c:forEach>
            </ul>
        </div>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
var categoryValue = null;
var filePath = [];

$(function () {
	var form = layui.form;
	form.render();


	layui.use('upload', function(){
		var upload = layui.upload;

		//执行实例
		var uploadInst = upload.render({
			elem: '#upload' //绑定元素
			,url: baseu + '/image/add/'+localStorage.getItem('ACCESSTOKEN') //上传接口
			,accept: 'images'
			,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
				layer.load(); //上传loading
			}
			,done: function(res){
				filePath.push(res && res.data && res.data.picPath);
				//上传完毕回调
				if(res.code== '000000'){
					$(".extra").append(
							'<div class="showextra" style="margin-left: 60px;">'+
							'<div class="layui-btn layui-btn-normal hideextra" style="margin: 0 20px;border-radius: 4px;background-color: #2d8cf0;">移除附件</div>'+
							'<span>附件地址：</span><a class="extras" style="color: red" href="'+
							res.data.picPath+'">'+res.data.picPath+'</a>'+
							'</div>'
					)
				}else{
					var message = responseMessageMaker(res, "${ctx}");
					layer.msg(message, {time: 2000, icon:5});
				}
				layer.closeAll('loading');
			}
			,error: function(){
				//请求异常回调
				layer.closeAll('loading');
			}
		});
	});

	$(".extra").on('click', '.hideextra', function () {
		var removePicPath = $(this).parent('.showextra').children(".extras").text();
		for(var i = 0; i < filePath.length; i++){
			if(removePicPath == filePath[i]){
				filePath.splice(i ,1);
				break;
			}
		}

		console.log('removePicPath: ', removePicPath);
		$(this).parent('.showextra').remove();
	});

})
var speed=40
function Marquee(){
if(expertlist2.offsetTop-expertlist.scrollTop<=0)
	expertlist.scrollTop-=expertlist1.offsetHeight
else{
	expertlist.scrollTop++
}
}
var MyMar;
if($("#expertlist1").children().length > 5){
	expertlist2.innerHTML=expertlist1.innerHTML
	MyMar=setInterval(Marquee,speed);
	expertlist.onmouseover=function() {clearInterval(MyMar)}
	expertlist.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
}
var nums = 5; //每页出现的数据量

function setCategory(category) {
	categoryValue = category;
}

layui.use('form', function(){
	var form = layui.form;

	//监听提交
	form.on('submit(addQuestion)', function(data){
		console.log('submit data: ', data);
		var ii = layer.load();
		var param={
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			content: $("textarea[name='content']").val() || null,
			category: categoryValue || null,
			isanonymous: Number(data.field.isanonymous),
			expertId: $("#expertId").text(),
			images: filePath ? filePath : null
		}
		accessPost(baseu+ '/QxwCdf/addquestion', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
			console.log('res: ', res);
			var message = responseMessageMaker(res, "${ctx}");
			layer.msg(message, {
				icon: 1,
				time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
			}, function(){
				layer.closeAll();
				if(res && res.code === "000000"){
					window.location.reload();
				}
			});

		})
	});
});

</script>
</html>
