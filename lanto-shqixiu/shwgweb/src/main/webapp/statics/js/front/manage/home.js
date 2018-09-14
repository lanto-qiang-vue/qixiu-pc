var form = layui.form;

$(function() {
    layer.load()
    var pie1 = echarts.init(document.getElementById('pie1'));
    var option1 = {
        title: {
            text:'维修企业注册数量',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            // x: 'left',
            bottom: 0,
            data:['维修企业完成对接','维修企业未完成对接']
        },
        color:['#C14DE8','#4DB2E8','#C14DE8'],
        series: [{
            name:'数据对接完成情况',
            type:'pie',
            radius: ['50%', '65%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '16',
                        fontWeight: ''
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:4380, name:'维修企业完成对接'},
                {value:1620, name:'维修企业未完成对接'},
            ]
        }]
    };
    var pie3 = echarts.init(document.getElementById('pie3'));
    var option3 = {
        title: {
            text:'维修记录上传数量',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            // x: 'left',
            bottom: 0,
            data:['今日上传数量','昨日上传数量']
        },
        color:['#C14DE8','#4DB2E8','#C14DE8'],
        series: [{
            name:'维修记录上传数量',
            type:'pie',
            radius: ['50%', '65%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '16',
                        fontWeight: ''
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:4380, name:'今日上传数量'},
                {value:1620, name:'昨日上传数量'},
            ]
        }]
    };

    // var pie2 = echarts.init(document.getElementById('pie2'));
    // var pie3 = echarts.init(document.getElementById('pie3'));

    var bar1 = echarts.init(document.getElementById('bar1'));

    //数据对接完成情况


    //
    option.title.text='反馈情况'
    option.legend.data=['有凭反馈','无凭反馈']
    option.series[0].name= '反馈情况'
    option.series[0].data=[
        {value:0, name:'有凭反馈'},
        {value:0, name:'无凭反馈'},
    ]
    // pie2.setOption(option);
    // $("#pie2").append("<div style='position: absolute;left: 80px;top: 130px;font-size: 28px'>总数：0</div>")

    //
    option.title.text='ERP对接情况'
    option.legend.data=['数据对接完成','数据对接进行中','数据对接未开始']
    option.series[0].name= 'ERP对接情况'
    option.series[0].data=[
        {value:9, name:'数据对接完成'},
        {value:7, name:'数据对接进行中'},
        {value:8, name:'数据对接未开始'},
    ]
    // pie3.setOption(option);
    // setInterval(table1,5000);
    var accessToken= localStorage.getItem("ACCESSTOKEN"), html='';
    accessGet(baseu+'/mgmtdept/statistics/'+accessToken,function (res) {

        var data= res;
        html= "<tr onclick=goTorecordCompInfo()><td>维修企业</td><td>"+data.corpcount+"</td><td>"+data.uploadcorpcount+"</td><td>"+data.corprate.toFixed(2)+"%</td></tr>"+
            "<tr onclick=goTorecordCompInfo(43)><td>一类维修企业</td><td>"+data.class1corpcount+"</td><td>"+data.class1uploadcorpcount+"</td><td>"+data.class1corprate.toFixed(2)+"%</td></tr>"+
            "<tr onclick=goTorecordCompInfo(44)><td>二类维修企业</td><td>"+data.class2corpcount+"</td><td>"+data.class2uploadcorpcount+"</td><td>"+data.class2corprate.toFixed(2)+"%</td></tr>"+
            "<tr onclick=goTorecordCompInfo(45)><td>三类维修业户</td><td>"+data.class3corpcount+"</td><td>"+data.class3uploadcorpcount+"</td><td>"+data.class3corprate.toFixed(2)+"%</td></tr>"+
            "<tr onclick=goTorecordCompInfo(47)><td>汽车快修业户</td><td>"+data.class5corpcount+"</td><td>"+data.class5uploadcorpcount+"</td><td>"+data.class5corprate.toFixed(2)+"%</td></tr>"+
            "<tr onclick=goTorecordCompInfo(46)><td>摩托车维修业户</td><td>"+data.class4corpcount+"</td><td>"+data.class4uploadcorpcount+"</td><td>"+data.class4corprate.toFixed(2)+"%</td></tr>"
        $('#table1 tbody').empty();
        $('#table1 tbody').append(html)

        option1.series[0].data=[
            {value:parseInt(data.uploadcorpcount), name:'维修企业完成对接'},
            {value:parseInt(data.corpcount) - parseInt(data.uploadcorpcount), name:'维修企业未完成对接'},
        ]
        pie1.setOption(option1);
        $("#pie1").children(".pie1").remove();
        $("#pie1").append("<div class='pie1' style='position: absolute;left: 115px;top: 100px;font-size: 28px'><p style='text-align:center;font-size:medium;margin-bottom:15px'>总数</p><p style='text-align:center'>"+data.corpcount+"</p></div>")
        option3.series[0].data=[
            {value:parseInt(data.todayuploadcount), name:'今日上传数量'},
            {value:parseInt(data.yesterdayuploadcount), name:'昨日上传数量'},
        ]
        pie3.setOption(option3);
        $("#pie3").children(".pie3").remove();
        $("#pie3").append("<div class='pie3' style='position: absolute;left: 100px;top: 100px;font-size: 28px'><p style='text-align:center;font-size:medium;margin-bottom:15px'>总数</p><p style='text-align:center'>"+data.currentuploadcount+"</p></div>")
        layer.closeAll('loading')

        setBar1(bar1,res);
    })

    form.render()
    getComplaint(0)

    form.on('select(complaintType)', function(data){
        console.log(data);
        $('.complaint').hide()
        getComplaint(data.value)
    });

})

