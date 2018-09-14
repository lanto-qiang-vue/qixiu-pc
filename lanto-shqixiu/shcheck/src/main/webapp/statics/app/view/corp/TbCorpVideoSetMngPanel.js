Ext.define('app.view.corp.TbCorpVideoSetMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.corp.TbCorpVideoSetMngPanel',
	itemId: 'corp.TbCorpInfoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	//autoShow : true,
	//closable : true,
	//layout : 'fit',
	modal : true,	
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items = [{
			xtype : 'form',
			border : 1,
			bodyPadding : 5,
			items : [me.getCorpVideoSet()],
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
	                margin:'0 0 0 20',
	                text : '保存'
	            }]
			}]
		}];		

		me.callParent(arguments);
		var form = me.down('form').getForm();		
		var url = 'client/corp/tjcorpvideoset/getModel';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				var mod = Ext.create('app.model.corp.TbCorpVideoSetModel');
				mod.set(ret.data);
				form.setValues(mod.data);
			}
		});
	},
	getCorpVideoSet : function(){
		var me = this;
		return {
				title:'视频参数设置',
				xtype : 'panel',
				//border:0,
				items: [
					{
					xtype:'jsf.ModelContainer',
					model : 'app.model.corp.TbCorpVideoSetModel',
					margin:5,
					border:0,
					layout: {
	            		type: 'table',
	            		columns: 1
	        		},
	        		labelWidth: 90,
	        		defaults: {width:250,border:0,margin:2,msgTarget:'side'},
	        		items:[
	        		    {fname:'CORP_ID',hidden:true},
						'LOCAL_IP',
	        		    //'IP',
	        		    'PORT',	
	        		    //'USE_TYPE',				
						//'VIDEO_NUM',
						'USER_NAME',
						'PSW'
						//'SERVER_IP',
						//'SERVER_PORT',
						//'SERVER_INTERVAL'
	        		]
				}
				
			]
		};
	}

});
