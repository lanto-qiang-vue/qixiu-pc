Ext.define('app.view.trans.notice.TbInfoPublicView',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.TbInfoPublicView',
	itemId: 'notice.TbInfoPublicView',
	title: '查看通知',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'fit',
	width : 900,
	height:550,
	maximizable : true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'panel',
			width:900,
			autoScroll:true,
			itemId:'contentPanel'
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
	    	win.setHeight(550);
	    	win.getEl().center();
	    });
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	loadHtml : function(record){
		var me = this;
		var html = "<div class='zw_title' align='center'>" + record.data.TITLE + "</div>";
		html = html + "<div style='margin:10px 10px 5px 10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		html = html + '<table width="96%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin-bottom:10px;">' +
          '<tbody>' +
          	'<tr>' +
            '<td align="center" class="Gray12" style="white-space:nowrap;"> ' +  
            ' &nbsp;&nbsp;|&nbsp;&nbsp; 发送时间：' + Ext.Date.format(record.data.PUBLISH_TIME, 'Y-m-d H:i:s') +
            '  &nbsp;&nbsp;|&nbsp;&nbsp;  来源：' + record.data.DATA_FROM +
         ' </tr>' +
        '</tbody></table>';
        html = html + "<div style='width:98%;padding-left:15px;'>" + record.get('CONTENT') + "</div>";
        html = html + "<div style='margin:10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		me.down('#contentPanel').update(html);
	}
});
