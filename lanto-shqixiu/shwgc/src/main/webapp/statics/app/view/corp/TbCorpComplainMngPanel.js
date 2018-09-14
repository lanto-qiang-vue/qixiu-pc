Ext.define('app.view.corp.TbCorpComplainMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.corp.TbCorpComplainMngPanel',
	itemId: 'corp.TbCorpComplainMngPanel',
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
			model : 'app.model.corp.TbCorpComplainModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'IS_CORP_DEAL',
					'COMPLAIN_DATE',
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
			model : 'app.model.corp.TbCorpComplainModel',
			url : 'client/corp/tbcorpcomplain/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				'ORDER_NO',
				'COMPLAIN_DATE',
				'COMPLAIN_OPER',
				'CORP_NAME',
				{fname:'AREA_CODE',renderer: app.utils.FunUtils.findAreaByCode},
				'CONTACT_TEL',
				'CONTACT_TYPE',
				'COMPLAIN_CONTENT',
				'IS_ACCEPT',
				'HAPPEN_DATE',
				'ACCEPT_OPER',
				'ACCEPT_DATE',
				'IS_CORP_DEAL',
				'IS_COMPLETE',
				'COMPLETE_DATE'
			],
			btns : [{
				xtype : 'button',
				iconCls:'accept_button',
				text : '投诉处理',
				itemId : 'makeBtn'
			},'-',{
				xtype : 'button',
				iconCls:'cd_button',
				text : '查 看',
				itemId : 'viewBtn'
			}]
		};
	}
});
