<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>上海市机动车维修公共服务平台</title>
    <link rel="shortcut icon" href="${btx}/images/favicon.ico" type="image/x-icon"/>
    <link rel="bookmark" href="${btx}/images/favicon.ico" type="image/x-icon"/>

    <link rel="stylesheet" href="${btx}/css/loading/animate.css">
    <link rel="stylesheet" href="${btx}/css/loading/loading.css">

    <link rel="stylesheet" href="${btx}/js/lib/easydropdown.css">
    <link rel="stylesheet" href="${btx}/js/lib/swipeslider.css">
    <link rel="stylesheet" href="/statics/js/layui-2.3.0/css/layui.css" type="text/css">
    <link rel="stylesheet" href="${btx}/css/style.css">
    <link rel="stylesheet" href="${btx}/css/index.css?var=20180709">
    <!--[if lte IE 9]>
    <script src="${btx}/js/ie.js"></script>
    <![endif]-->
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
        <a href="http://www.lantoev.com/android/DownLoad.html" target="_blank" class="qr">
            <p>下载APP</p>
            <img src="${btx}/img/qrcode_app.png"/>
        </a>
        <div class="qr">
            <p>关注微信</p>
            <img src="${btx}/img/qrcode_weixin.jpg"/>
        </div>
        <a href="/czzn"><img class="czzn" src="${btx}/img/czzn.png" title="操作指南"></a>
        <span style="" class="tel">400-663-8210</span>
        <div class="login unLogin" style="font-size: 16px">
            <span style="color: #d1d1d2;">您好，欢迎光临本站！</span>
            <a href="/toLogin"><img src="${btx}/img/login.png">登录</a>|
            <a href="/toLogin?type=register">注册</a>
        </div>
        <div class="login isLogin" style="display: none;font-size: 16px">
            <span class="nickName" style="color: #d1d1d2;"></span>
            <div class="switch">
                <a href="${ctx}/toLogin" class="loginButton show"></a>
                <a href="/center/repairInfo?role_id=1" class="goOwner">车主中心</a>
            </div>
            |<span onclick="logout()" style="cursor: pointer;margin-left: 10px">注销</span>
        </div>
    </div>
</div>

<div class="mid center" style="margin-top: 0">

    <div class="content">
        <figure id="banner" class="swipslider">
            <ul class="sw-slides">
                <%--<li class="sw-slide">--%>
                <%--<a href="/phone/hiteggs" >--%>
                <%--<img src="${btx}/img/temp/banner-0.png" style="width: 100%;height: 100%">--%>
                <%--</a>--%>
                <%--</li>--%>

                <li class="sw-slide">
                    <a>
                    <img src="/statics/img/temp/banner-4.jpg" style="width: 100%;height: 100%">
                    </a>
                </li>
                <li class="sw-slide">
                    <a>
                    <img src="/statics/img/temp/banner-5.jpg" style="width: 100%;height: 100%">
                    </a>
                </li>
                <li class="sw-slide">
                    <a>
                        <img src="/statics/img/temp/banner-6.jpg" style="width: 100%;height: 100%">
                    </a>
                </li>
                <li class="sw-slide">
                    <a href="https://www.shanghaiqixiu.org/government/detail/185">
                        <img src="/statics/img/temp/banner-7.jpg" style="width: 100%;height: 100%">
                    </a>
                </li>
                <%--<li class="sw-slide">--%>
                    <%--<a href="/queryRepairCompany" >--%>
                        <%--<img src="/statics/img/temp/banner-1.jpg" style="width: 100%;height: 100%">--%>
                    <%--</a>--%>
                <%--</li>--%>
                <%--<li class="sw-slide">--%>
                    <%--<a onclick="goToPage('/center/applyList', false, [1,2,3,4,5,6,7])">--%>
                        <%--<img src="/statics/img/temp/banner-2.jpg" style="width: 100%;height: 100%">--%>
                    <%--</a>--%>
                <%--</li>--%>


            </ul>
        </figure>
    </div></div>