function getComplaint(type) {
    if(!$('#complaint'+type+' tbody').children().length){
        layer.load()
        simpleGet(baseu + '/comment/company/complaint/statistics?pageNum=1&pageSize=10&accessToken='+accessToken+ '&complaintType='+type ,function (res) {
            var datas= res.companyComplaintStatistic, html=''
            for (var i in datas){
                html+='<tr onclick=goComplain("'+datas[i].companyName+'","'+type+'")>' +
                    '<td>'+(parseInt(i)+1)+'</td>'+
                    '<td>'+datas[i].companyName+'</td>'+
                    '<td>'+datas[i].allCount+'</td>'+
                    '<td>'+datas[i].hasCount+'</td>'+
                    '<td>'+datas[i].noCount+'</td>'+
                    '</tr>'
            }
            $('#complaint'+type+' tbody').html(html)
        })
    }
    layer.closeAll('loading')
    $('#complaint'+type).show()
}

function goComplain(name,type) {
    window.location.href= '/center/manageComplain?name='+ encodeURI(name) +'&type='+type;
}

function goTorecordCompInfo(companycategory) {
    window.location.href= 'recordCompInfo?companycategory='+ (companycategory || '');
}

var colorList = [];

function setBar1(bar1,res) {
    // accessGet(baseu+'/statistics/admin/areaStatistics/'+localStorage.getItem("ACCESSTOKEN"), function (res) {

        var trueArea = ['310000','310112','310113','310114','310115','310116','310117','310118','310120', '310230'];

        var userArea = res.areaItems;

        var area=[], num=[], num2=[], sum=[]

        for (var i in res.areaItems){
            for(var j in trueArea) {
                if(res.areaItems[i].areakey === trueArea[j]) {
                    area.push(res.areaItems[i].areaname);
                    num.push(res.areaItems[i].nzdzcount)
                    // sum.push(res.data[i].dataNum)
                }
            }
        }

        for (var k in res.areaItems){
            for(var l in trueArea) {
                if(res.areaItems[k].areakey === trueArea[l]) {
                    num2.push(res.areaItems[k].zdzcount)
                    // sum[k]+= res.data[k].zdznum
                }
            }
        }

        for (var m in res.areaItems){
            for(var n in trueArea) {
                if(res.areaItems[m].areakey === trueArea[n]) {
                    sum.push(parseInt(res.areaItems[m].nzdzcount||0) + parseInt(res.areaItems[m].zdzcount||0))
                }
            }
        }

        // for(var j in res.data) {
        //     var tag = true;
        //     for(var k in userArea) {
        //         if(userArea[k] === res.data[j].areaKey) {
        //             colorList.push('#6761FF');
        //             tag = false;
        //             break;
        //         }
        //     }
        //     if(tag) {
        //         colorList.push('#909399');
        //     }
        // }

        optionBar.xAxis[0].data= area;
        optionBar.series[0].data=num;
        optionBar.series[1].data=num2;
        optionBar.series[2].data=sum;
        bar1.setOption(optionBar);

        bar1.on('click', function (params) {
            console.log(params)
            var url = '';
            // if(params.color === '#6761FF') {
                for(var j in res.areaItems) {
                    if(res.areaItems[j].areaname === params.name) {
                        url = 'recordCompInfo?areaKey='+res.areaItems[j].areakey;
                        break;
                    }
                }
                if(params.seriesIndex==1) url+= '&zdz=true'

                window.location.href = url;
            // }
        });

    bar1.getZr().on('dblclick', function (params) {
        // console.log(params)
        // console.log(this)
        var pointInPixel= [params.offsetX, params.offsetY];
        if (bar1.containPixel('grid',pointInPixel)) {
            var xIndex = bar1.convertFromPixel({seriesIndex: 0}, [params.offsetX, params.offsetY])[0];
            console.log(xIndex)
        }
    });
    // })
}

var option = {
    title: {
        text:'数据对接完成情况',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        // x: 'left',
        bottom: 0,
        data:['维修数据完成对接','维修数据未完成对接']
    },
    color:['#C14DE8','#4DB2E8','#6761FF'],
    series: [{
        name:'数据对接完成情况',
        type:'pie',
        radius: ['50%', '65%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '16',
                    fontWeight: ''
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data:[
            {value:4380, name:'维修数据完成对接'},
            {value:1620, name:'维修数据未完成对接'},
        ]
    }]
};

var optionBar = {
    color: ['#C14DE8'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            label:{show: true}
        }
    },
    grid: {
    },
    legend: {
        data:['非总对总数', '总对总数量', '全部'],
    },
    xAxis : [
        {
            type : 'category',
            data : ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区',  '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区',  '奉贤区', '崇明区'],
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
            barGap: 0,
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    // offset: [-25,-2]
                }
            },
            //配置样式
            itemStyle: {
                //通常情况下：
                normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: '#6761FF'
                }
            },
            name:'非总对总数',
            type:'bar',
            barWidth: '60%',
            data:[],
            stack: '数量',
            z: 3,
        },
        {
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    // offset: [25,-2]
                }
            },
            //配置样式
            itemStyle: {
                //通常情况下：
                normal:{
                    color: '#4DB2E8'
                }
            },
            name:'总对总数量',
            type:'bar',
            //barWidth: '60%',
            data:[],
            stack: '数量',
        },
        {
            name:'全部',
            type:'line',
            data:[],
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            },
            itemStyle: {
                //通常情况下：
                normal:{
                    color: '#C14DE8'
                }
            },
            z: 4,
        }
    ],
    // dataZoom: [
        // {
        //     show: true,
        //     yAxisIndex: 0,
        //     filterMode: 'none',
        //     width: 30,
        //     height: '70%',
        //     showDataShadow: false,
        //     left: '93%',
        //     minSpan:10
        // }
    // ],
};