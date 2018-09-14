Ext.define('app.view.manage.sys.TmSysOperateLogMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.sys.TmSysOperateLogMngPanel',
	itemId: 'manage.sys.TmSysOperateLogMngPanel',
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
			model : 'app.model.sys.TmSysOperateLogModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'MACHINE_ID',
					'MODULE_NAME',
					'OPERATE_TIMERG',
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
			model : 'app.model.sys.TmSysOperateLogModel',
			url : 'manage/sys/tmsysoperatelog/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'OPERATOR_ID',
				{fname:'MACHINE_ID',width:150},
				{fname:'MODULE_NAME',width:200},
				{fname:'OPERATE_TIME',width:140},
				{fname:'OPERATE_CONTENT',width:450}
			],
			btns : []
		};
	}
});