<div class="mid center">
    <div class="content">
        <div class="service1">
            <div class="left">
                <ul>
                    <li class="owner-center"><img style="width: 70px;" src="${btx}/img/icon/车主服务中心.png"><p>车主服务中心</p></li>
                    <li class="com-center"><img style="width: 50px" src="${btx}/img/icon/汽修企业服务中心.png"><p>汽修企业</p><p>服务中心</p></li>
                    <li class="gover-center"><img style="width: 40px;" src="${btx}/img/icon/政务服务中心.png"><p>政务服务中心</p></li>
                    <li class="relate-center"><img style="width: 70px;margin-top: 30px" src="${btx}/img/icon/汽修相关产业服务中心.png"><p>汽修相关产业</p><p>服务中心</p></li>
                    <li class="association-center"><img style="width: 70px" src="${btx}/img/icon/协会服务中心.png"><p>协会服务中心</p></li>
                    <li class="talent-center"><img style="width: 70px" src="${btx}/img/icon/人才服务中心.png"><p>人才服务中心</p></li>
                    <li class="supervise-center"><img style="width: 50px;margin-bottom: 5px" src="${btx}/img/icon/公共监督服务中心.png"><p>公众监督</p></li>
                    <li class="business-center"><img style="width: 50px" src="${btx}/img/icon/商务服务中心.png"><p>商务服务中心</p></li>
                    <li class="data-center"><img style="width: 70px" src="${btx}/img/icon/大数据服务中心.png"><p>大数据</p><p>服务中心</p></li>
                </ul>
                <div class="record" onclick="goToPage('/center/repairInfo')"><img src="${btx}/img/icon/电子健康档案系统.png">电子健康档案系统</div>
                <div class="submenu owner-center_menu">
                    <a  onclick="goToPage('/center/applyList', false, [1,2,3,4,5,6,7])"><img src="${btx}/img/menu_icon/爱车档案.png">
                        <p>爱车档案</p></a>
                    <a  onclick="goToPage('${ctx}/queryRepairCompany', true)"><img src="${btx}/img/menu_icon/维修服务查选.png">
                        <p>维修服务查询</p></a>
                    <a  onclick="goToPage('${ctx}/cdf', true)"><img src="${btx}/img/menu_icon/车大夫门诊.png">
                        <p>车大夫门诊</p></a>
                    <a  onclick="goToPage('${ctx}/maintain/visit', false, [1,2,3,4,5,6,7])"><img src="${btx}/img/menu_icon/上门服务.png">
                        <p>上门服务</p></a>
                    <a  onclick="goToPage('${ctx}/queryRepairCompany', false, [1,2,3,4,5,6,7])"><img src="${btx}/img/menu_icon/预约服务.png">
                        <p>预约服务</p></a>
                    <a  onclick="goToPage('${ctx}/business/help', true)"><img src="${btx}/img/menu_icon/道路救援.png">
                        <p>道路救援</p></a>
                    <a  onclick="goToPage('${ctx}/business/insure', true)"><img src="${btx}/img/menu_icon/车辆保险.png">
                        <p>车辆保险</p></a>
                    <a  onclick="goToPage('${ctx}/business/check', true)"><img src="${btx}/img/menu_icon/年检服务.png">
                        <p>年检服务</p></a>
                    <%--<a href="http://hxx.refineit.cn:2000/index.php/dq/Goods/goodsList/id/894.html" target="_blank"><img src="${btx}/img/menu_icon/二手车市场.png">--%>
                    <%--<p>二手车市场</p></a>--%>
                    <%--<a href="http://hxx.refineit.cn:2000/index.php/dq/Goods/goodsList/id/889.html" target="_blank"><img src="${btx}/img/menu_icon/美容清洁.png">--%>
                    <%--<p>美容清洁</p></a>--%>
                    <%--<a ><img src="${btx}/img/menu_icon/违章查询.png">--%>
                    <%--<p>违章查询</p></a>--%>
                    <a  onclick="goToPage('${ctx}/maintain?flag=check', true)"><img src="${btx}/img/menu_icon/检测站.png">
                        <p>综合检测站</p></a>
                    <a  onclick="goToPage('${ctx}/maintain?flag=wyc', true)"><img src="${btx}/img/menu_icon/危运车辆维修.png">
                        <p>危运车辆维修</p></a>
                    <a  onclick="goToPage('${ctx}/maintain?flag=xny', true)"><img src="${btx}/img/menu_icon/新能源汽车维修.png">
                        <p>新能源汽车维修</p></a>
                    <a  onclick="goToPage('${ctx}/maintain?flag=qcjy', true)"><img src="${btx}/img/menu_icon/道路救援.png">
                        <p>施救牵引企业</p></a>
                    <%--<a  onclick="goToPage('${ctx}/center/resumeCenter', false, [1])"><img src="${btx}/img/menu_icon/简历管理.png">--%>
                    <%--<p>简历管理</p></a>--%>
                    <a  onclick="goToPage('${ctx}/business/study', true)"><img src="${btx}/img/menu_icon/推介服务.png">
                        <p>推介服务</p></a>
                    <a href="/statics/tips.pdf" target="_blank"><img src="${btx}/img/menu_icon/行业概况.png">
                        <p>爱车小贴士</p></a>
                </div>
                <div class="submenu com-center_menu">
                    <a  onclick="goToPage('http://hxx.hoxiuxiu.com', true)"><img style="width: 36px" src="${btx}/img/menu_icon/门店管理.png">
                        <p>门店管理</p></a>
                    <a  onclick="goToPage('/center/repairInfo', false, [2])"><img src="${btx}/img/menu_icon/电子健康档案上传情况.png">
                        <p>维修记录</p></a>
                    <a  onclick="goToPage('${ctx}/center/repairQuality', false, [2])"><img src="${btx}/img/menu_icon/维修合格证.png">
                        <p>维修合格证</p></a>
                    <%--<a  onclick="goToPage('${ctx}/center/companyPost', false, [2])"><img src="${btx}/img/menu_icon/人才需求.png">--%>
                        <%--<p>人才招聘</p></a>--%>
                    <a  onclick="goToPage('${ctx}/government/10281005', true)"><img src="${btx}/img/menu_icon/开业停业咨询.png">
                        <p>开业/停业咨询</p></a>
                    <a  onclick="goToPage('${ctx}/business/parts', true)"><img src="${btx}/img/menu_icon/配件需求.png">
                        <p>配件需求</p></a>
                    <a  onclick="goToPage('${ctx}/business/equip', true)"><img src="${btx}/img/menu_icon/汽保设备需求.png">
                        <p>汽保设备需求</p></a>
                    <a href="/cdf" target="_blank"><img src="${btx}/img/menu_icon/技术信息.png">
                        <p>技术需求</p></a>
                </div>
                <div class="submenu gover-center_menu">
                    <a  onclick="goToPage('${ctx}/center/recordCompInfo', false, [3,7])"><img src="${btx}/img/menu_icon/电子健康档案.png">
                        <p>电子健康档案</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281001', true)"><img src="${btx}/img/menu_icon/法律法规.png">
                        <p>法律法规</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281002', true)"><img src="${btx}/img/menu_icon/管理规范.png">
                        <p>管理规范</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281003', true)"><img src="${btx}/img/menu_icon/行业政策.png">
                        <p>行业政策</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281004', true)"><img src="${btx}/img/menu_icon/技术标准.png">
                        <p>技术标准</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281005', true)"><img src="${btx}/img/menu_icon/办事指南.png">
                        <p>办事指南</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281006', true)"><img src="${btx}/img/menu_icon/管理职责.png">
                        <p>管理职责</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281007', true)"><img src="${btx}/img/menu_icon/行业概况.png">
                        <p>行业概况</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281010', true)"><img src="${btx}/img/menu_icon/行业文明建设.png">
                        <p>行业文明建设</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281009', true)"><img src="${btx}/img/menu_icon/优质企业.png">
                        <p>优质企业</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281017', true)"><img src="${btx}/img/menu_icon/违法违规公告.png">
                        <p>违法违规公告</p></a>
                    <a  onclick="goToPage('${ctx}/government/10281016', true)"><img src="${btx}/img/menu_icon/质量信誉考核.png">
                        <p>质量信誉考核</p></a>
                </div>
                <div class="submenu association-center_menu">
                    <a  onclick="goToPage('${ctx}/assoinfo/summary', true)"><img src="${btx}/img/menu_icon/协会简介.png">
                        <p>协会简介</p></a>
                    <a  onclick="goToPage('${ctx}/assoinfo/function', true)"><img src="${btx}/img/menu_icon/协会职能.png">
                        <p>协会职能</p></a>
                    <a  onclick="goToPage('${ctx}/industry/10281013', true)"><img src="${btx}/img/menu_icon/工作动态.png">
                        <p>工作动态</p></a>
                    <a  onclick="goToPage('${ctx}/industry/10281014', true)"><img src="${btx}/img/menu_icon/行业风采.png">
                        <p>行业风采</p></a>
                    <a  onclick="goToPage('${ctx}/industry/10281008', true)"><img src="${btx}/img/menu_icon/行业能手.png">
                        <p>行业能手</p></a>
                    <a  onclick="goToPage('${ctx}/industry/10281015', true)"><img src="${btx}/img/menu_icon/行业党建.png">
                        <p>行业党建</p></a>
                    <a  onclick="goToPage('${ctx}/specialist', true)"><img src="${btx}/img/menu_icon/专家组.png">
                        <p>专家组</p></a>
                </div>
                <div class="submenu talent-center_menu">
                    <%--<a  onclick="goToPage('${ctx}/center/searchJobsByCondition', false, [1])"><img src="${btx}/img/menu_icon/投放简历.png">--%>
                    <%--<p>找工作</p></a>--%>
                    <%--<a  onclick="goToPage('${ctx}/center/companyPost', false, [2])"><img src="${btx}/img/menu_icon/人才需求.png">--%>
                    <%--<p>岗位发布</p></a>--%>
                    <%--<a  onclick="goToPage('${ctx}/center/resumeSearch', false, [2])"><img src="${btx}/img/menu_icon/简历搜索.png">--%>
                    <%--<p>简历搜索</p></a>--%>
                    <a  onclick="goToPage('${ctx}/business/train', true)"><img src="${btx}/img/menu_icon/培训需求.png">
                        <p>培训需求</p></a>
                    <%--<a  onclick="goToPage('${ctx}/recommend', true)"><img src="${btx}/img/menu_icon/优质企业推荐.png">--%>
                    <%--<p>优质企业推荐</p></a>--%>
                </div>
                <div class="submenu relate-center_menu">
                    <a  onclick="goToPage('${ctx}/business/parts', true)"><img src="${btx}/img/menu_icon/汽车配件.png">
                        <p>汽车配件</p></a>
                    <a  onclick="goToPage('${ctx}/center/companyPost', false, [2])"><img src="${btx}/img/menu_icon/人才需求.png">
                        <p>人才需求</p></a>
                    <a  onclick="goToPage('${ctx}/business/train', true)"><img src="${btx}/img/menu_icon/相关培训.png">
                        <p>相关培训</p></a>
                    <%--<a  onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/商务合作.png">--%>
                    <a  onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/商务合作.png">
                        <p>商务合作</p></a>
                    <a  onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/数据需求.png">
                        <p>数据需求</p></a>
                    <a  onclick="goToPage('${ctx}/business/books', true)"><img src="${btx}/img/menu_icon/汽车读物.png">
                        <p>汽车读物</p></a>
                    <a  onclick="goToPage('${ctx}/business/insure', true)"><img src="${btx}/img/menu_icon/汽车保险.png">
                        <p>汽车保险</p></a>
                    <a  onclick="goToPage('${ctx}/business/consum', true)"><img src="${btx}/img/menu_icon/汽车用品.png">
                        <p>汽车用品</p></a>
                    <a  onclick="goToPage('${ctx}/business/equip', true)"><img src="${btx}/img/menu_icon/汽保设备.png">
                        <p>汽保设备</p></a>
                    <a  onclick="goToPage('${ctx}/business/sell', true)"><img src="${btx}/img/menu_icon/汽车销售.png">
                        <p>汽车销售</p></a>
                </div>
                <div class="submenu business-center_menu">
                    <%--<a  onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/在线商务.png">--%>
                    <a  onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/在线商务.png">
                        <p>在线商务</p></a>
                    <%--<a  onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/商务合作.png">--%>
                    <a  onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/商务合作.png">
                        <p>商务合作</p></a>
                </div>
                <div class="submenu supervise-center_menu">
                    <a  onclick="goToPage('${ctx}/supervision/questions', true)"><img src="${btx}/img/menu_icon/满意度调查.png">
                        <p>满意度调查</p></a>
                    <a  onclick="goToPage('${ctx}/supervision/complain', true)"><img src="${btx}/img/menu_icon/维修投诉.png">
                        <p>维修反馈</p></a>
                </div>
                <div class="submenu data-center_menu">
                    <%--<a  onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/在线商务.png">--%>
                    <%--<a  onclick=""><img src="${btx}/img/menu_icon/在线商务.png">--%>
                    <%--<p>在线商务</p></a>--%>
                    <%--&lt;%&ndash;<a  onclick="goToPage('${ctx}/cooperate')"><img src="${btx}/img/menu_icon/商务合作.png">&ndash;%&gt;--%>
                    <%--<a  onclick="goToPage('${ctx}/partner', true)"><img src="${btx}/img/menu_icon/商务合作.png">--%>
                    <%--<p>商务合作</p></a>--%>
                    <a href="/partner" target="_blank"><img src="${btx}/img/menu_icon/二手车市场.png">
                        <p>二手车服务</p></a>
                    <a href="/partner" target="_blank"><img src="${btx}/img/menu_icon/车辆保险.png">
                        <p>保险数据服务</p></a>
                </div>
            </div>
            <div class="right">
                <div class="title"><div><h1>维修服务查询</h1><p>快速定位，为您提供满意的服务</p></div></div>
                <div class="query">
                    <div class="input">
                        <div class="layui-input-inline search_select selSearchOptionHoverlist" id="selSearchOption"
                             style="width: 19%;" data-value="1"
                             data-tit="搜附近" data-type="sortField">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="搜附近" value="" readonly=""
                                           class="layui-unselect"><i
                                        class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit"
                                    style="text-align: center;">
                                    <dd data-value="1">
                                        搜附近
                                    </dd>
                                    <dd data-value="2">
                                        搜企业
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <input placeholder="输入维修企业名称/地址" id="topSearch">
                    </div>
                    <div class="select">
                        <div class="layui-input-inline search_select hoverlist2" id="companySort"
                             data-value=""
                             data-tit="企业排序" data-type="sortField">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input id="compsort" type="text" placeholder="企业排序" value="" readonly=""
                                           class="layui-input layui-unselect"><i
                                        class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit"
                                    style="text-align: center;">
                                    <%--<dd data-value="1">--%>
                                    <%--<i class="layui-icon">&#xe605;</i> <span>离我最近</span>--%>
                                    <%--</dd>--%>
                                    <dd data-value="2">
                                        <i class="layui-icon radio">&#xe63f;</i>
                                        <span>信誉等级</span>
                                    </dd>
                                    <dd data-value="3">
                                        <i class="layui-icon radio">&#xe63f;</i> <span>服务评价</span>
                                    </dd>
                                    <dd data-value="4">
                                        <i class="layui-icon radio">&#xe63f;</i> <span>分数等级</span>
                                    </dd>

                                </dl>
                            </div>
                        </div>

                        <div class="layui-input-inline search_select hoverlist3" id="companyCategory"
                             data-value=""
                             data-tit="企业类型" data-type="type">
                            <div class="layui-unselect layui-form-select qylx">
                                <div class="layui-select-title">
                                    <input id="compType" type="text" placeholder="企业类型" value="" readonly=""
                                           class="layui-input layui-unselect"><i
                                        class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <%--<c:forEach items="${typeList }" var="item" varStatus="state">--%>
                                    <dd data-value="43">
                                        <i class="layui-icon radio">&#xe63f;</i> <span>一类维修企业</span>
                                    </dd>
                                    <dd data-value="44">
                                        <i class="layui-icon radio">&#xe63f;</i> <span>二类维修企业</span>
                                    </dd>
                                    <dd data-value="45">
                                        <i class="layui-icon radio">&#xe63f;</i> <span>三类维修业户</span>
                                    </dd>
                                    <dd data-value="46">
                                        <i class="layui-icon radio">&#xe63f;</i> <span>摩托车维修业户</span>
                                    </dd>
                                    <dd data-value="47">
                                        <i class="layui-icon radio">&#xe63f;</i> <span>汽车快修业户</span>
                                    </dd>
                                    <%--</c:forEach>--%>
                                </dl>
                            </div>
                        </div>

                        <div class="layui-input-inline search_select hoverlist4" id="companyArea"
                             data-value=""
                             data-tit="企业区域" data-type="area">
                            <div class="layui-unselect layui-form-select">
                                <div class="layui-select-title">
                                    <input type="text" placeholder="企业区域" value="" readonly=""
                                           class="layui-input layui-unselect">
                                    <i class="layui-edge"></i>
                                </div>
                                <dl class="layui-anim layui-anim-upbit">
                                    <dd data-value="" class=""><i class="layui-icon radio">&#xe63f;</i> <span>全部</span></dd>
                                    <dd data-value="310101" class=""><i class="layui-icon radio">&#xe63f;</i> <span>黄浦区</span>
                                    </dd>
                                    <%--<dd data-value="310103" class=""><i class="layui-icon radio">&#xe63f;</i> <span>卢湾区</span></dd>--%>
                                    <dd data-value="310104" class=""><i class="layui-icon radio">&#xe63f;</i> <span>徐汇区</span>
                                    </dd>
                                    <dd data-value="310105" class=""><i class="layui-icon radio">&#xe63f;</i> <span>长宁区</span>
                                    </dd>
                                    <dd data-value="310106" class=""><i class="layui-icon radio">&#xe63f;</i> <span>静安区</span>
                                    </dd>
                                    <dd data-value="310107" class=""><i class="layui-icon radio">&#xe63f;</i> <span>普陀区</span>
                                    </dd>
                                    <%--<dd data-value="310108" class=""><i class="layui-icon radio">&#xe63f;</i> <span>闸北区</span></dd>--%>
                                    <dd data-value="310109" class=""><i class="layui-icon radio">&#xe63f;</i> <span>虹口区</span>
                                    </dd>
                                    <dd data-value="310110" class=""><i class="layui-icon radio">&#xe63f;</i> <span>杨浦区</span>
                                    </dd>
                                    <dd data-value="310112" class=""><i class="layui-icon radio">&#xe63f;</i> <span>闵行区</span>
                                    </dd>
                                    <dd data-value="310113" class=""><i class="layui-icon radio">&#xe63f;</i> <span>宝山区</span>
                                    </dd>
                                    <dd data-value="310114" class=""><i class="layui-icon radio">&#xe63f;</i> <span>嘉定区</span>
                                    </dd>
                                    <dd data-value="310115" class=""><i class="layui-icon radio">&#xe63f;</i> <span>浦东新区</span>
                                    </dd>
                                    <dd data-value="310116" class=""><i class="layui-icon radio">&#xe63f;</i> <span>金山区</span>
                                    </dd>
                                    <dd data-value="310117" class=""><i class="layui-icon radio">&#xe63f;</i> <span>松江区</span>
                                    </dd>
                                    <dd data-value="310118" class=""><i class="layui-icon radio">&#xe63f;</i> <span>青浦区</span>
                                    </dd>
                                    <%--<dd data-value="310119" class=""><i class="layui-icon radio">&#xe63f;</i> <span>南汇区</span></dd>--%>
                                    <dd data-value="310120" class=""><i class="layui-icon radio">&#xe63f;</i> <span>奉贤区</span>
                                    </dd>
                                    <dd data-value="310230" class=""><i class="layui-icon radio">&#xe63f;</i> <span>崇明区</span>
                                    </dd>

                                </dl>
                            </div>
                        </div>

                        <div class="layui-input-inline search_select brand_select" id="carBrand"
                             data-value=""
                             data-tit="车辆品牌" data-type="magor_brands_lk">
                            <div data-toggle="select" class="brandselect selectsigle"
                                 style="z-index: 40;">
                                <div class="select-selected" data-type="name" data-key="0">
                                    <span>车辆品牌</span><i class="icon10 icon10-sjb"></i>
                                </div>
                                <div class="select-option layui-anim layui-anim-upbit"
                                     data-type="list">
                                    <div class="select-box">
                                        <div class="select-box-title">
                                            <ul>
                                                <li class="name">选择车辆品牌</li>
                                            </ul>
                                            <a class="clear">清空选择</a>
                                        </div>
                                        <div class="select-box-content">
                                            <div class="box-content-dl box-content-brand"
                                                 id="auto-index-usedcarbrand">
                                                <div class="brand-index">
                                                    <c:forEach items="${brandlist }" var="item"
                                                               varStatus="state">
                                                        <a class="${state.index == 0?'selected':'' }">${item.lat }</a>
                                                    </c:forEach>
                                                </div>
                                                <div data-type="brand" class="select-dl">
                                                    <c:forEach items="${brandlist }" var="item"
                                                               varStatus="stat">
                                                        <dl class="town-con-dl">
                                                            <dt>${item.lat }</dt>
                                                            <dd class="town-btn">
                                                                <c:forEach items="${item.brands }" var="brand"
                                                                           varStatus="state">
                                                                    <a href="javascript:void(0);" data-key="${brand.id }"
                                                                       data-value="${brand.name }"><i class="layui-icon">&#xe605;</i>
                                                                        <span>${brand.name }</span></a>
                                                                </c:forEach>
                                                            </dd>
                                                        </dl>
                                                    </c:forEach>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="button"  onclick="doSearch()">查询</div>
                    </div>
                </div>
                <div class="msg">
                    <div class="owner">
                        <div class="tit">
                            <img src="${btx}/img/车主服务中心图标.png">
                            <p>车主</p>
                            <p>服务</p>
                            <p>中心</p>
                        </div>
                        <ul>
                            <li onclick="goToPage('/center/applyList', false, [1,2,3,4,5,6,7])"><a >爱车档案</a></li>
                            <li onclick="goToPage('${ctx}/center/myOrders', false, [1,2,3,4,5,6,7])"><a >我的预约服务</a></li>
                            <li onclick="goToPage('${ctx}/center/myQuestions', false, [1,2,3,4,5,6,7])"><a >我的咨询</a></li>
                            <li><a href="/statics/tips.pdf" target="_blank">爱车小贴士</a></li>
                        </ul>
                    </div>
                    <div class="doctor">
                        <div class="tit"><p>车大夫门诊</p></div>
                        <ul class="tag">
                            <li id="gather" class="button active">问题集锦</li>
                            <%--<li id="refer" class="button">热门问题</li>--%>
                            <li id="professor" class="button">专家团</li>
                            <li id="commit" class="button" style="background-color: #e86d1c;">
                                <a href="/cdf" target="_blank">在线咨询</a>
                            </li>
                        </ul>
                        <div class="doctor_content active" id="gather_content">
                            <ul>
                                <c:forEach items="${questList}" var="item" varStatus="state" end="4">
                                    <li  onclick="goToPage('${ctx}/cdf/answerQuestion?id=${item.ID}', true)">${item.CONTENT}</li>
                                </c:forEach>
                            </ul>
                            <a  onclick="goToPage('${ctx}/cdf', true)" class="list_button">浏览更多</a>
                        </div>
                        <%--<div class="doctor_content" id="refer_content">--%>
                        <%--<ul>--%>
                        <%--<li  onclick="goToPage('${ctx}/cdf/answerQuestion?id=${hotQuest.ID }', true)">--%>
                        <%--${hotQuest.CONTENT}--%>
                        <%--</li>--%>
                        <%--</ul>--%>
                        <%--<a  onclick="goToPage('${ctx}/cdf', true)" class="list_button">浏览更多</a>--%>
                        <%--</div>--%>
                        <div class="doctor_content" id="professor_content">
                            <ul >
                                <c:forEach items="${experts}" var="item" varStatus="state" end="4">
                                    <li onclick="goToPage('${ctx}/cdf/expert/${item.EXPERT_ID}', true)">${item.NAME}</li>
                                </c:forEach>
                            </ul>
                            <a  onclick="goToPage('${ctx}/specialist', true)" class="list_button">浏览更多</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <%--<div class="info">--%>
        <%--<ul class="title">--%>
        <%--<li style="width: 40%">新闻动态</li>--%>
        <%--<li style="width: 60%">行业管理</li>--%>
        <%--</ul>--%>
        <%--<div class="content">--%>
        <%--<div class="left">--%>
        <%--<figure id="banner2" class="swipslider">--%>
        <%--<ul class="sw-slides">--%>
        <%--<li class="sw-slide">--%>
        <%--<a href="/queryRepairCompany" >--%>
        <%--<img src="${btx}/img/temp/luntai.png">--%>
        <%--<p>夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉</p>--%>
        <%--</a>--%>
        <%--</li>--%>
        <%--</ul>--%>
        <%--</figure>--%>
        <%--</div>--%>
        <%--<div class="right">--%>
        <%--<ul class="label" style="font-size: 16px">--%>
        <%--<li id="news1" class="active">法律法规</li>--%>
        <%--<li id="news2">管理规范</li>--%>
        <%--<li id="news3">行业政策</li>--%>
        <%--<li id="news4">技术标准</li>--%>
        <%--<li id="news5">办事指南</li>--%>
        <%--<li id="news6">行业概况</li>--%>
        <%--<li id="news7">文明建设</li>--%>
        <%--</ul>--%>
        <%--<div class="info_content active" id="news1_content">--%>
        <%--&lt;%&ndash;<img src="${btx}/img/temp/luntai.png">&ndash;%&gt;--%>
        <%--<ul>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--<div class="info_content" id="news2_content">--%>
        <%--&lt;%&ndash;<img src="${btx}/img/temp/luntai.png">&ndash;%&gt;--%>
        <%--<ul>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--<div class="info_content" id="news3_content">--%>
        <%--&lt;%&ndash;<img src="${btx}/img/temp/luntai.png">&ndash;%&gt;--%>
        <%--<ul>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--<div class="info_content" id="news4_content">--%>
        <%--&lt;%&ndash;<img src="${btx}/img/temp/luntai.png">&ndash;%&gt;--%>
        <%--<ul>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--<div class="info_content" id="news5_content">--%>
        <%--&lt;%&ndash;<img src="${btx}/img/temp/luntai.png">&ndash;%&gt;--%>
        <%--<ul>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--<div class="info_content" id="news6_content">--%>
        <%--&lt;%&ndash;<img src="${btx}/img/temp/luntai.png">&ndash;%&gt;--%>
        <%--<ul>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--<div class="info_content" id="news7_content">--%>
        <%--&lt;%&ndash;<img src="${btx}/img/temp/luntai.png">&ndash;%&gt;--%>
        <%--<ul>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>

        <div class="news">
            <div class="block block1">
                <div class="title"><h1>新闻动态</h1><a href="/government/10281019">更多</a></div>
                <figure id="banner2" class="swipslider">
                    <ul class="sw-slides">
                        <li class="sw-slide">
                            <a href="/queryRepairCompany" >
                                <div class="head">夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉夏日酷暑为汽修一线员工送清凉</div>

                                <img src="${btx}/img/temp/luntai.png">
                            </a>
                        </li>
                    </ul>
                </figure>
            </div>
            <div class="block block2">

                <div class="title"><h1>管理动态</h1><a href="/government/10281020">更多</a></div>

                <div class="best best1">
                    <div class="left">最新</div>
                    <ul>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                    </ul>
                </div>
                <div class="best best2">
                    <div class="left hot">最热</div>
                    <ul>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                        <%--<li>加强与保险行业信息共享加强与保险行业信息共享</li>--%>
                    </ul>
                </div>
            </div>
            <div class="block block3">

                <div class="title"><h1>行业监管</h1><a href="/government/10281001">更多</a></div>

                <a class="article article1">
                    <h3>关于印发《上海市汽车维修电子健康档案系统建设》</h3>
                    <p>根据《交通运输部办公厅关于开展电子健康档案系统建设工作的通知》根据《交通运输部办公厅关于开展电子健康档案系统建设工作的通知》根据《交通运输部办公厅关于开展电子健康档案系统建设工作的通知》根据《交通运输部办公厅关于开展电子健康档案系统建设工作的通知》根据《交通运输部办公厅关于开展电子健康档案系统建设工作的通知》</p>
                </a>
                <a class="article article2">
                    <h3>关于印发《上海市汽车维修电子健康档案系统建设》</h3>
                    <p>根据《交通运输部办公厅关于开展电子健康档案系统建设工作的通知》</p>
                </a>
                <a class="article article3">
                    <h3>关于印发《上海市汽车维修电子健康档案系统建设》</h3>
                    <p>根据《交通运输部办公厅关于开展电子健康档案系统建设工作的通知》</p>
                </a>
            </div>
        </div>
    </div>
