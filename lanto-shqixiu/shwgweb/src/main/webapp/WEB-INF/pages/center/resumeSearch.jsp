<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
    <%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
    <div class="zhengwu_r">
        <div class="zhengwu_t">
            <span class="sp_zw">简历搜索</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/sysLogInfo">企业中心</a> > <span>简历搜索</span></span>
        </div>
        <div class="biaoge">

            <form class="layui-form" >
        <div style="width: 98%;margin-top: 10px">
            <div style="width: 280px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">姓名/ID</label>
                <div class="layui-input-block">
                    <input type="text" class="layui-input" id="key" style=" width: 190px;">
                </div>
            </div>
            <div style="width: 280px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">年龄</label>
                <div class="layui-input-block">
                    <div id="category" class="layui-input-inline search_select hoverlist1"
                         style="width: 190px; margin-right: 3px;" data-value=""
                         data-type="postType">
                        <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                                <input type="text" placeholder="请选择年龄" value="" readonly="" id="age"
                                       class="layui-input layui-unselect">
                                <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                                <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>18-20</span>
                                </dd>
                                <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>21-25</span>
                                </dd>
                                <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>26-30</span>
                                </dd>
                                <dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>31-34</span>
                                </dd>
                                <dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>35以上</span>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 280px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">工作年限</label>
                <div class="layui-input-block">
                    <div id="categorys" class="layui-input-inline search_select hoverlist2"
                         style="width: 190px; margin-right: 3px;" data-value=""
                         data-type="postType">
                        <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                                <input type="text" placeholder="请选择工作年限" value="" readonly="" id="experience"
                                       class="layui-input layui-unselect">
                                <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                                <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>无工作经验</span>
                                </dd>
                                <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>1年</span>
                                </dd>
                                <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>2年</span>
                                </dd>
                                <dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>3年-4年</span>
                                </dd>
                                <dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>5年-7年</span>
                                </dd>
                                <dd data-value="6" class=""><i class="layui-icon">&#xe605;</i> <span>8年-9年</span>
                                </dd>
                                <dd data-value="7" class=""><i class="layui-icon">&#xe605;</i> <span>10年以上</span>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 280px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">学历</label>
                <div class="layui-input-block">
                    <div id="categorytsr" class="layui-input-inline search_select hoverlist3"
                         style="width: 190px; margin-right: 3px;" data-value=""
                         data-type="category">
                        <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                                <input type="text" placeholder="请选择学历" value="" readonly=""
                                       class="layui-input layui-unselect" id="degree" >
                                <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                                <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>初中及以下</span>
                                </dd>
                                <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>高中</span>
                                </dd>
                                <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>中专</span>
                                </dd>
                                <dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>大专</span>
                                </dd>
                                <dd data-value="5" class=""><i class="layui-icon">&#xe605;</i> <span>本科</span>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 280px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">期待月薪</label>
                <div class="layui-input-block">
                    <div id="categorytss" class="layui-input-inline search_select hoverlist4"
                         style="width: 190px; margin-right: 3px;" data-value=""
                         data-type="postType">
                        <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                                <input type="text" placeholder="请选择期待月薪" value="" readonly="" id="expectSalary"
                                       class="layui-input layui-unselect">
                                <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                                <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>2000-3000</span>
                                </dd>
                                <dd data-value="2" class=""><i class="layui-icon">&#xe605;</i> <span>3000-4000</span>
                                </dd>
                                <dd data-value="3" class=""><i class="layui-icon">&#xe605;</i> <span>4000-5000</span>
                                </dd>
                                <dd data-value="4" class=""><i class="layui-icon">&#xe605;</i> <span>5000及以上</span>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 280px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">性别</label>
                <div class="layui-input-block">
                    <div id="categoryts" class="layui-input-inline search_select hoverlist5"
                         style="width: 190px; margin-right: 3px;" data-value=""
                         data-type="postType">
                        <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                                <input type="text" placeholder="请选择性别" value="" readonly="" id="sex"
                                       class="layui-input layui-unselect">
                                <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                                <dd data-value="1" class=""><i class="layui-icon">&#xe605;</i> <span>男</span>
                                </dd>
                                <dd data-value="0" class=""><i class="layui-icon">&#xe605;</i> <span>女</span>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 280px;display: inline-block;margin-top: 10px">
                <label class="layui-form-label">居住地</label>
                <div class="layui-input-block">
                    <input type="text" class="layui-input" id="address" style=" width: 190px;">
                </div>
            </div>
            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="float:right;margin-top: 10px">搜索简历</div>
        </div>
            </form>
            <table id="table1" class="layui-table" lay-size="sm" style="width: 100%">
                <colgroup>
                    <col width="50"><col width="100"><col width="100"><col width="100"><col width="100"><col width="100">
                </colgroup>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>操作</th>
                    <th>简历编号</th>
                    <th>姓名</th>
                    <th>年龄</th>
                    <th>工作年限</th>
                    <th>性别</th>
                    <th>居住地</th>
                    <th>期盼职位</th>
                    <th>期盼薪资</th>
                    <th>学历</th>
                    <th>简历更新时间</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

            <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
        </div>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    var info = JSON.parse(localStorage.getItem('USERINFO'));
    var roleId = info.userRoleId || '';
    var onsiteServiceId = null;
    var laypageA = layui.laypageA;
    var laypage = layui.laypage;
    var count = 0;
    var currPage = 1;
    var dialogCount = 0;
    var dialogCurrPage = 1;
    var targetAnswerId = null;

    $(function(){
        layui.use('laypage', function(){
            //执行一个laypage实例
            search(10, 1, laypage)

        });
    });

    function search(limit, page, laypage) {
        if(!laypage){
            laypage = layui.laypage;
        }

        var ii = layer.load();
        currPage = page;
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            limit: (limit ? limit : 10),
            page: page,
            key: $('#key').val(),
            address: $('#address').val(),
            age: $('.hoverlist1 .select-this').attr('data-value') || '',
            experience: $('.hoverlist2 .select-this').attr('data-value') || '',
            degree: $('.hoverlist3 .select-this').attr('data-value') || '',
            expectSalary: $('.hoverlist4 .select-this').attr('data-value') || '',
            sex: $('.hoverlist5 .select-this').attr('data-value') || ''
        }
        accessPost(baseu+ '/center/resumeSearch/list', JSON.stringify(param), function (res) {
            console.log(res)
            if(res && res.code === "000000"){
                var html='', data=res.data.dataList;
                console.log(data);
                for (var i in data){
                    var sexs,degrees,exp,esa;
                    if(data[i].sex ==1){
                        sexs="男";
                    }else{
                        sexs="女";
                    }
                    if(data[i].degree==1){
                        degrees="初中以下";
                    }else if(data[i].degree==2){
                        degrees="高中";
                    }else if(data[i].degree==3){
                            degrees="中专";
                     }else if(data[i].degree==4){
                         degrees="大专";
                     }else if(data[i].degree==5){
                    degrees="本科";
                    }
                    if(data[i].experience==0||data[i].experience==null){
                        exp="无工作经验"
                    }else{

                        exp=data[i].experience+"年";
                    }
                    if(data[i].expectSalary==1){
                        esa="2000-3000";
                    }else if(data[i].expectSalary==2){
                        esa="3000-4000";
                    }else if(data[i].expectSalary==3){
                        esa="4000-5000";
                    }else if(data[i].expectSalary==4){
                        esa="5000以上";
                    }
                    html+='<tr name="'+data[i].id+'"><td>'+(parseInt(i)+1)+'</td>' +
                        '<td><button class="layui-btn layui-btn-normal layui-btn-small" onclick="detailRow(' + data[i].resumeId + ')">查看简历</button>' +
                        ' <td>'+(data[i].resumeId || '')+'</td>' +
                        ' <td>'+(data[i].realName || '')+'</td>' +
                        ' <td>'+(data[i].age || '')+'</td>' +
                        ' <td>' + (exp || '') + '</td>' +
                        ' <td>' + (sexs|| '') + '</td>' +
                        ' <td>' + (data[i].address || '') + '</td>' +
                        ' <td>' + (data[i].expectPost || '') + '</td>' +
                        ' <td>' + (esa|| '') + '</td>' +
                        ' <td>' + (degrees || '') + '</td>' +
                        ' <td>' +(formatDate(data[i].updateTime,'yyyy-MM-dd') || '') + '</td>' +
                        ' </tr>'
                }
                $("#table1 tbody").html(html)

                if(laypage){
                    laypage.render({
                        elem: 'pagebar'
                        ,count: res.data.total //数据总数，从服务端得到
                        ,curr: currPage
                        ,jump: function(obj, first){
                            //obj包含了当前分页的所有参数，比如：
                            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            currPage = obj.curr;
                            //首次不执行
                            if(!first){
                                search(limit, obj.curr)
                                //do something
                            }
                        }
                    });
                }
                layer.closeAll();
            }else {
                layer.msg(res.status, {time: 2000, icon:0});
                layer.close(ii);
            }

        })
    }


    $('#search').click(function () {
             key=$('#key').val(),
            address=$('#address').val(),
            age=$('.hoverlist1 .select-this').attr('data-value') || '',
            experience= $('.hoverlist2 .select-this').attr('data-value') || '',
            degree=$('.hoverlist3 .select-this').attr('data-value') || '',
            expectSalary=$('.hoverlist4 .select-this').attr('data-value') || '',
            sex=$('.hoverlist5 .select-this').attr('data-value') || ''
        search(10, 1, laypage);
    });
    function detailRow(resumeId){
        window.location.href = '/shwgweb/center/resumeInfo?id=' + resumeId;
    }
    $('.hoverlist1 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist1 dl dd').removeClass('select-this');
            $(this).addClass('select-this');
        }
        var items = [];
        var titleItems = [];
        par.find('dl .select-this').each(function () {
            items.push($(this).attr('data-value'));
            titleItems.push($(this).find('span').text());
        });
        if (titleItems && titleItems.length > 0) {
            par.find('input').val(titleItems.join('|'));
            par.attr("title", titleItems.join('|'));
        } else {
            par.find('input').val(par.attr('data-tit'));
            par.attr("title", par.attr('data-tit'));
        }

        if (items && items.length > 0) {
            par.attr("data-value", items.join(','));
        } else {
            par.attr("data-value", '');
        }
    });
    $('.hoverlist2 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist2 dl dd').removeClass('select-this');
            $(this).addClass('select-this');
        }
        var items = [];
        var titleItems = [];
        par.find('dl .select-this').each(function () {
            items.push($(this).attr('data-value'));
            titleItems.push($(this).find('span').text());
        });
        if (titleItems && titleItems.length > 0) {
            par.find('input').val(titleItems.join('|'));
            par.attr("title", titleItems.join('|'));
        } else {
            par.find('input').val(par.attr('data-tit'));
            par.attr("title", par.attr('data-tit'));
        }

        if (items && items.length > 0) {
            par.attr("data-value", items.join(','));
        } else {
            par.attr("data-value", '');
        }
    });
    $('.hoverlist3 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist3 dl dd').removeClass('select-this');
            $(this).addClass('select-this');
        }
        var items = [];
        var titleItems = [];
        par.find('dl .select-this').each(function () {
            items.push($(this).attr('data-value'));
            titleItems.push($(this).find('span').text());
        });
        if (titleItems && titleItems.length > 0) {
            par.find('input').val(titleItems.join('|'));
            par.attr("title", titleItems.join('|'));
        } else {
            par.find('input').val(par.attr('data-tit'));
            par.attr("title", par.attr('data-tit'));
        }

        if (items && items.length > 0) {
            par.attr("data-value", items.join(','));
        } else {
            par.attr("data-value", '');
        }
    });
    $('.hoverlist4 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist4 dl dd').removeClass('select-this');
            $(this).addClass('select-this');
        }
        var items = [];
        var titleItems = [];
        par.find('dl .select-this').each(function () {
            items.push($(this).attr('data-value'));
            titleItems.push($(this).find('span').text());
        });
        if (titleItems && titleItems.length > 0) {
            par.find('input').val(titleItems.join('|'));
            par.attr("title", titleItems.join('|'));
        } else {
            par.find('input').val(par.attr('data-tit'));
            par.attr("title", par.attr('data-tit'));
        }

        if (items && items.length > 0) {
            par.attr("data-value", items.join(','));
        } else {
            par.attr("data-value", '');
        }
    });
    $('.hoverlist5 dl').on('click', 'dd', function () {
        var par = $(this).parents(".search_select");
        if ($(this).hasClass('select-this')) {
            $(this).removeClass('select-this');
        } else {
            $('.hoverlist5 dl dd').removeClass('select-this');
            $(this).addClass('select-this');
        }
        var items = [];
        var titleItems = [];
        par.find('dl .select-this').each(function () {
            items.push($(this).attr('data-value'));
            titleItems.push($(this).find('span').text());
        });
        if (titleItems && titleItems.length > 0) {
            par.find('input').val(titleItems.join('|'));
            par.attr("title", titleItems.join('|'));
        } else {
            par.find('input').val(par.attr('data-tit'));
            par.attr("title", par.attr('data-tit'));
        }

        if (items && items.length > 0) {
            par.attr("data-value", items.join(','));
        } else {
            par.attr("data-value", '');
        }
    });
</script>
</html>

