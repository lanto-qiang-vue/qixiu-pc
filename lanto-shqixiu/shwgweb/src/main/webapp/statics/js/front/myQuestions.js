var pageSize = 25; //每页出现的数据量

$(function(){
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        layer.load();
        listMyQuestion(1,pageSize,laypage,true);
    });

    $("#tablebody").on('click','.layui-btn.view',function(){
        var id = $(this).attr('data-id');
        window.open(ctx + '/cdf/answerQuestion?id=' + id);
    });

    $("#tablebody").on('click','.layui-btn.del',function(){
        var param = {
            accessToken:localStorage.getItem("ACCESSTOKEN"),
            id:$(this).attr('data-id')
        };
        var url = baseu + "/cdf/delquestion";

        layer.confirm('确认要删除该提问吗？', {icon:3, btn : ['确定', '取消']}, function() {
            simplePost(url,JSON.stringify(param),function (res) {
                layer.msg('删除成功！', {time: 1000, icon:1}, function () {
                    layui.use('laypage', function(){
                        var laypage = layui.laypage;
                        listMyQuestion(1,pageSize,laypage,true);
                    });
                });
            });
        });
    });
});

var listMyQuestion = function (pageNo,pageSize,laypage,isRender) {
    var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
	var param = {
		accessToken:localStorage.getItem("ACCESSTOKEN"),
		loginUserId:userInfo && userInfo.userId,
		pageNo:pageNo,
		pageSize:pageSize
	};

    simplePost(baseu+'/cdf/myQuestion',JSON.stringify(param),function (res) {
        console.log('/cdf/myQuestion/→res:',res);
        var datas = res.data;
        var totalCount = res.totalCount;

        var str = '';
        for (var i in datas){
            var question = datas[i];
            var categoryName = question.categoryName || '其他';
            var expertName = question.expertName ? question.expertName : '';
            var statusName = '';

            if(question.status == 1){
                statusName = '未审核';
			} else if(question.status == 2){
                statusName = '已通过';
            } else if(question.status == 3){
                statusName = '未通过';
            }

            var delBtn = '<button class="layui-btn layui-btn-sm layui-btn-danger del" data-id="' + datas[i].id + '"><i class="layui-icon">&#xe640;</i> 删除 </button>';
            var viewButton = '<button class="layui-btn layui-btn-sm layui-btn-normal view" data-id="' + datas[i].id + '"><i class="layui-icon">&#xe63c;</i> 查看 </button>';

            str += '<tr> ';
            str += '<td style="text-align: center;">' + categoryName + '</td>';
            str += '<td>' + question.content +'</td>';
            str += '<td style="text-align: center;">' + expertName + '</td>';
            str += '<td style="text-align: center;">' + (new Date(question.createtime).toISOString().split(".")[0].split("T"))[0] +'</td>';
            str += '<td style="text-align: center;">' + statusName + '</td> ';
            str += '<td style="text-align: center;">' + viewButton + delBtn + '</td> ';
            str += '</tr>';
        }

        $("#tablebody").empty();
        if(!datas || datas.length == 0){
            $("#tablebody").append('<tr><td colspan="4" style="padding:50px 0px;text-align:center;color:#999;">未查询到数据</td></tr>');
        }else{
            $("#tablebody").append(str);
        }

        layer.closeAll()
        if(isRender){
            if(laypage){
                laypage.render({
                    elem: 'pagebar',
                    count: totalCount,
                    groups: 5,
                    limit: pageSize,
                    jump: function(obj, first){
                        if(!first){
                            listMyQuestion(obj.curr,pageSize,laypage,false);
                        }
                    }
                });
            }
        }
    });
}