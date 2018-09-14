<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <!-- 配置文件 -->
    <script type="text/javascript" src="/statics/js/ueditor/ueditor.config.js"></script>
    <!-- 编辑器源码文件 -->
    <script type="text/javascript" src="/statics/js/ueditor/ueditor.all.js"></script>

    <script type="text/javascript" charset="utf-8" src="/statics/js/ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript" charset="utf-8" src="/statics/js/ueditor/addCustomizeDialog.js"></script>
</head>
<style>
    #articlecontainer{
        min-height: 500px;
        overflow: hidden;
    }
    .layui-btn{
        position: relative;
        display: inline-block;
    }
    .layui-btn input{
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        left: 0;
        cursor: pointer;
    }
</style>
<body class="employee-class">
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r" style="overflow: hidden;">
        <div class="pro_t">
            <span class="wenti">文章信息</span>
            <button id="back" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;margin-left: 10px" onclick="back()">返回</button>
            <%--<button id="editButton" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;" onclick="editInfo()">编辑</button>--%>
        </div>
        <div class="examine" style="position: relative;width: 100%;min-width: 800px">
            <form class="layui-form layui-form-pane" action="" style="width: 90%;margin: 10px auto">
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>文章标题</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" id="title"  placeholder="请输入文章标题" required  lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>


                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>文章类型</label>
                    <div class="layui-input-block" style="width: 200px">
                        <select id="category">
                            <option value="">请选择</option>

                        </select>
                    </div>

                </div>

                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">文章来源</label>
                    <div class="layui-input-block">
                        <input type="text" name="dataFrom" id="dataFrom"  placeholder="请输入文章来源"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>

                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label" style="display: flex;flex-direction: column;">
                        <div><span class="require-icon">*</span>文章内容</div>
                        <div class="layui-btn layui-btn-normal" onclick="preview()">预览</div>
                    </label>

                    <div class="layui-input-block">
                        <div id="articlecontainer"></div>
                         <%--<textarea id="content" name="content" placeholder="请输入文章内容" class="layui-textarea view-mode"></textarea>--%>

                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <%--<label class="layui-form-label">文章图片</label>--%>
                        <%--<div class="layui-input-block">--%>
                        <%--<button type="button" class="layui-btn layui-btn-normal"--%>
                        <%--id="upload">--%>
                        <%--<i class="layui-icon">&#xe67c;</i> 添加图片--%>
                        <%--</button>--%>
                        <%--<span>（仅支持jpg、gif、png、docx、bmp、ico,并仅限上传一张）</span>--%>
                        <%--</div>--%>
                        <%--<div class="extra">--%>
                        <%--&lt;%&ndash;<div class="showextra" style="margin-top: 10px;">&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<div class="layui-btn layui-btn-normal hideextra">移除附件</div>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;<span>附件地址：</span><a style="color: red" href="">附件</a>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                        <%--</div>--%>
                        <label class="layui-form-label">
                            <%--<span class="require-icon">*</span>--%>
                            封面图片</label>
                        <div class="layui-input-block">
                            <div class="layui-btn layui-btn-normal" >
                                <i class="layui-icon">&#xe67c;</i>选择图片
                                <input id="getimg" onchange="getImg()" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp">
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                        <div class="layui-input-block">
                            <input type="text" name="photo" id="photo" placeholder="请输入文章图片url路径"
                                   class="layui-input view-mode">
                        </div>
                        <div class="layui-input-block">
                            <img id="coverimg" style="max-width: 200px"/>
                        </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label">是否重要</label>
                    <div class="layui-input-block" >
                        <input type="radio" name="importantFlag" value="10041001" title="是" checked class="view-mode">
                        <input type="radio" name="importantFlag" value="10311002" title="否" class="view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60" pane style="display: none">
                    <label class="layui-form-label">发布状态</label>
                    <div class="layui-input-block" >
                        <input type="radio" name="publishStatus" value="10311001" title="已发布"  class="view-mode">
                        <input type="radio" name="publishStatus" value="10311002" title="未发布" checked class="view-mode">
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo" view-mode>立即提交</button>
                    </div>
                </div>

            </form>
            <%--<div class="box"></div>--%>


        </div>
    </div>
</div>
<div id="form" style="display: none;overflow: auto">
    <div class="detailpage">
        <p class="title" style="font-size: 22px;text-align: center;margin: 15px 0;"></p>
        <div class="detail"></div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>

