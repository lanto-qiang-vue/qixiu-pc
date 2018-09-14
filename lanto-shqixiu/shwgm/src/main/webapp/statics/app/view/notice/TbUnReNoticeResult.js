Ext.define('app.view.notice.TbUnReNoticeResult',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.TbUnReNoticeResult',
	itemId: 'notice.TbUnReNoticeResult',
	title: '通知回执',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 500,
	height:400,
	maximizable : true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			title:'回执内容',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{xtype:'hidden',name:'NOTICE_ID'},
				{xtype:'textarea',emptyText:'请输入回执内容',name:'RESULT_CONTENT',vtype:'notEmpty',allowBlank:false,maxLength:300,minLength:5}
			]
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
						iconCls : 'save_button',
						text : '确 定',
						handler : function(btn) {
							if(!me.isValid()){
								return false;
							}
							var form = me.down('form').getForm();
							var data = form.getValues();
							var params = {
								data : Ext.JSON.encode(data)
							};
							Ext.MessageBox.confirm('系统提示','确认回执吗？',function(flag){
								if(flag=='yes'){
									var url = 'manage/notice/tbnoticereceive/saveResult';
									app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
										if( ret.success ){
											me.callBack();
											me.close();
											Ext.Msg.alert('系统提示','回执成功！');
										}
									});
								}
							});
						}
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
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
		me.down('form').getForm().setValues(record);
	}
});
