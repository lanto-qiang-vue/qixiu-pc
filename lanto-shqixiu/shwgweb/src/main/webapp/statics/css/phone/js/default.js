
//个人中心 ，提示宽度自适应
$(function(){
	var width=$(window).width();
	var wz=width-129;
	$(".pnl .sm").css("width",wz)
	if(wz>207){
		$(".pnl .sm").css("margin-top","16px")
	}else if(wz<182){
		$(".pnl .sm").css("margin-top","0")
	}
})

//选择驾校报名弹窗 文本框自适应
$(function(){	
	//弹窗JS
	$(".chshl-xx .submit").click(function(){
		$(".chshl-xx .zz").fadeIn();
		$(".chshl-xx .popUp").fadeIn()
		var lWidth=$(".chshl-xx .textBox .left").width();
		var margin=parseInt($(".chshl-xx .textBox textarea").css("margin-left"))
		var width=$(".chshl-xx .textBox li").width();
		var n=width-lWidth-margin-2;	
		$(".chshl-xx .textBox textarea").css("width",n);
	})
	//选择驾校区域及训练场筛选
	$(".ar .sx div").click(function(){
		$(this).addClass("active").siblings().removeClass("active")
	})
	//左栏选择子菜单显示隐藏
	$(".ar ul>li").click(function(){
		$(".ar .subList").hide();		
		$(this).find(".subList").show();
		$(this).addClass("current").siblings().removeClass("current")
	});
	//左栏子菜单选中样式
	$(".ar .subList li").click(function(){
		$(this).addClass("current").siblings().removeClass("current")
	});
})

//学时查询切换
$(function(){
	$(".cht .tabCard li").click(function(){
		$(this).addClass("active").siblings().removeClass("active")
	})
})

//多选框LABEL样式切换。 
$(function(){
	$(".pj label").click(function(){
		var n=$(this).hasClass("toggle")
		$(".pj .inputGro label").removeClass("toggle")
		$(this).addClass("toggle")	
	})
})

//评分系统
$(function(){
	$(".pf .star li").click(function(){
		var n=$(this).index();
		$(this).siblings().removeClass("active")
		for(var i=0;i<n+1;i++){
			$(this).parent().find("li").eq(i).addClass("active")
		}		
	})
})


