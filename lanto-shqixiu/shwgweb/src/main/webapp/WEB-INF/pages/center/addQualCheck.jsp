<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <script src="${btx}/js/front/company/qualcheck.js"></script>
</head>

<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">质量信誉考核管理</span> <span class="sp_wz">您所在位置：<a href="#" onClick="javascript :history.go(-1);">质量信誉考核管理</a> > <span>新建考核内容</span></span>
        </div>
        <div class="biaoge" style="overflow: auto;margin-top: 20px">
            <form class="layui-form" action="" style="width: 800px;margin-top: 10px">
                <div class="layui-form-item">
                    <label class="layui-form-label">考核标题</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" required lay-verify="required" placeholder="请输入标题"
                               autocomplete="off" class="layui-input notify-detail-input">
                    </div>
                </div>

                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">考核描述</label>
                    <div class="layui-input-block">
                        <textarea id="description" name="description" placeholder="请输入内容"
                                  class="layui-textarea notify-detail-input" required></textarea>
                    </div>
                </div>

                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">上传附件</label>
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn layui-btn-normal notify-button notify-button-a"
                                id="upload">
                            <i class="layui-icon">&#xe67c;</i> 添加附件
                        </button>
                        <span>（仅支持txt、zip、doc、docx、xls、xlsx、pdf）</span>
                    </div>
                    <div class="extra notify-margin" style="width:100%">
                        <%--<div class="showextra" style="margin-top: 10px;">--%>
                        <%--<div class="layui-btn layui-btn-normal hideextra">移除附件</div>--%>
                        <%--<span>附件地址：</span><a style="color: red" href="">附件</a>--%>
                        <%--</div>--%>
                    </div>
                </div>

                <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block" style="text-align: center">
                        <button type="button" lay-submit
                                class="layui-btn layui-btn-normal notify-button notify-button-s">
                            新建
                        </button>
                        <button class="layui-btn layui-btn-normal notify-button notify-button-s" onclick="javascript :history.go(-1);">后退</button>
                    </div>
                </div>
            </form>




        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    $(function () {


    })
</script>

</html>
