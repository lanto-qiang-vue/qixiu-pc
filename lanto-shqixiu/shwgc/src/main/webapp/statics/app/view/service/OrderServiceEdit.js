Ext.define('app.view.service.OrderServiceEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.service.OrderServiceEdit',
	itemId: 'service.OrderServiceEdit',
	title: '服务确认',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 510,
	border:false,
	height:520,
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
				model : 'app.model.service.OrderServiceModel',
				layout: {
            		type: 'table',
            		columns: 1
        		},
        		//labelWidth: 100,
				btns:[],
				items: [
					{fname:'SERVICE_ID',hidden:true},
					{fname:'SERVICE_TIME',readOnly:true,width:438},
					{
						xtype     : 'textareafield',
						//colspan:3,
						readOnly:true,
				        readOnly:true,
				        height:100,
				        width:438,
				        name      : 'SERVICE_CONTENT',
				        fieldLabel: '服务内容',
				        anchor    : '100%'
					},
					{fname:'CONTACT_PERSON',readOnly:true,width:438},
					{fname:'CONTACT_PHONE',readOnly:true,width:438},
					{fname:'STATUS',width:438},
					{
						xtype     : 'textareafield',
						//colspan:3,
				        height:100,
				        width:438,
				        name      : 'BACK_INFO',
				        fieldLabel: '反馈信息',
				        anchor    : '100%'
					}
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
						text : '确 认'
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
		//record.set('END_PERSON',window.GL.name);		//将受理人默认为当前用户
		me.down('form').loadRecord(record);
	}
});
