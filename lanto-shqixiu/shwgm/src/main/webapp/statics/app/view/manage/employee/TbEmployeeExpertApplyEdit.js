Ext.define('app.view.manage.employee.TbEmployeeExpertApplyEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.employee.TbEmployeeExpertApplyEdit',
	itemId: 'manage.employee.TbEmployeeExpertApplyEdit',
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
//					{
//						xtype : 'button',
//						itemId : 'saveBtn',
//						iconCls : 'save_button',
//						code:'10321001',
//						text : '暂存'
//					},'-',{
//						xtype : 'button',
//						itemId : 'submitBtn',
//						iconCls : 'accept_button',
//						code:'10321002',
//						text : '提交'
//					},'-', 
						{
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
					model : 'app.model.employee.TbEmployeeExpertApplyModel',
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
						{fname:'APPLY_ID',hidden:true},
						{fname:'PHOTO',hidden:true},
						'NAME',
						'BIRTH_DATE',
						'NATIVE_PLACE',
						'SEX',
						{fname:'EMP_UNIT',colspan:2,width:480},	
						'PROFESSOR',
						'DEGREE',
						{fname:'TELPHONE'},
						{fname:'ID_NUM',maxLength:18,colspan:3,width:480},
						{xtype:'textarea',anchor: '100%',height:120,allowBlank:false,beforeLabelTextTpl: required,fieldLabel:'主要荣誉',name:'HONOR',colspan:3,width:720},
						{xtype:'textarea',anchor: '100%',height:120,allowBlank:false,beforeLabelTextTpl: required,fieldLabel:'专业擅长',name:'GOOD_AT',colspan:3,width:720}	
					]
				}]
			}]
            
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
					model : 'app.model.employee.TbEmployeeExpertApplyModel',
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
            url: 'client/common/fileUpload/uploadPhoto',
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
//		me.down('button[itemId=saveBtn]').hide();
//		me.down('button[itemId=submitBtn]').hide();
		me.down('form[itemId=photoForm]').down('filefield').hide();
		var photo = me.down('[itemId=photoItemId]');
        if(!Ext.isEmpty(record.data.PHOTO)){
			photo.setSrc("manage/common/fileUpload/downloadPhoto?fileId=" + record.data.PHOTO);
		}
	}
});
