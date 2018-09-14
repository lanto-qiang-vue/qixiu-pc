Ext.define('app.view.LoginView', {
	extend : 'Ext.container.Viewport',
	layout: 'fit',
	id:'login_viewport',
	requires : [],
	listeners:{
		afterrender:function(){
			Ext.get('appOverlay').hide();
		}
	},
	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'container',
			style:'background: url(statics/images/register-bg-20160908.jpg) no-repeat scroll center center transparent;transition: .3s;',
			tpl:['<div class="header">',
					'<div class="header-wrap">',
						'<h1 class="header-logo"></h1>',
					'</div>',
				'</div>',
				'<div class="login_container">',
					'<div class="link-con">',
						'<a id="registerLink" target="_blank" style="background: url(' + taskutils.appInfos.image + ') center right no-repeat;  background-size:550px 550px;">',
						'</a>',
					'</div>',
					'<div class="form-con">',
						'<div class="my-form" id="step1">',
//							'<form id="step1Form" novalidate="novalidate">',
//								'<div class="control-box">',
//									'<div class="warn" id="warn1"><label for="muserID" class="error" id="error_text">{err}</label></div>',
//									'<div class="control-form">',
//										'<input type="text" id="muserID" name="userName" tabindex="1" class="ui-input error" value="" placeholder="请输入帐号" autocomplete="off">',
//									'</div>',
//									'<div class="control-form">',
//										'<input type="password" id="muserPW" name="password" id="password" tabindex="2" class="ui-input error" placeholder="请输入密码" autocomplete="off">',
//									'</div>',
//									'<div class="control-form">',
//										'<input type="text" name="verfCode" tabindex="2" id="mrandCode" class="ui-input error" placeholder="请输入图片识别码" autocomplete="off">',
//										'<img src="manage/randcode" title="点击刷新图片" height="40" width="105" class="auth-image" id="randCode_image">',
//									'</div>',
//									'<div class="control-form" style="margin-top:50px;" id="btn_container">',
//										'<input type="button" id="loginBtn1" tabindex="6" class="ui-btn ui-btn-blue" value="登录">',
//									'</div>',
//								'</div>',
//							'</form>',
						'</div>',
					'</div>',
				'</div>'],
				listeners:{
					render:function(con){
						app.utils.TaskUtils.stopTask();
						var form = Ext.create('Ext.form.Panel',{
					        border: false,
					        bodyPadding:40,
					        maxWidth:340,
					        cls:'login-form',
					        renderTo:'step1',
					        bodyStyle:'background: none;',
					        layout: {
					            type: "vbox",
					            align: "stretch"
					        },
					        fieldDefaults: {
						        msgTarget: 'side'
						    },
					        defaults: {
					            labelAlign:'right',
					            labelWidth:50,
					            msgTarget: 'side'
					        }, 
					        items: [{
					            xtype: "textfield",
					            name: "userID",
					            triggerCls: 'icon-user',
			                	editable:true,
					            height:30,
					            allowBlank: false,
					            emptyText: "请输入帐号",
					            onTriggerClick: function(e) {
					            }
					        }, {
					            xtype: "textfield",
					            triggerCls: 'icon-key',
					            margin: "15 0 0 0",
					            emptyText: "请输入密码",
					            height:30,
					            inputType: "password",
					            name: "userPW",
					            allowBlank: false
					        },{
					        	xtype:'fieldcontainer',
					        	margin: "20 0 0 0",
					        	layout: {
						            type: "hbox",
						            pack:'start'
						        },
						        items:[{
						            xtype: "textfield",
						            triggerCls: 'icon-hand-right',
						            name: "randCode",
						            flex:1,
						            height:30,
						            allowBlank: false,
						            emptyText: "请输入右边图片验证码"
						        },{
						        	xtype : "image",
									id:'randimage',
									src:'check/randcode?d=' + new Date().getTime(),
									listeners: {
								        click: {
								            element: 'el', 
								            fn: function(a,b,c){
								            	Ext.getCmp('randimage').setSrc('check/randcode?d=' + new Date().getTime());
								            }
								        }
								    },
									width : 78,
									height:30
						        }]
					        }, {
					            xtype: "fieldcontainer",
					            layout: "hbox",
					             margin:'20 0 20 5',
					            items: [{
					                xtype: "checkboxfield",
					                flex: 1,
					                name:'is_memory',
					                cls: "form-panel-font-color rememberMeCheckbox",
					                height: 30,
					                bind: "{persist}",
					                boxLabel: "记住帐号"
					            }, {
					                xtype: "box",
					                html: '<a href="javascript:void(0);" data-qtitle="忘记密码？" data-qtip="如果您忘记密码请联系统管理员！" class="link-forgot-password"> 忘记密码 ?</a>'
					            }]
					        },{
					        	xtype:'component',
					        	html:'<div class="bt-blue">登 录 <i class="icon-circle-arrow-right white bigger-180" style="position: absolute;right:0px;margin:2px 5px;"></i></div>',
					        	listeners:{
					        		click: {
							            element: 'el', 
							            fn: function(){
							            	me.doLogin(form);
										}
							        }
					        	}
					        }]
					    });
						me.initKeyMap(form);
					}
				}
		}]
		me.callParent();
		me.down('container').data = {name:'www',err:''};
	},
	doLogin:function(form){
		var me = this;
		if(!form.isValid()){
    		return;
    	}
		var params = form.getValues();
		var url = 'check/login.do';
		form.setLoading("正在登录...请稍候...");
		if(me.keyMap){
			me.keyMap.disable();
		}
		Ext.Ajax.request({
	  		 params : params,
	  	 	 url: url,
	  	     method : 'POST',
	  	     success: function(response, opts) {
	  	        var ret = Ext.decode(response.responseText);
	  	        if(ret.success){
	  	        	form.setLoading(false);
	  		        if(ret.data == true) {
						Ext.getCmp('login_viewport').destroy();
						Ext.create('app.view.Viewport');
	  	            } else {
	  	            	form.setLoading(false);
	  	                Ext.Msg.alert('错误提示',ret.data);
						me.initKeyMap(form);
	          			return false;
	  	            }
	              }else{
	              	form.setLoading(false);
					me.initKeyMap(form);
	          		return false;
	              }
	  	    },
	  	    failure: function (response, opts) {
            	form.setLoading(false);
				me.initKeyMap(form);
            }
	  	});
	},
	onDestroy:function(){
		var me = this;
		me.keyMap.disable();
	},
	initKeyMap:function(form){
		var me = this;
		var fun = function() {
			me.doLogin(form);
		};
		me.keyMap = new Ext.KeyMap(Ext.getBody(), [{
			target : "my-element",
			key : Ext.EventObject.ENTER, // or
			fn : fun,
			scope : this
		}]);
	}
});
