<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <link rel="stylesheet"
          href="//api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css"/>
    <!--
<link rel="stylesheet" href="${btx}/css/banner/banner.css" />
<script src="${btx}/js/jquery.easing.js"></script>
-->
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="frame">

</div>
<div class="zhaoweixiu maintain_index" style="text-align: center">
    <div class="cdf_t">
        <div class="z"></div>
        <div class="m">维修服务</div>
    </div>
    <br/>
    <div class="map">
        <div class="map_l">
            <div class="map_t">
                <%--<select id="selSearchOption">--%>
                    <%--<option value="1">搜附近</option>--%>
                    <%--<option value="2">搜企业</option>--%>
                <%--</select>--%>

                    <div class="layui-input-inline search_select selSearchOptionHoverlist" id="selSearchOption"
                         style="width: 24%;" data-value="1"
                         data-tit="搜附近" data-type="sortField">
                        <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                                <input type="text" placeholder="搜附近" value="" readonly=""
                                       id="searchOption" class="layui-unselect"><i
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

                <input type="text" id="searchtext" placeholder="输入维修企业名称/地址">
                <div id="searchResultPanel"
                     style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
                <input type="hidden" id="hidLat">
                <input type="hidden" id="hidLng">
                <span id="searchbtn"></span>
                <%--<span></span>--%>
                <%--<span></span>--%>
            </div>
            <div class="leixing">
                <div class="layui-form-item">

                    <div class="layui-input-inline search_select hoverlist2"
                         style="width: 24%; margin-right: 3px;" data-value="" id="sortField"
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
                                    <i class="layui-icon">&#xe605;</i> <span>信誉等级</span>
                                </dd>
                                <dd data-value="3">
                                    <i class="layui-icon">&#xe605;</i> <span>服务评价</span>
                                </dd>
                                <dd data-value="4">
                                    <i class="layui-icon">&#xe605;</i> <span>分数等级</span>
                                </dd>

                            </dl>
                        </div>
                    </div>

                    <div class="layui-input-inline search_select hoverlist3" id="companycategory"
                         style="width: 24%; margin-right: 3px;" data-value=""
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
                                    <i class="layui-icon">&#xe605;</i> <span>一类维修企业</span>
                                </dd>
                                <dd data-value="44">
                                    <i class="layui-icon">&#xe605;</i> <span>二类维修企业</span>
                                </dd>
                                <dd data-value="45">
                                    <i class="layui-icon">&#xe605;</i> <span>三类维修业户</span>
                                </dd>
                                <dd data-value="46">
                                    <i class="layui-icon">&#xe605;</i> <span>摩托车维修业户</span>
                                </dd>
                                <dd data-value="47">
                                    <i class="layui-icon">&#xe605;</i> <span>汽车快修业户</span>
                                </dd>
                                <%--</c:forEach>--%>
                            </dl>
                        </div>
                    </div>

                    <div class="layui-input-inline search_select hoverlist4"
                         style="width: 24%; margin-right: 3px;" data-value="" id="comparea"
                         data-tit="企业区域" data-type="area">
                        <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                                <input type="text" placeholder="企业区域" value="" readonly=""
                                       class="layui-input layui-unselect" id="area">
                                <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                                <dd data-value="" class=""><i class="layui-icon">&#xe605;</i> <span>全部</span></dd>
                                <dd data-value="310101" class=""><i class="layui-icon">&#xe605;</i> <span>黄浦区</span>
                                </dd>
                                <%--<dd data-value="310103" class=""><i class="layui-icon">&#xe605;</i> <span>卢湾区</span></dd>--%>
                                <dd data-value="310104" class=""><i class="layui-icon">&#xe605;</i> <span>徐汇区</span>
                                </dd>
                                <dd data-value="310105" class=""><i class="layui-icon">&#xe605;</i> <span>长宁区</span>
                                </dd>
                                <dd data-value="310106" class=""><i class="layui-icon">&#xe605;</i> <span>静安区</span>
                                </dd>
                                <dd data-value="310107" class=""><i class="layui-icon">&#xe605;</i> <span>普陀区</span>
                                </dd>
                                <%--<dd data-value="310108" class=""><i class="layui-icon">&#xe605;</i> <span>闸北区</span></dd>--%>
                                <dd data-value="310109" class=""><i class="layui-icon">&#xe605;</i> <span>虹口区</span>
                                </dd>
                                <dd data-value="310110" class=""><i class="layui-icon">&#xe605;</i> <span>杨浦区</span>
                                </dd>
                                <dd data-value="310112" class=""><i class="layui-icon">&#xe605;</i> <span>闵行区</span>
                                </dd>
                                <dd data-value="310113" class=""><i class="layui-icon">&#xe605;</i> <span>宝山区</span>
                                </dd>
                                <dd data-value="310114" class=""><i class="layui-icon">&#xe605;</i> <span>嘉定区</span>
                                </dd>
                                <dd data-value="310115" class=""><i class="layui-icon">&#xe605;</i> <span>浦东新区</span>
                                </dd>
                                <dd data-value="310116" class=""><i class="layui-icon">&#xe605;</i> <span>金山区</span>
                                </dd>
                                <dd data-value="310117" class=""><i class="layui-icon">&#xe605;</i> <span>松江区</span>
                                </dd>
                                <dd data-value="310118" class=""><i class="layui-icon">&#xe605;</i> <span>青浦区</span>
                                </dd>
                                <%--<dd data-value="310119" class=""><i class="layui-icon">&#xe605;</i> <span>南汇区</span></dd>--%>
                                <dd data-value="310120" class=""><i class="layui-icon">&#xe605;</i> <span>奉贤区</span>
                                </dd>
                                <dd data-value="310230" class=""><i class="layui-icon">&#xe605;</i> <span>崇明区</span>
                                </dd>

                            </dl>
                        </div>
                    </div>

                    <div class="layui-input-inline search_select brand_select"
                         style="width: 24%; margin: 0;" data-value="" id="carbrand"
                         data-tit="车辆品牌" data-type="magor_brands_lk">
                        <div data-toggle="select" class="brandselect selectsigle"
                             style="z-index: 40;">
                            <div class="select-selected" data-type="name" data-key="0" id="brand">
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
                </div>
                <div class="jieguo" style="padding: 0px 15px;" id="countResult">
                    <p>
                        <span>查询结果：</span>共 <span id="totalrecords"></span>
                        条记录，请在企业列表或地图中选择
                    </p>
                </div>
                <div class="corpList">
                    <ul class="liebiao_in" id="corplist" style="height:370px">

                    </ul>
                    <div id="pagebar" style="text-align: center; margin-top: 5px;"></div>
                </div>
            </div>
        </div>
        <div id="map_b"></div>
    </div>
