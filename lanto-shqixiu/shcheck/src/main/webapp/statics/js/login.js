Ext.Loader.setConfig({
			enabled : true,
			paths : {
				imc : './app',
				jsf : './jsf'
			}
		});
		Ext.onReady(function() {
			Ext.Ajax.on('requestexception', function(conn, response, options) {
					if (response.status == '0') {
						Ext.Msg.alert('错误信息', '无法访问网络,请检查网络连接是否正常!');
					} else if (response.status == '403') {
						Ext.Msg.alert('错误信息', '服务器拒绝访问!');
					} else if (response.status == '404') {
						Ext.Msg.alert('错误信息', '[404]您访问的地址不存在!');
					} else {
						Ext.Msg.alert('错误信息', 'response.status='
										+ response.status);
					}
				});
				Ext.Ajax.on('requestcomplete',
				function(conn, response, options, eOpts) {
					try {
						var obj = eval('(' + response.responseText + ')');
						// 130
						if (!Ext.isEmpty(obj.Exception)) {
							Ext.MessageBox.alert('警告', obj.title + "，错误原因："
											+ obj.Exception.message);
						}
					} catch (e) {
					}
				});
		var view = new Ext.container.Viewport({
			layout:'fit',
			items : [{
	    		xtype:'component',
	    		style:'background-color: #97cceb;'
	    	}]
		});
		var win = new Ext.window.Window({
			width : 680,
			closeAction : "hide",
			icon : "images/menus/1002.png",
			id : "window1",
			autoShow : true,
			title : "用户登录",
			height : 384,
			closable : false,
			layout : "border",
			resizable : false,
			listeners : {
				show : function(win, options) {
					if(!Ext.isEmpty(msg)){
						Ext.Msg.alert('错误提示',msg);
					}
//					var userId = getCookieValue("EXT_CLIENT_LOGIN_USERID_COOKIE");
//					var userPw = getCookieValue("EXT_CLIENT_LOGIN_USERPW_COOKIE");
//					if(!Ext.isEmpty(userId) && !Ext.isEmpty(userPw)){
//						win.down('[id=userID]').setValue(decodeURIComponent(userId));
//						win.down('[id=userPW]').setValue(userPw);
//					}else{
//						win.down('[id=userID]').focus(false, true);
//					}
				}
			},
			items : [{
				id : "panel1",
				region : "center",
				layout : "absolute",
				frame:true,
				xtype : "form",
				items : [{
					xtype:'component',
					id : "titleLbl",
					border:0,
					cls : "app-header-title-classic",
					x : 10,
					width : 600,
					y : 10,
					html:'<div style="line-height:30px;">' +
							'<div style="font-size:23px;font-family: Arial,宋体;">上海市汽车维修行业综合信息管理平台</div>' +
							'<div style="font-size:18px;font-family: Arial,宋体;text-align:right;padding-right:200px;">汽车电子健康档案系统.</span><span style="font-size:15px;">维修企业端</div>' +
						'</div>'
				}, {
					id : "warnLbl",
					text : "",
					width : 248,
					x : 16,
					xtype : "label",
					y : 226 + 4
				}, {
					id : "infoLbl",
					text : "",
					style:'color:#04408c;',
					width : 248,
					x : 16,
					xtype : "label",
					y : 88 + 4
				}, {
					id : "wbImg",
					src : "images/logo_yz.png",
					y : 10,
					x : 480,
					xtype : "image",
					width : 175,
					height : 50
				}, {
					id : "fieldSet1",
					title : "用户登录",
					height : 176,
					layout : "absolute",
					width : 287,
					y : 88,
					x : 350,
					xtype : "fieldset",
					items : [{
								id : "userLbl",
								text : "用户名:",
								width : 65,
								x : 8,
								xtype : "label",
								y : 16 + 4
							}, {
								id : "userID",
								name : "userID",
								allowBlank : false,
								maxLength:25,
								msgTarget: 'side',
								width : 208,
								y : 16,
								x : 48,
								emptyText:'请输入用户名',
								xtype : "textfield"
							}, {
								id : "pwdLbl",
								text : "密 码:",
								width : 65,
								x : 8,
								xtype : "label",
								y : 50 + 4
							}, {
								id : "userPW",
								name : "userPW",
								allowBlank : false,
								//vtype:'alphanum',
								maxLength:18,
								minLength:6,
								msgTarget: 'side',
								width : 208,
								y : 50,
								x : 48,
								emptyText:'请输入登录密码',
								xtype : 'textfield',
								inputType : 'password'
							},{
								id : "codeLbl",
								text : "验证码:",
								width : 65,
								x : 8,
								xtype : "label",
								y:85 + 4
							},{
								id : "randCode",
								name : "randCode",
								allowBlank : false,
								y:85,
								x : 48,
								width : 130,
								emptyText:'请输入验证码',
								xtype : "textfield"
							}, {
								xtype : "image",
								id:'randimage',
								y:85,
								x : 178,
								src:'client/randcode',
								listeners: {
							        click: {
							            element: 'el',
							            fn: function(a,b,c){
							            	Ext.getCmp('randimage').setSrc('client/randcode?d=' + new Date().getTime());
							            }
							        }
							    },
								width : 78,
								height:22
							},{
								id : "loginBtn",
								width : 100,
								y : 122,
								x : 40,
								xtype : "button",
								text : "登 录",
								height : 22,
								listeners : {
									click : function(button, event, options) {
										var form = button.up('form').getForm();
//										var memory = form.findField('memory').getValue();
										var params = form.getValues();
										if(form.isValid()){
											win.setLoading("正在登录...请稍候...");
											Ext.Ajax.request({
										  		 params : params,
										  	 	 url: 'client/login.do',
										  	     method : 'POST',
										  	     success: function(response, opts) {
										  	        var ret = Ext.decode(response.responseText);
										  	        if(ret.success){
										  		        if(ret.data == true) {
										  		        	win.setLoading("登录成功...正在进入系统...");
//										  		        	var d = new Date(new Date().getTime() + 365*24*60*60*1000);
															var date = new Date();
//										  		        	if(memory){
//										  		        		var uid = encodeURIComponent(params.userID);
//														        document.cookie = "EXT_CLIENT_LOGIN_USERID_COOKIE=" + uid + "; expires="+ d.toGMTString();
//														        document.cookie = "EXT_CLIENT_LOGIN_USERPW_COOKIE=" + params.userPW + "; expires="+ d.toGMTString();
//															}else{
																document.cookie = "EXT_CLIENT_LOGIN_USERID_COOKIE=; expires=" + date.toGMTString();
														        document.cookie = "EXT_CLIENT_LOGIN_USERPW_COOKIE=; expires=" + date.toGMTString();
//															}
										  		        	window.location = 'main.html';
										  	            } else {
										  	            	win.setLoading(false);
										  	                Ext.Msg.alert('错误提示',ret.data);
										          			return false;
										  	            }
										              }else{
										              	win.setLoading(false);
										          		return false;
										              }
										  	    },
										  	    failure: function (response, opts) {
									            	win.setLoading(false);
									            }
										  	});
										}
									}
								}
							},{
								xtype:'button',
								width:100,
								y:122,
								x:158,
								text:'重 置',
								iconCls:'reset_button',
								handler:function(button){
									var form = button.up('form').getForm();
									form.reset();
									win.down('[id=userID]').focus(false, true);
								}
							}]
				}]
			}, {
				id : "panel2",
				region : "south",
				frame : true,
				height : 73,
				layout : "absolute",
				xtype : "panel",
				items : [{
							id : "copyrightLbl",
							text : "技术支持：广州军软科技有限公司  联系电话：020-87733788.",
							width : 408,
							style:'color:#04408c;',
							x : 8,
							xtype : "label",
							y : 6 + 4
						}, {
							id : "putdbLbl",
							width : 408,
							html : "温馨提示：登陆系统需要WEB功能插件支持 【<a href='js/plugin/Setup.exe' target='_blank'>点击下载插件<\/a>】.",
							x : 8,
							style:'color:#04408c;',
							xtype : "label",
							y : 35 + 4
						}]
			}]
		});

		var fun = function() {
			var button = win.down('button[id=loginBtn]');
			if (!Ext.isEmpty(button.handler)) {
				button.handler(button);
			} else {
				button.fireEvent('click', button);
			}
		};
		new Ext.KeyMap(Ext.getBody(), [{
			target : "my-element",
			key : Ext.EventObject.ENTER, // or
			fn : fun,
			scope : this
		}]);

	});

	var getCookieValue = function(name){
        var cookies = document.cookie.split('; '),
            i = cookies.length,
            cookie, value;

        while(i--) {
           cookie = cookies[i].split('=');
           if (cookie[0] === name) {
               value = cookie[1];
           }
        }

        return value;
    }
