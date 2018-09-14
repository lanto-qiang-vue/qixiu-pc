var table = layui.table;
$(function(){

	  // getAjaxData(1);
	  $("#searchbtn").click(function(){
          layui.use('laypage', function(){
              var laypage = layui.laypage;
              getQuestion(1,10,laypage,true);
          });
	  });
	  // $("#quest_type").change(function(){
       //    getQuestion(1);
	  // });
	  // $("#vehicle_brand").change(function(){
       //    getQuestion(1);
	  // });

    $("#submitbutton").click(function () {
        // layer.msg('提交成功！', {time: 2000, icon:1});
        submitQuestion();
    })

    layui.use('laypage', function(){
        var laypage = layui.laypage;
        getQuestion(1,10,laypage,true);
    });
});


var toJump = function(obj,first){
	var curr = obj.curr;
	if(!first){
		getAjaxData(curr);
	}
}

function submitQuestion() {
	var acctok= localStorage.getItem("ACCESSTOKEN"),param={}
    systemCall(function (systok) {
        if(!acctok){
            param.accessToken= systok
            param.anonymity= true
        }else{
            param.accessToken= acctok
			param.anonymity= false
		}
        param.content=$(".content").val()
		param.questionTypeId= $(".questlist .active").attr("data-code")
        accessPost(baseu+'/cdf/addquestion', JSON.stringify(param), function (res) {
			if(res.code=='000000'){
                layer.msg('提交成功！', {time: 2000, icon:1}, function () {
                    location.reload()
                });

			}else{
                layer.msg(res.status, {time: 2000, icon:5});
			}
        })
    })
}

var checkExpertLogin = function (expertUserId) {
    var isExpert = false;
    var userInfo = JSON.parse(localStorage.getItem('USERINFO'));

    if(userInfo && userInfo.userRoleId === 5 && expertUserId){
        isExpert = true;
    }

    return isExpert;
}

function getQuestion(pageNo,pageSize,laypage,isRender) {
    var userInfo = JSON.parse(localStorage.getItem('USERINFO'));

    systemCall(function (systok) {
        var param = {
            systemToken:systok,
            content:$('#keyword').val(),
            category:$('#selCategory').val(),
            page: pageNo ? pageNo : 1,
            limit: pageSize,
            loginUserId:userInfo && userInfo.userId
        };

        simplePost(baseu+'/center/questionList',JSON.stringify(param),function (res) {
            console.log('/cdf/queryquestionlist/→res:',res);
            var datas = res.data.dataList;
            var totalCount = res.data.total;

            var str = '';
            for (var i in datas){
                var question = datas[i];
                var expertUserId = question.expertUserId;
                var detailUrl = ctx + '/cdf/answerQuestion?id=' + question.quesId;
                var categoryName = question.categoryName || '其他';

                // str += '<tr> ';
                // // str += '<td style="text-align: center;"><a style="width: 30px;color:blue" href="' + detailUrl + '">查看</a></td>';
                // str += '<td style="text-align: center;">' + categoryName + '</td>';
                // // if(checkExpertLogin(question.expertUserId)){
                // //     str += '<span style="color:red">@我<br></span>';
                // // }
                // str += '<td><a href="'+detailUrl+'">' + question.quesContent +'</a></td>';
                // str += '<td style="text-align: center;">' + (new Date(question.createTime+ 28800000).toISOString().split(".")[0].split("T"))[0] +'</td>';
                // str += '<td style="text-align: center;">' + question.viewNumber +'</td> ';
                // str += '</tr>';

                str += '<a href="'+detailUrl+'"> ';
                str += '<p>'+question.quesContent+'</p>'
                str += '<div>'
                str += '<label>'+categoryName+'</label>'
                // str += '<span>'+(new Date(question.createTime+ 28800000).toISOString().split(".")[0].split("T"))[0]+'</span>'
                str += '<span>'+(formatDate(question.createTime, 'yyyy-MM-dd hh:mm:ss')||'')+'</span>'
                str += '<span>'+question.viewNumber+'次查看</span>'
                    str += '</div>'
                str += '</a>';
            }

			$("#question").empty();
			if(!datas || datas.length == 0){
				$("#question").append('<tr><td colspan="4" style="padding:50px 0px;text-align:center;color:#999;">未查询到数据</td></tr>');
			}else{
				$("#question").append(str);
			}

            // table.init('gridtable', {
            //     height: 500 //设置高度
            //     ,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
            //     //支持所有基础参数
            // });

            if(isRender){
                if(laypage){
                    laypage.render({
                        elem: 'pagebar',
                        count: totalCount,
                        groups: 5,
                        limit: pageSize,
                        jump: function(obj, first){
                            if(!first){
                                getQuestion(obj.curr,pageSize,laypage,false);
                            }
                        }
                    });
                }
            }
        });
    });
}