</div>


<div style="width: 100%;height: 1px;overflow: hidden"></div>


<div class="layui-form" action="" id="dialog" style="display: none">
    <div class="title">评价企业：<span id="spnReviewCorpName"></span></div>
    <div class="layui-form-item">
        <div id="star1" class="star">
            <span>履约情况</span>
            <ul>
                <li class="on"><a href="javascript:;">1</a></li>
                <li class="on"><a href="javascript:;">2</a></li>
                <li class="on"><a href="javascript:;">3</a></li>
                <li><a href="javascript:;">4</a></li>
                <li><a href="javascript:;">5</a></li>
            </ul>
            <span class="first"><strong>3 分</strong> (一般)</span>
            <span class="second"></span>
            <p></p>
        </div>
    </div>
    <div class="layui-form-item">
        <div id="star2" class="star">
            <span>服务态度</span>
            <ul>
                <li class="on"><a href="javascript:;">1</a></li>
                <li class="on"><a href="javascript:;">2</a></li>
                <li class="on"><a href="javascript:;">3</a></li>
                <li><a href="javascript:;">4</a></li>
                <li><a href="javascript:;">5</a></li>
            </ul>
            <span class="first"><strong>3 分</strong> (一般)</span>
            <span class="second"></span>
            <p></p>
        </div>
    </div>
    <div class="layui-form-item">
        <div id="star3" class="star">
            <span>维修质量</span>
            <ul>
                <li class="on"><a href="javascript:;">1</a></li>
                <li class="on"><a href="javascript:;">2</a></li>
                <li class="on"><a href="javascript:;">3</a></li>
                <li><a href="javascript:;">4</a></li>
                <li><a href="javascript:;">5</a></li>
            </ul>
            <span class="first"><strong>3 分</strong> (一般)</span>
            <span class="second"></span>
            <p></p>
        </div>
    </div>
    <div class="layui-form-item">
        <div id="star4" class="star">
            <span>维修速度</span>
            <ul>
                <li class="on"><a href="javascript:;">1</a></li>
                <li class="on"><a href="javascript:;">2</a></li>
                <li class="on"><a href="javascript:;">3</a></li>
                <li><a href="javascript:;">4</a></li>
                <li><a href="javascript:;">5</a></li>
            </ul>
            <span class="first"><strong>3 分</strong> (一般)</span>
            <span class="second"></span>
            <p></p>
        </div>
    </div>
    <div class="layui-form-item">
        <div id="star5" class="star">
            <span>维修价格</span>
            <ul>
                <li class="on"><a href="javascript:;">1</a></li>
                <li class="on"><a href="javascript:;">2</a></li>
                <li class="on"><a href="javascript:;">3</a></li>
                <li><a href="javascript:;">4</a></li>
                <li><a href="javascript:;">5</a></li>
            </ul>
            <span class="first"><strong>3 分</strong> (一般)</span>
            <span class="second"></span>
            <p></p>
        </div>
    </div>
    <div class="layui-form-item layui-form-text">
            <%--<textarea name="desc" placeholder="请输入内容" class="layui-textarea" id="txtReview"></textarea>--%>
    </div>
    <div class="layui-form-item">
        <div class="" style="text-align: right;margin-right: 10px">
            <button class="layui-btn" onclick="submitReview()">立即提交</button>
        </div>
    </div>
