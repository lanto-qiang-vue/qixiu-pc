Ext.define('app.controller.manage.sys.TbSmsAccountSetCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'manage.sys.TbSmsAccountSetMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=manage.sys.TbSmsAccountSetMngPanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=manage.sys.TbSmsAccountSetMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=manage.sys.TbSmsAccountSetMngPanel] button[itemId=saveBtn]':{
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
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'common/sms/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	}
});
