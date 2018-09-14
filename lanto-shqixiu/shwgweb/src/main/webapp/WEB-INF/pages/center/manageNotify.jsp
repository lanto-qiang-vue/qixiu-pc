<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <script src="${btx}/js/front/manage/notify.js"></script>
</head>

<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">通知发布</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/manageHome">管理中心</a> > <span>通知发布</span></span>
        </div>
        <div class="biaoge" style="overflow: auto;margin-top: 20px">
            <form class="layui-form" action="" style="width: 700px;margin-top: 10px">
                <div class="layui-form-item">
                    <label class="layui-form-label">通知标题</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" id="title" required lay-verify="required" placeholder="请输入标题"
                               autocomplete="off" class="layui-input notify-detail-input">
                    </div>
                </div>

                <%--<div class="layui-form-item">--%>
                <%--<label class="layui-form-label">选择发布对象</label>--%>
                <%--<div class="layui-input-block">--%>
                <%--<select name="company">--%>
                <%--<option value="">车主</option>--%>
                <%--<option value="0">维修企业</option>--%>
                <%--<option value="1">管理部门</option>--%>
                <%--</select>--%>
                <%--</div>--%>
                <%--</div>--%>

                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">通知内容</label>
                    <div class="layui-input-block">
                        <textarea id="content" name="content" placeholder="请输入内容"
                                  class="layui-textarea notify-detail-input" required></textarea>
                    </div>
                </div>

                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">发送对象</label>
                    <div class="layui-input-block">
                        <div class="layui-input-inline search_select hoverlist2" id="companycategory"
                             style="width: 100%; margin-right: 3px;" data-value=""
                             data-tit="企业类型" data-type="type">
                            <div class="layui-unselect layui-form-select qylx">
                                <div class="layui-select-title">
                                    <input id="compType" type="text" placeholder="发送对象" value="" readonly=""
                                           class="layui-input layui-unselect"><i
                                        class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit role" style="min-width: 60%">
                                    <%--<c:forEach items="${typeList }" var="item" varStatus="state">--%>
                                    <dd data-value="all">
                                        <i class="layui-icon">&#xe605;</i> <span>全部</span>
                                    </dd>
                                    <dd data-value="1">
                                        <i class="layui-icon">&#xe605;</i> <span>车主</span>
                                    </dd>
                                    <dd data-value="2" class="company">
                                        <i class="layui-icon">&#xe605;</i> <span>维修企业</span>
                                    </dd>
                                    <dd data-value="3" class="area">
                                        <i class="layui-icon">&#xe605;</i> <span>管理部门</span>
                                    </dd>
                                    <dd data-value="6">
                                        <i class="layui-icon">&#xe605;</i> <span>协会</span>
                                    </dd>
                                    <%--</c:forEach>--%>
                                </dl>

                                <dl id="right-content" class="compType"
                                    style="display: none;left: 50%">
                                    <%--<c:forEach items="${typeList }" var="item" varStatus="state">--%>
                                    <dd data-value="全部">
                                        <i class="layui-icon">&#xe605;</i> <span>全部</span>
                                    </dd>
                                    <dd data-value="43">
                                        <i class="layui-icon">&#xe605;</i> <span>一类维修企业</span>
                                    </dd>
                                    <dd data-value="44">
                                        <i class="layui-icon">&#xe605;</i> <span>二类维修企业</span>
                                    </dd>
                                    <dd data-value="45">
                                        <i class="layui-icon">&#xe605;</i> <span>三类维修企业</span>
                                    </dd>
                                    <%--</c:forEach>--%>
                                </dl>

                                <dl id="right-content-area"
                                    style="display: none;left: 50%; height: 200px;">
                                    <%--<c:forEach items="${typeList }" var="item" varStatus="state">--%>
                                    <dd data-value="全部2">
                                        <i class="layui-icon">&#xe605;</i> <span>全部</span>
                                    </dd>
                                    <dd data-value="310000">
                                        <i class="layui-icon">&#xe605;</i> <span>沪市</span>
                                    </dd>
                                    <dd data-value="310112">
                                        <i class="layui-icon">&#xe605;</i> <span>沪闵</span>
                                    </dd>
                                    <dd data-value="310113">
                                        <i class="layui-icon">&#xe605;</i> <span>沪宝</span>
                                    </dd>
                                    <dd data-value="310114">
                                        <i class="layui-icon">&#xe605;</i> <span>沪嘉</span>
                                    </dd>
                                    <dd data-value="310115">
                                        <i class="layui-icon">&#xe605;</i> <span>沪浦</span>
                                    </dd>
                                    <dd data-value="310116">
                                        <i class="layui-icon">&#xe605;</i> <span>沪金</span>
                                    </dd>
                                    <dd data-value="310117">
                                        <i class="layui-icon">&#xe605;</i> <span>沪松</span>
                                    </dd>
                                    <dd data-value="310118">
                                        <i class="layui-icon">&#xe605;</i> <span>沪青</span>
                                    </dd>
                                    <dd data-value="310120">
                                        <i class="layui-icon">&#xe605;</i> <span>沪奉</span>
                                    </dd>
                                    <dd data-value="310230">
                                        <i class="layui-icon">&#xe605;</i> <span>沪崇</span>
                                    </dd>
                                    <%--</c:forEach>--%>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>


                <%--<div class="layui-form-item">--%>
                <%--<label class="layui-form-label">发送对象</label>--%>
                <%--&lt;%&ndash;<div class="layui-input-block">&ndash;%&gt;--%>
                <%--&lt;%&ndash;<input type="checkbox" name="to1" value="1" title="车主">&ndash;%&gt;--%>
                <%--&lt;%&ndash;<input type="checkbox" name="to2" value="2" title="维修企业" >&ndash;%&gt;--%>
                <%--&lt;%&ndash;<input type="checkbox" name="to3" value="3" title="管理部门">&ndash;%&gt;--%>
                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                <%--<div class="layui-input-block to1" style="margin-bottom: 20px">--%>
                <%--<select name="to1" lay-filter="to1" class="role">--%>
                <%--<option value="all">全部</option>--%>
                <%--<option value="1">车主</option>--%>
                <%--<option value="2">维修企业</option>--%>
                <%--<option value="3">管理部门</option>--%>
                <%--</select>--%>
                <%--</div>--%>

                <%--<div class="layui-input-block to3" style="margin-bottom: 20px;display: none">--%>
                <%--<select name="to3" lay-filter="to3" class="comeType">--%>
                <%--<option value="all">全部</option>--%>
                <%--<option value="43">一类维修企业</option>--%>
                <%--<option value="44">二类维修企业</option>--%>
                <%--<option value="45">三类维修企业</option>--%>
                <%--</select>--%>
                <%--</div>--%>

                <%--&lt;%&ndash;<div class="layui-input-block to2" style="margin-bottom: 20px;">&ndash;%&gt;--%>
                <%--&lt;%&ndash;<select name="to2" lay-search lay-filter="to2">&ndash;%&gt;--%>
                <%--&lt;%&ndash;<option value="">请输入名称/手机号</option>&ndash;%&gt;--%>
                <%--&lt;%&ndash;<option value="all">全部</option>&ndash;%&gt;--%>
                <%--&lt;%&ndash;</select>&ndash;%&gt;--%>
                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                <%--</div>--%>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">上传附件</label>
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn layui-btn-normal notify-button notify-button-a"
                                id="upload">
                            <i class="layui-icon">&#xe67c;</i> 添加附件
                        </button>
                        <span>（仅支持txt、zip、doc、docx、xls、xlsx、pdf）</span>
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">发送通知</label>
                    <div class="layui-input-block">
                        <button type="button" lay-submit
                                class="layui-btn layui-btn-normal notify-button notify-button-s">
                            发送
                        </button>
                    </div>
                </div>
            </form>

            <div class="extra notify-margin">
                <%--<div class="showextra" style="margin-top: 10px;">--%>
                <%--<div class="layui-btn layui-btn-normal hideextra">移除附件</div>--%>
                <%--<span>附件地址：</span><a style="color: red" href="">附件</a>--%>
                <%--</div>--%>
            </div>


        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    $(function () {
        var id = getUrlParam('id'), token = localStorage.getItem('ACCESSTOKEN'), url = ''
        if(id){
        layer.load();
            var param = {
                accessToken: token,
                notifyId: id
            }
            accessPost(baseu + '/message/notify/getNotify', JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');

                console.log('res',res)
                var data = res.data, content = '', url = [];
                content = JSON.parse(data.content).content;
                console.log("content",content);
                url = JSON.parse(data.content).url
                console.log('data.title',data.title)
                $("#title").val(data.title)
                $("#content").val(content);
//                layedit.setContent(content)
                var html = ""
                var fileName = ''
                for (var i in url) {
                    if (url[i] != '' && url[i] != null) {
                        fileName = url[i].substring(url[i].lastIndexOf('/')+1)
                    }
                    html += "<li><a href='" + url[i] + "'>" + fileName + "</a></li>"
                }
                if(fileName){
                $(".extra").html(
                    '<div class="showextra" style="margin-left: 60px;">'+
                    '<div class="layui-btn layui-btn-normal hideextra" style="margin: 0 20px;border-radius: 4px;background-color: #2d8cf0;">移除附件</div>'+
                    '<span>附 件：</span><a class="extras" style="color: red" href="'+
                    url[0]+'">'+fileName+'</a>'+
                    '</div>'
                )

                }
                layer.closeAll('loading');

                layui.use('layedit', function(){
                    layedit = layui.layedit;
                    editIndex = layedit.build('content',
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

            })
//            layer.closeAll('loading');
        } else {
            layui.use('layedit', function(){
                layedit = layui.layedit;
                editIndex = layedit.build('content',
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
        }

        $('.hoverlist2 dl').on('click', 'dd', function () {
            var par = $(this).parents(".search_select");
            if ($(this).hasClass('select-this')) {
                $(this).removeClass('select-this');
            } else {
                $(this).addClass('select-this');
                if ($(this).attr('data-value') === '2') {
                    $(this).addClass('select-company');
                }
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

        $('#companycategory .layui-anim').on('click', '.company', function () {
            if ($(this).hasClass('select-this')) {
                $("#right-content").show();
            } else {
                $('#right-content dd').removeClass('select-this');

                var par = $('.hoverlist2 dl dd').parents(".search_select");
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

                $("#right-content").hide();
            }
        });

        $('#companycategory').on('mouseenter', function () {
            $("#companycategory .layui-anim").show();
        });
        $('#companycategory').on('mouseleave', function () {
            $("#companycategory .layui-anim").hide();
            $("#right-content").hide();
            $("#right-content-area").hide();
        });

        $('#companycategory .layui-anim').on('mouseenter', '.company', function () {
            if ($(this).hasClass('select-this')) {
                $("#right-content").show();
            }
        });
        $('#companycategory .layui-anim').on('mouseleave', '.company', function () {
            $("#right-content").hide();
        });
        $('#companycategory #right-content').on('mouseleave', function () {
            $("#right-content").hide();
        });
        $('#companycategory #right-content').on('mouseenter', function () {
            $("#right-content").show();
        });


        $('#companycategory .layui-anim').on('click', '.area', function () {
            if ($(this).hasClass('select-this')) {
                $("#right-content-area").show();
            } else {
                $('#right-content-area dd').removeClass('select-this');

                var par = $('.hoverlist2 dl dd').parents(".search_select");
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

                $("#right-content-area").hide();
            }
        });

        $('#companycategory .layui-anim').on('mouseenter', '.area', function () {
            if ($(this).hasClass('select-this')) {
                $("#right-content-area").show();
            }
        });
        $('#companycategory .layui-anim').on('mouseleave', '.area', function () {
            $("#right-content-area").hide();
        });
        $('#companycategory #right-content-area').on('mouseleave', function () {
            $("#right-content-area").hide();
        });
        $('#companycategory #right-content-area').on('mouseenter', function () {
            $("#right-content-area").show();
        });
    })
</script>
<style>
    .select-company:hover #right-content {
        display: block;
    }
</style>
</html>
