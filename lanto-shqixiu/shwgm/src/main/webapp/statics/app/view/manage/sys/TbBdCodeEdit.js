Ext.define('app.view.sys.TbBdCodeEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.sys.TbBdCodeEdit',
	itemId: 'sys.TbBdCodeEdit',
	title: '参数编辑页面',
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
				model : 'app.model.sys.TbBdCodeModel',
				defaults: {msgTarget:'side',width:250},
				layout: {
            		type: 'table',
            		columns: 2
        		},
				btns:[],
				items: [
					{
						xtype : 'jsf.ModelContainer',
						model : 'app.model.sys.TbBdCodeModel',
						defaults: {msgTarget:'side'},
						width:500,
						colspan:2,
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
						btns:[],
						items: [
							{	
								xtype:'combo',
								name:'TYPE_NAME',
								fieldLabel : '类型名称',
				                editable:false,
				                width:400,
				                allowBlank:false,
				                store:Ext.getStore("sys_dict_type"),
				                displayField: 'NAME',  
				                valueField: 'TYPE_NAME',
				                vtype:'notEmpty'
				            },
				            {
				            	xtype:'button',
				            	text:'新类型',
				            	itemId:'newTypeBtn',
				            	iconCls:'new_button',
				            	handler : function(btn) {
				            		var url = "manage/sys/tbbdcode/newType";
									app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{},function(ret){
										if( ret.success ){
											var form = btn.up('form').getForm();
											form.findField('TYPE').setValue(ret.data);
											form.findField('TYPE_NAME').emptyText='输入新的类型名称';
											form.findField('TYPE_NAME').setValue('');
											form.findField('CODE_ID').setValue(ret.data + '1001');
											form.findField('NUM').setValue(1);
											form.findField('TYPE_NAME').setEditable(true);
											form.findField('TYPE_NAME').focus();
										}
									});
								}
				            }
						]
					},
					{fname:'TYPE',readOnly:true},
					{fname:'CODE_ID',readOnly:true},
					{fname:'CODE_DESC',colspan:2,width:500},
					'NUM',
					'STATUS'
				]
			},{
				xtype:'container',
				html:'<font color="red" font-size="18px">注：参数新增或修改后需要刷新浏览器或者重新登录后才能生效。</font>'
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
		var form = me.down('form').getForm();
		form.findField('TYPE_NAME').on('select',function(a,b,c){
			var val = a.getValue();
			if(!Ext.isEmpty(val) && val != '\u00a0'){
				var store = Ext.getStore('sys_dict_type');
				var record = store.findRecord('TYPE_NAME',val);
				if(record == null){
					return false;
				}
				var url = "manage/sys/tbbdcode/newCode";
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{type:record.data.CODE},function(ret){
					if( ret.success ){
						form.findField('TYPE').setValue(record.data.CODE);
						form.findField('CODE_ID').setValue(ret.data[0]);
						form.findField('NUM').setValue(ret.data[1]);
					}
				});
			}
		});
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		me.down('button[itemId=newTypeBtn]').setDisabled(true);
		me.down('form').getForm().findField('TYPE_NAME').setReadOnly(true);
	}
});
