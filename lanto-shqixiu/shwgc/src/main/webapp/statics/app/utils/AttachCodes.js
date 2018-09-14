//附件类型常量
Ext.define('app.utils.AttachCodes', {
	singleton:true,
	//2000代表附件类型（CODE8位）
	CORP_INFO:20001001, //企业基本资料附件
	CORP_CHANGE:20001002, //企业变更附件
	CORPNAME_CHANGE:20001003, //企业变更附件
	CORP_COMPLAINT:20001004, //投诉处理附件
	CORPADRESS_CHANGE:20001005, //经营范围、地址变更申请
	CORP_LOSE:20001006, //证件遗失补办申请
	CORP_CONTINUE:20001007, //证件遗失补办申请
	CORP_MOVE:20001008, //迁入迁出申请
	CORP_PAUSE:20001009, //停业申请
	CORP_RESUME:20001010, //复业申请
	CORP_OFF:20001011, //注销申请
	CORP_DAILY:20001012, //日常检查
	EXAM_FILE:20001013, //质量信誉考核
	EMPLOYEE_CHANGE: 20001014,//人员变更
	BUSINESS_DAILY:20001015, //维修业务日常检查
	PRODUCT_DAILY:20001016, //安全生产日常检查
	BASEINFO_DAILY:20001017, //企业安全生产管理基础信息
	SECUREE_DAILY:20001018, //企业安全生产事故隐患自查		
	PRODUCT_DAILY_AUDIT:20001019, //安全生产日常检查_审核附件	
	EMPLOYEE_EXAMINER:20001020, //维修质量检验人员管理	
	EMPLOYEE_EXAMINER_XL:20001021, //维修质量检验人员管理学历证书	
	/**************************************/
	HTML_EDITOR_ATTRCH:30001001, //3000代表表单编辑器中上传的附件
	file_size_limit : "5MB",//单个文件大小不超过这个值
	file_total_size : "50MB",//所有文件大小之和不超过这个值
	file_deny_types : ".exe .EXE .bat .BAT" //限制上传的文件类型
});