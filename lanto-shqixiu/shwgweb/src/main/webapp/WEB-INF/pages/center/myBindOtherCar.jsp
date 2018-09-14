<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<style>
	.layui-btn{
		position: relative;
	}
	.layui-btn input{
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		left: 0;
		top: 0;
		cursor: pointer;
	}
	.layui-input-block img{
		width: 100%;
	}
	.info{
		padding: 10px;
		display: none;
	}
	.info li{
		font-size: 16px;
		line-height: 30px;
		border-bottom: 1px solid #CCCCCC;
	}
	.info li label{
		width: 120px;
		display: inline-block;
	}
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">绑定车辆</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/userInfo">车主中心</a> > <span>绑定车辆</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<form class="layui-form" action="" style="width: 500px;margin-top: 10px">

				<div class="layui-form-item">
				<label class="layui-form-label">绑定类型</label>
				<div class="layui-input-block">
					<select name="type" lay-filter="type">
						<option value="1">绑定个人车辆</option>
						<option value="2">绑定企业车辆</option>
					</select>
				</div>
				</div>

				<div class="layui-form-item xingshi">
					<label class="layui-form-label">上传行驶证</label>
					<div class="layui-input-block">
						<div class="layui-btn layui-btn-normal" id="upload1">
							<i class="layui-icon">&#xe67c;</i>选择图片
							<input onchange="getImg('.xingshi')" type="file" accept="image/jpg,image/png,image/bmp">
						</div>
						<span>仅支持PNG、JPG、JPEG、BMP</span>
					</div>
				</div>
				<div class="layui-form-item xingshi">
					<label class="layui-form-label"></label>
					<div class="layui-input-block">
						<img src="">
						<ul class="info">
							<li><label>所有人：</label><span class="name"></span></li>
							<li><label>车牌号码：</label><span class="card"></span></li>
							<li><label>车架号(VIN)：</label><span class="vin"></span></li>
							<li><label>发动机号：</label><span class="fadong"></span></li>
						</ul>
					</div>
				</div>

				<div class="layui-form-item idCard">
					<label class="layui-form-label">上传身份证（正面）</label>
					<div class="layui-input-block">
						<div class="layui-btn layui-btn-normal" >
							<i class="layui-icon">&#xe67c;</i>选择图片
							<input onchange="getImg('.idCard')" type="file" accept="image/jpg,image/png,image/bmp">
						</div>
						<span>仅支持PNG、JPG、JPEG、BMP</span>
					</div>
				</div>
				<div class="layui-form-item idCard">
					<label class="layui-form-label"></label>
					<div class="layui-input-block">
						<img src="">
						<ul class="info">
							<li><label>姓名：</label><span class="name"></span></li>
							<li><label>身份证号：</label><span class="card"></span></li>
						</ul>
					</div>
				</div>

				<div class="layui-form-item yingye" style="display: none">
					<label class="layui-form-label">上传营业执照</label>
					<div class="layui-input-block">
						<div class="layui-btn layui-btn-normal" >
							<i class="layui-icon">&#xe67c;</i>选择图片
							<input onchange="getImg('.yingye')" type="file" accept="image/jpg,image/png,image/bmp">
						</div>
						<span>仅支持PNG、JPG、JPEG、BMP</span>
					</div>
				</div>
				<div class="layui-form-item yingye" style="display: none">
					<label class="layui-form-label"></label>
					<div class="layui-input-block">
						<img src="">
						<ul class="info">
							<li><label>企业名称：</label><span class="name"></span></li>
							<li><label>法定代表人：</label><span class="person"></span></li>
						</ul>
					</div>
				</div>

				<div class="layui-btn layui-btn-normal" id="submit" style="float: right;margin-bottom: 10px">提交</div>
				<div class="layui-btn layui-btn-normal" id="back" style="float: left;margin-left: 20px;margin-bottom: 10px;">后退</div>
			</form>


		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    $(function () {
        var form = layui.form;
        form.render()

	    var type= 1

        form.on('select(type)', function(data){
            console.log(data.value); //得到被选中的值
	        if(data.value=='1'){
                type= 1
	            $(".yingye").hide()
		        $(".idCard").show()
	        }else{
                type= 2
                $(".idCard").hide()
                $(".yingye").show()
	        }

        });

        $("#submit").click(function () {
			if(!$(".xingshi img").attr("src")){
                layer.msg('请选择行驶证照片', {icon: 5, time: 2000});
                return
			}
			if( type==1){
                if(!$(".idCard img").attr("src")){
                    layer.msg('请选择身份证（正面）照片', {icon: 5, time: 2000});
                    return
                }
			}else{
                if(!$(".yingye img").attr("src")){
                    layer.msg('请选择营业执照片', {icon: 5, time: 2000});
                    return
                }
			}

            layer.load();
            var param={
                accessToken : localStorage.getItem("ACCESSTOKEN"),
                licenseId: $( '.xingshi img').attr("pid"),
                idCardId: type==1? $( '.idCard img').attr("pid"): "",
                businessId: type==2? $( '.yingye img').attr("pid"): "",
            }
            accessPost(baseu+ '/scan/bind', JSON.stringify(param), function (res) {
                console.log(res)
                if(res.code=='000000'){
                    layer.alert('绑定成功', function(index){
                        window.location.href= '/center/repairInfo?role_id=1'
                    });

                }else{
                    layer.alert(res.status, {
                        icon: 5,
                    });
                }
                layer.closeAll('loading');

            })
        })
        $("#back").click(function () {
            window.history.go(-1)
        })
    })
	
	function getImg(className) {
        $( className+ ' .info').hide()
        var file=$( className+ ' input').get(0).files[0]
		var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function (e) {
            var image = new Image();
            var self= this
            image.onload=function(){
                var width = image.width;
                var height = image.height;
                compress(self.result,
                    {width: width, height:height, quality: 0.6, type: file.type} ,
                    pushImg, className, file.name)
            };
            image.src= e.target.result;

//            compress(this.result, {width: 1000, height:1000, quality: 0.7} , pushImg, className)
        }

    }

    function pushImg(base64, className,name) {

		var tok= localStorage.getItem("ACCESSTOKEN")

	    switch (className){
		    case '.xingshi':{
                upload('/scan/newDriverLicense', {
                    accessToken: tok,
                    accuracy: '',
                    detect_direction: true,
                    image: base64.split(',')[1]
                }, className, base64)
			    break
		    }
            case '.idCard':{
                upload('/scan/upload', {
                    accessToken: tok,
                    accuracy: '',
                    detect_direction: true,
                    detect_risk: false,
                    id_card_side: 'front',
                    property: 1,
                    image: base64.split(',')[1]
                }, className, base64)
                break
            }
            case '.yingye':{
                upload('/scan/upload', {
                    accessToken: tok,
                    accuracy: '',
                    detect_direction: true,
                    property: 2,
                    image: base64.split(',')[1]
                }, className, base64)
                break
            }
	    }
    }

    function upload(url, param, className, base64) {
        layer.load();
        accessPost(baseu+ url, JSON.stringify(param), function (res) {
            console.log(res)
            if(res.code=='000000'){

                layer.msg('上传成功', function(index){
                });
                $( className+ ' img').attr("src", base64)
                $( className+ ' img').attr("pid", res.data.id||res.data.creditId||res.data.businessId)
                switch (className){
                    case '.xingshi':{
                        $(".xingshi .info li:nth-child(1) span").text(res.data.ownerName)
                        $(".xingshi .info li:nth-child(2) span").text(res.data.vehiclePlateNumber)
                        $(".xingshi .info li:nth-child(3) span").text(res.data.vin)
                        $(".xingshi .info li:nth-child(4) span").text(res.data.engineNo)
                        $(".xingshi .info").show()
                        break
                    }
                    case '.idCard':{
                        $(".idCard .info li:nth-child(1) span").text(res.data.ownerName)
                        $(".idCard .info li:nth-child(2) span").text(res.data.idCardNo)
                        $(".idCard .info").show()
                        break
                    }
                    case '.yingye':{
                        $(".yingye .info li:nth-child(1) span").text(res.data.corpName)
                        $(".yingye .info li:nth-child(2) span").text(res.data.legalPerson)
                        $(".yingye .info").show()
                        break
                    }
                }
            }else{
                layer.msg(res.status, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
            layer.closeAll('loading');
        })
    }

    function compress(path, obj, callback, className, name){
            var img = new Image();
            img.src = path;
            img.onload = function () {
                var that = this;
                // 默认按比例压缩
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                var quality = 0.7;  // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                    quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL(obj.type|| 'image/png', quality);
                // 返回base64的值
                callback(base64, className, name)
            }

    }

</script>
</html>
