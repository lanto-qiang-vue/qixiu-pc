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
            <span class="wenti">企业员工基本信息</span>
            <button id="editButton" class="layui-btn layui-btn-normal" style="float:right;margin-top: 6px;"
                    onclick="editInfo()">编辑
            </button>
        </div>
        <div class="examine" style="position: relative">
            <form class="layui-form layui-form-pane" action="" style="margin-top: 15px;">
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>姓名</label>
                    <div class="layui-input-block">
                        <input type="text" name="name" required lay-verify="required" placeholder="请输入姓名"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>性别</label>
                    <div class="layui-input-block">
                        <input type="radio" name="gender" value="1" title="男" checked class="view-mode">
                        <input type="radio" name="gender" value="2" title="女" class="view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>学历</label>
                    <div class="layui-input-inline" style="width: 216px">
                        <select lay-filter="education" id="education" name="education" lay-verify="required"
                                class="view-mode">
                            <option value="">请选择</option>
                            <option value="1">小学</option>
                            <option value="2">初中</option>
                            <option value="3">高中</option>

                            <option value="7">技校</option>
                            <option value="8">中专</option>
                            <option value="9">高职</option>

                            <option value="4">大专</option>
                            <option value="5">本科</option>
                            <option value="6">硕士</option>
                            <option value="10">博士</option>
                        </select>
                    </div>
                    <div class="layui-input-inline" style="width: 217px; float: right;margin-right: 0px" id="major">

                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>是否在岗</label>
                    <div class="layui-input-block">
                        <input type="radio" name="isonduty" value="true" title="是" checked class="view-mode">
                        <input type="radio" name="isonduty" value="false" title="否" disabled class="view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>岗位</label>
                    <div class="layui-input-block static-width-radio" id="position">
                        <input type="radio" name="position" lay-filter="position" value="1" title="技术负责人" checked
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="2" title="质量检验员"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="3" title="汽车维修机工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="4" title="汽车维修电工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="5" title="汽车维修钣金工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="6" title="汽车维修漆工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="7" title="焊工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="8" title="轮胎维修工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="9" title="气缸镗磨工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="10" title="曲轴修磨工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="11" title="汽车美容装潢工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="12" title="摩托车修理工"
                               class="view-mode">
                        <input type="radio" name="position" lay-filter="position" value="13" title="车身清洁工"
                               class="view-mode">
                    </div>
                </div>

                <div id="staffDriveCar">
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">职称</label>
                    <div class="layui-input-inline">
                        <input type="text" name="professionaltitle" placeholder="请输入职称"
                               autocomplete="off" class="layui-input view-mode">
                    </div>
                    <div class="layui-form-mid layui-word-aux">填写专业技术职务，例如助理工程师，工程师，高级工程师等</div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">荣誉称号</label>
                    <div class="layui-input-block">
                        <input lay-filter="honor" type="checkbox" name="honor[nationalhonor]" title="国家级">
                        <input type="text" name="nationalhonor" disabled placeholder="请输入" required autocomplete="off"
                               class="layui-input view-mode" style="width: 86%;float: right;">
                    </div>
                    <div class="layui-input-block">
                        <input lay-filter="honor" type="checkbox" name="honor[provincialhonor]" title="省市级">
                        <input type="text" name="provincialhonor" disabled placeholder="请输入" required autocomplete="off"
                               class="layui-input view-mode" style="width: 86%;float: right;">
                    </div>
                    <div class="layui-input-block">
                        <input lay-filter="honor" type="checkbox" name="honor[districthonor]" title="区级">
                        <input type="text" name="districthonor" disabled placeholder="请输入" required autocomplete="off"
                               class="layui-input view-mode" style="width: 86%;float: right;">
                    </div>
                    <div class="layui-input-block">
                        <input lay-filter="honor" type="checkbox" name="honor[industrylevelhonor]" title="产业级">
                        <input type="text" name="industrylevelhonor" disabled placeholder="请输入" required
                               autocomplete="off"
                               class="layui-input view-mode" style="width: 86%;float: right;">
                    </div>
                    <div class="layui-input-block">
                        <input lay-filter="honor" type="checkbox" name="honor[otherhonor]" title="其他">
                        <input type="text" name="otherhonor" disabled placeholder="请输入" autocomplete="off" required
                               class="layui-input view-mode" style="width: 86%;float: right;">
                    </div>
                </div>

                <hr class="layui-bg-red">
                <div class="layui-form-item">
                    <label class="layui-form-label">职业资格证书</label>
                    <div class="layui-input-block">
                        <div class="layui-btn layui-btn-normal view-mode" onclick="addNVQ()">新增证书</div>
                    </div>
                </div>
                <div class="layui-tab layui-tab-card" lay-allowClose="true"
                     lay-filter="vocationalQualificationCertificate">
                    <ul class="layui-tab-title">
                    </ul>
                    <div class="layui-tab-content">
                    </div>
                </div>

                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo" view-mode>立即提交</button>
                    </div>
                </div>

                <!-- 上传证件照 -->
                <div class="common-upload">
                    <div>
                        <div class="site-demo-upload view-mode" onclick="uploadImage()" style="cursor: pointer">
                            <img id="userpicture" src="${btx}/images/defaultUser.jpg" file-name="" title="证件照">
                            <div class="site-demo-upbar">
                                <input type="file" name="file" lay-title="选择头像"
                                       class="layui-upload-file" id="test">
                            </div>
                        </div>
                        <div id="userpicturelabel" style="margin-top:10px;height:36px;text-align: center;font-size: 14px;border: 1px solid #e6e6e6;border-radius: 2px 0 0 2px;text-align: center;background-color: #FBFBFB;"><span style="line-height: 36px;">证件照</span></div>
                        <blockquote class="layui-elem-quote" style="margin-top:10px;">
                            图片文件小于1M（建议使用高质量图片,仅支持jpg、png、jpeg）
                        </blockquote>
                    </div>
                </div>
            </form>
            <div class="layui-form-item layui-form-text" style="display: none">
                <div class="layui-input-block">
                    <button type="button" class="layui-btn layui-btn-normal notify-button notify-button-a"
                            id="upload">
                        <i class="layui-icon">&#xe67c;</i> 添加图片
                    </button>
                    <span>（仅支持jpg、png）</span>
                </div>
            </div>

            <div class="box"></div>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>

