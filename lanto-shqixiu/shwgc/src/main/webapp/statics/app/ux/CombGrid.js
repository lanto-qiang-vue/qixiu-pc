/**
 * Created by liuxin on 2015-04-24.
 */
Ext.define('app.ux.CombGrid', {
	extend : 'Ext.form.field.ComboBox',
	alias : 'widget.combgrid',

	multiSelect : true,
	gridWidth : 300,
	isCheckBox : true,
	gridHeight: 300,
	createPicker : function() {
		var me = this;
		var picker = Ext.create('Ext.grid.Panel', {
//					title : me.title,
					store : me.store,
					frame : true,
					resizable : true,
					columns : me.columns,
					selModel : me.isCheckBox ? Ext.create("Ext.selection.CheckboxModel", {
						mode : me.multiSelect ? 'SIMPLE' : 'SINGLE'
					}): {  
		                mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'  
		            },
					floating : true,
					hidden : true,
					width : me.gridWidth,
					height:me.gridHeight,
					columnLines : true,
					focusOnToFront : false
				});
		if(!Ext.isEmpty(me.title)){
			picker.setTitle(me.title);
		}
		if(me.paging){
			picker.addDocked(Ext.create('Ext.PagingToolbar', {
			            store: me.store,
			            dock : "bottom",
			            displayInfo: true,
			            pageSize : 25,
			            displayMsg: '显示{0} - {1}条，  共{2}条',
			            emptyMsg: "没有数据",
			            listeners : {
							afterrender : function(h, g) {
								h.insert(6, ["-", "每页", {
											xtype : "numberfield",
											width : 50,
											allowBlank : false,
											editable : true,
											value : h.getStore().pageSize,
											listeners : {
												blur : function(j, k, i) {
													h.getStore().pageSize = j.getValue();
													h.getStore()
															.loadPage(1)
												}
											}
										}, "条"])
							}
						}
			        }));
		}
		me.mon(picker, {
					itemclick : me.onItemClick,
					refresh : me.onListRefresh,
					scope : me
				});

		me.mon(picker.getSelectionModel(), {
					beforeselect : me.onBeforeSelect,
					beforedeselect : me.onBeforeDeselect,
					selectionchange : me.onListSelectionChange,
					scope : me
				});
		this.picker = picker;
		return picker;
	},

	onItemClick : function(picker, record) {
		var me = this, selection = me.picker.getSelectionModel().getSelection(), valueField = me.valueField;
		if (!me.multiSelect && selection.length) {
			if (record.get(valueField) === selection[0].get(valueField)) {
				me.displayTplData = [record.data];
				me.setRawValue(me.getDisplayValue());
				me.collapse();
			}
		}
	},

	matchFieldWidth : false,

	onListSelectionChange : function(list, selectedRecords) {
		var me = this, isMulti = me.multiSelect, hasRecords = selectedRecords.length > 0;
		if (!me.ignoreSelection && me.isExpanded) {
			if (!isMulti) {
				Ext.defer(me.collapse, 1, me);
			}
			if (isMulti || hasRecords) {
				me.setValue(selectedRecords, false);
			}
			if (hasRecords) {
				me.fireEvent('select', me, selectedRecords);
			}
//			if(!Ext.isEmpty(me.getItem)){
//				for(var m=0;m<me.getItem.length;m++){
//					var fi = me.next('[itemId=' + me.getItem[m] + ']');
//					var vi = [];
//					for(var i=0;i<selectedRecords.length;i++){
//						vi.push(selectedRecords[i].get(fi.nextName) + '');
//					}
//					fi.setValue(vi.join(','));
//				}
//			}
//			if(!Ext.isEmpty(me.parentVar)){
//				window[me.parentVar] = selectedRecords;
//			}
//			me.inputEl.focus();
		}
	},

	doAutoSelect : function() {
		var me = this, picker = me.picker, lastSelected, itemNode;
		if (picker && me.autoSelect && me.store.getCount() > 0) {
			lastSelected = picker.getSelectionModel().lastSelected;
			itemNode = picker.view.getNode(lastSelected || 0);
			var records = [];
			if(!Ext.isEmpty(me.getValue())){
				for(var j=0;j<me.getValue().length;j++){
					var record = me.store.findRecord('ROLE_ID',me.getValue()[j]);
					records.push(record);
				}
			}
			picker.getSelectionModel().select(records);
			if (itemNode) {
				picker.view.highlightItem(itemNode);
				picker.view.el.scrollChildIntoView(itemNode, false);
			}
		}
	},
	onChange: function(a,b,c,d){
		var me = this;
		me.setValue(a);
	}
});