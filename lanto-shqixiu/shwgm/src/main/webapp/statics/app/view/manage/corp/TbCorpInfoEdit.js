Ext.define('app.view.manage.corp.TbCorpInfoEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.corp.TbCorpInfoEdit',
	itemId: 'manage.corp.TbCorpInfoEdit',
	title: '维修企业详细资料',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 800,
	isView:false,
	height:550,
	modal : true,

	initComponent : function() {
		var me = this;
		var items = [me.getCorpInfo(),me.getEmployeeInfo()];
		if(me.isView){
			items.push(me.getZZ());
		}
		items.push(me.getPosition());
		me.items = [ {
			xtype:'form',
			border:0,
			layout:'border',
			itemId:'npanel',
			items:[{
				xtype : 'tabpanel',
				border:0,
				defaults: {xtype:'panel',border:0,autoScroll:true},
				region : 'center',
				items: items
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : [{
						xtype : 'button',
						itemId : 'saveBtn',
						hidden:me.isView,
						iconCls : 'save_button',
						text : '保 存'
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	getCorpInfo : function(){
		var me = this;
		return {
				title:'基本资料',
				xtype : 'panel',
				border:0,
				items: [{
		        	xtype:'component',
		        	padding:'5 10 5 20',
		        	margin:'10 20 10 20',
		        	style:'background:#eee;',
		        	html:'企业基本信息：'
		        },{
					xtype:'jsf.ModelContainer',
					model : 'app.model.corp.TbCorpInfoModel',
					margin:'0 0 0 5',
					border:0,
					layout: {
	            		type: 'table',
	            		columns: 2
	        		},
	        		labelWidth: 90,
	        		defaults: {width:300,border:0,margin:2,msgTarget:'side',readOnly:me.isView},
	        		items:[
	        			{fname:'CORP_ID',hidden:true},
	        			{fname:'LONGITUDE',hidden:true},
	        			{fname:'LATITUDE',hidden:true},
						{fname:'CORP_NAME'},
						{fname:'CORP_NUM',readOnly:true,emptyText:'系统自动生成'},
						{	
							xtype:'combo',
							name:'CORP_AREA',
							fieldLabel : '<font color="red"><sub><b>*</b></sub></font>所属辖区',
			                editable:false,
			                store:Ext.getStore("sys_belong_area"),
			                displayField: 'NAME',  
			                valueField: 'CODE',
			                queryMode: 'local',
			                allowBlank:false
			            },
			            {fname:'CORP_TYPE',blankItem:true},
						{fname:'CORP_ADD',colspan:2,width:606},
						'BUSINESS_TYPE',
						{fname:'MAGOR_BRANDS'},
						{fname:'EMAILS',vtype:'email'},
						
						{fname:'LINK_MAN'},
						{fname:'LINK_TEL'},	
						{fname:'ZBLC'},	
						{fname:'ZBRQ'},	
						{fname:'IS4S',blankItem:true},
						{fname:'STATUS'}
	        		]
	        },{
	        	xtype:'component',
	        	padding:'5 10 5 20',
	        	margin:'10 20 10 20',
	        	style:'background:#eee;',
	        	html:'道路运输经营许可证信息：'
	        },{
					xtype:'jsf.ModelContainer',
					model : 'app.model.corp.TbCorpInfoModel',
					margin:'0 0 0 10',
					border:0,
					layout: {
	            		type: 'table',
	            		columns: 2
	        		},
	        		labelWidth: 90,
	        		defaults: {width:300,border:0,margin:2,msgTarget:'side',readOnly:me.isView},
	        		items:[
						{fname:'BUSINESS_NUM'},
			            {fname:'CERTIFICATE_FIRST_TIME'},
						{fname:'CERTIFICAT_START_TIME'},
						{fname:'CERTIFICATE_END_TIME'}
	        		]
	        }]
		};
	},
	
	getEmployeeInfo : function(){
		var me = this;
		return {
				title:'人员信息',
				xtype : 'panel',
				items: [
					{
						xtype:'jsf.ModelContainer',
						margin:'30 0 0 20',
						model : 'app.model.corp.TbCorpInfoModel',
						layout: {
		            		type: 'table',
		            		columns: 2
		        		},
		        		labelWidth: 76,
		        		defaults: {width:300,border:0,margin:2,readOnly:me.isView},
		        		items:[
		        			'LEGAL_NAME',
		        			'LEGAL_TEL',
		        			{fname:'FICT_PERSON'},
		        			'TECHNOLOGY_PERSON',
		        			'FINAL_PERSON',
		        			'QUALITY_PERSON'
		        		]
					}]
			};
	},
	
	getPosition : function(){
		var me = this;
		return {
				title:'位置信息',
				xtype : 'panel',
				itemId:'corp_position',
				html:''
			};
	},
	getZZ : function(){
		var me = this;
		return {
			title:'维修资质',
			xtype : 'panel',
			items: [
				{
					xtype:'jsf.ModelContainer',
					model : 'app.model.corp.TbCorpInfoModel',
					margin:'30 0 10 40',
					layout: {
	            		type: 'table',
	            		columns: 2
	        		},
	        		labelWidth: 82,
	        		defaults: {border:0,margin:2},
	        		items:[
	        			{
					        xtype: 'checkboxgroup',
					        itemId:'box_group',
					        name:'box_group',
					        colspan:2,
					        defaults: {readOnly:me.isView},
					        width:450,
					        columns: 2,
					        items: [
					            { boxLabel: '二级维护', name: 'IS_SEC_MAINTAIN', inputValue: '10041001'},
					            { boxLabel: '危运车辆维修', name: 'IS_WYCL', inputValue: '10041001'},
					            { boxLabel: '新能源汽车维修', name: 'IS_XNY', inputValue: '10041001'},
					            { boxLabel: '汽车救援服务', name: 'IS_QCJY', inputValue: '10041001'}			            
					        ]
					    }
	        		]
				}]
		};
	},
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		me.down("#corp_position").update('<iframe height="100%" width="100%" src="manage/corp/corpinfo/position?corpId=' + record.get('CORP_ID') + '" scrolling="yes" frameborder="0" id="corpinfobmapFrame" name="bmapFrame"></iframe>');
	},
	loadAddData : function(){
		var me = this;
		me.down("#corp_position").update('<iframe height="100%" width="100%" src="manage/corp/corpinfo/position" scrolling="yes" frameborder="0" id="corpinfobmapFrame" name="bmapFrame"></iframe>');
	},
	loadViewData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		me.down("#corp_position").update('<iframe height="100%" width="100%" src="manage/corp/corpinfo/position?isview=yes&corpId=' + record.get('CORP_ID') + '" scrolling="yes" frameborder="0" id="corpinfobmapFrame" name="bmapFrame"></iframe>');
	}
});
