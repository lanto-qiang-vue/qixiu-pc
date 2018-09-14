Ext.define('app.model.corp.TbCorpInfoModel',{
	extend:'jsf.data.VO',
	fields:[
		{name:'CORP_ID' , type:'int', label:'企业ID'},
		{name:'CORP_NUM' , type:'string', label:'企业编号',query:'lk'},
		{name:'CORP_NAME' , type:'string', label:'企业名称',req:true,query:'lk'},
		
		{name:'BUSINESS_NUM' , type:'string', label:'许可证号',req:true,query:'lk'},
		{name:'ORG_NUMBER' , type:'string', label:'统一社会信用代码'},
		{name:'CORP_ADD' , type:'string', label:'企业地址',query:'lk'},
		{name:'CORP_AREA' , type:'string', label:'所属辖区',query:'eq'},
		{name:'LINK_ZIP' , type:'string', label:'邮政编码'},
		{name:'BUSINESS_TYPE' , type:'string', label:'经济类型',val:'dict|dict.1035'},
		{name:'LINK_MAN' , type:'string', label:'企业联系人'},
		{name:'LINK_TEL' , type:'string', label:'联系人电话'},
		{name:'CORP_TYPE' , type:'string', label:'企业类型',val:'dict|dict.1014',query:'eq'},
		{name:'CERTIFICATE_FIRST_TIME' , type:'date', label:'发证日期',dateFormat:'Y-m-d H:i:s'},
		
		{name:'LEGAL_NAME' , type:'string', label:'企业负责人'},
		{name:'LEGAL_TEL' , type:'string', label:'负责人电话'},
		{name:'FICT_PERSON' , type:'string', label:'法人代表'},
		{name:'TECHNOLOGY_PERSON' , type:'string', label:'技术负责人'},
		{name:'FINAL_PERSON' , type:'string', label:'财务负责人'},
		{name:'QUALITY_PERSON' , type:'string', label:'质量负责人'},
		
		{name:'CERTIFICAT_START_TIME' , type:'date', label:'开始日期',dateFormat:'Y-m-d H:i:s'},
		{name:'CERTIFICATE_END_TIME' , type:'date', label:'结束日期',dateFormat:'Y-m-d H:i:s'},
		{name:'EMAILS' , type:'string', label:'企业邮箱'},
		{name:'STATUS' , type:'string', label:'经营状态',val:'dict|dict.1021'},
		{name:'MAGOR_BRANDS' , type:'string', label:'主修品牌'},
		{name:'IS_JOIN' , type:'string', label:'是否为入网企业',val:'dict|dict.1004'},
		{name:'JOIN_ID' , type:'int', label:'入网ID'},
		{name:'FRONT_PHOTO' , type:'string', label:'照片'},
		{name:'LONGITUDE' , type:'double', label:'经度'},
		{name:'LATITUDE' , type:'double', label:'纬度'},


		{name:'IS4S' , type:'string', label:'是否为4S店',val:'dict|dict.1004'},
		{name:'IS_SEC_MAINTAIN' , type:'string', label:'二级维护'},
		{name:'IS_WYCL' , type:'string', label:'危运车辆维修'},
		{name:'IS_XNY' , type:'string', label:'新能源汽车维修'},
		{name:'IS_QCJY' , type:'string', label:'汽车救援服务'},
		
		{name:'ZBLC' , type:'int', label:'质保里程'},
		{name:'ZBRQ' , type:'int', label:'质保日期'},
		{name:'CREATE_QUATO_COUNT' , type:'int', label:'建档配额'},
		{name:'UPLOAD_QUATO_COUNT' , type:'int', label:'维修记录配额'},
		{name:'SEARCH_QUATO_COUNT' , type:'int', label:'查询配额'}
	]
});