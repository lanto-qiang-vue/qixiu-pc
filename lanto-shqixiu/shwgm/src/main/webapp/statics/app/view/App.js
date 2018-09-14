Ext.Loader.setConfig({
			enabled : true,
			paths : {
				app : './app',
				jsf : './jsf'
			}
		});

Ext.application({
	name : 'app',
	appFolder : 'statics/app',

	requires : ['app.utils.DictUtil',
				'app.utils.AjaxCallbackUtil',
				'app.utils.CommonUtil',
				'app.utils.FunUtils',
				'app.utils.SysCodes',
				'app.utils.AttachCodes',
				'app.utils.ButtonUtils',
				'app.utils.TaskUtils',
				'app.utils.vtype.CommonVtype'],

	models : [],
	stores : [],
	views : [],
	controllers : ['MainCtrl'],

	launch : function() {
		if(loginTag == 'trans'){
			taskutils.appInfos = {
				image:'statics/images/logintrans.png',
    			title:'运输端',
    			requires:['app.store.CasecadeCode',
						'app.store.BelongArea']
			};
		}
		Ext.Ajax.timeout = 1200000; // 设置超时为20分钟
		Ext.Ajax.on('requestexception', function(conn, response, options) {
					if (response.getResponseHeader("sessionstatus") == "timeout") {
						// 用户登陆超时需重新登陆
						fn = function() {
							Ext.getCmp('manage_viewport').destroy();
							Ext.create('app.view.LoginView');
						};
						Ext.MessageBox.alert('警告', "登陆超时,请重新登陆!", fn);
					} else if (response.status == '0') {
						Ext.Msg.alert('错误信息', '无法连接到服务器,请检查网络连接是否正常!');
					} else if (response.status == '403') {
						Ext.Msg.alert('错误信息', '服务器拒绝访问!');
					} else if (response.status == '404') {
						Ext.Msg.alert('错误信息', '[404]您访问的地址不存在!');
					} else {
						Ext.Msg.alert('错误信息', 'response.status='
										+ response.status);
					}
				});
		// 增加success=false时导致的显示的后台异常信息
		Ext.Ajax.on('requestcomplete',
				function(conn, response, options, eOpts) {
					try {
						app.utils.TaskUtils.exp = app.utils.TaskUtils.maxExp;
						var obj = eval('(' + response.responseText + ')');
						// 130
						if (!Ext.isEmpty(obj.Exception)) {

							var fn = Ext.emptyFn;
							if (obj.Exception.message.indexOf("用户登陆超时,请重新登陆") != -1) {
								// 用户登陆超时需重新登陆
								fn = function() {
									Ext.getCmp('manage_viewport').destroy();
									Ext.create('app.view.LoginView');
								};
							}
							Ext.MessageBox.alert('警告', obj.title + "，错误原因："
											+ obj.Exception.message);
						}else{
							if(obj.title){
								Ext.MessageBox.alert('警告', obj.title);
							}
						}
					} catch (e) {
						// pass
					}

				});

		// 默认用post来传递参数防止中文乱码和默认传输格式
		Ext.data.proxy.Ajax.override({
					type : 'ajax',
					"reader" : {
						"type" : "json",
						"root" : "data"
					},
					actionMethods : {
						create : 'POST',
						read : 'POST',
						update : 'POST',
						destroy : 'POST'
					},
					timeout : 1200000
				});
				
		Ext.form.field.HtmlEditor.override({
			fontFamilies: ["宋体", "隶书", "黑体", "楷体", "Arial", "Courier New", "Tahoma", "Times New Roman", "Verdana"]
		});
		Ext.form.field.ComboBox.override({
					editable : false
				}); // 默认下拉框只能使用下拉选择.不允许手动填写
		Ext.form.field.Text.override({
					readOnlyCls : 'csm-textbox-disabled'
				});
		Ext.form.field.Trigger.override({
					triggerNoEditCls : 'csm-textbox-disabled'
				});
		Ext.grid.column.RowNumberer.override({
					align : 'center',
					width : 50
				});
		Ext.form.field.Base.override({
					labelAlign : 'right'
				});
		Ext.form.FieldContainer.override({
					labelAlign : 'right'
				});
				
//		Ext.toolbar.Toolbar.override({
//					ui: 'footer'
//				});
				

		/** 全局enter键 查询 事件 2014-7-8 sly* */
		Ext.window.Window.override({
					listeners : {
						'show' : function(obj, e) {
							var btns = obj.query('button');
							var button = null;
							Ext.each(btns, function(btn) {
										if (!Ext.isEmpty(btn.text)
												&& btn.text.indexOf('查') != -1
												&& btn.text.indexOf('询') != -1) {
											button = btn;
										}
									});
							if (button != null) {
								var fun = function() {
									if (!Ext.isEmpty(button.handler)) {
										button.handler(button);
									} else {
										button.fireEvent('click', button);
									}
								};
								new Ext.KeyMap(obj.getEl(), [{
													target : "my-element",
													key : Ext.EventObject.ENTER, // or
													fn : fun,
													scope : this
												}])
							}
						}
					}
				});
		Ext.panel.Panel.override({
			listeners : {
				'show' : function(obj, e) {
					var btns = obj.query('button');
					var buttons = [];
					Ext.each(btns, function(btn) {
								if (!Ext.isEmpty(btn.text)
										&& btn.text.indexOf('查') != -1
										&& btn.text.indexOf('询') != -1) {
									buttons.push(btn);
								}
							});
					if (buttons.length > 0) {
						Ext.each(buttons, function(button) {
									obj.ownerCt.setActive(obj);
									obj.focus(false, 100);
									var fun = function() {
										if (!Ext.isEmpty(button.handler)) {
											button.handler(button);
										} else {
											button.fireEvent('click', button);
										}
									};
									new Ext.KeyMap(obj.getEl(), [{
														target : "my-element",
														key : Ext.EventObject.ENTER, // or
														fn : fun,
														scope : this
													}])
								});
					}
				}
			}
		});

		// Ext.grid.Panel.override({});

		// grid default
		// Ext.grid.column.Column.override({align: 'center'});
		// GRID列标题居中对齐，内容左对齐
		Ext.grid.column.Column.override({
					style : 'text-align:center',
					align : 'left'
				});
		Ext.tree.Column.override({
					align : 'left'
				}); // tree left
		Ext.grid.Panel.override({
					enableHdMenu : false,// 是否显示表头的上下文菜单，默认为true
					enableColumnHide : true, // 不允许隐藏列
					viewConfig : {
						forceFit : true,
						stripeRows : true
					},
					columnLines : true
				});

		// Ext.form.field.Text.override({labelAlign: 'right'});
		// Ext.form.field.Display.override({labelAlign: 'right'});
		// Ext.form.FieldContainer.override({labelAlign: 'right'});

		Ext.override(Ext.grid.RowEditor, {
					addFieldsForColumn : function(column, initial) {
						var me = this, i, length, field;
						if (Ext.isArray(column)) {
							for (i = 0, length = column.length; i < length; i++) {
								me.addFieldsForColumn(column[i], initial);
							}
							return;
						}
						if (column.getEditor) {
							// Get a default display field if necessary
							field = column.getEditor(null, {
										xtype : 'displayfield',
										// Override Field's implementation so
										// that the default display fields will
										// not return values. This is done
										// because
										// the display field will pick up column
										// renderers from the grid.
										getModelData : function() {
											return null;
										}
									});
							if (column.align === 'right') {
								field.fieldStyle = 'text-align:right';
							}
							if (column.xtype === 'actioncolumn') {
								field.fieldCls += ' ' + Ext.baseCSSPrefix
										+ 'form-action-col-field'
							}
							// Adding onfield change
							me.mon(field, 'change', me.onFieldChange, me);
							if (me.isVisible() && me.context) {
								if (field.is('displayfield')) {
									me.renderColumnData(field,
											me.context.record, column);
								} else {
									field.suspendEvents();
									field.setValue(me.context.record
											.get(column.dataIndex));
									field.resumeEvents();
								}
							}
							if (column.hidden) {
								me.onColumnHide(column);
							} else if (column.rendered && !initial) {
								// Setting after initial render
								me.onColumnShow(column);
							}
						}
					}
				});

		// 明细页特殊数据显示格式处理
		Ext.override(Ext.form.DisplayField, {
					getValue : function() {
						return this.value;
					},
					setValue : function(v) {
						this.value = v;
						this.setRawValue(this.formatValue(v));
						return this;
					},
					formatValue : function(v) {
						if (this.numberFormat && typeof v == 'number') {
							return Ext.util.Format.number(v, this.numberFormat);
						}
						if (this.dictFormat) {
							var store = Ext.getStore('dict.' + this.dictFormat);
							var record = store.findRecord("code", v);
							return record ? record.get("name") : v;
						}
						return v;
					}
				});

		// 禁用IE的Backspace（退格键），但输入文本时不禁止
		Ext.getDoc().on('keydown', function(e) {
			if (e.getKey() == 8 && e.getTarget().type == 'text'
					&& !e.getTarget().readOnly) {

			} else if (e.getKey() == 8 && e.getTarget().type == 'textarea'
					&& !e.getTarget().readOnly) {

			} else if (e.getKey() == 8 && e.getTarget().type == 'password'
					&& !e.getTarget().readOnly) {

			} else if (e.getKey() == 8) {
				e.preventDefault();
			}
		});
	//	Ext.draw.engine.ImageExporter.defaultUrl = 'manage/common/fileUpload/svg';
		
		if(taskutils.isLogin()){
			Ext.create('app.view.Viewport');
		}else{
			Ext.create('app.view.LoginView');
		}	
	}
});
