Ext.define('app.view.manage.publicservice.ComplaintMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.publicservice.ComplaintMngPanel',
	itemId: 'manage.publicservice.ComplaintMngPanel',
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
			model : 'app.model.manage.publicservice.Complaint',
			layout:'column',
			columns:5,
			labelWidth: 70,
			showType : 'search',
			items: [
					'TITLE',
					'NAME',
					'TYPE',
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
			model : 'app.model.manage.publicservice.Complaint',
			url : 'manage/publicservice/complaint/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'STATUS',width:80},
				{fname:'TITLE',width:200},
				{fname:'NAME',width:100},
				{fname:'ID_NUM',width:170},
				{fname:'UNIT_NAME',width:150},
				{fname:'INVOLVE_CAR',width:100},
				{fname:'LINK_TEL',width:120},
				{fname:'LINK_ADDR',width:150},
				{fname:'EMAIL',width:100},
				{fname:'TYPE',width:80},
				{fname:'QUEST_TYPE',width:80},
				{fname:'CONTENT',width:200},
				{fname:'ADD_TIME',width:150,format:'Y-m-d H:i:s',width:150},
				{fname:'ACCEPT_PERSON',width:80},
				{fname:'ACCEPT_TIME',width:150,format:'Y-m-d H:i:s'},
				{fname:'END_PERSON',width:80},
				{fname:'END_TIME',width:150,format:'Y-m-d H:i:s'},
				{fname:'END_CONTENT',width:200}
			],
			btns : [{
				xtype : 'button',
				text : '受理',
				itemId : 'acceptBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				text : '办结',
				itemId : 'endBtn',
				iconCls:'font-bold icon-edit blue'
			},'-',{
				xtype : 'button',
				text : '查看',
				itemId : 'viewBtn',
				iconCls:'font-bold cd_button blue'
			},'-',{
				xtype : 'button',
				iconCls:'icon-remove-sign red font-bold',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
