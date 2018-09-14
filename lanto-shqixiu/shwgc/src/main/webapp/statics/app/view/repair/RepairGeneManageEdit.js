Ext.define('app.view.repair.RepairGeneManageEdit', {
	extend:'Ext.window.Window',
	alias : 'widget.repair.RepairGeneManageEdit',
	itemId:'repair.RepairGeneManageEdit',
	autoShow:true,
	layout : 'fit',
    title : '开具维修记录',
    width : 830,
    height : 560,
//    collapsible: true,
//    animCollapse: true,
//    maximizable: true,
    modal : true,
    initComponent:function() {
		var me = this;
		me.items = [{
			xtype:'tabpanel',
			items:[{
				xtype:'panel',
				layout : 'border',
				title:'维修记录信息',
				items:[{
			        xtype : 'form',
			        itemId:'infoForm',
			        title:'竣工维修记录基本信息',
			        region : 'north',
			        bodyPadding : 5,
			      //  items : [me.line1(),me.getVedioPanel()]
			        items : [me.line1()]
			        }]
			},me.getParts(),me.getPhoto()]
		}];
		me.dockedItems = [ {
	            xtype : 'toolbar',
	            dock : 'bottom',
	            layout : {
	                pack : 'end'
//	                type : 'hbox'
	            },
				items : [
                     {
	    	                xtype : 'button',
	    	                itemId : 'beginBtn',
	    	                iconCls: 'edit_button',
	    	                id: 'beginBtn',
	    	                text : '开工' 
            		 },'-',
            		 {
	    	                xtype : 'button',
	    	                itemId : 'endBtn',
	    	                iconCls: 'stop_button',
	    	                id: 'endBtn',
	    	                text : '完工'
            		 },'-','->',
                     {
	    	                xtype : 'button',
	    	                itemId : 'saveBtn',
	    	                iconCls: 'save_button',
	    	                id: 'saveBtn',
	    	                text : '保存'
            		 },'-',
            		 {
	    	                xtype : 'button',
	    	                itemId : 'submitBtn',
	    	                iconCls: 'accept_button',
	    	                text : '提交'
            		 },'-',
//            		 {
//	    	                xtype : 'button',
//	    	                itemId : 'printBtn',
//	    	                iconCls: 'print_button',
//	    	                disabled:true,
//	    	                text : '打印'
//            		 },'-',
            		 {
            			 	xtype : 'button',
            			 	id : 'cancelBtn',
	    	                itemId : 'closeBtn',
	    	                iconCls: 'close_button',
	    	                text : '关闭',
	    	                handler : function(btn) {
	    		                btn.up('window').close();
	    	                }
            		 }
                     ]	
			}];

		  me.callParent(arguments);
        
        me.down('form[itemId=infoForm]').getForm().findField('LEAVE_MILEAGE').on('change', function(obj, v1,v2) {
        	var value = v1 + '';
        	if(value.length > 8){
        		obj.setValue(v2);
        	}
        });
        
        me.down('form[itemId=infoForm]').getForm().findField('TEL_PHONE').on('change', function(obj, v1,v2) {
        	var value = v1 + '';
        	if(value.length > 11){
        		obj.setValue(v2);
        	}
        }); 
      
	},
    line1:function(){
    	var me = this;
    	return {
    		
			xtype:"jsf.ModelContainer",
			id:'tip',
			autoScroll:true,
			labelWidth:85,	        			
	    	model:'app.model.repair.RepairGeneManageModel',
	    	layout:{
	            type: 'table',
	            columns: 4,
	            width:'100%'
	        },
	    	items:[{fname:'GENE_ID',hidden: true},
	    		   {fname:'INSPECTOR_NAME',hidden: true},	//为INSPECTOR_ID 下拉框刚进入编辑页面赋值
	    		   {xtype:'hidden',name:'VEHICLE_ID'},
	    		   {fname:'BILL_CODE',hidden:true},    		   
	    		   {fname:'LOGIN_FLAG',hidden:true,value:loginFlag},
	    		   {fname:'ORDER_NO',hidden:true,value:orderNo},    		   
			       {fname:'CORP_NAME',value:window.GL.corpName,readOnly:true,width:300},
		         	{
						xtype:'jsf.ComboDict',
						flex:1,
						width:220,
						colspan: 2,
						msgTarget:'under',
						beforeLabelTextTpl: required,
						fieldLabel:'维修类别',
						allowBlank:false,
						meta:{
							val:'dict|dict.1012'
						},
						name:'REPAIR_TYPE'
					},
			       {fname:'LEAVE_DATE',allowBlank:false,editable:false, minValue: new Date(),width:220,value:new Date()},
			       {
						xtype : "fieldcontainer",
						width:300,
						fieldLabel : '<font color="red"><sub><b>*</b></sub></font>车牌-颜色',
						layout : {
							type: 'table',
				            columns: 5,
				            width:'100%'
						},
						items : [
					           {
									xtype : "textfield",
									name : "PLATE_NUM",
									flex:2,
									readOnly:true,
									allowBlank:false
									//vtype:'plateNumLeft'
								},{
									xtype : "label",
									text : "-"
								},
								{ 	xtype: 'combo', 
									readOnly:true,
					                name: 'PLATE_COLOR',
					                itemId:'PLATE_COLOR',
					                editable:false,
					                width:50,
					                store: Ext.getStore('dict.1006'),
					                displayField: 'name',  
					                valueField: 'code',  
					                queryMode: 'local',
					                allowBlank:false
					           },{
					           		xtype:'button',
					           		margin:'0 0 5 0',
					           		itemId:'menubtn',
					           		iconCls:'icon-search blue',
					           		text:'选择',
					           		menu:{   			
										xtype:'uxmenu',
										//padding:5,
										plain: true,
										items:[{
											padding:'5 0 5 0',
											xtype : 'jsf.ModelGrid',
											width:550,
											height:400,
											itemId : 'searchselgrid',
											listeners:{
												afterrender:function(grid){
													var store = grid.getStore();
													store.on('beforeload',function(st){
														st.proxy.extraParams={searchtext:me.down('#searchtext').getValue()};
													});
													store.loadPage(1);
												},
												itemclick:function(grid, record, item, index, e, eOpts){
													var form = me.down('#infoForm');
													form.getForm().setValues(record.data);
													me.down('#menubtn').hideMenu();
												}
											},
											region : 'center',
											rowSelType : 'SIGN',
											model : 'app.model.VehicleBaseModel',
											url : 'client/repair/gene/vehicleSelList',
											columns : [
												{text:'序号',xtype:'rownumberer'},
												{fname:'RECORD_NO',flex:2},
												{fname:'PLATE_NUM',flex:2},
												{fname:'PLATE_COLOR',width:70},
												{fname:'VEHICLE_TYPE',width:80},
												{fname:'DELEGATE_NAME',flex:2}
											],
											btns : [{
												xtype:'textfield',
												width:250,
												itemId:'searchtext',
												emptyText:'请输入车牌号查询',
												name:'searchtext'
											},{
												xtype:'button',
												tooltip:'按条件查询',
												iconCls:'icon-search blue',
												handler:function(){
													var grid = me.down('#searchselgrid');
													grid.getStore().loadPage(1);
												}
											},{
												xtype:'button',
												tooltip:'清空条件',
												iconCls:'icon-remove blue',
												handler:function(){
													me.down('#searchtext').setValue('');
												}
											}]
										}]
					           		}
					           }]
					},
		           {fname:'TEL_PHONE',allowBlank:false,vtype:'TELphone',colspan: 2,width:220,msgTarget:'under'},
			       {fname:'LEAVE_MILEAGE',allowBlank:false,maxValue:99999999,minValue:0,width:220,msgTarget:'under'}, 
			       {fname:'DELEGATE_NAME',allowBlank:false,width:300,msgTarget:'under'},
			       {fname:'VEHICLE_TYPE',itemId:'VEHICLE_TYPE',allowBlank:false,width:220}, 
			       {
						xtype : 'box',
						id:'helpBtn',
						autoEl : {
							tag : 'img',
							src : 'images/help.png'
						}
					},
				   {fname:'VEHICLE_NATURE',allowBlank:false,width:220},			  
                   {
		        	 xtype:'combo',
		        	 name:'GD_STATION',
		        	 fieldLabel:'<font color="red"><sub><b> *</b></sub></font>选择工位',
		        	 allowBlank:false,
		        	 colspan:1,
		        	 width:300,
		        	 store:{
		        		 fields:['STATION_CODE','STATION_NAME'],
		        		 proxy:{
		        			url:'client/sys/tqsysinspector/list_station',
		        			type:'ajax',
		        			reader:{
		        				type:'json',
		        				root:'data'
		        			}
		        		 },
		        		 autoLoad:true
		        		 
		        	 },
		        	 displayField:'STATION_NAME',
	 			     valueField:'STATION_CODE',
	 			     emptyText : '请选择'
		         	}, 

                  	/* ****质检员下拉列表，添加于2017-02-21 xukangliu****/
                   {
		        	 xtype:'combo',
		        	 name:'INSPECTOR_ID',
		        	 fieldLabel:'<font color="red"><sub><b> *</b></sub></font>选择质检员',
		        	 allowBlank:false,
		        	 colspan:3,
		        	 width:220,
		        	 store:{
		        		 fields:['ID','NAME'],
		        		 proxy:{
		        			url:'client/sys/tqsysinspector/list',
		        			type:'ajax',
		        			reader:{
		        				type:'json',
		        				root:'data'
		        			}
		        		 },
		        		 autoLoad:true
		        		 
		        	 },
		        	 displayField:'NAME',
	 			     valueField:'ID',
	 			     emptyText : '请选择'
		         	},
                   {fname: 'GD_STATUS',allowBlank:false,width:220,msgTarget:'under',colspan: 3,hidden: true},       
				   {xtype:'textarea',name:'REMARK',colspan: 4,width:770,fieldLabel : '维修内容',maxLength:100},
				   {xtype:'container',colspan: 3,padding:'0 0 0 40',html:'<font color="red">注：<br/>1.选中是否更换配件时，请填写维修配件信息及上传相关图片（图片使用JPG格式为最佳）。<br/>' +
				   		'2.打印界面中的企业联系电话请在企业基本资料中修改或添加。</font>'},
				   {
			        	xtype:'checkboxfield',
	                    boxLabel  : '是否更换配件',
	                    padding:'0 0 0 40',
	                    itemId:'IS_CHANGE_PART',
	                    name:'IS_CHANGE_PART',
	                    inputValue: '10041001'
	                }]
	    }
	   
    },
    getDetails: function(){
       var me = this;
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.RepairGeneManageDetailModel', 
 		   itemId:'listPanel',
 	       paging:false,	
 	       enableHdMenu : false,
 	       enableColumnHide : false,
 	       viewConfig : {
				forceFit : false,
				stripeRows : false
			},
 	       region : 'center',
		   rowSelType : 'MULTI',
 		   title: '维修竣工项目明细',
		   url: 'client/repair/gene/detailList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'REPAIR_TYPE',sortable:false,menuDisabled:true, editor:true,width:250}, 
					{fname:'REPAIR_ITEM',sortable:false, editor:true,width:250}
				],
		 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.RepairGeneManageDetailModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=listPanel]').getStore();
		                var editing = win.down('grid[itemId=listPanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=listPanel]');
		                var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
		                store.sort({
		                    property: 'REPAIR_TYPE',
		                    direction: 'ASC'
		                });
	                 }
			 }]
 	   };
    },
    
    getParts: function(){
 	   return {
 		   xtype:'jsf.ModelGrid',
 		   model:'app.model.repair.RepairGeneManagePartModel', 
 		   itemId:'partsPanel',
 	       paging:false,	
		   rowSelType : 'MULTI',
 		   title: '维修配件',
		   url: 'client/repair/gene/partList',
		   columns: [
	  			    {xtype:'rownumberer', name:'RowNumber', text:'序号', width:50}, 
	  			    {fname:'PART_CODE', editor:true,width:150}, 
					{fname:'PART_NAME', editor:true,width:200}, 
					{fname:'PART_COUNT', editor:true,width:100}
				],
		 btns:[
			      
			      {
					 xtype : 'button',
	  				 text : '新增',
	  				 iconCls: 'add_button',
	  				 itemId : 'addBtn',
	  				 handler : function(btn) {
		                var record = Ext.create('app.model.repair.RepairGeneManagePartModel');
		                var win = btn.up('window');
		                var store = win.down('grid[itemId=partsPanel]').getStore();
		                var editing = win.down('grid[itemId=partsPanel]').plugins[0];
		                store.insert(store.getCount(),record);
		                editing.startEditByPosition({
				            row: store.getCount()-1,
				            column: 2
				        });
	                 }
			      },'-',
			      {
	  				 xtype : 'button',
	  				 text : '删除',
	  				 iconCls: 'delete_button',
	  				 itemId : 'delBtn',
	  				 handler : function(btn) {
		                var win = btn.up('window');
		                var grid = win.down('grid[itemId=partsPanel]');
		                var mds = grid.getSelectionModel().getSelection();
		                var store = grid.getStore();
		                if(!Ext.isEmpty(mds)){
		                	store.remove(mds);
		                }
		                store.sort({
		                    property: 'PART_CODE',
		                    direction: 'ASC'
		                });
	                 }
			 }]
 	   };
    },
   getPhoto:function(){
    	var me = this;
    	return {
    		xtype:'panel',
    		id: 'images-view',
    		title:'维修图片',
    		layout: {
                type: 'hbox',
                align:'stretch'
            },
            defaults: {},
    		items:[
{				autoScroll:true,
	            xtype: 'dataview',
	            padding:'0 0 0 35',
                itemId:'dataviewid',	            
	            store: Ext.create('Ext.data.Store',{
	        		 fields:['imgId','imgSrc','imgPath','imgPercent'],
	        		 data:[]
	        	 }),
	            tpl: [
	                '<tpl for=".">',
	                    '<div class="thumb-wrap">',
	                        '<div class="thumb"><img src="{imgSrc}"></div>',
	                        '<span class="x-percent">',
	                        	'<div class="x-progress x-progress-default" id="progressbar-1037">' +
									'{imgPercent:this.formatChange}',
								'</div>',
	                        '</span>',
	                    '</div>',
	                '</tpl>',
	                {
	                	 formatChange: function(v){
					    	return v ;
			            }
	                }
	            ],
	            multiSelect: true,
	            trackOver: true,
	            overItemCls: 'x-item-over',
	            itemSelector: 'div.thumb-wrap',
	            emptyText: '空',
	            listeners: {
		            	itemclick:function(a, b, c){		
					    	var win = Ext.create('app.view.common.ImageAutoWin',{title: '查看图片' });
							win.show();
							win.down('image').setSrc(b.data.imgSrc);
		            	}
	            }
	        }    		

    		]
    	};
    },    
 
	getVedioPanel : function(){
		var me = this;
		return {
			xtype:'panel',
			itemId:'videoPanel',
			title:'',
			region : 'center',
			html:'<iframe height="0" width="0" src="client/corp/tbcorpposition/videobegin" scrolling="yes" frameborder="0" id="corpVideoBeginFrame" name="corpVideoBeginFrame"></iframe>'
		    };
	},     
    submitHandler: function(fb, v){
		var me = this;
		if(Ext.isEmpty(v)){
			return ;
		}
		var val = v.substring(v.lastIndexOf('.')+1);
		var tag = false;
		for(var _i = 0; _i < me.fileType.length;_i ++){
    		if(me.fileType[_i].toLowerCase()==val.toLowerCase()){
    			tag = true ;
    		}
    	}
    	if(!tag){
    		Ext.Msg.alert("警告", "只能上传图片格式文件【<font color=red>'jpg','jpeg','bmp','gif','png'</font>】");
    		return;
    	}
    	var form = fb.up('form').getForm();
//    	form.standardSubmit = true;
    	form.submit({
//            clientValidation: true,
    		method:'POST',
            url: 'client/common/fileUpload/uploadEditor',
            waitMsg: '图片上传中...',
            success: function(response, action) {
               var photo = fb.up('form').down('image');
               photo.setSrc("/attach/" + action.result.data);
               console.log(action.result.data);
               form.findField('PHOTO_PATH').setValue(action.result.data);
            },
            failure: function(response, action) {
               Ext.Msg.alert("失败", '上传失败');
            }
        });
	},
	fileType:['bmp','gif','jpeg','png','jpg'],
	loadData: function(record,params){
		var me = this;
		var form = this.down('form[itemId=infoForm]');
		form.loadRecord(record);
		//将 INSPECTOR_NAME的值赋值给刚进入编辑页面的INSPECTOR_ID
		form.getForm().findField('INSPECTOR_ID').setValue((form.getForm().findField('INSPECTOR_NAME')).getValue());
		if (record.data.GD_STATUS=='10161001') {//未开工
		  app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=endBtn]'),true);	
		} else if (record.data.GD_STATUS=='10161002') {//维修中
		  app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=beginBtn]'),true);				
		} else if (record.data.GD_STATUS=='10161003') {//完工
		  app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=beginBtn]'),true);
		  app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=endBtn]'),true);		  
		} else
		  app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=endBtn]'),true);	
		
		this.initHelp();
		form.getForm().clearInvalid();
		var pstore = me.down('grid[itemId=partsPanel]').getStore();
		pstore.proxy.extraParams = params;
		pstore.loadPage(1);	
		//获取图片
	    app.utils.AjaxCallbackUtil.ajaxCallbackAll("client/repair/gene/getPic",{CORP_ID:record.data.CORP_ID,BILL_CODE: record.data.BILL_CODE},function(ret){
	    if( ret.success ){
	    	if(!Ext.isEmpty(ret.data.pic1)){
			    var store = me.down('dataview[itemId=dataviewid]').getStore();
			    store.add({imgId: 'imgid_1' ,imgSrc:"/attach/"+ret.data.pic1,imgPath:ret.data.pic1,imgPercent:'维修前'});
			    store.add({imgId: 'imgid_2' ,imgSrc:"/attach/"+ret.data.pic2,imgPath:"",imgPercent:'维修中'});
			    store.add({imgId: 'imgid_3' ,imgSrc:"/attach/"+ret.data.pic3,imgPath:"",imgPercent:'维修后'});
			    store.add({imgId: 'imgid_4' ,imgSrc:"/attach/"+ret.data.pic4,imgPath:"",imgPercent:'维修前'});
			    store.add({imgId: 'imgid_5' ,imgSrc:"/attach/"+ret.data.pic5,imgPath:"",imgPercent:'维修中'});			    
			    store.add({imgId: 'imgid_6' ,imgSrc:"/attach/"+ret.data.pic6,imgPath:"",imgPercent:'维修前'});	
		     }  	
	       }
	    })			
	},
	initAddData : function(){
		var me = this;
		var form = this.down('form[itemId=infoForm]').getForm();
//		form.findField('PLATE_NUMA').setValue('粤');
//		form.findField('PLATE_NUMB').setValue('A');
//		form.findField('PLATE_COLOR').setValue('10061001');
        app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=endBtn]'),true);	
        //me.down('button[itemId=endBtn]').setDisabled(true);
        
		this.initHelp();
		form.clearInvalid();
	},
	loadViewData: function(record,params){
		var me = this;
		var form = this.down('form[itemId=infoForm]');
		form.loadRecord(record);
		//将 INSPECTOR_NAME的值赋值给刚进入编辑页面的INSPECTOR_ID
		form.getForm().findField('INSPECTOR_ID').setValue((form.getForm().findField('INSPECTOR_NAME')).getValue());
		
		var pgrid = this.down('grid[itemId=partsPanel]');
		pgrid.down('toolbar[dock=top]').hide();
		app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=saveBtn]'),true);
		app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=submitBtn]'),true);
		app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=beginBtn]'),true);
        app.utils.CommonUtil.setButtonHidden(me.down('button[itemId=endBtn]'),true);		
		var pstore = pgrid.getStore();
		pstore.proxy.extraParams = params;
		pstore.loadPage(1);
        pgrid.on('beforeedit', function(editor, e) {
        	return false;
        });
        this.initHelp();
        form.getForm().clearInvalid();
		//获取图片
	    app.utils.AjaxCallbackUtil.ajaxCallbackAll("client/repair/gene/getPic",{CORP_ID:record.data.CORP_ID,BILL_CODE: record.data.BILL_CODE},function(ret){
	    if( ret.success ){
	    	if(!Ext.isEmpty(ret.data.pic1)){
			    var store = me.down('dataview[itemId=dataviewid]').getStore();
			    store.add({imgId: 'imgid_1' ,imgSrc:"/attach/"+ret.data.pic1,imgPath:ret.data.pic1,imgPercent:'维修前'});
			    store.add({imgId: 'imgid_2' ,imgSrc:"/attach/"+ret.data.pic2,imgPath:"",imgPercent:'维修中'});
			    store.add({imgId: 'imgid_3' ,imgSrc:"/attach/"+ret.data.pic3,imgPath:"",imgPercent:'维修后'});
			    store.add({imgId: 'imgid_4' ,imgSrc:"/attach/"+ret.data.pic4,imgPath:"",imgPercent:'维修前'});
			    store.add({imgId: 'imgid_5' ,imgSrc:"/attach/"+ret.data.pic5,imgPath:"",imgPercent:'维修中'});			    
			    store.add({imgId: 'imgid_6' ,imgSrc:"/attach/"+ret.data.pic6,imgPath:"",imgPercent:'维修前'});	
		     }  	
	       }
	    })		
	},
	 // 检查该页面所含数据
    isValid : function() {  	
	    return this.down('form[itemId=infoForm]').getForm().isValid();
    },
    initHelp:function(){
    	Ext.create('Ext.tip.ToolTip', {
	        target: 'helpBtn',
	        anchor: 'buttom',
	        html: '小型车：车身总长不超过6米的载客车辆或最大设计总质量不超过3500KG的载货车辆。<br/>' +
	        		'大中型客车：车身总长超过6米的载客车辆。<br/>' +
	        		'大型货车：最大设计总质量超过3500KG的载货车辆、挂车及专用汽车的车辆部分。'
	    });
	    
	    
    },
    showTip : function(){
    	var me = this;
    	Ext.mytip.msg("提示","请检查数据是否有效后再重试！");
    },
    previewImage:function(file, callback) {// file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
				var me = this;
				if (!file || !/image\//.test(file.type))
					return; // 确保文件是图片
				if (file.type == 'image/gif') {// gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
					var fr = new mOxie.FileReader();
					fr.onload = function() {
						callback(fr.result);
						fr.destroy();
						fr = null;
					}
					fr.readAsDataURL(file.getSource());
				} else {
					var preloader = new mOxie.Image();
					preloader.onload = function() {
						preloader.downsize(600);// 先压缩一下要预览的图片,宽300，高300
						var imgsrc = preloader.type == 'image/jpeg' ? preloader
								.getAsDataURL('image/jpeg', 60) : preloader.getAsDataURL(); // 得到图片src,实质为一个base64编码的数据
						callback && callback(imgsrc); // callback传入的参数为预览图片的url
						preloader.destroy();
						preloader = null;
					};
					preloader.load(file.getSource());
				}
			}
	

});