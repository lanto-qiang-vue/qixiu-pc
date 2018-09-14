Ext.define('app.view.common.RepairSelWin', {
			extend : 'Ext.window.Window',
			alias : 'widget.common.RepairSelWin',
			itemId : 'common.RepairSelWin',
			autoShow : true,
			autoScroll : true,
			modal : true,
			width : 300,
			layout:'fit',
			title:'选择维修项目种类（可多选）',
			height : 400,
			initComponent : function() {
				var me = this;
				me.items =[{
								xtype : 'form',
								autoScroll:true,
								items:[
									{
								        xtype: 'checkboxgroup',
								        itemId:'checklist',
								        columns: 1,
								        vertical: true,
								        items: [
								            
								        ]
								    }
								]
							}];
				me.bbar = ['->',
							{
								xtype : 'button',
								itemId : 'sureBtn',
								iconCls : 'accept_button',
								text : '确 定',
								handler : function(btn) {
									var win = btn.up('window');
									var checklist = win.down('checkboxgroup');
									win.callback(checklist.getChecked());
									win.close();
								}
							},'-', {
								xtype : 'button',
								itemId : 'closeBtn',
								iconCls : 'close_button',
								text : '关 闭',
								handler : function(btn) {
									btn.up('window').close();
								}
						} ];
				me.callParent(arguments);
			},
			loadData:function(type,data){
				var me = this;
				var checklist = me.down('checkboxgroup');
				checklist.removeAll();
				var list = [];
				if(type == '10141001' || type == '10141002'){
					list = ['10211001','10211002','10211003','10211004'];
				}else{
					list = ['10211005','10211006','10211007','10211008','10211009','10211010','10211011',
					'10211012','10211013','10211014','10211015','10211016','10211017','10211018','10211019'];
				}
				for(var i=0;i<list.length;i++){
					var ch = list[i];
					var name = app.utils.DictUtil.getFieldName(ch);
					var ischeck = false;
					if(!Ext.isEmpty(data)){
						var datas = data.split(',');
						for(var j=0;j<datas.length;j++){
							if(datas[j] == name){
								ischeck = true;
							}
						}
					}
					checklist.add({ boxLabel: name, name: 'ch' + ch, inputValue: name,checked:ischeck});
				}
			}
		});
