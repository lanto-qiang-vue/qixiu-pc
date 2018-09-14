var laypage = layui.laypage;
var currPage = 1;
$(function(){
    layer.load();
	  getAjaxData(1);
	  $("#tablebody").on('click','.layui-btn.view',function(){
	  		var id = $(this).attr('data-id');
	  		var data;
	  		for(var i =0;i<datas.length;i++){
	  			if(id == datas[i].SERVICE_ID){
	  				data = datas[i];
	  			}
	  		}
	  		if(data){
	  			onToSmfw(data);
	  		}
	  });
	  $("#tablebody").on('click','.layui-btn.del',function(){
	  		var id = $(this).attr('data-id');
		  	deleteRow(id);
	  });

});


var nums = 12; //每页出现的数据量
var toJump = function(obj,first){
	var curr = obj.curr;
	if(!first){
		getAjaxData(curr);
	}
}


function getAjaxData(page, limit){
	var tempLimit = (limit ? limit : 10);
	currPage = page;
	var param = {
		accessToken: localStorage.getItem('ACCESSTOKEN'),
		pageSize: tempLimit,
		pageNo: page,
	}
	accessPost(baseu+ '/maintain/getMyOnsiteServicelist', JSON.stringify(param), function (res) {
		console.log('res: ', res);
		responseMessageMaker(res, $("#ctx").val());
		datas = res.data;
		var str = '';
		for(var i = 0; i < datas.length; i++){
			str += '<tr> ' +
				'<td style="text-align:center;">' + formatServiceTypeToLabel(datas[i].servicetype) +'</td>' +
				'<td style="text-align:center;">' + datas[i].ownername +'</td>' +
				'<td style="text-align:center;">' + datas[i].contactmobile +'</td>' +
				'<td style="text-align:center;">' + datas[i].contactaddress +'</td>' +
				'<td style="text-align:center;"><font color="#FF5722">' + formatStatusToLabel(datas[i].status) +'</font></td>' +
				'<td style="text-align:center;">' +
				// '<button class="layui-btn layui-btn-mini layui-btn-normal view" data-id="' + datas[i].id + '"><i class="layui-icon">&#xe63c;</i> 查看 </button>' +
				'<button class="layui-btn layui-btn-mini layui-btn-danger del" data-id="' + datas[i].id + '"><i class="layui-icon">&#xe640;</i> 删除 </button>' +
				'</td> ' +
				'</tr>';

		}
		$("#tablebody").empty();
		if(!datas || datas.length == 0){
			$("#tablebody").append('<tr><td colspan="6" style="padding:50px 0px;text-align:center;color:#999;">未查询到数据</td></tr>');
		}else{
			$("#tablebody").append(str);
		}
		layer.closeAll()

		laypage.render({
			elem: 'pagebar'
			,count: res.count //数据总数，从服务端得到
			,curr: currPage
			,jump: function(obj, first){
				//obj包含了当前分页的所有参数，比如：
				console.log('obj.curr: ', obj.curr); //得到当前页，以便向服务端请求对应页的数据。
				currPage = obj.curr;
				//首次不执行
				if(!first){
					getAjaxData(currPage);
					//do something
				}
			}
		});

	})
}

