Ext.define('app.model.repair.RepairGeneManageDetailModel',{
    extend:'jsf.data.VO',
    fields:[
            {name:'DETIAL_ID', type:'Long', label:'ID', len:'0-16'},   
            {name: 'BILL_ID', type: 'string', label: '工单编号' ,req:true},
            {name: 'BILL_CODE', type: 'string', label: '工单编号' ,req:true},
            {name: 'REPAIR_TYPE', type: 'string', label: '维修类别' ,req:true,val:'dict|dict.'+app.utils.SysCodes.REPAIRTYPE},
            {name: 'REPAIR_ITEM', type: 'string', label: '维修项目' ,req:true,val:'dict|dict.'+app.utils.SysCodes.REPAIRITEM},
            {name: 'REPAIRMAN', type: 'string', label: '主修人员', len:'1-16'},
            
            {name: 'TIME_COST', type: 'float', label: '工时费用（元）'},
            {name: 'MAT_COST', type: 'float', label: '材料费用（元）'},
            {name: 'COST_SUM', type: 'float', label: '维修费用（合计）'}
    ]

});
