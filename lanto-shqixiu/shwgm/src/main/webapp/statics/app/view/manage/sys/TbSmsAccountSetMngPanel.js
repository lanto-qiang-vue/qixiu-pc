Ext.define('app.view.manage.sys.TbSmsAccountSetMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.sys.TbSmsAccountSetMngPanel',
	itemId: 'manage.sys.TbSmsAccountSetMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	modal : true,	
	border:false,
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items = [{
			xtype : 'panel',
			layout:'fit',
			loading:true,
			title:'短信帐户设置',
			items:[{
				xtype : 'form',
				bodyPadding : 5,
				items : [me.getInfo()],
				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'top',
			        layout : {
			           pack : 'start',
			           type : 'hbox'
			        },
	               items : [{
		                xtype : 'button',
		                itemId : 'saveBtn',
		                iconCls: 'save_button',
		                margin:'0 0 0 0',
		                text : '保存'
		            }]
				}]
			}]
		}];		

		me.callParent(arguments);
		var form = me.down('form').getForm();		
		var url = 'common/sms/getAccountInfo';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				var mod = Ext.create('app.model.sys.TbSmsAccountModel');
				mod.set(ret.data);
				form.setValues(mod.data);
			}
		});
	},
	getInfo : function(){
		var me = this;
		return {
			xtype:'jsf.ModelContainer',
			model : 'app.model.sys.TbSmsAccountModel',
			margin:5,
			border:0,
			layout: {
        		type: 'table',
        		columns: 2
    		},
    		labelWidth: 120,
    		defaults:{width:400},
    		items:[
    		    {fname:'ID',hidden:true},
    		    {fname:'USER_NAME',colspan:2},
    		    {fname:'PASSWORD',colspan:2},
    		    {fname:'SIGN'},
    		    {
					xtype: 'container',
					margin:'10 0 0 20',
					html:'<font color="red">注：签名一定要在【】中</font>'
				},
    		    {fname:'URL',colspan:2},
    		    {fname:'SURPLUS_URL',colspan:2},
    		    {fname:'SURPLUS_NUMBER',colspan:2,readOnly:true}
    		]
		}
	}
});
