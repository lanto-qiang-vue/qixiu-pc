<%--
  Created by IntelliJ IDEA.
  User: lvjj
  Date: 2018/2/5
  Time: 16:24
  To change this template use File | Settings | File Templates.
--%>
<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t" id="Addresume">
            <span class="sp_zw">简历详情</span> <span class="sp_wz">您所在位置：
				<a href="${ctx}/center/addResume">简历管理</a>> <span>简历详情</span></span>
        </div>
        <div style="margin-bottom: 40px;">
            <button id="editButton" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;"
                    onclick="history.back()">返回
            </button>
        </div>
        <%--主体代码--%>
        <div class="user-info">
            <form class="layui-form layui-form-pane" onsubmit="return false">

                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                    <legend>基本信息</legend>
                </fieldset>
                <div class="layui-form-item">
                    <label class="layui-form-label">姓名</label>
                    <div class="layui-input-inline">
                        <input type="text" id="realName" name="realName" placeholder="请姓名" autocomplete="on"
                               class="layui-input" value="">
                    </div>
                    <%--<div class="layui-form-mid layui-word-aux">请输入昵称</div>--%>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">性别</label>
                    <div class="layui-input-block">
                        <input type="radio" name="sex" id="sex1" value="1" title="男" checked>
                        <input type="radio" name="sex" id="sex0" value="0" title="女">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">出生日期</label>
                    <div class="layui-input-block" style="width: 20%">
                        <input type="text" name="birthDate" id="birthDate"
                               autocomplete="off" class="layui-input"
                               onclick="layui.laydate({elem: this})">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">手机</label>
                    <div class="layui-input-inline">
                        <input type="text" id="mobile" name="mobile" placeholder="请输入手机号码" autocomplete="on"
                               class="layui-input" value="">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">电子邮箱</label>
                    <div class="layui-input-inline">
                        <input type="text" name="email" placeholder="请输入电子邮箱" autocomplete="on"
                               id="email" class="layui-input" value="">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">现居住地</label>
                    <div class="layui-input-inline">
                        <input type="text" name="address" placeholder="请输入地址" autocomplete="on"
                               id="address" class="layui-input" value="">
                    </div>
                </div>

                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                    <legend>求职意向</legend>
                </fieldset>

                <div class="layui-form-item">
                    <label class="layui-form-label">期望薪资</label>
                    <div class="layui-input-inline">
                        <input type="text" name="expectSalary" placeholder="" autocomplete="on"
                               id="expectSalary" class="layui-input" value="">
                    </div>
                    <div class="layui-form-mid layui-word-aux">万元</div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">期望职位</label>
                    <div class="layui-input-inline">
                        <input type="text" name="expectPost" placeholder="" autocomplete="on"
                               id="expectPost" class="layui-input" value="">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">工作地方</label>
                    <div class="layui-input-inline">
                        <input type="text" name="workRegion" placeholder="" autocomplete="on"
                               id="workRegion" class="layui-input" value="">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">工作类型</label>
                    <div class="layui-input-inline">
                        <select name="workType" id="workType" lay-verify="">
                            <option value="1">全职</option>
                            <option value="2">兼职</option>
                        </select>
                    </div>
                </div>

                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                    <legend>工作经验</legend>
                </fieldset>
                <div id="workexperience">
                    <div class = "workexperience" data-index="1">
                        <div class="layui-form-item">
                            <label class="layui-form-label">时间</label>
                            <div class="layui-input-block" style="width: 20%">
                                <input type="text" class="layui-input" id="workDate" placeholder="请选择日期范围">
                            </div>
                        </div>

                        <div><input type="hidden"  name="startDate" placeholder="" autocomplete="on" class="layui-input ceshiStartdata" value=""></div>
                        <div><input type="hidden"  name="endDate" placeholder="" autocomplete="on" class="layui-input ceshiEnddata" value=""></div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">公司</label>
                            <div class="layui-input-inline">
                                <input type="text" name="corpName" placeholder="" autocomplete="on"
                                       id="corpName" class="layui-input" value="">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">职位</label>
                            <div class="layui-input-inline">
                                <input type="text" name="post" placeholder="" autocomplete="on"
                                       id="post" class="layui-input" value="">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">部门</label>
                            <div class="layui-input-inline">
                                <input type="text" name="department" placeholder="" autocomplete="on"
                                       id="department" class="layui-input" value="">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">行业</label>
                            <div class="layui-input-inline">
                                <input type="text" name="industry" placeholder="" autocomplete="on"
                                       id="industry" class="layui-input" value="">
                            </div>
                        </div>

                        <div class="layui-form-item">
                            <label class="layui-form-label">工作描述</label>
                            <div class="layui-input-inline">
                                <input type="text" name="workDesc" placeholder="" autocomplete="on"
                                       id="workDesc" class="layui-input" value="">
                            </div>
                        </div>
                    </div>
                </div>
                <%--<button class="layui-btn layui-btn-normal" lay-filter="" onclick="addwork()">新增工作经验</button>--%>

                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                    <legend>教育经历</legend>
                </fieldset>
                <div class="layui-form-item">
                    <label class="layui-form-label">时间</label>
                    <div class="layui-input-block" style="width: 20%">
                        <input type="text" class="layui-input" id="rangeDate" placeholder="请选择日期范围" value="">
                    </div>
                </div>

                <input type="hidden" id="educationStartDate" name="educationStartDate" placeholder="" autocomplete="on" class="layui-input ceshiStartdata" value="">
                <input type="hidden" id="educationEndDate" name="educationEndDate" placeholder="" autocomplete="on" class="layui-input ceshiEnddata" value="">

                <div class="layui-form-item">
                    <label class="layui-form-label">学校</label>
                    <div class="layui-input-inline">
                        <input type="text" name="schoolName" placeholder="" autocomplete="on"
                               id="schoolName" class="layui-input" value="">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">学历/学位</label>
                    <div class="layui-input-inline">
                        <select name="degree" id="degree"  lay-verify="">
                            <option value="1">初中以下</option>
                            <option value="2">高中</option>
                            <option value="3">中专</option>
                            <option value="4">大专</option>
                            <option value="5">本科</option>
                        </select>
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">专业</label>
                    <div class="layui-input-inline">
                        <input type="text" name="major" placeholder="" autocomplete="on"
                               id="major" class="layui-input" value="">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">专业描述</label>
                    <div class="layui-input-inline">
                        <input type="text" name="majorDesc" placeholder="" autocomplete="on"
                               id="majorDesc" class="layui-input" value="">
                    </div>
                </div>

            </form><INPUT TYPE="HIDDEN" ID="aaa" value="1">
        </div>
    </div>
    <%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    $(function () {
        var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
        if(!userinfo){
            layer.msg('请先进行登录');
            setTimeout(function(){
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + "${memberUri}";
            },2000)
        }
        //    layui.use('form', function() {
        var form = layui.form;
        form.render();
        //    })
        $('input[type="text"]').attr("readonly","readonly")
        $('input[type="radio"]').attr("readonly","readonly")
    })
    var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
    /*$('#email').val(userInfo.email);*/
    $('#userName').val(userInfo.nickname);
    $('#userpicture').attr('src', userInfo.photo || '${btx}/images/defaultUser.jpg');

    var filePath = '';
    /*$(function () {
        var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
        $('.userid').text(userinfo.telphone)
        switch (userinfo.userRoleId) {
            case 1:
                $(".sp_wz a").text('车主中心');
                break
            case 2:
                $(".sp_wz a").text('企业中心');
                break
            case 3:
                $(".sp_wz a").text('管理中心');
                break
            case 4:
                $(".sp_wz a").text('运营商中心');
                break
            case 5:
                $(".sp_wz a").text('专家中心');
                break
            case 6:
                $(".sp_wz a").text('协会中心');
                break
            case 7:
//                管理中心领导
                $(".sp_wz a").text('管理中心');
                break
            default:
        }
    })*/
    var form = layui.form
    form.render().on('submit(userinfosubmit)', function (data) {
        layer.confirm('确认要修改吗？', {
            icon: 3,
            btn: ['确定', '取消']
        }, function () {
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                avatarpath: filePath,
                email: $('#email').val(),
                nickname: $('#userName').val()
            };
            simplePost(baseu + '/changeUser/updateUser', JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                if (res.code === '000000') {
                    layer.msg('修改成功');
                    userInfo.email = $('#email').val();
                    userInfo.nickname = $('#userName').val();
                    if(filePath != '') {
                        userInfo.photo = $('#userpicture').attr('src');
                    }
                    localStorage.setItem('USERINFO',JSON.stringify(userInfo));
                    window.location.reload();
                } else {
                    layer.msg(res.status);
                }
            })
        });
        return false;
    });


    /*$(function () {
        var form = layui.form;
        form.render();

        layui.use('upload', function () {
            var upload = layui.upload;

            //执行实例
            var uploadInst = upload.render({
                elem: '#upload' //绑定元素
                , url: baseu + '/image/add/' + localStorage.getItem('ACCESSTOKEN') //上传接口
                , accept: 'images'
                , exts: 'jpg|png'
                , size: 1024
                , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                    layer.load(); //上传loading
                }
                , done: function (res) {

                    //上传完毕回调
                    if (res.code == '000000') {
                        filePath = res.data.picPath;
                        $('#userpicture').attr('src', res.data.picPath);
                        layer.msg(res.status);
                    } else {
                        layer.msg(res.status);
                    }
                    layer.closeAll('loading');
                }
                , error: function () {
                    layer.msg('系统繁忙！', {time: 2000, icon: 5});
                    //请求异常回调
                    layer.closeAll('loading');
                }
            });
        });

        $(".extra").on('click', '.hideextra', function () {
            var removePicPath = $(this).parent('.showextra').children(".extras").text();
            for (var i = 0; i < filePath.length; i++) {
                if (removePicPath == filePath[i]) {
                    filePath.splice(i, 1);
                    break;
                }
            }

            console.log('removePicPath: ', removePicPath);
            $(this).parent('.showextra').remove();
        });

    });*/

    /*function uploadImage() {
        $('#upload').click();
    }*/

    /**
     * 时间控件
     */
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#birthDate' //指定元素
        });
    });

    /**
     * 时间控件
     */
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#workstartDate' //指定元素
        });
    });

    //教育日期选择器
    var educationstartDate = ''
    var educationendDate = ''
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#rangeDate' //指定元素
            ,range: '~'
            ,done: function(value){
                var range = value.split('~');
                educationstartDate = range[0].trim()
                educationendDate = range[1].trim()
                $("#educationStartDate").val(educationstartDate);
                $("#educationEndDate").val(educationendDate);
                console.log('educationstartDate',educationstartDate); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log('educationendDate',educationendDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
        });
    });

    //工作经验日期选择器
    var startDate = ''
    var endDate = ''
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#workDate' //指定元素
            ,range: '~'
            ,done: function(value){
                var range = value.split('~');
                startDate = range[0].trim()
                endDate = range[1].trim()
                $(".ceshiStartdata").val(startDate);
                $(".ceshiEnddata").val(endDate);
                console.log('workstartDate',startDate); //：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                console.log('workenddate',endDate); //得结束得到日期时间对象的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
        });
    });

    /*
    * 基本信息保存
    */
    function addEssentialInfo() {
        var ii = layer.load();
        var laypage = layui.laypage;
        layer.confirm('确定要保存吗?', {icon: 3, title:'提示'}, function(index){
            // var work_experience = [];
            var arr_work_experience=new Array();
            $(".workexperience").each(function() {
                var o1=new Object();
                var $this = $(this);
                o1.corpName=$this.find('input[name=corpName]').val();
                o1.post =$this.find('input[name=post]').val();
                o1.department = $this.find('input[name=department]').val();
                o1.industry = $this.find('input[name=industry]').val();
                o1.workDesc = $this.find('input[name=workDesc]').val();
                o1.workStartDate = $this.find('input[name=startDate]').val();
                o1.workEndDate = $this.find('input[name=endDate]').val();
                o1.id = $this.find('input[name=workexperience_id]').val();
                arr_work_experience.push(o1)
            });

            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                id : getUrlParam('id'),
                realName : $("#realName").val(),
                sex : $('input[name="sex"]:checked').val(),
                birthDate : $("#birthDate").val(),
                mobile : $("#mobile").val(),
                email : $("#email").val(),
                address : $("#address").val(),
                expectSalary :$("#expectSalary").val(),
                expectPost : $("#expectPost").val(),
                workRegion : $("#workRegion").val(),
                workType : $('#workType option:selected').val(),
                educationStartDate : $("#educationStartDate").val(),
                educationEndDate : $("#educationEndDate").val(),
                schoolName : $("#schoolName").val(),
                degree : $('#degree option:selected').val(),
                major : $("#major").val(),
                majorDesc : $("#majorDesc").val(),
                workeExperience : arr_work_experience
                /*educationStartDate : educationstartDate,
                educationEndDate : educationendDate*/

            }
            /*console(param);*/
            accessPost(baseu+ '/center/addEssentialInfo', JSON.stringify(param), function (res) {
                console.log('res: ', res);
                var message = responseMessageMaker(res, "${ctx}");
                layer.msg(message, {
                    icon: 1,
                    time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                }, function(){
                    layer.closeAll();
                });
            });
            layer.closeAll();
            layer.close(index);
        });
    }
    //新增工作经验
    function addwork(){
        var index = $("#aaa").val()+1;
        $("#aaa").val(index);
        $("#workexperience").append(
            '<div class = "workexperience">' +
            '    <div class="layui-form-item"><label class="layui-form-label">时间</label>'  +
            '       <div class="layui-input-block" style="width: 20%"><input type="text" class="layui-input workDate" id="workDate'+index+'"  placeholder="请选择日期范围">' +
            '      </div></div>' +
            '    <div class="layui-form-item"><label class="layui-form-label">公司</label>' +
            '    <div class="layui-input-inline"><input type="text" name="corpName" placeholder="" autocomplete="on" class="layui-input" value="">' +
            '    </div></div>' +
            '    <div class="layui-form-item"><label class="layui-form-label">职位</label>' +
            '<div class="layui-input-inline"><input type="text" name="post" placeholder="" autocomplete="on" class="layui-input" value="">' +
            '</div></div>' +
            '    <div class="layui-form-item"><label class="layui-form-label">部门</label>' +
            '    <div class="layui-input-inline"><input type="text" name="department" placeholder="" autocomplete="on" class="layui-input" value="">' +
            '    </div></div>' +
            '    <div class="layui-form-item"><label class="layui-form-label">行业</label>' +
            '<div class="layui-input-inline"><input type="text" name="industry" placeholder="" autocomplete="on" class="layui-input" value="">' +
            '</div></div>' +
            '<div class="layui-form-item"><label class="layui-form-label">工作描述</label>' +
            '<div class="layui-input-inline"><input type="text" name="workDesc" placeholder="" autocomplete="on" class="layui-input" value="">' +
            '</div></div>' +

            ' <div><input type="hidden" id="a'+index+'" name="startDate" placeholder="" autocomplete="on" class="layui-input ceshiStartdata" value=""></div>'+
            ' <div><input type="hidden" id="b'+index+'" name="endDate" placeholder="" autocomplete="on" class="layui-input ceshiEnddata" value=""></div>'+
            '</div>');

        //日期选
        var startDate = ''
        var endDate = ''
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            //执行一个laydate实例
            laydate.render({
                elem: '#workDate'+index //指定元素
                ,range: '~'
                ,done: function(value){
                    var range = value.split('~');
                    startDate = range[0].trim()
                    endDate = range[1].trim()
                    $("#a"+index).val(startDate);
                    $("#b"+index).val(endDate);
                    console.log('workstartDate',startDate); //：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                    console.log('workenddate',endDate); //得结束得到日期时间对象的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                }
            });
        });
    }
    //编辑简历
    var id = getUrlParam('id');
    if (id) {
        //显示位置
        $("#Addresume").hide();

        var ii = layer.load();
        //详情显示
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            id: id
        }
        console.log('param', param);
        accessPost(baseu+ '/center/resume', JSON.stringify(param), function (res) {
            layer.closeAll('loading');
            console.log(res);
            $('input[name="realName"]').val(res.realName);
            // $('input[type=radio][name=sex][value="' + res.sex + '"]').attr('checked', true);
            if (res.sex == '1') {//重要标志
                $('input[title="男"]').next('div').click();
            } else {
                $('input[title="女"]').next('div').click();
            }
            $('input[name="birthDate"]').val(formatDate(res.birthDate, 'yyyy-MM-dd'));
            $('input[name="mobile"]').val(res.mobile);
            $('input[name="email"]').val(res.email);
            $('input[name="address"]').val(res.address);
            $('input[name="expectSalary"]').val(res.expectSalary);
            $('input[name="expectPost"]').val(res.expectPost);
            $('input[name="workRegion"]').val(res.workRegion);
            $('#workType').find("dd[lay-value='"+res.workType+"']").addClass(layui-this);
            $('#rangeDate').val(formatDate(res.educationStartDate, 'yyyy-MM-dd') +'~'+ formatDate(res.educationEndDate, 'yyyy-MM-dd'));
            $('#educationStartDate').val(formatDate(res.educationStartDate, 'yyyy-MM-dd'));
            $('#educationEndDate').val(formatDate(res.educationEndDate, 'yyyy-MM-dd'));
            $('input[name="schoolName"]').val(res.schoolName);
            $('input[name="degree"]').find("option[value='"+res.degree+"']").attr("selected",true);
            $('input[name="major"]').val(res.major);
            $('input[name="majorDesc"]').val(res.majorDesc);
            if(res.data.length>0){
                $("#workexperience").html('');
            }
            for(var i = 0; i < res.data.length; i++){
                var index = $("#aaa").val()+1;
                $("#aaa").val(index);
                $("#workexperience").append(
                    '<div class = "workexperience">' +
                    '    <div class="layui-form-item"><label class="layui-form-label">时间</label>'  +
                    '       <div class="layui-input-block" style="width: 20%"><input type="text" class="layui-input workDate" id="workDate'+index+'"  placeholder="请选择日期范围" value="'+formatDate(res.data[i].workStartDate, 'yyyy-MM-dd') + '~' + formatDate(res.data[i].workEndDate, 'yyyy-MM-dd')+'">' +
                    '      </div></div>' +
                    '    <div class="layui-form-item"><label class="layui-form-label">公司</label>' +
                    '    <div class="layui-input-inline"><input type="text" name="corpName" placeholder="" autocomplete="on" class="layui-input" value="'+res.data[i].corpName+'">' +
                    '    </div></div>' +
                    '    <div class="layui-form-item"><label class="layui-form-label">职位</label>' +
                    '<div class="layui-input-inline"><input type="text" name="post" placeholder="" autocomplete="on" class="layui-input" value="'+res.data[i].post+'">' +
                    '</div></div>' +
                    '    <div class="layui-form-item"><label class="layui-form-label">部门</label>' +
                    '    <div class="layui-input-inline"><input type="text" name="department" placeholder="" autocomplete="on" class="layui-input" value="'+res.data[i].department+'">' +
                    '    </div></div>' +
                    '    <div class="layui-form-item"><label class="layui-form-label">行业</label>' +
                    '<div class="layui-input-inline"><input type="text" name="industry" placeholder="" autocomplete="on" class="layui-input" value="'+res.data[i].industry+'">' +
                    '</div></div>' +
                    '<div class="layui-form-item"><label class="layui-form-label">工作描述</label>' +
                    '<div class="layui-input-inline"><input type="text" name="workDesc" placeholder="" autocomplete="on" class="layui-input" value="'+res.data[i].workDesc+'">' +
                    '</div></div>' +
                    //工作经验表id
                    '<div class="layui-input-inline"><input type="hidden" name="workexperience_id" value="'+res.data[i].id+'">' +
                    ' <div><input type="hidden" id="a'+index+'" name="startDate" placeholder="" autocomplete="on" class="layui-input ceshiStartdata" value="'+formatDate(res.data[i].workStartDate, 'yyyy-MM-dd')+'"></div>'+
                    ' <div><input type="hidden" id="b'+index+'" name="endDate" placeholder="" autocomplete="on" class="layui-input ceshiEnddata" value="'+formatDate(res.data[i].workEndDate, 'yyyy-MM-dd')+'"></div>'+
                    '</div>');
                //日期选
                var startDate = ''
                var endDate = ''
                layui.use('laydate', function(){
                    var laydate = layui.laydate;
                    //执行一个laydate实例
                    laydate.render({
                        elem: '#workDate'+index //指定元素
                        ,range: '~'
                        ,done: function(value){
                            var i = this.elem[0].id.substring(8);
                            var range = value.split('~');
                            startDate = range[0].trim()
                            endDate = range[1].trim()
                            $("#a"+i).val(startDate);
                            $("#b"+i).val(endDate);
                            console.log('workstartDate',startDate); //：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                            console.log('workenddate',endDate); //得结束得到日期时间对象的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                        }
                    });
                });
            }
        });
    }

    function display(id){

    }
</script>
<style>
    .site-demo-upload :hover {
        cursor: pointer;
    }
</style>
</html>