var onToSmfw = function(data){
	layer.open({
		type: 1,
		btnAlign:'c',
		title:'查看上门服务信息',
	//	btn: ['确 定', '关 闭'],
		anim: 0,
		skin: 'layui-layer-blue', //加上边框
		area: ['600px', '520px'], //宽高
		content:['<div style="padding:10px 20px 10px 10px;">',
					'<form class="layui-form" action="" id="addform" style="float:left;width:560px;">',
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">服务时间</label>' ,
						      '<div class="layui-input-block">' ,
						        ' <input type="text" name="serviceTime" id="serviceTime" autocomplete="off" lay-verify="required" class="layui-input" readOnly="readOnly">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						      '<label class="layui-form-label">服务地址</label>' ,
						      '<div class="layui-input-block">' ,
						        '<input type="text" name="address" id="address" autocomplete="off" placeholder="服务地址" lay-verify="required" class="layui-input" readOnly="readOnly">',
						      '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						      '<label class="layui-form-label">联系人</label>' ,
						      '<div class="layui-input-block">' ,
						        '<input type="text" name="contactPerson" id="contactPerson" autocomplete="off" placeholder="联系人" lay-verify="required" class="layui-input" readOnly="readOnly">',
						      '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						      '<label class="layui-form-label">联系电话</label>' ,
						      '<div class="layui-input-block">' ,
						        '<input type="text" name="contactPhone" id="contactPhone" autocomplete="off" placeholder="联系电话" lay-verify="phone" class="layui-input" readOnly="readOnly">',
						      '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">',
							'<label class="layui-form-label">服务内容</label>',
							'<div class="layui-input-block">',
								'<textarea placeholder="服务内容" id="serviceContent" lay-verify="required" class="layui-textarea" lay-verify="required" style="resize: none;" readOnly="readOnly"></textarea>',
							'</div>',
						'</div>',
						'<div class="layui-form-item">',
							'<label class="layui-form-label">反馈信息</label>',
							'<div class="layui-input-block">',
								'<textarea placeholder="暂无反馈信息..." id="backInfo"  lay-verify="required" class="layui-textarea" lay-verify="required" style="resize: none;" readOnly="readOnly"></textarea>',
							'</div>',
						'</div>',
					  '</form>' ,
				  '</div>'].join(''),
		success:function(layero, index){
			$("#serviceTime").val(data.SERVICE_TIME_);
			$("#address").val(data.ADDRESS);
			$("#contactPerson").val(data.CONTACT_PERSON);
			$("#contactPhone").val(data.CONTACT_PHONE);
			$("#serviceContent").val(data.SERVICE_CONTENT);
			$("#backInfo").val(data.BACK_INFO);
		}
	});
}

function formatStatusToLabel(statusCode){
	var statusLabel = '';
	switch(statusCode){
		case 1:
			statusLabel = '新增';
			break;
		case 2:
			statusLabel = '已指派企业';
			break;
		case 3:
			statusLabel = '已回复';
			break;
		default:
			statusLabel = '';
	}

	return statusLabel;
}


function formatServiceTypeToLabel(serviceTypeCodes){
	var serviceTypeLabel = '';
	var serviceTypeCodeList = serviceTypeCodes ? serviceTypeCodes.split(',') : '';

	if(serviceTypeCodeList && serviceTypeCodeList.length){
		serviceTypeCodeList.forEach(
			function(serviceTypeCode){
				switch(serviceTypeCode){
					case '300001':
						serviceTypeLabel = serviceTypeLabel + '上门故障诊断' + ' ';
						break;
					case '300002':
						serviceTypeLabel = serviceTypeLabel + '上门取送车服务' + ' ';
						break;
					case '300003':
						serviceTypeLabel = serviceTypeLabel + '上门更换备胎' + ' ';
						break;
					case '300004':
						serviceTypeLabel = serviceTypeLabel + '上门更换灯泡' + ' ';
						break;
					case '300005':
						serviceTypeLabel = serviceTypeLabel + '上门更换雨刮片' + ' ';
						break;
					case '300006':
						serviceTypeLabel = serviceTypeLabel + '上门电瓶泵电' + ' ';
						break;
					case '300007':
						serviceTypeLabel = serviceTypeLabel + '其他' + ' ';
						break;
					default:
						serviceTypeLabel = serviceTypeLabel + '';
				}
			}
		)
	}

	return serviceTypeLabel;
}


function deleteRow(id){
	console.log('delete');
//		var ii = layer.load();
	var laypage = layui.laypage;
	layer.confirm('确定要删除该行数据吗?', {icon: 3, title:'提示'}, function(index){
		var param={
			accessToken: localStorage.getItem('ACCESSTOKEN'),
			id: id
		}
		accessPost(baseu+ '/maintain/delete', JSON.stringify(param), function (res) {
			console.log(res);
			responseMessageMaker(res, $("#ctx").val());
			getAjaxData(1);
		})
		layer.closeAll();
		layer.close(index);
	}, function(index){
		//按钮【按钮二】的回调
		layer.close(index);
	});
}

var datas;