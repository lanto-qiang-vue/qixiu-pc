Ext.define('app.model.RepairGeneManageModel',{
    extend:'jsf.data.PO',
    fields:[
            {name:'GENE_ID', type:'Long', label:'ID'},   
            {name: 'BILL_CODE', type: 'string', label: '工单编号'},
            {name: 'CORP_ID', type: 'string', label: '单位编号'},
            {name: 'CORP_NAME', type: 'string', label: '承修方'},
            {name: 'DELEGATE_NAME', type: 'string', label: '托修方',req:true},
            {name: 'PLATE_NUM', type: 'string', label: '车牌号码' ,req:true},
            {name: 'PLATE_NUMA', type: 'string', label: '车牌号码', len:'0-5' ,req:true},
            {name: 'PLATE_NUMB', type: 'string', label: '车牌号码', len:'0-5' ,req:true},
            {name: 'PLATE_COLOR', type: 'string', label: '车牌颜色'  ,val:'dict|dict.1006'},
            {name: 'VEHICLE_TYPE', type: 'string', label: '车辆类型' ,req:true,val:'dict|dict.1007'},
            {name: 'VEHICLE_NATURE', type: 'string', label: '车辆性质' ,req:true,val:'dict|dict.1013'},
            {name: 'LEAVE_DATE', type: 'date', label: '出厂日期' ,req:true,dateFormat:'Y-m-d H:i:s'},
            {name: 'REPAIR_DATE', type: 'date', label: '开单日期' ,dateFormat:'Y-m-d H:i:s',query:'rg'},
            {name: 'LEAVE_MILEAGE', type: 'int', label: '出厂里程' ,req:true},
            {name: 'STATUS', type: 'string', label: '提交状态',val:'dict|dict.'+app.utils.SysCodes.SUBMITSTATUS},
            {name: 'IS_PRINT', type: 'string', label: '打印状态' ,val:'dict|dict.'+app.utils.SysCodes.PRINTSTATUS},
            {name: 'CERT_SN', type: 'string', label: '维修记录'},
            {name: 'ADD_TIME', type: 'string', label: '开单时间'},
            {name: 'CREATED', type: 'string', label: '开单人员'},
            {name: 'REPAIR_TYPE', type: 'string', label: '维修类别',val:'dict|dict.1012'},
            {name: 'TEL_PHONE', type: 'string', label: '手机号码',req:true},
            {name: 'IS_CHANGE_PART', type: 'string', label: '是否更换配件'},
            
            {name: 'TIME_COST', type: 'float', label: '工时费用（元）'},
            {name: 'MAT_COST', type: 'float', label: '材料费用（元）'},
            {name: 'COST_SUM', type: 'float', label: '维修费用（合计）'},
            
            {name: 'NEW_PHOTO', type: 'string', label: 'NEW_PHOTO'},
            {name: 'OLD_PHOTO', type: 'string', label: 'OLD_PHOTO'},
            {name: 'REPAIR_PHOTO', type: 'string', label: 'REPAIR_PHOTO'},
            {name: 'LOGIN_FLAG', type: 'string', label: '如约爱车标志'},
            {name: 'ORDER_NO', type: 'string', label: '如约爱车单号'},
            {name: 'REMARK', type: 'string', label: '维修内容'},
            {name: 'GD_STATION', type: 'string', label: '工位'},              
            {name: 'GD_STATUS', type: 'string', label: '工单状态',val:'dict|dict.1016'}             
    ]

});
