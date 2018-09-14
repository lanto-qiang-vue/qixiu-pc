Ext.define('app.controller.notice.InfoPublicCtrl',{
	extend:'Ext.app.Controller',
	views: ['notice.InfoPublicMngPanel'],
	refs: [],
	init: function(ctrl) {
		this.control({
			'panel[itemId=notice.TbNoticeReceiveMngPanel]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			},
			'panel[itemId=notice.TbNoticeReceiveEdit]': {
				//afterrender : app.utils.CommonUtil.setPanelFuncPower
			}
		});
	}
});
