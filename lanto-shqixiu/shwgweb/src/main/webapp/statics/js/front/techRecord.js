var datas=[], index, model={
    changerender:null,
    changedata:[],
    userender:null,
    usedata:[],
    accidentrender:null,
    accidentdata:[],
    driverrender:null,
    driverdata:[]
};
$(function () {

    var form = layui.form;
    form.render()

    var element = layui.element;
    element.render()

    var table = layui.table;

    var laydate = layui.laydate;
    laydate.render({
        elem: '#CERT_DATE',
        type: 'date',
        format: 'yyyy-MM-dd',
    });
    laydate.render({
        elem: '#CHECK_DATE',
        type: 'date',
        format: 'yyyy-MM-dd',
    });
    laydate.render({
        elem: '#LAST_REPAIR_DATE',
        type: 'date',
        format: 'yyyy-MM-dd',
    });
    laydate.render({
        elem: '#LAST_CHECK_DATE',
        type: 'date',
        format: 'yyyy-MM-dd',
    });
    laydate.render({
        elem: '#REG_DATE',
        type: 'date',
        format: 'yyyy-MM-dd',
    });
    laydate.render({
        elem: '#PRODUCTION_DATE',
        type: 'date',
        format: 'yyyy-MM-dd',
    });

    var laypage = layui.laypage;
    var laypage2 = layui.laypage;
    search(10, 1, laypage)
    search2(10, 1, laypage2)

    $('#search').click(function () {
        search(10, 1, laypage)
    })

    $('#searchcomp').click(function () {
        search2(10, 1, laypage2)
    })

    $("#addButton").click(function () {
        element.tabChange('tab','1')
        $("#form .layui-input,#form select").val("")
        $("#form #submitBase").attr("vid", "")
        $("#form #submitParam").attr("vid", "")

        var form = layui.form;
        form.render()
        layer.open({
            type: 1,
            content: $('#form'),
            title: "新增技术档案",
            area: ['90%', '90%'],
            cancel: function () {
                $("#form").hide()
            }
        });
        model.changedata=[],renderchange();
        model.usedata=[],renderuse();
        model.accidentdata=[],renderaccident();
        model.driverdata=[],renderdriver();
        $('#xsz').html(' ')
        $('#yyz').html(' ')
        $('#txz').html(' ')
        $('#bd').html(' ')
    })

    $("#CORP_NAME").click(function () {
        index= layer.open({
            type: 1,
            content: $('#form2'),
            title: "选择运输企业",
            area: ['650px', '600px'],
            cancel: function () {
                $("#form2").hide()
            }
        });
    })

    $("#addchange").click(function () {
        model.changedata.push({index: (model.changedata.length?model.changedata[model.changedata.length-1].index+1:0) ,CHANGE_DATE:'', CHANGE_REASON:'', CHANGE_ITEM:''})
        model.changerender.reload({
            data: model.changedata,
            limit: model.changedata.length
        })
        renddate(".tablechange .layui-table-view .change_date","changedata","CHANGE_DATE")
    })
    $("#adduse").click(function () {
        model.usedata.push({index: (model.usedata.length?model.usedata[model.usedata.length-1].index+1:0) })
        model.userender.reload({
            data: model.usedata,
            limit: model.usedata.length
        })
        renddate(".tableuse .layui-table-view .use_date","usedata","USES_TIME");
    })
    $("#addaccident").click(function () {
        model.accidentdata.push({index: (model.accidentdata.length?model.accidentdata[model.accidentdata.length-1].index+1:0) })
        model.accidentrender.reload({
            data: model.accidentdata,
            limit: model.accidentdata.length
        })
        renddate(".tableaccident .layui-table-view .accident_date","accidentdata","ACCIDENT_DATE");
    })
    $("#adddriver").click(function () {
        model.driverdata.push({index: (model.driverdata.length?model.driverdata[model.driverdata.length-1].index+1:0) })
        model.driverrender.reload({
            data: model.driverdata,
            limit: model.driverdata.length
        })
        renddate(".tabledriver .layui-table-view .entry_time","accidentdata","ENTRY_TIME");
        renddate(".tabledriver .layui-table-view .dimission_time","accidentdata","DIMISSION_TIME");
    })

    $("#savechange").click(function () {
        var vid = $("#submitBase").attr("vid")
        if(!vid){
            layer.msg('请先提交（车辆基本情况）！',function () {
                element.tabChange('tab','1')
            });
            return
        }
        normalPost(baseu + '/manage/vehicle/vehiclebase/save_change', {vehicle_id: vid, parray: JSON.stringify(model.changedata)}, function (res) {
            if(res.success){
                layer.msg('保存成功！')
                datachange(vid)
            }
        })
    })
    $("#saveuse").click(function () {
        var vid = $("#submitBase").attr("vid")
        if(!vid){
            layer.msg('请先提交（车辆基本情况）！',function () {
                element.tabChange('tab','1')
            });
            return
        }
        normalPost(baseu + '/manage/vehicle/vehiclebase/save_uses', {vehicle_id: vid, parray: JSON.stringify(model.usedata)}, function (res) {
            if(res.success){
                layer.msg('保存成功！')
                datause(vid)
            }
        })
    })
    $("#saveaccident").click(function () {
        var vid = $("#submitBase").attr("vid")
        if(!vid){
            layer.msg('请先提交（车辆基本情况）！',function () {
                element.tabChange('tab','1')
            });
            return
        }
        normalPost(baseu + '/manage/vehicle/vehiclebase/save_accident', {vehicle_id: vid, parray: JSON.stringify(model.accidentdata)}, function (res) {
            if(res.success){
                layer.msg('保存成功！')
                dataaccident(vid)
            }
        })
    })
    $("#savedriver").click(function () {
        var vid = $("#submitBase").attr("vid")
        if(!vid){
            layer.msg('请先提交（车辆基本情况）！',function () {
                element.tabChange('tab','1')
            });
            return
        }
        normalPost(baseu + '/manage/vehicle/vehiclebase/save_driver', {vehicle_id: vid, parray: JSON.stringify(model.driverdata)}, function (res) {
            if(res.success){
                layer.msg('保存成功！')
                datadriver(vid)
            }
        })
    })

    $("#delchange").click(function () {
        var checkStatus = table.checkStatus('tablechange'); //test即为基础参数id对应的值
        console.log(checkStatus.data) //获取选中行的数据
        if(!checkStatus.data.length){
            layer.msg('请选择要删除的数据！')
            return
        }
        layer.confirm('确定要删除这些记录吗？', {icon: 3, title:'提示'}, function(index){
            var delid=[]
            for(var i in checkStatus.data){
                if(!checkStatus.data[i].CHANGE_ID){
                    for(var j in model.changedata){
                        if(model.changedata[j].index== checkStatus.data[i].index){
                            model.changedata.splice(parseInt(j), 1)
                        }
                    }
                }else{
                    delid.push(checkStatus.data[i].CHANGE_ID)
                }
            }
            if(delid.length){
                normalPost(baseu + '/manage/vehicle/vehiclebase/deleteVehicleItems', {
                    vehicleId: $("#submitBase").attr("vid"),
                    pid: 'CHANGE_ID',
                    tableName: 'change',
                    ids: delid.join(',')
                }, function (res) {
                    if(res.success){
                        for(var i in delid){
                            for(var j in model.changedata){
                                if(model.changedata[j].CHANGE_ID== delid[i]){
                                    model.changedata.splice(parseInt(j), 1)
                                }
                            }
                        }
                        model.changerender.reload({
                            data: model.changedata,
                            limit: model.changedata.length
                        })
                        renddate(".tablechange .layui-table-view .change_date","changedata","CHANGE_DATE")
                    }
                })
            }
            model.changerender.reload({
                data: model.changedata,
                limit: model.changedata.length
            })
            renddate(".tablechange .layui-table-view .change_date","changedata","CHANGE_DATE")
            layer.close(index);
            layer.msg('删除成功')
        });

    })
    $("#deluse").click(function () {
        var checkStatus = table.checkStatus('tableuse'); //test即为基础参数id对应的值
        console.log(checkStatus.data) //获取选中行的数据
        if(!checkStatus.data.length){
            layer.msg('请选择要删除的数据！')
            return
        }
        layer.confirm('确定要删除这些记录吗？', {icon: 3, title:'提示'}, function(index){
            var delid=[]
            for(var i in checkStatus.data){
                if(!checkStatus.data[i].USES_ID){
                    for(var j in model.usedata){
                        if(model.usedata[j].index== checkStatus.data[i].index){
                            model.usedata.splice(parseInt(j), 1)
                        }
                    }
                }else{
                    delid.push(checkStatus.data[i].USES_ID)
                }
            }
            if(delid.length){
                normalPost(baseu + '/manage/vehicle/vehiclebase/deleteVehicleItems', {
                    vehicleId: $("#submitBase").attr("vid"),
                    pid: 'USES_ID',
                    tableName: 'uses',
                    ids: delid.join(',')
                }, function (res) {
                    if(res.success){
                        for(var i in delid){
                            for(var j in model.usedata){
                                if(model.usedata[j].USES_ID== delid[i]){
                                    model.usedata.splice(parseInt(j), 1)
                                }
                            }
                        }
                        model.userender.reload({
                            data: model.usedata,
                            limit: model.usedata.length
                        })
                        renddate(".tableuse .layui-table-view .use_date","usedata","USES_TIME");
                    }
                })
            }
            model.userender.reload({
                data: model.usedata,
                limit: model.usedata.length
            })
            renddate(".tableuse .layui-table-view .use_date","usedata","USES_TIME");
            layer.close(index);
            layer.msg('删除成功')
        });

    })
    $("#delaccident").click(function () {
        var checkStatus = table.checkStatus('tableaccident'); //test即为基础参数id对应的值
        console.log(checkStatus.data) //获取选中行的数据
        if(!checkStatus.data.length){
            layer.msg('请选择要删除的数据！')
            return
        }
        layer.confirm('确定要删除这些记录吗？', {icon: 3, title:'提示'}, function(index){
            var delid=[]
            for(var i in checkStatus.data){
                if(!checkStatus.data[i].ACCIDENT_ID){
                    for(var j in model.accidentdata){
                        if(model.accidentdata[j].index== checkStatus.data[i].index){
                            model.accidentdata.splice(parseInt(j), 1)
                        }
                    }
                }else{
                    delid.push(checkStatus.data[i].ACCIDENT_ID)
                }
            }
            if(delid.length){
                normalPost(baseu + '/manage/vehicle/vehiclebase/deleteVehicleItems', {
                    vehicleId: $("#submitBase").attr("vid"),
                    pid: 'ACCIDENT_ID',
                    tableName: 'accident',
                    ids: delid.join(',')
                }, function (res) {
                    if(res.success){
                        for(var i in delid){
                            for(var j in model.accidentdata){
                                if(model.accidentdata[j].ACCIDENT_ID== delid[i]){
                                    model.accidentdata.splice(parseInt(j), 1)
                                }
                            }
                        }
                        model.accidentrender.reload({
                            data: model.accidentdata,
                            limit: model.accidentdata.length
                        })
                        renddate(".tableaccident .layui-table-view .accident_date","accidentdata","ACCIDENT_DATE");
                    }
                })
            }
            model.accidentrender.reload({
                data: model.accidentdata,
                limit: model.accidentdata.length
            })
            renddate(".tableaccident .layui-table-view .accident_date","accidentdata","ACCIDENT_DATE");
            layer.close(index);
            layer.msg('删除成功')
        });

    })
    $("#deldriver").click(function () {
        var checkStatus = table.checkStatus('tabledriver'); //test即为基础参数id对应的值
        console.log(checkStatus.data) //获取选中行的数据
        if(!checkStatus.data.length){
            layer.msg('请选择要删除的数据！')
            return
        }
        layer.confirm('确定要删除这些记录吗？', {icon: 3, title:'提示'}, function(index){
            var delid=[]
            for(var i in checkStatus.data){
                if(!checkStatus.data[i].DRIVER_ID){
                    for(var j in model.driverdata){
                        if(model.driverdata[j].index== checkStatus.data[i].index){
                            model.driverdata.splice(parseInt(j), 1)
                        }
                    }
                }else{
                    delid.push(checkStatus.data[i].DRIVER_ID)
                }
            }
            if(delid.length){
                normalPost(baseu + '/manage/vehicle/vehiclebase/deleteVehicleItems', {
                    vehicleId: $("#submitBase").attr("vid"),
                    pid: 'DRIVER_ID',
                    tableName: 'driver',
                    ids: delid.join(',')
                }, function (res) {
                    if(res.success){
                        for(var i in delid){
                            for(var j in model.driverdata){
                                if(model.driverdata[j].DRIVER_ID== delid[i]){
                                    model.driverdata.splice(parseInt(j), 1)
                                }
                            }
                        }
                        model.driverrender.reload({
                            data: model.driverdata,
                            limit: model.driverdata.length
                        })
                        renddate(".tabledriver .layui-table-view .entry_time","accidentdata","ENTRY_TIME");
                        renddate(".tabledriver .layui-table-view .dimission_time","accidentdata","DIMISSION_TIME");
                    }
                })
            }
            model.driverrender.reload({
                data: model.driverdata,
                limit: model.driverdata.length
            })
            renddate(".tabledriver .layui-table-view .entry_time","accidentdata","ENTRY_TIME");
            renddate(".tabledriver .layui-table-view .dimission_time","accidentdata","DIMISSION_TIME");
            layer.close(index);
            layer.msg('删除成功')
        });

    })

    $("#submitBase").click(function () {
        if(!$('#CORP_NAME').val()||!$('#PLATE_NUM').val()||!$('#PLATE_COLOR').val()||!$('#VEHICLE_TYPE').val()||!$('#CERT_DATE').val()) return
        var param = {
            CORP_NAME: $('#CORP_NAME').val(),
            TRANS_CORP_ID: $('#CORP_NAME').attr("corpid"),
//                TRANS_CORP_ID: $('#TRANS_CORP_ID').val(),
            PLATE_NUM: $('#PLATE_NUM').val(),
            PLATE_COLOR: $('#PLATE_COLOR').val(),
            VEHICLE_TYPE: $('#VEHICLE_TYPE').val(),
            VENDER: $('#VENDER').val(),
            BRAND: $('#BRAND').val(),
            XM: $('#XM').val(),
            LOAD_CERT_NUM: $('#LOAD_CERT_NUM').val(),
            CERT_DATE: $('#CERT_DATE').val(),
            STATUS: $('#STATUS').val(),
            PHOTO: $('#PHOTO').val(),
            COUNTY: $('#COUNTY').val(),
            FUEL_TYPE: $('#FUEL_TYPE').val(),
            CHASSIS_NUM: $('#CHASSIS_NUM').val(),
            ENGINE_NUM: $('#ENGINE_NUM').val(),
            USE_TYPE: $('#USE_TYPE').val(),
            TONNAGE: $('#TONNAGE').val(),
            SEAT: $('#SEAT').val(),
            CHECK_DATE: $('#CHECK_DATE').val(),
            FIRST_MILEAGE: $('#FIRST_MILEAGE').val(),
            LAST_REPAIR_DATE: $('#LAST_REPAIR_DATE').val(),
            LAST_CHECK_DATE: $('#LAST_CHECK_DATE').val(),
            UNIT_NAME: $('#UNIT_NAME').val(),
            REG_DATE: $('#REG_DATE').val(),
            IS_SINGLE: $('#IS_SINGLE').val(),
            OWNER_NAME: $('#OWNER_NAME').val(),
            OWNER_PHONE: $('#OWNER_PHONE').val(),
            DRIVING_LICENSE_PIC: getAllImg('#xsz'),
            TRADING_CARD_PIC: getAllImg('#yyz'),
            TRAFFIC_PERMIT_PIC: getAllImg('#txz'),
            GUARANTEE_SLIP_PIC: getAllImg('#bd'),
        }
        param.VEHICLE_ID= $("#submitBase").attr("vid")
        var data={
            data: JSON.stringify(param)
        }
        normalPost(baseu + '/manage/vehicle/vehiclebase/save', data, function (res) {
            console.log('res',res)
            if(res.success){
                if(param.VEHICLE_ID){
                    layer.msg('修改成功！');
                }else{
                    layer.msg('新增成功！');
                }
                $("#submitBase").attr("vid", res.data.VEHICLE_ID)
                $("#submitParam").attr("vid", res.data.VEHICLE_ID)
                search(10, 1, laypage)

            }
        })
    })

    $("#submitParam").click(function () {
        if(!$("#PRODUCTION_DATE").val()) return
        var vid = $(this).attr("vid")
        if(!vid){
            layer.msg('请先提交（车辆基本情况）！',function () {
                element.tabChange('tab','1')
            });
            return
        }
        var param = {
            AXLE_NUMBER:$('#AXLE_NUMBER').val(),
            BRAKE_TYPE:$('#BRAKE_TYPE').val(),
            BRAND_MODEL:$('#BRAND_MODEL').val(),
            BUS_LEVEL:$('#BUS_LEVEL').val(),
            DRIVE_TYPE:$('#DRIVE_TYPE').val(),
            EMISSION_STANDARD:$('#EMISSION_STANDARD').val(),
            ENGINE_BRAND:$('#ENGINE_BRAND').val(),
            ENGINE_DISPLACEMENT:$('#ENGINE_DISPLACEMENT').val(),
            ENGINE_POWER:$('#ENGINE_POWER').val(),
            HEADLIGHT_TYPE:$('#HEADLIGHT_TYPE').val(),
            OCCUPANT_NUMBER:$('#OCCUPANT_NUMBER').val(),
            PRODUCTION_DATE:$('#PRODUCTION_DATE').val(),
            PRODUCTION_PLACE:$('#PRODUCTION_PLACE').val(),
            QTPZ:$('#QTPZ').val(),
            RETARDER:$('#RETARDER').val(),
            SEAT_ARRANGEMENT:$('#SEAT_ARRANGEMENT').val(),
            STEERING_GEAR:$('#STEERING_GEAR').val(),
            SUSPENSION_TYPE:$('#SUSPENSION_TYPE').val(),
            TOTAL_MASS:$('#TOTAL_MASS').val(),
            TRACTION_MASS:$('#TRACTION_MASS').val(),
            TRANSMISSION_TYPE:$('#TRANSMISSION_TYPE').val(),
            TYRE_NUMBER:$('#TYRE_NUMBER').val(),
            VEHICLE_DIMENSIONS:$('#VEHICLE_DIMENSIONS').val()
        }
        normalPost(baseu + '/manage/vehicle/vehiclebase/save_param', {vehicle_id: vid, parray: JSON.stringify(param)}, function (res) {
            if(res.success){
                layer.msg('修改成功！');
            }
        })
    })

    $(".imgblock").on('click','.removeImg', function () {
        $(this).parent('.thisimg').remove()
    })

});

