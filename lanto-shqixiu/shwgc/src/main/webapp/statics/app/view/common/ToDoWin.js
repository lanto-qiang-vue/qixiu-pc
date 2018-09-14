Ext.define('app.view.common.ToDoWin', {
    extend: 'Ext.window.Window',
    alias:'widget.common.ToDoWin',
    itemId : 'common.ToDoWin',
    height: 600,
    width: 1000,
    title:'待办事项',
    iconCls: "history_button",
    autoShow : true,
    modal : true,
    maximizable : true,
    layout : 'fit',
    requires : [ 'jsf.container.ModelContainer' ],
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
            		{
            			xtype:'tabpanel',
            		//	autoScroll : true,
            			items:[
            				me.getActivePanel(),
            				me.getAleardPanel(),
//            				me.getCcworksPanel(),
            				me.getMyFlowPanel()]
            		}
                
            ]
        });
        me.callParent(arguments); //需要初始化
        me.on('restore',function(win){
	    	win.setWidth(1000);
	    	win.setHeight(600);
	    	win.getEl().center();
	    });
        try {
			 var agrid= me.down('grid[itemId=activegrid]');
             var astore = agrid.getStore(); 
             astore.on('datachanged',function(st,opts){
            	 agrid.setTitle('待办任务' + '<font color="red">[共：' + st.getTotalCount() + '项]</font>');
            	 var todo = Ext.ComponentQuery.query('button[itemId=todo_activeTask]');
            	 if(!Ext.isEmpty(todo)){
            	 	if(st.getTotalCount() > 0){
						todo[0].setText('待办事项<span class="badge alert-danger" >' + st.getTotalCount() + '</span>');
					}else{
						todo[0].setText('待办事项');
					}
            	 }
//            	 me.createTip(agrid);
             });
             var dgrid= me.down('grid[itemId=alreadgrid]');
             var dstore = dgrid.getStore(); 
             dstore.on('datachanged',function(st,opts){
            	 dgrid.setTitle('已办任务' + '<font color="red">[共：' + st.getTotalCount() + '项]</font>');
             });
//             var cgrid= me.down('grid[itemId=ccworksgrid]');
//             var cstore = cgrid.getStore(); 
//             cstore.on('datachanged',function(st,opts){
//            	 cgrid.setTitle('抄送任务' + '<font color="red">[共：' + st.getTotalCount() + '项]</font>');
//             });
             var bgrid= me.down('grid[itemId=aidantgrid]');
             var bstore = bgrid.getStore(); 
             bstore.on('datachanged',function(st,opts){
            	 bgrid.setTitle('我的申请' + '<font color="red">[共：' + st.getTotalCount() + '项]</font>');
             });
//             me.down('tabpanel').on('tabchange',function(tabPanel, newCard, oldCard, eOpts){
//             	me.createTip(newCard.down('grid'));
//             });
        } catch (err) {
            if(console)    console.error(err);
        }
    },
    getActivePanel : function(){
    	var me = this;
    	return {
    		xtype:'panel',
    		title:'待办任务',
    		layout:'fit',
    		items:[{
                xtype: 'jsf.ModelGrid',
                itemId : 'activegrid',
                title:'待办任务',
                rowSelType : false,
                region : 'center',
//                plugins: [{
//		            ptype: 'rowexpander',
//		            selectRowOnExpand:false,
//		            listeners:{
//			            expandbody:function(){//OK，可以触发
//			                console.log('fired from grid');
//			            }
//			        },
//		            rowBodyTpl : new Ext.XTemplate(
//		                '<p><b>Company:</b> {processId}</p>',
//		                '<p><b>Change:</b> {orderId:this.formatChange}</p><br>',
//		                '<p><b>Summary:</b> {orderNo}</p>',
//		            {
//		                formatChange: function(v){
//		                }
//		            })
//		        }],
                model: 'app.model.common.ToDo',
                features: [{ftype:'grouping'}],
                listeners:{
		            afterrender:function(cmp){
		                cmp.getStore().group('processName','ASC');
		            }
		        },
                url: 'client/sys/task/active', 
                columns: [
                	{text : '序号',xtype : 'rownumberer'},
                	{fname : 'processName',width : 200},  
                	{fname : 'orderNo',width : 140}, 
                	{fname : 'taskName',width : 140},
                	{fname : 'orderCreateTime',width : 150},
                	{fname : 'taskCreateTime',width : 150},
                	{
	  			    	fname:'操作',
	  			    	width:130,
	  			    	xtype:'actiontextcolumn',
	  			    	items : [{
									text : '[处理]',
									isShow : true,
									handler : function(grid, rowIndex, colIndex){
										var mds = grid.getStore().getAt(rowIndex);
										var loadingPanel = me.down('tabpanel');
										loadingPanel.setLoading('正在打开...');
										var title = mds.raw.processName + '-->' + mds.raw.taskName;
										var isEdit = false;
										var key = mds.raw.taskKey;
										if(key == 'apply'){
											isEdit = true;
										}
										app.utils.AjaxCallbackUtil.ajaxLoadingCallback('client/common/business/getModel',{orderId:mds.data.orderId},loadingPanel,function(ret){
											if( ret.success ){
												var data = ret.data;
												var win =	Ext.create('app.view.' + mds.raw.instanceUrl + 'Edit',{title:title,isEdit:isEdit,fileBillId:data.fileBillId});
												win.show();
												if(key == 'apply'){
													win.loadData(data);
												}else if(key == 'process' || key == 'reprocess'){
													var upload = win.down('#fileUploadGrid');
													if(!Ext.isEmpty(upload)){
														upload.setForEdit(false);
													}	
													win.loadProcessData(data);
												}else if(key == 'check'){
													win.loadCheckData(data);
													var upload = win.down('#fileUploadGrid');
													if(!Ext.isEmpty(upload)){
														upload.setForEdit(false);
													}	
												}else if(key == 'complete'){
													win.loadCompleteData(data);
													var upload = win.down('#fileUploadGrid');
													if(!Ext.isEmpty(upload)){
														upload.setForEdit(false);
													}	
												}else if(key == 'accept'){
													win.loadAcceptData(data);
													var upload = win.down('#fileUploadGrid');
													if(!Ext.isEmpty(upload)){
														upload.setForEdit(false);
													}	
												}else{
													Ext.Msg.alert('系统提示','不存在的环节！');
												}
												var upload = win.down('#fileUploadGrid');
												if(!Ext.isEmpty(upload)){
													upload.reload();
												}	
												win.getEl().center();
												loadingPanel.setLoading(false);
								      		}
										});			
									}
								},{
									text : '[提取]',
									isShow : true,
									handler : function(grid, rowIndex, colIndex){
										var mds = grid.getStore().getAt(rowIndex);
										var params = {
											processId:mds.get('processId'),
											orderId:mds.get('orderId'),
											taskId:mds.get('taskId')
										};
										Ext.MessageBox.confirm('系统提示','确认要提取任务吗？</br> <font color="red">提取任务后别人将失去处理该任务的权限！</font>',function(flag){
											if(flag=='yes'){
												var url = 'client/sys/task/stake';
												app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
													if( ret.success ){
														grid.getStore().reload();
														Ext.Msg.alert('系统提示','提取成功！');
													}
												});
											}
										});		
									}
								}]
				    }
                ],
      			btns : [{xtype:'form',frame:true,itemId:'active_form',items:[{
								xtype : 'jsf.ModelContainer',
								bodyPadding : 5,
								model : 'app.model.common.ToDo',
								showType:'search',
								defaults: {msgTarget:'side',width:250},
								layout: {
				            		type: 'table',
				            		columns: 5
				        		},
								labelWidth: 60,
								btns:[],
								items: [
									{
						        	 xtype:'combo',
						        	 name:'processName',
						        	 fieldLabel:'业务名称',
						        	 store:{
						        		 fields:['ID','DISPLAY_NAME'],
						        		 proxy:{
						        			url:'client/sys/task/flowList',
						        			type:'ajax',
						        			reader:{
						        				type:'json',
						        				root:'data'
						        			}
						        		 },
						        		 autoLoad:true
						        	 },
						        	 displayField:'DISPLAY_NAME',
					 			     valueField:'ID'
						         	},
									{fname:'orderNo',emptyText:'输入业务流水号查询'},
									{xtype:'button',text:'查询',iconCls:'icon-search bigger-120 blue',width:60,handler : function(btn) {
										var form = btn.up('form[itemId=active_form]').getForm();
										var store = btn.up('grid').getStore();
										store.proxy.extraParams=form.getValues(false,true);
										store.loadPage(1);
									}},
									{xtype:'button',text:'重置',iconCls:'icon-reply bigger-120 blue',width:60,handler : function(btn) {
										var form = btn.up('form[itemId=active_form]').getForm();
										form.reset();
									}}
								]
							}]
					},'->',{
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				}]
            }]
    	};
    },
    getAleardPanel : function(){
    	var me = this;
    	return {
    		xtype:'panel',
    		title:'已办任务',
    		layout:'fit',
    		items:[{
                xtype: 'jsf.ModelGrid',
                itemId : 'alreadgrid',
                title:'已办任务',
                rowSelType : false,
                region : 'center',
                features: [{ftype:'grouping'}],
                listeners:{
		            afterrender:function(cmp){
		                cmp.getStore().group('processDisplayName','ASC');
		            }
		        },
                model: 'app.model.common.FlowStatus',
                url: 'client/sys/task/alleard', 
                columns: [
                	{text : '序号',xtype : 'rownumberer'},
                	{fname:'processDisplayName',width:200},
                	{fname : 'orderNo',width : 120},
                	{fname : 'displayName',width : 100},  
                	{fname : 'createTime',width : 150}, 
                	{fname : 'finishTime',width : 150},
                	'operator',
                	{fname:'variable',
                    		renderer : function(v,a,r){
                    			var data = eval('(' + v + ')');
                    			var me = data.status;
                    			if(me == '10211004' || me == '10211006' || me == '10211008'){
                    				return '同意';
                    			}
                    			if(me == '10211003' || me == '10211005' || me == '10211007'){
                    				return '不同意';
                    			}
                    			if(me == '10211002'){
                    				return '提交申请';
                    			}
                    			if(me == '10241003'){
                    				return '合格';
                    			}
                    			if(me == '10241001'){
                    				return '不合格';
                    			}
                    			if(me == '10241002'){
                    				return '提交整改报告';
                    			}
                    			return r.data.displayName;
                    		}
                    	}
                	,{
	  			    	fname:'操作',
	  			    	xtype:'actiontextcolumn',
	  			    	items : [{
									text : '[查看]',
									isShow : true,
									handler : function(grid, rowIndex, colIndex){
										var mds = grid.getStore().getAt(rowIndex);
										var loadingPanel = me.down('tabpanel');
										loadingPanel.setLoading('正在打开...');
										var title = mds.raw.processDisplayName + '-->查看处理情况';
										var isEdit = false;
										app.utils.AjaxCallbackUtil.ajaxLoadingCallback('client/common/business/getModel',{orderId:mds.data.orderId},loadingPanel,function(ret){
											if( ret.success ){
												var data = ret.data;
												var win =	Ext.create('app.view.' + data.instanceUrl + 'Edit',{title:title,isEdit:isEdit,fileBillId:data.fileBillId});
												win.show();
												win.loadViewData(data);
												var upload = win.down('#fileUploadGrid');
												if(!Ext.isEmpty(upload)){
													upload.setForEdit(false);
													upload.reload();
												}	
												win.getEl().center();
												loadingPanel.setLoading(false);
								      		}
										});			
									}
								}]
				    }
                ],
      			btns : [{xtype:'form',frame:true,itemId:'alread_form',items:[{
								xtype : 'jsf.ModelContainer',
								model : 'app.model.common.ToDo',
								showType:'search',
								defaults: {msgTarget:'side',width:250},
								layout: {
				            		type: 'table',
				            		columns: 4
				        		},
								labelWidth: 60,
								btns:[],
								items: [
									{
						        	 xtype:'combo',
						        	 name:'processName',
						        	 fieldLabel:'业务名称',
						        	 store:{
						        		 fields:['ID','DISPLAY_NAME'],
						        		 proxy:{
						        			url:'client/sys/task/flowList',
						        			type:'ajax',
						        			reader:{
						        				type:'json',
						        				root:'data'
						        			}
						        		 },
						        		 autoLoad:true
						        	 },
						        	 displayField:'DISPLAY_NAME',
					 			     valueField:'DISPLAY_NAME'
						         	},
									{fname:'orderNo',emptyText:'输入业务流水号查询'},
									{xtype:'button',text:'查询',iconCls:'icon-search bigger-120 blue',width:60,handler : function(btn) {
										var form = btn.up('form[itemId=alread_form]').getForm();
										var store = btn.up('grid').getStore();
										store.proxy.extraParams=form.getValues(false,true);
										store.loadPage(1);
									}},
									{xtype:'button',text:'重置',iconCls:'icon-reply bigger-120 blue',width:60,handler : function(btn) {
										var form = btn.up('form[itemId=alread_form]').getForm();
										form.reset();
									}}
								]
							}]
					},'->',{
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				}]
            }]
    	};
    },
    getMyFlowPanel : function(){
    	var me = this;
    	return {
    		xtype:'panel',
    		title:'我的申请',
    		layout:'fit',
    		items:[{
                xtype: 'jsf.ModelGrid',
                itemId : 'aidantgrid',
                title:'我的申请',
                rowSelType : false,
                region : 'center',
                model: 'app.model.common.ToDoCC',
                url: 'client/sys/task/myflow', 
                columns: [
                	{text : '序号',xtype : 'rownumberer'},
                	{fname : 'processName',width : 180},  
                	{fname : 'orderNo',width : 150}, 
                	{fname : 'createTime',width : 150},
                	{fname : 'endTime',width : 150},
                	'creator',
                	{fname : 'orderState',width : 100,
                		renderer:function(v){
                			if(v == '0'){
                				return '已结束';
                			}else{
                				return '进行中';
                			}
                		}
                	},
                	{
	  			    	fname:'操作',
	  			    	width:100,
	  			    	xtype:'actiontextcolumn',
	  			    	items : [{
									text : '[查看处理情况]',
									isShow : true,
									handler : function(grid, rowIndex, colIndex){
										var mds = grid.getStore().getAt(rowIndex);
										var loadingPanel = me.down('tabpanel');
										loadingPanel.setLoading('正在打开...');
										var title = mds.raw.processName + '-->查看处理情况';
										var isEdit = false;
										app.utils.AjaxCallbackUtil.ajaxLoadingCallback('client/common/business/getModel',{orderId:mds.data.id},loadingPanel,function(ret){
											if( ret.success ){
												var data = ret.data;
												var win =	Ext.create('app.view.' + data.instanceUrl + 'Edit',{title:title,isEdit:isEdit,fileBillId:data.fileBillId});
												win.show();
												win.loadViewData(data);
												var upload = win.down('#fileUploadGrid');
												if(!Ext.isEmpty(upload)){
													upload.setForEdit(false);
													upload.reload();
												}	
												win.getEl().center();
												loadingPanel.setLoading(false);
								      		}
										});			
									}
								}]
				    }
                ],
      			btns : []
            }]
    	};
    },
    getCcworksPanel : function(){
    	var me = this;
    	return {
    		xtype:'panel',
    		title:'抄送任务',
    		layout:'fit',
    		items:[{
                xtype: 'jsf.ModelGrid',
                itemId : 'ccworksgrid',
                title:'抄送任务',
                rowSelType : false,
                region : 'center',
                model: 'app.model.common.ToDoCC',
                url: 'client/sys/task/ccworks', 
                columns: [
                	{text : '序号',xtype : 'rownumberer'},
                	{fname : 'processName',width : 180},  
                	{fname : 'orderNo',width : 180}, 
                	{fname : 'createTime',width : 150},
                	'creator',
                	{fname : 'orderState',width : 150,
                		renderer:function(v){
                			if(v == 0){
                				return '已结束';
                			}else{
                				return '进行中';
                			}
                		}
                	},
                	{
	  			    	fname:'操作',
	  			    	width:150,
	  			    	xtype:'actiontextcolumn',
	  			    	items : [{
									text : '[查看]',
									isShow : true,
									handler : function(grid, rowIndex, colIndex){
										var mds = grid.getStore().getAt(rowIndex);
										var win =	Ext.create('app.view.common.CommonFlowWin');
										win.show();
										var params = {
											processId:mds.get('processId'),
											orderId:mds.get('id'),
											taskId:mds.get('taskId'),
											isView : true
										};
										win.loadData(params);
										
									}
								}]
				    }
                ],
      			btns : []
            }]
    	};
    },
    loadData:function(){
    	var me = this;
        me.down('grid[itemId=activegrid]').getStore().loadPage(1);
        me.down('grid[itemId=alreadgrid]').getStore().loadPage(1);
        me.down('grid[itemId=aidantgrid]').getStore().loadPage(1);
//        me.down('grid[itemId=ccworksgrid]').getStore().loadPage(1);
    },
    createTip:function(grid){
    	 var view = grid.getView();
         var tip = Ext.create('Ext.tip.ToolTip', {
		    target: view.el,
		    delegate: view.itemSelector,
		    trackMouse: true,
		    autoHide:false,
		    anchor: 'top',
//			closable: true,
//		    anchorOffset: 20,
//			renderTo: Ext.getBody(),
		    listeners: {
		        beforeshow: function updateTipBody(tip) {
		        	var clas = "'padding:2px;border:solid 1px #C7C7E2!important;'";
		        	var html = "<table><th style='border:solid 1px #C7C7E2!important;'>任务名称</th><th style='padding:2px;border:solid 1px #C7C7E2!important;'>处理结果</th><th style='padding:2px;border:solid 1px #C7C7E2!important;'>任务抵达时间</th><th style='padding:2px;border:solid 1px #C7C7E2!important;'>任务完成时间</th><th style='padding:2px;border:solid 1px #C7C7E2!important;'>处理人</th>";
		        	var url = 'client/sys/task/FlowStatus';
		        	var orderId = view.getRecord(tip.triggerElement).get('orderId');
		        	if(Ext.isEmpty(view.getRecord(tip.triggerElement).get('orderId'))){
		        		orderId = view.getRecord(tip.triggerElement).get('id');
		        	}
		        	var params = {
							processId: view.getRecord(tip.triggerElement).get('processId'),
							orderId: orderId,
							taskId:view.getRecord(tip.triggerElement).get('taskId'),
							isView : false
						};
					app.utils.AjaxCallbackUtil.ajaxCallbackAll(url,params,function(ret){
						var data = ret.data;
						if(!Ext.isEmpty(data)){
							for(var i=0;i<data.length;i++){
								var record = data[i];
								var variable = record.variable;
								var v = eval('(' + variable + ')');
                    			var meth = v.method;
                    			if(meth == '0'){
                    				meth = '同意';
                    			}
                    			else if(meth == '-1'){
                    				meth = '不同意';
                    			}
                    			else if(meth == '1'){
                    				meth = '转派';
                    			}
                    			else{
                    				meth = record.displayName;
                    			}
								html = html +　"<tr><td style=" + clas + ">" + record.displayName + "</td>";
								html = html +　"<td style=" + clas + ">" + meth + "</td>";
								html = html +　"<td style=" + clas + ">" + record.createTime + "</td>";
								html = html +　"<td style=" + clas + ">" + record.finishTime + "</td>";
								html = html +　"<td style=" + clas + ">" + record.operator + "</td></tr>";
							}
						}
						html = html + "</table>";
//						html = html + '<iframe height="100%" width="100%" src="client/sys/flow/diagram?processId=' + params.processId + '&orderId=' + params.orderId +'" scrolling="yes" frameborder="0" id="flow_status_win"></iframe>';
						tip.update(html);
					});
		        }
		    }
		});
    }
});
