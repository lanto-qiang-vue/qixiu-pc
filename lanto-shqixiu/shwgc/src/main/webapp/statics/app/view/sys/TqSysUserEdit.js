Ext.define('app.view.sys.TqSysUserEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.sys.TqSysUserEdit',
	itemId: 'sys.TqSysUserEdit',
	title: '编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 600,
	height:350,
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
				model : 'app.model.sys.TqSysUserModel',
				layout:'column',
				columns:2,
				btns:[],
				items: [
					{fname:'USER_ID',hidden:true},
					{fname:'USER_CODE',vtype:'alphanum'},
					'USER_NAME',
					'USER_SEX',
					'USER_TYPE',
					'TELPHONE',
					'POSITION',
					{
		        	 xtype:'combo',
		        	 name:'ROLE_ID',
		        	 fieldLabel:'<font color="red"><sub><b> *</b></sub></font>角色选择',
		        	 allowBlank:false,
		        	 store:{
		        		 fields:['ROLE_ID','ROLE_NAME'],
		        		 proxy:{
		        			url:'client/sys/tqsysuser/getRoleInfo',
		        			type:'ajax',
		        			reader:{
		        				type:'json',
		        				root:'data'
		        			}
		        		 },
		        		 autoLoad:true
		        	 },
		        	 displayField:'ROLE_NAME',
	 			     valueField:'ROLE_ID'
		         	},
		         	'IS_VALID'
				]
			},{
				xtype: 'container',
				html:'<font color="red">注：新增用户初始密码为：123456 , 企业管理员帐号不能修改角色,如企业操作员(系统角色)不满足企业需求，请在【系统管理】-->【角色管理】中添加自己需要的角色。</font>'
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
		if(record.data.ROLE_ID == 1){
			me.down('form').getForm().findField('ROLE_ID').hide();
			me.down('form').getForm().findField('IS_VALID').setReadOnly(true);
		}
		me.down('form').loadRecord(record);
		me.down('form').getForm().findField('USER_CODE').setReadOnly(true);
	}
});
