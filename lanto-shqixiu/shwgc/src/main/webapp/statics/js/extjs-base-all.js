if (typeof console === "undefined") {
	console = {
		log : function() {
		},
		info : function() {
		},
		warn : function() {
		},
		error : function() {
		}
	}
}
Ext.define("Ext.locale.zh_CN.view.AbstractView", {
			override : "Ext.view.AbstractView",
			loadingText : "读取中..."
		});
Ext.JSON.encodeDate = function(a) {
	return Ext.Date.format(a, '"Y-m-d H:i:s"')
};
Ext.Ajax.on("requestexception", function(c, a, b) {
			if (a.status == "0") {
				Ext.Msg.alert("错误信息", "无法访问网络,请检查网络连接是否正常!")
			} else {
				if (a.status == "403") {
					Ext.Msg.alert("错误信息", "服务器拒绝访问!")
				} else {
					Ext.Msg.alert("错误信息", "response.status=" + a.status)
				}
			}
		});
Ext.Ajax.on("requestcomplete", function(f, b, d, e) {
			var c = Ext.decode(b.responseText);
			if (!c.success) {
				if (c.errCode == "USER_NOT_LOGON") {
					Ext.Msg.alert("错误信息", "当前用户未登录，请重新登录!", function a() {
								window.location = "index.html"
							})
				} else {
					if (c.errCode == "ACCESS_DENIED") {
						Ext.Msg.alert("错误信息", "系统拒绝访问," + c.msg)
					} else {
						Ext.Msg.alert("错误信息", c.msg)
					}
				}
			}
		});
Ext.apply(Ext.data.Field, {
			useNull : true
		});
Ext.define("jsf.data.VO", {
			extend : "Ext.data.Model",
			fields : [{
						name : "extras",
						label : "扩展"
					}]
		});
Ext.define("jsf.data.PO", {
			extend : "jsf.data.VO",
			fields : [{
						name : "id",
						type : "string",
						label : "主键"
					}, {
						name : "ver",
						type : "int",
						label : "版本"
					}, {
						name : "crtBy",
						type : "string",
						label : "创建人"
					}, {
						name : "crtDate",
						type : "date",
						label : "创建时间",
						dateFormat : "Y-m-d H:i:s"
					}, {
						name : "mdfBy",
						type : "string",
						label : "修改人"
					}, {
						name : "mdfDate",
						type : "date",
						label : "修改时间",
						dateFormat : "Y-m-d H:i:s"
					}]
		});
Ext.form.field.Base.prototype.metaQueryRegExp = new RegExp("^(lk|eq|rg|lt|lte|gt|gte)$");
Ext.form.field.Base.prototype.metaShowTypeRegExp = new RegExp("^(search|edit|display)$");
Ext.form.field.Base.prototype.doMetaName = function(a) {
	if (Ext.isEmpty(this.meta.showType)
			|| !this.metaShowTypeRegExp.test(this.meta.showType)) {
		this.meta.showType = "edit"
	}
	if (this.meta.showType == "display") {
		Ext.apply(a, {
					readOnly : true
				})
	}
	if (!Ext.isEmpty(this.name) || Ext.isEmpty(this.meta.name)) {
		return a
	}
	if (this.meta.showType == "search"
			&& this.metaQueryRegExp.test(this.meta.query)
			&& this.meta.query != "rg") {
		return Ext.apply(a, {
					name : this.meta.name + "_" + this.meta.query
				})
	} else {
		return Ext.apply(a, {
					name : this.meta.name
				})
	}
};
Ext.form.field.Base.prototype.doMetaReq = function(a) {
	if (this.meta.showType == "edit") {
		if (this.meta.req == true) {
			Ext.apply(a, {
						allowBlank : false,
						beforeLabelTextTpl: required
					});
			if (!Ext.isEmpty(a.fieldLabel)) {
				Ext.apply(a, {
						beforeLabelTextTpl: required
					});
			}
		}
	}
};
Ext.form.field.Base.prototype.doMetaLabel = function(a) {
	if (!Ext.isEmpty(this.fieldLabel)) {
		return a
	}
	if (Ext.isEmpty(this.meta.label) && Ext.isEmpty(this.meta.name)) {
		return a
	}
	return Ext.apply(a, {
				fieldLabel : Ext.isEmpty(this.meta.label)
						? this.meta.name
						: this.meta.label
			})
};
Ext.form.field.Base.prototype.metaLenRegExp = new RegExp("^([0-9]+-[0-9]+|[0-9]+)$");
Ext.form.field.Base.prototype.doMetaLen = function(b) {
	if (!this.metaLenRegExp.test(this.meta.len)) {
		return b
	}
	if (this.meta.showType == "display") {
		return b
	}
	if (this.meta.showType == "search") {
		if (Ext.isNumber(this.meta.len)) {
			return Ext.apply(b, {
						maxLength : Math.round(this.meta.len)
					})
		} else {
			var a = this.meta.len.lastIndexOf("-");
			if (a > 0) {
				return Ext.apply(b, {
							maxLength : parseInt(this.meta.len.substr(a + 1))
						})
			} else {
				return Ext.apply(b, {
							maxLength : parseInt(this.meta.len)
						})
			}
		}
	} else {
		if (Ext.isNumber(this.meta.len)) {
			return Ext.apply(b, {
						maxLength : Math.round(this.meta.len),
						minLength : Math.round(this.meta.len)
					})
		} else {
			var a = this.meta.len.lastIndexOf("-");
			if (a > 0) {
				return Ext.apply(b, {
							minLength : parseInt(this.meta.len.substr(0, a)),
							maxLength : parseInt(this.meta.len.substr(a + 1))
						})
			} else {
				return Ext.apply(b, {
							maxLength : parseInt(this.meta.len),
							minLength : parseInt(this.meta.len)
						})
			}
		}
	}
};
Ext.form.field.Base.prototype.metaValRangeRegExp = new RegExp("^-?\\d+--?\\d+$");
Ext.form.field.Base.prototype.doMetaVal = function(c) {
	var b = this;
	if (Ext.isEmpty(b.meta.val)) {
		return c
	}
	if (this.meta.val.indexOf("dict|") == 0) {
		return Ext.apply(c, {
					store : b.meta.val.substr(5),
					queryMode : "local",
					displayField : "name",
					valueField : "code"
				})
	} else {
		if (this.meta.val.indexOf("dist|") == 0) {
			return Ext.apply(c, {
				queryMode : "local",
				displayField : "val",
				valueField : "val",
				jsflisteners : {
					beforerender : {
						scope : b,
						single : true,
						fn : function(d) {
							Ext.Ajax.request({
								url : b.meta.val.substr(5),
								timeout : 30000,
								params : b.params,
								method : "POST",
								success : function(e, h) {
									var f = Ext.decode(e.responseText);
									if (Ext.isArray(f.data)) {
										b.store = Ext.create("Ext.data.Store",
												{
													fields : ["val"]
												});
										if (b.blankItem == true) {
											b.store.add({
														val : b.blankItemText
													})
										}
										for (var g = 0; g < f.data.length; g++) {
											b.store.add({
														val : f.data[g]
													})
										}
										if (b.meta.showType == "edit"
												|| b.blankItem == true) {
											if (!Ext.isEmpty(b.store)
													&& b.store.count() > 0) {
												b.select(b.store.getAt(0))
											}
										}
									}
								}
							})
						}
					}
				}
			})
		} else {
			if (b.meta.val.indexOf("vtype|") == 0 && b.meta.showType == "edit") {
				return Ext.apply(c, {
							vtype : b.meta.val.substr(6)
						})
			} else {
				if (this.meta.val.indexOf("regex|") == 0
						&& b.meta.showType == "edit") {
					return Ext.apply(c, {
								regex : new RegExp(b.meta.val.substr(6)),
								regexText : "非法输入值，与正则表达式"
										+ this.meta.val.substr(6) + "不匹配!"
							})
				} else {
					if (this.metaValRangeRegExp.test(this.meta.val)) {
						var a = 0;
						if (this.meta.val.indexOf("-") == 0) {
							a = this.meta.val.indexOf("-", 1)
						} else {
							a = this.meta.val.indexOf("-")
						}
						return Ext.apply(c, {
									minValue : parseFloat(this.meta.val.substr(
											0, a)),
									maxValue : parseFloat(this.meta.val
											.substr(a + 1))
								})
					}
				}
			}
		}
	}
	return c
};
Ext.form.field.Base.prototype.doMerge = function(a) {
	if (!Ext.isObject(a)) {
		return
	}
	if (Ext.isObject(a.jsflisteners)) {
		if (Ext.isObject(this.listeners)) {
			Ext.merge(this.listeners, a.jsflisteners)
		} else {
			this.listeners = {};
			Ext.apply(this.listeners, a.jsflisteners)
		}
		delete a.jsflisteners
	}
	Ext.apply(this, a)
};
Ext.define("jsf.form.field.ComboBoolean", {
			extend : "Ext.form.ComboBox",
			alias : "widget.jsf.ComboBoolean",
			editable : false,
			initComponent : function() {
				var c = this;
				try {
					c.store = [[true, "是"], [false, "否"]];
					if (!Ext.isEmpty(c.meta)) {
						var a = {
							editable : false
						};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments);
				if (c.meta && c.meta.showType == "edit") {
					if (!Ext.isEmpty(c.store) && c.store.count() > 0) {
						c.select(c.store.getAt(0))
					}
				}
			}
		});
Ext.define("jsf.form.field.ComboDict", {
			extend : "Ext.form.field.ComboBox",
			alias : "widget.jsf.ComboDict",
			blankItem : false,
			blankItemText : "\u00a0",
			editable : false,
			itemFilter : null,
			initComponent : function() {
				var d = this;
				try {
					if (!Ext.isEmpty(d.meta)) {
						var a = {};
						d.doMetaName(a);
						d.doMetaLabel(a);
						if (!Ext.isEmpty(d.meta.val)
								&& d.meta.val.indexOf("dict|") == 0) {
							d.doMetaVal(a)
						}
						d.doMetaReq(a);
						d.doMerge(a);
						if (Ext.isString(d.store)) {
							if (Ext.getStore(d.store) == null) {
								d.emptyText = "Dict [" + d.store
										+ "] not found!";
								d.store = null
							} else {
								var b = [];
								d.store = Ext.getStore(d.store);
								d.store.each(function(e) {
											if (d.doItemFilter(e)) {
												b.push(e.copy())
											}
										});
								d.store = Ext.create("Ext.data.Store", {
											fields : ["code", "name"]
										});
								d.store.add(b)
							}
						}
						if (d.blankItem == true && d.store != null) {
							var b = [{}];
							b[0][d.valueField] = null;
							b[0][d.displayField] = d.blankItemText;
							d.store.each(function(e) {
										if (d.doItemFilter(e)) {
											b.push(e.copy())
										}
									});
							d.store = Ext.create("Ext.data.Store", {
										fields : ["code", "name"]
									});
							d.store.add(b)
						}
					}
				} catch (c) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + c.name + " message=" + c.message)
				}
				d.callParent(arguments);
				if (d.meta.showType == "edit" || d.blankItem == true) {
					if (!Ext.isEmpty(d.store) && d.store.count() > 0) {
						d.select(d.store.getAt(0))
					}
				}
			},
			doItemFilter : function(b) {
				var a = this;
				if (Ext.isArray(a.itemFilter)) {
					return Ext.Array.contains(a.itemFilter, b.get("code"))
							? true
							: false
				} else {
					if (Ext.isFunction(a.itemFilter)) {
						return a.itemFilter(b) ? true : false
					} else {
						return true
					}
				}
			}
		});
