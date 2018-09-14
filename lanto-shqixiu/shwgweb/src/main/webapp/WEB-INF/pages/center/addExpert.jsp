<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
</head>
<body class="employee-class">
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r" style="overflow: hidden;">
        <div class="pro_t">
            <span class="wenti">车大夫</span>
            <button id="back" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;margin-left: 10px"
                    onclick="back()">返回
            </button>
            <button id="editButton" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;"
                    onclick="editInfo()">编辑
            </button>
        </div>
        <div class="examine" style="position: relative">
            <form class="layui-form layui-form-pane" action="" style="margin-top: 15px;margin-left: 10%">
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>姓名</label>
                    <div class="layui-input-block">
                        <input type="text" name="name"  placeholder="请输入姓名" maxlength="30" required  lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>

                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>性别</label>
                    <div class="layui-input-block" >
                        <input type="radio" name="sex" value="10031001" title="男" checked class="view-mode">
                        <input type="radio" name="sex" value="10031002" title="女" class="view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">身份证号</label>
                    <div class="layui-input-block">
                        <input type="text" name="idNum" id="idNum" placeholder="请输入身份证号"
                               autocomplete="off" maxlength="18"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">手机号</label>
                    <div class="layui-input-block">
                        <input type="text" name="telphone" id="telphone" placeholder="请输入手机号码"
                               autocomplete="off" maxlength="11"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">出生日期</label>
                    <div class="layui-input-block" style="width: 190px; margin-right: 3px;">
                        <input type="text" name="birthDate" id="birthDate"
                               autocomplete="off" class="layui-input"
                               onclick="layui.laydate({elem: this})">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">学历</label>
                    <div class="layui-input-block">
                        <div id="category" class="layui-input-inline search_select hoverlist4"
                             style="width: 190px; margin-right: 3px;" data-value=""
                             data-type="category">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="请选择学历" value="" readonly=""
                                           class="layui-input layui-unselect" id="degree">
                                    <i class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <dd data-value="10361001" class=""><i class="layui-icon">&#xe605;</i> <span>小学</span>
                                    </dd>
                                    <dd data-value="10361002" class=""><i class="layui-icon">&#xe605;</i> <span>初中</span>
                                    </dd>
                                    <dd data-value="10361003" class=""><i class="layui-icon">&#xe605;</i> <span>高中</span>
                                    </dd>
                                    <dd data-value="10361004" class=""><i class="layui-icon">&#xe605;</i> <span>大专</span>
                                    </dd>
                                    <dd data-value="10361005" class=""><i class="layui-icon">&#xe605;</i> <span>本科</span>
                                    </dd>
                                    <dd data-value="10361006" class=""><i class="layui-icon">&#xe605;</i> <span>硕士</span>
                                    </dd>
                                    <dd data-value="10361007" class=""><i class="layui-icon">&#xe605;</i> <span>博士</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label">籍贯</label>
                    <div class="layui-input-block">
                        <input type="text" name="nativePlace"  placeholder="请输入籍贯"
                               autocomplete="off" maxlength="20"
                               class="layui-input view-mode">

                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>就职企业</label>
                    <div class="layui-input-block">
                        <input type="text" name="empUnit"  placeholder="请输入就职企业"
                               autocomplete="off" maxlength="50" required
                               class="layui-input view-mode">

                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>职称</label>
                    <div class="layui-input-block">
                        <input type="text" name="professor"  placeholder="请输入职称"
                               autocomplete="off" maxlength="255" required
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label">荣誉</label>
                    <div class="layui-input-block">
                         <textarea id="honor" name="honor" placeholder="请输入荣誉"
                                   class="layui-textarea view-mode"></textarea>

                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label">擅长</label>
                    <div class="layui-input-block">
                         <textarea id="goodAt" name="goodAt" placeholder="请输入擅长"
                                   class="layui-textarea view-mode"></textarea>

                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>头像</label>
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn layui-btn-normal"
                                id="upload">
                            <i class="layui-icon">&#xe67c;</i> 添加图片
                        </button>
                        <span>（仅支持jpg、gif、png、docx、bmp、ico,并仅限上传一张）</span>
                    </div>
                    <div class="extra">
                        <%--<div class="showextra" style="margin-top: 10px;">--%>
                        <%--<div class="layui-btn layui-btn-normal hideextra">移除附件</div>--%>
                        <%--<span>附件地址：</span><a style="color: red" href="">附件</a>--%>
                        <%--</div>--%>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo" view-mode>立即提交</button>
                    </div>
                </div>

            </form>
            <div class="box"></div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>

