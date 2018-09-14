package com.lanto.shqixiu.shcheck.controller.sys;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.reflect.TypeToken;
import com.lanto.shqixiu.shcheck.model.bean.TcCheckFunc;
import com.lanto.shqixiu.shcheck.model.po.TvVehicleBase;
import com.lanto.shqixiu.shcheck.service.sys.VehicleCardService;
import com.lanto.shqixiu.shcheck.util.Constant;
import com.lanto.shqixiu.shcheck.util.URLConnectionUtil;
import com.lanto.shqixiu.shcheck.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="check/sys/vehiclecard",produces = "text/html;charset=UTF-8")
public class VehicleCardController extends BaseCon{

	private Logger logger = Logger.getLogger(VehicleCardController.class);// 日志

	@Resource
	private VehicleCardService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String array = CommonUtils.checkNull(request.getParameter("array"));
			TransLoginInfo info = super.getTransLoginInfo();
			List<TcCheckFunc> list = new ArrayList<TcCheckFunc>();
			list = gson.fromJson(array, new TypeToken<List<TcCheckFunc>>(){}.getType());
			TvVehicleBase po = json.getPojo(data, TvVehicleBase.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getVehicleId())){
				po.setUpdateDate(new Date());
				po.setTransCorpId(info.getCorpId());
				service.update(po);
			}else{
				po.setUpdateDate(new Date());
				po.setTransCorpId(info.getCorpId());
				service.save(po);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	
	@RequestMapping("repairList")
	@ResponseBody
	public Object repairList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			List list = service.getRepairList(vehId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修记录出错");
		}
	} 
	
	@RequestMapping("checkList")
	@ResponseBody
	public Object checkList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			List list = service.getCheckList(vehId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询等级评定记录出错");
		}
	} 
	
	@RequestMapping("partList")
	@ResponseBody
	public Object partList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			String billCode = CommonUtils.checkNull(request.getParameter("billCode"));
			List list = service.getPartList(billCode);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"维修配件查询出错");
		}
		
	}
	
	@RequestMapping("updateCase")
	@ResponseBody
	public Object updateCase(HttpServletRequest request,HttpServletResponse response) {
		try{
			String plateNum = CommonUtils.checkNull(request.getParameter("plateNum"));
			String plateColor = CommonUtils.checkNull(request.getParameter("plateColor"));
			TransLoginInfo info = super.getTransLoginInfo();
			service.updateCase(plateNum, plateColor, info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"关联失败");
		}
	} 

	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	@RequestMapping("getPic")
	@ResponseBody
	public Object getPic(HttpServletRequest request,HttpServletResponse response) {
		try{
			Map out = new HashMap();
			out.put("key", "value");
			String serverUrl=Constant.REPAIR_PHOTO_SERVER_URL;
			String picUrl=Constant.REPAIR_PHOTO_PIC_URL;		
			String corpId = CommonUtils.checkNull(request.getParameter("CORP_ID"));
			String billCode = CommonUtils.checkNull(request.getParameter("BILL_CODE"));	
			Map<String,Object> params = new HashMap<String,Object>();
			//params.put("corpId", corpId);
			params.put("corpId", corpId);
			params.put("billCode", billCode);
			String result = URLConnectionUtil.doPost( serverUrl, params);
			if (result.length() > 21) {
			  Map<String,Object> jsm = gson.fromJson(result, Map.class);
			  String pic1= jsm.get("pic1").toString();
			  String pic2= jsm.get("pic2").toString();
			  String pic3= jsm.get("pic3").toString();			  
			  Map gene = new HashMap();
			  gene.put("pic1", picUrl+pic1);
			  gene.put("pic2", picUrl+pic2);
			  gene.put("pic3", picUrl+pic3);
			  return super.getOutData(gene);	
			}
		    return super.getOutData(out);
		
		}catch(Exception e){
			e.printStackTrace();
			logger.error("获取图片失败", e);
			return super.getOutException(e, "获取图片失败");
		}		

	}	
	@RequestMapping("uploadImage")
	@ResponseBody
	public Object uploadEditor(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRequest.getFile("upload");
			String fileName = file.getOriginalFilename();
			String uploadFileId = fileName.substring(fileName.lastIndexOf("."));
			String year = CommonUtils.printDate("yyyy", new Date());
			String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
			String mothYearDay = CommonUtils
					.printDate("yyyy-MM-dd", new Date());
			String uName = UUID.randomUUID() + uploadFileId;
			String fid = Constant.ATTACH_FILE_UPLOAD_PROJECT + year + "/" + mothYear + "/" + mothYearDay + "/"
					+ uName;
			String fileUrl = ParamInit.attachFileUploadPath + fid;
			File newFile = new File(fileUrl);
			if (!newFile.getParentFile().exists()) {
				newFile.getParentFile().mkdirs();
			}
			file.transferTo(newFile);

			return super.getOutData(fid);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "上传附件信息失败");
		}
	}
	
	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map<String, Object>> data = service.doExport(sList);
			String[] title = { "车辆ID","厂家","品牌","车型","车牌号","车牌颜色","车辆类型","营运状态","区县","道路运输证号","驾驶员","底盘号","发动机号","燃料类型","车辆吨位","座（卧）位","使用类别","发证日期","审验日期","审验结果" };
			String[] column = { "VEHICLE_ID","VENDER","BRAND","XM","PLATE_NUM","PLATE_COLOR","VEHICLE_TYPE","STATUS","COUNTY","LOAD_CERT_NUM","UNIT_NAME","CHASSIS_NUM","ENGINE_NUM","FUEL_TYPE","TONNAGE","SEAT","USE_TYPE","CERT_DATE","CHECK_DATE","CHECK_RESULT" };
			//数据字典中的字段需转化成中文（如果导出的字段中有字典数据的请自行添加）
			String[] recolumn = { "PLATE_COLOR", "VEHICLE_TYPE","STATUS","FUEL_TYPE"};
			String fileName = "车辆基本档案";
			if (data != null) {
				List<String> titleList = Arrays.asList(title);
				List<String> columnList = Arrays.asList(column);
				List<String> recolumnList = Arrays.asList(recolumn);
				ExcelWriterPoiWriter.writeExcel(titleList, data, fileName, fileName, columnList, null,recolumnList,response);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"导出出错");
		}
	}
	/*@RequestMapping("doPrint")
	@ResponseBody
	public Object doPrint(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String recordNo = CommonUtils.checkNull(request.getParameter("record_no"));
			
			TvVehicleBase base = json.getPojo(data, TvVehicleBase.class);
			base.setVehicleType(WebCache.getDictDescById(base.getVehicleType()));			
			base.setPlateColor(WebCache.getDictDescById(base.getPlateColor()));
			base.setFuelType(WebCache.getDictDescById(base.getFuelType()));
			
		    if (!"".equals(base.getXm())) {
			  DbRepairStandard dbR = new DbRepairStandard();
			  dbR.setId(Integer.parseInt(base.getXm()));
			  dbR = service.getModel_DbR(dbR);
			  base.setXm(dbR.getName());
		    }
		    
		    TvVehicleParam param = new TvVehicleParam(); 
		    param.setVehicleId(base.getVehicleId());
		    param = service.getModel_VehicleParam(param);
		    
			List regList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_reg");	
			List paramList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_param");
			List partChangeList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_part_change");	
			List checkList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_check");			
			List changeList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_change");
			List usesList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_uses");
			List accidentList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_accident");	
			List driverList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_driver");	
			
			String out = service.createReportXml(base,param,regList,partChangeList,checkList,changeList,usesList,accidentList,driverList);			
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"打印出错");
		}
		
	}		*/
	
	/*@RequestMapping("save_uses")
	@ResponseBody
	public Object save_uses(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			TransLoginInfo info = super.getTransLoginInfo();
			service.saveItem(parray,Integer.parseInt(vehicleId),TvVehicleUses.class,"usesId");
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆使用记录保存出错");
		}
	}	*/
	
	@RequestMapping("regList")
	@ResponseBody
	public Object regList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_reg");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修登记出错");
		}
	} 
	
	@RequestMapping("changeList")
	@ResponseBody
	public Object changeList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_change");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修登记出错");
		}
	} 
	
	@RequestMapping("partChangeList")
	@ResponseBody
	public Object partChangeList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_part_change");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修登记出错");
		}
	} 
	
	@RequestMapping("usesList")
	@ResponseBody
	public Object usesList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_uses");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修登记出错");
		}
	} 
	
	@RequestMapping("accidentList")
	@ResponseBody
	public Object accidentList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_accident");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修登记出错");
		}
	} 
	
	@RequestMapping("driverList")
	@ResponseBody
	public Object driverList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_driver");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修登记出错");
		}
	} 
	
	@RequestMapping("deleteVehicleItems")
	@ResponseBody
	public Object deleteVehicleItems(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			String pid = CommonUtils.checkNull(request.getParameter("pid"));
			String tableName = CommonUtils.checkNull(request.getParameter("tableName"));
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicleId"));
			service.deleteVehicleItems(ids,vehicleId,pid,tableName);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
		//sList.add(new SqlUnit("CORP_ID", " and TRANS_CORP_ID = ? ", super.getTransLoginInfo().getCorpId()));
	}


}

