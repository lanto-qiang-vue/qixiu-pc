$(function() {

    filePath = []

    layui.use('layedit', function(){
        layedit = layui.layedit;
        editIndex = layedit.build('description',
            {tool: [
            'strong'
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线

            ,'|' //分割线

            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
            ,'help' //帮助
        ]}); //建立编辑器
    });

    layui.use('form', function(){

        var form = layui.form;
        form.render();

        form.on('submit', function(data){
            console.log(data.field)
            var params = {}
            params.accessToken= localStorage.getItem('ACCESSTOKEN')
            params.title=data.field.title
            // console.log('111111111111111',$('.extras').text())
            layer.confirm('确定新建此考核内容?', {icon: 3, title:'提示'}, function(index){
                params.description = layedit.getContent(editIndex)

                params.fileurl = $('.extras').text()
                console.log("check---params", params)
                accessPost(baseu+ '/reputation-assessmant/add',JSON.stringify(params), function (res) {
                    console.log(res)
                    layer.closeAll('loading');
                    if(res.code== '000000'){
                        layer.msg('新建成功！', {time: 2000, icon:1});
                        window.location.href='manageQualCheck'
                    }else{
                        layer.msg(res.status, {time: 2000, icon:5});
                    }
                })
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
            elem: '#upload' //绑定元素`
            ,url: baseu + '/file/add/'+localStorage.getItem('ACCESSTOKEN') //上传接口
            ,accept: 'file'
            ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                layer.load(); //上传loading
                console.log(obj)
            }
            ,done: function(res){

                console.log(res)
                //上传完毕回调
                if(res.code== '000000'){
                    var docPath = res.data.docPath;
                    var fileName = docPath.substring(docPath.lastIndexOf('/')+1)
                    $(".extra").html(
                        '<div class="showextra" style="margin-left: 60px;">'+
                        '<div class="layui-btn layui-btn-normal hideextra" style="margin: 0 20px;border-radius: 4px;background-color: #2d8cf0;">移除附件</div>'+
                        '<span>附件地址：</span><a class="extras" style="color: red" href="'+
                        docPath + '">' + fileName + '</a>'+
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