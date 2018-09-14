$(function() {

    filePath = []

    layui.use('form', function(){

        var form = layui.form;
        form.render();

        form.on('select(to1)',function (data) {
            console.log(data.value);
            switch (data.value){
                case 'all':{
                    $(".to3").hide()
                    break
                }
                case '1':{
                    $(".to3").hide()
                    break
                }
                case '2':{
                    $(".to3").show()
                    break
                }
                case '3':{
                    $(".to3").hide()
                    break
                }
            }
        })
        
        form.on('submit', function(data){
            console.log(data.field)
            var params = data.field
            params.accessToken= localStorage.getItem('ACCESSTOKEN')

            //判断企业类型
            switch ($(".comeType").val()){
                case 'all':{
                    params.companyCategory= 'all'
                    break
                }
                case '43':{
                    params.companyCategory= '43'
                    break
                }
                case '44':{
                    params.companyCategory= '44'
                    break
                }
                case '45':{
                    params.companyCategory= '45'
                    break
                }
            }

            //判断角色
            switch ($(".role").val()){
                case 'all':{
                    params.roleId= 'all'
                    // delete params.comeType
                    params.companyCategory= ''
                    break
                }
                case '1':{
                    params.roleId= '1'
                    // delete params.comeType
                    params.companyCategory= ''
                    break
                }
                case '2':{
                    params.roleId= '2'
                    // delete params.roleId
                    break
                }
                case '3':{
                    params.roleId= '3'
                    // delete params.comeType
                    params.companyCategory= ''
                    break
                }
            }
            var id = getUrlParam('id');
            params.notifyId = id;
            params.roleIds = [];
            params.companyCategorys = [];
            params.areakeys = [];
            var roleAndCompany = $('#companycategory').attr('data-value');
            var tempArr = roleAndCompany.split(',');

            if(roleAndCompany) {

            } else {
                layer.msg('请选择发送对象', {time: 2000, icon:3});
                return;
            }

            for (var i=0,len=tempArr.length; i<len; i++) {
                 if(tempArr[i] == 'all') {
                     params.roleIds.push('all')
                } else if(tempArr[i] == '全部') {
                     params.companyCategorys.push('all')
                } else if(tempArr[i] == '全部2') {
                     params.areakeys.push('all')
                 } else if(tempArr[i].length == 2) {
                     params.companyCategorys.push(tempArr[i])
                } else if(tempArr[i].length == 1){
                     params.roleIds.push(tempArr[i])
                } else  {
                    params.areakeys.push(tempArr[i])
                 }
            }

            if (params.roleIds.indexOf('2')>=0 && params.companyCategorys.length<1) {
                layer.msg('请选择维修企业等级', {time: 2000, icon:3});
                return;
            }

            params.url= []
            $(".extras").each(function () {
                params.url.push($(this).attr("href"))
            })

            layer.confirm('确定发送此通知?', {icon: 3, title:'提示'}, function(index){
                params.content = layedit.getContent(editIndex)
                params.url = []
                var data = $(".extras")
                for(var i = 0; i < data.length ; i++) {
                    var url = $('.extras').get(i).href
                    params.url.push(url)
                }
                params.roleId = params.to1
                params.companyCategory = params.to3 ? params.to3 : ''
                console.log("sendNotify---params", params)
                if(id){
                    accessPost(baseu+ '/message/notify/modify/'+id,JSON.stringify(params), function (res) {
                        console.log(res)
                        layer.closeAll('loading');
                        if(res.code== '000000'){
                            layer.msg('发送成功！', {time: 2000, icon:1});
                            window.location.href='manageNotes'
                        }else{
                            layer.msg(res.status, {time: 2000, icon:5});
                        }
                    })
                }else{
                accessPost(baseu+ '/message/notify/sendNotify',JSON.stringify(params), function (res) {
                    console.log(res)
                    layer.closeAll('loading');
                    if(res.code== '000000'){
                        layer.msg('发送成功！', {time: 2000, icon:1});
                        window.location.href='manageNotes'
                    }else{
                        layer.msg(res.status, {time: 2000, icon:5});
                    }
                })
                }
                layer.close(index);
            }, function(index){
                //按钮【按钮二】的回调
                layer.close(index);
            });
        })
    });

    layui.use('upload', function(){
        var upload = layui.upload;

        //执行实例
        var uploadInst = upload.render({
            elem: '#upload' //绑定元素
            ,url: baseu + '/file/add/'+localStorage.getItem('ACCESSTOKEN') //上传接口
            ,accept: 'file'
            ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                layer.load(); //上传loading
            }
            ,done: function(res){
                //上传完毕回调
                if(res.code== '000000'){
                    var docPath = res.data.docPath;
                    var fileName = docPath.substring(docPath.lastIndexOf('/')+1)
                    $(".extra").html(
                        '<div class="showextra" style="margin-left: 60px;">'+
                        '<div class="layui-btn layui-btn-normal hideextra" style="margin: 0 20px;border-radius: 4px;background-color: #2d8cf0;">移除附件</div>'+
                        '<span>附 件：</span><a class="extras" style="color: red" href="'+
                        res.data.docPath+'">'+fileName+'</a>'+
                        '</div>'
                    )
                }else{
                    layer.msg(res.status, {time: 2000, icon:5});
                }
                layer.closeAll('loading');
            }
            ,error: function(){
                //请求异常回调
                layer.closeAll('loading');
            }
        });
    });

    $(".extra").on('click', '.hideextra', function () {
        $(this).parent('.showextra').remove()
    })


})