function getAllImg(dom) {
    var val=''
    $(dom+ ' img').each(function () {
        val+= ($(this).attr('src')+';')
    })
    return val
}

function search(pageSize, pageNo, laypage) {
    var ii = layer.load();
    var param = {
        limit: (pageSize ? pageSize : 10),
        page: pageNo,
//            start: 0,
        RECORD_NO_lk: $("#RECORD_NO_lk").val(),
        PLATE_NUM_lk: $("#PLATE_NUM_lk").val(),
        PLATE_COLOR_eq: $("#PLATE_COLOR_eq").val(),
        VEHICLE_TYPE_eq: $("#VEHICLE_TYPE_eq").val(),
        STATUS_eq: $("#STATUS_eq").val(),
        IS_SINGLE_eq: $("#IS_SINGLE_eq").val(),
        WARN_TYPE_eq: $("#WARN_TYPE_eq").val()

    }
    normalPost(baseu + '/manage/vehicle/vehiclebase/list', param, function (res) {
        console.log('res',res)
        if(res.success){
            var html='';datas= res.data
            for (var i in datas){
                html+='<tr>' +
                    '<td>'+datas[i].RECORD_NO+'</td>' +
                    '<td>'+datas[i].PLATE_NUM+'</td>' +
                    '<td>'+formatColor(datas[i].PLATE_COLOR)+'</td>' +
                    '<td>'+datas[i].CORP_NAME+'</td>' +
                    '<td>'+formatType(datas[i].VEHICLE_TYPE) +'</td>' +
                    '<td>'+datas[i].UNIT_NAME+'</td>' +
                    '<td>'+formatWarn(datas[i].WARN_TYPE)+'</td>' +
                    '<td>'+datas[i].CERT_DATE.split(" ")[0]+'</td>' +
                    '<td>'+datas[i].LAST_REPAIR_DATE.split(" ")[0]+'</td>' +
                    '<td>'+datas[i].LAST_CHECK_DATE.split(" ")[0]+'</td>' +
                    '<td>'+formatstate(datas[i].STATUS)+'</td>' +
                    '<td><div class="layui-btn layui-btn-normal layui-btn-sm" style="margin-bottom: 5px" onclick="look('+datas[i].VEHICLE_ID+')">查看/修改</div><div id="del" style="margin-bottom: 5px" class="layui-btn layui-btn-danger layui-btn-sm" onclick="del('+datas[i].VEHICLE_ID+')">删除</div></td>' +
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

function search2(pageSize, pageNo, laypage) {
    var param = {
        limit: (pageSize ? pageSize : 10),
        page: pageNo,
        CORP_NUM: $("#CORP_NUM").val(),
        CORP_NAME: $("#CORP_NAME_sel").val(),
        CORP_AREA: $("#CORP_AREA").val(),
    }
    normalPost(baseu + '/manage/sys/common/getTransCorpBySel', param, function (res) {
        if(res.success){
            var datas2= res.data, html='';
            for (var i in datas2){
                html+='<tr>' +
                    '<td>'+datas2[i].CORP_NUM+'</td>' +
                    '<td>'+datas2[i].CORP_NAME+'</td>' +
                    '<td>'+formatArea(datas2[i].CORP_AREA) +'</td>' +
                    '<td><div class="layui-btn layui-btn-normal layui-btn-sm"  onclick="surecomp(\''+ datas2[i].CORP_NAME+'\',\''+datas2[i].CORP_ID+'\')">选择</div></td>' +
                    '</tr>'
            }
            $("#table2 tbody").html(html)
        }
        if (laypage) {
            laypage.render({
                elem: 'pagebar2'
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
    })
}

function datachange(vid) {
    normalPost(baseu + '/manage/vehicle/vehiclebase/changeList', {vehicle_id: vid, page: 1, start: 0, limit: 25}, function (res) {
        if(res.success){
            for(var i in res.data){
                res.data[i].index= parseInt(i)
            }
            model.changedata= res.data
            renderchange()
        }
    })
}
function datause(vid) {
    normalPost(baseu + '/manage/vehicle/vehiclebase/usesList', {vehicle_id: vid, page: 1, start: 0, limit: 25}, function (res) {
        if(res.success){
            for(var i in res.data){
                res.data[i].index= parseInt(i)
            }
            model.usedata= res.data
            renderuse()
        }
    })
}
function dataaccident(vid) {
    normalPost(baseu + '/manage/vehicle/vehiclebase/accidentList', {vehicle_id: vid, page: 1, start: 0, limit: 25}, function (res) {
        if(res.success){
            for(var i in res.data){
                res.data[i].index= parseInt(i)
            }
            model.accidentdata= res.data
            renderaccident()
        }
    })
}
function datadriver(vid) {
    normalPost(baseu + '/manage/vehicle/vehiclebase/driverList', {vehicle_id: vid, page: 1, start: 0, limit: 25}, function (res) {
        if(res.success){
            for(var i in res.data){
                res.data[i].index= parseInt(i)
            }
            model.driverdata= res.data
            renderdriver()
        }
    })
}

function renderchange() {
    var table = layui.table;
    model.changerender= table.render({
        elem: '#tablechange' //指定原始表格元素选择器（推荐id选择器）
        ,cols: [[
            {type: 'checkbox'},
            {field:'CHANGE_DATE', title: '变更日期', width:'20%',templet: function (d) {
                return '<div><input type="text" class="layui-input change_date" style="height: 28px" value="'+(d.CHANGE_DATE?d.CHANGE_DATE.split(' ')[0]:'')+'"></div>'
            }
            },
            {field:'CHANGE_REASON',edit:'text',width:'35%', title: '变更原因'},
            {field:'CHANGE_ITEM', edit:'text', width: '35%', title: '变更事项'}
        ]],
        data: model.changedata,
        limit: model.changedata.length,
        id: 'tablechange'
    });
    renddate(".tablechange .layui-table-view .change_date","changedata","CHANGE_DATE");
    table.on('edit(tablechange)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
//            console.log(obj.value); //得到修改后的值
//            console.log(obj.field); //当前编辑的字段名
//            console.log(obj.data); //所在行的所有相关数据
        model.changedata[obj.data['LAY_TABLE_INDEX']][obj.field]= obj.value
        console.log(model.changedata)
    });
}
function renderuse() {
    var table = layui.table;
    model.userender= table.render({
        elem: '#tableuse' //指定原始表格元素选择器（推荐id选择器）
        ,cols: [[
            {type: 'checkbox'},
            {field:'USES_TIME', title: '时间', width:'20%',templet: function (d) {
                return '<div><input type="text" class="layui-input use_date" style="height: 28px" value="'+(d.USES_TIME?d.USES_TIME.split(' ')[0]:'')+'"></div>'
            }
            },
            {field:'MILEAGE',edit:'text',width:'10%', title: '行驶里程(km)'},
            {field:'INTERVAL_MILEAGE', edit:'text', width: '10%', title: '间隔里程(km)'},
            {field:'FUEL_CONSUMPTION', edit:'text', width: '10%', title: '燃油消耗(升)'},
            {field:'QUOTA', edit:'text', width: '8%', title: '定额'},
            {field:'SURPLUS', edit:'text', width: '8%', title: '余'},
            {field:'DEFICIT', edit:'text', width: '8%', title: '亏'},
            {field:'USE_UNIT', edit:'text', width: '9%', title: '使用单位'},
            {field:'DRIVER_NAME', edit:'text', width: '10%', title: '司机姓名'}
        ]],
        data: model.usedata,
        limit: model.usedata.length,
        id: 'tableuse'
    });
    renddate(".tableuse .layui-table-view .use_date","usedata","USES_TIME");
    table.on('edit(tableuse)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
//            console.log(obj.value); //得到修改后的值
//            console.log(obj.field); //当前编辑的字段名
//            console.log(obj.data); //所在行的所有相关数据
        model.usedata[obj.data['LAY_TABLE_INDEX']][obj.field]= obj.value
        console.log(model.usedata)
    });
}
function renderaccident() {
    var table = layui.table;
    model.accidentrender= table.render({
        elem: '#tableaccident' //指定原始表格元素选择器（推荐id选择器）
        ,cols: [[
            {type: 'checkbox'},
            {field:'ACCIDENT_DATE', title: '事故日期', width:'20%',templet: function (d) {
                return '<div><input type="text" class="layui-input accident_date" style="height: 28px" value="'+(d.ACCIDENT_DATE?d.ACCIDENT_DATE.split(' ')[0]:'')+'"></div>'
            }
            },
            {field:'ACCIDENT_ADDR',edit:'text',width:'10%', title: '事故地址'},
            {field:'ACCIDENT_NATURE',edit:'text',width:'10%', title: '事故性质'},
            {field:'ACCIDENT_RESPONSIBILITY',edit:'text',width:'10%', title: '事故责任'},
            {field:'ACCIDENT_DESCRIPTION',edit:'text',width:'20%', title: '事故种类及车辆损坏情况'},
            {field:'ECONOMIC_LOSSES',edit:'text',width:'18%', title: '企业直接经济损失(元)'},
            {field:'ACCIDENT_REGISTRANT',edit:'text',width:'10%', title: '登记人'},
        ]],
        data: model.accidentdata,
        limit: model.accidentdata.length,
        id: 'tableaccident'
    });
    renddate(".tableaccident .layui-table-view .accident_date","accidentdata","ACCIDENT_DATE");
    table.on('edit(tableaccident)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
//            console.log(obj.value); //得到修改后的值
//            console.log(obj.field); //当前编辑的字段名
//            console.log(obj.data); //所在行的所有相关数据
        model.accidentdata[obj.data['LAY_TABLE_INDEX']][obj.field]= obj.value
        console.log(model.accidentdata)
    });
}
function renderdriver() {
    var table = layui.table;
    model.driverrender= table.render({
        elem: '#tabledriver' //指定原始表格元素选择器（推荐id选择器）
        ,cols: [[
            {type: 'checkbox'},
            {field:'DRIVER_NAME',edit:'text',width:'10%', title: '驾驶员姓名'},
            {field:'ID_NUM',edit:'text',width:'10%', title: '身份证号'},
            {field:'LICENCE_TYPE',edit:'text',width:'10%', title: '驾驶证类型'},
            {field:'LICENCE_NUM',edit:'text',width:'10%', title: '驾驶证号'},
            {field:'CERTIFICATE_NUM',edit:'text',width:'10%', title: '从业资格证号'},
            {field:'CERTIFICATE_TYPE',edit:'text',width:'10%', title: '从业证类别'},
            {field:'ENTRY_TIME', title: '入职时间', width:'15%',templet: function (d) {
                return '<div><input type="text" class="layui-input entry_time" style="height: 28px" value="'+(d.ENTRY_TIME?d.ENTRY_TIME.split(' ')[0]:'')+'"></div>'
            }
            },
            {field:'DIMISSION_TIME', title: '离职时间', width:'15%',templet: function (d) {
                return '<div><input type="text" class="layui-input dimission_time" style="height: 28px" value="'+(d.DIMISSION_TIME?d.DIMISSION_TIME.split(' ')[0]:'')+'"></div>'
            }
            },
            {field:'SAFE_MILEAGE',edit:'text',width:'10%', title: '安全行驶里程'},
            {field:'ILLEGAL_RECORD',edit:'text',width:'10%', title: '违章记录'},
            {field:'ACCIDENT_RECORD',edit:'text',width:'10%', title: '事故记录'},
            {field:'OTHER_COMPLAINTS',edit:'text',width:'10%', title: '其他投诉'},
        ]],
        data: model.driverdata,
        limit: model.driverdata.length,
        id: 'tabledriver'
    });
    renddate(".tabledriver .layui-table-view .entry_time","accidentdata","ENTRY_TIME");
    renddate(".tabledriver .layui-table-view .dimission_time","accidentdata","DIMISSION_TIME");
    table.on('edit(tabledriver)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
//            console.log(obj.value); //得到修改后的值
//            console.log(obj.field); //当前编辑的字段名
//            console.log(obj.data); //所在行的所有相关数据
        model.driverdata[obj.data['LAY_TABLE_INDEX']][obj.field]= obj.value
        console.log(model.driverdata)
    });
}

function renddate(dom,dataname,field) {
    $(dom).each(function () {
        var self =this;
        var laydate = layui.laydate;
        laydate.render({
            elem: self,
            type: 'date',
            format: 'yyyy-MM-dd',
            done: function(value){
                model[dataname][parseInt($(self).parents('tr').attr("data-index"))][field]= value
                console.log(model[dataname])
            }
        });
    })
    $(dom).change(function () {
        model[dataname][parseInt($(this).parents('tr').attr("data-index"))][field]=$(this).val()
        console.log(model[dataname])
    })
}

function surecomp(name, id) {
    $("#CORP_NAME").val(name).attr("corpid", id)
    layer.close(index)
    $("#form2").hide()
}

function setLookImg(dom, data) {
    if (!data) return
    var arr= data.split(';')
    for (var i in arr){
        if(arr[i]){
            $(dom).append(
                '<div class="thisimg">' +
                '<img  src="'+ arr[i]+'">' +
                '<i class="layui-icon layui-icon-close-fill removeImg"></i>' +
                '</div>')

        }
    }
    $(".thisimg>img").zoomify({duration:0});
}

function look(vid) {
    $('#xsz').html(' ')
    $('#yyz').html(' ')
    $('#txz').html(' ')
    $('#bd').html(' ')
    $("#form .layui-input").val("")
    $("#form #submitBase").attr("vid", vid)
    $("#form #submitParam").attr("vid", vid)
    datachange(vid)
    datause(vid)
    dataaccident(vid)
    datadriver(vid)
    var form = layui.form;
    for (var i in datas){
        if(datas[i].VEHICLE_ID== vid){
            $('#CORP_NAME').val(datas[i].CORP_NAME),
//          $('#TRANS_CORP_ID').val(datas[i].TRANS_CORP_ID),
            $('#CORP_NAME').attr("corpid", datas[i].TRANS_CORP_ID)
            $('#PLATE_NUM').val(datas[i].PLATE_NUM),
            $('#PLATE_COLOR').val(datas[i].PLATE_COLOR),
            $('#VEHICLE_TYPE').val(datas[i].VEHICLE_TYPE),
            $('#VENDER').val(datas[i].VENDER),
            $('#BRAND').val(datas[i].BRAND),
            $('#XM').val(datas[i].XM),
            $('#LOAD_CERT_NUM').val(datas[i].LOAD_CERT_NUM),
            $('#CERT_DATE').val(datas[i].CERT_DATE.split(' ')[0]),
            $('#STATUS').val(datas[i].STATUS),
            $('#PHOTO').val(datas[i].PHOTO),
            $('#COUNTY').val(datas[i].COUNTY),
            $('#FUEL_TYPE').val(datas[i].FUEL_TYPE),
            $('#CHASSIS_NUM').val(datas[i].CHASSIS_NUM),
            $('#ENGINE_NUM').val(datas[i].ENGINE_NUM),
            $('#USE_TYPE').val(datas[i].USE_TYPE),
            $('#TONNAGE').val(datas[i].TONNAGE),
            $('#SEAT').val(datas[i].SEAT),
            $('#CHECK_DATE').val(datas[i].CHECK_DATE.split(' ')[0]),
            $('#FIRST_MILEAGE').val(datas[i].FIRST_MILEAGE),
            $('#LAST_REPAIR_DATE').val(datas[i].LAST_REPAIR_DATE.split(' ')[0]),
            $('#LAST_CHECK_DATE').val(datas[i].LAST_CHECK_DATE.split(' ')[0]),
            $('#UNIT_NAME').val(datas[i].UNIT_NAME),
            $('#REG_DATE').val(datas[i].REG_DATE.split(' ')[0]),
            $('#IS_SINGLE').val(datas[i].IS_SINGLE),
            $('#OWNER_NAME').val(datas[i].OWNER_NAME),
            $('#OWNER_PHONE').val(datas[i].OWNER_PHONE)
            setLookImg('#xsz', datas[i].DRIVING_LICENSE_PIC)
            setLookImg('#yyz', datas[i].TRADING_CARD_PIC)
            setLookImg('#txz', datas[i].TRAFFIC_PERMIT_PIC)
            setLookImg('#bd', datas[i].GUARANTEE_SLIP_PIC)
            $(".imgblock .thisimg img").zoomify({duration:0});
            break
        }
    }
    form.render()
    layer.open({
        type: 1,
        content: $('#form'),
        title: "查看/修改技术档案",
        area: ['90%', '90%'],
        cancel: function () {
            $("#form").hide()
        }
    });
    normalPost(baseu + '/manage/vehicle/vehiclebase/vehicleParam', {vehicle_id: vid}, function (res) {
        if(res.success){
            $('#AXLE_NUMBER').val(res.data.AXLE_NUMBER);
            $('#BRAKE_TYPE').val(res.data.BRAKE_TYPE);
            $('#BRAND_MODEL').val(res.data.BRAND_MODEL);
            $('#BUS_LEVEL').val(res.data.BUS_LEVEL);
            $('#DRIVE_TYPE').val(res.data.DRIVE_TYPE);
            $('#EMISSION_STANDARD').val(res.data.EMISSION_STANDARD);
            $('#ENGINE_BRAND').val(res.data.ENGINE_BRAND);
            $('#ENGINE_DISPLACEMENT').val(res.data.ENGINE_DISPLACEMENT);
            $('#ENGINE_POWER').val(res.data.ENGINE_POWER);
            $('#HEADLIGHT_TYPE').val(res.data.HEADLIGHT_TYPE);
            $('#OCCUPANT_NUMBER').val(res.data.OCCUPANT_NUMBER);
            $('#PRODUCTION_DATE').val(res.data.PRODUCTION_DATE?res.data.PRODUCTION_DATE.split(' ')[0]:"");
            $('#PRODUCTION_PLACE').val(res.data.PRODUCTION_PLACE);
            $('#QTPZ').val(res.data.QTPZ);
            $('#RETARDER').val(res.data.RETARDER);
            $('#SEAT_ARRANGEMENT').val(res.data.SEAT_ARRANGEMENT);
            $('#STEERING_GEAR').val(res.data.STEERING_GEAR);
            $('#SUSPENSION_TYPE').val(res.data.SUSPENSION_TYPE);
            $('#TOTAL_MASS').val(res.data.TOTAL_MASS);
            $('#TRACTION_MASS').val(res.data.TRACTION_MASS);
            $('#TRANSMISSION_TYPE').val(res.data.TRANSMISSION_TYPE);
            $('#TYRE_NUMBER').val(res.data.TYRE_NUMBER);
            $('#VEHICLE_DIMENSIONS').val(res.data.VEHICLE_DIMENSIONS);
            form.render()
        }
    })
}

function del(vid) {
    layer.confirm('确定要删除这条记录吗？', {icon: 3, title:'提示'}, function(index){
        normalPost(baseu + '/manage/vehicle/vehiclebase/delete', {ids: vid}, function (res) {
            if(res.success){
                layer.msg('删除成功！')
                search(10, 1, laypage)
            }

        })
        layer.close(index);
    });
}

function formatColor(key) {
    var val=''
    switch (key){
        case '10061001': val= '黄'; break
        case '10061002': val= '蓝'; break
        case '10061003': val= '白'; break
        case '10061004': val= '黑'; break
    }
    return val
}
function formatType(key) {
    var val=''
    switch (key){
        case '10071001': val= '出租客车'; break
        case '10071002': val= '普通货运'; break
        case '10071003': val= '危险货运'; break
        case '10071004': val= '客运班车'; break
        case '10071005': val= '旅游包车'; break
        case '10071006': val= '教练车'; break
    }
    return val
}
function formatWarn(key) {
    var val=''
    switch (key){
        case '10171001': val= '已逾期'; break
        case '10171002': val= '即将逾期'; break
        case '10171003': val= '未提交维护计划'; break
        case '10171004': val= '不存在维修记录'; break
        case '10171005': val= '正常维护'; break
    }
    return val
}
function formatstate(key) {
    var val=''
    switch (key){
        case '10081001': val= '营运'; break
        case '10081002': val= '停运'; break
    }
    return val
}

function getImg(className) {
    var file= $( '.'+className).get(0).files[0]
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function (e) {
        var image = new Image();
        var self= this
        image.onload=function(){
            var width = image.width;
            var height = image.height;
            compress(self.result,
                {width: width, height:height, quality: 0.6, type: file.type} ,
                pushImg,className, file.name)
        };
        image.src= e.target.result;

        // compress(this.result, {width: 1000, height:1000, quality: 0.7} , pushImg, className)
    }
}

function compress(path, obj, callback, className, name){
    var img = new Image();
    img.src = path;
    img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL(obj.type|| 'image/png', quality);
        // console.log(base64)
        // 返回base64的值
        callback(base64, className, name)
    }

}

function pushImg(base64, className, name) {
    layer.load();
    var formdata = new FormData();
    formdata.append('file' , base64ToBlob(base64), name);
    // console.log(base64ToBlob(base64))
    // console.log(formdata.get(className))
    filePost(baseu + '/image/add/'+localStorage.getItem('ACCESSTOKEN') , formdata, function (res) {
        console.log(res)
        if(res.code=='000000'){
            layer.msg('图片上传成功');
            // $("#"+className).attr({src: res.data.picPath, path: res.data.picPath})
            $("#"+className).append(
                '<div class="thisimg">' +
                '<img  src="'+res.data.picPath+'">' +
                '<i class="layui-icon layui-icon-close-fill removeImg"></i>' +
                '</div>')
            $(".thisimg>img").zoomify({duration:0});
        }else{
            layer.msg(res.status, {icon: 5, time: 2000 });
        }
        layer.closeAll('loading');
    })
}

function base64ToBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}