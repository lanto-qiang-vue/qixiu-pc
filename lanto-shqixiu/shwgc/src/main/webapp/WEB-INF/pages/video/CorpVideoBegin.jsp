<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
  <HTML>
	 <head>   
  <title>军软视频查看插件</title>   
  <meta   http-equiv="Content-Type"   content="text/html;   charset=gb2312">   
  </head> 
  <body   onload="InitOcx()" onUnload="FreeOcx()"  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" >
    	
  <script   ID="clientEventHandlersJS"   LANGUAGE="javascript">  
  if(document.all){
			document.write('<object id="JrIeOcx" classid="clsid:0EFD0793-8BFE-4622-BCE2-4FD74647986A" width="0" height="0"></object>');
		}else{
		    document.write('<object id="JrIeOcx" type="application/x-itst-activex" progid="JrIeOcx.JrIeOcxPanel" width="0" height="0"></object>');
		}   
function InitOcx() {
	//alert(1);
	var MisID = "HttpSrv";
	var MisName = "Http通讯插件";
	var MainDllName = "HttpSrv.dll";
	var UpdateServer = "http://219.137.166.188:10212";
	var Verification = '226425b9f30a34bbe1b61f18ec8edde0';
	var VersionNo = 'V001';
	//var ReservedParams="{'debug':'true','srvUrl':'http://localhost:8080/MmDtMisServer_C/servlet/TransServlet'}";
	var ReservedParams="{'debug':'false','srvUrl':'http://localhost:8080/MmDtMisServer_C/servlet/TransServlet'}";//
	//alert(JrIeOcx.InitOcx(MisName, MainDllName, UpdateServer, MisID,Verification, VersionNo, ReservedParams));
	JrIeOcx.InitOcx(MisName, MainDllName, UpdateServer, MisID,Verification, VersionNo, ReservedParams);
}

function FreeOcx() {
	//alert(JrIeOcx.FreeOcx());
}

function GetMachineInfo() {
	alert(JrIeOcx.GetMachineInfo());
}

function CreateShortcut() {
	//alert(1);   
	var ShortcutName = "armysoft.url";
	var ShortcutURL = "http://www.jr81.com";
	var IconFile = "armysoft.ico";
	var IconIndex = 0;
	alert(JrIeOcx.CreateShortcut(ShortcutName, ShortcutURL, IconFile, IconIndex));
}

//参数依次为：URL，参数
function DoStart(s) {
    var url = "http://"+"${videobegin.serverIp}"+":"+"${videobegin.serverPort}"
	var ActionName = "HttpSrv";
	//var Params = url+"/MonitorService/GetSrvTime|{'Pack_Name':'StartMaintain','data':{'ORADER_NO':'GD_TEST_1001','POSITION_NO':'1001','BOOKING_NUM':'','ORDER_NUM':'','ORDER_TYPE':'维修','ORDER_STATUS':'未派工','MAINTENANCE_TYPE':'二级维护','START_DATE':'2015-9-6','START_TIME':'14:52:38','OWNER_NUM':'KH201211-0001','OWNER_NAME':'ksks','VEHICLE_NATURE':'私用车','VEHICLE_NUM':'CL201509-0001','PLATE_NUM':'粤A.99888','PLATE_COLOR':'蓝','PLATE_TYPE':'小客车','PLATE_KIND':'','CAR_CANTON':'002','PURCHASE_DATE':'2015-8-7 14:48:32','UNIT_CODE':'cs001','CARD_NUM':'','MILES_FACTORY':'','VIN':'11100220','ENGINE_NUM':'110011','BRAND':'asdfas','SERIES':'asssss','MODEL':'fasdfasdf','SEND_PERSON':'彭生','SEND_GENDER':'男','SEND_PHONE':'20255658544','SEND_MOBILE':'13633332222','MAINTENANCE_MILEAGE_NEXT':'6000','MAINTENANCE_DATE_NEXT':'2015-12-5','CHASSIS_NUM':'6546546','FUEL_TYPE':'汽油','DEAD_WEIGHT':'2','PASSENGERS_NUM':'0','HIS_MOUNTS_OWED':'0','ADDRESS':'ADccccc','CORP_ID':'11111','CREATED':'设计人员','CREATETIME':'2015-9-6 14:52:38','MODIFIED':'','MODIFYTIME':'','REMARK':''}}";
	var Params = url+"/MonitorService/GetSrvTime|{'Pack_Name':'StartMaintain','data':"+s+"}";
	//alert(Params);
	var Result = JrIeOcx.CallOcx(ActionName, Params);
	alert("结果" + Result);
}

function DoStop(s) {
    var url = "http://"+"${videobegin.serverIp}"+":"+"${videobegin.serverPort}"
	var ActionName = "HttpSrv";
	//var Params = "http://192.168.2.161:10086/MonitorService/GetSrvTime|{'Pack_Name':'StopMaintain','data':{'ORADER_NO':'GD_TEST_1001','POSITION_NO':'1001'}}";
	var Params = url+"/MonitorService/GetSrvTime|{'Pack_Name':'StopMaintain','data':"+s+"}";
	var Result = JrIeOcx.CallOcx(ActionName, Params);
	alert("结果" + Result);
}
function GetSrvInfo() {
	var ActionName = "HttpSrv";
	var Params = "http://192.168.2.161:10086/MonitorService/GetSrvTime|{'Pack_Name':'GetSrvInfo'}";
	var Result = JrIeOcx.CallOcx(ActionName, Params);
	alert("结果" + Result);
}

function GetPositionInfo() {
	var ActionName = "HttpSrv";
	var Params = "http://192.168.2.161:10086/MonitorService/GetSrvTime|{'Pack_Name':'GetPositionInfo'}";
	var Result = JrIeOcx.CallOcx(ActionName, Params);
	alert("结果" + Result);
}

  </script>  

</body> 
</HTML>
