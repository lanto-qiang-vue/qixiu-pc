Ext.define('app.view.trans.sys.ChangePassMngPanel',{
	extend : 'Ext.form.Panel',
	alias : 'widget.trans.sys.ChangePassMngPanel',
	itemId : 'trans.sys.ChangePassMngPanel',
	bodyPadding : 5,
	requires : ['jsf.container.ModelContainer'],
	width : 800,
	modal : true,
	border : 1,
	line0 : {
		xtype : 'jsf.ModelContainer',
		model : 'app.model.sys.TmSysUserModel',
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
			maxLentth:20,
			readOnly:true
		},{
			xtype: 'textfield',
			inputType: 'password',
			fieldLabel:'<font color="red"><sub><b> *</b></sub></font>'+'旧密码:',
			name : 'oldPassword',
			vtype:'notEmpty',
			maxLength:18,
			minLength:6,
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
			vtype:'notEmpty',
			fieldLabel : '<font color="red"><sub><b> *</b></sub></font>'+'确认密码:',
			name : 'rePassword',
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
	                text : '保存'
	            }]
			}]
		}];
		me.callParent(arguments);
		me.down('form').getForm().findField('oldPassword').removeListener('keyup');
		me.down('form').getForm().findField('oldPassword').removeListener('keydown');
		me.down('form').getForm().findField('oldPassword').removeListener('focus');
	}
});