Ext.define("jsf.form.field.ComboDist", {
			extend : "Ext.form.field.ComboBox",
			alias : "widget.jsf.ComboDist",
			blankItem : false,
			blankItemText : "\u00a0",
			queryMode : "local",
			params : null,
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						if (!Ext.isEmpty(c.meta.val)
								&& c.meta.val.indexOf("dist|") == 0) {
							c.doMetaVal(a)
						}
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.ComboModel", {
			extend : "Ext.form.field.ComboBox",
			alias : "widget.jsf.ComboModel",
			model : null,
			store : null,
			storeId : null,
			url : null,
			params : null,
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
					if (Ext.isEmpty(Ext.ModelManager.getModel(c.model))) {
						Ext.syncRequire(c.model)
					}
					if (Ext.isEmpty(c.store)) {
						if (!Ext.isEmpty(c.storeId)) {
							c.store = Ext.getStore(c.storeId)
						} else {
							if (!Ext.isEmpty(c.url)) {
								c.store = Ext.create("Ext.data.Store", {
											model : c.model,
											autoLoad : true,
											autoSync : false,
											proxy : {
												type : "ajax",
												url : c.url,
												actionMethods : {
													create : "POST",
													read : "POST",
													update : "POST",
													destroy : "POST"
												},
												reader : {
													type : "json",
													root : "data"
												}
											},
											listeners : {
												beforeload : function(d, e) {
													d.proxy.extraParams = c.params
												}
											}
										})
							}
						}
					}
					if (Ext.isEmpty(c.store)) {
						throw "model combo store is null"
					}
					if (!c.allowBlank) {
						c.validator = function(d) {
							if (c.findRecordByDisplay(d)) {
								return true
							} else {
								return "输入值非法，该值不存在！"
							}
						}
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.Date", {
			extend : "Ext.form.field.Date",
			alias : "widget.jsf.DateField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
					if (!Ext.isEmpty(c.meta)) {
						if ("crtDate" == c.meta.name
								|| "mdfDate" == c.meta.name) {
							c.format = "Y-m-d H:i:s"
						} else {
							c.format = "Y-m-d"
						}
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.Hidden", {
			extend : "Ext.form.field.Hidden",
			alias : "widget.jsf.HiddenField",
			height : 0,
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.HtmlEditor", {
	extend : "Ext.form.field.HtmlEditor",
	alias : "widget.jsf.HtmlEditorField",
	initComponent : function() {
		var c = this;
		try {
			if (!Ext.isEmpty(c.meta)) {
				var a = {};
				c.doMetaName(a);
				c.doMetaLabel(a);
				c.doMetaLen(a);
				c.doMetaReq(a);
				c.doMerge(a)
			}
		} catch (b) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + b.name + " message=" + b.message)
		}
		c.callParent(arguments)
	},
	metaQueryRegExp : new RegExp("^(lk|eq|rg|lt|lte|gt|gte)$"),
	metaShowTypeRegExp : new RegExp("^(search|edit|display)$"),
	doMetaName : function(a) {
		if (Ext.isEmpty(this.meta.showType)
				|| !this.metaShowTypeRegExp.test(this.meta.showType)) {
			this.meta.showType = "edit"
		}
		if (this.meta.showType == "display") {
			Ext.apply(a, {
						readOnly : true
					})
		}
		if (!Ext.isEmpty(this.name) || Ext.isEmpty(this.meta.name)) {
			return a
		}
		if (this.meta.showType == "search"
				&& this.metaQueryRegExp.test(this.meta.query)
				&& this.meta.query != "rg") {
			return Ext.apply(a, {
						name : this.meta.name + "_" + this.meta.query
					})
		} else {
			return Ext.apply(a, {
						name : this.meta.name
					})
		}
	},
	doMetaLabel : function(a) {
		if (!Ext.isEmpty(this.fieldLabel)) {
			return a
		}
		if (Ext.isEmpty(this.meta.label) && Ext.isEmpty(this.meta.name)) {
			return a
		}
		return Ext.apply(a, {
					fieldLabel : Ext.isEmpty(this.meta.label)
							? this.meta.name
							: this.meta.label
				})
	},
	metaLenRegExp : new RegExp("^([0-9]+-[0-9]+|[0-9]+)$"),
	doMetaLen : function(b) {
		if (!this.metaLenRegExp.test(this.meta.len)) {
			return b
		}
		if (this.meta.showType == "display") {
			return b
		}
		if (this.meta.showType == "search") {
			if (Ext.isNumber(this.meta.len)) {
				return Ext.apply(b, {
							maxLength : Math.round(this.meta.len)
						})
			} else {
				var a = this.meta.len.lastIndexOf("-");
				if (a > 0) {
					return Ext.apply(b, {
								maxLength : parseInt(this.meta.len
										.substr(a + 1))
							})
				} else {
					return Ext.apply(b, {
								maxLength : parseInt(this.meta.len)
							})
				}
			}
		} else {
			if (Ext.isNumber(this.meta.len)) {
				return Ext.apply(b, {
							maxLength : Math.round(this.meta.len),
							minLength : Math.round(this.meta.len)
						})
			} else {
				var a = this.meta.len.lastIndexOf("-");
				if (a > 0) {
					return Ext.apply(b, {
								minLength : parseInt(this.meta.len.substr(0, a)),
								maxLength : parseInt(this.meta.len
										.substr(a + 1))
							})
				} else {
					return Ext.apply(b, {
								maxLength : parseInt(this.meta.len),
								minLength : parseInt(this.meta.len)
							})
				}
			}
		}
	},
	doMetaReq : function(a) {
		if (this.meta.showType == "edit") {
			if (this.meta.req == true) {
				Ext.apply(a, {
							allowBlank : false
						});
				if (!Ext.isEmpty(a.fieldLabel)) {
					Ext.apply(a, {
						beforeLabelTextTpl: required
					});
				}
			}
		}
	},
	doMerge : function(a) {
		if (!Ext.isObject(a)) {
			return
		}
		if (Ext.isObject(a.jsflisteners)) {
			if (Ext.isObject(this.listeners)) {
				Ext.merge(this.listeners, a.jsflisteners)
			} else {
				this.listeners = {};
				Ext.apply(this.listeners, a.jsflisteners)
			}
			delete a.jsflisteners
		}
		Ext.apply(this, a)
	}
});
Ext.define("jsf.form.field.Number", {
	extend : "Ext.form.field.Number",
	alias : "widget.jsf.NumberField",
	initComponent : function() {
		var c = this;
		try {
			if (!Ext.isEmpty(c.meta)) {
				var a = {};
				c.doMetaName(a);
				c.doMetaLabel(a);
				if (!Ext.isEmpty(c.meta.val)
						&& (c.meta.val.indexOf("regex|") == 0
								|| c.meta.val.indexOf("vtype|") == 0 || c.metaValRangeRegExp
								.test(c.meta.val))) {
					c.doMetaVal(a)
				}
				c.doMetaReq(a);
				c.doMerge(a)
			}
		} catch (b) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + b.name + " message=" + b.message)
		}
		c.callParent(arguments)
	}
});
Ext.define("jsf.form.field.Text", {
			extend : "Ext.form.field.Text",
			alias : "widget.jsf.TextField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaLen(a);
						if (!Ext.isEmpty(c.meta.val)
								&& (c.meta.val.indexOf("regex|") == 0 || c.meta.val
										.indexOf("vtype|") == 0)) {
							c.doMetaVal(a)
						}
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.TextArea", {
			extend : "Ext.form.field.TextArea",
			alias : "widget.jsf.TextAreaField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaLen(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.Trigger", {
			extend : "Ext.form.field.Trigger",
			alias : "widget.jsf.TriggerField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaLen(a);
						if (!Ext.isEmpty(c.meta.val)
								&& (c.meta.val.indexOf("regex|") == 0 || c.meta.val
										.indexOf("vtype|") == 0)) {
							c.doMetaVal(a)
						}
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.ModelForm", {
	extend : "Ext.form.Panel",
	alias : "widget.jsf.ModelForm",
	bodyPadding : 5,
	model : null,
	showType : "search",
	labelWidth : 60,
	itemMargin : 3,
	itemLayout : "column",
	itemColumns : 1,
	items : [],
	btns : [{
				xtype : "button",
				text : " 查 询 ",
				itemId : "submitBtn"
			}, {
				xtype : "button",
				text : " 重 置 ",
				margin : "0 10 0 10",
				handler : function(a) {
					a.up("form").getForm().reset()
				}
			}],
	initComponent : function() {
		var c = this;
		try {
			var d = new Array();
			if (Ext.isArray(c.items) && c.items.length > 0) {
				d = c.items
			} else {
				if (Ext.isEmpty(Ext.ModelManager.getModel(c.model))) {
					Ext.syncRequire(c.model)
				}
				var a = Ext.ModelManager.getModel(this.model).prototype.fields.items;
				Ext.each(a, function(g, f, e) {
							if (!Ext.isEmpty(g.query) && g.query.length > 1) {
								d.push(g.name)
							}
						})
			}
			c.items = [{
						xtype : "jsf.ModelContainer",
						model : c.model,
						labelWidth : c.labelWidth,
						itemMargin : c.itemMargin,
						showType : c.showType,
						layout : c.itemLayout,
						columns : c.itemColumns,
						items : d
					}, {
						xtype : "container",
						layout : {
							type : "hbox",
							pack : "end"
						},
						margin : 5,
						items : c.btns
					}]
		} catch (b) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + b.name + " message=" + b.message)
		}
		c.callParent(arguments)
	}
});
Ext.define("jsf.container.ModelContainer", {
	extend : "Ext.container.Container",
	alias : "widget.jsf.ModelContainer",
	model : null,
	labelWidth : 60,
	itemMargin : 3,
	showType : "edit",
	initComponent : function() {
		var e = this;
		try {
			if (Ext.isEmpty(e.model)) {
				throw "model field is null!"
			}
			if (Ext.isEmpty(Ext.ModelManager.getModel(e.model))) {
				Ext.syncRequire(e.model)
			}
			if (Ext.isEmpty(this.layout)) {
				this.layout = "form"
			}
			var c = new Array();
			if (Ext.isArray(e.items) && e.items.length > 0) {
				Ext.each(e.items, function(h, g, f) {
							if (Ext.isString(h)) {
								c.push(this.genByName(h))
							} else {
								if (Ext.isObject(h)) {
									if (Ext.isString(h.fname)
											&& h.fname.length > 0) {
										c.push(this.genByObjectFName(h))
									} else {
										c.push(this.genByOther(h))
									}
								} else {
									throw "not supported item type : " + h
								}
							}
						}, e)
			} else {
				var a = Ext.ModelManager.getModel(this.model).prototype.fields.items;
				var b = new Array;
				Ext.each(a, function(h, g, f) {
							if (h.name == "extras") {
								return
							} else {
								if (h.name == "crtBy" || h.name == "crtDate"
										|| h.name == "mdfBy"
										|| h.name == "mdfDate") {
									b.push(this.genByName(h.name));
									b[b.length - 1].readOnly = true
								} else {
									c.push(this.genByName(h.name))
								}
							}
							if (h.name == "id" || h.name == "ver") {
								c[c.length - 1].hidden = true
							}
						}, e);
				c = Ext.Array.merge(c, b)
			}
			e.items = c;
			if (e.layout == "column") {
				if (Ext.isNumber(e.columns) && e.columns >= 1) {
					e.columns = Math.floor(e.columns)
				} else {
					e.layout = "form"
				}
			}
			Ext.each(e.items, function(h, g, f) {
						if (!Ext.isEmpty(e.itemMargin)) {
							h.margin = e.itemMargin
						}
						if (!Ext.isEmpty(e.labelWidth)) {
							h.labelWidth = e.labelWidth
						}
						if (e.layout == "column") {
							h.columnWidth = Math.floor(1 / this.columns * 100)
									/ 100 - 0.01
						}
					}, e)
		} catch (d) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + d.name + " message=" + d.message)
		}
		e.callParent(arguments)
	},
	genByName : function(b) {
		var a = this.findItemCfg(b);
		if (a != null) {
			if (this.showType == "search") {
				return this.genField4Search(b, a)
			} else {
				if (this.showType == "display") {
					return this.genField4Edit(b, a)
				} else {
					return this.genField4Edit(b, a)
				}
			}
		} else {
			return {
				xtype : "jsf.TextField",
				fieldLabel : b,
				emptyText : "can't find this field"
			}
		}
	},
	genByObjectFName : function(b) {
		var a = this.findItemCfg(b.fname);
		if (a != null) {
			if (this.showType == "search") {
				return this.genField4Search(b, a)
			} else {
				if (this.showType == "display") {
					return this.genField4Edit(b, a)
				} else {
					return this.genField4Edit(b, a)
				}
			}
		} else {
			return {
				xtype : "jsf.TextField",
				fieldLabel : b,
				emptyText : "can't find this field"
			}
		}
	},
	genByOther : function(a) {
		return a
	},
	findItemCfg : function(c) {
		var a = Ext.ModelManager.getModel(this.model).prototype.fields.items;
		for (var b = 0; b < a.length; b++) {
			if (a[b].name == c) {
				return a[b]
			}
		}
		return null
	},
	findItemMeta : function(a) {
		var b = {};
		if (!Ext.isEmpty(a.name)) {
			b.name = a.name
		}
		if (!Ext.isEmpty(a.label)) {
			b.label = a.label
		}
		if (!Ext.isEmpty(a.len)) {
			b.len = a.len
		}
		if (!Ext.isEmpty(a.val)) {
			b.val = a.val
		}
		if (!Ext.isEmpty(a.query)) {
			b.query = a.query
		}
		if (!Ext.isEmpty(a.req)) {
			b.req = a.req
		}
		if (!Ext.isEmpty(a.type.type)) {
			b.type = a.type.type
		}
		b.showType = Ext.isEmpty(this.showType) ? "edit" : this.showType;
		return b
	},
	genField4Edit : function(c, a) {
		var b = {};
		Ext.apply(b, {
					meta : this.findItemMeta(a)
				});
		if (Ext.isObject(c.meta)) {
			Ext.apply(b.meta, c.meta);
			delete(c.meta)
		}
		if (Ext.isObject(c)) {
			Ext.apply(b, c)
		}
		delete b.fname;
		if (!Ext.isEmpty(b.xtype)) {
			return b
		}
		if (b.meta.type == "int" || b.meta.type == "float") {
			b.xtype = "jsf.NumberField"
		} else {
			if (b.meta.type == "date") {
				b.xtype = "jsf.DateField"
			} else {
				if (b.meta.type == "bool") {
					b.xtype = "jsf.ComboBoolean"
				} else {
					if (b.meta.type == "string") {
						if (!Ext.isEmpty(b.meta.val)
								&& b.meta.val.indexOf("dict|") == 0) {
							b.xtype = "jsf.ComboDict"
						} else {
							if (!Ext.isEmpty(b.meta.val)
									&& b.meta.val.indexOf("dist|") == 0) {
								b.xtype = "jsf.ComboDist"
							} else {
								if (!Ext.isEmpty(b.meta.len)
										&& parseInt(b.meta.len.split("-")[1]) > 199) {
									b.xtype = "jsf.TextAreaField"
								} else {
									b.xtype = "jsf.TextField"
								}
							}
						}
					} else {
						b.xtype = "jsf.TextField"
					}
				}
			}
		}
		return b
	},
	genField4Search : function(d, a) {
		var b = this.genField4Edit(d, a);
		if (b.meta.type == "int" || b.meta.type == "float"
				|| b.meta.type == "date") {
			if (b.meta.query == "rg") {
				var c = {
					xtype : "fieldcontainer",
					fieldLabel : b.meta.label,
					layout : {
						type : "hbox",
						align : "stretch"
					},
					items : [Ext.clone(b), {
								xtype : "label",
								text : "_",
								margin : "0 3 0 3"
							}, Ext.clone(b)]
				};
				Ext.apply(c.items[0].meta, {
							query : "gte"
						});
				Ext.apply(c.items[2].meta, {
							query : "lte"
						});
				Ext.apply(c.items[0], {
							hideLabel : true,
							flex : 1,
							emptyText : "大于等于"
						});
				Ext.apply(c.items[2], {
							hideLabel : true,
							flex : 1,
							emptyText : "小于等于"
						});
				return c
			}
		}
		return b
	}
});
Ext.define("jsf.form.ModelForm", {
	extend : "Ext.form.Panel",
	alias : "widget.jsf.ModelForm",
	bodyPadding : 5,
	model : null,
	showType : "search",
	labelWidth : 60,
	itemMargin : 3,
	itemLayout : "column",
	itemColumns : 1,
	items : [],
	btns : [{
				xtype : "button",
				text : " 查 询 ",
				itemId : "submitBtn"
			}, {
				xtype : "button",
				text : " 重 置 ",
				margin : "0 10 0 10",
				handler : function(a) {
					a.up("form").getForm().reset()
				}
			}],
	initComponent : function() {
		var c = this;
		try {
			var d = new Array();
			if (Ext.isArray(c.items) && c.items.length > 0) {
				d = c.items
			} else {
				if (Ext.isEmpty(Ext.ModelManager.getModel(c.model))) {
					Ext.syncRequire(c.model)
				}
				var a = Ext.ModelManager.getModel(this.model).prototype.fields.items;
				Ext.each(a, function(g, f, e) {
							if (!Ext.isEmpty(g.query) && g.query.length > 1) {
								d.push(g.name)
							}
						})
			}
			c.items = [{
						xtype : "jsf.ModelContainer",
						model : c.model,
						labelWidth : c.labelWidth,
						itemMargin : c.itemMargin,
						showType : c.showType,
						layout : c.itemLayout,
						columns : c.itemColumns,
						items : d
					}, {
						xtype : "container",
						layout : {
							type : "hbox",
							pack : "end"
						},
						margin : 5,
						items : c.btns
					}]
		} catch (b) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + b.name + " message=" + b.message)
		}
		c.callParent(arguments)
	}
});
Ext.form.field.Base.prototype.metaQueryRegExp = new RegExp("^(lk|eq|rg|lt|lte|gt|gte)$");
Ext.form.field.Base.prototype.metaShowTypeRegExp = new RegExp("^(search|edit|display)$");
Ext.form.field.Base.prototype.doMetaName = function(a) {
	if (Ext.isEmpty(this.meta.showType)
			|| !this.metaShowTypeRegExp.test(this.meta.showType)) {
		this.meta.showType = "edit"
	}
	if (this.meta.showType == "display") {
		Ext.apply(a, {
					readOnly : true
				})
	}
	if (!Ext.isEmpty(this.name) || Ext.isEmpty(this.meta.name)) {
		return a
	}
	if (this.meta.showType == "search"
			&& this.metaQueryRegExp.test(this.meta.query)
			&& this.meta.query != "rg") {
		return Ext.apply(a, {
					name : this.meta.name + "_" + this.meta.query
				})
	} else {
		return Ext.apply(a, {
					name : this.meta.name
				})
	}
};
Ext.form.field.Base.prototype.doMetaReq = function(a) {
	if (this.meta.showType == "edit") {
		if (this.meta.req == true) {
			Ext.apply(a, {
						allowBlank : false
					});
			if (!Ext.isEmpty(a.fieldLabel)) {
				Ext.apply(a, {
						beforeLabelTextTpl: required
					});
			}
		}
	}
};
Ext.form.field.Base.prototype.doMetaLabel = function(a) {
	if (!Ext.isEmpty(this.fieldLabel)) {
		return a
	}
	if (Ext.isEmpty(this.meta.label) && Ext.isEmpty(this.meta.name)) {
		return a
	}
	return Ext.apply(a, {
				fieldLabel : Ext.isEmpty(this.meta.label)
						? this.meta.name
						: this.meta.label
			})
};
Ext.form.field.Base.prototype.metaLenRegExp = new RegExp("^([0-9]+-[0-9]+|[0-9]+)$");
Ext.form.field.Base.prototype.doMetaLen = function(b) {
	if (!this.metaLenRegExp.test(this.meta.len)) {
		return b
	}
	if (this.meta.showType == "display") {
		return b
	}
	if (this.meta.showType == "search") {
		if (Ext.isNumber(this.meta.len)) {
			return Ext.apply(b, {
						maxLength : Math.round(this.meta.len)
					})
		} else {
			var a = this.meta.len.lastIndexOf("-");
			if (a > 0) {
				return Ext.apply(b, {
							maxLength : parseInt(this.meta.len.substr(a + 1))
						})
			} else {
				return Ext.apply(b, {
							maxLength : parseInt(this.meta.len)
						})
			}
		}
	} else {
		if (Ext.isNumber(this.meta.len)) {
			return Ext.apply(b, {
						maxLength : Math.round(this.meta.len),
						minLength : Math.round(this.meta.len)
					})
		} else {
			var a = this.meta.len.lastIndexOf("-");
			if (a > 0) {
				return Ext.apply(b, {
							minLength : parseInt(this.meta.len.substr(0, a)),
							maxLength : parseInt(this.meta.len.substr(a + 1))
						})
			} else {
				return Ext.apply(b, {
							maxLength : parseInt(this.meta.len),
							minLength : parseInt(this.meta.len)
						})
			}
		}
	}
};
Ext.form.field.Base.prototype.metaValRangeRegExp = new RegExp("^-?\\d+--?\\d+$");
Ext.form.field.Base.prototype.doMetaVal = function(c) {
	var b = this;
	if (Ext.isEmpty(b.meta.val)) {
		return c
	}
	if (this.meta.val.indexOf("dict|") == 0) {
		return Ext.apply(c, {
					store : b.meta.val.substr(5),
					queryMode : "local",
					displayField : "name",
					valueField : "code"
				})
	} else {
		if (this.meta.val.indexOf("dist|") == 0) {
			return Ext.apply(c, {
				queryMode : "local",
				displayField : "val",
				valueField : "val",
				jsflisteners : {
					beforerender : {
						scope : b,
						single : true,
						fn : function(d) {
							Ext.Ajax.request({
								url : b.meta.val.substr(5),
								timeout : 30000,
								params : b.params,
								method : "POST",
								success : function(e, h) {
									var f = Ext.decode(e.responseText);
									if (Ext.isArray(f.data)) {
										b.store = Ext.create("Ext.data.Store",
												{
													fields : ["val"]
												});
										if (b.blankItem == true) {
											b.store.add({
														val : b.blankItemText
													})
										}
										for (var g = 0; g < f.data.length; g++) {
											b.store.add({
														val : f.data[g]
													})
										}
										if (b.meta.showType == "edit"
												|| b.blankItem == true) {
											if (!Ext.isEmpty(b.store)
													&& b.store.count() > 0) {
												b.select(b.store.getAt(0))
											}
										}
									}
								}
							})
						}
					}
				}
			})
		} else {
			if (b.meta.val.indexOf("vtype|") == 0 && b.meta.showType == "edit") {
				return Ext.apply(c, {
							vtype : b.meta.val.substr(6)
						})
			} else {
				if (this.meta.val.indexOf("regex|") == 0
						&& b.meta.showType == "edit") {
					return Ext.apply(c, {
								regex : new RegExp(b.meta.val.substr(6)),
								regexText : "非法输入值，与正则表达式"
										+ this.meta.val.substr(6) + "不匹配!"
							})
				} else {
					if (this.metaValRangeRegExp.test(this.meta.val)) {
						var a = 0;
						if (this.meta.val.indexOf("-") == 0) {
							a = this.meta.val.indexOf("-", 1)
						} else {
							a = this.meta.val.indexOf("-")
						}
						return Ext.apply(c, {
									minValue : parseFloat(this.meta.val.substr(
											0, a)),
									maxValue : parseFloat(this.meta.val
											.substr(a + 1))
								})
					}
				}
			}
		}
	}
	return c
};
Ext.form.field.Base.prototype.doMerge = function(a) {
	if (!Ext.isObject(a)) {
		return
	}
	if (Ext.isObject(a.jsflisteners)) {
		if (Ext.isObject(this.listeners)) {
			Ext.merge(this.listeners, a.jsflisteners)
		} else {
			this.listeners = {};
			Ext.apply(this.listeners, a.jsflisteners)
		}
		delete a.jsflisteners
	}
	Ext.apply(this, a)
};
Ext.define("jsf.form.field.ComboBoolean", {
			extend : "Ext.form.ComboBox",
			alias : "widget.jsf.ComboBoolean",
			editable : false,
			initComponent : function() {
				var c = this;
				try {
					c.store = [[true, "是"], [false, "否"]];
					if (!Ext.isEmpty(c.meta)) {
						var a = {
							editable : false
						};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments);
				if (c.meta && c.meta.showType == "edit") {
					if (!Ext.isEmpty(c.store) && c.store.count() > 0) {
						c.select(c.store.getAt(0))
					}
				}
			}
		});
Ext.define("jsf.form.field.ComboDict", {
			extend : "Ext.form.field.ComboBox",
			alias : "widget.jsf.ComboDict",
			blankItem : false,
			blankItemText : "\u00a0",
			editable : false,
			itemFilter : null,
			initComponent : function() {
				var d = this;
				try {
					if (!Ext.isEmpty(d.meta)) {
						var a = {};
						d.doMetaName(a);
						d.doMetaLabel(a);
						if (!Ext.isEmpty(d.meta.val)
								&& d.meta.val.indexOf("dict|") == 0) {
							d.doMetaVal(a)
						}
						d.doMetaReq(a);
						d.doMerge(a);
						if (Ext.isString(d.store)) {
							if (Ext.getStore(d.store) == null) {
								d.emptyText = "Dict [" + d.store
										+ "] not found!";
								d.store = null
							} else {
								var b = [];
								d.store = Ext.getStore(d.store);
								d.store.each(function(e) {
											if (d.doItemFilter(e)) {
												b.push(e.copy())
											}
										});
								d.store = Ext.create("Ext.data.Store", {
											fields : ["code", "name"]
										});
								d.store.add(b)
							}
						}
						if (d.blankItem == true && d.store != null) {
							var b = [{}];
							b[0][d.valueField] = null;
							b[0][d.displayField] = d.blankItemText;
							d.store.each(function(e) {
										if (d.doItemFilter(e)) {
											b.push(e.copy())
										}
									});
							d.store = Ext.create("Ext.data.Store", {
										fields : ["code", "name"]
									});
							d.store.add(b)
						}
					}
				} catch (c) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + c.name + " message=" + c.message)
				}
				d.callParent(arguments);
				if (d.meta.showType == "edit" || d.blankItem == true) {
					if (!Ext.isEmpty(d.store) && d.store.count() > 0) {
						d.select(d.store.getAt(0))
					}
				}
			},
			doItemFilter : function(b) {
				var a = this;
				if (Ext.isArray(a.itemFilter)) {
					return Ext.Array.contains(a.itemFilter, b.get("code"))
							? true
							: false
				} else {
					if (Ext.isFunction(a.itemFilter)) {
						return a.itemFilter(b) ? true : false
					} else {
						return true
					}
				}
			}
		});
