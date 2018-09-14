Ext.define('app.view.repair.RepairGeneManageMngPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.repair.RepairGeneManageMngPanel',
    itemId:'repair.RepairGeneManageMngPanel',
    requires:['jsf.grid.ModelGrid'],

    autoShow: true,
    closable: true,
    layout: 'border',
    bodyPadding: 5,

    initComponent: function () {
        //加载查询框和gird框 需要在
        var me = this;
        me.items= [ me.getSearchPanel(), me.getGridPanel()];
        me.callParent(arguments); //需要初始化
    },

    getSearchPanel: function () {
        return {
            xtype: 'form',
            itemId: 'spanel',
            region: 'north',
            title:'查询条件',
            bodyPadding: 5,
            split: true,
            collapsible: true,
            items: [
                {
                    xtype: 'jsf.ModelContainer',
                    model: 'app.model.repair.RepairGeneManageModel',
                    columns: 5,
                    labelWidth: 80,
                    border:0,
                    showType : 'search',
                    layout:'column',
					columns:4,
                    items: ['DELEGATE_NAME', 'PLATE_NUM','REPAIR_DATE','BILL_CODE','CERT_SN',{fname:'STATUS',blankItem:true},//{fname:'IS_PRINT',blankItem:true},
                    	{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'center'
						},
						items:[{
							xtype: 'button',
							iconCls: 'icon-search bigger-120 blue',
							text : '查询',
							itemId: 'searchBtn',
							margin:'0 0 0 10'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 blue',
							margin:'0 0 0 10',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						}]
					}]
                }
            ]
        };
    },

    getGridPanel: function () {
        return {
            xtype: 'jsf.ModelGrid',
            itemId: 'gpanel',
            region: 'center',
            rowSelType : 'MULTI',
            model: 'app.model.repair.RepairGeneManageModel',
            url: 'client/repair/gene/list',
            columns: [
                {text:'序号',xtype:'rownumberer'},
                {fname:'REPAIR_TYPE'},
                {fname:'BILL_CODE',width:120},
                {fname:'STATUS'},
//                'IS_PRINT',
                'CERT_SN',
                {fname:'CORP_NAME'},
                {fname:'DELEGATE_NAME'},
                {fname:'PLATE_NUM' },
                'PLATE_COLOR',
                'VEHICLE_TYPE',
                'VEHICLE_NATURE',
                'LEAVE_DATE',
                'LEAVE_MILEAGE',
                'TEL_PHONE',
//                'TIME_COST',
//                'MAT_COST',
//                'COST_SUM',
                'CREATED',
                'INSPECTOR_NAME',	//显示的是姓名
//                'GD_STATUS',
                {fname:'ADD_TIME',width:140},
                 'CHECK_DJ',
                 'JCZ',
                 'CREATE_DATE',                 
                {fname:'ENGINE_NUM',hidden:true},
                {fname:'CHASSIS_NUM',hidden:true}
//                ,{
//  			    	fname:'操作',
//  			    	width:120,
//  			    	xtype:'actiontextcolumn',
//  			    	items : [{
//								text : '[修改]',
//								isShow : true,
//								handler : this.showModifyUI
//							},{
//								text : '[删除]',
//								isShow : true,
//								handler : this.del
//							}]
//			    }
            ],
	            btns:[
	                     {
		    	                xtype : 'button',
		    	                itemId : 'openBtn',
		    	                iconCls: 'add_button',
		    	                text : '开具维修记录'
	            		 },'-',
	            		 {
		    	                xtype : 'button',
		    	                itemId : 'editBtn',
		    	                iconCls: 'edit_button',
		    	                disabled:true,
		    	                text : '修改维修记录'
	            		 },'-',
	            		 {
		    	                xtype : 'button',
		    	                itemId : 'deleteBtn',
		    	                iconCls: 'delete_button',
		    	                disabled:true,
		    	                text : '删除维修记录'
	            		 },'-',
	            		 {
		    	                xtype : 'button',
		    	                itemId : 'viewBtn',
		    	                iconCls: 'cd_button',
		    	                text : '查看维修记录'
	            		 },'-',
	            		 {
		    	                xtype : 'button',
		    	                itemId : 'submitBtn',
		    	                iconCls: 'accept_button',
		    	                disabled:true,
		    	                text : '提交维修记录'
	            		 },'-',
	            		 {
		    	                xtype : 'button',
		    	                itemId : 'cancelSubBtn',
		    	                iconCls: 'stop_button',
		    	                disabled:true,
		    	                text : '取消提交'
	            		 },'-',
//	            		 {
//		    	                xtype : 'button',
//		    	                itemId : 'printViewBtn',
//		    	                iconCls: 'print_button',
//		    	                text : '预览维修记录'
//	            		 },'-',
//	            		 {
//		    	                xtype : 'button',
//		    	                itemId : 'printBtn',
//		    	                iconCls: 'print_button',
//		    	                disabled:true,
//		    	                text : '打印维修记录'
//	            		 },'-',
	            		 {
	            			 	xtype : 'button',
		    	                itemId : 'stopBtn',
		    	                iconCls: 'no_button',
		    	                disabled:true,
		    	                text : '作废维修记录'
	            		 },'-',
	            		 {
	            			 	xtype : 'button',
		    	                itemId : 'exportBtn',
		    	                iconCls: 'icon-download-alt bigger-120 blue',
		    	                text : '导出维修记录'
	            		 },'-',{
								xtype: 'button',
								iconCls: 'print_button',
								text : '合格证打印',
								itemId: 'printBtn',
			 					menu: [{
	            			         text:'打印正面',
	            				     type:'zb'
	            				     //iconCls:'print_button'
	        				       },{
	            					 text:'打印背面',
	            				     type:'fb'
	           					     //iconCls:'print_button'
	       			               }]
		}]	
        };
    }
});