</div>

<div class="mid center">
    <div class="content">
        <ul class="cooperator">
            <li><a>指导部门：上海市城市交通运输管理处</a></li>
            <li><a>主办单位：上海市汽车维修行业协会</a></li>
            <li><a href="/aboutUs">承办单位：上海蓝速汽车技术有限公司</a></li>
        </ul>

    </div>
</div>

<div class="index-icon isShow" type="button" id="infoAcquisition">
    <i class="layui-icon"></i>
    <p style="font-size: 9px; color:orangered;">企业员工信息</p>
</div>

<%--<div class="gongao" style="font-size: 12px;padding: 10px;width:150px;position: fixed;right: 5px;top:140px;background-color: white">--%>
<%--苹果手机APP正在上线审核中，请先关注微信公众号“上海汽修平台”！--%>
<%--</div>--%>

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
            <span>copyright 2017 上海蓝速汽车技术有限公司 All rights reserved</span> |
            <span> 沪ICP备17039665号-1 </span> |
            <span> 沪公网安备 310000039060-18001 </span>
        </div>
    </div>
</div>
<%--<script src="${btx}/js/lib/jquery-3.2.1.min.js"></script>--%>
<script src="${btx}/js/jquery-1.10.2.min.js"></script>
<script src="${btx}/js/lib/jquery.easydropdown.js"></script>
<script src="${btx}/js/lib/swipeslider.min.js"></script>