<script type="text/javascript">
    var form = layui.form;

    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
    UE.Editor.prototype.getActionUrl = function(action) {
        if (action == 'uploadimage' ) {
            return baseu + '/image/add/'+ localStorage.getItem('ACCESSTOKEN') ;
        } else if(action == 'uploadfile'){
            return baseu + '/file/add/'+ localStorage.getItem('ACCESSTOKEN');
        }else{
            return this._bkGetActionUrl.call(this, action);
        }
    };
    var ue = UE.getEditor('articlecontainer',{
        scaleEnabled: false,
        zIndex: 1,
        catchRemoteImageEnable:false
    });

    $(function () {

        accessGet(baseu+ '/infopublic/public/info/category', function (res) {
            var datas=res.list, html=''
            for (var i in datas){
                if(datas[i])
                    html+='<option value="'+datas[i].infoType+'">'+datas[i].codeDesc+'</option>'
            }
            $("#category").append(html)
            initData();
            form.render()
        })

        var filePath = [];
        var isAdd = true; // 是都是新增
        if (getUrlParam('id')) {
            isAdd = false;
        } else {
            $('.box').hide();
            $('#editButton').hide();
        }
        init();

        $("#coverimg").zoomify({duration:0})

        $("#photo").change(function () {
            $("#coverimg").attr('src',$("#photo").val())
        })
    });


    function init() {
        layui.use(['form', 'layedit'], function () {
//            layedit = layui.layedit;
//            editIndex = layedit.build('content',
//                {tool: [
//                    'strong'
//                    ,'italic' //斜体
//                    ,'underline' //下划线
//                    ,'del' //删除线
//
//                    ,'|' //分割线
//
//                    ,'left' //左对齐
//                    ,'center' //居中对齐
//                    ,'right' //右对齐
//                ]}); //建立编辑器



            // 监听提交
            form.on('submit(formDemo)', function (data) {
                layer.load();
                var data = data.field;
//                console.log('data',data);
//                console.log('1111',layedit.getContent(editIndex));
                if(!$('#category').val()){
                    layer.msg('请选择文章类型', {time: 2000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
//                if(!ue.getContentTxt()){
//                    layer.msg('文章内容不能为空', {time: 2000, icon: 5});
//                    layer.closeAll('loading');
//                    return false;
//                }
                var params ={
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    title: data.title,
                    content: ue.getContent(),
                    dataFrom:data.dataFrom,
                    importantFlag: data.importantFlag,
                    infoType: $('#category').val(),
                    photo: data.photo
                };
                if (getUrlParam('id')) {
                    params.infoId = getUrlParam('id');
                    console.log('params',params,getUrlParam('id'));
                    accessPost(baseu + '/infopublic/update/' + getUrlParam('id'), JSON.stringify(params), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = 'articlesInfo';
                        }
                    });
                } else {
                    accessPost(baseu + '/infopublic/add', JSON.stringify(params), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = 'articlesInfo';
                        }
                    });
                }
                return false;
            });

        });
    };


    // 初始化页面数据(详情)
    function initData() {
        var id = getUrlParam('id');
        if (id) {
            layer.load();

            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                infoId: id
            }
            accessPost(baseu + '/infopublic/detail/' + id, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.closeAll('loading');
//                console.log('res',res)

                var data = res.data,content = '';
                url = data.photo;
                content = data.content;
//                console.log('url',url)
                if(data == null){
                    layer.msg(res.status, {time: 3000, icon: 5})
                    return false;
                }

                $("#title").val(data.title)
                $("#category").val(data.infoType)
                $("#dataFrom").val(data.dataFrom)
                ue.setContent(data.content)
                $("#coverimg").attr({src: data.photo})
                $("#photo").val(data.photo)

                if (data.importantFlag == '10041001') {//重要标志
                    $('input[title="是"]').next('div').click();
                } else {
                    $('input[title="否"]').next('div').click();
                }

                form.render()
//                editIndex = layedit.build('content',
//                    {tool: [
//                        'strong'
//                        ,'italic' //斜体
//                        ,'underline' //下划线
//                        ,'del' //删除线
//
//                        ,'|' //分割线
//
//                        ,'left' //左对齐
//                        ,'center' //居中对齐
//                        ,'right' //右对齐
//                    ]}); //建立编辑器
            })
        }
    }

    function preview() {
        var layer = layui.layer

        layer.open({
            type: 1,
            content: $('#form'),
            title: "预览",
            area: ['90%', '90%'],
            cancel: function () {
                $("#form").hide()
            }
        });

        $(".detailpage .title").html($("#title").val())
        $(".detail").html(ue.getContent())
    }
    
    var editView = true;
    function editInfo() {
        if (editView) {
            $('.box').hide();
            $('#editButton').text('取消编辑');
        } else {
            $('.box').show();
            $('#editButton').text('编辑');
        }
        editView = !editView;
    }

    function back(){
//        window.location.href = 'articlesInfo';
        history.go(-1)
    }

    function getImg() {
        var file=$('#getimg').get(0).files[0]
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
                    pushImg, file.name)
            };
            image.src= e.target.result;
        }
    }

    function compress(path, obj, callback, name){
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
            // console.log(base64)
            // 返回base64的值
            callback(base64, name)
        }

    }

    function pushImg(base64, name) {
        layer.load();
        var formdata = new FormData();
        formdata.append('file' , base64ToBlob(base64), name);
        // console.log(base64ToBlob(base64))
        // console.log(formdata.get(className))
        filePost(baseu + '/image/add/'+ localStorage.getItem('ACCESSTOKEN') , formdata, function (res) {
            console.log(res)
            if(res.code=='000000'){
                layer.msg('图片上传成功');
                $("#coverimg").attr({src: res.data.picPath, path: res.data.picPath})
                $("#photo").val(res.data.picPath)
            }else{
                layer.msg(res.status, {icon: 5, time: 2000 });
            }
            layer.closeAll('loading');
        })
    }

    function base64ToBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
</script>
<style>
    .common-input60 {
        width: 100%;
    }

    .require-icon {
        margin-right: 5px;
        color: red;
    }
    .extra{
        margin-left: 30px;
        margin-top: 10px;
    }
    .box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #000;
        opacity: 0.1;
    }
</style>
</html>
<script src="${btx}/js/zooming.js"></script>