</div>
<div class="img-b"></div>
<div class="img-c"></div>
<div class="img-border"></div>
<%--<div class="index-icon isShow" type="button" id="infoAcquisition">--%>
    <%--<i class="layui-icon">&#xe613;</i>--%>
    <%--<p style="font-size: 9px; color:orangered;">企业员工信息</p>--%>
<%--</div>--%>

<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>

<script type="text/javascript"
        src="//api.map.baidu.com/api?v=2.0&ak=hUrYR4hH5XExjuf6qHt7TLDhyqM08GYF"></script>
<script type="text/javascript"
        src="//api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
<script src="${btx}/js/front/queryRepairCompany.js" type="text/javascript"></script>
<script type="text/javascript">
    var info = JSON.parse(localStorage.getItem('USERINFO'));

//    if(info && (info.userRoleId == 2 || info.userRoleId == 3 || info.userRoleId == 7)){
//        $('#infoAcquisition').removeClass('isShow');
//    }




//    if(info && (info.userRoleId == 2 || info.userRoleId == 3 || info.userRoleId == 7)){
        $('#infoAcquisition').click(function () {
            console.log(2222222)
            if(info && (info.userRoleId == 2 || info.userRoleId == 3 || info.userRoleId == 7)){
                window.location.href = "center/companyEmployeeList";
            } else if (info && info.userRoleId != 2 && info.userRoleId != 3 && info.userRoleId != 7) {
            } else{
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + "${ctx}" + "/center/companyEmployeeList";
            }
        });
