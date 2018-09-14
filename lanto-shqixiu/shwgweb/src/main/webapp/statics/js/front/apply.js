
$(function() {
	$(".hoverlist").each(function(){
		var field = $(this).attr("data-field");
		var value = $(this).find("input").val();
		var innerHtml = '';
		if(field == "corpPro"){
			if(province){
				for(var i=0;i<province.length;i++){
					var pro = province[i];
					var activeCls = '';
					if(pro.ProName == value){
						selectPro = pro;
						activeCls = 'layui-this';
					}
					innerHtml = innerHtml + '<dd data-value="' + pro.ProName +'" data-id="' + pro.ProID +'" class="' + activeCls + '">' + pro.ProName +'</dd>';
				}
				
			}
		}
		if(field == "corpCity"){
			if(city){	
				for(var i=0;i<city.length;i++){
					var ct = city[i];
					var activeCls = '';
					if(ct.CityName == value){
						activeCls = 'layui-this';
					}
					if(ct.ProID == 9){
						innerHtml = innerHtml + '<dd data-value="' + ct.CityName +'" data-id="' + ct.CityID +'" class="' + activeCls + '">' + ct.CityName +'</dd>';
					}				
				}
				
			}
		}
		if(field == "corpArea"){
			if(District){
				for(var i=0;i<District.length;i++){
					var dis = District[i];
					var activeCls = '';
					if(dis.DisName == value){
						activeCls = 'layui-this';
					}
					if(dis.CityID == 3){
						innerHtml = innerHtml + '<dd data-value="' + dis.DisName +'" class="' + activeCls + '">' + dis.DisName +'</dd>';
					}
				}
				
			}
		}
		$(this).find('dl').empty();
		$(this).find('dl').append(innerHtml);
	});
	$(document).click(function(event){
	 	var dom = $(event.target).parents(".hoverlist");
	 	if(!dom.attr("data-toggle")){
	 		$(".hoverlist").removeClass('layui-form-selected');
	 	}
	 });
	$(".hoverlist .layui-select-title").click(function(event){
		event.stopPropagation();
		var par = $(this).parents(".hoverlist");
		par.siblings().removeClass('layui-form-selected');
		if(!par.hasClass('layui-form-selected')){
 			par.addClass('layui-form-selected');
 		}else{
 			par.removeClass('layui-form-selected');
 		}
 		
	});
	$('.hoverlist dl').on('click','dd',function(){
		var par = $(this).parents(".hoverlist");
		var dl = $(this).parents("dl");
		var field = par.attr("data-field");
		var value = $(this).attr("data-value");
		var did = $(this).attr("data-id");
		$(this).addClass('layui-this').siblings().removeClass('layui-this');
		par.removeClass('layui-form-selected');
		if(value == par.find('input').val()){
			return;
		}
		par.find('input').val(value);
		if(field == "corpPro"){
			$("#selectCity").find('input').val('');
			$("#selectArea").find('input').val('');
			var innerHtml = '';
			for(var i=0;i<city.length;i++){
				var ct = city[i];
				if(ct.ProID == did){
					innerHtml = innerHtml + '<dd data-value="' + ct.CityName +'" data-id="' + ct.CityID +'">' + ct.CityName +'</dd>';
				}				
			}
			$("#selectCity").find('dl').empty().append(innerHtml);
			$("#selectArea").find('dl').empty();
		}
		if(field == "corpCity"){
			$("#selectArea").find('input').val('');
			var innerHtml = '';
			for(var i=0;i<District.length;i++){
				var dis = District[i];
				if(dis.CityID == did){
					innerHtml = innerHtml + '<dd data-value="' + dis.DisName +'">' + dis.DisName +'</dd>';
				}				
			}
			$("#selectArea").find('dl').empty().append(innerHtml);
		}
	});
	layui.use('form', function() {
		var form = layui.form();
		form.on('submit(userinfosubmit)', function(data) {
			layer.confirm('确认要提交吗？', {
						icon : 3,
						btn : ['确定', '取消']
					}, function() {
						ajaxLoading(ctx + "/center/submitApply.do", data.field,
								$("#submitBtn"), '正在提交中...', function(ret) {
									layer.alert('提交成功！', {
										icon : 1,
										end : function() {
											window.location.href = ctx + '/center/applyList';
										}
									});
								});
					});
			return false;
		});
		form.render();
	});
});
