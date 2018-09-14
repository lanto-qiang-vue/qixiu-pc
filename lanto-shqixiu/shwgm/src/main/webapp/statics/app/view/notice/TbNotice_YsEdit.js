Ext.define('app.view.notice.TbNotice_YsEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.TbNotice_YsEdit',
	itemId: 'notice.TbNotice_YsEdit',
	title: '发送通知',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 900,
	height:600,
	maximizable : true,
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
				model : 'app.model.notice.TbNoticeModel',
				defaults: {msgTarget:'side',width:700},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 90,
				btns:[],
				items: [
					{fname:'NOTICE_ID',hidden:true},
					{fname:'CLIENT_ACTOR',hidden:true},
					{fname:'NOTICE_TITLE',colspan:2,allowBlank:false},
					{
			            xtype      : 'fieldcontainer',
			            fieldLabel : '是否需要回执',
			            colspan:2,
			            width:300,
			            defaultType: 'radiofield',
			            defaults: {
			                flex: 1
			            },
			            layout: 'hbox',
			            items: [
			                {
			                    boxLabel  : '是',
			                    margin:'0 0 0 20',
			                    name      : 'IS_RESULT',
			                    allowBlank:false,
			                    inputValue: '10041001',
			                    id        : 'radio1'
			                }, {
			                    boxLabel  : '否',
			                    checked:true,
			                    allowBlank:false,
			                    name      : 'IS_RESULT',
			                    inputValue: '10041002',
			                    id        : 'radio2'
			                }
			            ]
			        },
			        {xtype:'triggerfield',name:'CLIENT_ACTOR_DISPLAY',fieldLabel:'选择企业',
						triggerCls: 'x-form-search-trigger',
		                editable:false,
		                onTriggerClick: function(e) {
		                	var me = this;
		                	var form = me.up('form').getForm();
			    			var win = Ext.create("app.view.common.Corp_YsMutSelWin",{
			    			     modal : true,
			    				 rowSelType : 'MULTI', //单选
				   				 callback:function( records ){
				   	    			//将取到的值赋给页面
									var values = [];
									var names = [];
									for(var i=0;i<records.length;i++){
										values.push(records[i].data.CORP_ID);
										names.push(records[i].data.CORP_NAME);
									}
				   	    			form.findField('CLIENT_ACTOR').setValue(values.join(','));
				   	    			me.setValue(names.join(','));
				   				}
		    				});
		    				win.show();
		    				win.loadData(form.findField('CLIENT_ACTOR').getValue(),form.findField('CLIENT_ACTOR_DISPLAY').getValue());
			    		}
					},
			        {
			        	xtype:'checkboxfield',
	                    boxLabel  : '所有企业',
	                    itemId:'allCorp',
	                    width:170,
	                    name      : 'ALL_CORP',
	                    inputValue: 'ALL_CORP',
	                    id        : 'checkbox1'
	                },
	                {xtype:'triggerfield',name:'MANAGE_ACTOR',fieldLabel:'政府端用户',
						triggerCls: 'x-form-search-trigger',
		                editable:false,
		                colspan:2,
		                onTriggerClick: function(e) {
		                	var me = this;
		                	var form = me.up('form').getForm();
			    			var win = Ext.create("app.view.common.User_YsSelWin",{
			    			     modal : true,
			    				 rowSelType : 'MULTI', //单选
				   				 callback:function( records ){
				   	    			//将取到的值赋给页面
									var values = [];
									for(var i=0;i<records.length;i++){
										values.push(records[i].data.USER_CODE);
									}
				   	    			form.findField('MANAGE_ACTOR').setValue(values.join(','));
				   				}
		    				});
		    				win.show();
		    				win.down('grid').getStore().loadPage(1);
			    		}
					}
				]
			}]
		},{
			xtype:'panel',
			region:'center',
			title:'通知内容',
			layout:'fit',
			items:[{
					xtype : 'htmleditor',
					itemId:'NOTICE_CONTENT',
					plugins: [
		        	    Ext.create('app.ux.HtmlEditorImage'),
		        	    Ext.create('app.ux.HtmlEditorAttach')
		            ],
					name : 'CONTENT',
					enableFont: true,
					fontFamilies : ["宋体", "隶书", "黑体"],
					defaultFont: '宋体'
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
						text : '暂 存'
					},'-',{
						xtype : 'button',
						itemId : 'sendBtn',
						iconCls : 'database_go_button',
						text : '发 送'
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
		me.on('restore',function(win){
	    	win.setWidth(900);
	    	win.setHeight(600);
	    	win.getEl().center();
	    });
	    me.down('[itemId=allCorp]').on('change',function(a,b,c,d){
	    	var form = me.down('form').getForm();
	    	var client = form.findField('CLIENT_ACTOR');
	    	var clientd = form.findField('CLIENT_ACTOR_DISPLAY');
	    	if(b){
	    		clientd.setReadOnly(true);
	    		client.setValue('all');
	    		clientd.setValue('all');
	    	}else{
	    		clientd.setReadOnly(false);
	    		client.setValue('');
	    		clientd.setValue('');
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
		if(record.data.CLIENT_ACTOR == 'all'){
			me.down('[itemId=allCorp]').setValue(true);
		}
		app.utils.AjaxCallbackUtil.ajaxCallbackAll("manage/notice/tbnotice/getContent",{NOTICE_ID:record.data.NOTICE_ID},function(ret){
			if( ret.success ){
				me.down('htmleditor').setValue(ret.data);
			}
		});
	}
});
