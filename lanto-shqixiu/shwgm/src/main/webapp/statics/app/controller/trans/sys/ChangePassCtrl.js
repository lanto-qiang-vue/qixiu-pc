Ext.define('app.controller.trans.sys.ChangePassCtrl', {
	extend: 'Ext.app.Controller',
	views: ['trans.sys.ChangePassMngPanel'],
	init: function(dms) {
		this.control({
			'panel[itemId=trans.sys.ChangePassMngPanel]': {
	           // afterrender : app.utils.CommonUtil.setPanelFuncPower
	        },
			'panel[itemId=trans.sys.ChangePassMngPanel] button[itemId=saveBtn]': {
	            click : this.doSave
	        }
		});
	},
	doSave : function(btn){
		try{
			if( !btn.up('form').isValid()){
  				return;
  			}
			var fm = btn.up('form').getForm();
			var params = fm.getValues();
			if(params.newPassword.length > 20) {
				Ext.MessageBox.alert('警告','新密码长度不能大于20，请重新修改！');
				return;
			}			
			if(params.newPassword == params.oldPassword) {
				Ext.MessageBox.alert('警告','新密码与旧密码一致，请重新修改！');
				return;
			}
			if(params.newPassword != params.rePassword) {
				Ext.MessageBox.alert('警告','新密码与确认密码不一致，请重新修改！');
				return;
			}
			Ext.MessageBox.confirm('系统提示','确认要修改吗？',function(flag){
    			if(flag=='yes'){
					app.utils.AjaxCallbackUtil.ajaxCallbackAll('trans/sys/sysuser/updatePassword',params,function(ret){
						if( ret.data ){
			        		Ext.Msg.alert('系统提示','密码修改成功！');
		          		}else{
		          			Ext.MessageBox.alert('提示','旧密码错误！');
		          		}
					});
    			}
			});
		}catch(e){
			if(console) console.log(e);
		}
	}
});