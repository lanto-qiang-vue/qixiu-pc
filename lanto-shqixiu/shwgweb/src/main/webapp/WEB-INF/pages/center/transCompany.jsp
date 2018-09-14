<%@page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp" %>
    <%@ include file="/WEB-INF/pages/common/head.jsp" %>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp" %>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp" %>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">运输企业信息管理</span> <span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>运输企业信息管理</span></span>
        </div>
        <div style="margin-top: 10px">

            <form class="layui-form"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">企业编号</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="CORP_NUM" placeholder="" >
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">企业名称</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="CORP_NAME" placeholder="" >
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">所属辖区</label>
                    <div class="layui-input-block">
                        <select id="CORP_AREA" >
                            <option value="">全部</option>
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
                    <label class="layui-form-label">道路经营许可证号</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="BUSINESS_NUM" placeholder="" >
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label">企业地址</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="CORP_ADD" placeholder="" >
                    </div>
                </div>
                <div class="layui-form-item layui-inline" style="width: 300px">
                    <label class="layui-form-label"></label>
                    <div class="layui-input-block">
                        <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo">查询</div>
                        <div id="addButton" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" >新增</div>
                    </div>
                </div>
            </form>


        </div>
        <table id="table1" class="layui-table" lay-size="sm" style="">
            <colgroup>
                <col width="100">
                <col width="300">
                <col width="200">
                <col width="100">
                <col width="100">
                <col width="100">
                <col width="80">
                <col width="100">
                <col width="300">
                <col width="100">
            </colgroup>
            <thead>
            <tr>
                <th>企业编号</th>
                <th>企业名称</th>
                <th>道路经营许可证号</th>
                <th>首次发证时间</th>
                <th>有效开始日期</th>
                <th>有效结束日期</th>
                <th>所属辖区</th>
                <th>企业负责人</th>
                <th>企业地址</th>
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
    <div class="layui-form"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">企业编号</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CORP_NUM_add" placeholder="系统自动生成" disabled style="background-color: #dcdcdc">
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>企业名称</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CORP_NAME_add" lay-verify="required" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">企业负责人</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CHARGE_PERSON" placeholder="" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">负责人手机</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="LEGAL_TEL" placeholder="" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>所属辖区</label>
            <div class="layui-input-block">
                <select id="CORP_AREA_add" lay-verify="required">
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
            <label class="layui-form-label">企业联系电话</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="SERVICE_HOTLINE" placeholder="" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>道路经营许可证号</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="BUSINESS_NUM_add" lay-verify="required" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>发证日期</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CERT_DATE" lay-verify="required" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>有效开始日期</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="VALID_START_DATE" lay-verify="required" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>有效结束日期</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="VALID_END_DATE" lay-verify="required" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">电子邮箱</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="EMAIL" placeholder="" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>联系人</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CONTACTS" lay-verify="required" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"><span style="color: red">*</span>联系人手机</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CONTACTS_TEL" lay-verify="required" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">企业地址</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="CORP_ADD_add" placeholder="" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">企业网址</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="WEB_SITE" placeholder="" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label">备注</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" id="REMARK" placeholder="" >
            </div>
        </div>
        <div class="layui-form-item layui-inline" style="width: 300px">
            <label class="layui-form-label"></label>
            <div class="layui-input-block">
                <div id="submit" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" >提交</div>
            </div>
        </div>
    </div>
</div>

