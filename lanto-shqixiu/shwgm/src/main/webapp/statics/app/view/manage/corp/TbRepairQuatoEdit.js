Ext.define('app.view.manage.corp.TbRepairQuatoEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.TbRepairQuatoEdit',
	itemId: 'manage.corp.TbRepairQuatoEdit',
	title: '编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 600,
	height:250,
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.corp.TbCorpQuatoModel',
				layout:'column',
				columns:2,
				labelWidth: 100,
				btns:[],
				items: [
					{fname:'ID',hidden:true},
					{fname:'CORP_ID',hidden:true},
					'CREATE_QUATO',
					'UPLOAD_QUATO',
					'SEARCH_QUATO'
				]
			}/*,{
				xtype: 'container',
				html:'<font color="red">注：只能添加企业端管理员用户，以道路经营许可证号作为用户帐号，初始密码为：123456</font>'
			}*/]
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
						text : '保 存'
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
		me.down('form').loadRecord(record);
	},
	loadAddData : function(corpId){
		var me = this;
		me.down('form').getForm().findField('CORP_ID').setValue(corpId);
	}
});
