Ext.define('app.view.corp.uploadWin',{
	extend:'Ext.window.Window',
	alias: 'widget.corp.uploadWin',
	itemId: 'corp.uploadWin',
	title: '附件上传',
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 800,
	height:500,
	fileBillId:'',
	fileBillType:'',
	forEdit:true,
//	autoScroll:true,
	modal : true,
	maximizable: true,
    collapsible: true,
    animCollapse: true,

	initComponent : function() {
		var me = this;
		me.items = [ {
            xtype: 'uploadpanel',
            title: '附件列表',
            region:'center',
            layout : 'fit',
            header: false,
            file_size_limit : app.utils.AttachCodes.file_size_limit,//改用常量配置
            file_total_size : app.utils.AttachCodes.file_total_size,
            file_deny_types : app.utils.AttachCodes.file_deny_types,
            forEdit:me.forEdit,
            isProgressbar:true,
            fileBillId:me.fileBillId,
            fileBillType:me.fileBillType
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
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		 var upload = me.down('#fileUploadGrid');
	   	 upload.reLoad({fileBillId:1,fileBillType:10411011});
	},
	isShow : function(value, meta, record){
  		var isCre = record.data.leaf;
  		if(isCre){
  			return true;
  		}
  		return false;
  	}
});
