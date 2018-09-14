Ext.define('app.controller.trans.corp.TbCorpInfoCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'trans.corp.TbCorpInfoMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=trans.corp.TbCorpInfoMngPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=trans.corp.TbCorpInfoMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=trans.corp.TbCorpInfoMngPanel] button[itemId=saveBtn]':{
				click: this.doSave
			}
		});
	},
	doSave : function(btn){
	
		var me = this;
		var form = btn.up('form').getForm();
		var data = form.getFieldValues();
		if(data.CORP_TYPE == '10141004' || data.CORP_TYPE == '10141005'){
			data.REPAIR_TYPES = data.REPAIR_TYPES_;
		}
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'trans/transcorp/tccorpinfo/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	}
});
