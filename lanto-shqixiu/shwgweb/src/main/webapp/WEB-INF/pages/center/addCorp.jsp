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
    /*.layui-form-item{
        width: 48%;
        display: inline-block;
        margin-top: 5px;
    }*/
    .layui-form-switch{
        width: 70px;
        height: 24px;
    }
    .layui-form-switch em{
        width: 42px;
    }
    .layui-form-onswitch i{
        left: 48px;
    }
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">请完善资料</span> <span class="sp_wz">您所在位置：<a
                href="/center/runHome">运营商中心</a> > <span>企业详细信息填写</span></span>
        </div>
        <div class="biaoge" style="overflow: auto">
            <form class="layui-form layui-form-pane" action="" style="margin-top: 10px">

                <div class="layui-form-item">
                    <label class="layui-form-label">企业名称</label>
                    <div class="layui-input-block">
                        <input id="corpName" type="text" name="corpName" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">许可证号</label>
                    <div class="layui-input-block">
                        <input id="licence" type="text" name="licence" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">许可证有效期</label>
                        <div class="layui-input-inline">
                            <input type="text" name="licenceBeginDate" required lay-verify="required|date"
                                   id="licenceBeginDate" autocomplete="off" class="layui-input">
                        </div>
                        <div class="layui-form-mid">-</div>
                        <div class="layui-input-inline">
                            <input type="text" name="licenceEndDate" lay-verify="required|date" id="licenceEndDate"
                                   autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">工商注册地址</label>
                    <div class="layui-input-block">
                        <input id="registerAddress" type="text" name="registerAddress" lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">工商注册地址区域</label>
                        <div class="layui-input-inline">
                            <select name="registerRegion" id="registerRegion">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">工商注册日期</label>
                        <div class="layui-input-inline">
                            <input type="text" name="registerDate" lay-verify="required|date" id="registerDate"
                                   autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">经营地地址</label>
                    <div class="layui-input-block">
                        <input id="busniessAddress" type="text" name="busniessAddress" lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">经营地址区域</label>
                        <div class="layui-input-inline">
                            <select name="businessRegion" id="businessRegion">
                            </select>
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label" title="经营地址邮政编码">经营地址邮政编码</label>
                        <div class="layui-input-block">
                            <input type="text" name="businessPostalCode" lay-verify="required|number"
                                   id="businessPostalCode" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">法定代表人</label>
                    <div class="layui-input-block">
                        <input id="legalName" type="text" name="legalName" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">手机</label>
                    <div class="layui-input-block">
                        <input id="legalMobile" type="text" name="legalMobile" required lay-verify="required|phone"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">固定电话</label>
                    <div class="layui-input-block">
                        <input id="legalTel" type="text" name="legalTel" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">邮箱</label>
                    <div class="layui-input-block">
                        <input id="legalEmail" type="text" name="legalEmail" required lay-verify="required|email"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">日常经营管理负责人</label>
                    <div class="layui-input-block">
                        <input id="operatorName" type="text" name="operatorName" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">手机</label>
                    <div class="layui-input-block">
                        <input id="operatorMobile" type="text" name="operatorMobile" required lay-verify="required|phone"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">固定电话</label>
                    <div class="layui-input-block">
                        <input id="operatorTel" type="text" name="operatorTel" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">邮箱</label>
                    <div class="layui-input-block">
                        <input id="operatorEmail" type="text" name="operatorEmail" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">企业反馈电话</label>
                    <div class="layui-input-block">
                        <input id="complaintTel" type="text" name="complaintTel" required lay-verify="required|phone"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">营业时间</label>
                    <div class="layui-input-block">
                        <input type="text" required lay-verify="required" id="businessHours" name="businessHours"
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item" pane="">
                    <label class="layui-form-label" title="工时定额执行标准">工时定额执行标准</label>
                    <div class="layui-input-block">
                        <input type="radio" name="workingHoursQuotaExecutionStandard" value="1" title="行业" checked>
                        <input type="radio" name="workingHoursQuotaExecutionStandard" value="2" title="制造企业">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">工时单价</label>
                    <div class="layui-input-inline">
                        <input type="text" name="workingHoursPrice" required lay-verify="required|number"
                               id="workingHoursPrice" autocomplete="off" placeholder="￥" class="layui-input">
                    </div>
                    <div class="layui-form-mid layui-word-aux">元</div>
                </div>

                <div class="layui-form-item" pane="">
                    <label class="layui-form-label">业户类别</label>
                    <div class="layui-input-block">
                        <input type="radio" name="industryCategory" value="1" title="企业" checked
                               lay-filter="industryCategory">
                        <input type="radio" name="industryCategory" value="2" title="分支机构" lay-filter="industryCategory">
                        <input type="radio" name="industryCategory" value="3" title="个体经营户" lay-filter="industryCategory">
                        <input type="radio" name="industryCategory" value="4" title="其他" lay-filter="industryCategory">
                    </div>
                </div>
                <div class="layui-form-item layui-hide" id="industryCategoryOtherDiv">
                    <label class="layui-form-label">其他业户类别</label>
                    <div class="layui-input-block">
                        <input type="text" name="industryCategoryOther" required id="industryCategoryOther"
                               autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item" pane="">
                    <label class="layui-form-label">经济类型</label>
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

                    </div>
                </div>
                <div class="layui-form-item layui-hide" id="economicTypeOtherDiv">
                    <label class="layui-form-label">其他经济类型</label>
                    <div class="layui-input-block">
                        <input type="text" name="economicTypeOther" required id="economicTypeOther" autocomplete="off"
                               class="layui-input">
                    </div>
                </div>

                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
                    <legend>经营范围</legend>
                </fieldset>
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

                <div class="layui-form-item">
                    <label class="layui-form-label" title="企业主要业务范围">企业主要业务范围</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="sphere" value="1" title="品牌维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="2" title="综合维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="3" title="专项维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="4" title="营运车辆维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="5" title="事故车维修" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="6" title="配件销售" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="7" title="新车销售" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="8" title="汽车保险" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="9" title="二手车置换" lay-filter="sphere">
                        <input type="checkbox" name="sphere" value="10" title="其他" lay-filter="sphere">
                    </div>
                </div>

                <div class="layui-form-item layui-hide" id="sphereOtherDiv">
                    <label class="layui-form-label" title="其他主要业务范围">其他主要业务范围</label>
                    <div class="layui-input-block">
                        <input type="text" name="sphereOther" required id="sphereOther" autocomplete="off"
                               class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label" title="">企业员工总数</label>
                    <div class="layui-input-block">
                        <input type="radio" name="employeeNumber" value="1" title="10人以下" checked>
                        <input type="radio" name="employeeNumber" value="2" title="10-20人">
                        <input type="radio" name="employeeNumber" value="3" title="30-50人">
                        <input type="radio" name="employeeNumber" value="4" title="50人以上">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label" title="企业目前占地面积">企业目前占地面积</label>
                    <div class="layui-input-block">
                        <input type="radio" name="floorSpace" value="1" title="200㎡以下" checked>
                        <input type="radio" name="floorSpace" value="2" title="200-500㎡">
                        <input type="radio" name="floorSpace" value="3" title="500-1000㎡">
                        <input type="radio" name="floorSpace" value="4" title="1000㎡以上">
                    </div>
                </div>

                <%--<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
                    <legend>企业主要维修设备情况(品牌、功能、年限、技术先进性描述)equipment</legend>
                </fieldset>--%>

                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
                    <legend>企业管理人员情况（职业资格、学历等描述）</legend>
                </fieldset>
                <div class="layui-form-item">
                    <label class="layui-form-label">经理人</label>
                    <div class="layui-input-block">
                        <input id="manager" type="text" name="manager" required lay-verify="required" placeholder=""
                               autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">服务负责人</label>
                    <div class="layui-input-block">
                        <input id="serviceLeader" type="text" name="serviceLeader" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">技术负责人</label>
                    <div class="layui-input-block">
                        <input id="technologyLeader" type="text" name="technologyLeader" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">质量检验员</label>
                    <div class="layui-input-block">
                        <input id="qualityInspector" type="text" name="qualityInspector" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">其他</label>
                    <div class="layui-input-block">
                        <input id="managerOther" type="text" name="managerOther" required lay-verify="required"
                               placeholder="" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">
                    <legend>企业技术人员配备情况</legend>
                </fieldset>
                <div class="layui-form-item">
                    <label class="layui-form-label">机工</label>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="machinistSeniorTechnician" type="text" name="machinistSeniorTechnician" required
                               lay-verify="number" placeholder="高级技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="machinistTechnician" type="text" name="machinistTechnician" required lay-verify="number"
                               placeholder="技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="machinistSenior" type="text" name="machinistSenior" required lay-verify="number"
                               placeholder="高级人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="machinistMedium" type="text" name="machinistMedium" required lay-verify="number"
                               placeholder="中级人数" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">电工</label>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="electricianSeniorTechnician" type="text" name="electricianSeniorTechnician" required
                               lay-verify="number" placeholder="高级技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="electricianTechnician" type="text" name="electricianTechnician" required
                               lay-verify="number" placeholder="技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="electricianSenior" type="text" name="electricianSenior" required lay-verify="number"
                               placeholder="高级人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="electricianMedium" type="text" name="electricianMedium" required lay-verify="number"
                               placeholder="中级人数" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">钣金工</label>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="tinbenderSeniorTechnician" type="text" name="tinbenderSeniorTechnician" required
                               lay-verify="number" placeholder="高级技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="tinbenderTechnician" type="text" name="tinbenderTechnician" required lay-verify="number"
                               placeholder="技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="tinbenderSenior" type="text" name="tinbenderSenior" required lay-verify="number"
                               placeholder="高级人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="tinbenderMedium" type="text" name="tinbenderMedium" required lay-verify="number"
                               placeholder="中级人数" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">油漆工</label>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="painterSeniorTechnician" type="text" name="painterSeniorTechnician" required
                               lay-verify="number" placeholder="高级技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="painterTechnician" type="text" name="painterTechnician" required lay-verify="number"
                               placeholder="技师人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="painterSenior" type="text" name="painterSenior" required lay-verify="number"
                               placeholder="高级人数" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-input-inline" style="width: 100px">
                        <input id="painterMedium" type="text" name="painterMedium" required lay-verify="number"
                               placeholder="中级人数" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label" title="">企业主要维修车型</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="model" value="1" title="轿车（不含出租）" lay-filter="model">
                        <input type="checkbox" name="model" value="2" title="货车" lay-filter="model">
                        <input type="checkbox" name="model" value="3" title="客车" lay-filter="model">
                        <input type="checkbox" name="model" value="4" title="出租车" lay-filter="model">
                        <input type="checkbox" name="model" value="5" title="特种车" lay-filter="model">
                        <input type="checkbox" name="model" value="6" title="主修品牌" lay-filter="model">
                    </div>
                </div>
                <div class="layui-form-item layui-hide" id="modelOtherDiv">
                    <label class="layui-form-label" title="主修品牌">主修品牌</label>
                    <div class="layui-input-block">
                        <input type="text" name="modelOther" required id="modelOther" autocomplete="off"
                               class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="24小时汽车维修救援">24小时汽车维修救援</label>
                    <div class="layui-input-block">
                        <input type="checkbox" checked name="rescue" id="rescue" lay-skin="switch" value="1" lay-text="有|无">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="即品牌特约维修">汽车销售、维修</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="specialRepair" id="specialRepair" value="1" lay-filter="specialRepair"
                               lay-skin="switch" lay-text="是|否">
                    </div>
                </div>
                <div class="layui-form-item layui-hide" id="specialRepairBrandDiv">
                    <label class="layui-form-label" title="汽车销售、维修品牌">汽车销售、维修品牌</label>
                    <div class="layui-input-block">
                        <input type="text" name="specialRepairBrand" required id="specialRepairBrand" autocomplete="off"
                               class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label" title="通过ISO质量管理体系认证">通过ISO质量管理体系认证</label>
                    <div class="layui-input-block">
                        <input type="checkbox" checked name="iso" id="iso" value="1" lay-skin="switch" lay-text="通过|未通过">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="通过安全生产标准化达标认证">通过安全生产标准化达标认证</label>
                    <div class="layui-input-block">
                        <input type="checkbox" checked name="throughSafetyProductionStandardization"
                               id="throughSafetyProductionStandardization" value="1" lay-skin="switch" lay-text="通过|未通过">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="通过环保部门专项整治">通过环保部门专项整治</label>
                    <div class="layui-input-block">
                        <input type="checkbox" checked name="throughEnvironmentalProtectionSpecialRenovation"
                               id="throughEnvironmentalProtectionSpecialRenovation" value="1" lay-skin="switch"
                               lay-text="通过|未通过">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="是否为全国诚信维修企业">是否为全国诚信维修企业</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="sincerity" id="sincerity" value="1" lay-skin="switch"
                               lay-filter="sincerity" lay-text="通过|未通过">
                    </div>
                </div>
                <div class="layui-form-item layui-hide" id="sincerityYearDiv">
                    <label class="layui-form-label" title="成为全国诚信维修企业的年份">成为全国诚信维修企业的年份</label>
                    <div class="layui-input-block">
                        <input type="text" name="sincerityYear" required id="sincerityYear" autocomplete="off"
                               class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label" title="上年度质量信誉考核等级">上年度质量信誉考核等级</label>
                    <div class="layui-input-block">
                        <input type="radio" name="qualityReputationAssessmentLevel" value="1" title="AAA" checked>
                        <input type="radio" name="qualityReputationAssessmentLevel" value="2" title="AA">
                        <input type="radio" name="qualityReputationAssessmentLevel" value="3" title="A">
                        <input type="radio" name="qualityReputationAssessmentLevel" value="4" title="未考核">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="是否提供上门维修">是否提供上门维修</label>
                    <div class="layui-input-block">
                        <input type="checkbox" checked name="offerOnsiteRepair" id="offerOnsiteRepair" value="1"
                               lay-skin="switch" lay-text="是|否">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="">提供上门服务种类</label>
                    <div class="layui-input-block">
                        <input type="checkbox" name="serviceCategory" value="1" title="上门故障诊断" lay-filter="serviceCategory">
                        <input type="checkbox" name="serviceCategory" value="2" title="上门取送车服务"
                               lay-filter="serviceCategory">
                        <input type="checkbox" name="serviceCategory" value="3" title="上门更换备胎" lay-filter="serviceCategory">
                        <input type="checkbox" name="serviceCategory" value="4" title="上门更换灯泡" lay-filter="serviceCategory">
                        <input type="checkbox" name="serviceCategory" value="5" title="上门更换雨刮片"
                               lay-filter="serviceCategory">
                        <input type="checkbox" name="serviceCategory" value="6" title="上门电瓶泵电" lay-filter="serviceCategory">
                        <input type="checkbox" name="serviceCategory" value="7" title="其他" lay-filter="serviceCategory">
                    </div>
                </div>
                <div class="layui-form-item layui-hide" id="serviceCategoryOtherDiv">
                    <label class="layui-form-label" title="其他服务种类">其他服务种类</label>
                    <div class="layui-input-block">
                        <input type="text" name="serviceCategoryOther" required id="serviceCategoryOther" autocomplete="off"
                               class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">企业特色服务</label>
                    <div class="layui-input-block">
                    <textarea placeholder="请输入内容" name="specialService" id="specialService"
                              class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">企业服务优势自我描述</label>
                    <div class="layui-input-block">
                        <textarea placeholder="请输入内容" name="selfDesc" id="selfDesc" class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">企业自我简介</label>
                    <div class="layui-input-block">
                    <textarea placeholder="请输入内容" name="selfIntroduction" id="selfIntroduction" lay-verify="required"
                              class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label" title="含企业员工，员工列出人员">区级以上荣誉获得情况</label>
                    <div class="layui-input-block">
                        <textarea placeholder="请输入内容" name="honor" id="honor" class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label" title="是否愿意开通车大夫服务等在线维修服务">是否愿意开通车大夫服务等在线维修服务</label>
                    <div class="layui-input-block">
                        <input type="checkbox" checked name="openOnlineRepairService" id="openOnlineRepairService" value="1"
                               lay-skin="switch" lay-text="愿意|不愿意" style="width: 100px">
                    </div>
                </div>
                <div class="layui-form-item" pane="">
                    <label class="layui-form-label" title="是否愿意开通在线商务服务">是否愿意开通在线商务服务</label>
                    <div class="layui-input-block">
                        <input type="checkbox" checked name="openOnlineBusinessService" id="openOnlineBusinessService"
                               value="1" lay-skin="switch" lay-text="愿意|不愿意">
                    </div>
                </div>
                <div class="layui-form-item" style="text-align: right;margin-right: 100px;">
                    <a class="layui-btn layui-btn-normal" href="javascript:void(0)" onclick="history.back()">返回</a>
                    <a class="layui-btn layui-btn-normal" lay-submit lay-filter="serviceSubmit" id="submitBtn">提交</a>
                    <a class="layui-btn layui-btn-normal layui-hide" lay-submit lay-filter="serviceSave" id="saveBtn">保存</a>
                </div>

            </form>

        </div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>