<script type="text/javascript">

    // 新增
    var uploadUrl = baseu;
    var tabIndex = []; // 记录tab下标
    var isAdd = true; // 是都是新增
    if (getUrlParam('id')) {
        isAdd = false;
    } else {
        $('.box').hide();
        $('#editButton').hide();
    }

    function initTemp(id) {
        var temp = '<div class="layui-tab-item layui-show">' +
            '<div class="layui-form layui-form-pane" style="margin-top: 15px;">' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label"><span class="require-icon">*</span>职业(工种)</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="trade' + id + '" required lay-verify="required" placeholder="请输入职业(工种)" autocomplete="off" class="layui-input view-mode">' +
            '</div>' +
            '</div>' +
            '<div class="layui-form-item" pane>' +
            '<label class="layui-form-label"><span class="require-icon">*</span>职业等级</label>' +
            '<div class="layui-input-block static-width-radio">' +
            '<input type="radio" name="level' + id + '" value="1" title="五级/初级" checked class="view-mode">' +
            '<input type="radio" name="level' + id + '" value="2" title="四级/中级" class="view-mode">' +
            '<input type="radio" name="level' + id + '" value="3" title="三级/高级" class="view-mode">' +
            '<input type="radio" name="level' + id + '" value="4" title="二级/技师" class="view-mode">' +
            '<input type="radio" name="level' + id + '" value="5" title="一级/高级技师" class="view-mode">' +
            '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label"><span class="require-icon">*</span>证书编号</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="certcode' + id + '" required lay-verify="required" placeholder="请输入证书编号" autocomplete="off" class="layui-input view-mode">' +
            '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label"><span class="require-icon">*</span>发证日期</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="issuedate' + id + '" required lay-verify="required" class="layui-input view-mode" id="dateInput' + id + '">' +
            '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label"><span class="require-icon">*</span>鉴定机构</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="issuingauthority' + id + '" required lay-verify="required" placeholder="请输入技能鉴定机构" autocomplete="off" class="layui-input view-mode">' +
            '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<label class="layui-form-label"><span class="require-icon">*</span>证书上传</label>' +
            '<div class="layui-input-block">' +
            '<div class="layui-upload">' +
            '<button type="button" class="layui-btn view-mode" id="upload' + id + '">上传图片</button>' +
            '<blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">' +
            '预览图：' +
            '<div class="layui-upload-list" id="uploadPreview' + id + '"></div>' +
            '</blockquote>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return temp;
    };

    function checkBoxUse(data, filter) {
        if (data.elem.checked) {
            $('input[name=' + filter + ']').removeAttr('disabled');
            $('input[name=' + filter + ']').attr('lay-verify', 'required');
        } else {
            $('input[name=' + filter + ']').attr('disabled', 'true');
            $('input[name=' + filter + ']').removeAttr('lay-verify');
        }
    }

    function init() {
        layui.use(['form', 'laydate', 'upload', 'element'], function () {

            var laydate = layui.laydate;
            //执行一个laydate实例
            laydate.render({
                elem: '#dateInput1' //指定元素
            });

            var upload = layui.upload;

            //执行实例
            var uploadInst = upload.render({
                elem: '#upload' //绑定元素
                , url: uploadUrl + '/image/hr/add/' + localStorage.getItem('ACCESSTOKEN') //上传接口
                , accept: 'images'
                , exts: 'jpg|png|jpeg'
                , size: 1024
                , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                    layer.load(); //上传loading
                }
                , done: function (res) {

                    //上传完毕回调
                    if (res.code == '000000') {
                        $('#userpicture').attr('src', res.data.picPath);
                        $('#userpicture').attr('file-name', res.data.picFilePath);
                        $('#userpicture').removeAttr('image-id');
                        $('#userpicturelabel').removeClass("shouldInput");
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

            // tab
            element = layui.element;
            //一些事件监听
            element.on('tab(vocationalQualificationCertificate)', function (data) {
                console.log(data);
            });

            element.on('tabDelete(vocationalQualificationCertificate)', function (data) {
                console.log(data); //当前Tab标题所在的原始DOM元素
                console.log(data.index); //得到当前Tab的所在下标
                console.log(data.elem); //得到当前的Tab大容器

                tabIndex.splice(data.index, 1);
            });

            element.render();

            var form = layui.form;

            form.render();

            // 监听提交
            form.on('submit(formDemo)', function (data) {
                //layer.msg(JSON.stringify(data.field));
                layer.load();
                var data = data.field;
                var param = {
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    districthonor: data.districthonor,
                    drivecartype: data.drivecartype,
                    education: data.education,
                    gender: data.gender,
                    industrylevelhonor: data.industrylevelhonor,
                    isonduty: data.isonduty,
                    major: data.major,
                    name: data.name,
                    nationalhonor: data.nationalhonor,
                    otherhonor: data.otherhonor,
                    position: data.position,
                    professionaltitle: data.professionaltitle,
                    provincialhonor: data.provincialhonor,
                    staffCertList: [],
                    staffDriveCarImgList: [],
                    staffImageList: []
                };

                var staffCertList = []; // 证书
                var staffCertNum = $('div[lay-filter=vocationalQualificationCertificate] li').length;
                for (var i in tabIndex) {
                    var id = tabIndex[i];
                    var certid = $('input[name="trade' + id + '"]').attr('certid');
                    var item = {
                        certid: certid == undefined ? 0 : parseInt(certid),
                        certcode: data['certcode' + id],
                        certname: '',
                        issuedate: data['issuedate' + id],
                        issuingauthority: data['issuingauthority' + id],
                        level: data['level' + id],
                        staffCertImageList: [],
                        trade: data['trade' + id]
                    }
                    var staffCertImageList = [];
                    var picList = $('#uploadPreview' + id + ' img');
                    for (var j = 0; j < picList.length; j++) {
                        console.log('picList[j].attributes["file-name"]: ', picList[j].attributes["file-name"]);
                        staffCertImageList.push({
                            imageid: picList[j].attributes["image-id"] == undefined ? 0 : parseInt(picList[j].attributes["image-id"].nodeValue),
                            title: '',
                            type: 3,
                            url: picList[j].attributes["file-name"] ? picList[j].attributes["file-name"].nodeValue : ''
//                            url: picList[j].src
                        });
                    }
                    item.staffCertImageList = staffCertImageList;
                    staffCertList.push(item);
                }

                var staffDriveCarImgList = []; // 驾驶证图片
                var dcPic = $('#staffDriveCarImgList img');
                console.log('dcPic: ', dcPic);
                for (var m = 0; m < dcPic.length; m++) {
                    staffDriveCarImgList.push({
                        imageid: dcPic[m].attributes["image-id"] == undefined ? 0 : parseInt(dcPic[m].attributes["image-id"].nodeValue),
                        title: '',
                        type: 2,
                        url: dcPic[m].attributes["file-name"] ? dcPic[m].attributes["file-name"].nodeValue : ''
//                        url: dcPic[m].src
                    });
                }

                var staffImageList = []
                if ($('#userpicture').attr('src').indexOf('/images/defaultUser.jpg') < 0 && $('#userpicture').attr('src') != "data:image/jpg;base64,null") {
                    staffImageList = [{
                        imageid: $('#userpicture').attr('image-id') == undefined ? 0 : parseInt($('#userpicture').attr('image-id')),
                        title: '',
                        type: 1,
                        url: $('#userpicture').attr('file-name')
//                        url: $('#userpicture').attr('src')
                    }]; // 员工证件图片
                } else {
                    staffImageList = [];
                }

                param.staffCertList = staffCertList;
                param.staffDriveCarImgList = staffDriveCarImgList;
                param.staffImageList = staffImageList;

//                if (param.staffImageList.length < 1) {
//                    $('#userpicturelabel').addClass("shouldInput");
//                    layer.msg("请上传证件照", {time: 3000, icon: 5});
//                    layer.closeAll('loading');
//                    return false;
//                } else {
//                    $('#userpicturelabel').removeClass("shouldInput");
//                }

                if (param.position == '2' && param.staffDriveCarImgList.length < 1) {
                    layer.msg("请上传驾驶证照片", {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }

                if (param.position == '13') {

                } else {
                    if (param.staffCertList.length < 1) {
                        layer.msg("请填写证书信息", {time: 3000, icon: 5});
                        layer.closeAll('loading');
                        return false;
                    }
                }

                for (var k = 0; k < param.staffCertList.length; k++) {
                    if (param.staffCertList[k].staffCertImageList.length < 1) {
                        layer.msg("请上传证书照片", {time: 3000, icon: 5});
                        layer.closeAll('loading');
                        return false;
                    }
                }

                if (getUrlParam('id')) {
                    param.id = getUrlParam('id');
                    accessPost(baseu + '/staff/update/' + getUrlParam('id'), JSON.stringify(param), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = 'companyEmployeeList';
                        }
                    });
                } else {
                    accessPost(baseu + '/staff/add', JSON.stringify(param), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = 'companyEmployeeList';
                        }
                    });
                }

                return false;
            });

            // 监听学历下拉选,控制输入框显示或隐藏
            form.on('select(education)', function (data) {
                if (data.value == '4' || data.value == '5' || data.value == '6') {
                    var content = '<input type="text" name="major" required  lay-verify="required" placeholder="请输入专业信息" autocomplete="off" class="layui-input view-mode">';
                    $('#major').html(content);
                } else {
                    $('#major input').remove();
                }
            });

            // 监听岗位radio, 控制驾驶证上传的显示或隐藏
            form.on('radio(position)', function (data) {
                console.log(data.value); //被点击的radio的value值
                if (data.value == '2' && isAdd) {
                    if ($('#staffDriveCar').children().length == 0) {
                        var content = '<div class="layui-form-item">' +
                            '<label class="layui-form-label"><span class="require-icon">*</span>驾驶证上传</label>' +
                            '<div class="layui-input-block">' +
                            '<div class="layui-upload">' +
                            '<button type="button" class="layui-btn view-mode" id="staffDriveCarImg">上传图片</button>' +
                            '<blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">' +
                            '预览图：' +
                            '<div class="layui-upload-list" id="staffDriveCarImgList"></div>' +
                            '</blockquote>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="layui-form-item">' +
                            '<label class="layui-form-label"><span class="require-icon">*</span>准驾车型</label>' +
                            '<div class="layui-input-block">' +
                            '<select name="drivecartype" lay-verify="required" class="view-mode">' +
                            '<option value="">请选择</option>' +
                            '<option value="A1">A1</option>' +
                            '<option value="A2">A2</option>' +
                            '<option value="A3">A3</option>' +
                            '<option value="B1">B1</option>' +
                            '<option value="B2">B2</option>' +
                            '<option value="C1">C1</option>' +
                            '<option value="C2">C2</option>' +
                            '<option value="C3">C3</option>' +
                            '<option value="C4">C4</option>' +
                            '</select>' +
                            '</div>' +
                            '</div>';
                        $('#staffDriveCar').html(content);

                        var upload = layui.upload;
                        //执行实例 驾驶证图片上传
                        var uploadInst = upload.render({
                            elem: '#staffDriveCarImg' //绑定元素
                            , url: uploadUrl + '/image/hr/add/' + localStorage.getItem('ACCESSTOKEN') //上传接口
                            , accept: 'images'
                            , exts: 'jpg|png|jpeg'
                            , size: 1024
                            , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                                layer.load(); //上传loading
                            }
                            , done: function (res) {

                                //上传完毕回调
                                if (res.code == '000000') {
                                    var imgHtml = '<div style="display: inline-block;margin-right: 10px" id="image' + res.data.picId + '"><img data-action="zoom" src="' + res.data.picPath + '" class="layui-upload-img" file-name="' + res.data.picFilePath + '"><div class="view-mode" onclick="removeThisPic(' + res.data.picId + ')" style="text-align: center; color: #01AAED;cursor: pointer">移除</div></div>';
                                    $('#staffDriveCarImgList').append(imgHtml);
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

                        var form = layui.form;
                        form.render();
                    }
                } else {
                    $('#staffDriveCar div').remove();
                }
            });

            // 监听荣誉称号
            form.on('checkbox(honor)', function (data) {
                if (data.elem.title == '国家级') {
                    checkBoxUse(data, 'nationalhonor');
                }
                ;
                if (data.elem.title == '省市级') {
                    checkBoxUse(data, 'provincialhonor');
                }
                ;
                if (data.elem.title == '区级') {
                    checkBoxUse(data, 'districthonor');
                }
                ;
                if (data.elem.title == '产业级') {
                    checkBoxUse(data, 'industrylevelhonor');
                }
                ;
                if (data.elem.title == '其他') {
                    checkBoxUse(data, 'otherhonor');
                }
            });
        });
    };

    // 预览图: 移除图片
    function removeThisPic(id) {
        layer.confirm('确认移除?', function (index) {
            //do something
            $('#image' + id).remove();
            layer.close(index);
        });
    }

    init();

    // 初始化页面数据(详情)
    function initData() {
        var id = getUrlParam('id');
        if (id) {
            layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                staffId: id
            }
            accessPost(baseu + '/staff/detail/' + id, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.closeAll('loading');
                var data = res.data;
                if (data != null) {
                    $('input[name="name"]').val(data.name); // 姓名
                    if (data.gender == '1') { // 性别
                        $('input[title="男"]').next('div').click();
                    } else {
                        $('input[title="女"]').next('div').click();
                    }

                    $('#education').next('div').find('dd[lay-value=' + data.education + ']').click(); //学历
                    $('input[name="major"]').val(data.major);

                    $('#position').find('input[value=' + data.position + ']').next('div').click(); // 岗位

                    // 驾驶证图片
                    if (data.position == '2') {
                        var imgHtml = '';
                        for (var i = 0; i < data.staffDriveCarImgList.length; i++) {
                            imgHtml += '<div style="display: inline-block;margin-right: 10px" id="image' + data.staffDriveCarImgList[i].imageid + '"><img data-action="zoom" image-id=' + data.staffDriveCarImgList[i].imageid + ' src="' + data.staffDriveCarImgList[i].url + '" class="layui-upload-img" file-name=""><div class="view-mode" onclick="removeThisPic(' + data.staffDriveCarImgList[i].imageid + ')" style="text-align: center; color: #01AAED;cursor: pointer">移除</div></div>';
                        }
                        var content = '<div class="layui-form-item">' +
                            '<label class="layui-form-label"><span class="require-icon">*</span>驾驶证上传</label>' +
                            '<div class="layui-input-block">' +
                            '<div class="layui-upload">' +
                            '<button type="button" class="layui-btn view-mode" id="staffDriveCarImg">上传图片</button>' +
                            '<blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">' +
                            '预览图：' +
                            '<div class="layui-upload-list" id="staffDriveCarImgList">' + imgHtml + '</div>' +
                            '</blockquote>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="layui-form-item">' +
                            '<label class="layui-form-label"><span class="require-icon">*</span>准驾车型</label>' +
                            '<div class="layui-input-block">' +
                            '<select name="drivecartype" lay-verify="required" class="view-mode">' +
                            '<option value="">请选择</option>' +
                            '<option value="A1">A1</option>' +
                            '<option value="A2">A2</option>' +
                            '<option value="A3">A3</option>' +
                            '<option value="B1">B1</option>' +
                            '<option value="B2">B2</option>' +
                            '<option value="C1">C1</option>' +
                            '<option value="C2">C2</option>' +
                            '<option value="C3">C3</option>' +
                            '<option value="C4">C4</option>' +
                            '</select>' +
                            '</div>' +
                            '</div>';
                        $('#staffDriveCar').html(content);
                        var form = layui.form;
                        form.render();

                        var upload = layui.upload;
                        //执行实例 驾驶证图片上传
                        var uploadInst = upload.render({
                            elem: '#staffDriveCarImg' //绑定元素
                            , url: uploadUrl + '/image/hr/add/' + localStorage.getItem('ACCESSTOKEN') //上传接口
                            , accept: 'images'
                            , exts: 'jpg|png|jpeg'
                            , size: 1024
                            , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                                layer.load(); //上传loading
                            }
                            , done: function (res) {

                                //上传完毕回调
                                if (res.code == '000000') {
                                    var imgHtml = '<div style="display: inline-block;margin-right: 10px" id="image' + res.data.picId + '"><img data-action="zoom" src="' + res.data.picPath + '" class="layui-upload-img" file-name="' + res.data.picFilePath + '"><div class="view-mode" onclick="removeThisPic(' + res.data.picId + ')" style="text-align: center; color: #01AAED;cursor: pointer">移除</div></div>';
                                    $('#staffDriveCarImgList').append(imgHtml);
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

                        $('select[name="drivecartype"]').next('div').find('dd[lay-value=' + data.drivecartype + ']').click(); //准驾车型
                    }

                    if (data.nationalhonor) {
                        $('[name="honor[nationalhonor]"]').next('div').click(); // 荣誉称号(国家级)
                        $('input[name="nationalhonor"]').val(data.nationalhonor);
                    }
                    if (data.provincialhonor) {
                        $('[name="honor[provincialhonor]"]').next('div').click(); // 荣誉称号(省市级)
                        $('input[name="provincialhonor"]').val(data.provincialhonor);
                    }
                    if (data.districthonor) {
                        $('[name="honor[districthonor]"]').next('div').click(); // 荣誉称号(区级)
                        $('input[name="districthonor"]').val(data.districthonor);
                    }
                    if (data.industrylevelhonor) {
                        $('[name="honor[industrylevelhonor]"]').next('div').click(); // 荣誉称号(产业级)
                        $('input[name="industrylevelhonor"]').val(data.industrylevelhonor);
                    }
                    if (data.otherhonor) {
                        $('[name="honor[otherhonor]"]').next('div').click(); // 荣誉称号(其他)
                        $('input[name="otherhonor"]').val(data.otherhonor);
                    }

                    $('#userpicture').attr('src', data.staffImageList.length > 0 ? data.staffImageList[0].url : "${btx}/images/defaultUser.jpg"); // 证件照
                    $('#userpicture').attr('image-id', data.staffImageList.length > 0 ? data.staffImageList[0].imageid : ''); // 证件照

                    $('input[name="professionaltitle"]').val(data.professionaltitle); // 职称

                    // 职业资格证书
                    for (var j = 0; j < data.staffCertList.length; j++) {
                        addNVQ();
                    }

                    for (var k = 0; k < tabIndex.length; k++) {
                        var id = tabIndex[k];
                        $('input[name="trade' + id + '"]').attr('certid', data.staffCertList[k].certid); // 证书id
                        $('input[name="trade' + id + '"]').val(data.staffCertList[k].trade); // 职业(工种)
                        $('input[name="level' + id + '"][value=' + data.staffCertList[k].level + ']').next('div').click(); // 职业等级
                        $('input[name="certcode' + id + '"]').val(data.staffCertList[k].certcode); // 证书编号
                        // 新增tab时初始化date组件
                        var laydate = layui.laydate;
                        //执行一个laydate实例
                        laydate.render({
                            elem: '#dateInput' + id,
                            value: data.staffCertList[k].issuedate //发证日期
                        });
                        $('input[name="issuingauthority' + id + '"]').val(data.staffCertList[k].issuingauthority); // 技能鉴定机构

                        var staffCertImageHtml = '';
                        for (var n = 0; n < data.staffCertList[k].staffCertImageList.length; n++) {
                            var param = data.staffCertList[k].staffCertImageList[n];
                            staffCertImageHtml += '<div style="display: inline-block;margin-right: 10px" id="image' + param.imageid + '"><img data-action="zoom"  image-id=' + param.imageid + ' src="' + param.url + '" class="layui-upload-img" file-name=""><div onclick="removeThisPic(' + param.imageid + ')" style="text-align: center; color: #01AAED;cursor: pointer">移除</div></div>';
                        }
                        $('#uploadPreview' + id).append(staffCertImageHtml); // 预览图
                    }

                    // 默认选中第一个tab
                    $('div[lay-filter="vocationalQualificationCertificate"]').find('li:first-child').click();

                    isAdd = true;
                } else {
                    layer.msg(res.status, {time: 2000, icon: 5});
                }
            })
        }
    }

    initData();

    function addNVQ() {
        var lastText = $('div[lay-filter="vocationalQualificationCertificate"] li:last').text();
        var length = parseInt(lastText.replace(/[^0-9]/ig, "") || 0);
        var id = length + 1;
        element.tabAdd('vocationalQualificationCertificate', {
            title: '证书' + id
            , content: initTemp(id)
            , id: 'NVQ' + id
        });

        element.render();

        tabIndex.push(id);

        // 新增tab时初始化date组件
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#dateInput' + id //指定元素
        });

        // 新增tab时初始化上传组件
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#upload' + id  //绑定元素
            , url: uploadUrl + '/image/hr/add/' + localStorage.getItem('ACCESSTOKEN') //上传接口
            , accept: 'images'
            , exts: 'jpg|png|jpeg'
            , size: 1024
            , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                layer.load(); //上传loading
            }
            , done: function (res) {
                //上传完毕回调
                if (res.code == '000000') {
                    var imgHtml = '<div style="display: inline-block;margin-right: 10px" id="image' + res.data.picId + '"><img data-action="zoom" src="' + res.data.picPath + '" class="layui-upload-img" file-name="' + res.data.picFilePath + '"><div class="view-mode" onclick="removeThisPic(' + res.data.picId + ')" style="text-align: center; color: #01AAED;cursor: pointer">移除</div></div>';
                    $('#uploadPreview' + id).append(imgHtml);
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

        //init();

        var form = layui.form;
        form.render();

        $('div[lay-filter="vocationalQualificationCertificate"]').find('li[lay-id="NVQ' + id + '"]').click();
    }

    $(function () {
//        var form = layui.form;
//        form.render();
    });

    function uploadImage() {
        $('#upload').click();
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
</script>
<style>
    .common-input60 {
        width: 60%;
    }

    .common-upload {
        position: absolute;
        right: 10px;
        top: 15px;
        width: 35%;
    }

    .site-demo-upload {
        margin: 0 auto;
    }

    .static-width-radio .layui-form-radio {
        width: 170px;
    }

    .layui-upload-img {
        height: 92px;
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

    .shouldInput {
        border: 1px solid red !important;
    }

    .require-icon {
        margin-right: 5px;
        color: red;
    }
</style>
</html>
<script src="${btx}/js/zooming.js"></script>