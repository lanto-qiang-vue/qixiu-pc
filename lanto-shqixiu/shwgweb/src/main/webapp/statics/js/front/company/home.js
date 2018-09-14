$(function() {
    table();
    //0
    table0();

    var bar2 = echarts.init(document.getElementById('bar2'));
    var bar3 = echarts.init(document.getElementById('bar3'));
    var bar4 = echarts.init(document.getElementById('bar4'));

    //1
    table1();


    //2
    option.color=['#fdc12f']
    option.series[0].name='反馈数'
    option.series[0].data=[10,6,6,7,8,9,1]
    bar2.setOption(option);

    //3
    table3();
    // option.color=['#82d03c']
    // option.series[0].name='上门申请数'
    // option.series[0].data=[3,5,7,2,4,1,3]
    // bar3.setOption(option);
    // insertDom("#scoll1", "#scoll1 .list", "#scoll1 .list .group")

    //4
    table4();
    // option.color=['#ff8e1e ']
    // option.series[0].name='预约数'
    // option.series[0].data=[4,3,1,2,5,7,2]
    // bar4.setOption(option);


    var userInfo = localStorage.getItem("USERINFO") && JSON.parse(localStorage.getItem("USERINFO"));
    if(userInfo && userInfo.userRoleId){
        if(userInfo.userRoleId == 3 || userInfo.userRoleId == 7){
            $("#data_contection_info").show();
            $("#complain_info").show();
            $("#stock_warnning").show();
        }
    }

})

function addDate(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }
    var val = d.getFullYear()+"/"+month+"/"+day;
    return val;
}

var option = {
    color: ['#6eb4f2'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
    },
    xAxis : [
        {
            type : 'category',
            data : ['2017/10/12', '2017/10/13', '2017/10/14', '2017/10/15', '2017/10/16', '2017/10/17', '2017/10/18'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                rotate: 40
            },
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            name:'上传数',
            type:'bar',
            //barWidth: '60%',
            data:[4, 3, 4, 2, 3, 5, 1]
        }
    ]
};
function table() {
    var param = {
        accessToken: localStorage.getItem('ACCESSTOKEN')
    }
    accessPost(baseu+ '/company/repaircompany/detailInfo', JSON.stringify(param), function (res) {
        console.log('res',res)
        var datas=res.data, html='';
            html+='<tr><td>'+ (datas.companyname || '') +'</td><td>'+ (datas.companyroadtransportationlicense || '') +'</td><td>'+ (datas.companyaddress || '') +'</td><td>' + (datas.companybusinessscope || '') + '</td></tr>'
        $("#table tbody").append(html)
    })

}

function table0() {
    accessGet(baseu+ '/message/notify/getReceiveNotify/'+localStorage.getItem('ACCESSTOKEN'), function (res) {
        console.log(res)
        var datas=res.data,content='', html='';
        for(var i in datas){
            if(datas[i].read) continue
            content= JSON.parse(datas[i].content).content
            html+='<tr notid="'+datas[i].notifyId+'"><td>'+datas[i].title+'</td><td>'+content.substring(0,10)+'...</td><td>'+(datas[i].nickName? datas[i].nickName: datas[i].mobile)+'</td><td>'+formatDate(datas[i].sendtime,'yyyy-MM-dd hh:mm:ss')+'</td></tr>'
        }
        $("#table0 tbody").append(html)
    })

    $("#table0 tbody").on('click', 'tr', function () {
//	    console.log($(this).attr("notid"))
        window.location.href='notifyDetail?id='+$(this).attr('notid')
    })
}

function table1() {
    var accessToken= localStorage.getItem("ACCESSTOKEN"), html='',data0='', data1=[], data2=[];
    accessGet(baseu+'/statistics/admin/comStatistics/'+accessToken,function (res) {
        // console.log(new Date( res.comStatisticsDataPOS[0].statisticsDate).toISOString().split('T')[0])
        for (var i in res.data){
            data0= new Date( res.data[i].statisticsDate).toISOString().split('T')[0]
            data1.push(data0)
            data2.push(res.data[i].dataNum)
            html+="<tr><td>"+data0+"</td><td>"+res.data[i].dataNum+"</td></tr>"
        }
        $("#table1 tbody").append(html)

        option.xAxis[0].data= data1
        option.series[0].data= data2
        bar1.setOption(option);
    })

    var bar1 = echarts.init(document.getElementById('bar1'));
    var option = {
        color: ['#6eb4f2'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
        },
        xAxis : [
            {
                type : 'category',
                data : ['2017/10/12', '2017/10/13', '2017/10/14', '2017/10/15', '2017/10/16', '2017/10/17', '2017/10/18'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40
                },
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                name:'对接数',
                type:'bar',
                //barWidth: '60%',
                data:[4, 3, 4, 2, 3, 5, 1]
            }
        ]
    };
}

