
$(function(){	
	  getAjaxData(1);
	  $('.Government .nav_menu div').click(function(){
	  		var li = $(this).parent();
	  		if(li.hasClass('open')){
	  			li.removeClass('open');
	  		}else{
	  			li.addClass('open');
	  		}
	  });
});

var nums = 11;
var toJump = function(obj,first){
	var curr = obj.curr;
	if(!first){
		getAjaxData(curr);
	}
}


function getAjaxData(page){
	var type = $("#infoType").html();
	var params = {
		page:page,
		limit:nums,
		info_type_eq:type
	};
	var url = ctx + "/government/getGoverPageList";
	ajaxEvent(url,params,function(ret){
		var datas = ret.data;
		var str = '';
	    for(var i = 0; i < datas.length; i++){
	    	str += '<li><a href="' + ctx + '/government/detail/' + datas[i].INFO_ID + '">' + datas[i].TITLE + '</a>' +
				// '<span>' + datas[i].PUBLISH_TIME.split(' ')[0] + '</span>' +
				'</li>';
	    }
	    $("#dataBody").empty();
		$("#dataBody").append(str);
		
		// laypage({
		//     cont: 'pagebar',
		//     skin: '#4ba7f5',
		//     skip: true,
		//     curr:ret.page,
		//     pages: Math.ceil(ret.total/nums), //得到总页数
		//     jump: toJump
		//   });
		var laypage = layui.laypage;
		laypage.render({
			elem: 'pagebar'
			,theme: '#4ba7f5'
			,count: Math.ceil(ret.total/nums) //数据总数，从服务端得到
			,jump: toJump
		});
	});
}