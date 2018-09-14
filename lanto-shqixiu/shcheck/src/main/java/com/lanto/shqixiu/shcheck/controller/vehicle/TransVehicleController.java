package com.lanto.shqixiu.shcheck.controller.vehicle;

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
import org.softbase.model.ManageLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.reflect.TypeToken;
import com.lanto.shqixiu.shcheck.common.WebCache;
import com.lanto.shqixiu.shcheck.model.bean.TcCheckFunc;
import com.lanto.shqixiu.shcheck.model.po.DbRepairStandard;
import com.lanto.shqixiu.shcheck.model.po.TbCorpInfo;
import com.lanto.shqixiu.shcheck.model.po.TvVehicleBase;
import com.lanto.shqixiu.shcheck.model.po.TvVehicleParam;
import com.lanto.shqixiu.shcheck.service.corp.TbCorpInfoService;
import com.lanto.shqixiu.shcheck.service.vehicle.TransVehicleService;
import com.lanto.shqixiu.shcheck.util.Constant;
import com.lanto.shqixiu.shcheck.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="vehicle/transvehicle",produces = "text/html;charset=UTF-8")
public class TransVehicleController extends BaseCon{

	private Logger logger = Logger.getLogger(TransVehicleController.class);// 日志

	@Resource
	private TransVehicleService service;
	
	@Resource
	private TbCorpInfoService corpService;

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
	
	@RequestMapping("list1")
	@ResponseBody
	public Object list1(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getAllList(sList, pUnit);
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
			List<TcCheckFunc> list = new ArrayList<TcCheckFunc>();
			list = gson.fromJson(array, new TypeToken<List<TcCheckFunc>>(){}.getType());
			TvVehicleBase po = json.getPojo(data, TvVehicleBase.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getVehicleId())){
				po.setUpdateDate(new Date());
				service.update(po);
			}else{
				po.setUpdateDate(new Date());
				//验证建档配额
				TbCorpInfo corp=corpService.getModel(super.getCheckLoginInfo().getCorpId());
				if(corp.getCreateQuatoCount()==null || "".equals(corp.getCreateQuatoCount())){
					return super.getOutException(null,"未设置建档配额，请与系统运营商联系！");
				}else{
					String quatoStr = SecurityEncode.decoderByDES(corp.getCreateQuatoCount(), SecurityEncode.DES_KEY);
					if(!quatoStr.split(",")[1].equals(corp.getCorpId())){
						return super.getOutException(null,"建档配额验证错误，请与系统运营商联系！");
					}else if(Integer.parseInt(quatoStr.split(",")[0])<1){
						return super.getOutException(null,"建档配额不足，请与系统运营商联系！");
					}else{
						if(corpService.createQuatoMinus1(corp.getCorpId(),po.getPlateNum(),super.getCheckLoginInfo())){
							service.save(po);
						}
					}
				}
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("getInfo")
	@ResponseBody
	public Object getInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehicleId = CommonUtils.checkNull(request.getParameter("VEHICLE_ID"));
			List list= service.getInfo(vehicleId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取出错");
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
			return super.getOutException(e,"查询维修记录出错");
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
			String corpId = CommonUtils.checkNull(request.getParameter("CORP_ID"));
			String billCode = CommonUtils.checkNull(request.getParameter("BILL_CODE"));	
			List list =service.getPic(corpId, billCode,0);
			Map<String, Object> map1;
			if (list.size() > 0 ) {
			  map1 = (Map) list.get(0);		
			  out.put("pic1", map1.get("IMAGE1"));

			  Map map2 = (Map) list.get((int)Math.ceil(list.size()/2));		
			  out.put("pic2", map2.get("IMAGE1"));

			  Map map3 = (Map) list.get(list.size()-1);		
			  out.put("pic3", map3.get("IMAGE1"));
			}
			
			List list_1 =service.getPic(corpId, billCode,1);
			if (list_1.size() > 0 ) {
			  map1 = (Map) list_1.get(0);		
			  out.put("pic4", map1.get("IMAGE1"));

			  Map map2 = (Map) list_1.get((int)Math.ceil(list_1.size()/2));		
			  out.put("pic5", map2.get("IMAGE1"));

			  Map map3 = (Map) list_1.get(list_1.size()-1);		
			  out.put("pic6", map3.get("IMAGE1"));
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
			String[] recolumn = {"PLATE_COLOR", "VEHICLE_TYPE","STATUS","FUEL_TYPE"};
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
	@RequestMapping("doPrint")
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
			List paramList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_param");		    
			List regList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tr_repair_gene_manage");	
			List partChangeList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tr_repair_gene_part");	
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
		
	}		
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
	@RequestMapping("save_reg")
	@ResponseBody
	public Object save_reg(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveReg(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆普通维修登记保存出错");
		}
	}	
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
	@RequestMapping("save_change")
	@ResponseBody
	public Object save_change(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveChange(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆变更保存出错");
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
			return super.getOutException(e,"查询车辆变更出错");
		}
	} 	
	@RequestMapping("save_uses")
	@ResponseBody
	public Object save_uses(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveUses(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆使用记录保存出错");
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
			return super.getOutException(e,"查询使用记录出错");
		}
	} 	
	
	@RequestMapping("save_driver")
	@ResponseBody
	public Object save_driver(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveDriver(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆驾驶员保存出错");
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
			return super.getOutException(e,"查询驾驶员列表出错");
		}
	} 
	
	@RequestMapping("save_accident")
	@ResponseBody
	public Object save_accident(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveAccident(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆交通事故登记保存出错");
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
			return super.getOutException(e,"查询交通事故列表出错");
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
	
	@RequestMapping("partChangeList")
	@ResponseBody
	public Object partChangeList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tr_repair_gene_part");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询主要部件变更列表出错");
		}
	} 
	@RequestMapping("save_partChange")
	@ResponseBody
	public Object save_partChange(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.savePartChange(parray,Integer.parseInt(vehicleId));
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆主要部件变更保存出错");
		}
	}

	@RequestMapping("save_param")
	@ResponseBody
	public Object save_param(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			TvVehicleParam pojo = json.getPojo(parray, TvVehicleParam.class);
			Integer paramId =service.saveOrUpdateParam(pojo, vehicleId);
			if(paramId!=null){
				pojo.setParamId(paramId);
			}
			return super.getOutData(json.toMap(pojo));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆技术参数保存出错");
		}
	}		
	
	@RequestMapping("vehicleParam")
	@ResponseBody
	public Object vehicleParam(HttpServletRequest request,HttpServletResponse response){
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			TvVehicleParam po = new TvVehicleParam();
			po.setVehicleId(Integer.parseInt(vehicleId));
			po = service.getTvVehicleParam(po);
			if(po!=null){
				return super.getOutData(json.toMap(po));
			}else{
				return super.getOutData(null);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆技术参数获取出错");
		}
	}
}

