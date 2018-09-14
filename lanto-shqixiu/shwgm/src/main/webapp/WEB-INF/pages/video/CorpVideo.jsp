<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
  <HTML>
	 <head>   
  <title>军软视频查看插件</title>   
  <meta   http-equiv="Content-Type"   content="text/html;   charset=gb2312">   
  </head> 
  <body   onload="InitOcx()" onUnload="FreeOcx()"  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" >
    	
  <script   ID="clientEventHandlersJS"   LANGUAGE="javascript">   
  function InitOcx()   
  {   

	var MisID="JrDvrPlayer";
	var MisName="军软DVR播放插件";
	var MainDllName="JrDvrPlayer.dll";     
	var UpdateServer="http://219.137.166.188:10212"; 
	var Verification='21251050521f52b9a3f1a241479e5892';
	var VersionNo='V001';
	try{
		JrIeOcx.InitOcx(MisName,MainDllName,UpdateServer,MisID,Verification,VersionNo,"{debug:'false'}"); 
	}catch(err){
		top.Ext.MessageBox.alert('警告', '浏览器不支持该插件，请使用IE浏览器!');
	}
  }   

  if(document.all){
			document.write('<object id="JrIeOcx" classid="clsid:0EFD0793-8BFE-4622-BCE2-4FD74647986A" width="100%" height="100%"></object>');
		}else{
		    document.write('<object id="JrIeOcx" type="application/x-itst-activex" progid="JrIeOcx.JrIeOcxPanel" width="100%" height="100%"></object>');
		}
  
  function FreeOcx(){
		JrIeOcx.FreeOcx();
		//JrIeOcx=null;		
  }  
  
   //连接视频服务器Tcp，参数依次为网络类型（0为局域网，1为互联网），企业编号，外网IP，外网端口，本地监听端口
  function ConnectVideoSrv(ip,port,user,pwd){
  	var ActionName="ConnectVideoSrv";
  	var param = [ip,port,user,pwd];
	var Params = param.join('|');
	var Result=JrIeOcx.CallOcx(ActionName,Params);
	StartVideoPreview();
  }
//设置本地录像存储地址
  function SetSavePath(){
  	var ActionName="SetSavePath";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//启动视频预览,参数为要预览的通道号，取值0～255,255表示全部通道
  function StartVideoPreview(){
	  var ActionName="StartVideoPreview";
	  var Params="255|255|0";
	  var Result=JrIeOcx.CallOcx(ActionName,Params);
  }

//启动视频预览,参数为行数、列数、通道列表，通道列表是通道的16进制字符串，当通道列表为空时，默认从0通道开始显示
  function StartVideoGridPreview(){
  	var ActionName="StartVideoGridPreview";
	var Params="1|2|0105";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
  
  //启动视频预览,参数依次为通道数量，如1，4，9，16，32,其次为自动切换的时间间隔，单位为秒
  function StartVideoPreviewExt(videoNum){
  	if(videoNum > 12){
  		videoNum = 16;
  	}else if(videoNum > 9){
  		videoNum = 12;
  	}else if(videoNum > 4){
  		videoNum = 9;
  	}else{
  		videoNum = 4;
  	}
  	var ActionName="StartVideoPreviewExt";
	var Params = videoNum + "|60|0";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
  
  //手动切换通道
  function SwitchChannel(){
  	var ActionName="SwitchChannel";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }

//停止视频预览
  function StopVideoPreview(){
  	var ActionName="StopVideoPreview";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }

//开始回播放视频文件，参数为绝对路径的文件名
  function StartReplayFileLocal(){
  	var ActionName="StartReplayFileLocal";
	var Params="c:/testRemoteRecord.mp4";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//停止回播放视频文件
  function StopReplayFileLocal(){
  	var ActionName="StopReplayFileLocal";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//本地抓图
  function CapturePictureLocal(){
  	var ActionName="CapturePictureLocal";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//开始本地录像
  function StartCaptureVideoLocal(){
  	var ActionName="StartCaptureVideoLocal";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//停止本地录像
  function StopCaptureVideoLocal(){
  	var ActionName="StopCaptureVideoLocal";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }

//开始回播远程视频文件,参数为文件名
  function StartReplayFileRemote(){
  	var ActionName="StartReplayFileRemote";
	var Params="ch01_00000000003006506";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
  
  //开始按时间段远程回播视频,参数为通道号、开始时间、结束时间
  function StartReplayByTime(){
  	var ActionName="StartReplayByTime";
	var Params="0|2013-10-09 00:00:00|2013-10-29 00:00:00";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
  //开始按时间段远程回播视频文件,参数为行数、列数、通道列表、开始时间、结束时间
  function StartReplayByTimeExt(){
  	var ActionName="StartReplayByTimeExt";
	var Params="1|2|0001|2015-02-02 08:00:00.111|2015-02-02 18:00:00.222";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//停止回播远程视频文件
  function StopReplayFileRemote(){
  	var ActionName="StopReplayFileRemote";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//远程抓图，参数依次为通道号，抓取的图片到本地后存储的绝对路径及文件名
  function CapturePictureRemote(){
        alert("CapturePictureRemote");
  	var ActionName="CapturePictureRemote";
	var Params="0|c://testRemote.jpg";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }

  //从录像中抓取图片
  function CapturePictureFromVideoFile(){
  	var ActionName="CapturePictureFromVideoFile";
	var Params="0|2013-10-09 00:00:00|2013-10-29 00:00:00|3|c:/videoroot/capture";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//开始远程录像，参数依次为通道号，录像文件在视频服务器端相对路径的文件名，
  function StartCaptureVideoRemote(){
  	var ActionName="StartCaptureVideoRemote";
	var Params="0";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//停止远程录像
  function StopCaptureVideoRemote(){
  	var ActionName="StopCaptureVideoRemote";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
//断开视频服务端
  function DisConnectVideoSrv(){
  	var ActionName="DisConnectVideoSrv";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
  //全屏显示
  function FullScreenOn(){
  	var ActionName="FullScreenOn";
	var Params="";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
	//alert("结果"+Result);
  }
  //设置通道状态，参数依次为通道编号，企业编号，企业名称，通道状态，车牌号码
  function SetChannelState(){
  	var ActionName="SetChannelState";
	var Params="3|88888888|广州军软科技|录像中|粤A.8888教";
	var Result=JrIeOcx.CallOcx(ActionName,Params);
  }
  
  </script>  

</body> 
</HTML>
