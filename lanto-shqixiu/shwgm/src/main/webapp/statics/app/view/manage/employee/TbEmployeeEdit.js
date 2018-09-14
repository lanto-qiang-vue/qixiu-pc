Ext.define('app.view.manage.employee.TbEmployeeEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.employee.TbEmployeeEdit',
	itemId: 'manage.employee.TbEmployeeEdit',
	title: '从业人员基本信息',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 980,
	height:520,
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ me.getInfoPanel(),me.getPhotoPanel()],
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
	getInfoPanel : function(){
		var me = this;
		return {
			xtype:'form',
			itemId:'infoForm',
			autoScroll:true,
			border:0,
			region:'center',
			items:[{
				xtype: 'fieldset',
	            region:'center',
	            title: '员工基本资料',
	            margin:5,
	            items: [{
					xtype : 'jsf.ModelContainer',
					model : 'app.model.employee.TbEmployeeModel',
					layout:'column',
					defaults: {msgTarget:'side',width:235},
					layout: {
	            		type: 'table',
	            		columns: 3
	        		},
					margin:'0 0 10 0',
					labelWidth: 85,
					btns:[],
					items: [
						{fname:'EMPLOYEE_ID',hidden:true},
						{fname:'CORP_ID',hidden:true},
						{fname:'PHOTO',hidden:true},
						'NAME',
						{fname:'ID_NUM',maxLength:18},
						'SEX',
						{xtype:'triggerfield',name:'CORP_NUM',fieldLabel:'<font color="red"><sub><b> *</b></sub></font>企业编码',
							triggerCls: 'x-form-search-trigger',
			                editable:false,
			                readOnly:false,
			                allowBlank:false,
			                onTriggerClick: function(e) {
			                	var me = this;
			                	var form = me.up('form').getForm();
				    			var win = Ext.create("app.view.common.CorpSelWin",{
				    			     modal : true,
				    				 rowSelType : 'SINGLE', //单选
					   				 callback:function( records ){
					   	    			//将取到的值赋给页面
					   				 	var params = records[0].data;
					   	    			form.setValues(params);
					   				}
			    				});
			    				win.show();
			    				win.down('grid').getStore().loadPage(1);
				    		}
						},
						{fname:'CORP_NAME',colspan:2,width:480,readOnly:true},			
						'POST',
						{fname:'TELPHONE'},
						'BIRTH_DATE',
						'DEGREE',
						{fname:'ADDRESS',colspan:3,width:480},
						{xtype:'textarea',anchor: '100%',height:60,fieldLabel:'人员简介',name:'REMARK',colspan:3,width:720}	
					]
				}]
			},me.getCard()]
            
		};
	},
	getPhotoPanel : function(){
		var me = this;
		return {
			xtype:'form',
			region:'east',
			itemId:'photoForm',
			border:0,
			items:[{
				xtype: 'fieldset',
	            width:180,
	            margin:'5 5 5 0',
	            title: '照片',
	            items: [{
					xtype : 'jsf.ModelContainer',
					model : 'app.model.employee.TbEmployeeModel',
					layout:'column',
					columns:1,
					btns:[],
					items: [
						{
							xtype:'image',
							name:'photoImage',
				            itemId : 'photoItemId',
				            src : 'images/person.gif'
						},
						{
							xtype:'filefield',
							buttonOnly: true,
							name:'employeePhoto',
					        hideLabel: true,
					        margin:'0 0 0 100',
					        buttonText: '选择照片...',
					        buttonConfig: {
				                iconCls: 'icon-upload-alt bigger-120 white'
				            },
					        listeners: {
					            'change': function(fb, v){
					            	me.submitHandler(fb, v);
					            }
					        }
						}
					]
				}]
			}]
            
		};
	},
	getCard:function(){
		var me = this;
		return {
			xtype:'jsf.ModelGrid',
			border:1,
			title:'证件详细资料',
			rowSelType : 'MULTI',
			margin:5,
			height:200,
			paging:false,
			model:'app.model.employee.TbEmployeeCertModel',
			url:'manage/employee/tbemployee/certList',
			itemId:'listpanel',
			border:0,
			columns:[
				{text:'序号',xtype:'rownumberer'},
				{fname:'CERT_NUM',editor:true,flex:1},
				{fname:'CERT_NAME',editor:true,flex:2},
				{fname:'SEND_DATE',editor:true,flex:1},
				{fname:'END_DATE',editor:true,flex:1}
			],
			 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.employee.TbEmployeeCertModel');
		                var win = btn.up('window');
		                var store = win.down('grid').getStore();
		                var editing = win.down('grid').plugins[0];
		                if(store.getCount() < 5){
		                	store.insert(store.getCount(),record);
		                }
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid');
		                var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
	                 }
			 }]
		};
	},
	submitHandler: function(fb, v){
		var me = this;
		if(Ext.isEmpty(v)){
			return ;
		}
		var val = v.substring(v.lastIndexOf('.')+1);
		var tag = false;
		for(var _i = 0; _i < me.fileType.length;_i ++){
    		if(me.fileType[_i].toLowerCase()==val.toLowerCase()){
    			tag = true ;
    		}
    	}
    	if(!tag){
    		Ext.Msg.alert("警告", "只能上传图片格式文件【<font color=red>'jpg','jpeg','bmp','gif','png'</font>】");
    		return;
    	}
    	var form = fb.up('form[itemId=photoForm]').getForm();
    	var infoForm = me.down('form[itemId=infoForm]').getForm();
//    	form.standardSubmit = true;
    	form.submit({
//            clientValidation: true,
    		method:'POST',
            url: 'manage/common/fileUpload/uploadPhoto',
            waitMsg: '照片上传中...',
            success: function(response, action) {
               var photo = me.down('[itemId=photoItemId]');
               photo.setSrc("manage/common/fileUpload/downloadPhoto?fileId=" + action.result.data);
               infoForm.findField('PHOTO').setValue(action.result.data);
            },
            failure: function(response, action) {
               Ext.Msg.alert("失败", '上传失败');
            }
        });
	},
	fileType:['bmp','gif','jpeg','png','jpg'],
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var photo = me.down('[itemId=photoItemId]');
        if(!Ext.isEmpty(record.data.PHOTO)){
			photo.setSrc("manage/common/fileUpload/downloadPhoto?fileId=" + record.data.PHOTO);
		}
	},
	//加载数据
	loadViewData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		me.down('button[itemId=saveBtn]').hide();
		me.down('form[itemId=photoForm]').down('filefield').hide();
		me.down('grid').down('toolbar').hide();
		var photo = me.down('[itemId=photoItemId]');
        if(!Ext.isEmpty(record.data.PHOTO)){
			photo.setSrc("manage/common/fileUpload/downloadPhoto?fileId=" + record.data.PHOTO);
		}
	}
});