<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    var datas=[];
    $(function () {
        var form = layui.form;
        form.render()
//        form.verify()

        var laydate = layui.laydate;
        laydate.render({
            elem: '#CERT_DATE',
            type: 'date',
            format: 'yyyy-MM-dd',
        });
        laydate.render({
            elem: '#VALID_START_DATE',
            type: 'date',
            format: 'yyyy-MM-dd',
        });
        laydate.render({
            elem: '#VALID_END_DATE',
            type: 'date',
            format: 'yyyy-MM-dd',
        });

        var laypage = layui.laypage;
        search(10, 1, laypage)

        $("#addButton").click(function () {
            $("#form .layui-input").val("")
            $("#form #submit").attr("comid", "")
            var form = layui.form;
            form.render()
            layer.open({
                type: 1,
                content: $('#form'),
                title: "新增运输企业",
                area: ['700px', '600px'],
                cancel: function () {
                    $("#form").hide()
                }
            });
        })

        $('#search').click(function () {
            search(10, 1, laypage)
        })

        $("#submit").click(function () {
            if(!$('#CORP_NAME_add').val()||!$('#CORP_AREA_add').val()||!$('#BUSINESS_NUM_add').val()||!$('#CERT_DATE').val()||!$('#VALID_START_DATE').val()||!$('#VALID_END_DATE').val()||!$('#CONTACTS').val()||!$('#CONTACTS_TEL').val()) {
                layer.msg('必填项不能为空！');
                return
            }

            var param = {
                CORP_NAME: $('#CORP_NAME_add').val(),
                CHARGE_PERSON: $('#CHARGE_PERSON').val(),
                LEGAL_TEL: $('#LEGAL_TEL').val(),
                CORP_AREA: $('#CORP_AREA_add').val(),
                SERVICE_HOTLINE: $('#SERVICE_HOTLINE').val(),
                BUSINESS_NUM: $('#BUSINESS_NUM_add').val(),
                CERT_DATE: $('#CERT_DATE').val(),
                VALID_START_DATE: $('#VALID_START_DATE').val(),
                VALID_END_DATE: $('#VALID_END_DATE').val(),
                EMAIL: $('#EMAIL').val(),
                CONTACTS: $('#CONTACTS').val(),
                CONTACTS_TEL: $('#CONTACTS_TEL').val(),
                CORP_ADD: $('#CORP_ADD_add').val(),
                WEB_SITE: $('#WEB_SITE').val(),
                REMARK: $('#REMARK').val(),
            }
            var comid=$("#form #submit").attr("comid")
//            console.log(comid)
//            if(comid){
                param.CORP_ID= comid;
                param.CORP_NUM= $('#CORP_NUM_add').val();
//            }

            var data={
                data: JSON.stringify(param)
            }

            normalPost(baseu + '/manage/transcorp/tccorpinfo/save', data, function (res) {
                console.log('res',res)
                if(res.success){
                    layer.closeAll()
                    $("#form").hide()
                    search(10, 1, laypage)
                    if(!comid)
                        layer.msg('新增成功！');
                    else
                        layer.msg('修改成功！');
                }
            })

        })
    });

    function search(pageSize, pageNo, laypage) {
        var ii = layer.load();

        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (pageSize ? pageSize : 10),
            page: pageNo,
//            start: 0,
            CORP_NUM: $("#CORP_NUM").val(),
            CORP_NAME: $("#CORP_NAME").val(),
            CORP_AREA: $("#CORP_AREA").val(),
            BUSINESS_NUM: $("#BUSINESS_NUM").val(),
            CORP_ADD: $("#CORP_ADD").val()

        }
        normalPost(baseu + '/manage/transcorp/tccorpinfo/list', param, function (res) {
            console.log('res',res)
            if(res.success){
                var html='';datas= res.data
                for (var i in datas){
                    html+='<tr>' +
                        '<td>'+datas[i].CORP_NUM+'</td>' +
                        '<td>'+datas[i].CORP_NAME+'</td>' +
                        '<td>'+datas[i].BUSINESS_NUM+'</td>' +
                        '<td>'+datas[i].CERT_DATE+'</td>' +
                        '<td>'+datas[i].VALID_START_DATE+'</td>' +
                        '<td>'+datas[i].VALID_END_DATE+'</td>' +
                        '<td>'+formatArea(datas[i].CORP_AREA)+'</td>' +
                        '<td>'+datas[i].CHARGE_PERSON+'</td>' +
                        '<td>'+datas[i].CORP_ADD+'</td>' +
                        '<td><div id="look" class="layui-btn layui-btn-normal" onclick="look('+datas[i].CORP_ID+')">查看/修改</div></td>' +
                    '</tr>'
                }
                $("#table1 tbody").html(html)
            }

            if (laypage) {
                laypage.render({
                    elem: 'pagebar'
                    , count: res.total //数据总数，从服务端得到
                    ,layout: ['count', 'prev', 'page','next']
                    , jump: function (obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                        //首次不执行
                        if (!first) {
                            search(pageSize, obj.curr)
                            //do something

                        }
                    }
                });
            }
            layer.close(ii);
        })
    }

    function look(id) {
        console.log(datas)
        $("#form .layui-input").val("")
        $("#form #submit").attr("comid", id)
        var form = layui.form;
        for (var i in datas){
            if(datas[i].CORP_ID== id){
                $('#CORP_NUM_add').val(datas[i].CORP_NUM)
                $('#CORP_NAME_add').val(datas[i].CORP_NAME),
                $('#CHARGE_PERSON').val(datas[i].CHARGE_PERSON),
                $('#LEGAL_TEL').val(datas[i].LEGAL_TEL),
                $('#CORP_AREA_add').val(datas[i].CORP_AREA),
                $('#SERVICE_HOTLINE').val(datas[i].SERVICE_HOTLINE),
                $('#BUSINESS_NUM_add').val(datas[i].BUSINESS_NUM),
                $('#CERT_DATE').val(datas[i].CERT_DATE.split(' ')[0]),
                $('#VALID_START_DATE').val(datas[i].VALID_START_DATE.split(' ')[0]),
                $('#VALID_END_DATE').val(datas[i].VALID_END_DATE.split(' ')[0]),
                $('#EMAIL').val(datas[i].EMAIL),
                $('#CONTACTS').val(datas[i].CONTACTS),
                $('#CONTACTS_TEL').val(datas[i].CONTACTS_TEL),
                $('#CORP_ADD_add').val(datas[i].CORP_ADD),
                $('#WEB_SITE').val(datas[i].WEB_SITE),
                $('#REMARK').val(datas[i].REMARK)
            }
        }
        form.render()
        layer.open({
            type: 1,
            content: $('#form'),
            title: "查看/修改运输企业",
            area: ['700px', '600px'],
            cancel: function () {
                $("#form").hide()
            }
        });
    }


</script>

</html>
