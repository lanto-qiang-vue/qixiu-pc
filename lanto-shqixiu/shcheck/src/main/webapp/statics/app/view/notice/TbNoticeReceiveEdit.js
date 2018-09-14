Ext.define('app.view.notice.TbNoticeReceiveEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.TbNoticeReceiveEdit',
	itemId: 'notice.TbNoticeReceiveEdit',
	title: '查看通知',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'fit',
	width : 900,
	height:600,
	maximizable : true,
//	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'panel',
			width:900,
			autoScroll:true,
			itemId:'contentPanel',
			items:[{
					xtype:'form',
					items:[{xtype:'hidden',name:'NOTICE_ID'},
					{xtype:'hidden',name:'NOTICE_TITLE'}]
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
						itemId : 'resultBtn',
						iconCls : 'icon-reply bigger-120 blue',
						hidden:true,
						text : '回 执',
						handler : function(btn) {
							var win = btn.up('window');
							var form = win.down('form').getForm();
							var rewin =	Ext.create('app.view.notice.TbNoticeResult');
							rewin.show();
							rewin.loadData(form.getValues());
						}
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
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		me.down('panel').setLoading("正在加载通知内容...");
		app.utils.AjaxCallbackUtil.ajaxLoadingCallback("check/notice/tbnoticereceive/getContent",{NOTICE_ID:record.data.NOTICE_ID},me.down('panel'),function(ret){
			if( ret.success ){
				me.loadHtml(record,ret.data);
				me.down('panel').setLoading(false);
			}
		});
	},
	loadHomePageData : function(id){
		var me = this;
		me.down('panel').setLoading("正在加载通知内容...");
		app.utils.AjaxCallbackUtil.ajaxLoadingCallback("check/sys/homepage/getContent",{NOTICE_ID:id},me.down('panel'),function(ret){
			if( ret.success ){
				var record = Ext.create('app.model.notice.TbNoticeModel');
				record.set(ret.data);
				me.down('form').loadRecord(record);
				me.loadHtml(record,ret.data.content);
				me.down('panel').setLoading(false);
			}
		});
	},
	loadHtml : function(record,content){
		var me = this;
		var isResult = "无需回执";
		if(record.data.IS_RESULT == '10041001'){
			isResult = "需要回执";
			me.down('button[itemId=resultBtn]').show();
		}
		var html = "<div class='zw_title' align='center'>" + record.data.NOTICE_TITLE + "</div>";
		html = html + "<div style='margin:10px 10px 5px 10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		html = html + '<table width="96%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin-bottom:10px;">' +
          '<tbody>' +
          	'<tr>' +
            '<td align="center" class="Gray12" style="white-space:nowrap;"> 发送人：' + record.data.SEND_BY + 
            ' &nbsp;&nbsp;|&nbsp;&nbsp; 发送时间：' + Ext.Date.format(record.data.SEND_DATE, 'Y-m-d H:i:s') +
            '  &nbsp;&nbsp;|&nbsp;&nbsp;  来源：' + record.data.DATA_FROM +
            '  &nbsp;&nbsp;|&nbsp;&nbsp;' + isResult +
         ' </tr>' +
        '</tbody></table>';
        html = html + "<div style='width:98%;padding-left:15px;'>" + content + "</div>";
        html = html + "<div style='margin:10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		me.down('panel').update(html);
	}
});