<script type="text/javascript">
    $(function () {
        var id = getUrlParam('id');
        var type = getUrlParam('type');
        console.log('id', id);

        var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
        if (!userinfo) {
            layer.msg('请先进行登录');
            setTimeout(function () {
                window.location.href = "${ctx}" + "/toLogin?reUrl=" + "${memberUri}";
            }, 2000)
        }
        layui.use(['form', 'layedit', 'laydate'], function () {
            var form = layui.form
                , layer = layui.layer
                , layedit = layui.layedit
                , laydate = layui.laydate;

            //日期
            laydate.render({
                elem: '#licenceBeginDate'
            });
            laydate.render({
                elem: '#licenceEndDate'
            });
            laydate.render({
                elem: '#registerDate'
            });
            laydate.render({
                elem: '#businessHours',
                type: 'time',
                format: 'HH:mm',
                btns: ['clear', 'confirm'],
                range: true,
                done: function (value, date, endDate) {
                    console.log(value); //得到日期生成的值，如：2017-08-18
                    console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                    console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                    if (date.hours == endDate.hours) {
                        if (date.minutes > endDate.minutes) {
                            layer.msg('营业时间设置错误！');
                        }
                    } else if (date.hours > endDate.hours) {
                        layer.msg('营业时间设置错误！');
                    }
                }
            });

            accessPost(baseu + '/corp/register/list',
                JSON.stringify({
                    parentCode: 310000
                }),
                function (resp) {
                    var datas = resp.data || []
                    if (datas.length > 1) {
                        // var areaHtml = '<option value=\"\" class="">全部</option>'
                        // for (var j in datas) {
                        //     areaHtml += '<option value=\"' + datas[j].regionCode + '\" class=\"\">' + datas[j].shortName + '</option>'
                        // }
                        // $("#registerRegion").html(areaHtml);

                        $("#registerRegion").append('<option value=\"\" class="">全部</option>');
                        for (var j in datas) {
                            $("#registerRegion").append('<option value=\"' + datas[j].regionCode + '\" class=\"\">' + datas[j].shortName + '</option>');
                        }
                        form.render('select');
                    }
                }
            );
            accessPost(baseu + '/corp/business/list',
                JSON.stringify({
                    parentCode: 310000
                }),
                function (resp) {
                    var datas = resp.data || []
                    if (datas.length > 1) {
                        var areaHtml = '<option value=\"\" class="">全部</option>'
                        for (var j in datas) {
                            areaHtml += '<option value=\"' + datas[j].regionCode + '\" class=\"\">' + datas[j].shortName + '</option>'
                        }
                        $("#businessRegion").html(areaHtml);
                        form.render('select');
                    }
                }
            )
            form.render();

            var form = layui.form;
            //监听业户类别
            form.on('radio(industryCategory)', function (data) {
                console.log(data.elem.value)
                if (data.elem.checked) {
                    if (data.elem.value == '4') {
                        $('#industryCategoryOtherDiv').removeClass("layui-hide").addClass("layui-show");
                    } else {
                        $('#industryCategoryOtherDiv').removeClass("layui-show").addClass("layui-hide");
                    }
                }
                form.render();
            })
            //监听经济类别
            form.on('radio(economicType)', function (data) {
                console.log(data.elem.value)
                if (data.elem.checked) {
                    if (data.elem.value == '10') {
                        $('#economicTypeOtherDiv').removeClass("layui-hide").addClass("layui-show");
                    } else {
                        $('#economicTypeOtherDiv').removeClass("layui-show").addClass("layui-hide");
                    }
                }
                form.render();
            })
            //监听主要业务范围
            form.on('checkbox(sphere)', function (data) {
                console.log(data.elem.value)
                if (data.elem.value == '10') {
                    if (data.elem.checked) {
                        $('#sphereOtherDiv').removeClass("layui-hide").addClass("layui-show");
                    } else {
                        $('#sphereOtherDiv').removeClass("layui-show").addClass("layui-hide");
                    }
                }
                form.render();
            })
            //监听主要维修车型
            form.on('checkbox(model)', function (data) {
                console.log(data.elem.value)
                if (data.elem.value == '6') {
                    if (data.elem.checked) {
                        $('#modelOtherDiv').removeClass("layui-hide").addClass("layui-show");
                    } else {
                        $('#modelOtherDiv').removeClass("layui-show").addClass("layui-hide");
                    }
                }
                form.render();
            })
            //监听是否特约维修
            form.on('switch(specialRepair)', function (data) {
                console.log(this.checked)
                if (this.checked) {
                    $('#specialRepairBrandDiv').removeClass("layui-hide").addClass("layui-show");
                } else {
                    $('#specialRepairBrandDiv').removeClass("layui-show").addClass("layui-hide");
                }
                form.render();
            })
            //监听是否为全国诚信维修企业
            form.on('switch(sincerity)', function (data) {
                console.log(this.checked)
                if (this.checked) {
                    $('#sincerityYearDiv').removeClass("layui-hide").addClass("layui-show");
                } else {
                    $('#sincerityYearDiv').removeClass("layui-show").addClass("layui-hide");
                }
                form.render();
            })
            //监听提供上门服务种类
            form.on('checkbox(serviceCategory)', function (data) {
                console.log(data.elem.value)
                if (data.elem.value == '7') {
                    if (data.elem.checked) {
                        $('#serviceCategoryOtherDiv').removeClass("layui-hide").addClass("layui-show");
                    } else {
                        $('#serviceCategoryOtherDiv').removeClass("layui-show").addClass("layui-hide");
                    }
                }
                form.render();
            })

            //监听提交
            form.on('submit(serviceSubmit)', function (data) {
                var params = data.field;

                var scope1 = [];
                $('input[name="scope1"]:checked').each(function () {
                    scope1.push($(this).val())
                })
                params.scope1 = scope1;

                var scope2 = [];
                $('input[name="scope2"]:checked').each(function () {
                    scope2.push($(this).val())
                })
                params.scope2 = scope2;

                var scope3 = [];
                $('input[name="scope3"]:checked').each(function () {
                    scope3.push($(this).val())
                })
                params.scope3 = scope3;

                var scope4 = [];
                $('input[name="scope4"]:checked').each(function () {
                    scope4.push($(this).val())
                })
                params.scope4 = scope4;

                var scope5 = [];
                $('input[name="scope5"]:checked').each(function () {
                    scope5.push($(this).val())
                })
                params.scope5 = scope5;

                var sphere = [];
                $('input[name="sphere"]:checked').each(function () {
                    sphere.push($(this).val())
                })
                params.sphere = sphere;

                var model = [];
                $('input[name="model"]:checked').each(function () {
                    model.push($(this).val())
                })
                params.model = model;

                var serviceCategory = [];
                $('input[name="serviceCategory"]:checked').each(function () {
                    serviceCategory.push($(this).val())
                })
                params.serviceCategory = serviceCategory;

                var myGeo = new BMap.Geocoder();
                myGeo.getPoint('上海市' + params.busniessAddress, function (point) {
                    if (point) {
                        console.log(point)
                        params.longitude = point.lng;
                        params.latitude = point.lat
                    }
                })

                params.accessToken = localStorage.getItem('ACCESSTOKEN');
                params.rescue = $('#rescue').prop('checked') ? 1 : 0;
                params.specialRepair = $('#specialRepair').prop('checked') ? 1 : 0;
                params.iso = $('#iso').prop('checked') ? 1 : 0;
                params.throughSafetyProductionStandardization = $('#throughSafetyProductionStandardization').prop('checked') ? 1 : 0;
                params.throughEnvironmentalProtectionSpecialRenovation = $('#throughEnvironmentalProtectionSpecialRenovation').prop('checked') ? 1 : 0;
                params.sincerity = $('#sincerity').prop('checked') ? 1 : 0;
                params.offerOnsiteRepair = $('#offerOnsiteRepair').prop('checked') ? 1 : 0;
                params.openOnlineRepairService = $('#openOnlineRepairService').prop('checked') ? 1 : 0;
                params.openOnlineBusinessService = $('#openOnlineBusinessService').prop('checked') ? 1 : 0;
                console.log(params);

                var ii = layer.load();
                console.log('params', params);
                accessPost(baseu + 'corp/add', JSON.stringify(params), function (res) {
                    console.log('res: ', res);
                    var message = responseMessageMaker(res, "${ctx}");
                    console.log('message', message)
                    layer.msg(message, {
                        icon: 1,
                        time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        if (res.code == '000000') {
                            window.location.href = 'corpInfo';
                            console.log(res.code)
                        }
                        layer.closeAll();
                    });


                })
            });

            form.on('submit(serviceSave)', function (data) {
                var params = data.field;

                var scope1 = [];
                $('input[name="scope1"]:checked').each(function () {
                    scope1.push($(this).val())
                })
                params.scope1 = scope1;

                var scope2 = [];
                $('input[name="scope2"]:checked').each(function () {
                    scope2.push($(this).val())
                })
                params.scope2 = scope2;

                var scope3 = [];
                $('input[name="scope3"]:checked').each(function () {
                    scope3.push($(this).val())
                })
                params.scope3 = scope3;

                var scope4 = [];
                $('input[name="scope4"]:checked').each(function () {
                    scope4.push($(this).val())
                })
                params.scope4 = scope4;

                var scope5 = [];
                $('input[name="scope5"]:checked').each(function () {
                    scope5.push($(this).val())
                })
                params.scope5 = scope5;

                var sphere = [];
                $('input[name="sphere"]:checked').each(function () {
                    sphere.push($(this).val())
                })
                params.sphere = sphere;

                var model = [];
                $('input[name="model"]:checked').each(function () {
                    model.push($(this).val())
                })
                params.model = model;

                var serviceCategory = [];
                $('input[name="serviceCategory"]:checked').each(function () {
                    serviceCategory.push($(this).val())
                })
                params.serviceCategory = serviceCategory;

                var myGeo = new BMap.Geocoder();
                myGeo.getPoint('上海市' + params.busniessAddress, function (point) {
                    if (point) {
                        console.log(point)
                        params.longitude = point.lng;
                        params.latitude = point.lat
                    }
                })

                params.accessToken = localStorage.getItem('ACCESSTOKEN');
                params.id = id;
                params.rescue = $('#rescue').prop('checked') ? 1 : 0;
                params.specialRepair = $('#specialRepair').prop('checked') ? 1 : 0;
                params.iso = $('#iso').prop('checked') ? 1 : 0;
                params.throughSafetyProductionStandardization = $('#throughSafetyProductionStandardization').prop('checked') ? 1 : 0;
                params.throughEnvironmentalProtectionSpecialRenovation = $('#throughEnvironmentalProtectionSpecialRenovation').prop('checked') ? 1 : 0;
                params.sincerity = $('#sincerity').prop('checked') ? 1 : 0;
                params.offerOnsiteRepair = $('#offerOnsiteRepair').prop('checked') ? 1 : 0;
                params.openOnlineRepairService = $('#openOnlineRepairService').prop('checked') ? 1 : 0;
                params.openOnlineBusinessService = $('#openOnlineBusinessService').prop('checked') ? 1 : 0;

                var ii = layer.load();
                console.log('params', params);
                accessPost(baseu + 'corp/edit', JSON.stringify(params), function (res) {
                    console.log('res: ', res);
                    var message = responseMessageMaker(res, "${ctx}");
                    console.log('message', message)
                    layer.msg(message, {
                        icon: 1,
                        time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        if (res.code == '000000') {
                            window.location.href = 'corpInfo';
                            console.log(res.code)
                        }
                        layer.closeAll();
                    });


                })
            });

            if (id) {
                var ii = layer.load();
                //详情显示
                var param = {
                    accessToken: localStorage.getItem('ACCESSTOKEN'),
                    Id: id
                }
                console.log('param', param);
                accessPost(baseu + 'corp/detail/' + localStorage.getItem('ACCESSTOKEN') + '/' + id, JSON.stringify(param), function (res) {
                    console.log('resDetail: ', res);
                    var data = res.data;
                    if (data) {
                        console.log('data: ', data);
                        $('#corpName').val(data.corpName);
                        $('#licence').val(data.licence);
                        $('#licenceBeginDate').val(formatDate(data.licenceBeginDate, 'yyyy-MM-dd'));
                        $('#licenceEndDate').val(formatDate(data.licenceEndDate, 'yyyy-MM-dd'));
                        $('#registerAddress').val(data.registerAddress);
                        $('#registerDate').val(formatDate(data.registerDate, 'yyyy-MM-dd'));
                        // $("#registerRegion option[value='"+data.registerRegion+"']")
                        $('#registerRegion').val(data.registerRegion);
                        $('#busniessAddress').val(data.busniessAddress);
                        $('#businessRegion').val(data.businessRegion);
                        $('#businessPostalCode').val(data.businessPostalCode);
                        $('#legalName').val(data.legalName);
                        $('#legalMobile').val(data.legalMobile);
                        $('#legalTel').val(data.legalTel);
                        $('#legalEmail').val(data.legalEmail);
                        $('#operatorName').val(data.operatorName);
                        $('#operatorMobile').val(data.operatorMobile);
                        $('#operatorTel').val(data.operatorTel);
                        $('#operatorEmail').val(data.operatorEmail);
                        $('#complaintTel').val(data.complaintTel);
                        $('#businessHours').val(data.businessHours);
                        $('input[type=radio][name=workingHoursQuotaExecutionStandard][value="' + data.workingHoursQuotaExecutionStandard + '"]').attr('checked', true);
                        $('#workingHoursPrice').val(data.workingHoursPrice);
                        $('input[type=radio][name=industryCategory][value="' + data.industryCategory + '"]').attr('checked', true);
                        if (data.industryCategory == 4) {
                            $('#industryCategoryOtherDiv').removeClass("layui-hide").addClass("layui-show");
                            $('#industryCategoryOther').val(data.industryCategoryOther);
                        }
                        $('input[type=radio][name=economicType][value="' + data.economicType + '"]').attr('checked', true);
                        if (data.economicType == 10) {
                            $('#economicTypeOtherDiv').removeClass("layui-hide").addClass("layui-show");
                            $('#economicTypeOther').val(data.economicTypeOther);
                        }
                        if (data.businessScopes.length > 0) {
                            for (var i = 0; i < data.businessScopes.length; i++) {
                                if (data.businessScopes[i].scope1 == 1) {
                                    $('input[type=checkbox][name=scope1][value="' + data.businessScopes[i].scope2 + '"]').attr('checked', true);
                                }
                                if (data.businessScopes[i].scope1 == 2) {
                                    $('input[type=checkbox][name=scope2][value="' + data.businessScopes[i].scope2 + '"]').attr('checked', true);
                                }
                                if (data.businessScopes[i].scope1 == 3) {
                                    $('input[type=checkbox][name=scope3][value="' + data.businessScopes[i].scope2 + '"]').attr('checked', true);
                                }
                                if (data.businessScopes[i].scope1 == 4) {
                                    $('input[type=checkbox][name=scope4][value="' + data.businessScopes[i].scope2 + '"]').attr('checked', true);
                                }
                                if (data.businessScopes[i].scope1 == 5) {
                                    $('input[type=checkbox][name=scope5][value="' + data.businessScopes[i].scope2 + '"]').attr('checked', true);
                                }
                            }
                        }
                        if (data.businessSpheres.length > 0) {
                            for (var i = 0; i < data.businessSpheres.length; i++) {
                                $('input[type=checkbox][name=sphere][value="' + data.businessSpheres[i].sphere + '"]').attr('checked', true);
                                if (data.businessSpheres[i].sphere == 10) {
                                    $('#sphereOtherDiv').removeClass("layui-hide").addClass("layui-show");
                                    $('#sphereOther').val(data.businessSpheres[i].sphereOther);
                                }
                            }
                        }
                        $('input[type=radio][name=employeeNumber][value="' + data.employeeNumber + '"]').attr('checked', true);
                        $('input[type=radio][name=floorSpace][value="' + data.floorSpace + '"]').attr('checked', true);
                        $('#manager').val(data.staffSummary.manager);
                        $('#serviceLeader').val(data.staffSummary.serviceLeader);
                        $('#technologyLeader').val(data.staffSummary.technologyLeader);
                        $('#qualityInspector').val(data.staffSummary.qualityInspector);
                        $('#managerOther').val(data.staffSummary.managerOther);

                        $('#machinistSeniorTechnician').val(data.staffSummary.machinistSeniorTechnician);
                        $('#machinistTechnician').val(data.staffSummary.machinistTechnician);
                        $('#machinistSenior').val(data.staffSummary.machinistSenior);
                        $('#machinistMedium').val(data.staffSummary.machinistMedium);
                        $('#electricianSeniorTechnician').val(data.staffSummary.electricianSeniorTechnician);
                        $('#electricianTechnician').val(data.staffSummary.electricianTechnician);
                        $('#electricianSenior').val(data.staffSummary.electricianSenior);
                        $('#electricianMedium').val(data.staffSummary.electricianMedium);
                        $('#tinbenderSeniorTechnician').val(data.staffSummary.tinbenderSeniorTechnician);
                        $('#tinbenderTechnician').val(data.staffSummary.tinbenderTechnician);
                        $('#tinbenderSenior').val(data.staffSummary.tinbenderSenior);
                        $('#tinbenderMedium').val(data.staffSummary.tinbenderMedium);
                        $('#painterSeniorTechnician').val(data.staffSummary.painterSeniorTechnician);
                        $('#painterTechnician').val(data.staffSummary.painterTechnician);
                        $('#painterSenior').val(data.staffSummary.painterSenior);
                        $('#painterMedium').val(data.staffSummary.painterMedium);

                        if (data.repairModels.length > 0) {
                            for (var i = 0; i < data.repairModels.length; i++) {
                                $('input[type=checkbox][name=model][value="' + data.repairModels[i].model + '"]').attr('checked', true);
                                if (data.repairModels[i].model == 6) {
                                    $('#modelOtherDiv').removeClass("layui-hide").addClass("layui-show");
                                    $('#modelOther').val(data.repairModels[i].modelOther);
                                }
                            }
                        }
                        if (data.rescue) {
                            $('input[type=checkbox][name=rescue]').attr('checked', true);
                        }else {
                            $('input[type=checkbox][name=rescue]').attr('checked', false);
                        }
                        if (data.specialRepair) {
                            $('input[type=checkbox][name=specialRepair]').attr('checked', true);
                            $('#specialRepairBrandDiv').removeClass("layui-hide").addClass("layui-show");
                            $('#specialRepairBrand').val(data.specialRepairBrand);
                        }else {
                            $('input[type=checkbox][name=specialRepair]').attr('checked', false);
                        }
                        if (data.iso) {
                            $('input[type=checkbox][name=iso]').attr('checked', true);
                        }else {
                            $('input[type=checkbox][name=iso]').attr('checked', false);
                        }
                        if (data.throughSafetyProductionStandardization) {
                            $('input[type=checkbox][name=throughSafetyProductionStandardization]').attr('checked', true);
                        }else {
                            $('input[type=checkbox][name=throughSafetyProductionStandardization]').attr('checked', false);
                        }
                        if (data.throughEnvironmentalProtectionSpecialRenovation) {
                            $('input[type=checkbox][name=throughEnvironmentalProtectionSpecialRenovation]').attr('checked', true);
                        }else {
                            $('input[type=checkbox][name=throughEnvironmentalProtectionSpecialRenovation]').attr('checked', false);
                        }
                        if (data.sincerity) {
                            $('input[type=checkbox][name=sincerity]').attr('checked', true);
                            $('#sincerityYearDiv').removeClass("layui-hide").addClass("layui-show");
                            $('#sincerityYear').val(data.sincerityYear);
                        }else {
                            console.log(data.sincerity)
                            $('input[type=checkbox][name=sincerity]').attr('checked', false);
                        }
                        $('input[type=radio][name=qualityReputationAssessmentLevel][value="' + data.qualityReputationAssessmentLevel + '"]').attr('checked', true);
                        if (data.offerOnsiteRepair) {
                            $('input[type=checkbox][name=offerOnsiteRepair]').attr('checked', true);
                        }else {
                            $('input[type=checkbox][name=offerOnsiteRepair]').attr('checked', false);
                        }
                        if (data.onSiteServices.length > 0) {
                            for (var i = 0; i < data.onSiteServices.length; i++) {
                                $('input[type=checkbox][name=serviceCategory][value="' + data.onSiteServices[i].serviceCategory + '"]').attr('checked', true);
                                if (data.onSiteServices[i].serviceCategory == 7) {
                                    $('#serviceCategoryOtherDiv').removeClass("layui-hide").addClass("layui-show");
                                    $('#serviceCategoryOther').val(data.onSiteServices[i].serviceCategoryOther);
                                }
                            }
                        }


                        $('#specialService').val(data.repairCorpDesc.specialService);
                        $('#selfDesc').val(data.repairCorpDesc.selfDesc);
                        $('#selfIntroduction').val(data.repairCorpDesc.selfIntroduction);
                        $('#honor').val(data.repairCorpDesc.honor);
                        if (data.openOnlineRepairService) {
                            $('input[type=checkbox][name=openOnlineRepairService]').attr('checked', true);
                        }else {
                            $('input[type=checkbox][name=openOnlineRepairService]').attr('checked', false);
                        }
                        if (data.openOnlineBusinessService) {
                            $('input[type=checkbox][name=openOnlineBusinessService]').attr('checked', true);
                        }else {
                            $('input[type=checkbox][name=openOnlineBusinessService]').attr('checked', false);
                        }
                        $("#submitBtn").addClass('layui-hide');
                        form.render();
                        if(type == 'info'){
                            $('input').attr('disabled',true);
                            $('select').attr('disabled',true);
                            $('#registerRegion').attr('disabled',true);
                            $('#businessRegion').attr('disabled',true);
                            $('textarea').attr('disabled',true);
                            form.render();
                        }else{
                            $("#saveBtn").removeClass('layui-hide');
                        }
                    }
                    layer.closeAll();
                });
            }


        });
    });
</script>
</html>
