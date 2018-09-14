<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/kindeditor/kindeditor-all-min.js"></script>
<script src="${btx}/js/kindeditor/lang/zh_CN.js"></script>
<script src="${btx}/js/front/questDetail.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="problem consult" style="height:100%;display: table;">
	<div class="problem_l" style="height:100%;min-height:1020px;">
    	<div class="pro_t">
        	<span class="wenti">问题详细</span>
            <span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <a href="${ctx}/cdf">车大夫门诊</a> > <span> 问题详细</span></span>
        </div>
		<div class="qdetail" style="border-bottom:0px;">
			<input type="hidden" id="quesId" value="${detail.QUES_ID }"/>
			<span class="fl userphoto">
				<c:choose>
					<c:when test="${detail.USER_PHOTO != null &&  detail.USER_PHOTO != ''}">
						<img src="${ctx}/attach/${detail.USER_PHOTO }" width="96px" height="96px">
					</c:when>
					<c:otherwise>
						<img src="${btx}/images/default_user.png" width="96px" height="96px">
					</c:otherwise>
				</c:choose>
			</span>
			<div class="fr qinfor">
				<h4>
					<em class="username fl">${detail.USER_NAME }</em> <em class="fl"> 浏览 ${detail.VIEW_NUMBER } 次 </em> <em
						class="fr">${detail.CREATE_TIME }</em>
				</h4>
				<div class="infor-detail">
					<div class="infor-arrow"></div>
					<div class="car-infor">
						<span>汽车品牌：${detail.VEHICLE_BRAND==null?'未知': detail.VEHICLE_BRAND}</span> 
						<span>汽车类型：未知</span> 
						<span>汽车车龄：${detail.PRODUCTION_YEAR ==null?'未知':detail.PRODUCTION_YEAR}</span> 
						<span>咨询类型：${detail.TYPE ==''?'未知':detail.TYPE}</span>
					</div>
					<div class="qcontent">
						<p>问
								题：${detail.CONTENT }</p>

					</div>
				</div>
			</div>
			<div class="clear"></div>
		</div>		
		<c:if test="${(answers != null && answers.size() > 0) || cnAnswer != null }">
			<div class="statement" style="margin-bottom:0px;">声明：以下言论仅代表个人观点！</div>
		</c:if>
		
		<c:if test="${cnAnswer != null }">
			<div class="qdetail adopt" style="margin-top:0px;margin-bottom:10px;">
	            <div class="adopt-title">
	            	<span class="adopt-icon"></span>
	            	<em class="fl">提问者采纳</em>
	            	<em class="fr adopt-time">${cnAnswer.ANSWER_TIME }</em>
	            </div> 
	            <div class="adopt-content">                     
	                <div>${cnAnswer.CONTENT }</div>
	                <div class="photo">           
	                	<c:choose>
							<c:when test="${cnAnswer.EXPERT_PHOTO != null &&  cnAnswer.EXPERT_PHOTO != ''}">
								<img src="${cnAnswer.EXPERT_PHOTO }"  width="55px" height="58px">
							</c:when>
							<c:otherwise>
								<img src="${btx}/images/default_user.png" width="55px">
							</c:otherwise>
						</c:choose>            	
	                	${cnAnswer.ANSWER_EXPERT_NAME }
	                </div>
	            </div>
	        </div>
		</c:if>
		<c:if test="${answers != null && answers.size() > 0 }">
			<div class="other" style="margin-top:0px;">
				<div class="other-title">
					<em class="fl" style="padding-left:10px;"> 
						<c:choose>
							<c:when test="${detail.STATUS == '10391003' }">
								其他
							</c:when>
							<c:otherwise>
								共
							</c:otherwise>
						</c:choose> 
						${answers.size() } 条回答
					</em>
				</div>
				<c:forEach items="${answers }" var="item" varStatus="state">
					<div class="other-content" style="border-bottom:0px;">
						<div style="border-bottom: 1px dotted #ccc; margin-bottom: 10px;padding-bottom: 10px;">
							<div class="photo">
								<c:choose>
									<c:when test="${item.EXPERT_PHOTO != null &&  item.EXPERT_PHOTO != ''}">
										<img src="${item.EXPERT_PHOTO }"  width="55px" height="58px">
									</c:when>
									<c:otherwise>
										<img src="${btx}/images/default_user.png" width="55px">
									</c:otherwise>
								</c:choose>
								
									<em class="fl">${item.ANSWER_EXPERT_NAME }</em>
									<em class="fr fgray">${item.ANSWER_TIME }</em>
							</div>
							<div style="margin-left:84px; overflow-x:auto; overflow-y:hidden; +overflow-y:auto; position: relative;word-break:break-all;">
								${item.CONTENT }
							</div>
							<c:if test="${loginInfo.userType == 0 && loginInfo.userId == detail.USER_ID && detail.STATUS != '10391003'}">
								<div class="submitbtn" style="text-align:right;margin:10px 0px;">
				                	<button class="layui-btn layui-btn-normal layui-btn-small" id="cnanswerbtn" data-id="${item.ANSWER_ID }"><i class="layui-icon">&#xe650;</i> 采纳该回答</button>
				                </div>
							</c:if>
						</div>
					</div>
				</c:forEach>	
			</div>
		</c:if>

		<c:if test="${loginInfo.userType == 1 &&  detail.STATUS != '10391003'}">
			<div class="jianjie">		
	            <div class="zixun">
	            	<p style="background: url(${btx}/images/case_answer.jpg) no-repeat left center;">回答问题</p>
	            	<textarea name="content" style="height:200px;visibility:hidden;"></textarea>
	                <div class="submitbtn">
	                	<button class="layui-btn layui-btn-normal" id="submitbutton">提交回答</button>
	                </div>
	            </div>
	        </div>
		</c:if>
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
$(function(){	
	//var maxWidth = $(window).width() - 25;
	$(".problem_l img").each(function(){
		//console.log($(this).width() + ':' + $(window).width());
		if($(this).width() > 500){
			$(this).css('max-width','99%');
			//$(this).css('height','100%');
		}
	});
});
</script>
</html>
