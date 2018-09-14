Ext.define('app.view.service.OrderServiceMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.service.OrderServiceMngPanel',
	itemId: 'service.OrderServiceMngPanel',
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
			model : 'app.model.service.OrderServiceModel',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'CONTACT_PERSON',
					'CONTACT_PHONE',
					'STATUS',
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
			model : 'app.model.service.OrderServiceModel',
			url : 'service/orderservice/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'STATUS',flex:1},
				{fname:'SERVICE_TIME',flex:1},
				{fname:'SERVICE_CONTENT',flex:1},
				{fname:'CONTACT_PERSON',flex:1},
				{fname:'CONTACT_PHONE',flex:1},
				{fname:'BACK_INFO',flex:3}
			],
			btns : [{
				xtype : 'button',
				text : '确认',
				itemId : 'editBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
