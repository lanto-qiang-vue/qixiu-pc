Ext.define('app.view.manage.sys.TmSysUserSetStatus',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.sys.TmSysUserSetStatus',
	itemId: 'manage.sys.TmSysUserSetStatus',
	title: '用户信息',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 600,
	height:280,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			itemId:'npanel',
			bodyPadding : 5,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.sys.TmSysUserModel',
				layout:'column',
				columns:2,
				labelWidth: 80,
				btns:[],
				items: [
					{fname:'USER_ID',hidden:true},
					{fname:'USER_CODE',vtype:'notEmpty',vtype:'alphanum',readOnly:true},
					{fname:'USER_NAME',vtype:'notEmpty',readOnly:true},
					{fname:'USER_SEX',readOnly:true},
					{fname:'USER_TYPE',readOnly:true},
					{fname:'TELPHONE',readOnly:true},
					{	
						xtype:'combo',
						name:'BLONG_AREA',
						fieldLabel : '<font color="red"><sub><b>*</b></sub></font>所属辖区',
		                editable:false,
		                store:Ext.getStore("sys_belong_area"),
		                displayField: 'NAME',  
		                readOnly:true,
		                //readOnly:window['GL'].userArea == '440101'? false:true,
		                //value:window['GL'].userArea,
		                valueField: 'CODE',
		                vtype:'notEmpty',
		                queryMode: 'local',
		                allowBlank:false
		            },
		            {fname:'POSITION',readOnly:true},
//					{
//		        	 xtype:'combo',
//		        	 name:'ROLE_ID',
//		        	 fieldLabel:'<font color="red"><sub><b> *</b></sub></font>角色选择',
//		        	 allowBlank:false,
//		        	 store:{
//		        		 fields:['ROLE_ID','ROLE_NAME'],
//		        		 proxy:{
//		        			url:'manage/sys/tmsysuser/getRoleInfo',
//		        			type:'ajax',
//		        			reader:{
//		        				type:'json',
//		        				root:'data'
//		        			}
//		        		 },
//		        		 autoLoad:true
//		        	 },
//		        	 displayField:'ROLE_NAME',
//	 			     valueField:'ROLE_ID'
//		         	},
		         	{	
						xtype:'combgrid',
						name:'ROLE_ID',
						fieldLabel : '<font color="red"><sub><b> *</b></sub></font>角色选择',
						title:'选择角色',
		                editable:false,
		                allowBlank:false,
		                readOnly:true,
		                autoSelect:true,
		                multiSelect:true, //是否可多选
		                paging:false, //是否有分页  (可多选的情况下建议不使用分页),需要配合分页的store和后台的分页查询
		                gridWidth : 300, //表格宽度
		                isCheckBox : true, //表格是否需要复选框
//		                getItem : ['areaCode','areaId'],
		                parentVar : 'corpQualiVar',
		                store:{
			        		 fields:['ROLE_ID','ROLE_NAME'],
			        		 proxy:{
			        			url:'manage/sys/tmsysuser/getRoleInfo',
			        			type:'ajax',
			        			reader:{
			        				type:'json',
			        				root:'data'
			        			}
			        		 },
			        		 autoLoad:true
			        	 },
		                displayField: 'ROLE_NAME',  
		                valueField: 'ROLE_ID',
		                queryMode: 'local',
		                columns : [{
							text : '角色名称',
							dataIndex : 'ROLE_NAME',
							flex:1
						}]
		            },
		            {fname:'IS_VALID'}
				]
			},{
				xtype: 'container',
				margin:'10 0 0 20',
				html:'<font color="red">注：新增用户初始密码为：123456</font>'
			}]
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'saveBtn',
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
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		me.down('form').getForm().findField('USER_CODE').setReadOnly(true);
		var role = eval('[' + record.data.ROLE_ID + ']');
		me.down('form').getForm().findField('ROLE_ID').setValue(role);
	}
});
