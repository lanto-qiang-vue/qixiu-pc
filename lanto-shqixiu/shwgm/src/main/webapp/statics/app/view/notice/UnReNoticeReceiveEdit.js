Ext.define('app.view.notice.UnReNoticeReceiveEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.notice.UnReNoticeReceiveEdit',
	itemId: 'notice.UnReNoticeReceiveEdit',
	title: '您有需要回执的通知，请回执后再进行其它操作！',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : false,
	layout:'border',
	width : 800,
	height:500,
	maximizable : true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [{
			xtype : 'panel',
			xtype : 'grid',
			region : 'west',
			split : true,
			collapsible:true,
			width:230,
			store:Ext.getStore("sys_unre_notice"),
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{dataIndex:'NOTICE_TITLE',flex:4,text:'未回执通知',renderer:function(v){
					return '<span title="' + v + '">' + v + '</span>';
				}}
				]
		},{
			xtype:'panel',
			region : 'center',
			autoScroll:true,
			itemId:'contentPanel'
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'center',
				type : 'hbox'
			},
			items : [
					{
						xtype : 'button',
						itemId : 'resultBtn',
						iconCls : 'icon-reply bigger-120 blue',
						text : '回 执',
						handler : function(btn) {
							var win = btn.up('window');
							var grid = win.down('grid');
							var mds = grid.getSelectionModel().getSelection();
							if(Ext.isEmpty(mds)) {
								 Ext.MessageBox.alert('警告', '未选择数据!');
								 return;
							}
							var rewin =	Ext.create('app.view.notice.TbUnReNoticeResult',{title:'回执【' + mds[0].data.NOTICE_TITLE + '】',
								callBack:function(){
									grid.getStore().remove(mds);
									grid.getStore().sort({
					                    property: 'SEND_DATE',
					                    direction: 'desc'
					                });
					                grid.getSelectionModel().select(0);
									var unre = grid.getStore().data.items;
									if(Ext.isEmpty(unre) || unre.length < 1){
										win.close();
									}
								}
							});
							rewin.show();
							rewin.loadData(mds[0].data);
						}
					}]
			} ];
		me.callParent(arguments);
		me.on('restore',function(win){
	    	win.setWidth(800);
	    	win.setHeight(500);
	    	win.getEl().center();
	    });
	    me.down('grid').on('select',function(cob, record, index, e, eOpts){
        	me.loadData(record);
		});
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	initData:function(){
		var me = this;
		me.down('grid').getSelectionModel().select(0);
	},
	//加载数据
	loadData : function(record){
		var me = this;
	//	me.down('form').loadRecord(record);
		console.log(record.data.NOTICE_ID);
		me.down('panel[itemId=contentPanel]').setLoading("正在加载通知内容...");
		app.utils.AjaxCallbackUtil.ajaxLoadingCallback("manage/notice/tbnoticereceive/getContent",{NOTICE_ID:record.data.NOTICE_ID},me.down('panel[itemId=contentPanel]'),function(ret){
			if( ret.success ){
				me.loadHtml(record,ret.data);
				me.down('panel').setLoading(false);
			}
		});
	},
	loadHomePageData : function(id){
		var me = this;
		me.down('panel[itemId=contentPanel]').setLoading("正在加载通知内容...");
		app.utils.AjaxCallbackUtil.ajaxLoadingCallback("manage/sys/homepage/getContent",{NOTICE_ID:id},me.down('panel'),function(ret){
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
            ' &nbsp;&nbsp;|&nbsp;&nbsp; 发送时间：' + record.data.SEND_DATE +
            '  &nbsp;&nbsp;|&nbsp;&nbsp;  来源：' + record.data.DATA_FROM +
            '  &nbsp;&nbsp;|&nbsp;&nbsp;' + isResult +
         ' </tr>' +
        '</tbody></table>';
        html = html + "<div style='width:98%;padding-left:15px;'>" + content + "</div>";
        html = html + "<div style='margin:10px;width:98%;align:center;height:1px;background-image:url( images/zwgk_xxian03a.gif );' align='center'></div>";
		me.down('panel[itemId=contentPanel]').update(html);
	}
});
