<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>上海市机动车维修公共服务平台</title>
    <link rel="shortcut icon" href="${btx}/images/favicon.ico" type="image/x-icon"/>
    <link rel="bookmark" href="${btx}/images/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="${btx}/js/lib/easydropdown.css">
    <link rel="stylesheet" href="${btx}/js/lib/swipeslider.css">
    <link rel="stylesheet" href="${btx}/js/layui-v2.1.6/layui/css/layui.css" type="text/css">
    <link rel="stylesheet" href="${btx}/css/talentCenter.css">
</head>
<body>
<div class="top center">
    <div class="content">
        <div class="title">
            <img src="${btx}/img/logo.png"/>
            <div>
                <h1 style="font-size: 32px">上海市机动车维修公共服务平台</h1>
                <span style="font-size: 16px">Shanghai Automobile Maintenance Public Service Platform</span>
            </div>
        </div>
        <div class="login unLogin" style="font-size: 16px">
            <span style="color: black;">您好，欢迎光临本站！</span><a href="${ctx}/toLogin">登录</a>|<a
                href="${ctx}/toRegister?reUrl=${ctx}/center/talentCenter">注册</a>
        </div>
        <div class="login isLogin" style="display: none;font-size: 16px">
            <span class="nickName" style="color: black;"></span><a href="${ctx}/toLogin" class="loginButton"></a>|<span
                onclick="logout()" style="cursor: pointer;margin-left: 10px">注销</span>
        </div>
    </div>
</div>

