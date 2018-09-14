Ext.define('app.view.common.LockLoginWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.LockLoginWin',
    itemId : 'common.LockLoginWin',
    height: 100,
    width: 500,
    title:'您在30分钟内未有任何对系统的操作，系统已经自动锁定，请输入密码唤醒系统！',
    autoShow : true,
    closable : false,
    modal : true,
    layout : 'fit',
	initComponent: function() {
		var me = this;
		me.items = [{
			xtype : 'form',
			layout:{
				type:'hbox',
				align:'middle',
				pack:'center'
			},
			border : 1,
			bodyPadding : 5,
			items : [{
				xtype:'textfield',
				minHeight:40,
				name:'userPW',
				width:400,
				msgTarget:'side',
				emptyText:'请输入登录密码后点击确定[或者回车]唤醒系统......',
				allowBlank:false,
				inputType : 'password'
			},{
				xtype:'button',
				text:'确 定',
				itemId:'sureBtn',
				formBind : true,
				scale: 'large',
				margin:'0 0 0 10',
				handler:function(button){
					var form = button.up('form').getForm();
					if(!form.isValid()){
						return ;
					}
					var params = form.getValues();
					params.userID = window['GL'].userCode;
					params.randCode = 'norandcode';
					var url = "check/login.do";
					app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
						if( ret.success ){
							if(ret.data == true) {
								button.up('window').close();
								app.utils.TaskUtils.exp = app.utils.TaskUtils.maxExp;
								app.utils.TaskUtils.exeTask();
							}else{
								Ext.Msg.alert('错误提示',ret.data);
							}
						}
					});
				}
			}]
		}];
		me.callParent(arguments);
		var fun = function() {
			var button = me.down('button[itemId=sureBtn]');
			if (!Ext.isEmpty(button.handler)) {
				button.handler(button);
			} else {
				button.fireEvent('click', button);
			}
		};
		me.keymap = new Ext.util.KeyMap({
			target : Ext.getBody(),
			key : Ext.EventObject.ENTER, // or
			fn : fun,
			scope : this
		});
		me.on('close','onClose',me);
	},
	onClose:function(){
		var me = this;
		me.keymap.destroy(false);
	}
});
