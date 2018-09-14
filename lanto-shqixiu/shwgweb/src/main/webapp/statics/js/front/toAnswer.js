
$(function(){	
	  getAjaxData(1);
	  $("#tablebody").on('click','.layui-btn',function(){
	  		var id = $(this).attr('data-id');
	  		window.open(ctx + '/cdf/qeustDetail/' + id);
	  });
});

var nums = 12; //每页出现的数据量
var toJump = function(obj,first){
	var curr = obj.curr;
	if(!first){
		getAjaxData(curr);
	}
}


function getAjaxData(page){
	var params = {
		page:page,
		limit:nums
	};
	var url = ctx + "/center/getAnswers.do";
	ajaxEvent(url,params,function(ret){
		var datas = ret.data;
		var str = '';
		var expertId = $("#expertId").val();
	    for(var i = 0; i < datas.length; i++){
	    	var zj = datas[i].EXPERT_NAME;
	    	if(datas[i].SORT_ORDER == 0){
	    		zj = '<font color="red">向我咨询</font>';
	    	}
	    	str += '<tr> ' +
		                '<td><div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width:390px;">' + datas[i].CONTENT +'</div></td>' + 
		                '<td style="text-align:center;">' + zj +'</td>' + 
		                '<td style="text-align:center;">' + datas[i].CREATE_TIME +'</td>' + 
		                '<td style="text-align:center;"><button class="layui-btn layui-btn-mini layui-btn-normal" data-id="' + datas[i].QUES_ID + '"><i class="layui-icon">&#xe63a;</i> 回答 </button></td> ' +
		            '</tr>';
		            
	    }
		$("#tablebody").empty();
		if(!datas || datas.length == 0){
			$("#tablebody").append('<tr><td colspan="4" style="padding:50px 0px;text-align:center;color:#999;">未查询到数据</td></tr>');
		}else{
			$("#tablebody").append(str);
		}
		
		laypage({
		    cont: 'pagebar',
		    skin: '#4ba7f5',
		    skip: true,
		    curr:ret.page,
		    pages: Math.ceil(ret.total/nums), //得到总页数
		    jump: toJump
		  });
	});
}