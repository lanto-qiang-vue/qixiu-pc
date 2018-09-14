Ext.define('app.view.notice.InfoPublicPublish',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.InfoPublicEdit',
	itemId: 'notice.InfoPublicPublish',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 500,
	border:false,
	height:200,
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
				model : 'app.model.notice.InfoPublic',
				//defaults: {msgTarget:'side',width:250},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		//labelWidth: 100,
				btns:[],
				items: [
					{fname:'INFO_ID',hidden:true},
					{fname:'TITLE',colspan:3,readOnly:true,width:438},
					{fname:'CREATOR',value:window.GL.name,readOnly:true},
					{fname:'DATA_FROM',value:'行业管理服务端',readOnly:true},
					{fname:'PUBLISH_STATUS'}
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
						itemId : 'publishBtn',
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
