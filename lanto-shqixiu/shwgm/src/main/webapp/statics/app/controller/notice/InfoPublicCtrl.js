Ext.define('app.controller.notice.InfoPublicCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'notice.InfoPublicMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=notice.InfoPublicMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=notice.InfoPublicMngPanel] panel[itemId=spanel]'
	},{
		ref : 'gridPanel',
		selector : 'panel[itemId=notice.InfoPublicMngPanel] panel[itemId=gpanel]'
	}],
	init: function(ctrl) {
		this.control({
			'window[itemId=notice.InfoPublicEdit] button[itemId=saveBtn]': {
				click: this.doSave
			},
			'window[itemId=notice.InfoPublicPublish] button[itemId=publishBtn]': {
				click: this.doPublishSave
			}
		});
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		
		if (data.CREATOR.length>30) {
			Ext.Msg.alert('系统提示','发布人最多只能输入30个字符，请重新输入！');
			return false;
		}
		if (data.DATA_FROM.length>30) {
			Ext.Msg.alert('系统提示','来源最多只能输入30个字符，请重新输入！');
			return false;
		}	
		data.INFO_TYPE=win.parentPanel.infoType;
		var params = {
			data : Ext.JSON.encode(data)
		};
	
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/notice/infopublic/save';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						win.parentPanel.down('grid').getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','保存成功！');
					}
				});
			}
		});
	},
	//发布窗口保存按钮
	doPublishSave : function(button){
		var me = this;
		var win  = button.up('window');
		if(!win.isValid()){
			return false;
		}
		var form = win.down('form').getForm();
		var data = form.getFieldValues();
		data.INFO_TYPE=win.parentPanel.infoType;
		var params = {
			data : Ext.JSON.encode(data)
		};
		Ext.MessageBox.confirm('系统提示','确认发布吗？',function(flag){
			if(flag=='yes'){
				var url = 'manage/notice/infopublic/publish';
				app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
					if( ret.success ){
						win.parentPanel.down('grid').getStore().reload();
						win.close();
						Ext.Msg.alert('系统提示','发布成功！');
					}
				});
			}
		});
	}
});
