<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <link rel="stylesheet" href="/statics/js/lib/zoomify.min.css">
    <script src="/statics/js/lib/zoomify.min.js"></script>
</head>
<style>
    .imgblock{
        width: 25%;
        float: left;
        text-align: center;
        padding: 0 5px;
        overflow: hidden;
    }
    .imgblock .layui-btn{
        position: relative;
    }
    .imgblock .layui-btn input{
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        left: 0;
        cursor: pointer;
    }

    .imgblock .thisimg{
        padding: 10px;
        position: relative;
    }
    .imgblock .thisimg img{
        max-width: 100%;
    }
    .imgblock .thisimg .removeImg{
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 30px;
        color: #b3b3b3;
        cursor: pointer;
    }

    .zoomify.zoomed{
        position: fixed;
        z-index: 20000001;
    }
    .zoomify-shadow{
        z-index: 20000000;
    }
</style>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">运输车辆技术档案</span> <span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>运输车辆技术档案</span></span>
        </div>
        <div style="margin-top: 10px">

            <form class="layui-form"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">档案号</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="RECORD_NO_lk"  >
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">车牌号</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="PLATE_NUM_lk"  >
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">车牌颜色</label>
                    <div class="layui-input-block">
                        <select id="PLATE_COLOR_eq">
                            <option value="">全部</option>
                            <option value="10061001">黄</option>
                            <option value="10061002">蓝</option>
                            <option value="10061003">白</option>
                            <option value="10061004">黑</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">车辆类型</label>
                    <div class="layui-input-block">
                        <select id="VEHICLE_TYPE_eq">
                            <option value="">全部</option>
                            <option value="10071001">出租客车</option>
                            <option value="10071002">普通货运</option>
                            <option value="10071003">危险货运</option>
                            <option value="10071004">客运班车</option>
                            <option value="10071005">旅游包车</option>
                            <option value="10071006">教练车</option>

                        </select>
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">预警状态</label>
                    <div class="layui-input-block">
                        <select id="WARN_TYPE_eq">
                            <option value="">全部</option>
                            <option value="10171001">已逾期</option>
                            <option value="10171002">即将预期</option>
                            <option value="10171003">未提交维护计划</option>
                            <option value="10171004">不存在维修记录</option>
                            <option value="10171005">正常维护</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">营运状态</label>
                    <div class="layui-input-block">
                        <select id="STATUS_eq">
                            <option value="">全部</option>
                            <option value="10081001">营运</option>
                            <option value="10081002">停运</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">是否个体户</label>
                    <div class="layui-input-block">
                        <select id="IS_SINGLE_eq">
                            <option value="">全部</option>
                            <option value="10041001">是</option>
                            <option value="10041002">否</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">操作</label>
                    <div class="layui-input-block">
                        <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">搜索</div>
                        <div id="addButton" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" >添加</div>
                    </div>
                </div>
            </form>


        </div>
        <table id="table1" class="layui-table" lay-size="sm" style="">
            <colgroup>
                <col width="80">
                <col width="100">
                <col width="80">
                <col width="300">
                <col width="100">
                <col width="80">
                <col width="150">
                <col width="100">
                <col width="100">
                <col width="100">
                <col width="80">
                <col width="200">
            </colgroup>
            <thead>
            <tr>
                <th>档案号</th>
                <th>车牌号</th>
                <th>车牌颜色</th>
                <th>所属运输企业</th>
                <th>车辆类型</th>
                <th>驾驶员</th>
                <th>预警状态</th>
                <th>发证日期</th>
                <th>上次维修时间</th>
                <th>上次评定时间</th>
                <th>营运状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
    </div>
</div>

