Ext.define('app.view.manage.report.RepairReportMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.report.RepairReportMngPanel',
	itemId: 'manage.report.RepairReportMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getGridPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	/*getSearchPanel : function(){
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
			model : 'app.model.repair.PartsModel',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'PART_CODE',
					'PART_NAME',
					'PART_TYPE',
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
							margin: '0 5 0 5'
						},{
							xtype : 'button',
							text : '重置',
							itemId: 'resetBtn',
							iconCls: 'icon-reply bigger-120 white',
							margin: '0 5 0 5',
							handler:function(btn){
								btn.up('form').getForm().reset();
							}
						}]
					}
				]
			}]
		};
	},*/
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.report.RepairReport',
			url : 'manage/report/repairreport/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'AREA_NAME',flex:1},
				{fname:'ALREADY_OUT',flex:1},
				{fname:'SOON_OUT',flex:1},
				{fname:'NO_PLAN',flex:1},
				{fname:'NO_RECORD',flex:1},
				{fname:'NORMAL',flex:1},
				{fname:'VEHICLE_COUNT',flex:1}
			],
			btns : [/*{
				xtype : 'button',
				text : '新增',
				itemId : 'addBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				text : '修改',
				itemId : 'editBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteBtn'
			}*/]
		};
	}
});
