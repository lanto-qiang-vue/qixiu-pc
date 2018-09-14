
Ext.define('app.controller.repair.RepairGeneManageCtrl', {
    extend: 'Ext.app.Controller',
    views: ['repair.RepairGeneManageMngPanel',
    		'repair.RepairGeneManageEdit'],
    requires : ['app.utils.CommonUtil'],
    refs:[{ 
	    	ref: 'gridPanel', 
	        selector: 'panel[itemId=repair.RepairGeneManageMngPanel] panel[itemId=gpanel]' 
        },{ 
	    	ref: 'searchPanel', 
	        selector: 'panel[itemId=repair.RepairGeneManageMngPanel] panel[itemId=spanel]' 
        }
    ],
 
    init: function (ctrl) {
        this.control({
        	'panel[itemId=repair.RepairGeneManageMngPanel]': {
                afterrender : app.utils.CommonUtil.setPanelFuncPower
            },
        	'panel[itemId=repair.RepairGeneManageMngPanel] grid[itemId=gpanel]': {
                beforerender : this.initGridSearchCondition,
                beforeselect : this.initGridSelectCondition
            },
        	'panel[itemId=repair.RepairGeneManageMngPanel] button[itemId=searchBtn]': {
            	click: this.doSearch 
            },
            'panel[itemId=repair.RepairGeneManageMngPanel] grid[itemId=gpanel] toolbar[dock=top] button':{
            	click: this.gridBtnsHandler
            },
			'panel[itemId=repair.RepairGeneManageMngPanel] button[itemId=printBtn] menuitem':{
				click: this.doItemClick
			},        
            'window[itemId=repair.RepairGeneManageEdit] button[itemId=saveBtn]': {
            	click: this.doSave 
            },
          
            'window[itemId=repair.RepairGeneManageEdit] button[itemId=submitBtn]': {
            	click: this.doSubmit2 
            },  
            'window[itemId=repair.RepairGeneManageEdit] button[itemId=beginBtn]': {
            	click: this.doMaintain 
            },  
            'window[itemId=repair.RepairGeneManageEdit] button[itemId=endBtn]': {
            	click: this.doMaintain 
            },             
          //  'window[itemId=repair.RepairGeneManageEdit] button[itemId=printBtn]': {
           // 	click: this.doPrint2 
           // },
            'window[itemId=repair.RepairGeneManageEdit]': {
            	afterrender : app.utils.CommonUtil.setPanelFuncPower
            }
        });
    },
    //组件初始化时store上挂接查询form.
	initGridSearchCondition : function(grid, opts){
		var me = this;
    	var st = grid.getStore();
    	st.on('beforeload', function (store, options) {
            var fm = me.getSearchPanel().getForm();
            store.proxy.extraParams=fm.getValues(false,true);
            me.selChangeBtnByDisabled([],['editBtn','deleteBtn','submitBtn','stopBtn','cancelSubBtn']);
        });
        st.loadPage(1);
	},
	initGridSelectCondition: function( grid, record, index, eOpts ){
		var me = this;
		var mds = this.getGridPanel().getSelectionModel().getSelection();
		if(!Ext.isEmpty(mds) && mds.length > 0){
			var re = mds[0];
			if(re.get('STATUS') != record.get('STATUS') || re.get('IS_PRINT') != record.get('IS_PRINT')){
				if(!Ext.MessageBox.isVisible()){
					Ext.Msg.alert("系统提示","批量处理只能选择【提交状态】和【打印状态】均相同的记录！");
				}
				return false;
			}
		}else{
			if(record.get('STATUS') == '10091001'){
				
				me.selChangeBtnByDisabled(['editBtn','deleteBtn','submitBtn'],['cancelSubBtn','stopBtn']);
			}else if(record.get('STATUS') == '10091002'){
				//已打印
				if(record.get('IS_PRINT') == '10101002'){
					me.selChangeBtnByDisabled(['stopBtn'],['editBtn','deleteBtn','submitBtn','cancelSubBtn']);
				}else{
					me.selChangeBtnByDisabled(['cancelSubBtn'],['editBtn','deleteBtn','submitBtn','stopBtn']);
				}
			}else if(record.get('STATUS') == '10091003'){
				me.selChangeBtnByDisabled([],['editBtn','deleteBtn','submitBtn','stopBtn','cancelSubBtn']);
			}
		}
	
		return true;
	},
    //查询panel中点击查询
    doSearch: function(button){
		if( this.getSearchPanel().getForm().isValid() ){
			this.getGridPanel().getStore().loadPage(1);
		}
	},
	selChangeBtnByDisabled:function(a,b){
		var grid = this.getGridPanel();
		Ext.each(a,function(v){
			var btn = grid.down('button[itemId=' + v + ']');
			if(btn.isDisabled()){
				btn.setDisabled(false);
			}
		});
		Ext.each(b,function(v){
			var but = grid.down('button[itemId=' + v + ']');
			if(!but.isDisabled()){
				but.setDisabled(true);
			}
		});
	},
	gridBtnsHandler : function(button){
		var me = this;
		if( 'openBtn'==button.itemId ){
    		me.showAddUI(button);
    	}else if( 'editBtn'==button.itemId ){
    		me.showModifyUI(button);
    	}else if( 'deleteBtn' == button.itemId){
			this.doDelRecord(button);
    	}else if( 'viewBtn' == button.itemId){
			this.showViewUI(button);
    	}else if( 'submitBtn' == button.itemId){
			this.doSubmit(button);
    	}else if( 'cancelSubBtn' == button.itemId){
			this.doCancel(button);
    	}else if( 'printBtn' == button.itemId){
			//this.doPrint(button);
    	}else if( 'stopBtn' == button.itemId){
			this.doStop(button);
    	}else if( 'exportBtn' == button.itemId){
			this.doExport(button);
    	}else if( 'examinerBtn' == button.itemId){
			this.doExaminer(button);			
    	}else{
    		Ext.Msg.alert('错误','未定义事件 : '+button.itemId);
    	}
	},
	doSave : function(btn){
		var me = this;
		var win  = btn.up('window');
		var form = win.down('form').getForm();
		if(!form.isValid()){
			win.showTip();
			return false;
		}
		var data = form.getValues();
		var pgrid = win.down('grid[itemId=partsPanel]');
		var parray = [];
		var precords = pgrid.getStore().data.items;
		for(var i =0 ; i<precords.length;i++){
			var precord = precords[i];
			if(Ext.isEmpty(precord.data.PART_NAME)){
				Ext.Msg.alert('错误','配件名称不能为空');
				return false;
			}
			parray.push(precord.data);
		}
		/*
		var dvStore = win.down('dataview[itemId=dataviewid]').getStore();
		var dvRecords = dvStore.data.items;
		var newPhotos = '';
		for(var i =0;i<dvRecords.length;i++){
			var dvrecord = dvRecords[i];
			if(dvrecord.data.imgPath == ''){
				Ext.Msg.alert('错误','请等待图片上传完毕！');
				return false;
			}
			if(newPhotos == ''){
				newPhotos = dvrecord.data.imgPath;
			}else{
				newPhotos = newPhotos + '|' + dvrecord.data.imgPath;
			}
		}
		*/
		var photo = {
			OLD_PHOTO: '',
			NEW_PHOTO: '',
			REPAIR_PHOTO : ''
		};
		var params = {
			data : Ext.JSON.encode(data),
			parray: Ext.JSON.encode(parray),
			photo : Ext.JSON.encode(photo)
		};
		//console.log(params);
		Ext.MessageBox.confirm('系统提示','确认保存吗？',function(flag){
			if(flag=='yes'){
				var url = "client/repair/gene/save";
    			app.utils.AjaxCallbackUtil.ajaxTitleCallback(url,params,win,"正在保存中...",function(ret){
    				if( ret.success ){
    					if(Ext.isEmpty(data.GENE_ID)){
    						form.findField('GENE_ID').setValue(ret.data.geneId);
    						form.findField('BILL_CODE').setValue(ret.data.billCode);   						
    					}
    					me.getGridPanel().getStore().reload();
//    					win.close();
		        		Ext.Msg.alert('系统提示','保存成功！');
	          		}
    			});
    		}
		});	
	},
	//跳转新增页面
    showAddUI:function(btn){
      if(window['GL'].corpType != '10141001' && window['GL'].corpType != '10141002'){
      	Ext.Msg.alert('系统提示','当前只有一类企业和二类企业才能开具合格证！');
      	return ;
      }
      var win =	Ext.create('app.view.repair.RepairGeneManageEdit');
      win.show();
      win.initAddData();
    
    },
    showModifyUI:function(button) {
    	var me = this;
    	var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
		if( Ext.isEmpty(mds) || mds.length !=1 ){
			Ext.Msg.alert('系统提示','请选择1条记录！');
			return false;
		}
		if( mds[0].data.STATUS != '10091001' ){
			Ext.Msg.alert('系统提示','已提交或已作废的合格证不允许修改！');
			return false;
		}
		var params = {geneId : mds[0].data.GENE_ID,billCode:mds[0].data.BILL_CODE};
		var caption='未开工';
		
		if (mds[0].data.GD_STATUS=='10161001') {
			caption='未开工';
		} else if (mds[0].data.GD_STATUS=='10161002') {
			caption='维修中';
		} else if (mds[0].data.GD_STATUS=='10161003') {
			caption='已完工';
		} 
		caption= '修改维修记录'+'['+caption+']';
		
		var params = {geneId : mds[0].data.GENE_ID,billCode:mds[0].data.BILL_CODE};
		var win = Ext.create('app.view.repair.RepairGeneManageEdit',{title:caption});
		win.loadData(mds[0],params);
	},
	//删除
	doDelRecord : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
		if(Ext.isEmpty(mds)){
			Ext.Msg.alert('系统提示','请选择要删除的维修单！');
			return false;
		}
		var geneIds = "";
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(record.data.STATUS != '10091001'){
				Ext.Msg.alert('系统提示','已提交或已作废的合格证不能删除！');
				return false;
			}
			if(i == 0){
				geneIds = mds[i].data.BILL_CODE;
			}else{
				geneIds = geneIds + "," + mds[i].data.BILL_CODE;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认删除吗？',function(btn){
    		if(btn=='yes'){
    			var store = grid.getStore();
    			app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/repair/gene/delete',{geneIds:geneIds},function(ret){
    				if( ret.success ){
    					store.remove(mds);
		        		Ext.Msg.alert('系统提示','删除成功！');
	          		}
    			});
    		}
    	});
	},
	showViewUI:function(button) {
    	var me = this;
    	var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
		if( Ext.isEmpty(mds) || mds.length !=1 ){
			Ext.Msg.alert('系统提示','请选择1条记录！');
			return false;
		}
		var params = {geneId : mds[0].data.GENE_ID,billCode:mds[0].data.BILL_CODE};
		var caption='未开工';
		
		if (mds[0].data.GD_STATUS=='10161001') {
			caption='未开工';
		} else if (mds[0].data.GD_STATUS=='10161002') {
			caption='维修中';
		} else if (mds[0].data.GD_STATUS=='10161003') {
			caption='已完工';
		} 
		caption= '查看维修记录'+'['+caption+']';
		
		var win = Ext.create('app.view.repair.RepairGeneManageEdit',{title:caption});
		win.loadViewData(mds[0],params);
	},
	//提交
	doSubmit : function(button){
		var me = this;
		
		var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
	
		if(Ext.isEmpty(mds)){
			Ext.Msg.alert('系统提示','请选择要提交的维修单！');
			return false;
		}	
		var ids = "";
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(record.data.STATUS != '10091001'){
				Ext.Msg.alert('系统提示','已提交或已作废的合格证不能再提交！');
				return false;
			}
			if(record.data.GD_STATUS != '10161003'){
				Ext.Msg.alert('系统提示','没有完工不能提交！');
				return false;
			}			
			if((record.data.LEAVE_DATE - new Date()) < -24*60*60*1000 ){
				Ext.Msg.alert('系统提示','出厂日期不能小于当前日期！');
				return false;
			}
		
			if(i == 0){
				ids = record.data.GENE_ID;
			}else{
				ids = ids + "," + record.data.GENE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认要提交吗？',function(btn){
    		if(btn=='yes'){
    			var store = grid.getStore();
    			app.utils.AjaxCallbackUtil.ajaxTitleCallback('client/repair/gene/doSubmit',{ids:ids},me.getGridPanel(),"正在提交中...",function(ret){
    				if( ret.success ){
    					store.reload();
		        		Ext.Msg.alert('系统提示','提交成功！');
	          		}
    			});
    		}
    	});
	},
	//取消提交
	doCancel : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
		if(Ext.isEmpty(mds)){
			Ext.Msg.alert('系统提示','请选择要取消提交的合格证！');
			return false;
		}
		
		var ids = "";
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(record.data.STATUS != '10091002' || record.data.IS_PRINT == '10101002'){
				Ext.Msg.alert('系统提示','未提交或已打印的合格证不能取消提交！');
				return false;
			}
			if(i == 0){
				ids = record.data.GENE_ID;
			}else{
				ids = ids + "," + record.data.GENE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认要取消提交吗？',function(btn){
    		if(btn=='yes'){
    			var store = grid.getStore();
    			app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/repair/gene/doCancel',{ids:ids},function(ret){
    				if( ret.success ){
    					store.reload();
		        		Ext.Msg.alert('系统提示','取消提交成功！');
	          		}
    			});
    		}
    	});
	},
	//提交
	doSubmit2 : function(button){
		var me = this;
		var win = button.up('window');
		var form = win.down('form').getForm();
		if(!form.isValid()){
			win.showTip();
			return false;
		}
		if (form.findField('GD_STATUS').getValue()!='10161003') {
				Ext.Msg.alert('提示','没有完工不能提交！');
				return false;			
		}
		
		var data = form.getValues();
		var pgrid = win.down('grid[itemId=partsPanel]');
		var parray = [];
		var precords = pgrid.getStore().data.items;
		
		for(var i =0 ; i<precords.length;i++){
			var precord = precords[i];
			if(Ext.isEmpty(precord.data.PART_NAME)){
				Ext.Msg.alert('错误','配件名称不能为空');
				return false;
			}
			parray.push(precord.data);
		}
		//var dvStore = win.down('dataview[itemId=dataviewid]').getStore();
		//var dvRecords = dvStore.data.items;
		if(data.IS_CHANGE_PART == '10041001'){
			if(precords.length < 1){
				Ext.Msg.alert('错误','请录入维修配件');
				return false;
			}
//			if(dvRecords.length < 1){
//				Ext.Msg.alert('错误','请上传新配件图片！');
//				return false;
//			}
		}
		var newPhotos = '';
	/*	
		for(var i =0;i<dvRecords.length;i++){
			var dvrecord = dvRecords[i];
			if(dvrecord.data.imgPath == ''){
				Ext.Msg.alert('错误','请等待图片上传完毕！');
				return false;
			}
			if(newPhotos == ''){
				newPhotos = dvrecord.data.imgPath;
			}else{
				newPhotos = newPhotos + '|' + dvrecord.data.imgPath;
			}
		}
		*/
		var photo = {
			OLD_PHOTO: me.formatStr(win.down('[itemId=OLD_PHOTO]').getValue()),
			NEW_PHOTO: newPhotos,
			REPAIR_PHOTO : me.formatStr(win.down('[itemId=REPAIR_PHOTO]').getValue())
		};
		
		var params = {
			data : Ext.JSON.encode(data),
			parray: Ext.JSON.encode(parray),
			photo : Ext.JSON.encode(photo)
		};
		Ext.MessageBox.confirm('系统提示','确认要提交吗？',function(btn){
    		if(btn=='yes'){
    			var store = me.getGridPanel().getStore();
    			app.utils.AjaxCallbackUtil.ajaxTitleCallback('client/repair/gene/doSubmit2',params,win,"正在提交中...",function(ret){
    				if( ret.success ){
    					if(Ext.isEmpty(data.GENE_ID)){
    						form.findField('GENE_ID').setValue(ret.data.geneId);
    						form.findField('BILL_CODE').setValue(ret.data.billCode);
    					}
    					store.reload();
		        		Ext.Msg.alert('系统提示','提交成功！');
		        		win.down('button[itemId=submitBtn]').setDisabled(true);
		        		win.down('button[itemId=saveBtn]').setDisabled(true);
		        		win.down('toolbar[dock=top]').hide();
	          		}
    			});
    		}
    	});
	},
