Ext.define('app.view.manage.sys.TtSysUserSetStatus',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.sys.TtSysUserSetStatus',
	itemId: 'manage.sys.TtSysUserSetStatus',
	title: '编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 600,
	height:250,
	//autoScroll:true,
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
				labelWidth: 80,
				btns:[],
				items: [
					{fname:'USER_ID',hidden:true},
					{fname:'CORP_ID',hidden:true},
					{xtype:'triggerfield',name:'CORP_NAME',fieldLabel:'企业',
						triggerCls: 'x-form-search-trigger',
		                editable:false,
		                beforeLabelTextTpl: required,
		                allowBlank:false,
		                readOnly:true,
		                onTriggerClick: function(e) {
		                	var me = this;
		                	var form = me.up('form').getForm();
			    			var win = Ext.create("app.view.common.TransCorpSelWin",{
			    			     modal : true,
			    				 rowSelType : 'SINGLE', //单选
				   				 callback:function( records ){
				   	    			//将取到的值赋给页面
				   				 	var params = records[0].data;
				   				 	//console.log(params);
				   				 	params.USER_CODE = params.BUSINESS_NUM;
				   	    			params.CORP_ID = params.CORP_ID;
				   	    			form.setValues(params);
				   				}
		    				});
		    				win.show();
		    				win.down('grid').getStore().loadPage(1);
			    		}
					},
					{fname:'USER_CODE',readOnly:true},
					{fname:'USER_NAME',readOnly:true},
					{fname:'USER_SEX',readOnly:true},
					{fname:'USER_TYPE',readOnly:true},
					{fname:'TELPHONE',readOnly:true},
					{fname:'POSITION',readOnly:true},
		         	'IS_VALID'
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
		me.down('form').getForm().findField('USER_CODE').setReadOnly(true);
	}
});
