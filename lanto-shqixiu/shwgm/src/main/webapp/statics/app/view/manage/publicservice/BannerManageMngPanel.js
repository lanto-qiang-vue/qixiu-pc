Ext.define('app.view.manage.publicservice.BannerManageMngPanel',{
	extend:'Ext.panel.Panel',
	alias: 'widget.manage.publicservice.BannerManageMngPanel',
	itemId: 'manage.publicservice.BannerManageMngPanel',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	layout:'border',
	initComponent : function() {
		var me = this;
		try {
			Ext.applyIf(me, {
				items : [me.getGridPanel(),me.getMapPanel()]
			});
		} catch (err) {
			if (console)	console.log(err);
		}
		me.callParent(arguments);
	},

	getGridPanel : function(){
		var me = this;
		return {
			xtype : 'jsf.ModelGrid',
			itemId : 'gpanel',
			rowSelType : 'MULTI',
			header:{
				hidden:true
			},
			title:'Banner列表',
			width:700,
			split : true,
			collapsible:true,
			region : 'west',
			model : 'app.model.notice.BannerManageModel',
			url : 'manage/publicservice/bannermanage/list',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'TITLE',flex:5,editor:true},
				{fname:'LINK_URL',flex:5,editor:true},
				{fname:'LINK_TYPE',flex:3,renderer:function(v){
					if(v == "_blank"){
						return '新页面';
					}
					return '当前页';
				},editor:{xtype:'combo',queryMode:'local',displayField:'name',
					valueField:'code',store:Ext.create('Ext.data.Store',{
					fields:['code','name'],
					data:[{code:'_top',name:'当前页'},{code:'_blank',name:'新页面'}]
				})}},
				{fname:'STATUS',flex:3,editor:true},
				{fname:'SORT_NUMBER',flex:3,editor:true},
				{fname:'CREATE_TIME',flex:3}
			],
			btns : [me.getImageBtn(),'-',{
				xtype : 'button',
				iconCls:'delete_button',
				text : '删 除',
				itemId : 'deleteBtn'
			},'-',{
				xtype:'container',
				itemId:'uploading',
				width:100,
				style:'text-align:center;',
				html:''
			},'->',{
				xtype : 'button',
				text : '刷新',
				itemId : 'refershBtn',
				iconCls:'icon-refresh blue'
			}]
		};
	},
	getMapPanel:function(){
		return {
			xtype:'panel',
			cls:'bannerImagePanel',
			region : 'center',
			itemId:'imagePanel',
			style:'vertical-align: middle;',
			bodyStyle:'text-align:center;background:#000;',
			data:{
				img:'statics/images/shqxw.jpg',
				maxWidth:400,
				maxHeight:300
			},
			tpl:'<img src="{img}" style="max-width:{maxWidth}px;max-height:{maxHeight}px;"/>'
		};
	},
	getImageBtn:function(){
		var me = this;
		return {
			xtype:'pluploadbutton',
	        text: '新增',
	        itemId : 'addBtn',
	        tooltip:'添加Banner图片',
	        iconCls: 'add_button',
	        pluploadConfig:{       	
				runtimes : 'html5,flash,silverlight,html4',
				browse_button : 'newpartid',
				url :  '../manage/publicservice/bannermanage/add',
				flash_swf_url :  'js/upload/Moxie.swf',
				silverlight_xap_url : 'js/upload/Moxie.xap',
//								container: document.getElementById('newpart_area'), // ... or DOM Element itself
				multiple_queues : false,
				multi_selection:true,
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
				  quality: 90,//质量80
				  preserve_headers: false
				},
				init: {
					PostInit: function(up) {
						//console.log(up);
					},
					// 绑定文件添加进队列事件
					FilesAdded : function(up, files) {
						//console.log(files);
						up.start();
					},
					// 某个文件上传过程中不断触发
					UploadProgress : function(up, file) {
						me.down('#uploading').update('上传中...' + file.percent + '％ ');
					},
					// 当某个文件上传完成后触发
					FileUploaded : function(up, file, responseObject) {
						me.down('#uploading').update('上传完毕');
						var ret = Ext.decode(responseObject.response);
						me.down('grid').getStore().insert(0,ret.data);
						me.down('grid').getView().refresh();
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
	}
});