//开工
doMaintain : function(button){
	  var me = this;
	  var grid = me.getGridPanel();
	  var win = button.up('window');
	  var form = win.down('form').getForm();

	  var values= form.getValues();	 
	  if( values.BILL_CODE=='' ){
         Ext.Msg.alert('系统提示','请先保存数据！');
         return false;
      } 
     	   
	  var gongwei=values.GD_STATION;  
	  var tongdao1,tongdao2;
	  //根据工位获取通道
	  app.utils.AjaxCallbackUtil.asyncCall("client/repair/gene/getChannel",{GD_STATION:gongwei},function(ret1){
	       if( ret1.success ){
	       	  if (ret1.data.length==1) {
	       	  	//console.log(ret1.data[0]);
	       	  	tongdao1 = ret1.data[0].CHANNEL_CODE1;
	       	  	tongdao2 = ret1.data[0].CHANNEL_CODE2;
	       	   }
	        }
	   })
      if(Ext.isEmpty(tongdao1)){
 		Ext.Msg.alert('错误','通道1不能为空！');
		return false;     	
      }
      if(Ext.isEmpty(tongdao2)){
 		Ext.Msg.alert('错误','通道2不能为空！');
		return false;     	
      }                      
	  /*
      var gongwei='';	
	  if (values.GD_STATION=='10181001') {
	    gongwei='1001';
	  } else if (values.GD_STATION=='10181002') {
        gongwei='1002';							  	
	  } else if (values.GD_STATION=='10181003') {
        gongwei='1003';							  	
	  } else if (values.GD_STATION=='10181004') {
        gongwei='1004';							  		
	  } else if (values.GD_STATION=='10181005') {
        gongwei='1005';							  	
	  } else if (values.GD_STATION=='10181006') {
        gongwei='1006';							  	
	  } else if (values.GD_STATION=='10181007') {
        gongwei='1007';							  	
	  } else if (values.GD_STATION=='10181008') {
        gongwei='1008';		  
	  } else if (values.GD_STATION=='10181009') {
        gongwei='1009';	
	  } else if (values.GD_STATION=='101810010') {
	  	gongwei='1010';	   
	  };
	 */       
	 var corpNum=''; 
	
	 //获取企业编号
     app.utils.AjaxCallbackUtil.asyncCall('client/repair/gene/GetCorp','',function(ret){
        if(ret.success ){
        	corpNum = ret.data.corpNum;
          }
     });
   
	  var param ="{"+"'ORADER_NO'"+":'"+values.BILL_CODE+"'"+","
	                +"'POSITION_NO'"+":'"+gongwei+"'"+","
	                +"'CHANNEL_NUM1'"+":'"+tongdao1+"'"+","	  
	                +"'CHANNEL_NUM2'"+":'"+tongdao2+"'"+","	  	                
	                +"'UNIT_CODE'"+":'"+corpNum+"'"+
	              "}";
     var videoUrl = '';
     app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/repair/gene/GetVideoServer','',function(ret){
	       if(ret.success ){
              if (ret.data=='') {
            	   Ext.Msg.alert('提示','获取视频服务器设置失败！');
		           return false;	  	
              }
              videoUrl = "http://"+ret.data.serverIp+":"+ret.data.serverPort;  
              var r = InitTxOcx();
              if (r) {
	                //var Params = url+"/MonitorService/GetSrvTime|{'Pack_Name':'StartMaintain','data':{'ORADER_NO':'GD_TEST_1001','POSITION_NO':'1001','BOOKING_NUM':'','ORDER_NUM':'','ORDER_TYPE':'维修','ORDER_STATUS':'未派工','MAINTENANCE_TYPE':'二级维护','START_DATE':'2015-9-6','START_TIME':'14:52:38','OWNER_NUM':'KH201211-0001','OWNER_NAME':'ksks','VEHICLE_NATURE':'私用车','VEHICLE_NUM':'CL201509-0001','PLATE_NUM':'粤A.99888','PLATE_COLOR':'蓝','PLATE_TYPE':'小客车','PLATE_KIND':'','CAR_CANTON':'002','PURCHASE_DATE':'2015-8-7 14:48:32','UNIT_CODE':'cs001','CARD_NUM':'','MILES_FACTORY':'','VIN':'11100220','ENGINE_NUM':'110011','BRAND':'asdfas','SERIES':'asssss','MODEL':'fasdfasdf','SEND_PERSON':'彭生','SEND_GENDER':'男','SEND_PHONE':'20255658544','SEND_MOBILE':'13633332222','MAINTENANCE_MILEAGE_NEXT':'6000','MAINTENANCE_DATE_NEXT':'2015-12-5','CHASSIS_NUM':'6546546','FUEL_TYPE':'汽油','DEAD_WEIGHT':'2','PASSENGERS_NUM':'0','HIS_MOUNTS_OWED':'0','ADDRESS':'ADccccc','CORP_ID':'11111','CREATED':'设计人员','CREATETIME':'2015-9-6 14:52:38','MODIFIED':'','MODIFYTIME':'','REMARK':''}}";
	             var Params = "";
	             var Msg = "";
	             var flag = "";
	             if (button.itemId == 'beginBtn') {
	             	 Msg = '开工';
	             	 flag = '0';
		             Params = videoUrl+"/MonitorService/GetSrvTime|{'Pack_Name':'StartMaintain','data':"+param+"}";
	             } else if (button.itemId == 'endBtn') {
	             	 Msg = '完工';
	             	 flag = '1';
	                 Params = videoUrl+"/MonitorService/GetSrvTime|{'Pack_Name':'StopMaintain','data':"+param+"}";		
	              }              
                  console.log(Msg+':'+Params);
     
                  var value = plugin.CallOcx("HttpSrv",Params);
                  
              	  if (value.indexOf("成功") >-1 ) {//更新工单标志
      	             Ext.Msg.alert("系统提示",Msg+"成功！");
                     app.utils.AjaxCallbackUtil.ajaxTitleCallback('client/repair/gene/doBegin',{gene_id:values.GENE_ID,tag:flag},win,"正在更新工单标志...",function(ret){
                        if(ret.success ){
                        	if (Msg == '开工') {
                        	  form.findField('GD_STATUS').setValue('10161002');
                        	} else {
                        	  form.findField('GD_STATUS').setValue('10161003');
                        	}
                        	var store = me.getGridPanel().getStore();
                            store.reload();
                          }
                     });
                     app.utils.CommonUtil.setButtonHidden(win.down('button[itemId=beginBtn]'),true);
                     app.utils.CommonUtil.setHidden(win.down('button[itemId=endBtn]'),false);		        		
                  } else {
      	              Ext.Msg.alert("系统提示",value);
                        } 
              	} else {
                   Ext.Msg.alert('提示','初始化视频控件Ocx失败！');
		           return false;     		
              	}
              	
		   }
	 });

   },	
	//作废
	doStop : function(button){
		var me = this;
		var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
		if(Ext.isEmpty(mds)){
			Ext.Msg.alert('系统提示','请选择要作废的合格证！');
			return false;
		}
		var ids = "";
		for(var i=0;i<mds.length;i++){
			var record = mds[i];
			if(record.data.STATUS != '10091002' || record.data.IS_PRINT != '10101002'){
				Ext.Msg.alert('系统提示','已提交已打印的合格证才能作废！');
				return false;
			}
			if(i == 0){
				ids = record.data.GENE_ID;
			}else{
				ids = ids + "," + record.data.GENE_ID;
			}
		}
		Ext.MessageBox.confirm('系统提示','确认要作废吗？',function(btn){
    		if(btn=='yes'){
    			var store = grid.getStore();
    			app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/repair/gene/doStop',{ids:ids},function(ret){
    				if( ret.success ){
    					store.reload();
		        		Ext.Msg.alert('系统提示','作废成功！');
	          		}
    			});
    		}
    	});
	},
	doPrint:function(button){
		var me = this;
    	var grid = me.getGridPanel();
		var mds = grid.getSelectionModel().getSelection();
		if( Ext.isEmpty(mds) || mds.length !=1 ){
			Ext.Msg.alert('系统提示','请选择1条记录！');
			return false;
		}

		if( mds[0].data.CHECK_DJ != '合格' ){
			Ext.Msg.alert('系统提示','没有检测合格的检测记录，不允许打印！');
			return false;
		}
//		var params = {
//			type:type,
//			geneId : mds[0].data.GENE_ID
//		};
		if (Ext.isChrome){
			var win =	Ext.create('app.view.common.PagePrintWin',{title:'合格证打印',width:1050,pwidth:1050});
			win.show();
			win.loadData("client/repair/gene/print/for_" + mds[0].data.GENE_ID);
		}else{
			window.open("client/repair/gene/print/for_" + mds[0].data.GENE_ID + "?flag=IE");
		}
		
//		app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/repair/gene/doPrint',params,function(ret){
//			if( ret.success ){
//				InitOcx();
//				var status = plugin.CallOcx("print",ret.data); 
//				FreeOcx();
//				me.getGridPanel().getStore().reload();
//      		}
//		});
	},
	doPrint2:function(button){
		var me = this;
    	var grid = me.getGridPanel();
		var win = button.up('window');
		var form = win.down('form').getForm();
		var values = form.getValues();
		var type = 2;
		if (Ext.isChrome){
			var win =	Ext.create('app.view.common.PagePrintWin',{title:'合格证打印',width:1050,pwidth:1050});
			win.show();
			win.loadData("client/repair/gene/print/for_" + form.findField('GENE_ID').getValue());
		}else{
			window.open("client/repair/gene/print/for_" + form.findField('GENE_ID').getValue() + "?flag=IE");
		}
		
//		app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/repair/gene/doPrint',params,function(ret){
//			if( ret.success ){
//				InitOcx();
//				var status = plugin.CallOcx("print",ret.data); 
//				FreeOcx();
//				grid.getStore().reload();
//      		}
//		});
	},
	doExport : function(button){
		var form =  this.getSearchPanel().getForm();
		if(!form.isValid()){return;}
		var url = "client/repair/gene/doExport";
		app.utils.CommonUtil.exportStandardSubmit(form,url,null);
	},
	formatStr:function(str){
		if(Ext.isEmpty(str)){
			return null;
		}
		return str;
	},	
	doItemClick: function(a,b){
		var me = this;
		var grid = me.getGridPanel();
		var ret = app.utils.FunUtils.singleChecks(grid);
		if(!ret.success){
			return false;
		}
		var mds = ret.result;
		if( mds.data.CHECK_DJ != '合格' ){
			Ext.Msg.alert('系统提示','没有检测合格的检测记录，不允许打印！');
			return false;
		}		
		var params = {
			type: a.type,
			data : Ext.JSON.encode(mds.data)
		};
		app.utils.AjaxCallbackUtil.ajaxCallbackAll('client/repair/gene/doPrint',params,function(ret){
			if( ret.success ){
				InitOcx();
				var status = plugin.CallOcx("print",ret.data); 
				FreeOcx();
      		}
		});
	}	
});
