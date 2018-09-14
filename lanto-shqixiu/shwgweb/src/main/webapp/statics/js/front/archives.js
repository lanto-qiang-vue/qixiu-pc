// JavaScript Document


$(function(){	
	$('#bang').click(function(){
		toBind();
	});
	
	$('#doLoginbtn').click(function(){
		doLogin();
	});
	  //调用分页
	  laypage({
	    cont: 'pagebar',
	    skin: '#4ba7f5',
	    skip: true,
	    pages: Math.ceil(datas.length/nums), //得到总页数
	    jump: toJump
	  });
});
var nums = 15; //每页出现的数据量
var currPage = 1;
//模拟渲染
var tbrender = function(curr,nums){
    var str = '', last = curr*nums - 1;
    last = last >= datas.length ? (datas.length-1) : last;
    var eve = 0;
    for(var i = (curr*nums - nums); i <= last; i++){
    	eve ++;
    	var clazz = '';
    	if(eve % 2 == 0){
    		clazz = ' class="tr1" ';
    	}
    	str += '<tr' + clazz + '> ' +
	                '<td>' + datas[i].PLATE_NUM +'</td>' + 
	              //  '<td>' + datas[i].PLATE_COLOR_ +'</td>' + 
	                '<td>' + datas[i].VIN +'</td> ' +
	                '<td>' + datas[i].ENGINE_NO +'</td>' + 
	                '<td>' +
	                	'<a class="layui-btn layui-btn-mini layui-btn-normal view" href="javascript:toViewVeh(' + datas[i].VEHICLE_ID + ');"><i class="layui-icon">&#xe63c;</i> 查看 </a>' +
	                	'<a class="layui-btn layui-btn-mini layui-btn-danger" href="javascript:toDeleteVeh(' + datas[i].VEHICLE_ID + ');" ><i class="layui-icon">&#xe640;</i> 删除</a>' +
	                '</td>' +
	            '</tr>';
    }
    return str;
};

function toDeleteVeh(vehId){
	var params = {vehId:vehId};
	layer.confirm('确认要删除该车辆吗？', {
		icon:3,
		btn : ['确定', '取消']
		}, function() {
			var url = ctx + '/archives/delVeh.do';
			ajaxEvent(url,params,function(ret){
				layer.alert('删除成功！', {icon : 1,end:function(){
					window.location.reload();
				}});
			});
		});
}

var toJump = function(obj){
	$("#tbbody").empty();
	$("#tbbody").append(tbrender(obj.curr,nums));
	currPage = obj.curr;
}

