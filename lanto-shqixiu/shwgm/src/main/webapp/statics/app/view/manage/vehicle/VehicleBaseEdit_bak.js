Ext.define('app.view.manage.vehicle.VehicleBaseEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.vehicle.VehicleBaseEdit',
	itemId: 'manage.vehicle.VehicleBaseEdit',
	title: '编辑页面',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 950,
	height:350,
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [{
			xtype:'form',
			layout:{
				type:'vbox',
				pack: 'start',
        		align: 'stretch'
			},
			fieldDefaults: {
		        msgTarget: 'side',
		        labelAlign:'right',
		        labelWidth: 85,
		        labelStyle: 'font-weight:bold'
		    },
			bodyPadding : 5,
			items:[{
				xtype:'container',
				//height:140,
				layout:{
					type:'hbox',
					pack: 'start',
	        		align: 'stretch'
				},
				items:[{
					xtype:'container',
					layout:{
						type:'vbox',
						pack: 'start',
						align: 'stretch'
					},
					flex:3,
					items:[{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{xtype:'hidden',name:'VEHICLE_ID'},{
							xtype:'textfield',
							flex:1,
							fieldLabel:'车牌号码11',
							vtype:'License',
							allowBlank:false,
							beforeLabelTextTpl: required,
							name:'PLATE_NUM'
						},{
							xtype:'jsf.ComboDict',
							flex:1,
							beforeLabelTextTpl: required,
							fieldLabel:'车牌颜色',
							allowBlank:false,
							meta:{
								val:'dict|dict.1006'
							},
							name:'PLATE_COLOR'
						},{
							xtype:'jsf.ComboDict',
							blankItem:true,
							allowBlank:false,
							beforeLabelTextTpl: required,
							flex:1,
							vtype:'notEmpty',
							meta:{
								val:'dict|dict.1007'
							},
							fieldLabel:'车辆类型',
							name:'VEHICLE_TYPE'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'cascadeCb',
							_next:'BRAND',
							PID:'0',
							_type:'1',
							editable:true,
							name:'VENDER',
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
							forceSelection: true,
							flex:1,
							fieldLabel:'厂家'
							
						},{
							xtype:'cascadeCb',
							flex:1,
							_type: '2',
							_next:'XM',
							name:'BRAND',
							editable:true,
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
							forceSelection: true,
							fieldLabel:'品牌'
						},{
							xtype:'cascadeCb',
							flex:1,
							_type: '3',
							name:'XM',
							editable:true,
							anyMatch: true,
							selectOnFocus : true,
							typeAhead: true,
							forceSelection: true,
							fieldLabel:'车型'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'textfield',
							flex:1,
							fieldLabel:'道路运输证号',
							name:'LOAD_CERT_NUM'
						},{
							xtype:'datefield',
							flex:1,
							format:'Y-m-d',
							fieldLabel:'发证日期',
							beforeLabelTextTpl: required,
							allowBlank:false,
							name:'CERT_DATE'
						},{
							xtype:'jsf.ComboDict',
							flex:1,
							meta:{
								val:'dict|dict.1008'
							},
							allowBlank:false,
							fieldLabel:'营运状态',
							name:'STATUS'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'textfield',
							flex:1,
							fieldLabel:'驾驶员',
							name:'UNIT_NAME'
						},{	
							xtype:'combo',
							name:'COUNTY',
							flex:1,
							fieldLabel : '区县',
			                editable:false,
			                store:Ext.getStore("sys_belong_area"),
			                displayField: 'NAME',  
			                valueField: 'CODE',
			                queryMode: 'local'
			            },{
							xtype:'jsf.ComboDict',
							meta:{
								val:'dict|dict.1011'
							},
							blankItem:true,
							flex:1,
							fieldLabel:'燃料类型',
							name:'FUEL_TYPE'
						}]
					},{
						xtype:'fieldcontainer',
						layout:{
							type:'hbox',
							pack: 'start'
						},
						items:[{
							xtype:'textfield',
							flex:1,
							fieldLabel:'车架号',
							name:'CHASSIS_NUM'
						},{
							xtype:'textfield',
							flex:1,
							fieldLabel:'发动机号',
							name:'ENGINE_NUM'
						},{
							xtype:'textfield',
							flex:1,
							name:'USE_TYPE',
							fieldLabel:'使用类别'
						}]
					}]
				},{
					xtype:'container',
					//layout:'center',
					width:200,
					style:'border:1px #ddd solid;',
					margin:'0 0 0 5',
					items:[{xtype:'hidden',name:'PHOTO',itemId:'vehphoto'},{
						xtype:'image',
						itemId:'vehImage',
						width:'100%',
						height:133,
						alt:'车辆照片',
						border:true
					}]
				}]
			},{
				xtype:'container',
				border:true,
				margin:'5 0 0 0',
				layout:{
					type:'vbox',
					pack: 'start',
					align: 'stretch'
				},
				items:[{
					xtype:'fieldcontainer',
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
						xtype:'textfield',
						flex:1,
						fieldLabel:'车辆吨位',
						name:'TONNAGE'
					},{
						xtype:'textfield',
						flex:1,
						fieldLabel:'座（卧）位',
						name:'SEAT'
					},{
						xtype:'datefield',
						flex:1,
						format:'Y-m-d',
						name:'CHECK_DATE',
						fieldLabel:'年检日期'
					},{
						xtype:'fieldcontainer',
						margin:'0 0 0 5',
						width:200,
						layout:{
							type:'hbox',
							pack: 'start'
						},
						layout:{
							type:'hbox',
							pack: 'end'
						},
						items:[me.getImageBtn()]
					}]
				}]
			},{
				xtype:'container',
				border:true,
				margin:'5 0 0 0',
				layout:{
					type:'vbox',
					pack: 'start',
					align: 'stretch'
				},
				items:[{
					xtype:'fieldcontainer',
					layout:{
						type:'hbox',
						pack: 'start'
					},
					items:[{
						xtype:'numberfield',
						flex:1,
						fieldLabel:'建档里程',
						name:'FIRST_MILEAGE'
					},{
						xtype:'datefield',
						flex:1,
						fieldLabel:'上次维修时间',
						format:'Y-m-d',
						name:'LAST_REPAIR_DATE'
					},{
						xtype:'datefield',
						flex:1,
						format:'Y-m-d',
						name:'LAST_CHECK_DATE',
						fieldLabel:'上次评定时间'
					},{width:205,xtype:'displayfield'}]
				}]
			}]
		}],
		me.dockedItems = [{
			xtype : 'toolbar',
			dock : 'bottom',
			layout : {
				pack : 'end',
				type : 'hbox'
			},
			items : ['->',
					{
						xtype : 'button',
						itemId : 'saveBtn',
						iconCls : 'save_button',
						text : '保 存'
					},'-', {
						xtype : 'button',
						itemId : 'closeBtn',
						iconCls : 'close_button',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			}];
		me.callParent(arguments);
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		if(!Ext.isEmpty(record.get('PHOTO'))){
			me.down('image').setSrc("/attach/" + record.get('PHOTO'));
		}
	},
	getImageBtn:function(){
		var me = this;
		return {
			xtype:'pluploadbutton',
	        text: '添加照片...',
	        margin:'0 10 0 10',
	        flex:1,
	        iconCls: 'icon-picture bigger-120 blue',
	        pluploadConfig:{       	
				runtimes : 'html5,flash,silverlight,html4',
				browse_button : 'newpartid',
				url :  'manage/vehicle/vehiclebase/uploadImage',
				flash_swf_url :  'js/upload/Moxie.swf',
				silverlight_xap_url : 'js/upload/Moxie.xap',
//								container: document.getElementById('newpart_area'), // ... or DOM Element itself
				multiple_queues : false,
				multi_selection:false,
				file_data_name:'upload',
				filters : {
					mime_types : [ // 只允许上传图片文件和rar压缩文件
					{
						title : "图片文件",
						extensions : "jpg,gif,png"
					} ],
					max_file_size : '5mb', //最大只能上传100kb的文件
					prevent_duplicates : false
				// 不允许队列中存在重复文件
				},
				resize: {
				  width: 600,//压缩图片
				  quality: 80,//质量80
				  preserve_headers: false
				},
				init: {
					PostInit: function(up) {
						//console.log(up);
					},
					// 绑定文件添加进队列事件
					FilesAdded : function(up, files) {
						//console.log(files);
						var form = me.down('form');
						var file = files[0];
						me.previewImage(file, function(imgsrc) {
							form.down('image').setSrc(imgsrc);
							up.start();
						});
					},
					// 某个文件上传过程中不断触发
					UploadProgress : function(up, file) {
						//console.log(file);		
						if(file.percent < 100){
						//	me.down('progressbar[itemId=oldprogress]').updateProgress(file.percent,"上传中..." + file.percent + '％ ');
							me.down('pluploadbutton').setText('上传中...' + file.percent + '％ ');
						}else{
							me.down('pluploadbutton').setText('上传完毕');
							//me.down('progressbar[itemId=oldprogress]').updateProgress(file.percent,"上传完毕" + file.percent + '％ ');
						}
						
						//$("#file-list").find('a[data-id=' + file.id + ']').find('.atttext').html(file.percent + ' ％');
					},
					// 当某个文件上传完成后触发
					FileUploaded : function(up, file, responseObject) {
						var form = me.down('form');
						var data = eval('(' + responseObject.response + ')');
						if(data.success){
							form.getForm().findField('PHOTO').setValue(data.data);
						}else{
							Ext.Msg.alert('系统提示',"图片上传失败!");
						}
						me.down('pluploadbutton').setText('添加照片... ');
					},
					// 当上传队列的状态发生改变时触发
					StateChanged : function(up) {
						//console.log(up.state);
					},
					Error: function(up, err) {
						//console.log(err);
						if(err.code == -600){
							Ext.Msg.alert('系统提示',"文件大小不能超过5MB");
						}else{
							Ext.Msg.alert('系统提示',err.message);
						}
					}
				}
	        }
		};
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
