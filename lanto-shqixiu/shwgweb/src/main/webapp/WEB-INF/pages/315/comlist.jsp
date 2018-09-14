<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <script src="${btx}/js/front/login.js"></script>
<style>
    *{margin:0;padding:0;box-sizing: border-box;}
    li{list-style:none}
    a{color: inherit;text-decoration: none;}
    input{border:0;outline:none;}

    html, body {
        min-width: 900px;
        /*height: 100%;*/
    }
    body{
        background: url(${btx}/images/315/315iconbg.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        min-height: 100vh;
    }
    .img{
        width: 900px;
        position: relative;
        display: inline-block;
    }
    .img img{
        width: 100%;
    }
    .img .huiming{
        width: 130px;
        height: 60px;
        /*border: 1px solid black;*/
        position: absolute;
        right: 200px;
        bottom: 5px;
        display: block;
    }
    h1{
        font-size: 30px;
        color: #ece49c;
        position: relative;
        margin: 20px 0;
    }
    .list{
        text-align: left;
        display: inline-block;
        width: 900px;
    }
    .list li{
        width: 19%;
        height: 195px;
        margin-right: 1%;
        margin-bottom: 20px;
        float: left;
        cursor: pointer;
    }
    .list li img{
        width: 100%;
    }
    .list li p{
        color: white;
        text-align: center;
        font-size: 16px;
    }
</style>
</head>
<body>
<div class="img">
    <img src="${btx}/images/315/315icon.png">
    <a class="huiming" href="/315/youhui"></a>
</div>
<br/>
<h1>全国汽车维修行业诚信企业</h1>
<div class="select" style="width: 100%;text-align: center">
    <form class="layui-form" style="display: inline-block;text-align: left"> <!-- 提示：如果你不想用form，你可以换成div等任何一个普通元素 -->
        <div class="layui-form-item">
            <label class="layui-form-label" style="color: white">可维修品牌</label>
            <div class="layui-input-block" style="width: 200px">
                <select id="brand" lay-filter="brand">
                    <option value="all">全部企业</option>
                    <option value="全部品牌">所有品牌</option>
                    <option value="通用别克">通用别克</option>
                    <option value="上海大众">上海大众</option>
                    <option value="雷克萨斯">雷克萨斯</option>
                    <option value="奥迪">奥迪</option>
                    <option value="丰田">丰田</option>
                    <option value="本田">本田</option>
                    <option value="江铃">江铃</option>
                    <option value="苏州金龙">苏州金龙</option>
                    <option value="奔驰、宝马、保时捷">奔驰、宝马、保时捷</option>
                    <option value="依维柯、跃进、郑州日产、海格">依维柯、跃进、郑州日产、海格</option>
                    <option value="上汽荣威、上汽大通、厦门金龙、宇通、北方">上汽荣威、上汽大通、厦门金龙、宇通、北方</option>
                </select>
            </div>
        </div>
    </form>
</div>

<ul class="list">
    <li id="5703"><img src="${btx}/images/315/长江.png"/><p>上海长江汽车销售服务有限公司</p></li>
    <li id="6"><img src="${btx}/images/315/冠松丰田.png"/><p>上海冠松丰田汽车销售服务有限公司</p></li>
    <li id="571"><img src="${btx}/images/315/嘉定华毅.png"/><p>上海嘉定华毅汽车销售服务有限公司</p></li>
    <li id="5753"><img src="${btx}/images/315/西上海宝山.png"/><p>上海西上海宝山汽车销售服务有限公司</p></li>
    <li id="44"><img src="${btx}/images/315/强生集团.png"/><p>上海强生集团汽车修理有限公司</p></li>
    <li id="5758"><img src="${btx}/images/315/永加.png"/><p>上海永加汽车销售服务有限公司</p></li>
    <li id="5230"><img src="${btx}/images/315/云峰众旭.png"/><p>上海云峰众旭汽车销售服务有限公司</p></li>
    <li id="5695"><img src="${btx}/images/315/云峰金山.png"/><p>上海云峰金山汽车发展有限公司</p></li>
    <li id="1398"><img src="${btx}/images/315/中规.png"/><p>上海中规汽车销售服务有限公司</p></li>
    <li id="5750"><img src="${btx}/images/315/龙衡.png"/><p>上海龙衡汽车销售服务有限公司</p></li>
    <li id="109"><img src="${btx}/images/315/文洋.png"/><p>上海文洋汽车销售服务有限公司</p></li>
    <li id="4890"><img src="${btx}/images/315/佳葆.png"/><p>上海佳葆汽车修理厂</p></li>
    <li id="293"><img src="${btx}/images/315/冠松.jpg"/><p>上海冠松汽车维修服务有限公司</p></li>
    <li id="299"><img src="${btx}/images/315/东昌凌志.png"/><p>上海东昌凌志汽车销售服务有限公司</p></li>
    <li id="285"><img src="${btx}/images/315/永达汽车浦东.png"/><p>上海永达汽车浦东销售服务有限公司</p></li>
    <li id="4778"><img src="${btx}/images/315/万兴世界.png"/><p>上海万兴世界汽车销售服务有限公司</p></li>
    <li id="3806"><img src="${btx}/images/315/徐大中.png"/><p>上海徐大中汽车销售服务有限公司</p></li>
    <li id="2"><img src="${btx}/images/315/科达.png"/><p>上海科达汽车销售服务有限公司</p></li>
    <li id="3846"><img src="${btx}/images/315/同际.png"/><p>上海同际汽车销售服务有限公司</p></li>
    <li id="3805"><img src="${btx}/images/315/名流.png"/><p>上海名流汽车售后服务有限公司</p></li>
    <li id="95"><img src="${btx}/images/315/永达.png"/><p>上海永达汽车经营服务有限公司</p></li>
    <li id="5794"><img src="${btx}/images/315/银星.png"/><p>上海银星汽车维修有限公司</p></li>
    <li id="3736"><img src="${btx}/images/315/交运起元.png"/><p>上海交运起元汽车销售服务有限公司</p></li>
    <li id="5055"><img src="${btx}/images/315/锦江通永.png"/><p>上海锦江通永汽车销售服务有限公司</p></li>
    <li id="678"><img src="${btx}/images/315/上勤.png"/><p>上海上勤汽车维修有限公司</p></li>
    <li id="4974"><img src="${btx}/images/315/宝钢.png"/><p>上海宝钢汽车检测修复有限公司宝杨路分厂</p></li>
    <li id="307"><img src="${btx}/images/315/东昌.png"/><p>上海东昌汽车服务有限公司</p></li>
    <li id="4173"><img src="${btx}/images/315/畅行挚信.png"/><p>上海车畅行挚信汽车服务有限公司</p></li>
    <li id="5"><img src="${btx}/images/315/华邦龙柏.jpg"/><p>上海华邦龙柏汽车服务有限公司</p></li>
    <li id="5791"><img src="${btx}/images/315/蓝剑.png"/><p>上海蓝剑汽车修理有限公司</p></li>
    <li id="3773"><img src="${btx}/images/315/九菱.png"/><p>上海九菱汽车维修有限公司</p></li>
    <li id="3826"><img src="${btx}/images/315/锦江.png"/><p>上海锦江汽车销售服务有限公司</p></li>
    <li id="5761"><img src="${btx}/images/315/永达汽车松江.png"/><p>上海永达汽车松江销售服务有限公司</p></li>
    <li id="5789"><img src="${btx}/images/315/莱克.png"/><p>上海莱克汽车维修有限公司</p></li>

</ul>

<script>
$(function () {
    var brand={
        "全部品牌": [3773, 293, 5794, 1398, 4890, 44, 5791, 5789, 4173],
        "通用别克": [678, 3805, 5761, 5753, 307, 4778, 5695, 109, 5055],
        "上海大众": [571, 3806, 3826, 5703, 5230, 3736, 3846, 5758, 5750],
        "雷克萨斯": [299 ],
        "奥迪": [285, 5],
        "丰田": [6],
        "本田": [95],
        "江铃": [2],
        "苏州金龙": [678, 4979],
        "奔驰、宝马、保时捷": [5],
        "依维柯、跃进、郑州日产、海格": [4974],
        "上汽荣威、上汽大通、厦门金龙、宇通、北方": [678]
    }
    showBrand("all")

    var form = layui.form;
    form.on('select(brand)', function (data) {
        console.log(data.value)
        showBrand(data.value)
    });

    $(".list li").click(function () {
        window.location.href= "/315/comdetail?id=" + $(this).attr("id")
    })

    function showBrand(val) {
        $(".list li").hide()
        if(val=='all'){
            $(".list li").show()
        }
        for(var i in brand[val]){
            $("#"+brand[val][i]).show()
        }
    }
})
</script>
</body>
</html>
