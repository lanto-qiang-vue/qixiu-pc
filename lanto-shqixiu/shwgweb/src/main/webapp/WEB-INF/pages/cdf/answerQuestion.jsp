<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <%--<script src="${btx}/js/kindeditor/kindeditor-all-min.js"></script>--%>
    <%--<script src="${btx}/js/kindeditor/lang/zh_CN.js"></script>--%>
    <link rel="stylesheet" href="/statics/js/lib/zoomify.min.css">
    <script src="/statics/js/lib/zoomify.min.js"></script>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="problem consult" style="height:100%;display: table;">
    <div class="problem_l" style="height:100%;min-height:1020px;">
        <div class="pro_t">
            <span class="wenti">问题详细</span>
            <span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <a
                    href="${ctx}/cdf">车大夫门诊</a> > <span> 问题回答</span></span>
        </div>
        <div class="qdetail" style="border-bottom:0px;">
            <input type="hidden" id="quesId" value="${detail.QUES_ID }"/>
            <div class="fr qinfor">
                <h4>
                </h4>
                <div class="infor-detail">
                    <div class="infor-arrow"></div>
                    <div class="car-infor">
                        <span id="questionusername"></span>
                        <span id="viewNumber"></span>
                        <span id="createDate"></span>
                        <%--<span id="quesStatus">问题状态：</span>--%>
                    </div>
                    <div class="qcontent">
                        问题：<span id="qcontent"></span>
                    </div>
                    <div class="questionImage" id="questionImage">
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>

        <div id="isAdopt">
        </div>
        <%--<div class="qdetail adopt" style="margin-top:0px;margin-bottom:10px;">--%>
        <%--<div class="adopt-title">--%>
        <%--<span class="adopt-icon"></span>--%>
        <%--<em class="fl">提问者采纳</em>--%>
        <%--<em class="fr adopt-time">${cnAnswer.ANSWER_TIME }</em>--%>
        <%--</div>--%>
        <%--<div class="adopt-content">--%>
        <%--<div>${cnAnswer.CONTENT }</div>--%>
        <%--<div class="photo">--%>
        <%--<img src="${cnAnswer.EXPERT_PHOTO }" width="55px" height="58px">--%>
        <%--<img src="${btx}/images/default_user.png" width="55px">--%>
        <%--${cnAnswer.ANSWER_EXPERT_NAME }--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>
        <div class="other" style="margin-top:0px;">
            <div class="other-title">
                <em id="total" class="fl" style="padding-left:10px;">

                </em>
            </div>
            <div class="other-content" style="border-bottom:0px;">
            </div>
        </div>

        <%--<div class="jianjie" id="answerQuestion">--%>
            <%--<div class="zixun">--%>
                <%--<p>问题回答</p>--%>

                <%--<span id="qusttypepanel" class="questlist">--%>
                <%--</span>--%>
                <%--<form class="layui-form">--%>
                <%--</form>--%>
                <%--<div class="submitbtn">--%>
                    <%--<button class="layui-btn layui-btn-normal" id="submitbutton" onclick="submitAnswer()">提交答案</button>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">


    if (localStorage.getItem('USERINFO')) {
        var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
        if (userInfo && userInfo.userRoleId != 5) {
            $('#answerQuestion').hide();
        }
    } else {
        $('#answerQuestion').hide();
    }

    function submitAnswer() {
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            content: layedit.getContent(editIndex),
            isanonymous: false,
            questionId: getUrlParam('id')
        }

        simplePost(baseu + '/QxwCdf/addanswer', JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            if (res.code === '000000') {
                layer.msg('问题回答成功');
                doSearch();
            } else {
                layer.msg(res.status);
            }
        })
    }

    var cnAnswer = function (answerId) {
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            id: answerId
        }

        simplePost(baseu + '/QxwCdf/cnanswer', JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            if (res.code === '000000') {
                layer.msg('问题采纳成功');
                doSearch();
            } else {
                layer.msg(res.status);
            }
        })
    }

    function doSearch() {
//        layer.load();

        layui.use('layedit', function () {
            layedit = layui.layedit;
            editIndex = layedit.build('qusttypepanel',
                {
                    tool: [
                        'strong'
                        , 'italic' //斜体
                        , 'underline' //下划线
                        , 'del' //删除线

                        , '|' //分割线

                        , 'left' //左对齐
                        , 'center' //居中对齐
                        , 'right' //右对齐
                        , 'help' //帮助
                    ]
                }); //建立编辑器
        });

        systemCall(function (systok) {
            accessGet(baseu + '/QxwCdf/article/detail/' + systok + '/' + getUrlParam('id'), function (res) {
                $('#qcontent').html(res.data.quesContent ? res.data.quesContent : '');
                $('#questionusername').html('提问者：' + (res.data.userName ? res.data.userName : '匿名'));
                $('#viewNumber').html('浏览次数：' + ((res.data.viewNumber + 1) ? (res.data.viewNumber + 1) : 1));
                $('#createDate').html('创建时间：' + formatDate(res.data.createTime, 'yyyy-MM-dd hh:mm:ss'));

//                if (res.data.quesStatus == '1') {
//                    $('#quesStatus').html('问题状态：未审核')
//                }
//                if (res.data.quesStatus == '2') {
//                    $('#quesStatus').html('问题状态：已通过')
//                }
//                if (res.data.quesStatus == '3') {
//                    $('#quesStatus').html('问题状态：未通过')
//                }

                var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
                var loginUserId = userInfo && userInfo.userId;

                var answers = res.data.answer;
                var questionUserId = res.data.userId;
                var html = '';
                var flag = false;
                var questionAdopted = false;
                if (answers.length && answers[0].answerTime) {
                    for (var i in answers) {
                        if (answers[i].answerIsadopt) {
                            questionAdopted = true;
                        }
                    }

                    for (var i in answers) {
                        if (!answers[i].answerIsadopt) {
                            html += '<div style="border-bottom: 1px dotted #ccc; margin-bottom: 10px;padding-bottom: 10px;">';
                            html += '<div class="photo">';
                            html += '<img src="' + (answers[i].answerPhoto ? answers[i].answerPhoto : '${btx}/images/default_user.png') + '" width="55px" height="58px">';
                            html += '<em class="fl">' + (answers[i].answerUserName ? answers[i].answerUserName : '') + '</em>';
                            html += '<em class="fr fgray">' + formatDate(answers[i].answerTime, 'yyyy-MM-dd hh:mm:ss') + '</em>';
                            
                            if(!questionAdopted && loginUserId == questionUserId){
                                html += '<em class="fr fgray"><button class="layui-btn layui-btn-normal" id="cnAnswerButton" onclick="cnAnswer(' + answers[i].answerId + ')">采纳</button></em>';
                            }

                            html += '</div>';
                            html += '<div style="margin-left:84px; overflow-x:auto; overflow-y:hidden; +overflow-y:auto; position: relative;word-break:break-all;">';
                            html += (answers[i].answerContent ? answers[i].answerContent : '');
                            html += '</div>';
                            html += '</div>';
                        } else {
                            var adoptHtml = '<div class="qdetail adopt" style="margin-top:0px;margin-bottom:10px;">' +
                                '<div class="adopt-title">' +
                                '<span class="adopt-icon"></span>' +
                                '<em class="fl">提问者采纳</em>' +
                                '<em class="fr adopt-time">' + formatDate(answers[i].answerTime, 'yyyy-MM-dd hh:mm:ss') + '</em>' +
                                '</div>' +
                                '<div class="adopt-content">' +
                                '<div>' + (answers[i].answerContent ? answers[i].answerContent : '') + '</div>' +
                                '<div class="photo">' +
                                '<img src="' + (answers[i].answerPhoto ? answers[i].answerPhoto : '${btx}/images/default_user.png') + '" width="55px" height="58px">' +
                                (answers[i].answerUserName ? answers[i].answerUserName : '') +
                                '</div>' +
                                '</div>' +
                                '</div>';
                            $('#isAdopt').html(adoptHtml);
                            flag = true;
                        }
                    }
                } else {
                    flag = false;
                    answers = [];
                }

                var images = res.data.images;
                var imageHtml = ''
                for (var i in images) {
                    imageHtml += '<img src="' + images[i] + '" width="65px" height="65px" style="margin-right: 5px"/>';
                    $('#questionImage').html(imageHtml);
                }
                $(".questionImage>img").zoomify({duration:0});

                $('.other-content').html(html);
                $('#total').html('其他共' + (flag ? answers.length - 1 : answers.length) + '回答');
                layer.closeAll('loading');
            })
        })
    }

    doSearch();
</script>
<style>
    .qinfor {
        width: 100%;
    }

    .qcontent, .questionImage {
        width: 96%;
        margin: 0 auto;
        padding: 10px;
    }

    .questionusername {
        margin-right: 300px;
    }

    .problem_l {
        width: 100%;
    }
</style>
</html>
