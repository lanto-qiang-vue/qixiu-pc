Ext.define('app.view.corp.TbCorpVideoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.corp.TbCorpVideoMngPanel',
	itemId: 'corp.TbCorpVideoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	change:0,
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getVedioPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},
	getVedioPanel : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId:'videoPanel',
			title:'视频查看',
			region : 'center',
			html:'<iframe height="100%" width="100%" src="client/corp/tbcorpposition/video" scrolling="yes" frameborder="0" id="corpVideoFrame" name="corpVideoFrame"></iframe>',
			tbar:['-',{xtype:'button',text:'全 屏',iconCls:'arrow_out_button',handler : function(btn) {
					corpVideoFrame.window.FullScreenOn();
				}},'-',{xtype:'button',text:'停止查看',iconCls:'stop_button',handler : function(btn) {
					corpVideoFrame.window.StopVideoPreview();
				}}
//				,'-',{xtype:'button',text:'抓图(本地)',iconCls:'heditImgIcon',handler : function(btn) {
//					corpVideoFrame.window.CapturePictureLocal();
//				}},'-',{xtype:'button',text:'抓图(远程)',iconCls:'heditImgIcon',
//					handler : function(btn) {
//						corpVideoFrame.window.CapturePictureRemote();
//					}
//				},'-',{xtype:'button',text:'开始录像(本地)',iconCls:'start_button',
//					itemId:'startLocalVideo',
//					handler : function(btn) {
//						corpVideoFrame.window.StartCaptureVideoLocal();
//					}
//				},'-',{xtype:'button',text:'停止录像(本地)',iconCls:'pause_button',
//					itemId:'stopLocalVideo',
//					handler : function(btn) {
//						corpVideoFrame.window.StopCaptureVideoLocal();
//					}
//				},'-',{xtype:'button',text:'开始录像(远程)',iconCls:'start_button',
//					itemId:'startRemoteVideo',
//					handler : function(btn) {
//						corpVideoFrame.window.StartCaptureVideoRemote();
//					}
//				},'-',{xtype:'button',text:'停止录像(远程)',iconCls:'pause_button',
//					itemId:'stopRemoteVideo',
//					handler : function(btn) {
//						corpVideoFrame.window.StopCaptureVideoRemote();
//					}
//				}
				]
		};
	}
});
