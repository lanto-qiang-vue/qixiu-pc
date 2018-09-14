Ext.define('app.model.corp.CorpJoinModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'JOIN_ID' , type:'int', label:'ID'},
		{name:'CORP_ID' , type:'int', label:'企业ID'},
		{name:'RECORD_NO' , type:'string', label:'业务编号',req:true},
		{name:'CORP_NUM' , type:'string', label:'企业编号',req:true},
		{name:'CORP_NAME' , type:'string', label:'企业名称',req:true,query:'lk'},
		{name:'LINK_MAN' , type:'string', label:'联系人'},
		{name:'LINK_TEL' , type:'string', label:'联系电话'},
		{name:'CORP_AREA' , type:'string', label:'所属辖区'},
		{name:'CORP_ADD' , type:'string', label:'企业地址'},
		
		{name:'MAGOR_BRANDS' , type:'string', label:'主修品牌',query:'lk'},
		
		{name:'FRONT_PHOTO' , type:'string', label:'封面图片'},
		
		{name:'XYDJ' , type:'string', label:'信用等级'},
		
		{name:'WXZZ' , type:'string', label:'维修资质'},
		
		{name:'PROFILE' , type:'string', label:'企业简介'},
		{name:'APPLY_PERSON' , type:'string', label:'申请人'},
		{name:'APPLY_DATE' , type:'date', label:'申请时间',dateFormat:'Y-m-d H:i:s'},
		{name:'CHECK_PERSON' , type:'string', label:'审批人'},
		{name:'CHECK_DATE' , type:'date', label:'审批时间',dateFormat:'Y-m-d H:i:s'},
		{name:'STATUS' , type:'string', label:'状态',val:'dict|dict.1032'},
		
		{name:'LONGITUDE' , type:'string', label:'经度'},
		{name:'LATITUDE' , type:'string', label:'纬度'},
		{name:'BACK_OPINION' , type:'string', label:'退网原因'},
		{name:'BACK_DATE' , label:'退网时间', type:'date',dateFormat:'Y-m-d H:i:s'}
	]
});