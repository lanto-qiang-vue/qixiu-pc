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
        <div class="zhengwu_t">
            <span class="sp_zw">基本信息</span> <span class="sp_wz">您所在位置：
				<a href="${ctx}/center/userInfo">车主中心</a>> <span>基本信息</span></span>
        </div>
        <%--主体代码--%>
        <div class="user-info">
            <form class="layui-form layui-form-pane">
                <div class="layui-form-item">
                    <label class="layui-form-label">用户帐号</label>
                    <div class="layui-input-inline userid" style="padding:10px;border: 1px dashed #e6e6e6;">
                        ${model.telphone }
                    </div>
                    <!--  <div class="layui-form-mid layui-word-aux">请填写6到12位密码</div>-->
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">用户昵称</label>
                    <div class="layui-input-inline">
                        <input type="text" id="userName" name="userName" placeholder="请输入昵称" autocomplete="on"
                               class="layui-input" value="">
                    </div>
                    <div class="layui-form-mid layui-word-aux">请输入昵称</div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">电子邮箱</label>
                    <div class="layui-input-inline">
                        <input type="text" name="email" placeholder="请输入电子邮箱" autocomplete="on"
                               id="email" class="layui-input" value="">
                    </div>
                    <div class="layui-form-mid layui-word-aux">请使用常用邮箱</div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn layui-btn-normal" lay-submit="" lay-filter="userinfosubmit"
                                id="submitBtn"><i class="layui-icon">&#xe642;</i> 确认修改
                        </button>
                    </div>
                </div>
            </form>
            <fieldset class="layui-elem-field layui-field-title"
                      style="margin-top: 50px;">
                <legend>上传头像</legend>
            </fieldset>

            <div class="site-demo-upload" onclick="uploadImage()">
                <%--<img id="userpicture" src="${ctx}/attach/${model.photo }">--%>
                <img id="userpicture" src="${btx}/images/defaultUser.jpg">
                <div class="site-demo-upbar">
                    <input type="file" name="file" lay-title="选择头像"
                           class="layui-upload-file" id="test">
                </div>
            </div>

            <blockquote class="layui-elem-quote layui-elem-quote-normal" style="margin-top:10px;">
                图片文件小于1M（建议使用高质量图片,仅支持jpg、png）
            </blockquote>
        </div>
        <%--主体代码--%>

        <div class="layui-form-item layui-form-text" style="display: none">
            <div class="layui-input-block">
                <button type="button" class="layui-btn layui-btn-normal notify-button notify-button-a"
                        id="upload">
                    <i class="layui-icon">&#xe67c;</i> 添加图片
                </button>
                <span>（仅支持jpg、png）</span>
            </div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
    $('#email').val(userInfo.email);
    $('#userName').val(userInfo.nickname);
    $('#userpicture').attr('src', userInfo.photo || '${btx}/images/defaultUser.jpg');

    var filePath = '';
    $(function () {
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
    })
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


    $(function () {
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
//                        filePath = res.data.picPath.replace("https","http");

//                        layer.msg(res.status);
                        changeAvatar(filePath)
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

    });
    
    function changeAvatar(avatarpath) {
        var param = {
            avatarpath: avatarpath,
            accessToken: localStorage.getItem('ACCESSTOKEN')
        };
        simplePost(baseu + '/center/photo', JSON.stringify(param), function (res) {
            if (res.code === '000000') {
                layer.msg('修改成功');
                var userinfo = JSON.parse(localStorage.getItem("USERINFO"))
                userinfo.photo = avatarpath;
                localStorage.setItem("USERINFO",JSON.stringify(userinfo));

                $('#userpicture').attr('src', avatarpath);
            } else {
                layer.msg(res.status);
            }
        })
    }

    function uploadImage() {
        $('#upload').click();
    }
</script>
<style>
    .site-demo-upload :hover {
        cursor: pointer;
    }
</style>
</html>
