Ext.define('app.view.manage.sys.RepairStandardImportWin',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.sys.RepairStandardImportWin',
	itemId: 'manage.sys.RepairStandardImportWin',
	title: '<i class="icon-level-down bigger-140 blue"></i> 车辆维修标准导入',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'border',
	width : 500,
	height:300,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			itemId:'npanel',
			bodyPadding : 10,
			items:[{
			        xtype: 'filefield',
			        name: 'uploadFile',
			        fieldLabel: '选择文件',
			        labelAlign:'right',
			        margin:10,
			        labelWidth: 100,
			        anchor: '80%',
			        buttonText: '浏 览',
			        buttonConfig: {
		                iconCls: 'icon-upload-alt bigger-120 blue'
		            }
			}]/*,
			buttons:[{xtype:'button',text:'下载导入模板',itemId:'modelBtn',iconCls:'icon-download-alt bigger-120 blue',
				handler : function(btn){
					var form = btn.up('form').getForm();
			    	var url = "manage/daily/checkproduc/downloadTemple";
					app.utils.CommonUtil.exportSubmit(form,url,null);
				}
			}]
			*/
		},{
			xtype:'panel',
			region:'center',
			anchor: '40%',
			html:'<div style="line-height:25px;padding:20px;"><div><font face="tahoma, arial, verdana, sans-serif">1、点击“<font color="#0000ff"><b>浏览</b></font>”按钮，找到您所要导入的<font color="#ff0000">Excel</font>文件,请确定文件中列表字段顺序为：<b>“【厂家】-【品牌】-【型号】-【维护周期】-【维护里程】 </b></font><span style="font-family: tahoma, arial, verdana, sans-serif;">”；</span></div><div><span style="font-family: tahoma, arial, verdana, sans-serif;">2、</span><font face="tahoma, arial, verdana, sans-serif">选择好文件后, 点“<font color="#0000ff"><b>确定</b></font>”按钮完成导入。</font></div></div>'
		}],
		me.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : [{
						xtype : 'button',
						itemId : 'downBtn',
						iconCls : 'icon-download bigger-120 blue',
						text : '下载模板',
						handler : function(btn) {
							window.location.href = "manage/sys/repairstandard/downloadTemple";
						}
				},'->',
					{
						xtype : 'button',
						itemId : 'sureBtn',
						iconCls : 'icon-ok blue',
						text : '确 定',
						handler : function(btn){
							var win = btn.up('window');
					    	var form = win.down('form').getForm();
					    	var url = 'manage/sys/repairstandard/doImport';
					    	if(form.isValid()){//验证通过（非空）
					    		Ext.Msg.confirm('提示信息','确认导入？',function(btn){
					    			if('yes' == btn){
					    				app.utils.CommonUtil.importSubmit(form,url,function(val){
					    					if(val.data.returnValue == '1'){
					    						var failureWin =  Ext.create('app.view.common.ImportFailureWin',{//错误提示页面（公共页面）
					    							title:'导入错误信息'
					    						});
												var form = failureWin.down('form');
												var errorShow = form.getForm().findField('errorShow');//得到表单中LABEL，用于输出错误信息
												var errorList = val.data.errorList;//得到校验EXCEL数据时的错误数据
												var errMsg = "";
												 Ext.Array.each(errorList, function(value) {
												        var errorMsg = value.errorMsg;
												        var rowNum = value.rowNum;
												        if(rowNum < 10){
												        	rowNum = '00' + rowNum;
												        }else if(rowNum < 100){
												        	rowNum = '0' + rowNum;
												        }
												        errMsg += "第<font color='blue'>"+rowNum+"</font>行 "+errorMsg+"</br>";//拼接错误消息
												    });
												 errorShow.setValue(errMsg);//在错误页面中给errorShow标签赋值显示
					    						failureWin.show();
					    					}else{
					    						Ext.Msg.alert('提示信息','批量导入成功!');
					    					//	me.getGridPanel().getStore().reload();
					    					}
					    				});
					    			}
					    		});
					    	}
						}
					},'-',{
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'icon-remove red',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				}]
			} ];
		me.callParent(arguments);
	}
});
