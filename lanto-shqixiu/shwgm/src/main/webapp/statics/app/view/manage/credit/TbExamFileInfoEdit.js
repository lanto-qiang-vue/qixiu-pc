Ext.define('app.view.manage.credit.TbExamFileInfoEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.manage.credit.TbExamFileInfoEdit',
	itemId: 'manage.credit.TbExamFileInfoEdit',
	title: '质量信誉考核档案申请表',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	width : 960,
	height:560,
	modal : true,
	autoScroll:true,
	maximizable : true,
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'panel',
			defaults: {margin:5},
			itemId:'npanel',
			items:[{
				xtype:'dataview',
				store: Ext.create('Ext.data.Store', {
			        model: 'app.model.credit.TbExamFileInfoModel'
			    }),
	            tpl: app.template.TemplateUtil.ExamTemplate(),
	            multiSelect: false,
            	trackOver: true,
	            height: "100%",
	            itemSelector: 'div.thumb-wrap',
	            emptyText: 'No images to display',
	            plugins: [
	                Ext.create('app.ux.DataView.LabelEditor', {divids:[],dataIndex: 'CORP_ID'})
	            ],
	            prepareData: function(data) {
	            	var areaCount = data.PLANT_AREA +　data.PARK_AREA + data.ANTEROOM_AREA;
	            	var personCount = data.GL_NUM + data.JSFZR_NUM + data.ZZJY_NUM + data.ZJY_NUM + data.JX_NUM + 
	            					  data.DQ_NUM + data.BJ_NUM + data.TQ_NUM + data.CS_NUM + data.LPG_NUM + 
	            					  data.YW_NUM + data.JG_NUM + data.QT_NUM;
	            	var czCount = data.GL_CZ_NUM + data.JSFZE_CZ_NUM + data.ZZJY_CZ_NUM + data.ZJY_CZ_NUM + data.JX_CZ_NUM + 
	            					  data.DQ_CZ_NUM + data.BJ_CZ_NUM + data.TQ_CZ_NUM + data.CS_CZ_NUM + data.LPG_CZ_NUM + 
	            					  data.YW_CZ_NUM + data.JG_CZ_NUM + data.QT_CZ_NUM;
	            	var countSG = data.GSSG_NUM + data.HZSG_NUM + data.YDSG_NUM + data.QTSG_NUM;
	                Ext.apply(data, {
	                    shortName: Ext.util.Format.ellipsis(data.CORP_ID, 15),
	                    sizeString: Ext.util.Format.fileSize(data.EXAM_YEAR),
	                    areaCount : areaCount,
	                    personCount :　personCount,
	                    czCount : czCount,
	                    countSG : countSG
	                });
	                return data;
	            },
	            listeners: {
			        selectionchange: function(B, A) {
			           
			        }
			    }
			}]
		}],
		me.dockedItems = [ {
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
			} ];
		me.callParent(arguments);
		me.on('restore',function(win){
	    	win.setWidth(960);
	    	win.setHeight(600);
	    	win.getEl().center();
	    });
	    me.on('resize',function(B, C, D){
	    	B.down('panel').setWidth(C-35);
	    });
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	loadAddData : function(){
		var me = this;
		
	},
	//加载数据
	loadData : function(records){
		var me = this;
		var fileIds = [];
		for(var i=0;i<records.length;i++){
			fileIds.push(records[i].data.FILE_ID);
		}
		app.utils.AjaxCallbackUtil.ajaxCallbackAll("manage/credit/tbexamfileinfo/fgsList",{fileIds:fileIds.join(',')},function(ret){
			if( ret.success ){
				var datas = ret.data;
				for(var i =0;i<records.length;i++){
					var record = records[i];
					var fgs = [];
					for(var j=0;j<datas.length;j++){
						var data = datas[j]
						if(record.data.FILE_ID == data.FILE_ID){
							fgs.push(data);
						}
					}
					record.data.FGS = fgs;
					var rec = Ext.create('app.model.credit.TbExamFileInfoModel');
					rec.set(record.data);
					var store = me.down('dataview').getStore();
					store.insert(store.getCount(),rec);
				}
			}
		});
	}
});
