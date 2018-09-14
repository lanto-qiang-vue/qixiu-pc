<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/cdf.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="problem consult">
	<div class="problem_l">
    	<div class="pro_t">
        	<span class="wenti">问题集锦</span>
            <span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <a href="${ctx}/cdf">车大夫门诊</a> > <span>问题集锦</span></span>
        </div>
        <div class="pingpai" style="float: left;width: 180px;margin-left: 8px">
            <span>按分类查找: </span>
            <select id="selCategory">
                <option value="">-请选择-</option>
                <option value="10401001">发动机</option>
                <option value="10401002">变速箱</option>
                <option value="10401003">空调</option>
                <option value="10401004">传动转向</option>
                <option value="10401005">车身车架</option>
                <%--<c:forEach items="${questTypes }" var="item" varStatus="state">--%>
                <%--<option value="${item.codeId }">${item.codeDesc }</option>--%>
                <%--</c:forEach>--%>
            </select>
        </div>
        <div class="pro_sou" style="width: 260px;float: left;margin-top: 17px;">
        	<input type="text" placeholder="请输入问题关键字" id="keyword" onfocus="if(value==defaultValue){value='';this.style.color='#000'}" onblur="if(!value){value=defaultValue;this.style.color='#CCC'}" style="color:#CCC;width: 200px">
            <span id="searchbtn">查询</span>
        </div>
        <div class="biaoge" style="    min-height: 500px;height: auto;max-height: 840px;border: 1px solid #ededed;">
            <%--<div class="corpList">--%>
                <%--<ul class="liebiao_in" id="corplist">--%>

                <%--</ul>--%>
                <%--<div id="pagebar" style="text-align: center; margin-top: 5px;"></div>--%>
            <%--</div>--%>
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
            <ul class="question" id="question"></ul>
        </div>
        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
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
var nums = 17; //每页出现的数据量
</script>
</html>
