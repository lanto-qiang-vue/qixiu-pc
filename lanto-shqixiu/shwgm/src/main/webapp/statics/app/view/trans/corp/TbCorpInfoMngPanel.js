Ext.define('app.view.trans.corp.TbCorpInfoMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.trans.corp.TbCorpInfoMngPanel',
	itemId: 'trans.corp.TbCorpInfoMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	bodyPadding : 5,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			border:0,
			itemId:'npanel',
			items:[{
				xtype : 'panel',
				border:0,
				//defaults: {xtype:'panel',border:0,autoScroll:true},
				items: [me.getCorpInfo()],
				bbar:[{xtype:'button',text:'保 存',iconCls:'save_button',margin:'0 0 0 20',itemId:'saveBtn'}]
			}]
		}],
		me.callParent(arguments);
		var form = me.down('form').getForm();
	/*
		var type = form.findField('CORP_TYPE');
		type.on('change',function(cob,val,oval,e){
			if(!Ext.isEmpty(val)){
				if(val == '10141004' || val == '10141005'){
					form.findField('REPAIR_TYPES_').show();
					form.findField('REPAIR_TYPES').hide();
				}else{
					form.findField('REPAIR_TYPES').show();
					form.findField('REPAIR_TYPES_').hide();
				}
				if(!Ext.isEmpty(oval)){
					form.findField('REPAIR_TYPES').setValue('');
				}
			}
		});
		*/
		var url = 'trans/transcorp/tccorpinfo/getModel';
		app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,null,function(ret){
			if( ret.success ){
				var mod = Ext.create('app.model.corp.TbCorpInfoModel');
				mod.set(ret.data);
				form.setValues(mod.data);
				//me.down('grid').getStore().loadPage(1);
			}
		});
		
	},
	getCorpInfo : function(){
		var me = this;
		return {
				title:'企业基本信息',
				xtype : 'panel',
				border:0,
				items: [
					{
					xtype:'jsf.ModelContainer',
					model : 'app.model.corp.TcCorpInfoModel',
					margin:'30 0 0 5',
					border:0,
					layout: {
	            		type: 'table',
	            		columns: 2
	        		},
	        		labelWidth: 90,
	        		defaults: {width:300,border:0,margin:2,msgTarget:'side'},
	        		items:[
	        			{fname:'CORP_ID',hidden:true},
						{fname:'CORP_NAME',width:606,colspan:3},
						{fname:'CORP_NUM',readOnly:true,emptyText:'系统自动生成'},
						{fname:'CHARGE_PERSON',colspan:2},
						{	
							xtype:'combo',
							name:'CORP_AREA',
							fieldLabel : '<font color="red"><sub><b>*</b></sub></font>所属辖区',
			                editable:false,
			                store:Ext.getStore("sys_belong_area"),
			                displayField: 'NAME',  
			                valueField: 'CODE',
			                queryMode: 'local',
			                readOnly:true,
			                allowBlank:false
			            },
			            {fname:'SERVICE_HOTLINE'},
			            {fname:'BUSINESS_NUM',readOnly:true},
			            { fname:'CERT_DATE',readOnly:true},
			            { fname:'VALID_START_DATE',readOnly:true},
			            { fname:'VALID_END_DATE',readOnly:true},
						{fname:'CORP_ADD',colspan:2,width:606},
						{fname:'EMAIL',vtype:'email',colspan:2,width:606},
						{fname:'WEB_SITE',colspan:2,width:606},
						{xtype:'textarea',anchor: '100%',height:60,fieldLabel:'备注',name:'REMARK',colspan:2,width:606}		        		
	        		]
				}
				
			]
		};
	}
});
