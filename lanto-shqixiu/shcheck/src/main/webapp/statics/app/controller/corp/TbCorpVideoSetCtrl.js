Ext.define('app.controller.corp.TbCorpVideoSetCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'corp.TbCorpVideoSetMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=corp.TbCorpVideoSetMngPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=corp.TbCorpVideoSetMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=corp.TbCorpVideoSetMngPanel] button[itemId=saveBtn]':{
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
		var data = form.getFieldValues();
		console.log(data);
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'client/corp/tjcorpvideoset/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	}
});
