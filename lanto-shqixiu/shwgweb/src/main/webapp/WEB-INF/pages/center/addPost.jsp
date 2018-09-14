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
            <span class="wenti">岗位管理</span>
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
                    <label class="layui-form-label"><span class="require-icon">*</span>岗位名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="postName"  placeholder="请输入岗位名称" maxlength="100" required  lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>岗位编号</label>
                    <div class="layui-input-block">
                        <input type="text" name="postNo"  placeholder="请输入岗位编号" maxlength="100" required  lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>上班地址</label>
                    <div class="layui-input-block">
                        <input type="text" name="address"  placeholder="请输入上班地址" maxlength="255" required  lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>岗位职能</label>
                    <div class="layui-input-block">
                        <div id="category" class="layui-input-inline search_select hoverlist1"
                             style="width: 190px; margin-right: 3px;" data-value=""
                             data-type="category">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="请选择岗位职能" value="" readonly=""
                                           class="layui-input layui-unselect" id="postType" required>
                                    <i class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>实习职位</span>
                                    </dd>
                                    <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>社会职位</span>
                                    </dd>
                                    <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>基层职位</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>招聘人数</label>
                    <div class="layui-input-block">
                        <input type="text" name="recruitNum"  placeholder="请输入招聘人数（0表示若干）" maxlength="11" required  lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>工作性质</label>
                    <div class="layui-input-block" >
                        <input type="radio" name="workProperty" value="1" title="全职" checked class="view-mode">
                        <input type="radio" name="workProperty" value="2" title="兼职" class="view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>薪资类型</label>
                    <div class="layui-input-block">
                        <div id="categorys" class="layui-input-inline search_select hoverlist2"
                             style="width: 190px; margin-right: 3px;" data-value=""
                             data-type="category">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="请选择薪资类型" value="" readonly=""
                                           class="layui-input layui-unselect" id="salaryType" required>
                                    <i class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>日薪</span>
                                    </dd>
                                    <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>月薪</span>
                                    </dd>
                                    <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>年薪</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>薪资范围</label>
                    <div class="layui-input-block">
                        <div id="categoryts" class="layui-input-inline search_select hoverlist3"
                             style="width: 190px; margin-right: 3px;" data-value=""
                             data-type="category">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="请选择薪资范围" value="" readonly=""
                                           class="layui-input layui-unselect" id="salary" required>
                                    <i class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>30-50</span>
                                    </dd>
                                    <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>60-80</span>
                                    </dd>
                                    <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>80-100</span>
                                    </dd>
                                    <dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>100以上</span>
                                    </dd>
                                    <dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>2000-3000</span>
                                    </dd>
                                    <dd data-value="6" class=""><i class="layui-icon">&#xe605;</i> <span>3000-4000</span>
                                    </dd>
                                    <dd data-value="7" class=""><i class="layui-icon">&#xe605;</i> <span>4000-5000</span>
                                    </dd>
                                    <dd data-value="8" class=""><i class="layui-icon">&#xe605;</i> <span>5000及以上</span>
                                    </dd>
                                    <dd data-value="9" class=""><i class="layui-icon">&#xe605;</i> <span>20000-40000</span>
                                    </dd>
                                    <dd data-value="10" class=""><i class="layui-icon">&#xe605;</i> <span>50000-80000</span>
                                    </dd>
                                    <dd data-value="11" class=""><i class="layui-icon">&#xe605;</i> <span>90000-110000</span>
                                    </dd>
                                    <dd data-value="12" class=""><i class="layui-icon">&#xe605;</i> <span>12万及以上</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>职位关键词</label>
                    <div class="layui-input-block">
                        <input type="text" name="keyword"  placeholder="请输入能代表职位的关键词;建议最多10个，每个词不超过6个中文或12个英文字母，关键词用空格隔开" maxlength="255" required  lay-verify="required"
                               autocomplete="off"
                               class="layui-input view-mode">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">工作年限</label>
                    <div class="layui-input-block">
                        <div id="categorytss" class="layui-input-inline search_select hoverlist4"
                             style="width: 190px; margin-right: 3px;" data-value=""
                             data-type="category">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="请选择工作年限" value="" readonly=""
                                           class="layui-input layui-unselect" id="workLife">
                                    <i class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>无工作经验</span>
                                    </dd>
                                    <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>1年</span>
                                    </dd>
                                    <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>2年</span>
                                    </dd>
                                    <dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>3年-4年</span>
                                    </dd>
                                    <dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>5年-7年</span>
                                    </dd>
                                    <dd data-value="6" class=""><i class="layui-icon">&#xe605;</i> <span>8年-9年</span>
                                    </dd>
                                    <dd data-value="7" class=""><i class="layui-icon">&#xe605;</i> <span>10年以上</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">最低学历</label>
                    <div class="layui-input-block">
                        <div id="categorytsr" class="layui-input-inline search_select hoverlist5"
                             style="width: 190px; margin-right: 3px;" data-value=""
                             data-type="category">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="请选择最低学历" value="" readonly=""
                                           class="layui-input layui-unselect" id="minEducation" >
                                    <i class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>初中及以下</span>
                                    </dd>
                                    <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>高中</span>
                                    </dd>
                                    <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>中专</span>
                                    </dd>
                                    <dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>中技</span>
                                    </dd>
                                    <dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>大专</span>
                                    </dd>
                                    <dd data-value="6" class=""><i class="layui-icon">&#xe605;</i> <span>本科</span>
                                    </dd>
                                    <dd data-value="7" class=""><i class="layui-icon">&#xe605;</i> <span>硕士</span>
                                    </dd>
                                    <dd data-value="8" class=""><i class="layui-icon">&#xe605;</i> <span>博士</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item common-input60" pane>
                    <label class="layui-form-label"><span class="require-icon">*</span>职位描述</label>
                    <div class="layui-input-block">
                         <textarea id="postDesc" name="postDesc" placeholder="请输入职位描述" maxlength="1024"
                                   class="layui-textarea view-mode" required ></textarea>

                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label">年龄</label>
                    <div class="layui-input-block">
                        <input type="text" name="minAge"  placeholder="请输入最小年龄"
                               autocomplete="off" maxlength="2"
                               class="layui-input view-mode" style="width: 190px; margin-right: 3px;">
                         <input type="text" name="maxAge"  placeholder="请输入最大年龄"
                                                     autocomplete="off" maxlength="3"
                                                     class="layui-input view-mode" style="width: 190px; margin-right: 3px;margin-top: 10px;">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>开始时间</label>
                        <div class="layui-input-block"  style="width: 190px; margin-right: 3px;">
                            <input type="text" name="beginTime" id="beginTime"
                                   autocomplete="off" class="layui-input"
                                   onclick="layui.laydate({elem: this})">
                    </div>
                </div>
                <div class="layui-form-item common-input60">
                    <label class="layui-form-label"><span class="require-icon">*</span>结束时间</label>
                    <div class="layui-input-block"  style="width: 190px; margin-right: 3px;">
                        <input type="text" name="endTime" id="endTime"
                               autocomplete="off" class="layui-input"
                               onclick="layui.laydate({elem: this})">
                    </div>
                </div>
                <input type="hidden" name="status"  id="status"  lay-verify="required"
                       autocomplete="off"
                       class="layui-input view-mode">
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo" onclick="changeStatus()" view-mode>保存</button>
                        <button class="layui-btn" lay-submit lay-filter="formDemo" onclick="changeStatust()" view-mode>立即发布</button>
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
            editIndex = layedit.build('postDesc',
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

            var form = layui.form;

            form.render();

            // 监听提交
            form.on('submit(formDemo)', function (data) {
                layer.load();
                var data = data.field;
                console.log('data',data);
                console.log('1111',layedit.getContent(editIndex));
                var postName=data.postName;
                var postNo=data.postNo;
                var address=data.address;
                var recruitNum=data.recruitNum;
                var keyword=data.keyword;
                var minAge=data.minAge;
                var maxAge=data.maxAge;
                var status=data.status;
                var beginTime=data.beginTime;
                var endTime=data.endTime;
                console.log(data.status);
                if(postName== '' || postName == null){
                    layer.msg('岗位名称不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(postNo== '' || postNo == null){
                    layer.msg('岗位编号不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(address== '' || address == null){
                    layer.msg('上班地址不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(($('.hoverlist1 .select-this').attr('data-value') || '')==''){
                    layer.msg('岗位职能不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(recruitNum== '' || recruitNum == null){
                    layer.msg('招聘人数不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(($('.hoverlist2 .select-this').attr('data-value') || '')==''){
                    layer.msg('薪资类型不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(($('.hoverlist3 .select-this').attr('data-value') || '')==''){
                    layer.msg('薪资范围不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(layedit.getContent(editIndex) == '' || layedit.getContent(editIndex) == null){
                    layer.msg('职位描述不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(beginTime== '' || beginTime == null){
                    layer.msg('开始时间不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                if(endTime== '' || endTime == null){
                    layer.msg('结束时间不能为空', {time: 3000, icon: 5});
                    layer.closeAll('loading');
                    return false;
                }
                var params ={
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    postName: data.postName,
                    postNo: data.postNo,
                    address: data.address,
                    keyword:data.keyword,
                    recruitNum: data.recruitNum,
                    workProperty: data.workProperty,
                    status: data.status,
                    minAge: data.minAge,
                    maxAge: data.maxAge,
                    postType: $('.hoverlist1 .select-this').attr('data-value') || '',
                    salaryType: $('.hoverlist2 .select-this').attr('data-value') || '',
                    salary: $('.hoverlist3 .select-this').attr('data-value') || '',
                    workLife: $('.hoverlist4 .select-this').attr('data-value') || '',
                    minEducation: $('.hoverlist5 .select-this').attr('data-value') || '',
                    postDesc: layedit.getContent(editIndex),
                    beginTime:data.beginTime,
                    endTime:data.endTime
                };
                if (getUrlParam('id')) {
                    params.id = getUrlParam('id');
                    console.log('params.id',params.id,getUrlParam('id'));
                    accessPost(baseu + '/center/companyPost/update/' + getUrlParam('id'), JSON.stringify(params), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = 'companyPost';
                        }
                    });
                } else {
                    accessPost(baseu + '/center/companyPost/add', JSON.stringify(params), function (res) {
                        handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                        layer.msg(res.status);
                        layer.closeAll('loading');
                        if (res.code == '000000') {
                            window.location.href = 'companyPost';
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
                id: id
            }
            accessPost(baseu + '/center/companyPost/detail/' + id, JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                layer.closeAll('loading');
                console.log('res',res)

                var data = res.data,postDesc='';
                postDesc=data.postDesc;
                if(data == null){
                    layer.msg(res.status, {time: 3000, icon: 5})
                    return false;
                }
                console.log('data',data)
                $('#category dd[data-value=' + data.postType + ']').click();//岗位职能
                $('#categorys dd[data-value=' + data.salaryType + ']').click();//薪资类型
                $('#categoryts dd[data-value=' + data.salary + ']').click();//薪资范围
                $('#categorytss dd[data-value=' + data.workLife + ']').click();//工作年限
                $('#categorytsr dd[data-value=' + data.minEducation + ']').click();//最低学历
                $('input[name="postName"]').val(data.postName); // 岗位名称
                $('input[name="postNo"]').val(data.postNo); // 岗位编号
                $('input[name="address"]').val(data.address); // 地址
                $('input[name="recruitNum"]').val(data.recruitNum); // 招聘人数
                $('input[name="keyword"]').val(data.keyword); // 关键词
                $('input[name="minAge"]').val(data.minAge); // 最小年龄
                $('input[name="maxAge"]').val(data.maxAge); // 最大年龄
                $('input[name="beginTime"]').val(formatDate(data.beginTime,'yyyy-MM-dd')); // 开始日期
                $('input[name="endTime"]').val(formatDate(data.endTime,'yyyy-MM-dd')); // 结束日期
                $('#postDesc').val(postDesc);//职位描述
                if (data.workProperty == '1') {//性别
                    $('input[title="全职"]').next('div').click();
                } else {
                    $('input[title="兼职"]').next('div').click();
                }

                editIndex = layedit.build('postDesc',
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
        window.location.href = 'companyPost';
    }
    function changeStatus(){
        $('#status').val(2);

    }
    function changeStatust(){
        $('#status').val(1);
    }
    $('.hoverlist1 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist1 dl dd').removeClass('select-this');
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
    $('.hoverlist2 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist2 dl dd').removeClass('select-this');
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
    $('.hoverlist3 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist3 dl dd').removeClass('select-this');
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
    $('.hoverlist5 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist5 dl dd').removeClass('select-this');
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
            elem: '#endTime' //指定元素
        });
    });
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#beginTime' //指定元素
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