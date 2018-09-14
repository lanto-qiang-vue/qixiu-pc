Ext.define('app.view.common.OfficeWin', {
			extend : 'Ext.window.Window',
			alias : 'widget.common.OfficeWin',
			itemId : 'common.OfficeWin',
			autoShow : true,
			autoScroll : true,
			modal : true,
			width : 700,
			height : 500,
			fileId:'0',
			layout:'fit',
			maximizable : true,
//			maximized : true,
			initComponent : function() {
				var me = this;
				me.items = [{
					xtype:'form',
					html :''
				}];
				me.callParent(arguments);
				me.on('restore',function(win){
			    	win.setWidth(700);
			    	win.setHeight(500);
			    	win.getEl().center();
			    });
			    me.on('close',function(win){
			    	me.down('form').setLoading(false);
			    });
			    
			},
			loadData : function(fileId){
				var me = this;
				var mark = me.down('form').setLoading('正在转化成静态页面，请稍候...');
				var url = 'manage/common/fileUpload/viewOffice';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{fileId:fileId},function(ret){
					if( ret.success ){
						me.down('form').update('<iframe height="100%" width="100%" src="/attach/' + ret.data + '" scrolling="yes" frameborder="0" id="office_win"></iframe>');
					}
					me.down('form').setLoading(false);
				});
			}

		});