<div id="form" style="display: none;padding: 10px">
<div class="layui-tab layui-tab-card" lay-filter="tab">
<%--<ul class="layui-tab-title" style="height: 60px;overflow: auto">--%>
<ul class="layui-tab-title">
<li class="layui-this" lay-id="1">车辆基本情况</li>
<li>车辆技术参数</li>
<li>车辆变更登记</li>
<li>车辆使用登记</li>
<li>车辆交通事故登记</li>
<li>车辆驾驶员登记</li>
</ul>
<div class="layui-tab-content">
<div class="layui-tab-item layui-show">
<div class="layui-form">
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"><span style="color: red">*</span>所属企业</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="CORP_NAME" placeholder="请选择" lay-verify="required">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"><span style="color: red">*</span>车牌号码</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="PLATE_NUM" lay-verify="required">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"><span style="color: red">*</span>车牌颜色</label>
        <div class="layui-input-block">
            <select id="PLATE_COLOR" lay-verify="required">
                <option value="">请选择</option>
                <option value="10061001">黄</option>
                <option value="10061002">蓝</option>
                <option value="10061003">白</option>
                <option value="10061004">黑</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"><span style="color: red">*</span>车辆类型</label>
        <div class="layui-input-block">
            <select id="VEHICLE_TYPE" lay-verify="required">
                <option value="">请选择</option>
                <option value="10071001">出租客车</option>
                <option value="10071002">普通货运</option>
                <option value="10071003">危险货运</option>
                <option value="10071004">客运班车</option>
                <option value="10071005">旅游包车</option>
                <option value="10071006">教练车</option>

            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"><span style="color: red">*</span>发证日期</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="CERT_DATE" lay-verify="required" >
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">厂家</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="VENDER">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">品牌</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="BRAND">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">车型</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="XM">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">道路运输许可证号</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="LOAD_CERT_NUM">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">营运状态</label>
        <div class="layui-input-block">
            <select id="STATUS">
                <option value="">请选择</option>
                <option value="10081001">营运</option>
                <option value="10081002">停运</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">所属辖区</label>
        <div class="layui-input-block">
            <select id="COUNTY">
                <option value="">请选择</option>
                <option value="310000">沪市</option>
                <option value="310112">沪闵</option>
                <option value="310113">沪宝</option>
                <option value="310114">沪嘉</option>
                <option value="310115">沪浦</option>
                <option value="310116">沪金</option>
                <option value="310117">沪松</option>
                <option value="310118">沪青</option>
                <option value="310120">沪奉</option>
                <option value="310130">沪崇</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">燃料类型</label>
        <div class="layui-input-block">
            <select id="FUEL_TYPE">
                <option value="">请选择</option>
                <option value="10111001">汽油</option>
                <option value="10111002">柴油</option>
                <option value="10111003">天然气</option>
                <option value="10111004">电力</option>
                <option value="10111005">混合动力</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">车架号</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="CHASSIS_NUM">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">发动机号</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="ENGINE_NUM">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">使用类别</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="USE_TYPE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">车辆吨位</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="TONNAGE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">座位</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="SEAT">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">建档里程</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="FIRST_MILEAGE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">年检日期</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="CHECK_DATE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">上次维修日期</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="LAST_REPAIR_DATE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">上次评定日期</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="LAST_CHECK_DATE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">注册日期</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="REG_DATE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">驾驶员</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="UNIT_NAME">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">是否个体户</label>
        <div class="layui-input-block">
            <select id="IS_SINGLE">
                <option value="10041002" selected>否</option>
                <option value="10041001">是</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">车主姓名</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="OWNER_NAME">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">车主电话</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="OWNER_PHONE">
        </div>
    </div>

    <div style="width: 100%">
        <div class="layui-form-item layui-inline" style="width: 100%">
            <label class="layui-form-label">上传图片</label>
            <div class="layui-input-block">
                <div class="imgblock">
                    <h3>行驶证</h3>
                    <div class="layui-btn layui-btn-normal" >
                        <i class="layui-icon">&#xe67c;</i>添加图片
                        <input class="xsz" onchange="getImg('xsz')" type="file" accept="image/jpg,image/png,image/bmp">
                    </div>
                    <%--<div>仅支持PNG、JPG、JPEG、BMP</div>--%>
                    <div id="xsz">

                    </div>
                </div>
                <div class="imgblock">
                    <h3>营运证</h3>
                    <div class="layui-btn layui-btn-normal" >
                        <i class="layui-icon">&#xe67c;</i>添加图片
                        <input class="yyz" onchange="getImg('yyz')" type="file" accept="image/jpg,image/png,image/bmp">
                    </div>
                    <%--<div>仅支持PNG、JPG、JPEG、BMP</div>--%>
                    <div id="yyz">

                    </div>
                </div>
                <div class="imgblock">
                    <h3>通行证</h3>
                    <div class="layui-btn layui-btn-normal" >
                        <i class="layui-icon">&#xe67c;</i>添加图片
                        <input class="txz" onchange="getImg('txz')" type="file" accept="image/jpg,image/png,image/bmp">
                    </div>
                    <%--<div>仅支持PNG、JPG、JPEG、BMP</div>--%>
                    <div id="txz">

                    </div>
                </div>
                <div class="imgblock">
                    <h3>保单</h3>
                    <div class="layui-btn layui-btn-normal" >
                        <i class="layui-icon">&#xe67c;</i>添加图片
                        <input class="bd" onchange="getImg('bd')" type="file" accept="image/jpg,image/png,image/bmp">
                    </div>
                    <%--<div>仅支持PNG、JPG、JPEG、BMP</div>--%>
                    <div id="bd">

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"></label>
        <div class="layui-input-block">
            <div id="submitBase" class="layui-btn layui-btn-normal" lay-submit>提交</div>
        </div>
    </div>