//    }


    $(".toLogin").click(function () {
        if (!localStorage.getItem('ACCESSTOKEN')) {
            window.location.href = 'toLogin?reUrl=' + '${memberUri}';
        }

        if (!localStorage.getItem('accessToken')) {
            window.location.href = 'toLogin?reUrl=' + '${memberUri}';
        }

        var strUserInfo = localStorage.getItem("USERINFO");
        if (!strUserInfo) {
            window.location.href = 'toLogin?reUrl=' + '${memberUri}';
        }

        var objUserInfo = strUserInfo ? JSON.parse(strUserInfo):null;
        if(!objUserInfo){
            window.location.href = 'toLogin?reUrl=' + '${memberUri}';
        }

        switch (JSON.parse(localStorage.getItem("USERINFO")).userRoleId) {
            case 1:
                window.location.href = 'center/applyList';
                break
//                    case 2: window.location.href = 'center/companyRecord';break
            case 2:
                window.location.href = 'center/repairInfo';
                break
            case 3:
                window.location.href = 'center/manageRecord';
                break
            default:

        }
    })

    $('.selSearchOptionHoverlist dl dd').click(function(){
        var par = $(this).parents(".search_select");
            $(this).siblings('dd').removeClass('select-this');
            $(this).addClass('select-this');
        var items = '';
        var titleItems = '';
        par.find('dl .select-this').each(function(){
            items = $(this).attr('data-value');
            titleItems = ($(this).text());
        });

        par.attr("data-value",items);
        $('.selSearchOptionHoverlist input').val(titleItems.trim())
        $('#selSearchOption .layui-anim').hide()
    });

    $('#selSearchOption').hover( function(){
        $('#selSearchOption .layui-anim').show()
    }, function(){
        $('#selSearchOption .layui-anim').hide()
    } )


     function myStar(id, iScore, iStar) {
        var oStar = document.getElementById(id);
        var aLi = oStar.getElementsByTagName("li");
        var oUl = oStar.getElementsByTagName("ul")[0];
        var oSpan = oStar.getElementsByTagName("span")[1];
        var oSpan2 = oStar.getElementsByTagName("span")[2];
        var oP = oStar.getElementsByTagName("p")[0];
        var i = 0;
        var aMsg = [
            "极差",
            "失望",
            "一般",
            "满意",
            "惊喜"
        ]
        for (i = 1; i <= aLi.length; i++) {
            aLi[i - 1].index = i;
            //鼠标移过显示分数
            aLi[i - 1].onmouseover = function () {
                var returnData = fnPoint(this.index,iScore,iStar,aLi);
                iScore = returnData[0]
                iStar = returnData[1]
                //浮动层显示
                oSpan2.style.display = "inline-block";
                oSpan.style.display = "none";
//                //计算浮动层位置
//                oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
                //匹配浮动层文字内容
//                oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1] + "</em>" + aMsg[this.index - 1]
                oSpan2.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1] + ")"
            };
            //鼠标离开后恢复上次评分
            aLi[i - 1].onmouseout = function () {
                var returnData = fnPoint(null,iScore,iStar,aLi);
                iScore = returnData[0]
                iStar = returnData[1]
                //关闭浮动层
                oSpan2.style.display = "none";
                oSpan.style.display = "inline-block";
            };
            //点击后进行评分处理
            aLi[i - 1].onclick = function () {
                iStar = this.index;
                oSpan.style.display = "inline-block";
                oSpan2.style.display = "none";
                oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1] + ")"
            }
        }
    };

    //评分处理
    function fnPoint(iArg,iScore,iStar,aLi) {
        //分数赋值
        iScore = iArg || iStar;
        for (var i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
        return [iScore, iStar]
    }

    new myStar('star1',3,3)
    new myStar('star2',3,3)
    new myStar('star3',3,3)
    new myStar('star4',3,3)
    new myStar('star5',3,3)
</script>
<style>
    div#tangram-suggestion--TANGRAM__1r-main {
        z-index: 99999 !important;
    }

    .tangram-suggestion-main {
        position: absolute;
        z-index: 12345;
        left: 542px;
        top: 128px;
        width: 300px;
    }

    /* star */

    .star {
        position: relative;
        width: 360px;
        margin: 20px auto;
        height: 24px;
    }

    .star ul {
        display: inline-block;
        height: 19px;
        line-height: 19px;
    }

    .star ul {
        margin: 0 0 0 30px ;
    }

    .star li {
        float: left;
        width: 24px;
        cursor: pointer;
        text-indent: -9999px;
        background: url(statics/images/star.png) no-repeat;
        margin-top: 4px;
    }

    .star strong {
        color: #f60;
        padding-left: 30px;

    }

    .star li.on {
        background-position: 0 -28px;
    }

    .star p {
        position: absolute;
        top: 20px;
        width: 159px;
        height: 60px;
        display: none;
        background: url(statics/images/icon.gif) no-repeat;
        padding: 7px 10px 0;
    }

    .star p em {
        color: #f60;
        display: block;
        font-style: normal;
    }

    /*.title {*/
        /*background: #f8f8f8;*/
        /*height: 40px;*/
        /*line-height: 40px;*/
        /*padding-left: 15px;*/
    /*}*/
    /*.title span {*/
        /*color: #1e9fff;*/
    /*}*/

    #selSearchOption {
        height: 100%;
        float: left;
        border: 0;
        background-color: white;
    }

    #searchtext {
        width: 50% !important;
    }
    .map_t {
        height: 40px !important;
        padding-left: 0 !important;
    }
    .map_t span:nth-of-type(1) {
        margin: 10px 10px 0 20px;
    }
    .map_t input:first-child {
        font-size: 10px;
        width: 100%;
        outline: none;
        margin-left: 0;
        float: none;
        height: 38px;
        padding-left: 20px;
    }

    #corplist {
        width: 370px;
        height: 460px;
        /*overflow:scroll*/
    }
    .index-icon{
        -webkit-animation: pulse 18s ease infinite alternate,  nudge 20s linear infinite alternate;
        animation: pulse 18s ease infinite alternate,  nudge 20s linear infinite alternate;
        width: 60px;
        height: 60px;
        position: fixed;
        bottom: 260px;
        right: 20px;
        border-radius: 50%;
        background: orangered;
        text-align: center;
        border: 1px solid #fff;
        cursor: pointer;
        opacity:1;
        z-index: 10000!important;
    }
    @-webkit-keyframes pulse {
        0%, 100% {
            background-color: red;
        }
        50% {
            background-color: orange;
        }
    }

    @keyframes pulse {
        0%, 100% {
            background-color: red;
        }
        50% {
            background-color: orange;
        }
    }
    @-webkit-keyframes nudge {
        0%{
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }

        50% {
            -webkit-transform: translate(-1150px, 0);
            transform: translate(-1150px, 0);
        }

    }
    @keyframes nudge {
        0%, 100% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);

        }
        50% {
            -webkit-transform: translate(-1150px, 0);
            transform: translate(-1150px, 0);
        }

    }

    .index-icon:hover{
        opacity:0.8;
        -webkit-animation-play-state: paused;
        /*transform:scale(0.9)*/
    }
    .index-icon i{
        font-size: 30px;
        color: #fff;
        line-height: 60px;
    }
    /*.isShow{*/
        /*display: none !important;*/
    /*}*/
</style>
</body>
</html>
