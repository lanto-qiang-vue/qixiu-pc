Ext.define('app.model.repair.RepairGeneManagePartModel',{
    extend:'jsf.data.VO',
    fields:[
            {name:'PART_ID', type:'Long', label:'ID', len:'0-16'},   
            {name: 'BILL_CODE', type: 'string', label: '工单编号' ,req:true},
            {name: 'PART_CODE', type: 'string', label: '配件编码', len:'1-16'},
            {name: 'PART_NAME', type: 'string', label: '配件名称', len:'1-16'},
            {name: 'PART_COUNT', type: 'int', label: '数量'}
    ]

});