Ext.define("jsf.form.field.ComboDist", {
			extend : "Ext.form.field.ComboBox",
			alias : "widget.jsf.ComboDist",
			blankItem : false,
			blankItemText : "\u00a0",
			queryMode : "local",
			params : null,
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						if (!Ext.isEmpty(c.meta.val)
								&& c.meta.val.indexOf("dist|") == 0) {
							c.doMetaVal(a)
						}
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.ComboModel", {
			extend : "Ext.form.field.ComboBox",
			alias : "widget.jsf.ComboModel",
			model : null,
			store : null,
			storeId : null,
			url : null,
			params : null,
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
					if (Ext.isEmpty(Ext.ModelManager.getModel(c.model))) {
						Ext.syncRequire(c.model)
					}
					if (Ext.isEmpty(c.store)) {
						if (!Ext.isEmpty(c.storeId)) {
							c.store = Ext.getStore(c.storeId)
						} else {
							if (!Ext.isEmpty(c.url)) {
								c.store = Ext.create("Ext.data.Store", {
											model : c.model,
											autoLoad : true,
											autoSync : false,
											proxy : {
												type : "ajax",
												url : c.url,
												actionMethods : {
													create : "POST",
													read : "POST",
													update : "POST",
													destroy : "POST"
												},
												reader : {
													type : "json",
													root : "data"
												}
											},
											listeners : {
												beforeload : function(d, e) {
													d.proxy.extraParams = c.params
												}
											}
										})
							}
						}
					}
					if (Ext.isEmpty(c.store)) {
						throw "model combo store is null"
					}
					if (!c.allowBlank) {
						c.validator = function(d) {
							if (c.findRecordByDisplay(d)) {
								return true
							} else {
								return "输入值非法，该值不存在！"
							}
						}
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.Date", {
			extend : "Ext.form.field.Date",
			alias : "widget.jsf.DateField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
					if (!Ext.isEmpty(c.meta)) {
						if ("crtDate" == c.meta.name
								|| "mdfDate" == c.meta.name) {
							c.format = "Y-m-d H:i:s"
						} else {
							c.format = "Y-m-d"
						}
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.Hidden", {
			extend : "Ext.form.field.Hidden",
			alias : "widget.jsf.HiddenField",
			height : 0,
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.HtmlEditor", {
	extend : "Ext.form.field.HtmlEditor",
	alias : "widget.jsf.HtmlEditorField",
	initComponent : function() {
		var c = this;
		try {
			if (!Ext.isEmpty(c.meta)) {
				var a = {};
				c.doMetaName(a);
				c.doMetaLabel(a);
				c.doMetaLen(a);
				c.doMetaReq(a);
				c.doMerge(a)
			}
		} catch (b) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + b.name + " message=" + b.message)
		}
		c.callParent(arguments)
	},
	metaQueryRegExp : new RegExp("^(lk|eq|rg|lt|lte|gt|gte)$"),
	metaShowTypeRegExp : new RegExp("^(search|edit|display)$"),
	doMetaName : function(a) {
		if (Ext.isEmpty(this.meta.showType)
				|| !this.metaShowTypeRegExp.test(this.meta.showType)) {
			this.meta.showType = "edit"
		}
		if (this.meta.showType == "display") {
			Ext.apply(a, {
						readOnly : true
					})
		}
		if (!Ext.isEmpty(this.name) || Ext.isEmpty(this.meta.name)) {
			return a
		}
		if (this.meta.showType == "search"
				&& this.metaQueryRegExp.test(this.meta.query)
				&& this.meta.query != "rg") {
			return Ext.apply(a, {
						name : this.meta.name + "_" + this.meta.query
					})
		} else {
			return Ext.apply(a, {
						name : this.meta.name
					})
		}
	},
	doMetaLabel : function(a) {
		if (!Ext.isEmpty(this.fieldLabel)) {
			return a
		}
		if (Ext.isEmpty(this.meta.label) && Ext.isEmpty(this.meta.name)) {
			return a
		}
		return Ext.apply(a, {
					fieldLabel : Ext.isEmpty(this.meta.label)
							? this.meta.name
							: this.meta.label
				})
	},
	metaLenRegExp : new RegExp("^([0-9]+-[0-9]+|[0-9]+)$"),
	doMetaLen : function(b) {
		if (!this.metaLenRegExp.test(this.meta.len)) {
			return b
		}
		if (this.meta.showType == "display") {
			return b
		}
		if (this.meta.showType == "search") {
			if (Ext.isNumber(this.meta.len)) {
				return Ext.apply(b, {
							maxLength : Math.round(this.meta.len)
						})
			} else {
				var a = this.meta.len.lastIndexOf("-");
				if (a > 0) {
					return Ext.apply(b, {
								maxLength : parseInt(this.meta.len
										.substr(a + 1))
							})
				} else {
					return Ext.apply(b, {
								maxLength : parseInt(this.meta.len)
							})
				}
			}
		} else {
			if (Ext.isNumber(this.meta.len)) {
				return Ext.apply(b, {
							maxLength : Math.round(this.meta.len),
							minLength : Math.round(this.meta.len)
						})
			} else {
				var a = this.meta.len.lastIndexOf("-");
				if (a > 0) {
					return Ext.apply(b, {
								minLength : parseInt(this.meta.len.substr(0, a)),
								maxLength : parseInt(this.meta.len
										.substr(a + 1))
							})
				} else {
					return Ext.apply(b, {
								maxLength : parseInt(this.meta.len),
								minLength : parseInt(this.meta.len)
							})
				}
			}
		}
	},
	doMetaReq : function(a) {
		if (this.meta.showType == "edit") {
			if (this.meta.req == true) {
				Ext.apply(a, {
							allowBlank : false
						});
				if (!Ext.isEmpty(a.fieldLabel)) {
					Ext.apply(a, {
						beforeLabelTextTpl: required
					});
				}
			}
		}
	},
	doMerge : function(a) {
		if (!Ext.isObject(a)) {
			return
		}
		if (Ext.isObject(a.jsflisteners)) {
			if (Ext.isObject(this.listeners)) {
				Ext.merge(this.listeners, a.jsflisteners)
			} else {
				this.listeners = {};
				Ext.apply(this.listeners, a.jsflisteners)
			}
			delete a.jsflisteners
		}
		Ext.apply(this, a)
	}
});
Ext.define("jsf.form.field.Number", {
	extend : "Ext.form.field.Number",
	alias : "widget.jsf.NumberField",
	initComponent : function() {
		var c = this;
		try {
			if (!Ext.isEmpty(c.meta)) {
				var a = {};
				c.doMetaName(a);
				c.doMetaLabel(a);
				if (!Ext.isEmpty(c.meta.val)
						&& (c.meta.val.indexOf("regex|") == 0
								|| c.meta.val.indexOf("vtype|") == 0 || c.metaValRangeRegExp
								.test(c.meta.val))) {
					c.doMetaVal(a)
				}
				c.doMetaReq(a);
				c.doMerge(a)
			}
		} catch (b) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + b.name + " message=" + b.message)
		}
		c.callParent(arguments)
	}
});
Ext.define("jsf.form.field.Text", {
			extend : "Ext.form.field.Text",
			alias : "widget.jsf.TextField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaLen(a);
						if (!Ext.isEmpty(c.meta.val)
								&& (c.meta.val.indexOf("regex|") == 0 || c.meta.val
										.indexOf("vtype|") == 0)) {
							c.doMetaVal(a)
						}
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.TextArea", {
			extend : "Ext.form.field.TextArea",
			alias : "widget.jsf.TextAreaField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaLen(a);
						c.doMetaReq(a);
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.form.field.Trigger", {
			extend : "Ext.form.field.Trigger",
			alias : "widget.jsf.TriggerField",
			initComponent : function() {
				var c = this;
				try {
					if (!Ext.isEmpty(c.meta)) {
						var a = {};
						c.doMetaName(a);
						c.doMetaLabel(a);
						c.doMetaLen(a);
						if (!Ext.isEmpty(c.meta.val)
								&& (c.meta.val.indexOf("regex|") == 0 || c.meta.val
										.indexOf("vtype|") == 0)) {
							c.doMetaVal(a)
						}
						c.doMerge(a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			}
		});
Ext.define("jsf.grid.column.Boolean", {
			extend : "Ext.grid.column.Boolean",
			alias : "widget.jsf.BooleanColumn",
			initComponent : function() {
				var c = this;
				try {
					var a = c.genAttribute(c, c.meta);
					if (!Ext.isEmpty(a)) {
						Ext.apply(c, a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			},
			genAttribute : function(a, c) {
				var b = {
					dataIndex : c.name
				};
				if (a.text == "&#160;") {
					b.text = Ext.isEmpty(c.label) ? c.name : c.label
				}
				b.trueText = "是";
				b.falseText = "否";
				if (a.editor == true) {
					b.editor = {
						xtype : "jsf.ComboBoolean"
					}
				}
				return b
			}
		});
Ext.define("jsf.grid.column.Column", {
			extend : "Ext.grid.column.Column",
			alias : "widget.jsf.Column",
			initComponent : function() {
				var c = this;
				try {
					var a = c.genAttribute(c, c.meta);
					if (!Ext.isEmpty(a)) {
						Ext.apply(c, a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			},
			genAttribute : function(b, d) {
				var c = {
					dataIndex : d.name
				};
				if (b.text == "&#160;") {
					c.text = Ext.isEmpty(d.label) ? d.name : d.label
				}
				if (!Ext.isEmpty(d.val) && d.val.indexOf("dict|") == 0) {
					c.renderer = function(i) {
						var f = Ext.getStore(d.val.substr(5));
						if (Ext.isEmpty(f)) {
							return i
						}
						if (Ext.isArray(i)) {
							var h = "";
							var e = null;
							Ext.each(i, function(j) {
										e = f.findRecord("code", j, 0, false,
												true, true);
										h = h + (e ? e.get("name") : j) + ","
									});
							return h
						} else {
							if (i.indexOf(",", 0) > 0) {
								var g = i.split(",");
								var h = "";
								var e = null;
								Ext.each(g, function(j) {
											e = f.findRecord("code", j, 0,
													false, true, true);
											h = h + (e ? e.get("name") : j)
													+ ","
										});
								return h
							} else {
								var e = f.findRecord("code", i, 0, false, true,
										true);
								return e ? e.get("name") : i
							}
						}
					}
				}
				if (b.editor == true) {
					var a = {
						meta : d,
						hideLabel : true
					};
					if (!Ext.isEmpty(a.meta.val)
							&& a.meta.val.indexOf("dict|") == 0) {
						a.xtype = "jsf.ComboDict"
					} else {
						if (!Ext.isEmpty(a.meta.val)
								&& a.meta.val.indexOf("dist|") == 0) {
							a.xtype = "jsf.ComboDist"
						} else {
							a.xtype = "jsf.TextField"
						}
					}
					c.editor = a
				}
				return c
			}
		});
Ext.define("jsf.grid.column.Date", {
			extend : "Ext.grid.column.Date",
			alias : "widget.jsf.DateColumn",
			initComponent : function() {
				var c = this;
				try {
					var a = c.genAttribute(c, c.meta);
					if (!Ext.isEmpty(a)) {
						Ext.apply(c, a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			},
			genAttribute : function(a, c) {
				var b = {
					dataIndex : c.name
				};
				if (a.text == "&#160;") {
					b.text = Ext.isEmpty(c.label) ? c.name : c.label
				}
				if (Ext.isEmpty(a.format)) {
					if ("crtDate" == c.name || "mdfDate" == c.name) {
						b.format = "Y-m-d H:i:s";
						b.width = 130
					} else {
						b.format = "Y-m-d"
					}
				}
				if (a.editor == true) {
					b.editor = {
						xtype : "jsf.DateField",
						editable : false,
						format : b.format,
						meta : c,
						hideLabel : true
					}
				}
				return b
			}
		});
Ext.define("jsf.grid.column.Number", {
			extend : "Ext.grid.column.Number",
			alias : "widget.jsf.NumberColumn",
			initComponent : function() {
				var c = this;
				try {
					var a = c.genAttribute(c, c.meta);
					if (!Ext.isEmpty(a)) {
						Ext.apply(c, a)
					}
				} catch (b) {
					throw new Error("[" + Ext.getDisplayName(arguments.callee)
							+ "] name=" + b.name + " message=" + b.message)
				}
				c.callParent(arguments)
			},
			genAttribute : function(a, c) {
				var b = {
					dataIndex : c.name
				};
				if (a.text == "&#160;") {
					b.text = Ext.isEmpty(c.label) ? c.name : c.label
				}
				if (c.type == "int") {
					b.format = "0"
				}
				if (c.type == "float") {
					b.format = "0.00"
				}
				if (a.editor == true) {
					b.editor = {
						xtype : "jsf.NumberField",
						meta : c,
						hideLabel : true
					}
				}
				return b
			}
		});
Ext.define("jsf.grid.ModelGrid", {
	extend : "Ext.grid.Panel",
	alias : "widget.jsf.ModelGrid",
	viewConfig : {
		enableTextSelection : true
	},
	model : null,
	url : null,
	initLoad:false,
	store : null,
	paging : true,
	btns : null,
	rowSelType : "SINGLE",
	editType : "CELL",
	emptyText : '<div align="center" width="100%" style="margin-top:30px;"><img src="images/blank.png"></div>',
	initComponent : function() {
		var e = this;
		try {
			if (Ext.isEmpty(e.store)) {
				e.setGridStore()
			}
			var f = new Array();
			if (Ext.isArray(e.columns) && e.columns.length > 0) {
				Ext.each(e.columns, function(i, h, g) {
							if (Ext.isString(i)) {
								f.push(this.genByName(i))
							} else {
								if (Ext.isObject(i)) {
									if (Ext.isString(i.fname)
											&& i.fname.length > 0) {
										f.push(this.genByObjectFName(i))
									} else {
										f.push(i)
									}
								} else {
									throw "not supported item type : " + i
								}
							}
						}, e)
			} else {
				var a = Ext.ModelManager.getModel(this.model).prototype.fields.items;
				var b = new Array;
				Ext.each(a, function(i, h, g) {
							if (i.name == "extras") {
								return
							} else {
								if (i.name == "crtBy" || i.name == "crtDate"
										|| i.name == "mdfBy"
										|| i.name == "mdfDate") {
									b.push(this.genByName(i.name))
								} else {
									f.push(this.genByName(i.name))
								}
							}
							if (i.name == "id" || i.name == "ver") {
								f[f.length - 1].hidden = true
							}
						}, e);
				f = Ext.Array.merge(f, b)
			}
			e.columns = f;
			if (!Ext.isArray(e.dockedItems)) {
				e.dockedItems = []
			}
			if (e.paging == true) {
				e.dockedItems.push({
							xtype : "pagingtoolbar",
							dock : "bottom",
							pageSize : 25,
							totalCount:e.store.getTotalCount(),
							displayInfo : true,
							plugins : Ext.create('app.ux.ProgressBarPager', {}),
							store : e.store,
							listeners : {
								afterrender : function(h, g) {
									h.insert(6, ["-", "每页", {
												xtype : "combobox",
												width : 50,
												allowBlank : false,
												editable : false,
												value : h.getStore().pageSize,
												store : [25, 50, 75, 100, 150,
														200, 250, 300, 350,
														400, 450, 500],
												listeners : {
													change : function(j, k, i) {
														h.getStore().pageSize = k;
														h.getStore().loadPage(1);
													}
												}
											}, "条"]);
									if(e.initLoad){
										h.getStore().load({  
									        params:{  
									            total:h.getStore().getTotalCount()
									        }  
									    });  
									}
								}
							}
						})
			}
			if (Ext.isArray(e.btns) && e.btns.length > 0) {
				e.dockedItems.push({
							xtype : "toolbar",
							dock : "top",
							items : e.btns
						})
			}
			if (Ext.isEmpty(e.selModel)
					&& (e.rowSelType == "SINGLE" || e.rowSelType == "MULTI" || e.rowSelType == "MULTI")) {
				e.selModel = Ext.create("Ext.selection.CheckboxModel", {
							mode : e.rowSelType
						})
			}
			for (var c = 0; c < e.columns.length; c++) {
				if (!Ext.isEmpty(e.columns[c].editor)) {
					if (!Ext.isArray(e.plugins)) {
						e.plugins = []
					}
					if (Ext.isObject(e.editType)) {
						e.plugins.push(e.editType)
					} else {
						if (e.editType == "ROW") {
							e.plugins.push(Ext.create(
									"Ext.grid.plugin.RowEditing", {
										clicksToEdit : 1
									}))
						} else {
							e.plugins.push(Ext.create(
									"Ext.grid.plugin.CellEditing", {
										clicksToEdit : 1
									}))
						}
					}
					break
				}
			}
		} catch (d) {
			throw new Error("[" + Ext.getDisplayName(arguments.callee)
					+ "] name=" + d.name + " message=" + d.message)
		}
		this.callParent(arguments)
	},
	setGridStore : function() {
		var b = this;
		if (Ext.isEmpty(Ext.ModelManager.getModel(b.model))) {
			Ext.syncRequire(b.model)
		}
		if (Ext.isEmpty(b.url)) {
			var a = b.model.split(".");
			b.url = a[2] + "/" + a[3].substring(0, a[3].length - 2)
					+ "Action/query.json"
		}
		b.store = Ext.create("Ext.data.Store", {
					model : b.model,
					autoLoad : false,
					autoSync : false,
					proxy : {
						type : "ajax",
						url : b.url,
						actionMethods : {
							create : "POST",
							read : "POST",
							update : "POST",
							destroy : "POST"
						},
						reader : {
							type : "json",
							root : "data"
						}
					}
				})
	},
	findItemMeta : function(a) {
		var b = {};
		if (!Ext.isEmpty(a.name)) {
			b.name = a.name
		}
		if (!Ext.isEmpty(a.label)) {
			b.label = a.label
		}
		if (!Ext.isEmpty(a.len)) {
			b.len = a.len
		}
		if (!Ext.isEmpty(a.val)) {
			b.val = a.val
		}
		if (!Ext.isEmpty(a.query)) {
			b.query = a.query
		}
		if (!Ext.isEmpty(a.dateFormat)) {
			b.dateFormat = a.dateFormat
		}
		if (!Ext.isEmpty(a.type.type)) {
			b.type = a.type.type
		}
		return b
	},
	findItemCfg : function(c) {
		var a = Ext.ModelManager.getModel(this.model).prototype.fields.items;
		for (var b = 0; b < a.length; b++) {
			if (a[b].name == c) {
				return a[b]
			}
		}
		return null
	},
	genByName : function(b) {
		var a = this.findItemCfg(b);
		if (a != null) {
			var c = this.findItemMeta(a);
			if (c.type == "int" || c.type == "float") {
				return {
					xtype : "jsf.NumberColumn",
					meta : this.findItemMeta(a)
				}
			} else {
				if (c.type == "date") {
					return {
						xtype : "jsf.DateColumn",
						meta : this.findItemMeta(a)
					}
				} else {
					if (c.type == "bool") {
						return {
							xtype : "jsf.BooleanColumn",
							meta : this.findItemMeta(a)
						}
					} else {
						return {
							xtype : "jsf.Column",
							meta : c
						}
					}
				}
			}
		} else {
			return {
				xtype : "jsf.Column",
				meta : {
					label : b
				}
			}
		}
	},
	genByObjectFName : function(b) {
		var a = this.genByName(b.fname);
		return Ext.applyIf(b, a)
	}
});
Ext.define("jsf.tree.ModelTree", {
			extend : "Ext.tree.Panel",
			alias : "widget.jsf.ModelTree",
			url : null,
			loadTree : function() {
				var a = this;
				Ext.Ajax.request({
							url : a.url,
							success : function(b) {
								var c = Ext.decode(b.responseText);
								if (c.success == true) {
									a.setRootNode(c.data)
								} else {
									Ext.Msg.alert("错误", "读取数据错误!")
								}
							}
						})
			},
			initComponent : function() {
				var a = this;
				a.loadTree();
				a.callParent(arguments)
			}
		});
Ext.define("jsf.upload.BatchUploadGrid", {
	extend : "Ext.grid.Panel",
	alias : "widget.jsf.BatchUploadGrid",
	enableColumnHide : false,
	columns : [{
				xtype : "rownumberer"
			}, {
				text : "文件名",
				flex : 1,
				dataIndex : "name"
			}, {
				text : "重命名",
				flex : 1,
				dataIndex : "fileName",
				editor : {
					xtype : "textfield"
				}
			}, {
				text : "类型",
				width : 70,
				dataIndex : "type"
			}, {
				text : "大小",
				width : 70,
				dataIndex : "size",
				renderer : function(a) {
					return Ext.util.Format.fileSize(a)
				}
			}, {
				text : "进度",
				width : 130,
				dataIndex : "percent",
				renderer : function(a) {
					var b = '<div><div style="border:1px solid #008000;height:10px;width:115px;margin:2px 0px 1px 0px;float:left;"><div style="float:left;background:#FFCC66;width:'
							+ a
							+ '%;height:8px;"><div></div></div></div></div>';
					return b
				}
			}, {
				text : "状态",
				width : 80,
				dataIndex : "status",
				renderer : function(a) {
					switch (a) {
						case -1 :
							return "等待上传";
						case -2 :
							return "上传中...";
						case -3 :
							return "<div style='color:red;'>上传失败</div>";
						case -4 :
							return "上传成功";
						case -5 :
							return "停止上传";
						default :
							return ""
					}
				}
			}, {
				xtype : "actioncolumn",
				sortable : false,
				width : 20,
				items : [{
					icon : "icons/delete.gif",
					tooltip : "Remove",
					handler : function(b, c, a) {
						b = b.up("grid");
						b.swfUploader.cancelUpload(b.getStore().getAt(c)
										.get("id"), false);
						b.store.remove(b.store.getAt(c))
					}
				}]
			}],
	plugins : [Ext.create("Ext.grid.plugin.CellEditing", {
				clicksToEdit : 1
			})],
	store : Ext.create("Ext.data.JsonStore", {
		autoLoad : false,
		fields : ["id", "name", "type", "size", "percent", "status", "fileName"]
	}),
	dockedItems : [{
		xtype : "toolbar",
		dock : "top",
		items : [{
					xtype : "button",
					itemId : "addFileBtn",
					icon : "icons/add.gif",
					text : "添加"
				}, "-", {
					xtype : "button",
					itemId : "removeBtn",
					icon : "icons/trash.gif",
					text : "清除",
					handler : function(e) {
						var d = e.up("grid");
						var b = d.getStore();
						for (var c = 0; c < b.getCount(); c++) {
							var a = b.getAt(c);
							var f = a.get("id");
							d.swfUploader.cancelUpload(f, false)
						}
						b.removeAll()
					}
				}, "-", {
					xtype : "button",
					itemId : "uploadBtn",
					icon : "icons/up.gif",
					text : "上传",
					handler : function(b) {
						var a = b.up("grid");
						if (a.swfUploader && a.store.getCount() > 0
								&& a.swfUploader.getStats().files_queued > 0) {
							a.swfUploader.uploadStopped = false;
							a.swfUploader.startUpload();
							a.setBtnStatus(a, false)
						}
					}
				}, "-", {
					xtype : "button",
					itemId : "cancelBtn",
					icon : "icons/cancel.gif",
					text : "停止",
					disabled : true,
					handler : function(b) {
						var a = b.up("grid");
						if (a.swfUploader) {
							a.swfUploader.uploadStopped = true;
							a.swfUploader.stopUpload();
							a.setBtnStatus(a, true)
						}
					}
				}]
	}],
	initComponent : function() {
		var b = this;
		var a = b.flash_url.substring(0, b.flash_url.lastIndexOf("/") + 1);
		Ext.each(b.dockedItems[0].items, function(c) {
					if (!Ext.isEmpty(c.icon) && c.icon.indexOf(a) < 0) {
						c.icon = a + c.icon
					}
				});
		if (b.columns[b.columns.length - 1].items[0].icon.indexOf(a) < 0) {
			b.columns[b.columns.length - 1].items[0].icon = a
					+ b.columns[b.columns.length - 1].items[0].icon
		}
		b.callParent()
	},
	listeners : {
		afterrender : function(a) {
			if (Ext.isEmpty(a.swfUploader)) {
				a.swfUploader = new SWFUpload(a.getSWFConfig(a, a
								.down("toolbar button[itemId=addFileBtn]")));
				Ext.get(a.swfUploader.movieName).setStyle({
							position : "absolute",
							top : 0
						})
			}
		},
		beforedestroy : function(b) {
			b.getStore().removeAll();
			if (b.swfUploader) {
				var a = "swfupload movieName:" + b.swfUploader.movieName
						+ " destory.";
				b.swfUploader.destroy()
			}
		}
	},
	setBtnStatus : function(a, b) {
		a.down("#addFileBtn").setDisabled(!b);
		a.down("#uploadBtn").setDisabled(!b);
		a.down("#removeBtn").setDisabled(!b);
		a.down("#cancelBtn").setDisabled(b);
		if (b) {
			a.down("actioncolumn").show()
		} else {
			a.down("actioncolumn").hide()
		}
	},
	swfUploader : null,
	getSWFConfig : function(e, c) {
		var d = e;
		var a = Ext.id() + "_swfupload";
		var b = Ext.get(c.getId() + "-btnWrap");
		b.setStyle({
					position : "relative",
					display : "block"
				});
		b.createChild({
					tag : "div",
					id : a
				});
		return {
			flash_url : d.flash_url,
			upload_url : d.upload_url,
			file_types : d.file_types,
			file_size_limit : d.file_size_limit,
			file_types_description : d.file_types_description,
			file_upload_limit : d.file_upload_limit,
			file_queue_limit : d.file_queue_limit,
			button_width : c.getWidth(),
			button_height : c.getHeight(),
			button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor : SWFUpload.CURSOR.HAND,
			button_placeholder_id : a,
			custom_settings : {
				scope_handler : d
			},
			debug : d.debug,
			file_queued_handler : d.file_queued_handler,
			file_queue_error_handler : d.file_queue_error_handler,
			upload_start_handler : d.upload_start_handler,
			upload_progress_handler : d.upload_progress_handler,
			upload_error_handler : d.upload_error_handler,
			upload_success_handler : d.upload_success_handler,
			upload_complete_handler : d.upload_complete_handler
		}
	},
	file_queued_handler : function(a) {
		var b = this.settings.custom_settings.scope_handler;
		b.store.add({
					id : a.id,
					name : a.name,
					fileName : a.name,
					size : a.size,
					type : a.type,
					status : a.filestatus,
					percent : 0
				})
	},
	upload_start_handler : function(a) {
		var b = this.settings.custom_settings.scope_handler;
		b.down("toolbar button[itemId=cancelBtn]").setDisabled(false);
		var c = b.store.getById(a.id);
		if (Ext.isEmpty(b.post_params)) {
			b.post_params = {}
		}
		b.post_params.rename = encodeURIComponent(c.get("fileName"));
		this.setPostParams(b.post_params)
	},
	upload_progress_handler : function(a, e, d) {
		var c = this.settings.custom_settings.scope_handler;
		var b = Math.ceil((e / d) * 100);
		b = b == 100 ? 99 : b;
		var f = c.store.getById(a.id);
		f.set("percent", b);
		f.set("status", a.filestatus);
		f.commit()
	},
	upload_success_handler : function(b, a, c) {
		var d = this.settings.custom_settings.scope_handler;
		var e = d.store.getById(b.id);
		if (Ext.JSON.decode(a).success) {
			e.set("percent", 100);
			e.set("status", b.filestatus)
		} else {
			e.set("percent", 0);
			e.set("status", SWFUpload.FILE_STATUS.ERROR)
		}
		e.commit()
	},
	upload_complete_handler : function(a) {
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload()
		} else {
			var b = this.settings.custom_settings.scope_handler;
			b.setBtnStatus(b, true)
		}
	},
	upload_error_handler : function(a, d, c) {
		var b = this.settings.custom_settings.scope_handler;
		var e = b.store.getById(a.id);
		e.set("percent", 0);
		e.set("status", a.filestatus);
		e.commit()
	},
	file_queue_error_handler : function(a, c, b) {
		var d = "";
		switch (c) {
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED :
				d = "上传文件列表数量超限,不能选择！";
				break;
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT :
				d = "文件大小超过限制, 不能选择！";
				break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE :
				d = "该文件大小为0,不能选择！";
				break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE :
				d = "该文件类型不允许上传！";
				break
		}
		Ext.Msg.show({
					title : "提示",
					msg : d,
					width : 250,
					icon : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK
				})
	}
});
Ext.define("jsf.upload.BatchUploadWin", {
			extend : "Ext.window.Window",
			alias : "widget.jsf.BatchUploadWin",
			width : 700,
			height : 400,
			autoShow : true,
			modal : true,
			layout : "fit",
			items : [],
			flash_url : "swfupload.swf",
			upload_url : "upload.json",
			file_types : "*.*",
			file_size_limit : "100MB",
			initComponent : function() {
				var a = this;
				a.items[0] = {
					xtype : "jsf.BatchUploadGrid",
					border : false,
					flash_url : a.flash_url,
					upload_url : a.upload_url,
					file_types : a.file_types,
					file_size_limit : a.file_size_limit,
					file_types_description : "file description",
					file_upload_limit : 0,
					file_queue_limit : 50
				}, a.callParent()
			}
		});
Ext.define("jsf.utils.AjaxUtil", {
			singleton : true,
			insert : function(c, e, a, b, d) {
				Ext.Ajax.request({
							url : c,
							params : e,
							method : "POST",
							success : function(f, h) {
								var g = Ext.decode(f.responseText);
								if (g.success) {
									if (!Ext.isEmpty(a)) {
										a.set(g.data);
										a.commit();
										if (!Ext.isEmpty(b)) {
											b.insert(0, a)
										}
									}
									if (!Ext.isEmpty(d)) {
										d.close()
									}
								}
							}
						})
			},
			update : function(c, e, a, b, d) {
				Ext.Ajax.request({
							url : c,
							params : e,
							method : "POST",
							success : function(f, h) {
								var g = Ext.decode(f.responseText);
								if (g.success) {
									if (!Ext.isEmpty(a)) {
										a.set(g.data);
										a.commit()
									}
									if (!Ext.isEmpty(d)) {
										d.close()
									}
								}
							}
						})
			},
			discard : function(b, a) {
				Ext.Ajax.request({
							url : b,
							params : {
								id : a.get("id"),
								ver : a.get("ver")
							},
							method : "POST",
							success : function(c, e) {
								var d = Ext.decode(c.responseText);
								if (d.success) {
									a.set(d.data);
									a.commit()
								}
							}
						})
			},
			del : function(b, a) {
				Ext.Ajax.request({
							url : b,
							params : {
								id : a.get("id"),
								ver : a.get("ver")
							},
							method : "POST",
							success : function(c, e) {
								var d = Ext.decode(c.responseText);
								if (d.success) {
									if (!Ext.isEmpty(a.store)) {
										a.store.remove(a)
									}
								}
							}
						})
			}
		});
Ext.define("jsf.utils.DictUtil", {
			singleton : true,
			getFieldName : function(c, d) {
				var b = Ext.getStore("dict." + c);
				if (Ext.isEmpty(b)) {
					return d
				} else {
					var a = b.findRecord("code", d);
					return a ? a.get("name") : d
				}
			},
			loadDicts : function(b, d, a, e, c) {
				e = Ext.isEmpty(e) ? {} : e;
				Ext.Ajax.request({
							url : b,
							params : d,
							success : function(f, j) {
								var g = Ext.decode(f.responseText);
								if (g.success && Ext.isArray(g.data)) {
									for (var h = 0; h < g.data.length; h++) {
										e.group = g.data[h];
										jsf.utils.DictUtil.loadDict(a, e, c,
												"dict." + g.data[h])
									}
								}
							}
						})
			},
			loadDict : function(c, d, b, e) {
				var a = Ext.getStore(e);
				if (Ext.isEmpty(Ext.ModelManager.getModel(b))) {
					Ext.syncRequire(b)
				}
				a = Ext.create("Ext.data.Store", {
							storeId : e,
							model : b,
							autoLoad : false,
							autoSync : false,
							proxy : {
								type : "ajax",
								url : c,
								reader : {
									type : "json",
									root : "data"
								}
							}
						});
				a.load({
							params : d
						});
				return a
			}
		});
Ext.define("jsf.utils.StoreUtil", {
			singleton : true,
			crtArrayStore : function(a, b) {
				if (Ext.isEmpty(Ext.ModelManager.getModel(a))) {
					Ext.syncRequire(a)
				}
				return st = Ext.create("Ext.data.Store", {
							model : a,
							data : b
						})
			},
			crtStore : function(a, c) {
				if (Ext.isEmpty(Ext.ModelManager.getModel(a))) {
					Ext.syncRequire(a)
				}
				if (Ext.isEmpty(c)) {
					var d = a.split(".");
					c = d[2] + "/" + d[3].substring(0, d[3].length - 2)
							+ "Action/query.json"
				}
				var b = Ext.create("Ext.data.Store", {
							model : a,
							autoLoad : false,
							autoSync : false,
							proxy : {
								type : "ajax",
								url : c,
								actionMethods : {
									create : "POST",
									read : "POST",
									update : "POST",
									destroy : "POST"
								},
								reader : {
									type : "json",
									root : "data"
								}
							}
						});
				return b
			},
			toArray : function(b) {
				var a = new Array();
				for (var c = 0; c < b.getCount(); c++) {
					a.push(b.getAt(c).getData())
				}
				return a
			}
		});
		
var required = '<font color="red"><sub><b> *</b></sub></font>';