function toBind(){
	layer.open({
		type: 1,
		btnAlign:'c',
		title:'绑定车辆',
	//	btn: ['确 定', '关 闭'],
		anim: 0,
		skin: 'layui-layer-blue', //加上边框
		area: ['420px', '300px'], //宽高
		content:['<div style="padding:0px 20px 10px 10px;">',
					'<fieldset class="layui-elem-field layui-field-title">',
					  	'<legend>根据车牌号和车架号绑定车辆</legend>',
					'</fieldset>',
					'<form class="layui-form" action="" id="bindform">',
					  	'<div class="layui-form-item">',
					    	'<label class="layui-form-label">车牌号</label>',
					    	'<div class="layui-input-block">',
					      		'<input type="text" name="platenum" lay-verify="license" autocomplete="off" placeholder="请输入车牌号" class="layui-input">',
					    	'</div>',
					  	'</div>',
					  	'<div class="layui-form-item">',
					    	'<label class="layui-form-label">车架号</label>',
					    	'<div class="layui-input-block">',
					      		'<input type="text" name="vin" lay-verify="required" placeholder="请输入车架号" autocomplete="off" class="layui-input">',
					    	'</div>',
					  	'</div>',
					  	'<div class="layui-form-item" style="margin-top:30px;">',
							'<div class="layui-input-block">',
								'<button type="submit" class="layui-btn layui-btn-radius layui-btn-normal" lay-submit="" lay-filter="bindform">' +
									'<i class="layui-icon">&#xe654;</i> <span>确 定</span>' +
								'</button>',
								'<button type="button" class="layui-btn layui-btn-radius layui-btn-primary" id="closebtn">' +
									'<i class="layui-icon">&#x1006;</i> 关 闭' +
								'</button>',
							'</div>',
						'</div>',
					  '</form>' +
				  '</div>'].join(''),
		success:function(layero, index){
			layero.find('#closebtn').click(function(){
				layer.close(index);
			});
			var form = layui.form();
			form.verify({
			  license: [
			    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
			    '车牌号格式不正确，例："沪A88888"'
			  ] 
			});
			form.on('submit(bindform)', function(data){
				var params = data.field;
//		    	layer.alert(JSON.stringify(data.field), {
//			      	title: '最终的提交信息'
//			    })
				var url = ctx + '/archives/bind.do';
				ajaxLoading(url,params,layero.find('.layui-btn-normal'),'绑定中...',function(ret){
					console.log(ret.data);
					if(ret.data.error_code){
						if(ret.data.error_code == '207'){
							//layer.msg(ret.data.tip, {icon : 1});
							layer.confirm('找不到该车牌号和车架号对应的车辆信息，请确认是否要添加该车辆信息？', {icon:3,btn : ['确定', '取消']}, function(c, i) {
								layer.closeAll();
								toAdd(params);
							});
							return;
						}
						if(ret.data.error_code == '208'){
							var conindex = layer.confirm('该车辆已被其他用户绑定，您可以申请解绑！', {icon:3,btn : ['申请解绑', '取消']}, function(c, i) {
								layer.close(conindex);
								toApply(params);
							});
							return;
						}
					}
					layer.msg('绑定成功！', {icon : 1});
					var data = ret.data;
					if(data.IS_SELECT == '10041001'){
						$('#select_veh_display').empty();
						var vehStr = '<span class="mycar-style">' +
			        					data.PLATE_NUM +'（' + data.VEHICLE_BRAND + ' ' + data.VEHICLE_TYPE + ' ' + data.VEHICLE_CAPACITY + ' ' + data.PRODUCTION_YEAR + '年产）' +
			        				'</span>' +
			        				'<a href="javascript:toSelVeh();">更换车辆</a>';
						$('#select_veh_display').append(vehStr);
					}
					datas.unshift(data);
					laypage({
					    cont: 'pagebar',
					    skin: '#4ba7f5',
					    skip: true,
					    curr:1,
					    pages: Math.ceil(datas.length/nums), //得到总页数
					    jump: toJump
					 });
					 layer.close(index);
				});
		   		return false;
		 	});
		}
	});
}

function toApply(params){
	var url = ctx + '/archives/getRandCode.do';
	ajaxEvent(url,params,function(ret){
		var retdata = ret.data;
		layer.open({
			type: 1,
			btnAlign:'c',
			title:'申请解绑',
		//	btn: ['确 定', '关 闭'],
			anim: 0,
			skin: 'layui-layer-blue', //加上边框
			area: ['420px', '250px'], //宽高
			content:['<div style="padding:0px 20px 10px 10px;">',
						'<div class="layui-elem-field layui-field-title" style="padding:10px;">',
						  	'已向车主手机( ' + retdata.phone + ' )发送短信验证码，请查看。',
						'</div>',
						'<form class="layui-form" action="">',
							'<div class="layui-form-item">' ,
							    '<div class="layui-inline">' ,
							      '<label class="layui-form-label">验证码<font color="red">*</font></label>' ,
							      '<div class="layui-input-inline">' ,
							        '<input type="text" name="randCode" id="randCode" lay-verify="required" autocomplete="off" placeholder="请输入验证码" class="layui-input">',
							      '</div>' ,
							    '</div>' ,
							    '<div class="layui-inline">' ,
							        '<button type="submit" class="layui-btn layui-btn-normal" lay-submit="" lay-filter="applyform">' +
										'<span>解绑</span>' +
									'</button>',
							    '</div>' ,
							'</div>' ,
						  '</form>' +
					  '</div>'].join(''),
			success:function(layero, index){
				var form = layui.form();
				form.on('submit(applyform)', function(data){
					var params = data.field;
					params.vehId = retdata.vehId;
					var url = ctx + '/archives/applyUnbindVeh.do';
					ajaxLoading(url,params,layero.find('.layui-btn-normal'),'解绑中...',function(ret){
						layer.msg('解绑成功！', {icon : 1});
						layer.close(index);
					});
			   		return false;
			 	});
			}
		});
	},true);
}

