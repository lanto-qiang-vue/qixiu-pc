<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>

<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<link rel="stylesheet" href="${btx}/css/phone.css" />
</head>
<style>
	body{
		text-align: center;
		/*min-height: 100vh;*/
		background-color: #ee3847;
	}
	.center{
		display: inline-block;
		text-align: center;
		min-height: 550px;
		height: 100vh;
		width: 100%;
		max-width: 414px;
		background: url("${btx}/img/hiteggs/bg.png") no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.title{
		width: 100%;
		margin-bottom: 20%;
	}
	.eggs{
		width: 90%;
		height: 160px;
		position: relative;
		left: 0;
		right: 0;
		margin: auto;
		overflow: hidden;
		text-align: center;
	}
	.egg{
		width: 90px;
		position: absolute;
	}
	.egg:nth-child(1){left: 0}
	.egg:nth-child(2){left: 0;right: 0;margin: auto}
	.egg:nth-child(3){right: 0}
	.egg:hover{
		width: 120px;
	}
	.egg.on{
		width: 120px;
	}
	.role{
		padding: 10px 10%;
		color: #8a0807;
		text-align: left;
		font-size: 14px;
	}
	.hammer{
		width: 100px;
		position: absolute;
		right: 0;
		top: 30%;
		z-index: 5;
	}
	.hammer.on{
		animation: move .5s ease;
	}
	@keyframes move {
		0% {transform: translate( 0, 0)}
		50% {transform: translate( 0, 50px)}
		100% {transform: translate( 0, 0)}
	}
	.dialog{
		width: 80%;
		position: absolute;
		left: 0;
		right: 0;
		top: 20%;
		margin: auto;
		background-color: #ee3847;
		border-radius: 10px;
		height: 300px;
		z-index: 10;
		display: none;
	}
	.dialog .close{
		font-size: 34px;
		color: #b40816;
		text-align: right;
		padding-right: 15px;
		cursor: pointer;
	}
	.win{
		height: 360px;
		background: url("${btx}/img/hiteggs/dialog.png") no-repeat;
		background-size: 100% 100%;
	}
	.text{
		position: absolute;
		text-align: center;
		bottom: 120px;
		font-size: 30px;
		color: white;
		width: 100%;
		line-height: 40px;
	}
	.text span{
		font-size: 24px;
		color: #ffd825;
	}
	.button{
		width: 200px;
		height: 40px;
		position: absolute;
		line-height: 40px;
		color: #e13710;
		background-color: #ffd825;
		border-radius: 10px;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 30px;
		font-size: 16px;
		cursor: pointer;
	}
</style>
<body>
<div class="center">
	<img class="title" src="${btx}/img/hiteggs/title.png"/>
	<div class="eggs">
		<img class="egg" src="${btx}/img/hiteggs/egg.png"/>
		<img class="egg" src="${btx}/img/hiteggs/egg.png"/>
		<img class="egg" src="${btx}/img/hiteggs/egg.png"/>
	</div>
	<div class="role">
		<p>活动规则</p>
		<p>1、活动时间：2018.04.01-2018.04.30</p>
		<p>2、砸蛋规则：每位用户每天仅有一次砸蛋机会，微信分享后可额外获得一次机会。</p>
	</div>
	<div class="dialog win">
		<div class="close">×</div>
		<div class="text">
			<p>恭喜您抽中1元洗车券！</p>
		</div>
		<div class="button towash">立即领取</div>
	</div>
	<div class="dialog lose">
		<div class="close">×</div>
		<div class="text">
			<p>很遗憾，您未中奖！</p>
			<span>请明日再来</span>
		</div>
		<div class="button ok">好的</div>
	</div>
</div>
<img class="hammer" src="${btx}/img/hiteggs/hammer.png">

<script type="text/javascript">
$(function () {
    $("body").mousemove(function (e) {
        $(".hammer").css('top', (e.pageY-100) + "px").css("left",(e.pageX) + "px");
    })

    var flag=0

    $(".close, .ok").click(function () {
	    $(".dialog").hide()
        $(".hammer").removeClass('on')
        $(".egg").removeClass('on').attr("src","${btx}/img/hiteggs/egg.png")
        flag=0
    })

	$(".towash").click(function () {
        window.location.href='/phone/wash'
    })

    $(".egg").click(function () {
        if(flag) return
        flag=1
        //判断登录
        equipLogin("/phone/hiteggs")

        var self=this
        $(".hammer").css('animation','move .5s ease')
		var token= localStorage.getItem('ACCESSTOKEN')

	    //判断是否已经中奖
        accessGet(baseu+ '/activity/isPrize/'+token, function (res) {
//            console.log(res)
			if(res.code=='131309'){
	            layer.msg("您已经有优惠券，请预约门店", {icon: 5, time: 2000 }, function () {
	                window.location.href='/phone/wash'
	            })
			}else{
                //敲蛋
                knock(token, self)
			}
        })





    })
	

	
	function knock(token,  self) {
        accessPost(baseu+'/activity/knockEgg', JSON.stringify({accessToken:token}), function (res) {
	        console.log(res)
            flag=0
            $(".hammer").css('animation','')
	        if(res.code=='131308'){
	            if(res.share){
                    layer.msg("您今天已无抽奖机会，请明天再来", {icon: 5, time: 2000 })
		            return
	            }else{
                    layer.open({
                        title: '您今天已无抽奖机会!'
                        ,content: '进入微信公众号【上海汽修平台】并分享后可再获得一次抽奖机会！'
                    });
                    return
	            }
	        }

            if(res.code=='000000'){
                setTimeout(function () {
                    $(self).addClass('on')
                    $(self).attr("src","${btx}/img/hiteggs/broken.png")
					setTimeout(function () {
                        if(res.prize){
                            $('.win').show()
                        }else{
                            if(!res.share){
                                $('.lose span').text('进入微信公众号【上海汽修平台】并分享后可再获得一次抽奖机会！')
                            }
                            $('.lose').show()
                        }
                    },500)
                },500)

            }



        })
    }
})

</script>
</body>

</html>
