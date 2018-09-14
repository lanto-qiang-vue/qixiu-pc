Ext.define('app.view.manage.publicservice.QuestionsPublish',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.publicservice.QuestionsPublish',
	itemId: 'manage.publicservice.QuestionsPublish',
	title: '问卷调查发布',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 500,
	border:false,
	height:330,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 15,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.manage.publicservice.Questions',
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		//labelWidth: 100,
				btns:[],
				items: [
					{fname:'QUES_ID',hidden:true},
					{fname:'TITLE',colspan:3,width:438,readOnly:true},
					{
						xtype     : 'textareafield',
						colspan:3,
				        height:150,
				        readOnly:true,
				        width:438,
				        name      : 'CONTENT',
				        fieldLabel: '调查描述',
				        anchor    : '100%'
					},
					{fname:'STATUS',colspan:3,width:438}
				]
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'icon-save blue',
						text : '保 存'
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-off red',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
	}
});
