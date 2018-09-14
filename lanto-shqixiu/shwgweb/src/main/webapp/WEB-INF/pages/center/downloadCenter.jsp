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
            <span class="sp_zw">下载中心</span> <span class="sp_wz">您所在位置：<a
                href="${ctx}/center/companyHome">管理中心</a> > <span>下载中心</span></span>
        </div>

        <div style="margin-top: 10px">
            <%--<div style="width: 300px;display: inline-block">--%>
            <%--<label class="layui-form-label">文件分类</label>--%>
            <%--<div class="layui-input-block">--%>
            <%--<input id="category" type="text" name="title" placeholder="请输入文件分类" autocomplete="off"--%>
            <%--class="layui-input">--%>
            <%--</div>--%>
            <%--</div>--%>

            <div style="width: 300px;display: inline-block">
                <label class="layui-form-label">文件名</label>
                <div class="layui-input-block">
                    <input id="filename" type="text" name="title" placeholder="请输文件名" autocomplete="off"
                           class="layui-input">
                </div>
            </div>

            <div id="search" class="layui-btn layui-btn-normal" lay-submit lay-filter="formDemo" style="margin-left: 60px">搜索</div>

            <button type="button" class="layui-btn layui-btn-normal" id="upload">
                <i class="layui-icon">&#xe67c;</i>上传文件
            </button>
            <span>仅支持doc, xls, xlsx</span>
        </div>
        <table id="table1" class="layui-table" lay-size="sm" style="width: 1000px">
            <colgroup>
                <col width="180">
                <col>
                <col width="120">
            </colgroup>
            <thead>
            <tr>
                <th>编号</th>
                <%--<th>文件分类</th>--%>
                <th>文件名</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <div id="pagebar" style="text-align:center;margin-top:5px;"></div>
    </div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp" %>
</body>
<script type="text/javascript">
    $(function () {


        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            search(10, 1, laypage)

        });

        $('#search').click(function () {
            search(10, 1, laypage)
        })


        $("#table1 tbody").on('click', 'div[name=delete]', function () {
            layer.load();
            var param = {
                accessToken: localStorage.getItem('ACCESSTOKEN'),
                id: $(this).attr('id')
            }
            accessPost(baseu + '/file/delete', JSON.stringify(param), function (res) {
                handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                search(10, 1, laypage)
                layer.closeAll('loading');
                layer.msg('删除成功!');
            })
        })

        layui.use('upload', function(){
            var upload = layui.upload;
            var filename = '';
            //执行实例
            var uploadInst = upload.render({
                elem: '#upload' //绑定元素
                ,url: baseu+'/file/add/'+localStorage.getItem('ACCESSTOKEN') //上传接口
                ,accept: 'file'
                ,exts: 'xlsx|xls|doc'
                ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
                    //将每次选择的文件追加到文件队列
                    var files = obj.pushFile();

                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                    obj.preview(function(index, file, result){
                        filename = file.name; //得到文件对象
                    });
                    layer.load(); //上传loading
                }
                ,done: function(res, index, upload){
                    //上传完毕回调
                    if(res.code== '000000'){
                        var url = res.data.docPath.split('/files/')
                        var param = {
                            accessToken: localStorage.getItem('ACCESSTOKEN'),
                            category: '',
                            filename: filename,
                            url: url[1]
                        }
                        accessPost(baseu + '/file/upload', JSON.stringify(param), function (res) {
                            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
                            search(10, 1, laypage)
                            layer.closeAll('loading');
                            layer.msg('上传成功!');
                        })
                    }else{
                        layer.msg(res.status, {time: 2000, icon:5});
                    }
                    layer.closeAll('loading');
                }
                ,error: function(){
                    layer.closeAll('loading');
                    //请求异常回调
                }
            });
        });
    });

    function search(pageSize, pageNo, laypage) {
        var ii = layer.load();
        var param = {
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            pageSize: (pageSize ? pageSize : 10),
            pageNo: pageNo,
//            category: $('#category').val(),
            filename: $('#filename').val()
        }
        accessPost(baseu + '/file/querydetail', JSON.stringify(param), function (res) {
            handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            console.log(res)
            var html = '', data = res.data;
            for (var i in data) {
                html += '<tr><td>' + (parseInt((param.pageNo - 1) * param.pageSize + parseInt(i) + 1)) + '</td><td><a href=' + data[i].url + '>' + data[i].filename + '</a></td><td><div id=' + data[i].id + ' name=\"delete\" class=\"layui-btn layui-btn-normal\">删除</div></td></tr>'
            }
            $("#table1 tbody").html(html)

            if (laypage) {
                laypage.render({
                    elem: 'pagebar'
                    , count: res.count //数据总数，从服务端得到
                    , jump: function (obj, first) {
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
//                        console.log(obj.limit); //得到每页显示的条数
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
</script>
<style>
    #table1 a {
        color: #4ba7f5;
    }
</style>
</html>
