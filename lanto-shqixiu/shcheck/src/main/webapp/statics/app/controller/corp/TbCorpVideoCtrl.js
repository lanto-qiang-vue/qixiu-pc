Ext.define('app.controller.corp.TbCorpVideoCtrl',{
	extend:'Ext.app.Controller',
	views: [
		'corp.TbCorpVideoMngPanel'],
	refs: [{
		ref : 'mngPanel',
		selector : 'panel[itemId=corp.TbCorpVideoMngPanel]'
	},{
		ref : 'searchPanel',
		selector : 'panel[itemId=corp.TbCorpVideoMngPanel] panel[itemId=spanel]'
	}],
	init: function(ctrl) {
		this.control({
			'panel[itemId=corp.TbCorpVideoMngPanel]': {
				afterrender : app.utils.CommonUtil.setPanelFuncPower
			}
		});
	},
	onclick:function(a,b,c){
		console.log(b);
		var me = this;
		var panel = me.getMngPanel();
		panel.down('panel[itemId=videoPanel]').setTitle('视频查看：【 ' + b.data.CORP_NAME + ' 】');
		corpVideoFrame.window.ConnectVideoSrv(b.get('IP'),b.get('PORT'),b.get('USER_NAME'),b.get('PSW'));
		corpVideoFrame.window.StartVideoPreviewExt(b.get('VIDEO_NUM'));
	}
});