function toViewVeh(vehId){
	var url = ctx + '/archives/vehDetail.do';
	ajaxEvent(url,{vehId:vehId},function(ret){
		var retdata = ret.data;
		layer.open({
			type: 1,
			btnAlign:'c',
			title:'查看普通车辆电子健康档案',
		//	btn: ['确 定', '关 闭'],
			anim: 0,
			skin: 'layui-layer-blue', //加上边框
			area: ['700px', '480px'], //宽高
			content:[
			'<div class="layui-tab  layui-tab-brief">',
			 '<ul class="layui-tab-title">',
			    '<li class="layui-this">车辆基本信息</li>',
			    '<li>车辆维修记录</li>',
			  '</ul>',
			  '<div class="layui-tab-content">',
			    '<div class="layui-tab-item layui-show">',
			      	'<form class="layui-form" action="" id="addform" >',
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车牌号<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="plateNum" id="plateNum" lay-verify="license" autocomplete="off" placeholder="请输入车牌号" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车辆品牌</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vehicleBrand" id="vehicleBrand" autocomplete="off" placeholder="请输入车辆品牌" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车系</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vehicleType" id="vehicleType" autocomplete="off" placeholder="请输入车系" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">排量</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vehicleCapacity" id="vehicleCapacity" autocomplete="off" placeholder="请输入排量" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">生产年份</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="productionYear" id="productionYear"  autocomplete="off" placeholder="请输入生产年份" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">购买日期</label>' ,
						      '<div class="layui-input-inline">' ,
						        ' <input type="text" name="buyTime" id="buyTime" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})">',
						      '</div>' ,
						    '</div>' ,					    
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车架号<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vin" id="vin" lay-verify="required" autocomplete="off" placeholder="请输入车架号" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">发动机号</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="engineNo" id="engineNo"  autocomplete="off" placeholder="请输入发动机号" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车主姓名<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="ownerName" id="ownerName" lay-verify="required" autocomplete="off" placeholder="请输入车主姓名" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车主手机<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="ownerPhone" id="ownerPhone" lay-verify="phone" autocomplete="off" placeholder="请输入联系电话" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
					  '</form>' +
			    '</div>',
			    '<div class="layui-tab-item archives">',
			    	'<table class="bgys">',
			            '<tr>',
			                '<th style="width:50px;">序号</th>  ',
			                '<th>维修企业</th>  ',
			                '<th>维修时间</th>  ',
			                '<th>送修里程</th>  ',
			                '<th>故障描述</th>  ',
			                '<th>操作</th>  ',
			            '</tr>',
			            '<tbody id="repairtbbody">',
			            '</tbody>',
					'</table>',
			    '</div>',
			  '</div>',
			'</div>'].join(''),
			success:function(layero, index){
				var veh = ret.data.veh;
				var list = ret.data.list;
				if(veh){
					$("#plateNum").val(veh.plateNum);
					$("#vehicleBrand").val(veh.vehicleBrand);
					$("#vehicleType").val(veh.vehicleType);
					$("#vehicleCapacity").val(veh.vehicleCapacity);
					$("#productionYear").val(veh.productionYear);
					$("#buyTime").val(veh.buyTime);
					$("#engineNo").val(veh.engineNo);
					$("#ownerName").val(veh.ownerName);
					$("#ownerPhone").val(veh.ownerPhone);
					$("#vin").val(veh.vin);
				}
				if(list){
					var str = '';
					var tbody = layero.find('#repairtbbody');
					var eve = 0;
				    for(var i = 0; i < list.length; i++){
				    	eve ++;
				    	var clazz = '';
				    	if(eve % 2 == 0){
				    		clazz = ' class="tr1" ';
				    	}
				    	var btn = '<a data-id="' + list[i].RECORD_ID + '" data-corp="' + list[i].CORP_NAME + '" data-date="' + list[i].REPAIR_DATE2 + '" class="layui-btn layui-btn-mini layui-btn-normal comment"><i class="layui-icon">&#xe600;</i> 去评价 </a>';
				    	if(list[i].IS_COMMENT == '10041001'){
				    		btn = '<a data-id="' + list[i].RECORD_ID + '" data-corp="' + list[i].CORP_NAME + '" data-date="' + list[i].REPAIR_DATE2 + '" class="layui-btn layui-btn-mini layui-btn-disabled"><i class="layui-icon">&#xe600;</i> 已评价 </a>';
				    	}
				    	str += '<tr' + clazz + '> ' +
					                '<td>' + (i + 1) +'</td>' + 
					                '<td>' + list[i].CORP_NAME +'</td>' + 
					                '<td>' + list[i].REPAIR_DATE2 +'</td> ' +
					                '<td>' + list[i].REPAIR_MILE +'</td>' + 
					                '<td>' + list[i].FAULT_DESCRIPT +'</td>' + 
					                '<td>' +
					                	'<a data-id="' + list[i].RECORD_ID + '" data-corp="' + list[i].CORP_NAME + '" data-date="' + list[i].REPAIR_DATE2 + '" class="layui-btn layui-btn-mini toview"><i class="layui-icon">&#xe615;</i> 详情 </a>' + 
						                btn +
					                '</td>' +
					            '</tr>';
				    }
				    tbody.empty();
				    tbody.append(str);
				    layero.on('click','.layui-btn-normal.comment',function(){
				    	toComment($(this));
				    });
				    layero.on('click','.layui-btn.toview',function(){
				    	toViewRepair($(this));
				    });
				}
			}
		});
	},true);
}

