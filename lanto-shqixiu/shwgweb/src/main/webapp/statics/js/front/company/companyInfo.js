$(function () {
    // var id = getUrlParam('id');
    // var type = getUrlParam('type');
    console.log('id', id);

    var userinfo = JSON.parse(localStorage.getItem('USERINFO'))
    var id = userinfo.userId

    // if (!userinfo) {
    //     layer.msg('请先进行登录');
    //     setTimeout(function () {
    //         window.location.href = "${ctx}" + "/toLogin?reUrl=" + "${memberUri}";
    //     }, 2000)
    // }
    // layui.use(['form', 'layedit', 'laydate'], function () {
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

        // var form = layui.form;

        //设置初始值
        $('input[type="tel"]').val(0).change(function () {
        // $('input[type="number"]').val(0).change(function () {
            $(this).val()<=0?$(this).val(0):false;
        }).focus(function () {
            $(this).val()==0? $(this).val(""):false;
        }).blur(function () {
            !$(this).val()?$(this).val(0):false;
        })

        //监听业户类别
        form.on('radio(industryCategory)', function (data) {
            console.log(data.elem.value)
            if (data.elem.checked) {
                if (data.elem.value == '4') {
                    $('#industryCategoryOtherDiv').removeClass('hide');
                } else {
                    $('#industryCategoryOtherDiv').addClass('hide');
                }
            }
            form.render();
        })
        //监听经济类别
        form.on('radio(economicType)', function (data) {
            console.log(data.elem.value)
            if (data.elem.checked) {
                if (data.elem.value == '10') {
                    $('#economicTypeOtherDiv').removeClass('hide');
                } else {
                    $('#economicTypeOtherDiv').addClass('hide');
                }
            }
            form.render();
        })
        //监听主要业务范围
        form.on('checkbox(sphere)', function (data) {
            console.log(data.elem.value)
            if (data.elem.value == '10') {
                if (data.elem.checked) {
                    $('#sphereOtherDiv').removeClass('hide');
                } else {
                    $('#sphereOtherDiv').addClass('hide');
                }
            }
            form.render();
        })
        //监听企业主要维修车型
        form.on('checkbox(model)', function (data) {
            console.log(data.elem.value)
            if (data.elem.value == '5') {
                if (data.elem.checked) {
                    $('#specialDiv').removeClass('hide');
                } else {
                    $('#specialDiv').addClass('hide');
                }
            }
            if (data.elem.value == '6') {
                if (data.elem.checked) {
                    $('#modelOtherDiv').removeClass('hide');
                } else {
                    $('#modelOtherDiv').addClass('hide');
                }
            }
            form.render();
        })
        //监听是否特约维修
        form.on('radio(specialRepair)', function (data) {
            console.log(data.elem.value)
            if (data.elem.value == '1') {
                $('#specialRepairDiv').removeClass('hide');
            } else {
                $('#specialRepairDiv').addClass('hide');
            }
            form.render();
        })
        //监听是否为全国诚信维修企业
        form.on('radio(sincerity)', function (data) {
            console.log(data.elem.value)
            if (data.elem.value == '1') {
                $('#sincerityYearDiv').removeClass('hide');
            } else {
                $('#sincerityYearDiv').addClass('hide');
            }
            form.render();
        })
        //监听是否提供提供上门服务
        form.on('radio(offerOnsiteRepair)', function (data) {
            console.log(data.elem.value)
            if (data.elem.value == '1') {
                $('#offerOnsiteRepairType').removeClass('hide');
            } else {
                $('#offerOnsiteRepairType').addClass('hide');
            }
            form.render();
        })
        //监听提供上门服务种类
        form.on('checkbox(serviceCategory)', function (data) {
            console.log(data.elem.value)
            if (data.elem.value == '7') {
                if (data.elem.checked) {
                    $('#serviceCategoryOtherDiv').removeClass('hide');
                } else {
                    $('#serviceCategoryOtherDiv').addClass('hide');
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
            // accessPost(baseu + 'corp/add', JSON.stringify(params), function (res) {
            accessPatch(baseu + '/company/repaircompany/edit', JSON.stringify(params), function (res) {
                // console.log('res: ', res);
                // var message = responseMessageMaker(res, "${ctx}");
                // console.log('message', message)
                // layer.msg(message, {
                //     icon: 1,
                //     time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
                // }, function () {
                    // if (res.code == '000000') {
                    //     window.location.href = 'corpInfo';
                    //     console.log(res.code)
                    // }
                    layer.closeAll();
                // });


            })
        });

//         form.on('submit(serviceSave)', function (data) {
//             var params = data.field;
//
//             var scope1 = [];
//             $('input[name="scope1"]:checked').each(function () {
//                 scope1.push($(this).val())
//             })
//             params.scope1 = scope1;
//
//             var scope2 = [];
//             $('input[name="scope2"]:checked').each(function () {
//                 scope2.push($(this).val())
//             })
//             params.scope2 = scope2;
//
//             var scope3 = [];
//             $('input[name="scope3"]:checked').each(function () {
//                 scope3.push($(this).val())
//             })
//             params.scope3 = scope3;
//
//             var scope4 = [];
//             $('input[name="scope4"]:checked').each(function () {
//                 scope4.push($(this).val())
//             })
//             params.scope4 = scope4;
//
//             var scope5 = [];
//             $('input[name="scope5"]:checked').each(function () {
//                 scope5.push($(this).val())
//             })
//             params.scope5 = scope5;
//
//             var sphere = [];
//             $('input[name="sphere"]:checked').each(function () {
//                 sphere.push($(this).val())
//             })
//             params.sphere = sphere;
//
//             var model = [];
//             $('input[name="model"]:checked').each(function () {
//                 model.push($(this).val())
//             })
//             params.model = model;
//
//             var serviceCategory = [];
//             $('input[name="serviceCategory"]:checked').each(function () {
//                 serviceCategory.push($(this).val())
//             })
//             params.serviceCategory = serviceCategory;
//
//             var myGeo = new BMap.Geocoder();
//             myGeo.getPoint('上海市' + params.busniessAddress, function (point) {
//                 if (point) {
//                     console.log(point)
//                     params.longitude = point.lng;
//                     params.latitude = point.lat
//                 }
//             })
//
//             params.accessToken = localStorage.getItem('ACCESSTOKEN');
//             params.id = id;
//             params.rescue = $('#rescue').prop('checked') ? 1 : 0;
//             params.specialRepair = $('#specialRepair').prop('checked') ? 1 : 0;
//             params.iso = $('#iso').prop('checked') ? 1 : 0;
//             params.throughSafetyProductionStandardization = $('#throughSafetyProductionStandardization').prop('checked') ? 1 : 0;
//             params.throughEnvironmentalProtectionSpecialRenovation = $('#throughEnvironmentalProtectionSpecialRenovation').prop('checked') ? 1 : 0;
//             params.sincerity = $('#sincerity').prop('checked') ? 1 : 0;
//             params.offerOnsiteRepair = $('#offerOnsiteRepair').prop('checked') ? 1 : 0;
//             params.openOnlineRepairService = $('#openOnlineRepairService').prop('checked') ? 1 : 0;
//             params.openOnlineBusinessService = $('#openOnlineBusinessService').prop('checked') ? 1 : 0;
//
//             var ii = layer.load();
//             console.log('params', params);
//             accessPost(baseu + 'corp/edit', JSON.stringify(params), function (res) {
//                 console.log('res: ', res);
//                 var message = responseMessageMaker(res, "${ctx}");
//                 console.log('message', message)
//                 layer.msg(message, {
//                     icon: 1,
//                     time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
//                 }, function () {
//                     if (res.code == '000000') {
// //                            window.location.href = 'corpInfo';
//                         console.log(res.code)
//                     }
//                     layer.closeAll();
//                 });
//
//
//             })
//         });

        if (id) {
            var ii = layer.load();
            //详情显示
            // var param = {
            //     accessToken: localStorage.getItem('ACCESSTOKEN'),
            //     Id: id
            // }
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                // Id: id
            }
            // console.log('param', param);
            // accessPost(baseu + '/corp/detail/' + localStorage.getItem('ACCESSTOKEN') + '/' + id, JSON.stringify(param), function (res) {
            accessGet(baseu + '/company/repaircompany/getByid/'+localStorage.getItem('ACCESSTOKEN')+'/'+id , function (res) {
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
                        $('#industryCategoryOtherDiv').css('display','inline-table');
                        $('#industryCategoryOther').val(data.industryCategoryOther);
                    }
                    $('input[type=radio][name=economicType][value="' + data.economicType + '"]').attr('checked', true);
                    if (data.economicType == 10) {
                        $('#economicTypeOtherDiv').css('display','inline-table');
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
                    // if(type == 'info'){
                    //     $('input').attr('disabled',true);
                    //     $('select').attr('disabled',true);
                    //     $('#registerRegion').attr('disabled',true);
                    //     $('#businessRegion').attr('disabled',true);
                    //     $('textarea').attr('disabled',true);
                    //     form.render();
                    // }else{
                    //     $("#saveBtn").removeClass('layui-hide');
                    // }
                }
                layer.closeAll();
            });
        }


    // });
});