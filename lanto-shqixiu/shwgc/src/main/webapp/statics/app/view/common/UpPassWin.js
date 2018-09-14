Ext.define('app.view.common.UpPassWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.UpPassWin',
    itemId : 'common.UpPassWin',
    height: 230,
    width: 600,
    title:'修改密码',
    autoShow : true,
    modal : true,
    layout : 'fit',
    line0 : {
		xtype : 'jsf.ModelContainer',
		model : 'app.model.sys.TqSysUserModel',
		labelWidth : 80,
		width : 500,
		showType : 'edit',
		layout : 'column',
		columns : 1,
		style : {marginLeft:'auto',marginRight:'auto'},
		items : [{
			name : 'USER_ID',
			xtype : 'hidden'
		},{
			xtype: 'textfield',
			fieldLabel:'用户名:',
			name : 'userName',
			value:window.GL.name,
			readOnly:true
		},{
			xtype: 'textfield',
			inputType: 'password',
			fieldLabel:'<font color="red"><sub><b> *</b></sub></font>'+'旧密码:',
			name : 'oldPassword',
			maxLength:18,
			minLength:6,
			vtype:'notEmpty',
			allowBlank:false
		},{
			xtype: 'textfield',
			inputType: 'password',
			fieldLabel:'<font color="red"><sub><b> *</b></sub></font>'+'新密码:',
			name : 'newPassword',
			maxLength:18,
			minLength:6,
			vtype:'notEmpty',
			allowBlank:false
		},{
			xtype : 'textfield',
			inputType : 'password',
			fieldLabel : '<font color="red"><sub><b> *</b></sub></font>'+'确认密码:',
			name : 'rePassword',
			vtype:'notEmpty',
			maxLength:18,
			minLength:6,
			allowBlank:false
		}]
	},
	initComponent: function() {
		var me = this;
		me.items = [{
			xtype : 'form',
			border : 1,
			bodyPadding : 5,
			items : [me.line0],
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
		        layout : {
		           pack : 'center',
		           type : 'hbox'
		        },
		items : [{
	                xtype : 'button',
	                itemId : 'saveBtn',
	                iconCls: 'save_button',
	                text : '保存',
	                handler : function(btn) {
						if( !btn.up('form').isValid()){
			  				return;
			  			}
						var fm = btn.up('form').getForm();
						var params = fm.getValues();
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
								app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/sys/tqsysuser/updatePassword',params,function(ret){
									if( ret.data ){
						        		Ext.Msg.alert('系统提示','密码修改成功！');
						        		me.close();
					          		}else{
					          			Ext.MessageBox.alert('提示','旧密码错误！');
					          		}
								});
			    			}
						});
					}
	            },{
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				}]
			}]
		}];
		me.callParent(arguments);
		me.down('form').getForm().findField('oldPassword').removeListener('keyup');
		me.down('form').getForm().findField('oldPassword').removeListener('keydown');
		me.down('form').getForm().findField('oldPassword').removeListener('focus');
	}
});
