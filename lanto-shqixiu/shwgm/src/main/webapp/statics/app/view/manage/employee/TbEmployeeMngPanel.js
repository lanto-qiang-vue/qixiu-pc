Ext.define('app.view.manage.employee.TbEmployeeMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.employee.TbEmployeeMngPanel',
	itemId: 'manage.employee.TbEmployeeMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getSearchPanel(), me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getSearchPanel : function(){
		return {
		xtype : 'form',
		itemId : 'spanel',
		region : 'north',
		bodyPadding: 5,
		title : '查询',
		split : true,
		collapsible:true,
		items :[{
			xtype:'jsf.ModelContainer',
			model : 'app.model.employee.TbEmployeeModel',
			layout:'column',
    		columns: 4,
    		defaults: {anchor: '33%'},
			labelWidth: 80,
			showType : 'search',
			items: [
					'NAME',
					'ID_NUM',
					'SEX',
					'DEGREE',
					'POST',
					'CORP_NAME',
					{	
						xtype:'combo',
						name:'CORP_AREA',
						fieldLabel : '所属辖区',
		                editable:false,
		                store:Ext.getStore("sys_belong_area"),
		                displayField: 'NAME',  
		                valueField: 'CODE',
		                queryMode: 'local'
		            },
		            {fname:'CORP_TYPE',blankItem:true},
		            {xtype: 'component'},{xtype: 'component'},{xtype: 'component'},
					{
						xtype: 'container',
						layout:{
							type: 'hbox',
							pack : 'center'
						},
						items:[{
							xtype: 'button',
							iconCls: 'icon-search bigger-120 white',
							text : '查询',
							itemId: 'searchBtn',
							margin:'0 0 0 10'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 white',
							margin:'0 0 0 10',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						}]
					}]
			}]
		};
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.employee.TbEmployeeModel',
			url : 'manage/employee/tbemployee/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},				
				{fname:'NAME',flex:1},
				{fname:'ID_NUM',flex:2},
				{fname:'SEX',flex:1},
				{fname:'CORP_NUM',flex:1},
				{fname:'CORP_NAME',	flex:3},			
				{fname:'BIRTH_DATE',flex:2},
				{fname:'DEGREE',flex:1},
				{fname:'POST',flex:2},
				{fname:'TELPHONE',flex:2},
				{fname:'ADDRESS',flex:3}
			],
			btns : [{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				text : '修改',
				itemId : 'editBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删除',
				itemId : 'deleteBtn'
			},'-',{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'cd_button'
			},'-',{
			 	xtype : 'button',
                itemId : 'exportBtn',
                iconCls: 'icon-download-alt bigger-120 blue',
                text : '导出Excel'
    		 }]
		};
	}
});