function table3() {
    //获取横坐标值
    var x_dates = [];
    for(var i=0; i<7; i++) {
        var dateItem = addDate(new Date(), -i);
        x_dates.push(dateItem);
    }
    x_dates.reverse();

    //检验票据有效性
    var accessToken = localStorage.getItem('ACCESSTOKEN')
    if (accessToken == '' || accessToken == null) {
        layer.msg('票据失效，请重新登陆！',{time: 2000, icon:5});
        setTimeout(function () {
            window.location.href = ctx + '/toLogin';
        }, 2000)
    }

    var load3 = layer.load();
    //请求后台，获取图表数据
    var params3 = {
        accessToken: accessToken,
        dateArray: x_dates
    }
    var html = ''
    accessPost(baseu+ '/maintain/getOnsiteServiceInfo', JSON.stringify(params3), function (res) {
        layer.close(load3);
        if (res && res.code == '000000') {
            option.series[0].data=res.data.countArray
            bar3.setOption(option);
            var dataList = res.data.dataList;
            for (var i in dataList){
                var servicetype = formatServiceTypeToLabel(dataList[i].servicetype);
                html +='<div class="item"> 姓名：' + dataList[i].ownername + '&nbsp;&nbsp;电话：'+dataList[i].contactmobile + '&nbsp;' + servicetype +'</div>'
            }
            $("#scoll1 #group1").append(html)
        } else if(res.code != '' && res.code != null){
            layer.msg(res.status,{time: 2000, icon:5});
        } else {
            layer.msg('数据获取失败！',{time: 2000, icon:5});
        }
        layer.close(load3);
    })

    var bar3 = echarts.init(document.getElementById('bar3'))
    var option = {
        color: ['#82d03c'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
        },
        xAxis : [
            {
                type : 'category',
                data : x_dates,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40
                },
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                name:'上门服务申请数',
                type:'bar',
                //barWidth: '60%',
                data: [4, 3, 4, 2, 3, 5, 1]
            }
        ]
    };
}
function table4() {
    //获取横坐标值
    var x_dates = [];
    for(var i=0; i<7; i++) {
        var dateItem = addDate(new Date(), -i);
        x_dates.push(dateItem);
    }
    x_dates.reverse();

    //检验票据有效性
    var accessToken = localStorage.getItem('ACCESSTOKEN')
    if (accessToken == '' || accessToken == null) {
        layer.msg('票据失效，请重新登陆！',{time: 2000, icon:5});
        setTimeout(function () {
            window.location.href = ctx + '/toLogin';
        }, 2000)
    }

    //请求后台，获取图表数据
    var params3 = {
        accessToken: accessToken,
        dateArray: x_dates
    }
    var html = ''
    accessPost(baseu+ '/maintain/getOnsiteOrderInfo', JSON.stringify(params3), function (res) {
        if (res && res.code == '000000') {
            option.series[0].data=res.data.countArray
            bar4.setOption(option);
            var dataList = res.data.dataList;
            for (var i in dataList){
                html +='<div class="item"> 姓名：' + dataList[i].ownername + '电话：'+dataList[i].contactmobile + '&nbsp;' + dataList[i].servicecontent +'</div>'
            }
            $("#group2").append(html)
        } else if(res.code != '' && res.code != null){
            layer.msg(res.status,{time: 2000, icon:5});
        } else {
            layer.msg('数据获取失败！',{time: 2000, icon:5});
        }
    })

    var bar4 = echarts.init(document.getElementById('bar4'))
    var option = {
        color: ['#fdc12f'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
        },
        xAxis : [
            {
                type : 'category',
                data : x_dates,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    rotate: 40
                },
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                name:'预约服务申请数',
                type:'bar',
                //barWidth: '60%',
                data: [4, 3, 4, 2, 3, 5, 1]
            }
        ]
    };
}

function setSroll(list) {
    var sroll= setInterval(function(){
        // console.log($(".list").position().top+"::"+$(".list .group:first-child").height())

        var thisTop= $(list).position().top

        if($(list).position().top+$(list+" .group:first-child").height()<=0){
            $(list).css({"top":"0"})
            thisTop=0
        }else{

        }
        $(list).animate({top:(thisTop-30)+"px"},"fast")
    },1000)
    return sroll
}

//插入数据
function insertDom(id, list, groupc) {
    //列表填满
    var group=$(list+":first-child").html()
    // console.log($(".group:first-child").position().top)
    while(1){
        var isFull=$(groupc+":last-child").position().top > $(id).height()
        if(isFull){
            $(list).append(group)
            break;
        }
        $(list).append(group)
        // console.log($(".group:last-child").position().top+"////"+$(".awards").height())

    }

    //滚动
    var sroll= setSroll(list)

    $(id).bind("mouseover",function () {
        clearInterval(sroll)
    })

    $(id).bind("mouseout",function () {
        sroll= setSroll()
    })
}

function formatServiceTypeToLabel(serviceTypeCodes){
    var serviceTypeLabel = '';
    var serviceTypeCodeList = serviceTypeCodes ? serviceTypeCodes.split(',') : '';

    if(serviceTypeCodeList && serviceTypeCodeList.length){
        serviceTypeCodeList.forEach(
            function(serviceTypeCode){
                switch(serviceTypeCode){
                    case '300001':
                        serviceTypeLabel = serviceTypeLabel + '上门故障诊断' + ' ';
                        break;
                    case '300002':
                        serviceTypeLabel = serviceTypeLabel + '上门取送车服务' + ' ';
                        break;
                    case '300003':
                        serviceTypeLabel = serviceTypeLabel + '上门更换备胎' + ' ';
                        break;
                    case '300004':
                        serviceTypeLabel = serviceTypeLabel + '上门更换灯泡' + ' ';
                        break;
                    case '300005':
                        serviceTypeLabel = serviceTypeLabel + '上门更换雨刮片' + ' ';
                        break;
                    case '300006':
                        serviceTypeLabel = serviceTypeLabel + '上门电瓶泵电' + ' ';
                        break;
                    case '300007':
                        serviceTypeLabel = serviceTypeLabel + '其他' + ' ';
                        break;
                    default:
                        serviceTypeLabel = serviceTypeLabel + '';
                }
            }
        )
    }

    return serviceTypeLabel;
}