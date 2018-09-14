Ext.define('app.view.credit.TbExamFileInfoEdit',{
	extend:'Ext.window.Window',
	alias: 'widget.credit.TbExamFileInfoEdit',
	itemId: 'credit.TbExamFileInfoEdit',
	title: '质量信誉考核档案填写',
	requires:['jsf.grid.ModelGrid','jsf.container.ModelContainer'],
	autoShow : true,
	closable : true,
	width : 835,
	height:580,
	autoScroll:true,
	modal : true,

	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype:'form',
			region:'north',
			width:800,
			defaults: {margin:5},
			itemId:'npanel',
			items:[me.getInfo(),me.getCDSSQK(),me.getCYRYQK(),me.getWXJJSB(),me.getKHZQ(),me.getAQSG(),me.getFWSJ(),me.getKHTS(),me.getFGSQK()]
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
	},
	getInfo : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'企业基本信息',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:240},
				layout: {
            		type: 'table',
            		columns: 3
        		},
        		labelWidth: 100,
				btns:[],
				items: [
					{fname:'FILE_ID',hidden:true},
					{fname:'CORP_ID',hidden:true},
					{fname:'CORP_NAME',colspan:3,width:750,readOnly:true},
					{fname:'CORP_ADD',colspan:3,width:750,readOnly:true},
					{fname:'LEGAL_PERSON',readOnly:true},
					'CORP_TEL',
					'SERVICE_HOTLINE',
					{fname:'CORP_TYPE',readOnly:true},
					'BUSINESS_NUM',
					'INDUSTRY_CODE',
					'CORP_NUM',
					{xtype:'datetimefield',fieldLabel:'开业时间',name:'OPEN_DATE',readOnly:true},
					{fname:'OLD_EXAM_LEVEL',readOnly:true},
					{fname:'ECONOMIC_NATURE',readOnly:true},
					{fname:'REPAIR_TYPES',readOnly:true,colspan:2}
				]
			}]
		};
	},
	getCDSSQK : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'场地设施情况（<font color="red">平方米</font>）',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:240},
				layout: {
            		type: 'table',
            		columns: 3
        		},
        		labelWidth: 100,
				btns:[],
				items: [
					'PLANT_AREA',
					'PARK_AREA',
					'ANTEROOM_AREA'
				]
			}]
			
		};
	},
	getCYRYQK : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'从业人员情况（<font color="red">人数</font>）',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:350},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 180,
				btns:[],
				items: [
					'JSFZR_NUM',
					'JSFZE_CZ_NUM',
					'ZJY_NUM',
					'ZJY_CZ_NUM',
					'JX_NUM',
					'JX_CZ_NUM',
					'DQ_NUM',
					'DQ_CZ_NUM',
					'BJ_NUM',
					'BJ_CZ_NUM',
					'TQ_NUM',
					'TQ_CZ_NUM',
					'ZZJY_NUM',
					'ZZJY_CZ_NUM',
					'CS_NUM',
					'CS_CZ_NUM',
					'LPG_NUM',
					'LPG_CZ_NUM',
					'YW_NUM',
					'YW_CZ_NUM',
					'JG_NUM',
					'JG_CZ_NUM',
					'GL_NUM',
					'GL_CZ_NUM',
					'QT_NUM',
					'QT_CZ_NUM'
				]
			}]
			
		};
	},
	getWXJJSB : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'维修机具设备情况（<font color="red">台、套、件</font>）',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:300},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 120,
				btns:[],
				items: [
					'TYSB_NUM',
					'ZYSB_NUM',
					'JCSB_NUM',
					'JLSB_NUM',
					'ZYSGGJ_NUM',
					'WXSB_NUM',
					'QTSB_NUM'
				]
			}]
			
		};
	},
	getKHZQ : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'考核周期内维修经营情况（<font color="red">车次或万元</font>）',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:300},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 120,
				btns:[],
				items: [
					'ZHCDX_NUM',
					'ZCDX_NUM',
					'EJWH_NUM',
					'CLXX_NUM',
					'ZXWX_NUM',
					'JY_NUM',
					'WXCZ_NUM',
					'WXLR_NUM',
					'SJSJ_NUM'
				]
			}]
			
		};
	},
	getAQSG : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'安全生产事故 ',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:330},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 160,
				btns:[],
				items: [
					'GSSG_NUM',
					'HZSG_NUM',
					'YDSG_NUM',
					'QTSG_NUM',
					'SSRS_NUM',
					'SWRS_NUM',
					'JJSS_NUM',
					'HBHS_NUM',
					'FJLT_NUM',
					'FJXDC_NUM'
				]
			}]
			
		};
	},
	getFWSJ : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'服务质量事件',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:330},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 160,
				btns:[],
				items: [
					'FWZLSJ_NUM',
					'TB_NUM'
				]
			}]
			
		};
	},
	getKHTS : function(){
		var me = this;
		return {
			xtype:'panel',
			title:'客户投诉',
			items:[{
				xtype : 'jsf.ModelContainer',
				model : 'app.model.credit.TbExamFileInfoModel',
				defaults: {msgTarget:'side',width:330},
				layout: {
            		type: 'table',
            		columns: 2
        		},
        		labelWidth: 160,
				btns:[],
				items: [
					'KHTS_NUM',
					'MYD_NUM',
					'YZTS_NUM'
				]
			}]
			
		};
	},
	getFGSQK : function(){
		var me = this;
		return {
			xtype : 'jsf.ModelGrid',
			title : '企业分公司情况',
			rowSelType : false,
			height:250,
			paging:false,
			model : 'app.model.credit.TbExamFileFgsModel',
			url : 'client/credit/tbexamfileinfo/fgsList',
			columns : [
				{text:'序号',xtype:'rownumberer'},
				{fname:'CORP_NAME',flex:2},
				{fname:'CORP_ADD',flex:2},
				{
  			    	fname:'操作',
  			    	flex:1,
  			    	xtype:'actiontextcolumn',
  			    	items : [{
								text : '[删除]',
								isShow : true,
								handler : function(grid, rowIndex, colIndex){
									var mds = grid.getStore().getAt(rowIndex);
									grid.getStore().remove(mds);
								}
							}]
			    }
			],
			btns : [{
				xtype : 'textfield',
				fieldLabel : '企业名称',
				itemId : 'fgsname',
				msgTarget:'side',
				labelWidth:80,
				width:300,
				labelAlign:'left',
				name:'fgsname'
			},'-',{
				xtype : 'textfield',
				fieldLabel : '企业地址',
				labelAlign:'left',
				msgTarget:'side',
				labelWidth:80,
				width:300,
				itemId : 'fgsadd',
				name:'fgsadd'
			},'-',{
				xtype : 'button',
				text : '增加',
				itemId : 'addBtn',
				iconCls:'add_button',
				handler : function(btn) {
					var grid = btn.up('grid');
					var name = grid.down('textfield[itemId=fgsname]').getValue();
					var add = grid.down('textfield[itemId=fgsadd]').getValue();
					if(Ext.isEmpty(name) || Ext.isEmpty(add)){
						Ext.Msg.alert('系统提示','名称和地址不能为空！');
						return false;
					}
					var record = Ext.create('app.model.credit.TbExamFileFgsModel');
					var data = {CORP_NAME : name,CORP_ADD:add};
					record.set(data);
					grid.getStore().insert(grid.getStore().getCount(),record);
				}
			}]
		};
	},
	// 检查该页面所含数据
	isValid : function() {
		return this.down('form').isValid();
	},
	loadAddData : function(){
		var me = this;
		app.utils.AjaxCallbackUtil.ajaxCallbackAll("client/credit/tbexamfileinfo/getCorpInfo",{}, function (Obj) {
			me.down('form').getForm().setValues(Obj.data);
		});
	},
	//加载数据
	loadData : function(record){
		var me = this;
		me.down('form').loadRecord(record);
		var store = me.down('grid').getStore();
		store.proxy.extraParams={fileId:record.data.FILE_ID};
		store.loadPage(1);
	}
});
