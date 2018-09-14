$(function () {

})

function table1() {
    var table = layui.table;
    // console.log(layui.table)
    table.render({
        elem: '#table1'
        ,height: 600
        ,url: baseu + '/vehicle/carfile/query'
        ,method: 'post'
        ,where:{
            systemtoken: '5ad9e22176954d97b8098cd231a3c3bb',
            companyid: '1'
        }
        ,response: {
            statusName: 'status' //数据状态的字段名称，默认：code
            ,statusCode: 200 //成功的状态码，默认：0
            ,msgName: 'hint' //状态信息的字段名称，默认：msg
            ,countName: 'total' //数据总数的字段名称，默认：count
            ,dataName: 'rows' //数据列表的字段名称，默认：data
        }
        ,cols:  [[ //标题栏
            ,{field: 'id', title: 'ID', width: 80}
            ,{field: 'username', title: '用户名', width: 120}
        ]]
    });
}