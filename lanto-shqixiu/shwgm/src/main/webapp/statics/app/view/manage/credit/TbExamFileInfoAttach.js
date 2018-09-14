Ext.define('app.view.manage.credit.TbExamFileInfoAttach',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.credit.TbExamFileInfoAttach',
	itemId: 'manage.credit.TbExamFileInfoAttach',
	title: '质量信誉考核附件上传',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	width : 800,
	height:580,
	fileBillId:'',
	layout:'border',
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
				xtype:'panel',
				region : 'north',
				frame:true,
				bodyPadding: 15,
				itemId:'npanel',
				html:'<div style="font-size:18px;line-height:20px;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;企业网上申请需填报或上传以下资料：⑴机动车维修企业质量信誉考核申请表（附件2）；⑵企业2014年度质量信誉工作总结；⑶机动车维修企业质量信誉考核评分表（由企业进行自评打分）；⑷企业获得相关表彰、奖励、荣誉的文件、证书复印件。以上资料网上提交后，需使用A4纸各打印１份，按以上顺序装订并加盖维修企业公章，待考核组现场考核时提交管理部门。</strong></div>'
			},{
	            xtype: 'uploadpanel',
	            title: '附件列表',
	            region:'center',
	            layout : 'fit',
	            header: false,
	            file_size_limit : app.utils.AttachCodes.file_size_limit,//改用常量配置
	            file_total_size : app.utils.AttachCodes.file_total_size,
	            file_deny_types : app.utils.AttachCodes.file_deny_types,
	            forEdit:false,
	            isProgressbar:true,
	            fileBillId:me.fileBillId,
	            fileBillType:app.utils.AttachCodes.EXAM_FILE
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
	loadAddData : function(){
		var me = this;
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
	},
	createTip : function(grid){
		var view = grid.getView();
        var tip = Ext.create('Ext.tip.ToolTip', {
		    target: view.el,
		    delegate: view.itemSelector,
		    trackMouse: true,
		    autoHide:false,
		    anchor: 'top',
		    renderTo: Ext.getBody(),
		    listeners: {
		        beforeshow: function updateTipBody(tip) {
		            tip.update("<font color='blue'>" + view.getRecord(tip.triggerElement).get('ITEM_DETAIL') + "</font>");
		        }
		    }
		});
	}
});
