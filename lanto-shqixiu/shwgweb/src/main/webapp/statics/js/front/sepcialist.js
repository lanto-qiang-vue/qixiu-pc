var nums = 4; //每页出现的数据量

//模拟渲染
var render = function(data, curr) {
	var arr = [], thisData = data.concat().splice(curr * nums - nums, nums);
	layui.each(thisData, function(index, item) {
		arr.push('<li>'
						+ '<img src="/attach/' + item.PHOTO + '" alt="">'
						+ '<div class="xiangqing">'
						+ '<span><strong>姓名：</strong>' + item.NAME + '</span>'
						+ '<span><strong>职称：</strong>' + item.PROFESSOR + '</span>'
						+ '<span><strong>就职企业：</strong>' + item.EMP_UNIT + '</span>'
						+ '<span><strong>专业擅长：</strong>' + item.GOOD_AT + '</span>'
						+ '<div><a href="'  + ctx + '/cdf/expert/' + item.EXPERT_ID + '" target="_blank">向TA提问</a></div>'
						+ '</div>' + '</li>');
	});
	return arr.join('');
};

$(function () {

})
// $(function() {
// 	//调用分页
// 	laypage({
// 		cont : 'pagebar',
// 		pages : Math.ceil(data.length / nums), //得到总页数
// 		skin: '#4ba7f5',
// 		skip: true,
// 		jump : function(obj) {
// 			document.getElementById('expertlist').innerHTML = render(data, obj.curr);
// 		}
// 	});
// });
