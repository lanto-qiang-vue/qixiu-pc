Ext.define('app.view.manage.corp.TbCorpVideoEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.TbCorpVideoEdit',
	itemId: 'manage.corp.TbCorpVideoEdit',
	title: '通道信息编辑',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 550,
	border:false,
	height:250,
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
				model : 'app.model.corp.TbCorpVideoModel',
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 70,
				btns:[],
				items: [
					{fname:'CORP_ID',hidden:true},
					{fname:'ID',hidden:true},
					{xtype:'triggerfield',name:'CORP_NAME',fieldLabel:'所属企业',
						triggerCls: 'x-form-search-trigger',
		                editable:false,
		                //vtype:'alphanum',
		                beforeLabelTextTpl: required,
		                allowBlank:false,
		                onTriggerClick: function(e) {
		                	var me = this;
		                	var form = me.up('form').getForm();
			    			var win = Ext.create("app.view.common.CorpSelWin",{
			    			     modal : true,
			    				 rowSelType : 'SINGLE', //单选
				   				 callback:function( records ){
				   	    			//将取到的值赋给页面
				   				 	var params = records[0].data;
				   				 	//console.log(params);
				   				 	params.USER_CODE = params.BUSINESS_NUM;
				   	    			//params.USER_NAME = params.BUSINESS_NUM;
				   	    			form.setValues(params);
				   				}
		    				});
		    				win.show();
		    				win.down('grid').getStore().loadPage(1);
			    		}
					},
					{fname:'VIDEO_NUM'},
					{fname:'VIDEO_NAME'},
					{fname:'DEVICE_SN'},
					{fname:'DEVICE_VERIFY_CODE',colspan:2},
					{fname:'HLS_URL_HD',colspan:2,width:458},
					{fname:'HLS_URL_FAST',colspan:2,width:458}
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
