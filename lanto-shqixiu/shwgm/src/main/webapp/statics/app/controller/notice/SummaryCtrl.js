Ext.define('app.controller.notice.SummaryCtrl',{
	extend:'Ext.app.Controller',
	config : {FUNCTION:null,SUMMARY:null},
	views: [
		'notice.SummaryMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=notice.SummaryMngPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=notice.SummaryMngPanel]': {
				afterrender : this.loadData
			},
			'panel[itemId=notice.SummaryMngPanel] button[itemId=saveBtn]': {
				click: this.doSave
			}
		});
	},
	loadData : function(mngPanel){
		var me=this;
		var url='notice/summary/getinfo';
		var editor=mngPanel.down('htmleditor');
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				if(mngPanel.funcId=='10030301'){
					editor.setValue(ret.data.SUMMARY);
				}else if(mngPanel.funcId=='10030302'){
					editor.setValue(ret.data.FUNCTION);
				}
				me.config.FUNCTION=ret.data.FUNCTION;
				me.config.SUMMARY=ret.data.SUMMARY;
			}
		});
	},
	doSave : function(button){
		var me=this;
		var url='notice/summary/save';
		var editor=button.up('panel').down('htmleditor');
		var params=null;
		if(button.up('panel').funcId=='10030301'){
			params={'SUMMARY':editor.getValue(),'FUNCTION':me.config.FUNCTION};
		}else if(button.up('panel').funcId=='10030302'){
			params={'SUMMARY':me.config.SUMMARY,'FUNCTION':editor.getValue()};
		}
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
			if( ret.success ){
				Ext.Msg.alert('系统提示','保存成功！');
			}
		});
	}
});