function toComment(obj){
	var recordId = obj.attr('data-id');
	var corp = obj.attr('data-corp');
	var date = obj.attr('data-date');
	layer.open({
		type: 1,
		btnAlign:'c',
		title:'维修服务评价',
	//	btn: ['确 定', '关 闭'],
		anim: 0,
		skin: 'layui-layer-blue', //加上边框
		area: ['500px', '380px'], //宽高
		content:['<div style="padding:10px 20px 10px 10px;">',
					'<form class="layui-form" action="">',
						'<div class="layui-form-item" style="margin-bottom: 5px;">',
							'<label class="layui-form-label">维修企业：</label>',
							'<div class="layui-input-inline" style="padding:10px;border: 1px dashed #e6e6e6;">',
								corp,
							'</div>',
						'</div>',
						'<div class="layui-form-item" style="margin-bottom: 5px;">',
							'<label class="layui-form-label">维修日期：</label>',
							'<div class="layui-input-inline" style="padding:10px;border: 1px dashed #e6e6e6;">',
								date,
							'</div>',
						'</div>',
						'<div class="layui-form-item" style="margin-bottom: 5px;">',
							'<label class="layui-form-label">服务评价：</label>',
							'<div class="layui-input-inline">',
								'<textarea name="content" id="content" cols="54" rows="5" lay-verify="required" style="resize: none;"></textarea>',
							'</div>',
						'</div>',
						'<div class="layui-form-item" style="margin-bottom: 5px;">',
							'<label class="layui-form-label">服务星级：</label>',
							'<div class="layui-input-inline" style="padding:10px;border: 1px dashed #e6e6e6;">',
								'<div id="comment_star"></div>',
							'</div>',
						'</div>',
						'<div class="layui-form-item" style="margin-top:20px;">',
							'<div class="layui-input-block">',
								'<button type="submit" class="layui-btn layui-btn-radius layui-btn-normal" lay-submit="" lay-filter="submitform">' +
									'<i class="layui-icon">&#xe654;</i> <span>确 定</span>' +
								'</button>',
								'<button type="button" class="layui-btn layui-btn-radius layui-btn-primary" id="closebtn">' +
									'<i class="layui-icon">&#x1006;</i> 关 闭' +
								'</button>',
							'</div>',
						'</div>',
					  '</form>' +
				  '</div>'].join(''),
		success:function(layero, index){
			layero.find('#closebtn').click(function(){
				layer.close(index);
			});
			$('#comment_star').raty({
				  //cancel   : true,
				  cancelOff: 'js/raty/demo/img/cancel-off-big.png',	
				  cancelOn : 'js/raty/demo/img/cancel-on-big.png',
				  half     : true,
				  size     : 24,
				  starHalf : 'js/raty/demo/img/star-half-big.png',
				  starOff  : 'js/raty/demo/img/star-off-big.png',
				  starOn   : 'js/raty/demo/img/star-on-big.png'
				});
			var form = layui.form();
			form.on('submit(submitform)', function(data){
				var params = data.field;
				params.recordId = recordId;
				if(!params.score){
					layer.msg('请选择星级评分！', {time: 2000, icon:5});
					return false;
				}
				var url = ctx + '/archives/submitComment.do';
				ajaxLoading(url,params,layero.find('.layui-btn-normal'),'评价中...',function(ret){
					layer.msg('评价成功！', {icon : 1});
					layer.close(index);
					obj.addClass('layui-btn-disabled');
					obj.removeClass('comment');
					obj.html('<i class="layui-icon">&#xe600;</i> 已评价');
				});
		   		return false;
		 	});
		}
	});
}


