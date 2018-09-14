Ext.define('app.view.notice.SummaryMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.notice.SummaryMngPanel',
	itemId: 'notice.SummaryMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'panel',
			layout : 'fit',
			region:'center',
			border:false,
			items : [{
				xtype : 'htmleditor',
				itemId : 'INFO_CONTENT',
				enableSourceEdit : false,
				plugins : [Ext.create('app.ux.HtmlEditorImage'),
						Ext.create('app.ux.HtmlEditorAttach')],
				name : 'CONTENT',
				fontFamilies : ["宋体", "隶书", "黑体"]
			}]
		}],
		me.dockedItems = [{
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->', {
				xtype : 'button',
				itemId : 'saveBtn',
				iconCls : 'icon-save blue',
				text : '保 存'
			}]
		}];
		me.callParent(arguments);
	}
});
