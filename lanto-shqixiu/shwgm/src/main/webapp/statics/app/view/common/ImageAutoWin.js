Ext.define('app.view.common.ImageAutoWin', {
			extend : 'Ext.window.Window',
			alias : 'widget.common.ImageAutoWin',
			itemId : 'common.ImageAutoWin',
			autoShow : true,
			autoScroll : true,
			modal : true,
			width : 800,
			height : 550,
			fileId:'0',
			maximizable : true,
//			maximized : true,


			initComponent : function() {
				var me = this;
				me.items =[{
								xtype : 'image',
								id:'boximage',
								margin:5,
			                	itemId : 'imageItemId'
							}];
				me.callParent(arguments);
				me.on('restore',function(win){
			    	win.setWidth(800);
			    	win.setHeight(550);
			    	win.getEl().center();
			    });
			}

		});