function toViewRepair(obj){
	var recordId = obj.attr('data-id');
	var corp = obj.attr('data-corp');
	var date = obj.attr('data-date');
	var url = ctx + '/archives/getRepairRecord.do';
	ajaxEvent(url,{recordId:recordId},function(ret){
		var data = ret.data;
		var record = data.record;
		var itemList = data.itemList;
		var partList = data.partList;
		var imageList = data.imageList;
		layer.open({
			type: 1,
			btnAlign:'c',
			title:'查看维修记录',
		//	btn: ['确 定', '关 闭'],
			anim: 0,
			skin: 'layui-layer-blue', //加上边框
			area: ['800px', '550px'], //宽高
			content:['<div style="padding:10px 20px 10px 10px;" class="archives">',
						'<table class="bgys">',
							'<tr><th colspan="6" style="text-align:left;padding-left:10px;">维修工单基本资料</th></tr>',
							'<tr>',
								'<th>维修企业：</th>',
								'<td>' + corp + '</td>',
								'<th>车牌号：</th>',
								'<td>' + record.plateNum + '</td>',
								'<th>送修时间:</th>',
								'<td>' + date + '</td>',
							'</tr>',
							'<tr>',
								'<th>送修里程：</th>',
								'<td>' + (record.repairMile==0?'&nbsp;':record.repairMile) + '</td>',
								'<th>送修人：</th>',
								'<td>' + record.repairPerson + '</td>',
								'<th>联系电话:</th>',
								'<td>' + record.repairPersonPhone + '</td>',
							'</tr>',
							'<tr>',
								'<th>故障描述：</th>',
								'<td colspan="3">' + record.faultDescript + '</td>',
								'<th>开工时间:</th>',
								'<td>' + record.startRepairTime + '</td>',
							'</tr>',
							'<tr>',
								'<th>故障原因：</th>',
								'<td colspan="3">' + record.faultReason + '</td>',
								'<th>状态:</th>',
								'<td>' + record.status + '</td>',
							'</tr>',
						  '</table>' ,
						  '<div class="layui-tab  layui-tab-brief">',
							 	'<ul class="layui-tab-title">',
							    	'<li class="layui-this">维修项目</li>',
							    	'<li>维修配件</li>',
							    	'<li>维修图片</li>',
							  	'</ul>',
							  	'<div class="layui-tab-content">',
							  		'<div class="layui-tab-item layui-show">',
							  			'<table class="bgys">',
								            '<tr>',
								                '<th style="width:50px;">序号</th>  ',
								                '<th>项目名称</th>  ',
								                '<th>维修工时</th>  ',
								                '<th>维修工</th>  ',
								            '</tr>',
								            '<tbody id="itemstbbody">',
								            '</tbody>',
										'</table>',
							  		'</div>',
							  		'<div class="layui-tab-item">',
							  			'<table class="bgys">',
								            '<tr>',
								                '<th style="width:50px;">序号</th>  ',
								                '<th>配件名称</th>  ',
								                '<th>配件类型</th>  ',
								                '<th>配件数量</th>  ',
								                '<th>配件价格</th>  ',
								                '<th>配件品牌</th>  ',
								                '<th>自备配件</th>  ',
								            '</tr>',
								            '<tbody id="partstbbody">',
								            '</tbody>',
										'</table>',
							  		'</div>',
							  		'<div class="layui-tab-item repairphotos">',
							  		'</div>',
								'</div>',
							'</div>',
					  '</div>'].join(''),
			success:function(layero, index){
				var itemstbbody = layero.find('#itemstbbody');
				var partstbbody = layero.find('#partstbbody');
				var repairphotos = layero.find('.repairphotos');
				if(itemList){
					var eve = 0;
					var str = '';
					for(var i = 0; i < itemList.length; i++){
				    	eve ++;
				    	var clazz = '';
				    	if(eve % 2 == 0){
				    		clazz = ' class="tr1" ';
				    	}
				    	str += '<tr' + clazz + '> ' +
					                '<td>' + (i + 1) +'</td>' + 
					                '<td>' + itemList[i].ITEM_NAME +'</td>' + 
					                '<td>' + itemList[i].REPAIR_HOURS +'</td> ' +
					                '<td>' + itemList[i].REPAIR_PERSON +'</td>' + 
					            '</tr>';
				    }
				    itemstbbody.empty();
				    itemstbbody.append(str);
				}
			    if(partList){
					var eve = 0;
					var str = '';
					for(var i = 0; i < partList.length; i++){
				    	eve ++;
				    	var clazz = '';
				    	if(eve % 2 == 0){
				    		clazz = ' class="tr1" ';
				    	}
				    	str += '<tr' + clazz + '> ' +
					                '<td>' + (i + 1) +'</td>' + 
					                '<td>' + partList[i].PART_NAME +'</td>' + 
					                '<td>' + partList[i].PART_TYPE +'</td> ' +
					                '<td>' + partList[i].PART_NUMBER +'</td>' + 
					                '<td>' + partList[i].PART_PRICE +'</td>' + 
					                '<td>' + partList[i].PART_BRAND +'</td>' + 
					                '<td>' + partList[i].IS_OWNER_PROVIDE +'</td>' + 
					            '</tr>';
				    }
				    partstbbody.empty();
				    partstbbody.append(str);
				}
				if(imageList){
					var str = '';
					for(var i=0;i<imageList.length;i++){
						str += '<div class="thumb-wrap"><div class="thumb" ><img src="attach/' + imageList[i].IMAGE_PATH +'" height="90"></div><span class="x-percent"><div class="x-progress x-progress-default" style="height:30px;" id="progressbar-1037">' + imageList[i].IMAGE_INFO + '<br>' + imageList[i].TAKE_TIME + '</div></span></div>'
					}
					repairphotos.empty();
				    repairphotos.append(str);
				}
			}
		});
	},true);
}

