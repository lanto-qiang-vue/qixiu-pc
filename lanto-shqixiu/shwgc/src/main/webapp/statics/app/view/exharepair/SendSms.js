Ext.define('app.view.exharepair.SendSms',{
	extend:'Ext.window.Window',
	alias: 'widget.exharepair.SendSms',
	itemId: 'exharepair.SendSms',
	config:{count:120,btnTimer:null,record:null},		//按钮倒计时
	title: '车主身份验证',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 530,
	border:false,
	height:200,
//	autoScroll:true,
	modal : true,
	maximizable : true,
	listeners:{
		beforeclose : function(){
			if(this.config.btnTimer!=null){
				clearTimeout(this.config.btnTimer);
			}
		}
	},
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 15,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.vehicle.PrivateVehicle',
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 70,
				btns:[],
				items: [
					{fname:'VEHICLE_ID',hidden:true},
					{fname:'PLATE_NUM',readOnly:true,colspan:2},
					{fname:'OWNER_PHONE',readOnly:true,fieldLabel:'车主手机:'},
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'icon-save white',
						text : '发送验证码',
						handler:function(btn){
							var data=btn.up('form').getValues();
							var url='common/sms/sendverifysms';
							app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,{VEHICLE_ID:data.VEHICLE_ID,OWNER_PHONE:data.OWNER_PHONE,PLATE_NUM:data.PLATE_NUM},function(ret){
								if( ret.data==true ){
									Ext.Msg.alert('系统提示','发送成功！');
									me.setTime(btn);
									btn.up('form').getForm().findField('VERIFY_CODE').setDisabled(false);
								}else{
									Ext.Msg.alert('系统提示','发送失败，错误原因：'+ret.data);
								}
							});
						}
					},
					{xtype:'field',fieldLabel:'验证码:',name:'VERIFY_CODE',width:225},
					{
						xtype : 'button',
						itemId : 'verifyBtn',
						iconCls : 'icon-save white',
						text : '验证',
						handler:function(btn){
							var data=btn.up('form').getValues();
							var params={VERIFY_CODE:data.VERIFY_CODE,VEHICLE_ID:data.VEHICLE_ID};
							var url='common/sms/verifysms';
							app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
								if( ret.data ){
									Ext.Msg.alert('系统提示','验证成功！');
									btn.up('window').down('#viewBtn').setDisabled(false);
								}else{
									Ext.Msg.alert('系统提示','验证失败！');
								}
							});
						}
					}
				]
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
						itemId : 'viewBtn',
						iconCls : 'icon-save blue',
						text : '查看档案',
						disabled:true,
						handler : function(btn){
							var win =	Ext.create('app.view.repair.PrivateVehicleFile',{title:'<i class="' + btn.iconCls + '"></i> 维修记录查看'});
							win.show();
							win.loadData(me.config.record);
						}
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-off red',
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
		me.config.record=record;
	},
	setTime : function(btn) { 
		var me=this;
		if (me.config.count == 0) { 
			btn.setDisabled(false);
			btn.setText('获取验证码'); 
			me.config.count = 120; 
			clearTimeout(me.config.btnTimer);
			return false;
		} else { 
			btn.setDisabled(true);
			btn.setText('重新发送(' + me.config.count + ')'); 
			me.config.count--; 
		}
		me.config.btnTimer=setTimeout(function() { 
			me.setTime(btn);
		},1000);
	} 
});
