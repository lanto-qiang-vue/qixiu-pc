Ext.define('app.view.common.PagePrintWin', {
			extend : 'Ext.window.Window',
			alias : 'widget.common.PagePrintWin',
			itemId : 'common.PagePrintWin',
			autoShow : true,
			autoScroll : true,
			modal : true,
			width : 800,
			height : 550,
			fileId:'0',
			layout:'fit',
			pwidth:800,
			pheight:550,
			maximizable : true,
//			maximized : true,
			initComponent : function() {
				var me = this;
				me.items = [{
					xtype:'panel',
					html :''
				}];
				me.dockedItems = [{
					xtype : 'toolbar',
					dock : 'bottom',
					layout : {
						pack : 'end',
						type : 'hbox'
					},
					items : ['->', {
						xtype : 'button',
						itemId : 'printBtn',
						iconCls : 'print_button',
						text : '打 印',
						handler : function(btn) {
							printViewWin.window.printPage();
						}
					}, '-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
					}]
				}];
				me.callParent(arguments);
				me.on('restore',function(win){
			    	win.setWidth(me.pwidth);
			    	win.setHeight(me.pheight);
			    	win.getEl().center();
			    });
			},
			loadData : function(url){
				var me = this;
				me.down('panel').update('<iframe height="100%" width="100%" src="' + url + '" scrolling="yes" frameborder="0" id="printViewWin" name="printViewWin"></iframe>');
			}

		});