<div class="upper center">
    <div class="content">
        <div class="left">
            <ul>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=计算机/互联网/通信/电子">计算机/互联网/通信/电子</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=销售/客服/技术支持">销售/客服/技术支持</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=会计/金融/银行/保险">会计/金融/银行/保险</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=生产/运营/采购/物流">生产/运营/采购/物流</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=生物/制药/医疗/护理">生物/制药/医疗/护理</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=广告/市场/媒体/艺术">广告/市场/媒体/艺术</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=建筑/房地产">建筑/房地产</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=人事/行政">人事/行政</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=资讯/法律/教育/科研">资讯/法律/教育/科研</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=服务业">服务业</a></li>
                <li><a href="${ctx}/center/searchJobsByCondition?searchText=公务员/翻译/其他">公务员/翻译/其他</a></li>
            </ul>
        </div>
        <div class="right">
            <div class="search">
                <%--<select id="area" class="dropdown">--%>
                <%--<option class="label" value="">区域</option>--%>
                <%--<option>黄浦区</option>--%>
                <%--<option>静安区</option>--%>
                <%--<option>浦东新区</option>--%>
                <%--</select>--%>
                <input id="input" placeholder="搜索职位、公司职能等">
                <div id="search" class="button" onclick="doSearch()">搜索</div>
                <%--<select id="type" class="dropdown">--%>
                <%--<option value="all">职位类型不限</option>--%>
                <%--</select>--%>
            </div>
            <div class="tag">
                <span>热门搜索：</span>
                <a href="#" onclick="addSearchText('汽车销售')">汽车销售</a>
                <a href="#" onclick="addSearchText('二手车评估师')">二手车评估师</a>
                <a href="#" onclick="addSearchText('焊接工程师')">焊接工程师</a>
                <a href="#" onclick="addSearchText('汽车工程项目管理')">汽车工程项目管理</a>
                <a href="#" onclick="addSearchText('4s店管理')">4s店管理</a>
                <a href="#" onclick="addSearchText('车身设计')">车身设计</a>
                <a href="#" onclick="addSearchText('总装工程师')">总装工程师</a>
            </div>
            <div class="info">
                <div class="banner">
                    <figure id="banner" class="swipslider">
                        <ul class="sw-slides">
                            <li class="sw-slide">
                                <img src="${btx}/tcImg/temp/banner.jpg">
                            </li>
                            <li class="sw-slide">
                                <img src="${btx}/tcImg/temp/banner.jpg">
                            </li>
                            <li class="sw-slide">
                                <img src="${btx}/tcImg/temp/banner.jpg">
                            </li>
                        </ul>
                    </figure>
                </div>
                <div class="user">
                    <div class="user-detail">
                        <img src="${btx}/tcImg/head.png"/>
                        <p class="name" id="name">张三</p>
                        <div class="edit">
                            <%--<span>简历完整度：</span><span class="integrity" id="integrity">70%</span>--%>
                            <%--<div class="operate"><a id="edit" href="#">编辑</a>/<a id="refresh" href="#">刷新</a></div>--%>
                        </div>
                        <dl class="barbox">
                            <%--<dd class="barline">--%>
                            <%--<div w="70" style="width:0px;" class="charts"></div>--%>
                            <%--</dd>--%>
                        </dl>
                        <div class="record">
                            <div><a id="who" href="${ctx}/resumebrowe/seeMeList">28</a>
                                <p>谁看过我</p></div>
                            <div><a id="ask" href="${ctx}/center/myApplication">3</a>
                                <p>申请记录</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="below center">
    <div class="content">
        <ul class="label channel">
            <li id="channel1" class="active">为您优选</li>
            <li id="channel2">热门职位</li>
            <li id="channel3">最新职位</li>
            <a href="${ctx}/center/searchJobsByCondition">更多</a>
        </ul>
        <div class="channel_content active" id="channel1_content">
            <%--<div class="post">--%>
            <%--<div class="title">--%>
            <%--<a href="#">区域销售经理-区域销售经理</a>--%>
            <%--<div class="right">--%>
            <%--<span>[2018-02-06]</span>--%>
            <%--<span>15k-20k</span>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<p>经验3-5年/本科</p>--%>
            <%--<div class="tag">--%>
            <%--<span>五险一金</span><span>年底双薪</span><span>技能培训</span>--%>
            <%--</div>--%>
            <%--<div class="com">--%>
            <%--<img src="${btx}/tcImg/temp/banner.jpg">--%>
            <%--<div class="right">--%>
            <%--<a href="#">上海汽车集团股份有限公司</a>--%>
            <%--<p>市场营销/未融资/上海·吴中路</p>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
        </div>
        <div class="channel_content" id="channel2_content">
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
        </div>
        <div class="channel_content" id="channel3_content">
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
            <%--<div class="post"></div>--%>
        </div>

        <ul class="label">
            <li class="active">热门公司</li>
            <%--<a href="#">更多</a>--%>
        </ul>
        <div class="com_content active">
            <%--<div class="company">--%>
            <%--<img src="${btx}/tcImg/temp/cxj.jpg">--%>
            <%--<div class="name">上海汽车集团股份有限公司</div>--%>
            <%--<p>打造中国汽车市场首个全生命周期-打造中国汽车市场首个全生命周期</p>--%>
            <%--<ul>--%>
            <%--<li><a href="#">21</a>--%>
            <%--<p>面试评价</p></li>--%>
            <%--<li><a href="#">11</a>--%>
            <%--<p>在招职位</p></li>--%>
            <%--<li><a href="#">100%</a>--%>
            <%--<p>简历处理率</p></li>--%>
            <%--</ul>--%>
            <%--</div>--%>
            <%--<div class="company"></div>--%>
            <%--<div class="company"></div>--%>
            <%--<div class="company"></div>--%>
            <%--<div class="company"></div>--%>
            <%--<div class="company"></div>--%>
            <%--<div class="company"></div>--%>
            <%--<div class="company"></div>--%>
        </div>
    </div>
</div>

<div class="footer center">
    <div class="content">
        <div class="jump">
            <span>友情链接：</span>
            <a href="http://www.mot.gov.cn/" target="_Blank">中华人民共和国交通运输部</a>|
            <a href="http://www.jt.sh.cn" target="_Blank">上海交通网</a>|
            <a href="http://www.shygc.net" target="_Blank">上海城市交通运输管理处</a>|
            <a href="http://www.shjtzf.com/" target="_Blank">上海市交通委执法总队</a>|
            <a href="http://www.lantoev.com" target="_Blank">蓝途共享</a>
        </div>
        <div class="copyright">
            <span>copyright 2017 上海蓝速汽车技术有限公司 All rights reserved</span>|
            <span>沪ICP备17039665号-1</span>
        </div>
    </div>
