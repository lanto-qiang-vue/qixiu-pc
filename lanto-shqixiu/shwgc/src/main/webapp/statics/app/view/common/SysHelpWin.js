Ext.define('app.view.common.SysHelpWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.SysHelpWin',
    itemId : 'common.SysHelpWin',
    height: 580,
    width: 800,
    cls:'noIconTree',
    title:'系统帮助文档',
    autoShow : true,
    iconCls:'help_button',
    modal : true,
    maximizable : true,
    layout : 'border',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                	xtype : 'treepanel',
          			itemId : 'dpanel',
          			rootVisible : true,
					useArrows : true,
					title:'功能列表',
					frame : true,
					multiSelect: true,
          			region : 'west',
          			width : 220,
          			bodyPadding: 2,
          			split : true
                },
                {
                	xtype:'panel',
                	region : 'center',
                	autoScroll:true,
                	itemId:'htmlPanel',
                	tbar:['->',{
                		xtype:'button',
                		iconCls:'edit_button',
                		itemId:'editBtn',
                		hidden:window['GL'].userCode == '1'?false:true,
                		text:'修 改',
                		handler : function(btn){
							var win = btn.up('window');
							var form = win.down('form');
							var panel = win.down('panel[itemId=htmlPanel]');
							panel.hide();
							form.show();
						}
                	},'-',{
                		xtype:'button',
                		iconCls:'close_button',
                		itemId:'closeBtn',
                		text:'退 出',
                		handler : function(btn){
							btn.up('window').close();
						}
                	}]
                },
                {
                	xtype:'form',
                	hidden:true,
                	region : 'center',
                	layout:'fit',
                	items:[
                			{xtype:'hidden',name:'funcId'},
                			{xtype:'hidden',name:'funcName'},
                			{
									xtype : 'htmleditor',
									itemId:'helpContent',
									plugins: [
						        	    Ext.create('app.ux.HtmlEditorImage'),
						        	    Ext.create('app.ux.HtmlEditorAttach')
						            ],
									name : 'CONTENT'	
							}
                	],
                	tbar:['->',{
                		xtype:'button',
                		iconCls:'save_button',
                		itemId:'saveBtn',
                		text:'保 存',
                		handler : function(btn){
							var win = btn.up('window');
							var form = win.down('form');
							var panel = win.down('panel[itemId=htmlPanel]');
							var data = form.getForm().getValues();
							var params = {
								data : Ext.JSON.encode(data)
							};			
							Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
								if(flag=='yes'){
									var url = 'client/sys/help/save';
									app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
										if( ret.success ){
											panel.show();
											form.hide();
											var title = data.funcName;
											win.loadHtml(title,data.CONTENT,panel);
											Ext.Msg.alert('系统提示','保存成功！');
										}
									});
								}
							});
							
						}
                	},'-',{
                		xtype:'button',
                		iconCls:'close_button',
                		itemId:'cancelBtn',
                		text:'取 消',
                		handler : function(btn){
							var win = btn.up('window');
							var form = win.down('form');
							var panel = win.down('panel[itemId=htmlPanel]');
							panel.show();
							form.hide();
						}
                	},'-',{
                		xtype:'button',
                		iconCls:'close_button',
                		itemId:'closeBtn',
                		text:'退 出',
                		handler : function(btn){
							btn.up('window').close();
						}
                	}]
                }
            ]
        });
        me.callParent(arguments); //需要初始化
        me.down('treepanel').on('select',function(cob, record, index, e, eOpts){
        	var form = me.down('form');
        	var panel = me.down('panel[itemId=htmlPanel]');
        	if(record.raw.funcId == '10'){
        		record.raw.funcName = '关于软件';
        	}
        	form.getForm().findField('funcId').setValue(record.raw.funcId);
        	form.getForm().findField('funcName').setValue(record.raw.funcName);
        	app.utils.AjaxCallbackUtil.ajaxCallbackAll("client/sys/help/getContent",record.raw,function(ret){
				if( ret.success ){
					me.down('htmleditor').setValue(ret.data);
					var title = record.raw.funcName;
		        	me.loadHtml(title,ret.data,panel);
				}
        	});
		});
        	
		me.on('restore',function(win){
	    	win.setWidth(800);
	    	win.setHeight(580);
	    	win.getEl().center();
	    });
        try {
            
        } catch (err) {
            if(console)    console.error(err);
        }
    },
    loadHtml:function(title,content,panel){
    	var html = '<div style="padding:10px;"><span id="maintext">' +
		        			'<h1 style="border-bottom:1px #000 dotted;font-size:16px;font-weight:800;">' + title + '</h1></span>';
    	html = html + content;
    	html = html + '</div>';
    	panel.update(html);
    },
    loadData : function(){
    	var me = this;
    	var tree = me.down('treepanel');
    	app.utils.AjaxCallbackUtil.ajaxCallbackAll("client/sys/common/getMenus",null,function(ret){
			if( ret.success ){
				var root = {icon : null,funcName : '帮助文档',text : '帮助文档',funcId:10};
				root.children = ret.data;
				if(!Ext.isEmpty(root) && !Ext.isEmpty(root.children) && root.children.length>0) {
					for(var i=0;i<root.children.length;i++){
						var d = root.children[i];
						if(d.funcType == 1){
							d.leaf = true;
						}
						d.icon = null;
						d.text = '<i class="' + d.iconFont + ' bigger-130 blue"></i> ' + d.funcName;
//						for(var j =0 ;j<root.children[i].children.length;j++){
//							root.children[i].children[j].text = '<i class="' + root.children[i].children[j].iconFont + ' bigger-130 blue"></i> ' +
//							root.children[i].children[j].text;
//						}
					}
				}
				tree.setRootNode(root);
				tree.expandNode(tree.getRootNode());
				tree.getSelectionModel().select(0);
			}
		});
    }
});
