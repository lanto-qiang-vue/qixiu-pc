Ext.define('app.view.manage.publicservice.ComplaintAccept',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.publicservice.ComplaintAccept',
	itemId: 'manage.publicservice.ComplaintAccept',
	title: '投诉受理',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 510,
	border:false,
	height:450,
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
				model : 'app.model.manage.publicservice.Complaint',
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		//labelWidth: 100,
				btns:[],
				items: [
					{fname:'COMPLAINT_ID',hidden:true},
					{fname:'TITLE',colspan:3,readOnly:true,width:438},
					{fname:'UNIT_NAME',colspan:3,readOnly:true,width:438},
					{fname:'NAME',readOnly:true},
					{fname:'INVOLVE_CAR',readOnly:true},
					{fname:'TYPE',readOnly:true},
					{fname:'ADD_TIME',readOnly:true},
					{fname:'LINK_TEL',readOnly:true},
					{fname:'ID_NUM',readOnly:true},
					{
						xtype     : 'textareafield',
						colspan:3,
				        readOnly:true,
				        height:150,
				        width:438,
				        name      : 'CONTENT',
				        fieldLabel: '投诉内容',
				        anchor    : '100%'
					},
					{fname:'ACCEPT_PERSON',colspan:3,width:438}
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
						itemId : 'acceptBtn',
						iconCls : 'icon-save blue',
						text : '受 理'
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
		record.set('ACCEPT_PERSON',window.GL.name);		//将受理人默认为当前用户
		me.down('form').loadRecord(record);
	}
});
