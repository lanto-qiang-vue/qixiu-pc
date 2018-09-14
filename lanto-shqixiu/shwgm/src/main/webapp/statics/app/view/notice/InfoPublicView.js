Ext.define('app.view.notice.InfoPublicView',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.InfoPublicView',
	itemId: 'notice.InfoPublicView',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'fit',
	width : 800,
	height:550,
	maximizable : true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'panel',
			width:800,
			autoScroll:true,
			itemId:'contentPanel'
		}],
		me.dockedItems = [{
					xtype : 'toolbar',
					dock : 'bottom',
					layout : {
						pack : 'end',
						type : 'hbox'
					},
					items : ['->',  {
								xtype : 'button',
								itemId : 'closeBtn',
								iconCls : 'icon-off red',
								text : '关 闭',
								handler : function(btn) {
									btn.up('window').close();
								}
							}]
				}];
		me.callParent(arguments);
		me.on('restore',function(win){
	    	win.setWidth(800);
	    	win.setHeight(550);
	    	win.getEl().center();
	    });
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		/*var me = this;
		me.down('panel').setLoading("正在加载内容...");
		app.utils.AjaxCallbackUtil.ajaxLoadingCallback("manage/notice/infopublic/getContent",{INFO_ID:record.data.INFO_ID},me.down('panel'),function(ret){
			if( ret.success ){
				me.loadHtml(record,ret.data);
				me.down('panel').setLoading(false);
			}
		});*/
		var me = this;
		me.down('panel').setLoading("正在加载内容...");
		//me.down('form').loadRecord(record);
		me.loadHtml(record);
		me.down('panel').setLoading(false);
	},
	loadHtml : function(record){
		var me = this;
		var html = "<div class='zw_title' align='center'>" + record.data.TITLE + "</div>";
		html = html + "<div style='margin:10px 10px 5px 10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		html = html + '<table width="96%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin-bottom:10px;">' +
          '<tbody>' +
          	'<tr>' +
            '<td align="center" class="Gray12" style="white-space:nowrap;"> 发布人：' + record.data.CREATOR + 
            ' &nbsp;&nbsp;|&nbsp;&nbsp; 发布时间：' + Ext.Date.format(record.data.CREATE_TIME, 'Y-m-d H:i:s') +
            '  &nbsp;&nbsp;|&nbsp;&nbsp;  类型：' + app.utils.FunUtils.renderer(record.data.INFO_TYPE) +
            '  &nbsp;&nbsp;|&nbsp;&nbsp;  来源：' + record.data.DATA_FROM +
         ' </tr>' +
        '</tbody></table>';
        html = html + "<div style='width:98%;padding-left:15px;'>" + record.data.CONTENT + "</div>";
        html = html + "<div style='margin:10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		me.down('panel').update(html);
	}
});