function toAdd(data){
	//console.log(data);
	layer.open({
		type: 1,
		btnAlign:'c',
		title:'添加车辆',
	//	btn: ['确 定', '关 闭'],
		anim: 0,
		skin: 'layui-layer-blue', //加上边框
		area: ['650px', '480px'], //宽高
		content:['<div style="padding:0px 20px 10px 10px;">',
					'<fieldset class="layui-elem-field layui-field-title">',
					  	'<legend>请输入车辆信息</legend>',
					'</fieldset>',
					'<form class="layui-form" action="" id="addform" style="float:left;width:600px;">',
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车牌号<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="plateNum" id="plateNum" lay-verify="license" autocomplete="off" placeholder="请输入车牌号" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车辆品牌</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vehicleBrand" id="vehicleBrand" autocomplete="off" placeholder="请输入车辆品牌" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车系</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vehicleType" id="vehicleType" autocomplete="off" placeholder="请输入车系" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">排量</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vehicleCapacity" id="vehicleCapacity" autocomplete="off" placeholder="请输入排量" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">生产年份</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="productionYear" id="productionYear"  autocomplete="off" placeholder="请输入生产年份" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">购买日期</label>' ,
						      '<div class="layui-input-inline">' ,
						        ' <input type="text" name="buyTime" id="buyTime" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})">',
						      '</div>' ,
						    '</div>' ,					    
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车架号<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="vin" id="vin" lay-verify="required" autocomplete="off" placeholder="请输入车架号" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">发动机号</label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="engineNo" id="engineNo"  autocomplete="off" placeholder="请输入发动机号" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item">' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车主姓名<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="ownerName" id="ownerName" lay-verify="required" autocomplete="off" placeholder="请输入车主姓名" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						    '<div class="layui-inline">' ,
						      '<label class="layui-form-label">车主手机<font color="red">*</font></label>' ,
						      '<div class="layui-input-inline">' ,
						        '<input type="text" name="ownerPhone" id="ownerPhone" lay-verify="phone" autocomplete="off" placeholder="请输入联系电话" class="layui-input">',
						      '</div>' ,
						    '</div>' ,
						'</div>' ,
						'<div class="layui-form-item" style="margin-top:30px;">',
							'<div class="layui-input-block">',
								'<button type="submit" class="layui-btn layui-btn-radius layui-btn-normal" lay-submit="" lay-filter="addform">' +
									'<i class="layui-icon">&#xe654;</i> <span>确 定</span>' +
								'</button>',
								'<button type="button" class="layui-btn layui-btn-radius layui-btn-primary" id="closebtn">' +
									'<i class="layui-icon">&#x1006;</i> 关 闭' +
								'</button>',
							'</div>',
						'</div>',
					  '</form>' ,
				  '</div>'].join(''),
		success:function(layero, index){
			layero.find('#closebtn').click(function(){
				layer.close(index);
			});
			$("#plateNum").val(data.platenum);
			$("#vin").val(data.vin);
			var form = layui.form();
			form.verify({
			  license: [
			    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
			    '车牌号格式不正确，例："沪A88888"'
			  ] 
			});
			form.on('submit(addform)', function(data){
				var params = data.field;
//		    	layer.alert(JSON.stringify(data.field), {
//			      	title: '最终的提交信息'
//			    })
				var url = ctx + '/archives/add.do';
				ajaxLoading(url,params,layero.find('.layui-btn-normal'),'添加中...',function(ret){
					layer.msg('添加成功！', {icon : 1});
					var data = ret.data;
					if(data.IS_SELECT == '10041001'){
						$('#select_veh_display').empty();
						var vehStr = '<span class="mycar-style">' +
			        					data.PLATE_NUM +'（' + data.VEHICLE_BRAND + ' ' + data.VEHICLE_TYPE + ' ' + data.VEHICLE_CAPACITY + ' ' + data.PRODUCTION_YEAR + '年产）' +
			        				'</span>' +
			        				'<a href="javascript:toSelVeh();">更换车辆</a>';
						$('#select_veh_display').append(vehStr);
					}
					datas.unshift(data);
					laypage({
					    cont: 'pagebar',
					    skin: '#4ba7f5',
					    skip: true,
					    curr:1,
					    pages: Math.ceil(datas.length/nums), //得到总页数
					    jump: toJump
					 });
					 layer.close(index);
				});
		   		return false;
		 	});
		}
	});
}