</div>
</div>
<div class="layui-tab-item">
<div class="layui-form">
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"><span style="color: red">*</span>出厂日期</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="PRODUCTION_DATE" lay-verify="required" >
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">出厂场地</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="PRODUCTION_PLACE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">底盘厂牌型号:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="BRAND_MODEL">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">客车类型等级:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="BUS_LEVEL">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">车辆外廓尺寸:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="VEHICLE_DIMENSIONS">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">总质量:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="TOTAL_MASS">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">作为排列</label>
        <div class="layui-input-block">
            <select id="SEAT_ARRANGEMENT">
                <option value="">请选择</option>
                <option value="2+2">2+2</option>
                <option value="2+1">2+1</option>
                <option value="1+1+1">1+1+1</option>
                <option value="1+1">1+1</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">核定乘员数:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="OCCUPANT_NUMBER">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">核定牵引总质量:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="TRACTION_MASS">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">车轴数/驱动轴数:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="AXLE_NUMBER">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">发动机厂牌型号:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="ENGINE_BRAND">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">发动机功率:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="ENGINE_POWER">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">发动机排量:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="ENGINE_DISPLACEMENT">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">排放标准:</label>
        <div class="layui-input-block">
            <select id="EMISSION_STANDARD">
                <option value="">请选择</option>
                <option value="国II">国II</option>
                <option value="国III">国III</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">驱动形式:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="DRIVE_TYPE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">轮胎数/规格:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="TYRE_NUMBER">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">前照灯制式:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="HEADLIGHT_TYPE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">变速器形式:</label>
        <div class="layui-input-block">
            <select id="TRANSMISSION_TYPE">
                <option value="">请选择</option>
                <option value="自动">自动</option>
                <option value="手动">手动</option>
                <option value="手自动一体化">手自动一体化</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">缓速器:</label>
        <div class="layui-input-block">
            <select id="RETARDER">
                <option value="">请选择</option>
                <option value="自动">电磁式</option>
                <option value="手动">液力式</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">转向器:</label>
        <div class="layui-input-block">
            <select id="STEERING_GEAR">
                <option value="">请选择</option>
                <option value="动力转向">动力转向</option>
                <option value="非动力转向">非动力转向</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">行车制动形式:</label>
        <div class="layui-input-block">
            <select id="BRAKE_TYPE">
                <option value="">请选择</option>
                <option value="气">气</option>
                <option value="液">液</option>
                <option value="气-液">气-液</option>
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">悬挂形式:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="SUSPENSION_TYPE">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label">其他配置:</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" id="QTPZ">
        </div>
    </div>
    <div class="layui-form-item layui-inline" style="width: 300px">
        <label class="layui-form-label"></label>
        <div class="layui-input-block">
            <div id="submitParam" class="layui-btn layui-btn-normal" lay-submit>提交</div>
        </div>
    </div>
</div>
</div>
<div class="layui-tab-item tablechange">
    <div id="addchange" class="layui-btn layui-btn-normal" >添加</div>
    <div id="savechange" class="layui-btn layui-btn-normal" >保存</div>
    <div id="delchange" class="layui-btn layui-btn-danger" >删除</div>
    <table id="tablechange" class="layui-table" lay-filter="tablechange">
    </table>
</div>
<div class="layui-tab-item tableuse">
    <div id="adduse" class="layui-btn layui-btn-normal" >添加</div>
    <div id="saveuse" class="layui-btn layui-btn-normal" >保存</div>
    <div id="deluse" class="layui-btn layui-btn-danger" >删除</div>
    <table id="tableuse" class="layui-table" lay-filter="tableuse">
    </table>
</div>
<div class="layui-tab-item tableaccident">
    <div id="addaccident" class="layui-btn layui-btn-normal" >添加</div>
    <div id="saveaccident" class="layui-btn layui-btn-normal" >保存</div>
    <div id="delaccident" class="layui-btn layui-btn-danger" >删除</div>
    <table id="tableaccident" class="layui-table" lay-filter="tableaccident">
    </table>
</div>
<div class="layui-tab-item tabledriver">
    <div id="adddriver" class="layui-btn layui-btn-normal" >添加</div>
    <div id="savedriver" class="layui-btn layui-btn-normal" >保存</div>
    <div id="deldriver" class="layui-btn layui-btn-danger" >删除</div>
    <table id="tabledriver" class="layui-table" lay-filter="tabledriver">
    </table>
</div>
</div>
</div>
</div>

<div id="form2" style="display: none;padding: 10px">
    <div class="layui-form">
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">企业编号</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CORP_NUM"  >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">企业名称</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CORP_NAME_sel"  >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">所属辖区</label>
            <div class="layui-input-block">
                <select id="CORP_AREA">
                    <option value="">请选择</option>
                    <option value="310000">沪市</option>
                    <option value="310112">沪闵</option>
                    <option value="310113">沪宝</option>
                    <option value="310114">沪嘉</option>
                    <option value="310115">沪浦</option>
                    <option value="310116">沪金</option>
                    <option value="310117">沪松</option>
                    <option value="310118">沪青</option>
                    <option value="310120">沪奉</option>
                    <option value="310130">沪崇</option>
                </select>
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"></label>
            <div class="layui-input-block">
                <div id="searchcomp" class="layui-btn layui-btn-normal" lay-submit>查询</div>
            </div>
        </div>
    </div>
    <table id="table2" class="layui-table" lay-size="sm" style="">
        <colgroup>
            <col width="100">
            <col width="300">
            <col width="100">
            <col width="80">
        </colgroup>
        <thead>
        <tr>
            <th>企业编号</th>
            <th>企业名称</th>
            <th>所属辖区</th>
            <th>选择</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    <div id="pagebar2" style="text-align:center;margin-top:5px;"></div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
<script src="/statics/js/front/techRecord.js?time=2018070601"></script>
</body>
</html>
