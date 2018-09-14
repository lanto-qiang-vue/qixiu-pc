Ext.define('app.view.manage.exharepair.PartPhotoUpload',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.exharepair.PartPhotoUpload',
	itemId: 'manage.exharepair.PartPhotoUpload',
	title: '配件照片',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout : 'fit',
	width : 580,
	border:false,
	height:410,
	modal : true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			layout : 'fit',
			itemId:'npanel',
			bodyPadding : 10,
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.repair.PartsListModel',
				layout: 'fit',
        		labelWidth: 80,
				btns:[],
				//defaults:{width:210},
				items: [
					{xtype:'container',
						width:160,
						layout:'vbox',
						items:[{xtype:'hidden',name:'PART_PHOTO',itemId:'vehphoto'},
							{xtype:'hidden',name:'LIST_ID',itemId:'LIST_ID'},
							{xtype:'hidden',name:'RECORD_ID',itemId:'RECORD_ID'},
							{xtype:'image',
							width:480,
							itemId:'vehImage',
							margin:'0 0 10 30',
							style:'border:1px #ddd solid;',
							height:300,
							alt:'配件照片',
							border:true
						}]
					}
				]
			}]
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
						itemId : 'closeBtn',
						iconCls : 'icon-off red',
						text : '关 闭',
						handler : function(btn) {
							btn.up('window').close();
						}
				} ]
			} ];
		me.callParent(arguments);
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	//加载数据
	loadData : function(record,params){
		var me = this;
		me.down('form').loadRecord(record);
		me.down('form').getForm().getFieldValues().LIST_ID=params.LIST_ID;
		me.down('form').getForm().getFieldValues().RECORD_ID=params.RECORD_ID;
		if(!Ext.isEmpty(record.get('PART_PHOTO'))){
			me.down('image').setSrc("/attach/" + record.get('PART_PHOTO'));
		}
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
