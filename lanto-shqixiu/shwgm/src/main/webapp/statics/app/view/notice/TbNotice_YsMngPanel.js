Ext.define('app.view.notice.TbNotice_YsMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.notice.TbNotice_YsMngPanel',
	itemId: 'notice.TbNotice_YsMngPanel',
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
			model : 'app.model.notice.TbNoticeModel',
			layout:'column',
			columns:4,
			labelWidth: 80,
			showType : 'search',
			items: [
					'NOTICE_TITLE',
					'SEND_DATE',
					'SEND_BY',
					'IS_RESULT',
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
			emptyText:'<div align="center" width="100%" style="margin-top:50px;"><img src="images/blank.png"></div>',
			model : 'app.model.notice.TbNoticeModel',
			url : 'manage/notice/tbnotice/list_ys',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'NOTICE_TITLE',width:370},
				'SEND_DATE',
				'SEND_BY',
				'DATA_FROM',
				'CREATE_DATE',
				'IS_RESULT',
				'STATUS'
			],
			btns : [{
				xtype : 'button',
				text : '新建通知',
				itemId : 'addBtn',
				iconCls:'add_button'
			},'-',{
				xtype : 'button',
				text : '发送通知',
				itemId : 'sendBtn',
				iconCls:'edit_button'
			},'-',{
				xtype : 'button',
				text : '查看回执',
				itemId : 'viewResultBtn',
				iconCls:'cd_button'
			},'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删除',
				itemId : 'deleteBtn'
			}]
		};
	}
});
