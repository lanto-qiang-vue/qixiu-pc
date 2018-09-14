$(function () {
    var id = getUrlParam('id'), token = localStorage.getItem('ACCESSTOKEN'), url = ''
    layer.load()
    if (getUrlParam('type') == 'my') {
        layer.load()
        $(".table1").show()
        $(".recipient-button").removeClass("recipient-button")
        // layui.use('laypage', function () {
        //     var laypage = layui.laypage;
        //     //执行一个laypage实例
        //     search(1, laypage)
        // });

        // function search(page, laypage) {
        //     var param = {
        //         "accessToken": token,
        //         "limit": 10,
        //         "noticeId": id,
        //         "page": page
        //     }
        //     accessPost(baseu + '/message/notify/getReceiveList/' + id + "/" + token, JSON.stringify(param), function (res) {
        //         // console.log(res)
        //         var datas = res.noticeReceiveDataPage.content, html = '';
        //         for (var i in datas) {
        //             html += "<tr><td>" + (datas[i].companyname ? datas[i].companyname : (datas[i].nickName ? datas[i].nickName : datas[i].mobile)) + "</td><td>" + (datas[i].read ? '<span style="color: green">已读</span>' : '<span style="color: red">未读</span>') + "</td><td>" + (new Date(datas[i].receiveTime).toISOString().split(".")[0].split("T")) + "</td></tr>"
        //         }
        //         $(".table1 tbody").html(html)
        //
        //         if(laypage){
        //             laypage.render({
        //                 elem: 'pagebar'
        //                 ,count: res.noticeReceiveDataPage.totalElements //数据总数，从服务端得到
        //                 ,jump: function(obj, first){
        //                     //obj包含了当前分页的所有参数，比如：
        //                     console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        //                     console.log(obj.limit); //得到每页显示的条数
        //                     //首次不执行
        //                     if(!first){
        //                         search(obj.curr)
        //                         //do something
        //                     }
        //                 }
        //             });
        //         }
        //         layer.closeAll('loading');
        //     })
        // }

    } else {
        $(".title1").text("我收到的通知")
        var param = {
            accessToken: token,
            notifyId: id
        }
        accessPatch(baseu + '/message/notify/update', JSON.stringify(param), function (res) {
            console.log(res)
        })
    }
    // accessGet(baseu + url + token, function (res) {
    //     // console.log(res)
    //     var datas = res.data, content = '', url = [];
    //     for (var i in datas) {
    //         if (datas[i].notifyId == id) {
    //             // console.log(datas[i])
    //             content = JSON.parse(datas[i].content).content
    //             url = JSON.parse(datas[i].content).url
    //             $(".title").val(datas[i].title)
    //             $(".context").html(content)
    //             // console.log(url)
    //             var html = ""
    //             for (var i in url) {
    //                 html += "<li><a href='" + url[i] + "'>" + url[i] + "</a></li>"
    //             }
    //             $(".extra").append(html)
    //         }
    //     }
    //     layer.closeAll('loading');
    // })

    var param2 = {
        accessToken: token,
        notifyId: id
    }
    accessPost(baseu + '/message/notify/getNotify',JSON.stringify(param2), function (res) {
        console.log(res)
        var data = res.data, content = '', url = [];
                content = JSON.parse(data.content).content
        console.log("content",content);
                url = JSON.parse(data.content).url
                $("#title").html(data.title)
                $("#context").html(content)
                var html = ""
                var fileName = ''
                for (var i in url) {
                    if (url[i] != '' && url[i] != null) {
                        fileName = url[i].substring(url[i].lastIndexOf('/')+1)
                    }
                    html += "<li><a href='" + url[i] + "'>" + fileName + "</a></li>"
                }
                $(".extra").append(html)
        layer.closeAll('loading');
    })



})
function recipient() {
    window.location.href = 'companyRecipients?id='+getUrlParam('id')+'&type=my';
}
