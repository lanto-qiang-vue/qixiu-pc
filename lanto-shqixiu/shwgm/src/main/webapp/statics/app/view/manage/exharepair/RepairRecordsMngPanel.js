Ext.define('app.view.manage.exharepair.RepairRecordsMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.exharepair.RepairRecordsMngPanel',
	itemId: 'manage.exharepair.RepairRecordsMngPanel',
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
			model : 'app.model.exharepair.RepairRecordModel',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'PLATE_NUM',
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
	},
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			region : 'center',
			rowSelType : 'MULTI',
			model : 'app.model.exharepair.RepairRecordModel',
			url : 'manage/exharepair/repairrecords/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'CORP_NAME',flex:3},
				{fname:'PLATE_NUM',flex:1.2},
				{fname:'REPAIR_DATE',flex:2,format:'Y-m-d H:i:s'},
				{fname:'REPAIR_MILE',flex:1},
				{fname:'START_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'END_REPAIR_TIME',flex:2,format:'Y-m-d H:i:s'},
				{fname:'STATION_NAME',flex:1},
				{fname:'FAULT_DESCRIPT',flex:3},
				{fname:'OWNER_PHONE',hidden:true}
				//{fname:'FAULT_REASON',flex:3}
			],
			btns : [{
				xtype : 'button',
				text : '查看',
				itemId : 'editBtn',
				iconCls:'font-bold icon-edit blue'
			}]
		};
	}
});
