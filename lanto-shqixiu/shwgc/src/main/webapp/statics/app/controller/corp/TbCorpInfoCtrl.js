Ext.define('app.controller.corp.TbCorpInfoCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'corp.TbCorpInfoMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=corp.TbCorpInfoMngPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=corp.TbCorpInfoMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=corp.TbCorpInfoMngPanel] button[itemId=saveBtn]':{
				click: this.doSave
			}
		});
	},
	doSave : function(btn){
		var me = this;
		var form = btn.up('form').getForm();
		if(!form.isValid()){
			return false;
		}
		var exam = btn.up('form').down('grid').getStore().data.items;
		var exams = [];
		for(var i=0;i<exam.length;i++){
			exams.push(exam[i].data);
		}
		var data = form.getFieldValues();
		if(data.CORP_TYPE == '10141004' || data.CORP_TYPE == '10141005'){
			data.REPAIR_TYPES = data.REPAIR_TYPES_;
		}
		var params = {
			data : Ext.JSON.encode(data),
			exams : Ext.JSON.encode(exams)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/corp/tbcorpinfo/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	}
});
