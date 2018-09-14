<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=hUrYR4hH5XExjuf6qHt7TLDhyqM08GYF"></script>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<style >
    .width100{
        width: 100%;
        min-width: 400px;
    }
    .width50{
        width: 50%;
        min-width: 400px;
    }
    .width25{
        width: 25%;
        min-width: 230px;
    }
    .width50px{
        width: 50px!important;
    }
    .font0{
        font-size:0;
    }
    .font0>*{
        font-size: 14px
    }
    .layui-form{
        margin-top: 10px;
        padding-left: 10px;

    }

    .info-title{
        margin-top: 30px;
        margin-bottom: 15px;
        font-size: 24px;
    }
    .layui-form-item{
        display: inline-table;
        vertical-align: top;
    }
    .layui-form-label{
        display: table-cell;
        vertical-align: middle;
        margin: 0 10px;
        line-height: 19px;
        width: 100px;
        text-align: left;
        padding: 0;
        float: none;
        color: #333333;
    }
    .vertical-top{
        vertical-align: top;
    }
    .require::before{
        content: '*';
        color: red;
    }
    .layui-input-block {
        margin-left: 30px;
        margin-right: 50px;
        /*display: inline-block;*/
    }
    .layui-form-item.small{
        margin-bottom: 0;
    }
    .layui-form-item.small .layui-form-label{
        width: auto;
    }
    .layui-form-item.small .layui-input-block{
        margin-left: 5px;
        margin-right: 10px;
        width: 80px;
    }

    .layui-input, .layui-select, .layui-textarea{
        border: 1px solid #dddddd;
        border-radius: 5px;
        font-size: 14px;
        position: relative;
        z-index: 2;
        background-color: transparent;
    }
    .date-icon{
        font-size: 25px;
        color: #1a95ff;
        position: absolute;
        top:0;
        right: 10px;
        height: 38px;
        line-height: 38px;
        z-index: 1;
    }
    .picblock{
        width: 48%;
        display: inline-block;
        height: 91px;
        position: relative;
        border: 1px solid #dddddd;
        border-radius: 5px;
        overflow: hidden;
        text-align: center;
        color: #dddddd;
    }
    .pic-icon{
        font-size: 50px;
        position: relative;
        z-index: 1;
    }
    .add-icon{
        font-size: 40px;
        position: relative;
        z-index: 1;
        font-weight: 100;
        display: inline-block;
        height: 30px;
        margin-top: 10px;
    }
    .picblock img{
        z-index: 2;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .picblock p{
        z-index: 3;
        position: relative;
        margin-top: 5px;
    }
    .picblock input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 4;
        cursor: pointer;
    }
    .layui-form-radio{
        margin: 0;
        line-height: 38px;
    }
    .layui-form-radio>i{
        margin-right: 5px;
    }
    .layui-form-radio>i:hover, .layui-form-radioed>i{
        color: #1a95ff;
    }
    .sub-title{
        width: 100%;
        line-height: 38px;
        margin-bottom: 10px;
        color: #333333;
    }
    .layui-form-item .layui-form-checkbox[lay-skin=primary]{
        margin: 0;
    }
    .layui-form-checkbox[lay-skin=primary] i{
        margin-top: 10px;
        border-radius: 5px;
    }
    .layui-form-checkbox[lay-skin=primary] span{
        line-height: 38px;
    }
    .layui-form-checked[lay-skin=primary] i{
        border-color: #1a95ff;
        background-color: #1a95ff;
    }
    .layui-form-checkbox[lay-skin=primary]:hover i{
        border-color: #1a95ff;
    }
    .hide{
        display: none;
    }
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">企业信息维护</span> <span class="sp_wz">您所在位置：<a
                href="/center/companyHome">企业中心</a> > <span>企业信息维护</span></span>
        </div>
        <div class="biaoge" style="overflow: auto">
            <div class="layui-form font0">

                <h1 class="info-title">基本信息</h1>
                <div class="layui-form-item width50">
                    <label class="layui-form-label require">企业名称：</label>
                    <div class="layui-input-block">
                        <input id="corpName" type="text" name="corpName" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width100">
                    <label class="layui-form-label require vertical-top">企业简介：</label>
                    <div class="layui-input-block">
                        <textarea name="corpInfo" required lay-verify="required" class="layui-textarea"></textarea>
                    </div>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require">许可证号</label>
                    <div class="layui-input-block">
                        <input id="licence" type="text" name="licence" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require">工商注册地址</label>
                    <div class="layui-input-block">
                        <input id="registerAddress" type="text" name="registerAddress" lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require">许可证有效期</label>
                    <div class="layui-input-block">
                        <input type="text" name="licenceBeginDate" required lay-verify="required|date"
                               id="licenceBeginDate" autocomplete="off" class="layui-input">
                        <i class="layui-icon layui-icon-date date-icon" ></i>
                    </div>
                    <%--<div class="layui-form-mid">-</div>--%>
                    <%--<div class="layui-input-inline">--%>
                        <%--<input type="text" name="licenceEndDate" lay-verify="required|date" id="licenceEndDate"--%>
                               <%--autocomplete="off" class="layui-input">--%>
                    <%--</div>--%>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require">工商注册日期</label>
                    <div class="layui-input-block">
                        <input type="text" name="registerDate" lay-verify="required|date" id="registerDate"
                               autocomplete="off" class="layui-input">
                        <i class="layui-icon layui-icon-date date-icon" ></i>
                    </div>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require vertical-top">证件照片</label>
                    <div class="layui-input-block font0">
                        <div class="picblock" style="margin-right: 2%">
                            <%--<i class="layui-icon layui-icon-add-1 pic-icon" ></i>--%>
                            <span class="add-icon">+</span>
                            <img class="dlysxkz"/>
                            <p>道路运输许可证</p>
                            <input id="dlysxkz" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
                        </div>
                        <div class="picblock" style="margin-left: 2%">
                            <%--<i class="layui-icon layui-icon-add-1 pic-icon" ></i>--%>
                            <span class="add-icon">+</span>
                            <img class="yyzz"/>
                            <p>营业执照</p>
                            <input id="yyzz" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
                        </div>
                    </div>
                </div>


                <%--<div class="layui-form-item">--%>
                    <%--<div class="layui-inline">--%>
                        <%--<label class="layui-form-label">工商注册地址区域</label>--%>
                        <%--<div class="layui-input-inline">--%>
                            <%--<select name="registerRegion" id="registerRegion">--%>
                            <%--</select>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>

                <div class="layui-form-item width50" style="margin-bottom: 0">
                    <div class="layui-form-item width100">
                        <label class="layui-form-label require">经营地地址</label>
                        <div class="layui-input-block">
                            <input id="busniessAddress" type="text" name="busniessAddress" lay-verify="required" placeholder=""
                                   autocomplete="off" class="layui-input">
                        </div>
                    </div>

                    <div class="layui-form-item width100">
                        <label class="layui-form-label require" title="经营地址邮政编码">经营地址邮政编码</label>
                        <div class="layui-input-block">
                            <input type="text" name="businessPostalCode" lay-verify="required|number"
                                   id="businessPostalCode" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>

                <%--<div class="layui-form-item">--%>
                    <%--<label class="layui-form-label">经营地址区域</label>--%>
                    <%--<div class="layui-input-inline">--%>
                        <%--<select name="businessRegion" id="businessRegion">--%>
                        <%--</select>--%>
                    <%--</div>--%>
                <%--</div>--%>

                <div class="layui-form-item width25">
                    <label class="layui-form-label require">法定代表人</label>
                    <div class="layui-input-block" style="margin-right: 20px">
                        <input id="legalName" type="text" name="legalName" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width25">
                    <label class="layui-form-label require width50px">手机</label>
                    <div class="layui-input-block">
                        <input id="legalMobile" type="text" name="legalMobile" required lay-verify="required|phone"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width25">
                    <label class="layui-form-label require width50px">固定电话</label>
                    <div class="layui-input-block">
                        <input id="legalTel" type="text" name="legalTel" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width25">
                    <label class="layui-form-label  require width50px">邮箱</label>
                    <div class="layui-input-block">
                        <input id="legalEmail" type="text" name="legalEmail" required lay-verify="required|email"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width25">
                    <label class="layui-form-label require">日常经营管理负责人</label>
                    <div class="layui-input-block" style="margin-right: 20px">
                        <input id="operatorName" type="text" name="operatorName" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width25">
                    <label class="layui-form-label require width50px">手机</label>
                    <div class="layui-input-block">
                        <input id="operatorMobile" type="text" name="operatorMobile" required lay-verify="required|phone"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width25">
                    <label class="layui-form-label require width50px">固定电话</label>
                    <div class="layui-input-block">
                        <input id="operatorTel" type="text" name="operatorTel" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width25">
                    <label class="layui-form-label  require width50px">邮箱</label>
                    <div class="layui-input-block">
                        <input id="operatorEmail" type="text" name="operatorEmail" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require">企业反馈电话</label>
                    <div class="layui-input-block">
                        <input id="complaintTel" type="text" name="complaintTel" required lay-verify="required|phone"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item width50">
                    <label class="layui-form-label require">营业时间</label>
                    <div class="layui-input-block">
                        <input type="text" required lay-verify="required" id="businessHours" name="businessHours"
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require" title="工时定额执行标准">工时定额执行标准</label>
                    <div class="layui-input-block">
                        <input type="radio" name="workingHoursQuotaExecutionStandard" value="1" title="行业" checked>
                        <input type="radio" name="workingHoursQuotaExecutionStandard" value="2" title="制造企业">
                    </div>
                </div>
                <div class="layui-form-item width50">
                    <label class="layui-form-label require">工时单价</label>
                    <div class="layui-input-block">
                        <input type="text" name="workingHoursPrice" required lay-verify="required|number"
                               id="workingHoursPrice" autocomplete="off" placeholder="元" class="layui-input">
                    </div>
                </div>

                <h1 class="info-title">业类范围</h1>

                <div class="layui-form-item">
                    <label class="layui-form-label require">业户类别</label>
                    <div class="layui-input-block">
                        <input type="radio" name="industryCategory" value="1" title="企业" checked
                               lay-filter="industryCategory">
                        <input type="radio" name="industryCategory" value="2" title="分支机构" lay-filter="industryCategory">
                        <input type="radio" name="industryCategory" value="3" title="个体经营户" lay-filter="industryCategory">
                        <input type="radio" name="industryCategory" value="4" title="其他" lay-filter="industryCategory">
                        <div class="layui-form-item hide small" id="industryCategoryOtherDiv">
                            <label class="layui-form-label require">其他业户类别</label>
                            <div class="layui-input-block">
                                <input type="text" name="industryCategoryOther" required id="industryCategoryOther"
                                       autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="layui-form-item width100">
                    <label class="layui-form-label require">经济类型</label>
                    <div class="layui-input-block">
                        <input type="radio" name="economicType" value="1" title="国有" checked lay-filter="economicType">
                        <input type="radio" name="economicType" value="2" title="集体" lay-filter="economicType">
                        <input type="radio" name="economicType" value="3" title="私营" lay-filter="economicType">
                        <input type="radio" name="economicType" value="4" title="联营" lay-filter="economicType">
                        <input type="radio" name="economicType" value="5" title="股份制" lay-filter="economicType">
                        <%--<div class="layui-form-mid layui-word-aux">外商投资（</div>--%>
                        <input type="radio" name="economicType" value="6" title="独资" lay-filter="economicType">
                        <input type="radio" name="economicType" value="7" title="合资" lay-filter="economicType">
                        <input type="radio" name="economicType" value="8" title="合作" lay-filter="economicType">
                        <%--<div class="layui-form-mid layui-word-aux">）</div>--%>
                        <input type="radio" name="economicType" value="9" title="港澳台投资" lay-filter="economicType">
                        <input type="radio" name="economicType" value="10" title="其他" lay-filter="economicType">

                        <div class="layui-form-item hide small" id="economicTypeOtherDiv">
                            <label class="layui-form-label require">其他经济类型</label>
                            <div class="layui-input-block">
                                <input type="text" name="economicTypeOther" required id="economicTypeOther" autocomplete="off"
                                       class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" title="一类机动车维修">一类机动车维修</label>
                        <div class="layui-input-block">
                            <input type="checkbox" name="scope1" value="1" title="小型车辆维修">
                            <input type="checkbox" name="scope1" value="2" title="大、中型客车维修">
                            <input type="checkbox" name="scope1" value="3" title="大、中型货车维修">
                            <input type="checkbox" name="scope1" value="4" title="危险货车运输车维修">
                            <input type="checkbox" name="scope1" value="5" title="电动（油电混合）汽车维修">
                            <input type="checkbox" name="scope1" value="6" title="燃气汽车维修">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" title="二类机动车维修">二类机动车维修</label>
                        <div class="layui-input-block">
                            <input type="checkbox" name="scope2" value="1" title="小型车辆维修">
                            <input type="checkbox" name="scope2" value="2" title="大、中型客车维修">
                            <input type="checkbox" name="scope2" value="3" title="大、中型货车维修">
                            <input type="checkbox" name="scope2" value="4" title="电动（油电混合）汽车维修">
                            <input type="checkbox" name="scope2" value="5" title="燃气汽车维修">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" title="三类机动车维修">三类机动车维修</label>
                        <div class="layui-input-block">
                            <input type="checkbox" name="scope3" value="1" title="发动机修理">
                            <input type="checkbox" name="scope3" value="2" title="车身维修">
                            <input type="checkbox" name="scope3" value="3" title="电气系统维修">
                            <input type="checkbox" name="scope3" value="4" title="自动变速器维修">
                            <input type="checkbox" name="scope3" value="5" title="车身清洁维护">
                            <input type="checkbox" name="scope3" value="6" title="涂漆">
                            <input type="checkbox" name="scope3" value="7" title="轮胎动平衡及修补">
                            <input type="checkbox" name="scope3" value="8" title="四轮定位检测调整">
                            <input type="checkbox" name="scope3" value="9" title="供油系统维护及油品更换">
                            <input type="checkbox" name="scope3" value="10" title="喷油泵和喷油嘴维修">
                            <input type="checkbox" name="scope3" value="11" title="曲轴修磨">
                            <input type="checkbox" name="scope3" value="12" title="气缸镗磨">
                            <input type="checkbox" name="scope3" value="13" title="散热器（水箱）维修">
                            <input type="checkbox" name="scope3" value="14" title="空调维修">
                            <input type="checkbox" name="scope3" value="15" title="车辆装潢（篷布坐垫及内装饰）">
                            <input type="checkbox" name="scope3" value="16" title="车辆玻璃安装">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">摩托车维修</label>
                        <div class="layui-input-block">
                            <input type="checkbox" name="scope4" value="1" title="一类">
                            <input type="checkbox" name="scope4" value="2" title="二类">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">汽车维修</label>
                        <div class="layui-input-block">
                            <input type="checkbox" name="scope5" value="1" title="A类">
                            <input type="checkbox" name="scope5" value="2" title="B类">
                        </div>
                    </div>


                </div>

                <h1 class="info-title">人员 / 规模情况</h1>

                <div class="layui-form-item width100">
                    <label class="layui-form-label require" title="">企业员工总数</label>
                    <div class="layui-input-block">
                        <input type="radio" name="employeeNumber" value="1" title="10人以下" checked>
                        <input type="radio" name="employeeNumber" value="2" title="10-20人">
                        <input type="radio" name="employeeNumber" value="3" title="30-50人">
                        <input type="radio" name="employeeNumber" value="4" title="50人以上">
                    </div>
                </div>

                <div class="sub-title require">企业管理人员情况（职业资格、学历等描述）:</div>
                <div class="layui-form-item width25">
                    <label class="layui-form-label require">经理人</label>
                    <div class="layui-input-block" style="margin-right: 20px">
                        <input id="manager" type="text" name="manager" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item width25">
                    <label class="layui-form-label require width50px">服务负责人</label>
                    <div class="layui-input-block">
                        <input id="serviceLeader" type="text" name="serviceLeader" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item width25">
                    <label class="layui-form-label require width50px">技术负责人</label>
                    <div class="layui-input-block">
                        <input id="technologyLeader" type="text" name="technologyLeader" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item width25">
                    <label class="layui-form-label require width50px">质量检验员</label>
                    <div class="layui-input-block">
                        <input id="qualityInspector" type="text" name="qualityInspector" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label">其他</label>
                    <div class="layui-input-block">
                        <input id="managerOther" type="text" name="managerOther"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="sub-title require">企业技术人员配备情况（人）:</div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label">机工</label>
                    <div class="layui-input-block">
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级技师</label>
                            <div class="layui-input-block">
                                <input id="machinistSeniorTechnician" type="tel" name="machinistSeniorTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">技师</label>
                            <div class="layui-input-block">
                                <input id="machinistTechnician" type="tel" name="machinistTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级</label>
                            <div class="layui-input-block">
                                <input id="machinistSenior" type="tel" name="machinistSenior" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">中级</label>
                            <div class="layui-input-block">
                                <input id="machinistMedium" type="tel" name="machinistMedium" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label">电工</label>
                    <div class="layui-input-block">
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级技师</label>
                            <div class="layui-input-block">
                                <input id="electricianSeniorTechnician" type="tel" name="electricianSeniorTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">技师</label>
                            <div class="layui-input-block">
                                <input id="electricianTechnician" type="tel" name="electricianTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级</label>
                            <div class="layui-input-block">
                                <input id="electricianSenior" type="tel" name="electricianSenior" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">中级</label>
                            <div class="layui-input-block">
                                <input id="electricianMedium" type="tel" name="electricianMedium" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label">钣金工</label>
                    <div class="layui-input-block">
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级技师</label>
                            <div class="layui-input-block">
                                <input id="tinbenderSeniorTechnician" type="tel" name="tinbenderSeniorTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">技师</label>
                            <div class="layui-input-block">
                                <input id="tinbenderTechnician" type="tel" name="tinbenderTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级</label>
                            <div class="layui-input-block">
                                <input id="tinbenderSenior" type="tel" name="tinbenderSenior" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">中级</label>
                            <div class="layui-input-block">
                                <input id="tinbenderMedium" type="tel" name="tinbenderMedium" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label">油漆工</label>
                    <div class="layui-input-block">
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级技师</label>
                            <div class="layui-input-block">
                                <input id="painterSeniorTechnician" type="tel" name="painterSeniorTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">技师</label>
                            <div class="layui-input-block">
                                <input id="painterTechnician" type="tel" name="painterTechnician" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">高级</label>
                            <div class="layui-input-block">
                                <input id="painterSenior" type="tel" name="painterSenior" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                        <div class="layui-form-item small">
                            <label class="layui-form-label">中级</label>
                            <div class="layui-input-block">
                                <input id="painterMedium" type="tel" name="painterMedium" lay-verify="number" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>


                <div class="layui-form-item width100">
                    <label class="layui-form-label require" title="企业目前占地面积">企业目前占地面积</label>
                    <div class="layui-input-block">
                        <input type="radio" name="floorSpace" value="1" title="200㎡以下" checked>
                        <input type="radio" name="floorSpace" value="2" title="200-500㎡">
                        <input type="radio" name="floorSpace" value="3" title="500-1000㎡">
                        <input type="radio" name="floorSpace" value="4" title="1000㎡以上">
                    </div>
                </div>

                <div class="layui-form-item width100">
                    <label class="layui-form-label require vertical-top">主要维修设备情况（品牌、功能、年限、技术先进性描述）：</label>
                    <div class="layui-input-block">
                        <textarea name="" required lay-verify="required" class="layui-textarea"></textarea>
                    </div>
                </div>

                <h1 class="info-title">服务内容</h1>

                <div class="layui-form-item width100">
                    <label class="layui-form-label require" title="企业主要业务范围">业务范围</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="sphere" value="1" lay-skin="primary" title="品牌维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="2" lay-skin="primary" title="综合维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="3" lay-skin="primary" title="专项维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="4" lay-skin="primary" title="营运车辆维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="5" lay-skin="primary" title="事故车维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="6" lay-skin="primary" title="配件销售" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="7" lay-skin="primary" title="新车销售" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="8" lay-skin="primary" title="汽车保险" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="9" lay-skin="primary" title="二手车置换" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="10" lay-skin="primary" title="其他" lay-filter="sphere">
                        <div class="layui-form-item hide small" id="sphereOtherDiv">
                            <label class="layui-form-label require width50px" title="其他主要业务范围">其他</label>
                            <div class="layui-input-block">
                                <input type="text" name="sphereOther" required id="sphereOther" autocomplete="off"
                                       class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>



                <div class="layui-form-item width100">
                    <label class="layui-form-label require" title="">企业主要维修车型</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="model" value="1" lay-skin="primary" title="轿车（不含出租）" lay-filter="model">
                        <input type="checkbox" name="model" value="2" lay-skin="primary" title="货车" lay-filter="model">
                        <input type="checkbox" name="model" value="3" lay-skin="primary" title="客车" lay-filter="model">
                        <input type="checkbox" name="model" value="4" lay-skin="primary" title="出租车" lay-filter="model">
                        <input type="checkbox" name="model" value="5" lay-skin="primary" title="特种车" lay-filter="model">
                        <div class="layui-form-item hide small" id="specialDiv">
                            <label class="layui-form-label require" title="主修品牌">特种车</label>
                            <div class="layui-input-block">
                                <input type="text" name="specialCar" required id="specialCar" autocomplete="off"
                                       class="layui-input">
                            </div>
                        </div>
                        <input type="checkbox" name="model" value="6" lay-skin="primary" title="主修品牌" lay-filter="model">
                        <div class="layui-form-item hide small" id="modelOtherDiv">
                            <label class="layui-form-label require" title="主修品牌">主修品牌</label>
                            <div class="layui-input-block">
                                <input type="text" name="modelOther" required id="modelOther" autocomplete="off"
                                       class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="layui-form-item width50">
                    <label class="layui-form-label require" title="24小时汽车维修救援">24小时汽车维修救援</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" checked name="rescue" id="rescue" lay-skin="switch" value="1" lay-text="有|无">--%>
                            <input type="radio" name="rescue" value="1" title="有" >
                            <input type="radio" name="rescue" value="2" title="无" checked>
                    </div>
                </div>
                <div class="layui-form-item width50">
                    <label class="layui-form-label require" title="即品牌特约维修">汽车销售、维修（品牌特约维修）</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" name="specialRepair" id="specialRepair" value="1" lay-filter="specialRepair" lay-skin="switch" lay-text="是|否">--%>
                            <input type="radio" name="specialRepair" value="1" title="是" lay-filter="specialRepair">
                            <div class="layui-form-item hide small" id="specialRepairDiv">
                                <label class="layui-form-label require" title="主修品牌">品牌</label>
                                <div class="layui-input-block">
                                    <input type="text" name="specialRepairBrand" required id="specialRepairBrand" autocomplete="off"
                                           class="layui-input">
                                </div>
                            </div>
                            <input type="radio" name="specialRepair" value="2" title="否" lay-filter="specialRepair" checked>
                    </div>
                </div>


                <div class="layui-form-item width50">
                    <label class="layui-form-label require" title="通过ISO质量管理体系认证">通过ISO质量管理体系认证</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" checked name="iso" id="iso" value="1" lay-skin="switch" lay-text="通过|未通过">--%>
                        <input type="radio" name="iso" value="1" title="通过" >
                        <input type="radio" name="iso" value="2" title="未通过" checked>
                    </div>
                </div>
                <div class="layui-form-item width50">
                    <label class="layui-form-label require" title="通过安全生产标准化达标认证">通过安全生产标准化达标认证</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" checked name="throughSafetyProductionStandardization" id="throughSafetyProductionStandardization" value="1" lay-skin="switch" lay-text="通过|未通过">--%>
                        <input type="radio" name="throughSafetyProductionStandardization" value="1" title="通过" >
                        <input type="radio" name="throughSafetyProductionStandardization" value="2" title="未通过" checked>
                    </div>
                </div>
                <div class="layui-form-item width50">
                    <label class="layui-form-label require" title="通过环保部门专项整治">通过环保部门专项整治</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" checked name="throughEnvironmentalProtectionSpecialRenovation"--%>
                               <%--id="throughEnvironmentalProtectionSpecialRenovation" value="1" lay-skin="switch"--%>
                               <%--lay-text="通过|未通过">--%>
                        <input type="radio" name="throughEnvironmentalProtectionSpecialRenovation" value="1" title="通过" >
                        <input type="radio" name="throughEnvironmentalProtectionSpecialRenovation" value="2" title="未通过" checked>
                    </div>
                </div>
                <div class="layui-form-item width50">
                    <label class="layui-form-label require" title="是否为全国诚信维修企业">是否为全国诚信维修企业</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" name="sincerity" id="sincerity" value="1" lay-skin="switch"--%>
                               <%--lay-filter="sincerity" lay-text="通过|未通过">--%>
                        <input type="radio" name="sincerity" value="1" title="是" lay-filter="sincerity">
                        <div class="layui-form-item hide small" id="sincerityYearDiv">
                            <label class="layui-form-label require" >年度</label>
                            <div class="layui-input-block">
                                <input type="text" name="sincerityYear" required id="sincerityYear" autocomplete="off"
                                       class="layui-input">
                            </div>
                        </div>
                        <input type="radio" name="sincerity" value="2" title="否" lay-filter="sincerity" checked>
                    </div>
                </div>

                <div class="layui-form-item width100">
                    <label class="layui-form-label require" title="上年度质量信誉考核等级">上年度质量信誉考核等级</label>
                    <div class="layui-input-block">
                        <input type="radio" name="qualityReputationAssessmentLevel" value="1" title="AAA">
                        <input type="radio" name="qualityReputationAssessmentLevel" value="2" title="AA">
                        <input type="radio" name="qualityReputationAssessmentLevel" value="3" title="A">
                        <input type="radio" name="qualityReputationAssessmentLevel" value="4" title="未考核" checked>
                    </div>
                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label require" title="是否提供上门维修">是否提供上门维修</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" checked name="offerOnsiteRepair" id="offerOnsiteRepair" value="1"--%>
                               <%--lay-skin="switch" lay-text="是|否">--%>
                        <input type="radio" name="offerOnsiteRepair" value="1" title="是" lay-filter="offerOnsiteRepair">
                        <input type="radio" name="offerOnsiteRepair" value="2" title="否" lay-filter="offerOnsiteRepair" checked>
                    </div>
                </div>
                <div class="layui-form-item width100 hide" id="offerOnsiteRepairType">
                    <label class="layui-form-label require" title="">提供上门服务种类</label>
                    <div class="layui-input-block">
                        <input type="checkbox" lay-skin="primary" name="serviceCategory" value="1" title="上门故障诊断" lay-filter="serviceCategory">
                        <input type="checkbox" lay-skin="primary" name="serviceCategory" value="2" title="上门取送车服务"
                               lay-filter="serviceCategory">
                        <input type="checkbox" lay-skin="primary" name="serviceCategory" value="3" title="上门更换备胎" lay-filter="serviceCategory">
                        <input type="checkbox" lay-skin="primary" name="serviceCategory" value="4" title="上门更换灯泡" lay-filter="serviceCategory">
                        <input type="checkbox" lay-skin="primary" name="serviceCategory" value="5" title="上门更换雨刮片"
                               lay-filter="serviceCategory">
                        <input type="checkbox" lay-skin="primary" name="serviceCategory" value="6" title="上门电瓶泵电" lay-filter="serviceCategory">
                        <input type="checkbox" lay-skin="primary" name="serviceCategory" value="7" title="其他" lay-filter="serviceCategory">
                        <div class="layui-form-item hide small" id="serviceCategoryOtherDiv">
                            <label class="layui-form-label require" title="其他服务种类">其他</label>
                            <div class="layui-input-block">
                                <input type="text" name="serviceCategoryOther" required id="serviceCategoryOther" autocomplete="off"
                                       class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>


                <div class="layui-form-item width100">
                    <label class="layui-form-label vertical-top">特色服务</label>
                    <div class="layui-input-block">
                    <textarea name="specialService" id="specialService" class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label vertical-top">服务优势描述</label>
                    <div class="layui-input-block">
                        <textarea name="selfDesc" id="selfDesc" class="layui-textarea"></textarea>
                    </div>
                </div>
                <%--<div class="layui-form-item layui-form-text">--%>
                    <%--<label class="layui-form-label">企业自我简介</label>--%>
                    <%--<div class="layui-input-block">--%>
                    <%--<textarea placeholder="请输入内容" name="selfIntroduction" id="selfIntroduction" lay-verify="required"--%>
                              <%--class="layui-textarea"></textarea>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <div class="layui-form-item width100">
                    <label class="layui-form-label vertical-top" title="含企业员工，员工列出人员">区级以上荣誉获得情况</label>
                    <div class="layui-input-block">
                        <textarea name="honor" id="honor" class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label" title="是否愿意开通车大夫服务等在线维修服务">是否愿意开通车大夫服务等在线维修服务</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" checked name="openOnlineRepairService" id="openOnlineRepairService" value="1"--%>
                               <%--lay-skin="switch" lay-text="愿意|不愿意" style="width: 100px">--%>
                        <input type="radio" name="openOnlineRepairService" value="1" title="愿意" lay-filter="openOnlineRepairService">
                        <input type="radio" name="openOnlineRepairService" value="2" title="不愿意" lay-filter="openOnlineRepairService" checked>
                </div>
                </div>
                <div class="layui-form-item width100">
                    <label class="layui-form-label" title="是否愿意开通在线商务服务">是否愿意开通在线商务服务</label>
                    <div class="layui-input-block">
                        <%--<input type="checkbox" checked name="openOnlineBusinessService" id="openOnlineBusinessService"--%>
                               <%--value="1" lay-skin="switch" lay-text="愿意|不愿意">--%>
                            <input type="radio" name="openOnlineBusinessService" value="1" title="愿意" lay-filter="openOnlineBusinessService">
                            <input type="radio" name="openOnlineBusinessService" value="2" title="不愿意" lay-filter="openOnlineBusinessService" checked>
                    </div>
                </div>
                <div style="text-align: center;margin-right: 100px;margin-bottom: 20px">
                    <a class="layui-btn layui-btn-normal" lay-submit lay-filter="serviceSubmit" id="submitBtn">提交</a>
                </div>

            </div>

        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>

<script type="text/javascript" src="/statics/js/front/company/companyInfo.js"></script>

</body>

<script type="text/javascript">

</script>
</html>
