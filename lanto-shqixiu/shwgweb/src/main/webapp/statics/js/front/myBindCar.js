$(function () {
    var form = layui.form;
    form.render()

    var laydate1= laydate2 = layui.laydate;
    laydate1.render({
        elem: '.time1', //指定元素
        format: 'yyyy/MM/dd'
    });
    laydate2.render({
        elem: '.time2', //指定元素
        format: 'yyyy/MM/dd'
    });

    var type= 1
    var hasIDinfo=false

    form.on('select(type)', function(data){
        console.log(data.value); //得到被选中的值
        if(data.value=='1'){
            type= 1
            $(".yingye").hide()
            $(".idCard, .idCard-back").show()
            hasIDinfo?($(".hasIDinfo").hide()):null
        }else{
            type= 2
            $(".idCard, .idCard-back").hide()
            $(".yingye").show()
        }

    });

    layer.load()
    accessGet(baseu+ '/scan/getCard/'+ localStorage.getItem('ACCESSTOKEN'),function (res) {
        console.log(res)
        if(res.code=='000000'){
            if(res.data.userId){
                hasIDinfo=true
                $(".hasIDinfo").hide()
                $(".front img").attr("src", 'data:image/jpg;base64,'+res.data.frontImage).attr("pid", res.data.creditId)
                $(".idCard-back img").attr("src", 'data:image/jpg;base64,'+res.data.backImage)
                $(".idCard.front .info li:nth-child(1) span").text(res.data.reviseOwnerName)
                $(".idCard.front .info li:nth-child(2) span").text(res.data.reviseIdCardNo)
                $(".idCard-back .info li:nth-child(1) span").text(formatDate(res.data.reviseBeginDate, 'yyyy/MM/dd')+"-"+formatDate(res.data.reviseEndDate, 'yyyy/MM/dd'))
                $(".front .info, .idCard-back .info").show()
                $(".idCard .layui-btn,.idCard-back .layui-btn").hide()
            }
        }
        layer.closeAll('loading');
    })

    $("#submit").click(function () {
        if(!$(".xingshi img").attr("src")){
            layer.msg('请选择行驶证照片', {icon: 5, time: 2000});
            return
        }
        if( type==1){
            if(!$(".idCard.front img").attr("src")){
                layer.msg('请选择身份证（头像面）照片', {icon: 5, time: 2000});
                return
            }
            // if(!$(".idCard-back img").attr("src")){
            //     layer.msg('请选择身份证（国徽面）照片', {icon: 5, time: 2000});
            //     return
            // }
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
        accessPost(baseu+ '/scan/newBind', JSON.stringify(param), function (res) {
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
    var file= $( className+ ' input').get(0).files[0]
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

        // compress(this.result, {width: 1000, height:1000, quality: 0.7} , pushImg, className)
    }

}

function pushImg(base64, className, name) {

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
            upload('/scan/newUpload', {
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
        case '.idCard-back':{
            upload('/scan/newUpload', {
                accessToken: tok,
                accuracy: '',
                detect_direction: true,
                detect_risk: false,
                id_card_side: 'back',
                property: 2,
                image: base64.split(',')[1]
            }, className, base64)
            break
        }
        case '.yingye':{
            upload('/scan/newUpload', {
                accessToken: tok,
                accuracy: '',
                detect_direction: true,
                property: 3,
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
                    $(".xingshi .name").val(res.data.ownerName)
                    $(".xingshi .card").val(res.data.vehiclePlateNumber)
                    $(".xingshi .vin").val(res.data.vin)
                    $(".xingshi .fadong").val(res.data.engineNo)
                    break
                }
                case '.idCard':{
                    $(".idCard.front .info li:nth-child(1) span").text(res.data.ownerName)
                    $(".idCard.front .info li:nth-child(2) span").text(res.data.idCardNo)
                    $(".idCard.front .info").show()
                    $(".idCard .name").val(res.data.ownerName)
                    $(".idCard .card").val(res.data.idCardNo)
                    break
                }
                case '.idCard-back':{
                    $(".idCard-back .info li:nth-child(1) span").text(formatDate(res.data.beigin_date, 'yyyy/MM/dd')+"-"+formatDate(res.data.end_date, 'yyyy/MM/dd'))
                    $(".idCard-back .info").show()
                    $(".idCard-back .time1").val(formatDate(res.data.beigin_date, 'yyyy/MM/dd'))
                    $(".idCard-back .time2").val(formatDate(res.data.end_date, 'yyyy/MM/dd'))
                    break
                }
                case '.yingye':{
                    $(".yingye .info li:nth-child(1) span").text(res.data.corpName)
                    $(".yingye .info li:nth-child(2) span").text(res.data.legalPerson)
                    $(".yingye .info").show()
                    $(".yingye .name").val(res.data.corpName)
                    $(".yingye .person").val(res.data.legalPerson)
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

function edit(className) {
    layer.open({
        type: 1,
        content: $('#form'),
        title: "修改信息",
        area: ['520px', '400px'],
        cancel: function () {
            $("#form").hide()
        }
    });
    $("#form form").hide()
    $(className).show()
}

function update(className) {
    layer.confirm('修改后需要审核通过才能查看汽车档案', {icon: 3, title:'确定修改？'}, function(index){
        var tok= localStorage.getItem("ACCESSTOKEN"), param={}
        switch (className){
            case '.xingshi': {
                param={
                    accessToken: tok,
                    property: 2,
                    licenseId: $('.xingshi img').attr("pid"),
                    new_license_owner_name: $(".xingshi input.name").val(),
                    new_vehicle_plate_number: $(".xingshi input.card").val(),
                    new_vin: $(".xingshi input.vin").val(),
                    new_engine_no: $(".xingshi input.fadong").val(),
                }
                break
            }
            case '.idCard':{
                param={
                    accessToken: tok,
                    property: 1,
                    idcardId: $('.idCard.front img').attr("pid"),
                    new_owner_name: $(".idCard input.name").val(),
                    new_id_card_no: $(".idCard input.card").val()
                }
                break
            }
            case '.idCard-back':{
                param={
                    accessToken: tok,
                    property: 1,
                    idcardId: $('.idCard-back img').attr("pid"),
                    new_begin_date: new Date($(".idCard-back input.time1").val()).toISOString(),
                    new_end_date: new Date($(".idCard-back input.time2").val()).toISOString()
                }
                break
            }
            case '.yingye':{
                param={
                    accessToken: tok,
                    property: 3,
                    businessId: $('.yingye img').attr("pid"),
                    new_corp_name: $(".yingye input.name").val(),
                    new_legal_person: $(".yingye input.person").val()
                }
                break
            }
        }
        layer.load();
        accessPost(baseu+ '/scan/update', JSON.stringify(param), function (res){
            console.log(res)
            if(res.code=='000000'){
                switch (className){
                    case '.xingshi': {
                        $(".xingshi .info li:nth-child(1) span").text($(".xingshi input.name").val())
                        $(".xingshi .info li:nth-child(2) span").text($(".xingshi input.card").val())
                        $(".xingshi .info li:nth-child(3) span").text($(".xingshi input.vin").val())
                        $(".xingshi .info li:nth-child(4) span").text($(".xingshi input.fadong").val())
                        break
                    }
                    case '.idCard':{
                        $(".idCard.front .info li:nth-child(1) span").text($(".idCard input.name").val())
                        $(".idCard.front .info li:nth-child(2) span").text($(".idCard input.card").val())
                        break
                    }
                    case '.yingye':{
                        $(".yingye .info li:nth-child(1) span").text($(".yingye input.name").val())
                        $(".yingye .info li:nth-child(2) span").text($(".yingye input.person").val())
                        break
                    }
                }

                // $(".idCard-back .info li:nth-child(1) span").text($(".idCard-back input.time1").val()+"-"+$(".idCard-back input.time2").val())

                layer.closeAll()
                $("#form").hide()
                layer.msg('修改成功')
            }else{
                layer.msg(res.status, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
            layer.closeAll('loading');
        })

        layer.close(index);
    });
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