</div>
<script src="${btx}/js/lib/jquery-3.2.1.min.js"></script>
<script src="${btx}/js/lib/jquery.easydropdown.js"></script>
<script src="${btx}/js/lib/swipeslider.min.js"></script>
<script src="${btx}/js/layui-v2.1.6/layui/layui.all.js"></script>
<script src="${btx}/js/superfish.min.js"></script>
<script src="${btx}/js/common.js"></script>
<script>
    $(function () {
        $('#banner').swipeslider({
            transitionDuration: 600,
            autoPlayTimeout: 8000,
            sliderHeight: '348px'
            // autoPlay: false,
        });

        $(".charts").each(function (i, item) {
            var a = parseInt($(item).attr("w"));
            $(item).animate({
                width: a + "%"
            }, 1000);
        });

        channelHover("#channel1")
        channelHover("#channel2")
        channelHover("#channel3")

        function channelHover(id) {
            $(id).hover(function () {
                $(".channel li, .channel_content").removeClass("active")
                $(id).addClass("active")
                $(id + "_content").addClass("active")
            })
        }

        var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
        if (userInfo) {
            $('.nickName').text(userInfo.nickname);
            $('.unLogin').hide();
            $('.isLogin').show();

            var info = JSON.parse(localStorage.getItem('USERINFO'));
            if (info.userRoleId == 1) {
                $('.loginButton').attr('href', '${ctx}/center/userInfo');
                $('.loginButton').text('车主中心');
            }
            if (info.userRoleId == 2) {
                if (!info.isdisabled) {
                    $('.loginButton').attr('href', '${ctx}/center/companyHome');
                } else {
                    $('.loginButton').attr('href', '${ctx}/center/companyEnter');
                }
                $('.loginButton').text('企业中心');
            }
            if (info.userRoleId == 3) {
                $('.loginButton').attr('href', '${ctx}/center/manageHome');
                $('.loginButton').text('管理中心');
            }
            if (info.userRoleId == 4) {
                $('.loginButton').attr('href', '${ctx}/center/companyVisit');
                $('.loginButton').text('运营商中心');
            }
            if (info.userRoleId == 5) {
                $('.loginButton').attr('href', '${ctx}/cdf/question4Expert');
                $('.loginButton').text('专家中心');
            }
            if (info.userRoleId == 6) {
                $('.loginButton').attr('href', '${ctx}/cdf/manageNotes');
                $('.loginButton').text('协会中心');
            }
            if (info.userRoleId == 7) {
                $('.loginButton').attr('href', '${ctx}/center/manageHome');
                $('.loginButton').text('管理中心');
            }
        } else {
            $('.unLogin').show();
            $('.isLogin').hide();
        }

        function formatDegree(code) {
            var arr = [
                    {code: 1, value: '小学'},
                    {code: 2, value: '初中'},
                    {code: 3, value: '高中'},
                    {code: 4, value: '大专'},
                    {code: 5, value: '本科'},
                    {code: 6, value: '硕士'},
                    {code: 7, value: '技校'},
                    {code: 8, value: '中专'},
                    {code: 9, value: '高职'},
                    {code: 10, value: '博士'},
                ];
            for(var i in arr) {
                if(arr[i].code == code) {
                    return arr[i].value;
                }
            }
            return ''
        }

        // 为您优选
        simpleGet(baseu + '/resume/select/' + localStorage.getItem('ACCESSTOKEN'), function (res) {
            var data = res.data;
            var innerHtml = '';
            for (var i in data) {
                innerHtml += '<div class="post">' +
                    '<div class="title">' +
                    '<a href="'+"${ctx}/center/queryPostDetails?id="+data[i].postId+'">' + (data[i].postName || ' ') + '</a>' +
                    '<div class="right">' +
                    '<span>[' + formatDate(data[i].publishTime, 'yyyy-MM-dd') + ']</span>' +
                    '<span>' + data[i].salary + 'K</span>' +
                    '</div>' +
                    '</div>' +
                    '<p>经验' + (data[i].experience || ' ') +'年/' + (data[i].degree || ' ') + '</p>' +
                    '<div class="tag">' +
                    '<span>'+ (data[i].welfare || '') +'</span>' +
                    '</div>' +
                    '<div class="com">' +
                    '<img src="${btx}/tcImg/temp/banner.jpg">' +
                    '<div class="right">' +
                    '<a href="'+"/center/companyResumeBrowe2?corpId="+data[i].corpId+'">' + data[i].corpName + '</a>' +
                    '<p>' + (data[i].corpnature || ' ') + '/'+ (data[i].corpaddress || ' ') +'</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            $('#channel1_content').html(innerHtml);
        });

        // 热门职位
        simpleGet(baseu + '/resume/select/' + localStorage.getItem('ACCESSTOKEN'), function (res) {
            var data = res.data;
            var innerHtml = '';
            for (var i in data) {
                innerHtml += '<div class="post">' +
                    '<div class="title">' +
                    '<a href="'+"${ctx}/center/queryPostDetails?id="+data[i].postId+'">' + (data[i].postName || ' ') + '</a>' +
                    '<div class="right">' +
                    '<span>[' + formatDate(data[i].publishTime, 'yyyy-MM-dd') + ']</span>' +
                    '<span>' + data[i].salary + 'K</span>' +
                    '</div>' +
                    '</div>' +
                    '<p>经验' + (data[i].experience || ' ') +'年/' + (data[i].degree || ' ') + '</p>' +
                    '<div class="tag">' +
                    '<span>'+ (data[i].welfare || '') +'</span>' +
                    '</div>' +
                    '<div class="com">' +
                    '<img src="${btx}/tcImg/temp/banner.jpg">' +
                    '<div class="right">' +
                    '<a href="'+"/center/companyResumeBrowe2?corpId="+data[i].corpId+'">' + data[i].corpName + '</a>' +
                    '<p>' + (data[i].corpnature || ' ') + '/'+ (data[i].corpaddress || ' ') +'</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            $('#channel2_content').html(innerHtml);
        });

        // 最新职位
        simpleGet(baseu + '/resume/update/' + localStorage.getItem('ACCESSTOKEN'), function (res) {
            var data = res.data;
            var innerHtml = '';
            for (var i in data) {
                innerHtml += '<div class="post">' +
                    '<div class="title">' +
                    '<a href="'+"${ctx}/center/queryPostDetails?id="+data[i].postId+'">' + (data[i].postName || ' ') + '</a>' +
                    '<div class="right">' +
                    '<span>[' + formatDate(data[i].publishTime, 'yyyy-MM-dd') + ']</span>' +
                    '<span>' + data[i].salary + 'K</span>' +
                    '</div>' +
                    '</div>' +
                    '<p>经验' + (data[i].experience || ' ') +'年/' + (data[i].degree || ' ') + '</p>' +
                    '<div class="tag">' +
                    '<span>'+ (data[i].welfare || '') +'</span>' +
                    '</div>' +
                    '<div class="com">' +
                    '<img src="${btx}/tcImg/temp/banner.jpg">' +
                    '<div class="right">' +
                    '<a href="'+"/center/companyResumeBrowe2?corpId="+data[i].corpId+'">' + (data[i].corpName || ' ') + '</a>' +
                    '<p>' + (data[i].corpnature || ' ') + '/'+ (data[i].corpaddress || ' ') +'</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            $('#channel3_content').html(innerHtml);
        });

        // 热门公司
        simpleGet(baseu + '/resume/hotCompany/' + localStorage.getItem('ACCESSTOKEN'), function (res) {
            var data = res.data;
            var innerHtml = '';
            for (var i in data) {
                innerHtml += '<div class="company">' +
                    '<img src="${btx}/tcImg/temp/cxj.jpg">' +
                    '<div class="name">' + (data[i].corpName || ' ') + '</div>' +
                    '<p>'+ data[i].detail +'</p>' +
                    '<ul>' +
                    '<li><a href="#">21</a>' +
                    '<p>面试评价</p></li>' +
                    '<li><a href="${ctx}/resumebrowe/companyResumeBrowe?corpId=3897">' + data[i].recruitNum + '</a>' +
                    '<p>在招职位</p></li>' +
                    '<li><a href="#">' + data[i].rate + '%</a>' +
                    '<p>简历处理率</p></li>' +
                    '</ul>' +
                    '</div>';
            }

            $('.com_content').html(innerHtml);
        });

        // 获取用户信息
        var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
        if (userInfo) {
            if (userInfo.userName) {
                $('#name').text(userInfo.userName);
            }
            if (userInfo.photo) {
                $('.user img').attr('src', userInfo.photo);
            }
            $('.user-detail').show();
        } else {
            $('.user-detail').hide();
        }
    })

    function logout() {
        layer.confirm('确认要退出登录吗？', {
            icon: 3,
            btn: ['确定', '取消']
        }, function () {
            var token = localStorage.getItem('ACCESSTOKEN')
            simpleGet(baseu + '/user/useraccount/logout/' + token, function (res) {
                localStorage.removeItem('ACCESSTOKEN')
                localStorage.removeItem('USERINFO')
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + window.location.pathname;
            })
        });
    }

    function doSearch() {
        var searchText = $('#input').val();
        window.location.href = '${ctx}' + '/center/searchJobsByCondition?searchText=' + searchText;
    }

    function addSearchText(val) {
        $('#input').val(val);
        doSearch();
    }
</script>
</body>
</html>