<script type="text/javascript">

    // 新增
    var filePath = [];
    var isAdd = true; // 是都是新增
    if (getUrlParam('id')) {
        isAdd = false;
    } else {
        $('.box').hide();
        $('#editButton').hide();
    }

    function init() {
        layui.use(['form', 'layedit', 'upload'], function () {
            layedit = layui.layedit;
            editIndex = layedit.build('honor',
                {tool: [
                    'strong'
                    ,'italic' //斜体
                    ,'underline' //下划线
                    ,'del' //删除线

                    ,'|' //分割线

                    ,'left' //左对齐
                    ,'center' //居中对齐
                    ,'right' //右对齐
                ]}); //建立编辑器
            editIndexs= layedit.build('goodAt',
                {tool: [
                    'strong'
                    ,'italic' //斜体
                    ,'underline' //下划线
                    ,'del' //删除线

                    ,'|' //分割线

                    ,'left' //左对齐
                    ,'center' //居中对齐
                    ,'right' //右对齐
                ]}); //建立编辑器
            var upload = layui.upload;

            //执行实例
            var uploadInst = upload.render({
                elem: '#upload' //绑定元素
                ,url: baseu + '/image/add/'+localStorage.getItem('ACCESSTOKEN') //上传接口
                ,accept: 'images'
                ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                    layer.load(); //上传loading
                }
                ,done: function(res){
                    filePath.push(res && res.data && res.data.picPath);
                    //上传完毕回调
                    if(res.code== '000000'){
                        $(".extra").html(
                            '<div class="showextra" style="margin-left: 60px;">'+
                            '<div class="layui-btn layui-btn-normal hideextra" style="margin: 0 20px;border-radius: 4px;background-color: #2d8cf0;">移除附件</div>'+
                            '<span>附件地址：</span><a class="extras" style="color: red" href="'+
                            res.data.picPath+'">'+res.data.picPath+'</a>'+
                            '</div>'
                        )
                    }else{
                        var message = responseMessageMaker(res, "${ctx}");
                        layer.msg(message, {time: 2000, icon:5});
                    }
                    layer.closeAll('loading');
                }
                ,error: function(){
                    //请求异常回调
                    layer.closeAll('loading');
                }
            });
            $(".extra").on('click', '.hideextra', function () {
                var removePicPath = $(this).parent('.showextra').children(".extras").text();
                for(var i = 0; i < filePath.length; i++){
                    if(removePicPath == filePath[i]){
                        filePath.splice(i ,1);
                        break;
                    }
                }

                console.log('removePicPath: ', removePicPath);
                $(this).parent('.showextra').remove();
            });

            var form = layui.form;

            form.render();

            // 监听提交
            form.on('submit(formDemo)', function (data) {
                layer.load();
                var data = data.field;
                console.log('data',data);
                console.log('1111',layedit.getContent(editIndex));
                var name=data.name;
                var empUnit=data.empUnit;
                var professor=data.professor;
                var upload=data.upload;
                console.log(data.sex);
                if(name== '' || name == null){
                    layer.msg('姓名不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(name.length < 2 || name.length > 30) {
                    layer.msg('姓名长度必须在2-30', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                var id=$("#idNum").val();//var id=$("#Idcardnumber")是获取Input文本框对象， .val（）;是获取文本框里面的值
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(id.length!=0){
                    if(reg.test(id) === false)
                    {
                        layer.msg('身份证输入不合法', {time: 3000, icon: 5});
                        layer.closeAll('loading');
                        return false;
                    }
                }
                //正则表达式，十一位数字的电话号码
                var phone=$("#telphone").val();
                var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
               //验证输入的电话号码是否是11位数字
                if(phone.length!=0){
                    if(!phoneReg.test(phone)){
                        layer.msg('请输入正确的手机号码', {time: 3000, icon: 5});
                        layer.closeAll('loading');
                        return false;
                    }
                }
                if(empUnit== '' || empUnit == null){
                    layer.msg('就职企业不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(professor== '' || professor == null){
                    layer.msg('职称不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
//                if(upload== '' || upload == null){
//                    layer.msg('头像不能为空', {time: 3000, icon: 5});
//                    layer.closeAll('loading');
//                    return false;
//                }
                var params ={
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    name: data.name,
                    sex: data.sex,
                    idNum: data.idNum,
                    telphone: data.telphone,
                    birthDate: data.birthDate,
                    degree: $('.hoverlist4 .select-this').attr('data-value') || '',
                    nativePlace: data.nativePlace,
                    empUnit: data.empUnit,
                    professor: data.professor,
                    honor: layedit.getContent(editIndex),
                    goodAt: layedit.getContent(editIndexs),
                    photo: $('.extras').attr('href') ||  null
                };
                if (getUrlParam('id')) {
                    params.expertId = getUrlParam('id');
                    console.log('params.id',params.id,getUrlParam('id'));
                    accessPost(baseu + 'cdf/manager/update/' + getUrlParam('id'), JSON.stringify(params), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = '/shwgweb/cdf/managerExamine';
                        }
                    });
                } else {
                    accessPost(baseu + 'cdf/manager/add', JSON.stringify(params), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = '/shwgweb/cdf/managerExamine';
                        }
                    });
                }
                return false;
            });

        });
    };


    init();

    // 初始化页面数据(详情)
    function initData() {
        var id = getUrlParam('id');
        if (id) {
            layer.load();

            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                expertId: id
            }
            accessPost(baseu + '/cdf/manager/detail/' + id, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.closeAll('loading');
                console.log('res',res)

                var data = res.data,honor='',goodAt='',url = '';
                url = data.photo;
                honor = data.honor;
                goodAt = data.goodAt;
                console.log('url',url)
                if(data == null){
                    layer.msg(res.status, {time: 3000, icon: 5})
                    return false;
                }
                console.log('data',data)
                console.log('honor',honor)
                console.log('goodAt',goodAt)
                $('#category dd[data-value=' + data.degree + ']').click();//学位
                $('input[name="name"]').val(data.name); // 姓名
                $('input[name="telphone"]').val(data.telphone); // 电话
                $('input[name="idNum"]').val(data.idNum); // 身份证号
                $('input[name="nativePlace"]').val(data.nativePlace); // 籍贯
                $('input[name="professor"]').val(data.professor); // 职称
                $('input[name="empUnit"]').val(data.empUnit); // 就职企业
                $('input[name="birthDate"]').val(formatDate(data.birthDate,'yyyy-MM-dd')); // 出生日期
                $('#honor').val(honor);//荣誉
                $('#goodAt').val(goodAt);//擅长
                if (data.sex == '10031001') {//性别
                    $('input[title="男"]').next('div').click();
                } else {
                    $('input[title="女"]').next('div').click();
                }
                if(url){
                    $(".extra").html(
                        '<div class="showextra" style="margin-left: 60px;">'+
                        '<div class="layui-btn layui-btn-normal hideextra" style="margin: 0 20px;border-radius: 4px;background-color: #2d8cf0;">移除附件</div>'+
                        '<span>附 件：</span><a class="extras" style="color: red" href="'+
                        url+'">'+url+'</a>'+
                        '</div>'
                    )

                }

                editIndex = layedit.build('honor',
                    {tool: [
                        'strong'
                        ,'italic' //斜体
                        ,'underline' //下划线
                        ,'del' //删除线

                        ,'|' //分割线

                        ,'left' //左对齐
                        ,'center' //居中对齐
                        ,'right' //右对齐
                    ]}); //建立编辑器

                editIndexs = layedit.build('goodAt',
                    {tool: [
                        'strong'
                        ,'italic' //斜体
                        ,'underline' //下划线
                        ,'del' //删除线

                        ,'|' //分割线

                        ,'left' //左对齐
                        ,'center' //居中对齐
                        ,'right' //右对齐
                    ]}); //建立编辑器
            })
        }
    }

    initData();


    $(function () {

    });

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
        window.location.href = '/cdf/managerExamine';
    }
    $('.hoverlist4 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist4 dl dd').removeClass('select-this');
            $(this).addClass('select-this');
        }
        var items = [];
        var titleItems = [];
        par.find('dl .select-this').each(function () {
            items.push($(this).attr('data-value'));
            titleItems.push($(this).find('span').text());
        });
        if (titleItems && titleItems.length > 0) {
            par.find('input').val(titleItems.join('|'));
            par.attr("title", titleItems.join('|'));
        } else {
            par.find('input').val(par.attr('data-tit'));
            par.attr("title", par.attr('data-tit'));
        }

        if (items && items.length > 0) {
            par.attr("data-value", items.join(','));
        } else {
            par.attr("data-value", '');
        }
    });
</script>
<script>
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#birthDate' //指定元素
        });
    });
</script>
<style>
    .common-input60 {
        width: 90%;
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