<script src="/statics/js/layui-2.3.0/layui.all.js"></script>
<script src="${btx}/js/superfish.min.js"></script>
<script src="${btx}/js/common.js"></script>

<script src="${btx}/js/loading.js"></script>
<script>

    $(function () {
//        //315 banner
////        $("#315banner-1").slideDown('slow')
//        setTimeout(function () {
//            $("#315banner-1").slideUp('slow')
//            $("#315banner-2").slideDown('slow')
//        },1000)
//        $("#315banner-2 div").click(function () {
//            $("#315banner-2").slideUp('slow')
//        })

        $(".qr").hover(function () {
            $(this).children("img").show()
        })
        $(".qr").mouseleave(function () {
            $(this).children("img").hide()
        })



        menuHover(".owner-center")
        menuHover(".com-center")
        menuHover(".gover-center")
        menuHover(".association-center")
        menuHover(".talent-center")
        menuHover(".relate-center")
        menuHover(".business-center")
        menuHover(".supervise-center")
        menuHover(".data-center")
        menuHover(".healthcare-record")

        doctorHover("#refer")
        doctorHover("#professor")
        doctorHover("#gather")


        $(".center").show()
        $('#banner').swipeslider({
            transitionDuration: 600,
            autoPlayTimeout: 8000,
            sliderHeight: '300px',
            autoPlay: true,
//            prevNextButtons: false,
//            bullets: false
        });



        function getAjaxData(type, num) {
            $('.info .left').loading({
                loadingWidth: 240,
                title: '正在努力加载中...',
                name: 'loading',
                discription: '正在努力加载中...',
                direction: 'row',
                type: 'origin',
                //originBg:'#71EA71',
                originDivWidth: 30,
                originDivHeight: 30,
                originWidth: 4,
                originHeight: 4,
                smallLoading: false,
                //titleColor:'#388E7A',
                loadingBg: 'rgba(0, 0, 0, 0.4)',
                loadingMaskBg: 'rgba(22,22,22,0.2)'
            });

            var params = {
                page: 1,
                limit: 6,
                info_type_eq: type
            };
            var str = '';
            var url = "${ctx}/government/getGoverPageList";
            ajaxEvent(url, params, function (ret) {
                var datas = ret.data;
                for (var i = 0; i < datas.length; i++) {
                    str += '<li><a href="${ctx}/government/detail/' + datas[i].INFO_ID + '">' + datas[i].TITLE + '</a>' + '</li>';
                }
                $('#news' + num + '_content ul').html(str);
                removeLoading('loading');
            });
        }


        ajaxEvent("${ctx}/government/getGoverPageList", {page: 1, limit: 6, info_type_eq: '10281019'}, function (ret) {
            var datas = ret.data;
            var str = '';
            for (var i = 0; i < datas.length; i++) {
                str += '<li class="sw-slide">' +
                    '<a href="${ctx}/government/detail/' + datas[i].INFO_ID + '">' +
                    '<div>'+datas[i].TITLE+'</div>' +
                    '<img src="'+ (datas[i].PHOTO|| '${btx}/img/temp/luntai.png') +'">' +
                    '</a>' +
                    '</li>';
            }
//            $(".block1 .title a").attr("href", "/government/10281019")
            $('#banner2 .sw-slides').html(str);
            $('#banner2').swipeslider({
                transitionDuration: 600,
                autoPlayTimeout: 8000,
                sliderHeight: '300px',
                autoPlay: true,
//            prevNextButtons: false,
                bullets: false
            });
            removeLoading('loading');
        });

        ajaxEvent("${ctx}/government/getGoverPageList", {page: 1, limit: 5, info_type_eq: '10281020'}, function (ret) {
            var datas = ret.data;
            var str = '',num2=[], list2=[];
            ajaxEvent("${ctx}/government/getGoverPageList", {page: 1, limit: 5, info_type_eq: '10281013'}, function (res) {
                var allDatas= datas.concat(res.data)
                allDatas.sort(function (a,b) {
                    return (new Date(a.CREATE_TIME|| 0) > new Date(b.CREATE_TIME || 0))? -1: 1
                })
//                console.log(allDatas)

                if(allDatas.length){
                    for (var i = 0; i < allDatas.length; i++) {
                        str += '<a href="${ctx}/government/detail/' + allDatas[i].INFO_ID + '">'+allDatas[i].TITLE+'</a>'
                    }
//                $(".block2 .title a").attr("href", "/government/10281020")
                    $(".block2 .best1 ul").html(str)


                    str=''
                    list2= allDatas
                    for (var j in list2){
                        var temp={}
                        var randomIndex = Math.floor(Math.random()*(list2.length-1));
                        temp=list2[j]
                        list2[j]= list2[randomIndex]
                        list2[randomIndex]= temp
                    }
                    for (var i = 0; i < list2.length; i++) {
                        str += '<a href="${ctx}/government/detail/' + list2[i].INFO_ID + '">'+list2[i].TITLE+'</a>'
                    }
                    $(".block2 .best2 ul").html(str)
                }
            })


        })

//        $(".block3 .title a").attr("href", "/government/10281016")

//        systemCall(function (systok) {
        ajaxEvent("${ctx}/government/getGoverPageList", {page: 1, limit: 1, info_type_eq: '10281006'}, function (ret) {
            $(".article1").attr("href", "${ctx}/government/detail/" + ret.data[0].INFO_ID )
            $(".article1 h3").text(ret.data[0].TITLE)
            $(".article1 p").text(ret.data[0].CONTENT)

        })
        ajaxEvent("${ctx}/government/getGoverPageList", {page: 1, limit: 1, info_type_eq: '10281016'}, function (ret) {
            $(".article2").attr("href", "${ctx}/government/detail/" + ret.data[0].INFO_ID )
            $(".article2 h3").text(ret.data[0].TITLE)
            $(".article2 p").text(ret.data[0].CONTENT)
        })
        ajaxEvent("${ctx}/government/getGoverPageList", {page: 1, limit: 1, info_type_eq: '10281017'}, function (ret) {
            $(".article3").attr("href", "${ctx}/government/detail/" + ret.data[0].INFO_ID )
            $(".article3 h3").text(ret.data[0].TITLE)
            $(".article3 p").text(ret.data[0].CONTENT)
        })
//        })



//        getAjaxData('10281001', 1);
        infoHover('#news1');
        infoHover('#news2');
        infoHover('#news3');
        infoHover('#news4');
        infoHover('#news5');
        infoHover('#news6');
        infoHover('#news7');

        // 搜企业/搜附近
        $('.selSearchOptionHoverlist dl dd').click(function () {
            var par = $(this).parents(".search_select");
            $(this).siblings('dd').removeClass('select-this');
            $(this).addClass('select-this');
            var items = '';
            var titleItems = '';
            par.find('dl .select-this').each(function () {
                items = $(this).attr('data-value');
                titleItems = ($(this).text());
            });

            par.attr("data-value", items);
            $('.selSearchOptionHoverlist input').val(titleItems.trim())
            $('#selSearchOption .layui-anim').hide()
        });

        $('#selSearchOption').hover(function () {
            $('#selSearchOption .layui-anim').show()
        }, function () {
            $('#selSearchOption .layui-anim').hide()
        })


        $('#news1').hover(function () {
            if ($('#news' + 1 + '_content ul li').length == 0) {
                getAjaxData('10281001', 1);
            }
        })
        $('#news2').hover(function () {
            if ($('#news' + 2 + '_content ul li').length == 0) {
                getAjaxData('10281002', 2);
            }
        })
        $('#news3').hover(function () {
            if ($('#news' + 3 + '_content ul li').length == 0) {
                getAjaxData('10281003', 3);
            }
        })
        $('#news4').hover(function () {
            if ($('#news' + 4 + '_content ul li').length == 0) {
                getAjaxData('10281004', 4);
            }
        })
        $('#news5').hover(function () {
            if ($('#news' + 5 + '_content ul li').length == 0) {
                getAjaxData('10281005', 5);
            }
        })
        $('#news6').hover(function () {
            if ($('#news' + 6 + '_content ul li').length == 0) {
                getAjaxData('10281007', 6);
            }
        })
        $('#news7').hover(function () {
            if ($('#news' + 7 + '_content ul li').length == 0) {
                getAjaxData('10281010', 7);
            }
        })

        function menuHover(className) {
            $(className + ", " + className + "_menu").hover(function () {
                $(className + ", " + className + "_menu").addClass("active")
            })
            $(className + ", " + className + "_menu").mouseleave(function () {
                $(".link .left ul li, .submenu").removeClass("active")
            })
        }

        function doctorHover(id) {
            $(id).hover(function () {
                $(".link .right .button, .doctor_content").removeClass("active")
                $(id).addClass("active")
                $(id + "_content").addClass("active")
            })
        }

        function infoHover(id) {
            $(id).hover(function () {
                $(".info .right .label li, .info_content").removeClass("active")
                $(id).addClass("active")
                $(id + "_content").addClass("active")
            })
        }

        try{ JSON.parse(localStorage.getItem('USERINFO'));}
        catch (e){
            localStorage.clear()
        }
        var info = JSON.parse(localStorage.getItem('USERINFO'));
        if (info) {
            $('.nickName').text(info.nickname||'');
            $('.unLogin').hide();
            $('.isLogin').show();


            if(info.userRoleId==1){
                $(".goOwner").remove()
            }
            else if (info.showRole==1){
                $(".login .switch a").removeClass("show")
                $(".goOwner").addClass("show")
            }
            $(".login .switch a").click(function () {

                if($(this).hasClass("goOwner")){
                    info.showRole= 1
                }else{
                    info.showRole= info.userRoleId
                }
                localStorage.setItem('USERINFO', JSON.stringify(info))
            })

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
                $('.loginButton').attr('href', '${ctx}/center/runHome');
                $('.loginButton').text('运营商中心');
            }
            if (info.userRoleId == 5) {
                $('.loginButton').attr('href', '${ctx}/cdf/question4Expert');
                $('.loginButton').text('专家中心');
            }
            if (info.userRoleId == 6) {
                $('.loginButton').attr('href', '${ctx}/center/manageNotes');
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


        var isSelectIndex = false;
        $('.hoverlist2 dl dd').click(function () {
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

        $('.hoverlist3 dl dd').click(function () {
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

        $('.hoverlist4 dl dd').click(function () {
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

        $('.brand_select dl dd a').click(function () {
            var par = $(this).parents(".search_select");
            if ($(this).hasClass('select-this')) {
                $(this).removeClass('select-this');
            } else {
                $(this).addClass('select-this');
            }
            var items = [];
            var titleItems = [];
            par.find('dl .select-this').each(function () {
                items.push($(this).attr('data-value'));
                titleItems.push($(this).find('span').text());
            });
            if (titleItems && titleItems.length > 0) {
                par.find('.select-selected span').html(titleItems.join('|'));
                par.attr("title", titleItems.join('|'));
            } else {
                par.find('.select-selected span').html(par.attr('data-tit'));
                par.attr("title", par.attr('data-tit'));
            }

            if (items && items.length > 0) {
                par.attr("data-value", items.join(','));
            } else {
                par.attr("data-value", '');
            }
        });

        $('.brand_select .clear').click(function () {
            var par = $(this).parents(".search_select");
            var bselect = $(this).parents(".brandselect");
            $('.brand_select dl dd a').each(function () {
                if ($(this).hasClass('select-this')) {
                    $(this).removeClass('select-this');
                }
            });
            par.find('.select-selected span').html(par.attr('data-tit'));
            par.attr("data-value", '');
            par.attr("title", par.attr('data-tit'));
        });


        $(".brandselect").mouseleave(function () {
            $(this).removeClass('active');
        })

        $(".brandselect .brand-index a").click(function () {
            $(this).addClass('selected').siblings('a').removeClass('selected');
            isSelectIndex = true;
            setTimeout(function () {
                isSelectIndex = false;
            }, 1000);
            var selChart = $(this).html();
            $(".brandselect .select-dl dl").each(function () {
                var dt = $(this).find('dt');
                var chart = dt.html();
                if (selChart == chart) {
                    $('.brandselect .select-dl').animate({
                        scrollTop: $(this).offset().top - $('.brandselect .select-dl').offset().top + $('.brandselect .select-dl').scrollTop()
                    }, 200);//0.2秒滑动到指定位置
                }
            });
        });

        $('.brandselect .select-dl').on('scroll', function () {
            var me = this;
            if (isSelectIndex) {
                return false;
            }
            var rembObj;
            $(".brandselect .select-dl dl").each(function () {
                if ($(me).scrollTop() >= $(this).offset().top - $(me).offset().top + $(me).scrollTop()) {
                    rembObj = $(this);
                }
            });
            if (rembObj) {
                $(".brandselect .brand-index a").each(function () {
                    var dt = rembObj.find('dt');
                    var chart = dt.html();
                    if (chart == $(this).html()) {
                        $(this).addClass('selected').siblings('a').removeClass('selected');
                    }
                });
            }
        });

        $(".brandselect").mouseover(function () {
            $(this).addClass('active');
        });

        $(document).click(function (event) {
            var dom = $(event.target).parents(".brandselect");
            if (!dom.attr("data-toggle")) {
                $(".brandselect").removeClass('active');
            }
        });

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
                localStorage.removeItem('USERINFO')
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + window.location.pathname;
            })
        });
    }

    function doSearch() {
        var searchOption = $("#selSearchOption").attr('data-value');
        var searchText = $('#topSearch').val();
        var compSort = $("#companySort").attr("data-value");
        var compType = $("#companyCategory").attr("data-value");
        var compArea = $("#companyArea").attr("data-value");
        var carBrand = $("#carBrand").attr("data-value");

        window.location.href = '${ctx}' + '/queryRepairCompany?searchText='
            + searchText
            + '&compSort=' + compSort
            + '&compType=' + compType
            + '&compArea=' + compArea
            + '&carBrand=' + carBrand
            + '&searchOption=' + searchOption
    }

    //企业员工信息
    var info = JSON.parse(localStorage.getItem('USERINFO'));
    $('#infoAcquisition').click(function () {
        if(info && (info.userRoleId == 2 )){
            window.location.href = "/center/companyEmployeeList";
        } else if (info && info.userRoleId != 2 ) {
            layer.msg('对不起，您没有权限访问此功能。', {time: 2000, icon:5});
        } else{
            window.location.href = "" + "/toLogin?reUrl=" + "" + "/center/companyEmployeeList";
        }
    });
</script>
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b39938d4b6925f4528af0f13978a0eb2";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
<style type="text/css">
    .select-box .box-content-dl dl dd a {
        text-align: left;
    }

    .layui-form-select dl dd, .layui-form-select dl dt {
        text-align: left;
    }
    .submenu img{
        width: 36px;
        height: 36px;
    }
</style>
</body>
</html>
