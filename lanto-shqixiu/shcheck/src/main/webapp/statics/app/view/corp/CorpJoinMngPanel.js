Ext.define('app.view.corp.CorpJoinMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.corp.CorpJoinMngPanel',
	itemId: 'corp.CorpJoinMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'fit',
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
	getGridPanel : function(){
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			rowSelType : 'MULTI',
			model : 'app.model.corp.CorpJoinModel',
			url : 'client/corp/corpjoin/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'ID',flex:1,hidden:true},
				{fname:'RECORD_NO',flex:1},
				{fname:'CORP_NUM',flex:1},
				{fname:'CORP_NAME',flex:1},
				{fname:'LINK_MAN',flex:1},
				{fname:'LINK_TEL',flex:1},
				{fname:'APPLY_PERSON',flex:1},
				{fname:'APPLY_DATE',flex:1},
				{fname:'CHECK_PERSON',flex:1},
				{fname:'CHECK_DATE',flex:1},
				{fname:'STATUS',flex:1}
			],
			btns : [{
				xtype : 'button',
				text : '入网申请',
				itemId : 'applyBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				text : '修改 | 提交申请',
				itemId : 'submitBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				text : '查看资料',
				itemId : 'viewBtn',
				iconCls:'read_button'
			},'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
