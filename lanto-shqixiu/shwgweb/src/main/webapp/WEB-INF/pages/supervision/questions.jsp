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

<div class="supervision">
    <div class="pro_t">
        	<span class="wenti">满意度调查</span>
            <span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>公众监督</span> > <span>满意度调查</span></span>
        </div>
    <div class="examine">
        <ul class="zhengwu_c" id="databody">
        </ul>
        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
var datas = ${list};
var nums = 9;
var records = datas.length || 0;
$(function(){	
	laypage.render({
	    cont: 'pagebar',
	    skin: '#4ba7f5',
	    skip: true,
	    curr:1,
	    pages: Math.ceil(records/nums), //得到总页数
	    jump: toJump
	  });
});

function toJump(obj){
	$("#databody").empty();
	$("#databody").append(render(datas,obj.curr));
}
//模拟渲染
var render = function(data, curr){
  var arr = [],thisData = data.concat().splice(curr*nums-nums, nums);
    arr.push('<li><a href="${ctx}/supervision/article1/">2016年汽修行业服务质量顾客满意度结果公布</a></li>')
    arr.push('<li><a href="${ctx}/supervision/article2017/">2017年汽修行业服务质量顾客满意度结果公布</a></li>')
  layui.each(thisData, function(index, item){
    arr.push('<li><a href="${ctx}/supervision/detail/' + item.QUES_ID + '" target="_blank">' + item.TITLE + '</a><span>'
//        + item.CREATE_TIME
        + '</span></li>');
  });
  return arr.join('');
};
</script>
</html>
