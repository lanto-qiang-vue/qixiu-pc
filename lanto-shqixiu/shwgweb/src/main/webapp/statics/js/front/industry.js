
$(function(){
	layui.use('laypage', function(){
		var laypage = layui.laypage;
		//执行一个laypage实例
		getAjaxData(1, laypage);
	});

});

var nums = 11;
var toJump = function(obj,first){
	var curr = obj.curr;
	if(!first){
		getAjaxData(curr);
	}
}


function getAjaxData(page, laypage){
	var type = $("#infoType").html();
	var params = {
		page:page,
		limit:nums,
		info_type_eq:type
	};
	var url = ctx + "/industry/getIndustryPageList";
	ajaxEvent(url,params,function(ret){
		var datas = ret.data;
		var str = '';
	    for(var i = 0; i < datas.length; i++){
	    	str += '<li><a href="' + ctx + '/industry/detail/' + datas[i].INFO_ID + '">' + datas[i].TITLE + '</a>' +
				// '<span>' + datas[i].PUBLISH_TIME + '</span>' +
				'</li>';
	    }
	    $("#dataBody").empty();
		$("#dataBody").append(str);

		if(laypage){
			laypage.render({
				elem: 'pagebar'
				,count: ret.total //数据总数，从服务端得到
				,jump: function(obj, first){
					//obj包含了当前分页的所有参数，比如：
					console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
					//首次不执行
					if(!first){
						getAjaxData(obj.curr)
					}
				}
			});
		}

		// laypage({
		//     cont: 'pagebar',
		//     skin: '#4ba7f5',
		//     skip: true,
		//     curr:ret.page,
		//     pages: Math.ceil(ret.total/nums), //得到总页数
		//     jump: toJump
		//   });
	});
}