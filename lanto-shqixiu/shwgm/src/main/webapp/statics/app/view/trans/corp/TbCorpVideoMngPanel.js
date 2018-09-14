Ext.define('app.view.trans.corp.TbCorpVideoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.trans.corp.TbCorpVideoMngPanel',
	itemId: 'trans.corp.TbCorpVideoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	change:0,
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [ me.getSearchPanel(), me.getVedioPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getSearchPanel : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId : 'sgpanel',
			title:'根据条件查看正在维修的车辆',
			region : 'west',
			layout:'border',
			split : true,
			width:350,
			collapsible:true,
			items:[{
					xtype : 'form',
					itemId : 'spanel',
					region : 'north',
					bodyPadding: 5,
					items :[{
						xtype:'jsf.ModelContainer',
						model : 'app.model.corp.TbCorpVideoModel',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
						labelWidth: 60,
						showType : 'search',
						items: [
								{xtype:'textfield',fieldLabel : '车牌号码',name:'PLATE_NUM',colspan:2,width:300},

					            {
									xtype: 'container',
									width:190,
									layout:{
										type: 'hbox',
										pack : 'start'
									},
									items:[{
										xtype: 'button',
										iconCls: 'icon-search bigger-120 blue',
										text : '查询',
										itemId: 'searchBtn',
										margin:5
									},{
										xtype : 'button',
										text : '重置',
										itemId: 'resetBtn',
										iconCls: 'icon-reply bigger-120 blue',
										margin: 5,
										handler:function(btn){
											btn.up('form').getForm().reset();
										}
									}]
								}
							]
						}]
					},{
						xtype : 'jsf.ModelGrid',
						itemId : 'gpanel',
						region : 'center',
						rowSelType : false,
						model : 'app.model.corp.TbCorpVideoModel',
						url : 'trans/transcorp/tccorpinfo/videoList',
						columns : [
							{text:'序号',xtype:'rownumberer'},
							{fname:'PLATE_NUM',width:100},
							{fname:'PLATE_COLOR',width:100},						  
							{fname:'VEHICLE_TYPE',width:100}
						],
						btns : []
					}]
		};
	},
	getVedioPanel : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId:'videoPanel',
			title:'视频查看',
			region : 'center',
			html:'<iframe height="100%" width="100%" src="trans/corp/tbcorpposition/video" scrolling="yes" frameborder="0" id="corpVideoFrame" name="corpVideoFrame"></iframe>',
			tbar:['-',{xtype:'button',text:'全 屏',iconCls:'arrow_out_button',handler : function(btn) {
					corpVideoFrame.window.FullScreenOn();
				}},'-',{xtype:'button',text:'停止查看',iconCls:'stop_button',handler : function(btn) {
					corpVideoFrame.window.StopVideoPreview();
				}},'-',{xtype:'button',text:'抓图(本地)',iconCls:'heditImgIcon',handler : function(btn) {
					corpVideoFrame.window.CapturePictureLocal();
				}},'-',{xtype:'button',text:'抓图(远程)',iconCls:'heditImgIcon',
					handler : function(btn) {
						corpVideoFrame.window.CapturePictureRemote();
					}
				},'-',{xtype:'button',text:'开始录像(本地)',iconCls:'start_button',
					itemId:'startLocalVideo',
					handler : function(btn) {
						corpVideoFrame.window.StartCaptureVideoLocal();
					}
				},'-',{xtype:'button',text:'停止录像(本地)',iconCls:'pause_button',
					itemId:'stopLocalVideo',
					handler : function(btn) {
						corpVideoFrame.window.StopCaptureVideoLocal();
					}
				},'-',{xtype:'button',text:'开始录像(远程)',iconCls:'start_button',
					itemId:'startRemoteVideo',
					handler : function(btn) {
						corpVideoFrame.window.StartCaptureVideoRemote();
					}
				},'-',{xtype:'button',text:'停止录像(远程)',iconCls:'pause_button',
					itemId:'stopRemoteVideo',
					handler : function(btn) {
						corpVideoFrame.window.StopCaptureVideoRemote();
					}
				}]
		};
	}
});
